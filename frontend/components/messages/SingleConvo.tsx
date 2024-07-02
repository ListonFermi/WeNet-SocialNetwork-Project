"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import sampleConversations, { sampleMsgData } from "./temp";
import SingleMessage from "./SingleMessage";
import { IUser } from "@/types/types";

function SingleConvo({ currUser }: { currUser: IUser }) {
  const searchParams = useSearchParams();

  const convoId = searchParams.get("convoId");

  const username = sampleConversations.find(
    (val) => val.convoId === convoId
  )?.username;

  const messages = sampleMsgData;

  return (
    <div className="h-full w-full">
      <div className="h-[10%] w-full bg-black">
        <h1 className="h-full w-full flex items-center justify-center font-bold text-xl text-white">
          {username}
        </h1>
      </div>
      <div className="h-[80%] flex flex-col-reverse overflow-y-auto no-scrollbar">
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
      <div className="h-[10%] w-full  flex justify-center">
        <form className="h-full w-full flex items-center justify-center">
          <input
            type="text"
            placeholder="Type your message here"
            className="p-4 w-[75%] bg-secColor text-white border-none rounded-l-lg"
          />
          <button
            type="submit"
            className="p-4 bg-rootBg text-white font-bold rounded-r-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default SingleConvo;
