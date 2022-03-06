import React from "react";
import Auth from "../utils/auth";
import Cypher from "./Cypher";

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
export default function CypherMenu({ cypherLoading, cypherData }) {
  return (
    <>
      <div className="flex flex-col bg-slate-900 h-full border-2 m-0 border-black relative align-bottom rounded-lg text-left shadow-xl transform transition-all overflow-auto sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        {/*needs code to map cyperData as cypher component*/}
        {!cypherLoading &&
          cypherData?.cyphers &&
          cypherData.cyphers.map((cypher) => <Cypher key={Math.random()} cypherData={cypher} />)}
        {/* <Cypher
          usersTitle="DM_Boys"
          lastMessageDate="3/2"
          lastMessageText="up all night"
        /> */}
      </div>
    </>
  );
}
