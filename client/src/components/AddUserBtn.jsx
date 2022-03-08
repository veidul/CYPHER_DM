import React, { useState } from "react";

export default function AddUserBtn(textToCopy) {
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
          " text-sm border w-36 border-gray-500 rounded p-2 transition"
        }
      >
        {copied ? "Copied" : "Copy to clipboard"}
      </button>
    </div>
  );
}
