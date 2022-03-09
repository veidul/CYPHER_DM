import React, { useState } from "react";

export default function CopyBtn(textToCopy) {
  const [copied, setCopied] = useState(false);
  const Id = textToCopy.textToCopy.cypherId;
  console.log(Id, "text to copy");
  const copyToClipboard = () => {
    navigator.clipboard.writeText(Id).then(
      () => {
        setCopied(true);
        // changing back to default state after 2 seconds.
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.log("failed to copy", err.mesage);
      }
    );
  };

  const btnStyle = copied ? "bg-gray-500 text-white" : "";

  return (
    <div className="text-center my-5">
      <button
        onClick={copyToClipboard}
        className={
          btnStyle +
          "mr-1 mb-1 py-1 px-1 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-32 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        }
      >
        {copied ? "Copied" : "Copy to clipboard"}
      </button>
    </div>
  );
}
