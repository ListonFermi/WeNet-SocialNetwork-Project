import Image from "next/image";
import React from "react";

function Convo(prop: { convoId: string }) {
  const { convoId } = prop;
  console.log({ convoId });

  //grab the below data from the message-service using the convoId

  const profilePic = "/img/DefaultProfilePicMale.jpg";
  const username = "GeorgeSoros";
  let lastMessage =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aut quos laudantium temporibus, maxime a! Magnam iusto sequi officiis quidem consequuntur assumenda nostrum, sed ipsam vel voluptatibus possimus, quos at.";
  lastMessage =
    lastMessage.length > 80
      ? lastMessage.substring(0, 77) + " ..."
      : lastMessage;
  const time = "25 Jun 1:29AM";



  return (
    <div className="h-24 w-full bg-green-400 flex my-2">
      <div className="h-full w-[30%] bg-yellow-800 flex items-center justify-center">
        <Image
          src={profilePic}
          alt="profile pic"
          width={100}
          height={100}
          className="h-20 w-20 object-cover rounded-full"
        />
      </div>
      <div className="h-full w-full bg-cyan-400">
        <div className="h-1/4 w-full bg-black flex items-center">
          <h1 className="text-white font-bold text-sm ml-4">@{username}</h1>
        </div>
        <div className="h-2/4 w-full bg-black flex items-center">
          <h1 className="text-white font-semibold text-sm mx-4 h-full overflow-hidden">
            {lastMessage}
          </h1>
        </div>
        <div className="h-1/4 w-full bg-pink-700 flex items-center">
          <Image
            src="/icons/show.svg"
            alt=""
            width={150}
            height={150}
            className="h-4 w-4 ml-4"
          />
          <p className="text-white text-xs font-normal ml-2">{time}</p>
        </div>
      </div>
    </div>
  );
}

export default Convo;
