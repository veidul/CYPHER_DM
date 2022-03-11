import React, { useState } from "react";
import Auth from "../utils/auth";
import Cypher from "./Cypher";

export default function CypherMenu({
  userData,
  cypherLoading,
  cypherData,
  chatWindowData,
  setChatWindowData,
}) {
  //init new arr for users cyphers only
  let newCypherArr;
  //wait for cypherData to load
  if (!cypherLoading && cypherData?.cyphers) {
    newCypherArr = cypherData.cyphers.map((cypher) => {
      let flag = false;
      //loop through each users array in current cypher
      cypher.users.forEach((user) => {
        //set the flag to true if user in current cyphers user arr contains matching this users id
        if (user._id == userData._id) {
          flag = true;
        }
      });
      //if cypher contained this user in users return cypher
      if (flag) {
        console.log("hit from 59");
        return cypher; // if cypher.users did not contain this user the undefined will be returned
      }
    });

    //filter all undefined cyphers
    newCypherArr = newCypherArr.filter((cypher) => cypher !== undefined);
    console.log("from line 55 \n", newCypherArr);
  }

  return (
    <>
      <div className="flex flex-col bg-slate-900 h-full border-2 m-0 border-black relative align-bottom rounded-lg text-left shadow-xl transform transition-all overflow-auto sm:align-middle sm:max-w-lg sm:w-full">
        {/*needs code to map cyperData as cypher component*/}
        {!cypherLoading &&
          cypherData?.cyphers &&
          newCypherArr.map((cypher) => (
            <Cypher
              key={Math.random()}
              cypherData={cypher}
              chatWindowData={chatWindowData}
              setChatWindowData={setChatWindowData}
            />
          ))}
      </div>
    </>
  );
}
