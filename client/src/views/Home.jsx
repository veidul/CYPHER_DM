import React from "react";

export default function componentName() {
  return (
    <>
      <div className="flex flex-row">
    <div className="float-left flex-col relative flex h-screen w-3/12 bg-white border-r-2 border-black">
      <div className="flex flex-col h-1/6 bg-white border-2 border-black"><h1 className=" text-center border-b-2 h-2/6 border-black text-black">Cyphers</h1>
      <div class="flex justify-center">
  <div class="mb-3 xl:w-96">
    <div class="input-group relative flex flex-wrap items-stretch w-full my-4">
      <input type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon3"/>
      <button class="btn inline-block px-6 py-2 bg-purple-600 text-white font-medium text-xs leading-tight uppercase hover:bg-purple-700 focus:ring-offset-purple-200 focus:outline-none focus:ring-2 transition duration-200 ease-in-out focus:ring-offset-2 rounded-lg" type="button" id="button-addon3">Search</button>
    </div>
  </div>
</div>
      </div>
      <button className="absolute top-28 right-2 py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-32 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"> New Cypher </button>
      
      test
    </div>
    <div className="float-right h-screen w-9/12 bg-white">
    Test
    </div>
      </div>
    </>
  );
}
