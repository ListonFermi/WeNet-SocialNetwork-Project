import Image from "next/image";
import React from "react";
import FeedPostSkeleton from "./FeedPostSkeleton";
import { formatDate } from "@/utils/formatDate";

type post = {
  username: string;
  firstName: string;
  lastName: string;
  profilePicUrl: string;
  caption: string;
  imageUrl: string;
  time: Date;
  likedBy: string[];
  comments: string[];
  updatedAt: string;
  isLiked: boolean;
};

function FeedPost({ postData }: { postData: post | null }) {
  if (!postData) return <FeedPostSkeleton />;

  const { username, firstName, lastName, caption, imageUrl, isLiked } =
    postData;

  let { profilePicUrl } = postData;

  if (!profilePicUrl.length) profilePicUrl = "/img/DefaultProfilePicMale.png";

  const { likedBy, comments, updatedAt } = postData;
  const likesCount = likedBy.length;
  const commentsCount = comments.length;
  const timestamp = formatDate(updatedAt);

  return (
    <div className="bg-secColor mb-2 mt-2 shadow-md rounded-lg">
      <div className="flex justify-evenly py-2">
        <div className="flex items-center">
          <div>
            <Image
              src={profilePicUrl}
              alt="Profile Pic"
              width={150}
              height={150}
              className="w-16 h-16 object-cover rounded-full"
            />
            <p className="text-white text-sm font-semibold">@{username}</p>
          </div>
          <div className="px-4">
            <h3 className="text-white text-xl font-bold">{`${firstName} ${lastName}`}</h3>
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
        </div>
        <Image
          src="/icons/menu.svg"
          alt=""
          width={150}
          height={150}
          className="h-8 w-8 mt-4 justify-end"
        />
      </div>
      <p className="font-semibold px-6 py-2 text-white">{caption}</p>
      <Image
        src={imageUrl}
        alt="Tokyo"
        width={1000}
        height={1000}
        className="w-full h-[400px] object-cover  mt-4"
      />
      <div className="flex justify-between items-center p-4">
        <span className={`${isLiked ? "text-pink-500" : "text-rootBg"} flex`}>
          <Image
            src={`/icons/${isLiked ? "heart.svg" : "notLiked.png"}`}
            width={150}
            height={150}
            alt=""
            className="h-8 w-8"
          />
          <p className="font-bold">{likesCount}</p>
        </span>
        <span className="text-purple-500 flex items-center">
          <Image
            src="/icons/chat.svg"
            width={150}
            height={150}
            alt=""
            className="h-8 w-8"
          />
          <p className="font-bold">{commentsCount}</p>
        </span>
        <Image
          src="/icons/bookmark.svg"
          width={150}
          height={150}
          alt=""
          className="h-8 w-8 mb-2"
        />
      </div>
    </div>
  );
}

export default FeedPost;
