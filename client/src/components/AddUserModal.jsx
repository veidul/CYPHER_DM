import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_CYPHER_USER } from "../utils/mutations";

export default function AddUserModal() {
  const [showModal, setShowModal] = React.useState(false);
  const [addCypherUser, { error }] = useMutation(ADD_CYPHER_USER);

  const onSubmit = () => {
    const cypherIdInput = document.getElementById("cypherIdInput").value;
    console.log(cypherIdInput);
    addCypherUser({ variables: { _id: cypherIdInput } });
  };
  return (
    <>
      <button
        className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-corn-silk w-32 transition
        ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        onClick={() => setShowModal(true)}
      >
        Join Cypher
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-7/12 my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="absolute inset-0 bg-purple-500 rounded-lg blur-xl"></div>
              <div className="shadow shadow-2xl shadow-purple-500 border-0  rounded-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex justify-center p-5">
                  <h3 className="text-3xl font-semibold text-corn-silk">Enter Cypher ID</h3>
                </div>
                <div className="flex justify-center">
                  <input
                    id="cypherIdInput"
                    placeholder="Paste CypherId Here"
                    className="w-80 border-b border-solid border-slate-900 rounded"
                  />
                </div>
                <div className="flex items-center justify-evenly p-6">
                <button
                  className="mr-1 mb-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-corn-silk w-32 transition
                  ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="button"
                  onClick={onSubmit}
                >
                  JOIN
                </button>
                  <button
                    className="mr-1 mb-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-corn-silk w-32 transition
                    ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
