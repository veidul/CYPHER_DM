import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_ME, GET_CYPHERS } from "../utils/queries";
import CypherMenu from "../components/CypherMenu";
import ChatWindow from "../components/ChatWindow";
import { CYPHER_ADDED } from "../utils/subscription";
import CypherSetUp from "../components/CypherSetUp";

export default function componentName() {
  const [chatWindowData, setChatWindowData] = useState([]);
  const { loading, data } = useQuery(GET_ME);
  const { loading: cypherLoading, data: cypherData } = useQuery(GET_CYPHERS);
  const { loading: cypherAddedLoading, data: newCypherData } =
    useSubscription(CYPHER_ADDED);
  const { __typename, ...userData } = data?.me || {};

  useEffect(
    () => console.log("new cypher sub", newCypherData),
    [newCypherData]
  );

  return (
    <>
      <div className="flex flex-row">
        <div className="float-left flex-col relative flex h-screen w-3/12 bg-gray-900">
          {/* <div className="flex flex-col h-1/6 bg-white border-x-2 border-t-2 mt-1 ml-1 rounded-t border-black">
            <h1 className=" text-center border-b-2 h-2/6 border-black text-black">
              Cyphers
            </h1>
            <div className="flex justify-center mt-2">
              <button
                onClick={onClick}
                className="py-2 px-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-32 transition
              ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                {" "}
                Create New Cypher{" "}
              </button>
              <AddUserModal />
            </div>
          </div> */}
          <CypherSetUp
            userData={userData}
            cypherLoading={cypherLoading}
            cypherData={cypherData}
            chatWindowData={chatWindowData}
            setChatWindowData={setChatWindowData}
          />
          <CypherMenu
            userData={userData}
            cypherLoading={cypherLoading}
            cypherData={cypherData}
            chatWindowData={chatWindowData}
            setChatWindowData={setChatWindowData}
          />
        </div>
        <ChatWindow
          userData={userData}
          cypherLoading={cypherLoading}
          cypherData={cypherData}
          chatWindowData={chatWindowData}
          setChatWindowData={setChatWindowData}
        />
      </div>
    </>
  );
}
