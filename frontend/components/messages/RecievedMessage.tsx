import { formatDate } from "@/utils/formatString";
import Image from "next/image";
import React from "react";

type props = {
  username: string;
  profilePicUrl: string;
  message: string;
  timestamp: string;
};

function RecievedMessage(props: props) {
  const { profilePicUrl, message } = props;
  let { timestamp } = props;
  timestamp = formatDate(timestamp);

  return (
    <div className="h-auto w-[60%] flex">
      <div className="w-[5%] flex flex-col-reverse mr-2">
        <Image
          src={profilePicUrl}
          alt="profilePic"
          width={30}
          height={30}
          className="rounded-full object-cover ml-1"
        />
      </div>
      <div className="bg-secColor h-auto py-4 w-[95%] mt-4 rounded-lg flex flex-col">
        <div className="h-auto w-full">
          <p className="text-white p-2 h-auto break-words">{message}</p>
        </div>
        <div className="flex items-center px-2 flex-row-reverse">
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
    </div>
  );
}

export default RecievedMessage;
