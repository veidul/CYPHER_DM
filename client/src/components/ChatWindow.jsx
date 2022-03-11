import React, { useEffect, useState, useRef } from "react";
import Auth from "../utils/auth";
import Message from "./Message";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CYPHER, GET_CYPHERS } from "../utils/queries";
import { ADD_MESSAGE } from "../utils/mutations";
// add in mutation logic for ADD_MESSAGE

export default function ChatWindow({
  cypherLoading,
  cypherData,
  chatWindowData,
  setChatWindowData,
  userData,
}) {
  const [messageText, setMessageText] = useState("");
  const [addMessage, { error, data: mutationData }] = useMutation(ADD_MESSAGE, {
    update(cache, { data: { addMessage } }) {
      const { cyphers } = cache.readQuery({
        query: GET_CYPHERS,
      });
      setChatWindowData(addMessage);
      cache.writeQuery({
        query: GET_CYPHERS,
        variables: { _id: cypherData._id },
        data: {
          cyphers: cyphers.map((a) =>
            a._id === addMessage._id
              ? { ...a, messages: addMessage.messages }
              : a
          ),
        },
      });
    },
  });
  const submitHandler = async () => {
    let text = document.getElementById("inputText").value;
    await addMessage({
      variables: {
        messageText: text,
        cypherId: chatWindowData._id,
      },
    });
    text = document.getElementById("inputText").value = "";
  };
  // scrolls to bottom of chat window
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatWindowData]);

  return (
    <>
      <div className="float-right flex-col relative h-screen w-9/12">
        <div className="relative h-5/6 border-2 rounded-t border-black overflow-auto">
          <ul className="space-y-12 grid grid-cols-1">
            {chatWindowData.messages
              ? chatWindowData.messages.map((message) => (
                  <Message
                    key={Math.random()}
                    message={message}
                    setChatWindowData={setChatWindowData}
                    chatWindowData={chatWindowData}
                  />
                ))
              : "Messages are loading!"}
          </ul>
          <div ref={messagesEndRef} />
        </div>
        <div className="absolute w-full h-1/6 border-x-2 rounded-b border-b-2 border-black">
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
