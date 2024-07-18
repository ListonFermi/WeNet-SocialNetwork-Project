"use client";
import React, { useEffect, useState } from "react";
import ConvoListSingle from "./ConvoListSingle";
import messageService from "@/utils/apiCalls/messageService";

function ConvoList() {
  const [convoList, setConvoList] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const convoList = await messageService.getConvoList();
        setConvoList(convoList);
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, []);

  return (
    <>
      <div className="h-[10%] w-full flex bg-black">
        <h1 className="h-full w-full flex items-center justify-center font-bold text-xl text-white">
          Conversations
        </h1>
      </div>
      <div className="h-full overflow-y-auto no-scrollbar bg-black">
        {convoList.length > 0 ? (
          convoList.map((convo) => {
            const {
              convoId,
              username,
              firstName,
              lastName,
              profilePicUrl,
              timestamp,
              lastMessage,
              unreadCount
            } = convo;

            return (
              <ConvoListSingle
                key={convoId}
                convoId={convoId}
                username={username}
                firstName={firstName}
                lastName={lastName}
                profilePicUrl={profilePicUrl}
                lastMessage={lastMessage}
                timestamp={timestamp}
                unreadCount={unreadCount}
              />
            );
          })
        ) : (
          <div>
            <h1>No Conversations</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default ConvoList;
