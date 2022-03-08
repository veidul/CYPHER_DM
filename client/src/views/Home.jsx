import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME, GET_CYPHERS } from "../utils/queries";
import { ADD_CYPHER } from "../utils/mutations";
import CypherMenu from "../components/CypherMenu";
import ChatWindow from "../components/ChatWindow";

export default function componentName() {
  const { loading, data } = useQuery(GET_ME);
  const { loading: cypherLoading, data: cypherData } = useQuery(GET_CYPHERS);
  const [addCypher, { error }] = useMutation(ADD_CYPHER, {
    update(cache, { data: { addCypher } }) {
      console.log(cypherData);
      const { cyphers } = cache.readQuery({ query: GET_CYPHERS });
      cache.writeQuery({
        query: GET_CYPHERS,
        data: { cyphers: [...cyphers, addCypher] },
      });
    },
  });
  const { __typename, ...userData } = data?.me || {};
  const onClick = async () => {
    console.log(userData);
    try {
      const cypherCreated = await addCypher({ variables: { input: userData } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="float-left flex-col relative flex h-screen w-3/12 bg-white">
          <div className="flex flex-col h-1/6 bg-white border-x-2 border-t-2 mt-1 ml-1 rounded-t border-black">
            <h1 className=" text-center border-b-2 h-2/6 border-black text-black">
              Cyphers
            </h1>
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <div className="input-group relative flex items-stretch w-full my-4">
                  <input
                    type="search"
                    className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white
       bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon3"
                  />
                  <button
                    className="btn inline-block px-6 py-2 bg-purple-600 text-white font-medium text-xs leading-tight uppercase hover:bg-purple-700 focus:ring-offset-purple-200
       focus:outline-none focus:ring-2 transition duration-200 ease-in-out focus:ring-offset-2 rounded-lg"
                    type="button"
                    id="button-addon3"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={onClick}
              className="ml-auto mr-1 mb-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-32 transition
       ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              {" "}
              New Cypher{" "}
            </button>
          </div>
          <CypherMenu cypherLoading={cypherLoading} cypherData={cypherData} />
        </div>
        <ChatWindow cypherLoading={cypherLoading} cypherData={cypherData} />
      </div>
    </>
  );
}
