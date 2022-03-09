import React from "react";

export default function Message({
  cypherData,
  message,
  setChatWindowData,
  chatWindowData,
}) {
  return (
    <>
      <div className="bg-slate-900 rounded px-1 pt-1 pb-1 sm:p-6 sm:pb-4">
        <div className="flex items-start">
          <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div className="flex justify-start mt-1">
              <p className="text-sm text-white">
                {message ? message.createdAt : "no message"}
              </p>
            </div>
            <div className="flex">
              <h3 className="text-md leading-6 font-medium text-white">
                {message ? message.username : "no message"}-
              </h3>
              <p className="text-md font-bold text-white">
                {message ? message.messageText : "no message"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
