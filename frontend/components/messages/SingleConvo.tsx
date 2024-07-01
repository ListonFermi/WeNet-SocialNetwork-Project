"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import sampleConversations, { sampleMsgData } from "./temp";
import SingleMessage from "./SingleMessage";
import { IUser } from "@/types/types";
import { useDispatch } from "react-redux";
import { saveUser } from "@/redux/userSlice";

function SingleConvo({ currUser }: { currUser: IUser }) {
  const searchParams = useSearchParams();

  const convoId = searchParams.get('convoId');


  const username = sampleConversations.find(
    (val) => val.convoId === convoId
  )?.username;

  const messages = sampleMsgData;


  return (
    <div className="h-full w-full bg-blue-600">
      <div className="h-14 w-full bg-black">
        <h1 className="h-full w-full flex items-center justify-center font-bold text-xl text-white">
          {username}
        </h1>
      </div>
      <div className="h-full bg-yellow-400 overflow-y-auto no-scrollbar">
        {/* SingleMessage currUserId senderId  message timestamp   */}
        {messages.map((msg, index) => {
          const { senderId, message, timestamp } = msg;
          console.log("Rendering message:", {
            senderId,
            message,
            timestamp,
            currUser,
          });

          return (
            <SingleMessage
              key={index}
              currUser={currUser}
              senderId={senderId}
              message={message}
              timestamp={timestamp}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SingleConvo;
