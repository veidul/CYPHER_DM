import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_CYPHER } from "../utils/queries";
import CpyModal from "./CpyModal";

export default function Cypher({
  cypherData,
  setChatWindowData,
  chatWindowData,
}) {
  const usernameArray = [];
  const usernames = cypherData.users.map(({ username }) => {
    return username;
  });
  const lastMessageText = cypherData;

  console.log(
    lastMessageText.messages.length - 1 > 0
      ? lastMessageText.messages[lastMessageText.messages.length - 1]
          .messageText
      : "nothing here"
  );
  const usernamesJoined = usernames.join(",");
  const cypherId = cypherData._id;
  const loadCypher = () => {
    try {
      setChatWindowData(cypherData);
    } catch (err) {
      console.log(err);
    }
  };

  const copyID = () => {
    const copyText = cypherId;
    const showText = document.getElementById(`${cypherId}`);
    console.log("I HV BEEN CLICKED!!", copyText);
    navigator.clipboard.writeText(copyText);
    showText.innerHTML = `${copyText} is copied`;
    setTimeout(() => {
      showText.innerHTML = "";
    }, 2000);
  };

  return (
    <>
      <div className="bg-slate-900 hover:bg-slate-800 h-5/6 rounded-b px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-y-2 border-gray-600">
        <div
          className="flex items-start hover: cursor-pointer"
          onClick={loadCypher}
        >
          <div className="mt-3 w-full text-center sm:mt-0  sm:text-left">
            <div className="flex justify-start">
              <svg
                className="h-8 w-8 pr-2 text-indigo-800"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />{" "}
                <circle cx="9" cy="7" r="4" />{" "}
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />{" "}
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h3 className="text-xl leading-6 font-medium text-corn-silk">
                {usernamesJoined}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <p className="text-xs text-corn-silk">
            {lastMessageText.messages.length - 1 > 0
              ? lastMessageText.messages[lastMessageText.messages.length - 1]
                  .username +
                ": " +
                lastMessageText.messages[lastMessageText.messages.length - 1]
                  .messageText
              : "..."}
          </p>
          <div className="flex">
            <p className="pr-2 text-xs text-corn-silk" id="copyMe">
              {cypherId}
            </p>
            <svg
              onClick={copyID}
              className="h-4 w-4 text-purple-500 hover: cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />{" "}
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </div>
        </div>
        <div>
          <p className="text-green-700" id={cypherId}></p>
        </div>
      </div>
    </>
  );
}
