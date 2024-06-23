import Image from "next/image";
import React from "react";

function SingleComment() {
  return (
    <div className="w-full h-32 bg-red-500 flex">
      <div className="h-full w-[25%] bg-yellow-300 flex flex-col items-center justify-center">
        <Image
          src={""}
          alt="Profile Pic"
          width={500}
          height={500}
          className="w-20 h-20 object-cover rounded-full cursor-pointer hover:border-2"
        />
        <h1 className="text-white font-semibold">@Charlie</h1>
      </div>
      <div className="h-full w-[75%] bg-purple-400">
        <div className="h-4/5 bg-purple-700 flex align-top justify-center">
          <p className="p-1 text-md font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim.
          </p>
        </div>
        <div className="h-1/5 bg-red-900"></div>
      </div>
    </div>
  );
}

export default SingleComment;
