import React, { useState } from "react";
import Auth from "../utils/auth";
import Message from "./Message";
import { useMutation } from "@apollo/client";
// add in mutation logic for ADD_MESSAGE

export default function ChatWindow({ cypherLoading, cypherData }) {
  const [messageText, setMessageText] = useState("");

  const onClick = async () => {
    try {
      const cypherCreated = await addCypher({ variables: { input: userData } });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="float-right flex-col relative h-screen w-9/12 bg-red">
        <div className="bg-red relative h-5/6 border-2 rounded-t border-black mt-1 m-l-1 overflow-auto">
          {!cypherLoading &&
            cypherData?.cyphers &&
            cypherData.cyphers.map((cypher) => <Message cypherData={cypher} />)}
        </div>
        <div className="bg-blue absolute w-full h-1/6 border-x-2 rounded-b border-b-2 border-black">
          <input
            className="absolute h-full w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded
       shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed
"
          />
          <button
            onChange={(e) => {
              setMessageText(e.target.value);
            }}
            value={messageText}
            className="absolute right-0 bottom-0 ml-auto z-50 mr-1 mb-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-32 transition
       ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            {" "}
            SEND{" "}
          </button>
        </div>
      </div>
    </>
  );
}
