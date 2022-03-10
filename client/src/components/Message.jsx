import React from "react";
import Auth from "../utils/auth";

export default function Message({
  cypherData,
  message,
  setChatWindowData,
  chatWindowData,
}) {
  console.log(message, "message info");
  const user = Auth.getUser(); // the currently logged in user
  console.log(user, "line 11 user id on message.jsx");
  function isMessageFromUser() {
    return user === message.username;
  }
  console.log(isMessageFromUser());
  return (
    <>
      <div
        className={`relative ${
          isMessageFromUser() ? "place-self-end" : "place-self-start"
        } space-y-2`}
      >
        <div className="absolute inset-1 bg-sky-800 rounded-lg blur"></div>
        <div
          className={`relative font-mono text-lg text-corn-silk ${
            isMessageFromUser() ? "rounded-tr-none bg-purple-700 p-5 rounded-2xl" : "rounded-tl-none bg-gray-500 p-5 rounded-2xl"
          }`}
        >
          {message.createdAt ? message.createdAt : "no timestamp"}
          <br />
          {message.username ? message.username : "no username"} :{" "}
          {message.messageText ? message.messageText : "no message"}
        </div>
      </div>

    </>
  );
}
