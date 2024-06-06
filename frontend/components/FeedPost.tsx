import Image from "next/image";
import React from "react";

type post = {
  name: String;
  handle: String;
  content: String;
  timestamp: String;
  retweets: Number;
  likes: Number;
};

function FeedPost() {
  const username = "Buffet";
  const firstName = "Warren";
  const lastName = "Buffet";
  const imageUrl = "/img/DemoProfilePic.jpg";
  const caption =
    "Excited to visit Tokyo soon! Cant wait to explore the city and enjoy all it has to offer";
  const timestamp = "5 min ago";
  const likesCount = "1.2k";
  const commentsCount = "300";
  return (
    <div className="bg-secColor mb-4 shadow-md rounded-lg">
      <div className="flex justify-evenly py-2">
        <div className="flex items-center">
          <div>
            <Image
              src={imageUrl}
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
      <p className="font-semibold p-2 text-white">{caption}</p>
      <Image
        src="/img/DemoPost.jpg"
        alt="Tokyo"
        width={1000}
        height={1000}
        className="w-full h-[400px] object-cover  mt-4"
      />
      <div className="flex justify-between items-center p-4">
        <span className="text-pink-500 flex">
          <Image
            src="/icons/heart.svg"
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
