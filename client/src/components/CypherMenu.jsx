import React from "react";
import Auth from "../utils/auth"
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
export default function CypherMenu(/*{usersTitle, lastMessageDate, lastMessageText}*/) {

    return (
        <>
            <div className="flex flex-col bg-slate-900 h-3/4 border-2 ml-1 border-black relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                {/*needs code to map cyperData as cypher component*/}
                <Cypher usersTitle="DM_Boys" lastMessageDate="3/2" lastMessageText="up all night"/>
                <Cypher usersTitle="Naji and Ludie" lastMessageDate="3/3" lastMessageText="get on WOW"/>
                <Cypher usersTitle="HackerChat" lastMessageDate="3/4" lastMessageText="for ten hours straight"/>
                <Cypher usersTitle="Naji, Ludie and Braulio" lastMessageDate="3/5" lastMessageText="Committed this late friday night"/>
                <Cypher usersTitle="Gif_Stream" lastMessageDate="3/6" lastMessageText="this is the fun channel"/>
            </div>
        </>
	);
}


