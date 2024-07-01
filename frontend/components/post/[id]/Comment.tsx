import { IComment } from "@/types/types";
import { formatDate } from "@/utils/formatString";
import Image from "next/image";
import React from "react";


type props = {
  commentData: IComment;
  currentUserId: string;
};

function Comment({ commentData, currentUserId }: props) {
  const {
    userId='',
    profilePicUrl = "",
    username = "",
    comment = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim.`,
    isLiked = false,
    likedBy = [],
    updatedAt
  } = commentData;
  const likesCount = likedBy.length;

  const timestamp = formatDate(updatedAt);


  const isOwnComment = userId === currentUserId;

  return (
    <div className="w-full h-32 bg-secColor flex rounded-lg overflow-hidden mt-2">
      <div className="h-full w-[25%] flex flex-col items-center justify-center">
        <Image
          src={profilePicUrl}
          alt="Profile Pic"
          width={500}
          height={500}
          className="w-20 h-20 object-cover rounded-full cursor-pointer hover:border-2"
        />
        <h1 className="text-white font-semibold">@{username}</h1>
      </div>
      <div className="h-full w-[75%]">
        <div className="h-4/5 flex items-center">
          <p className="py-2 px-1 text-md font-semibold text-white">{comment}</p>
        </div>
        <div className="h-1/5 flex justify-between first-line px-5">
          <div className="flex items-center">
            <Image
              src="/icons/show.svg"
              alt=""
              width={150}
              height={150}
              className="h-4 w-4"
            />
            <p className="text-gray-400 text-xs font-semibold px-2">{timestamp}</p>
          </div>
          {/* <span className={`${isLiked ? "text-pink-500" : "text-rootBg"} flex`}>
            <Image
              src={`/icons/${isLiked ? "heart.svg" : "notLiked.png"}`}
              width={150}
              height={150}
              alt=""
              className="h-6 w-6"
            />
            <p className="font-bold text-sm">{likesCount}</p>
          </span> */}
          <Image
            src="/icons/menu.svg"
            alt=""
            width={150}
            height={150}
            className="h-6 w-6"
          />
        </div>
      </div>
    </div>
  );
}

export default Comment;
