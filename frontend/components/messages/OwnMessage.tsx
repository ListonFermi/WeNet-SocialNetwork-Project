import { formatDate } from "@/utils/formatString";
import Image from "next/image";
import React from "react";

type props = {
  message: string;
  timestamp: string;
};

function OwnMessage({ message, timestamp }: props) {
  timestamp = formatDate(timestamp);

  return (
    <div className="h-auto w-full flex justify-end">
      <div className="w-[60%] flex mr-2">
        <div className="bg-rootBg h-auto py-4 w-full mt-4 rounded-lg flex flex-col">
          <div className="h-auto w-full">
            <p className="text-black p-2 h-auto break-words font-semibold">
              {message}
            </p>
          </div>
          <div className="flex items-center px-2 flex-row">
            <Image
              src="/icons/show.svg"
              alt=""
              width={150}
              height={150}
              className="h-4 w-4"
            />
            <p className="text-black text-xs font-semibold px-2">{timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnMessage;
