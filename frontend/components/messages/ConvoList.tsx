import React from "react";
import ConvoListSingle from "./ConvoListSingle";
import sampleConversations from "./temp";

function ConvoList() {
  /* 
    
        get an array of all convos
        [
         { convoId: ,
           username:,
           profilePicUrl:,
           time:   
         }
        ]
    
    */

  //return from an api :
  const convoList = sampleConversations;

  return (
    <>
      <div className="h-[10%] w-full flex bg-black">
        <h1 className="h-full w-full flex items-center justify-center font-bold text-xl text-white">
          Conversations
        </h1>
      </div>
      <div className="h-full overflow-y-auto no-scrollbar bg-black">
        {convoList.map((convo) => {
          const {
            convoId,
            username,
            firstName,
            lastName,
            profilePicUrl,
            timestamp,
            lastMessage,
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
            />
          );
        })}
      </div>
    </>
  );
}

export default ConvoList;
