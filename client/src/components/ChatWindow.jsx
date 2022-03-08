import React, { useEffect, useState } from "react";
import Auth from "../utils/auth";
import Message from "./Message";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../utils/mutations";
// add in mutation logic for ADD_MESSAGE

export default function ChatWindow({
  cypherLoading,
  cypherData,
  chatWindowData,
  setChatWindowData,
  userData,
}) {
  //here we need to add in the use mutation and get it working. figure out what data needs to be passed to the function.
  const [messageText, setMessageText] = useState("");
  const [addMessage, { error }] = useMutation(ADD_MESSAGE);
  // const onClick = async () => {
  //   try {
  //     const cypherCreated = await addCypher({ variables: { input: userData, messageText, _id: chatWindowData._id }});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //set chatWindowData + new message
  const submitHandler = async () => {
    console.log(chatWindowData);
    const text = document.getElementById("inputText").value;
    // setMessageText(text);
    addMessage({
      variables: {
        messageText: text,
        cypherId: chatWindowData._id,
      },
    });
  };
  return (
    <>
      <div className="float-right flex-col relative h-screen w-9/12 bg-red">
        <div className="bg-red relative h-5/6 border-2 rounded-t border-black mt-1 m-l-1 overflow-auto">
          {!cypherLoading && chatWindowData.messages
            ? chatWindowData.users.map((user) => (
                <h1>{user.username}</h1>
                // <Message
                //   message={message}
                //   setChatWindowData={setChatWindowData}
                //   cypherData={cypher}
                //   chatWindowData={chatWindowData}
                // />
              ))
            : "Messages are loading!"}
        </div>
        <div className="bg-blue absolute w-full h-1/6 border-x-2 rounded-b border-b-2 border-black">
          <input
            id="inputText"
            className="absolute h-full w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded
       shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed
"
          />
          <button
            onClick={submitHandler}
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
