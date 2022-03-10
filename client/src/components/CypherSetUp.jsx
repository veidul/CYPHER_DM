import React, { useState } from "react";
import AddUserModal from "../components/AddUserModal";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { ADD_CYPHER } from "../utils/mutations";
import { GET_ME, GET_CYPHERS } from "../utils/queries";

export default function CypherSetUp({
    userData,
    cypherLoading,
    cypherData,
    chatWindowData,
    setChatWindowData,
}) 
{
    

const [addCypher, { error }] = useMutation(ADD_CYPHER, {
    update(cache, { data: { addCypher } }) {
        const { cyphers } = cache.readQuery({ query: GET_CYPHERS });
        cache.writeQuery({
        query: GET_CYPHERS,
        data: { cyphers: [...cyphers, addCypher] },
        });
    },
    });

    

const onClick = async () => {
    try {
        const cypherCreated = await addCypher({ variables: { input: userData } });
    } catch (err) {
        console.log(err);
    }
    };

  return (

    <div className="flex flex-col h-1/6 bg-white border-x-2 border-t-2 mt-1 ml-1 rounded-t border-black">
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
    </div>
  );
}






