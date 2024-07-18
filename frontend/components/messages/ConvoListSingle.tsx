"use client";
import { formatDate, formatLastMessage } from "@/utils/formatString";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type props = {
  convoId: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicUrl: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
};

function ConvoListSingle(props: props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { convoId, username, firstName, lastName, profilePicUrl, unreadCount } =
    props;
  let { timestamp, lastMessage } = props;
  timestamp = formatDate(timestamp);
  lastMessage = formatLastMessage(lastMessage);

  const currentConvoId = searchParams.get("convoId");
  const isSelected = currentConvoId === convoId;

  function handleButtonClick() {
    router.push(`/messages?convoId=${convoId}`);
  }

  return (
    <div
      className="h-36 w-full bg-black flex p-2 cursor-pointer"
      onClick={handleButtonClick}
    >
      <div
        className={`h-full w-1/4 ${
          isSelected ? "bg-secColorH" : "bg-secColor"
        } rounded-l-xl`}
      >
        <div className="h-full w-full flex items-center">
          <Image
            src={profilePicUrl}
            alt="profilePic"
            width={200}
            height={200}
            className="h-20 w-20 ml-2 rounded-full object-cover"
          />
        </div>
      </div>
      <div
        className={`h-full w-3/4 ${
          isSelected ? "bg-secColorH" : "bg-secColor"
        }  rounded-r-xl flex flex-col items-end`}
      >
        <div className="h-1/2 w-full pt-2 flex justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold text-white">{`${firstName} ${lastName}`}</h1>
            <h1 className="font-semibold text-sm text-white">@{username}</h1>
          </div>
          <div className="flex items-center">
            <Image
              src="/icons/show.svg"
              alt=""
              width={150}
              height={150}
              className="h-4 w-4"
            />
            <p className="text-gray-400 text-xs font-semibold px-2">
              {timestamp}
            </p>
          </div>
        </div>
        <div className="h-[50%] w-full flex justify-between">
          <p className="text-white font-semibold">{lastMessage}</p>
          {unreadCount > 0 ? (
            <div className="relative mr-2">
              <div className="absolute top-0 right-0 h-6 w-6 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConvoListSingle;
