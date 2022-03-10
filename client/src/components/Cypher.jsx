import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_CYPHER } from "../utils/queries";
import CpyModal from "./CpyModal";

/*
cypher contains
{
    createdAt: ,
    users: [
        {
            userId: ,
            //need userName: ,
        }
    ],
    messages: [
        {
            messageText: ,
            messageAuthor: ,
            userId: ,
            createdAt: ,
        }
    ],   
}

*/
export default function Cypher({
  cypherData,
  setChatWindowData,
  chatWindowData,
}) {
  const usernameArray = [];
  const usernames = cypherData.users.map(({ username }) => {
    return username;
  });
  const usernamesJoined = usernames.join(",");
  const cypherId = cypherData._id;
  const loadCypher = () => {
    try {
      setChatWindowData(cypherData);
    } catch (err) {
      console.log(err);
    }
    console.log(cypherData, "cypherData line 43 cypher.jsx");
  };

  return (
    <>
      <div className="bg-slate-900 hover:bg-slate-800 h-5/6 rounded-b px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-y-2 border-gray-600">
        <div className="flex items-start" onClick={loadCypher}>
          <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div className="flex">
              <h3 className="text-lg leading-6 font-medium text-gray-500">
                Users: {usernamesJoined}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <CpyModal cypherId={cypherId} />
        </div>
      </div>
    </>
  );
}
