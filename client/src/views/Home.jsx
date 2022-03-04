import React from "react";
import { useMutation } from "@apollo/client"
import { ADD_CYPHER } from "../utils/mutations";

export default function componentName() {

	const[addCypher, {error, data}] = useMutation(ADD_CYPHER);

	const handleSubmit = async (token) => {
	try {
    const userId = token.user.userId
		await addCypher({variables: {userId}
    })
	}catch(err){
		console.log(err)
	}
	}

  return (
    <>
      <div className="flex flex-row">
    <div className="float-left flex-col relative flex h-screen w-3/12 bg-white">
      <div className="flex flex-col h-1/6 bg-white border-x-2 border-t-2 mt-1 ml-1 rounded-t border-black"><h1 className=" text-center border-b-2 h-2/6 border-black text-black">Cyphers</h1>
      <div className="flex justify-center">
  <div className="mb-3 xl:w-96">
    <div className="input-group relative flex items-stretch w-full my-4">
      <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white
       bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Search" aria-label="Search" aria-describedby="button-addon3"/>
      <button className="btn inline-block px-6 py-2 bg-purple-600 text-white font-medium text-xs leading-tight uppercase hover:bg-purple-700 focus:ring-offset-purple-200
       focus:outline-none focus:ring-2 transition duration-200 ease-in-out focus:ring-offset-2 rounded-lg" type="button" id="button-addon3">Search</button>
    </div>
  </div>
</div>
      <button className="ml-auto mr-1 mb-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-32 transition
       ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"> New Cypher </button>
      </div>
      <div className="flex flex-col h-3/4 bg-white border-2 ml-1 rounded-b border-black">

      </div>
    </div>
    <div className="float-right flex-colrelative h-screen w-9/12 bg-red overflow-auto">
    <div className="bg-red h-3/4 border-2 rounded-t border-black mt-1 m-l-1">area for messages to be appended</div>
    <div className="bg-blue h-1/6 border-x-2 rounded-b border-b-2 border-black relative">
      <input className="absolute h-full block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded
       shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed
"/>
<button onClick={handleSubmit} className="absolute right-0 bottom-0 ml-auto z-50 mr-1 mb-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-32 transition
       ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"> SEND </button>
</div>
    </div>
      </div>
    </>
  );
}
