import React from "react";

export default function Message({
  cypherData,
  message,
  setChatWindowData,
  chatWindowData,
}) {
  return (
    <>
      <div className="bg-slate-900 hover:bg-slate-800 rounded-b px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex items-start">
          <div className=" flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg
              className="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div className="flex justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-500">
                {chatWindowData.users[0].userName}
              </h3>
              <p className="text-sm font-bold text-gray-500">
                {message ? message : "no message"}
              </p>
            </div>
            <div className="flex justify-start mt-2">
              <p className="text-sm text-gray-500">
                {/* {lastMessageText ? lastMessageText : ""} */}
              </p>
              <p className="text-sm text-gray-500">
                {/* {cypherData ? cypherData._id : "testing"} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
