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

function FeedPostSkeleton() {
  const firstName = ".......";
  const lastName = ".............";

  const timestamp = ".....";
  const likesCount = "........";
  const commentsCount = ".....";
  const isLiked = false;
  return (
    <div className="bg-secColor mb-2 mt-2 shadow-md rounded-lg">
      <div className="flex justify-evenly py-2">
        <div className="flex items-center">
          <div>
            <div className="w-16 h-16 object-cover rounded-full bg-secColorH animate-pulse"></div>
            <p className="text-secColorH text-sm font-semibold bg-secColorH rounded-lg animate-pulse">
              ........
            </p>
          </div>
          <div className="px-4">
            <h3 className="text-secColorH text-xl font-bold bg-secColorH rounded-lg animate-pulse">{`${firstName} ${lastName}`}</h3>
            <div className="flex items-center">
              <Image
                src="/icons/show.svg"
                alt=""
                width={150}
                height={150}
                className="h-4 w-4"
              />
              <p className="text-secColorH  text-xs font-semibold px-2 bg-secColorH rounded-lg animate-pulse">
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
      <p className="font-semibold p-2 text-secColorH bg-secColorH animate-pulse rounded-lg mx-2">

      </p>
      <div className="w-full h-[400px] object-cover  mt-4 bg-secColorH animate-pulse rounded-lg"></div>
      {/* <Image
        src="/img/DemoPost.jpg"
        alt="Tokyo"
        width={1000}
        height={1000}
        className="w-full h-[400px] object-cover  mt-4"
      /> */}
      <div className="flex justify-between items-center p-4">
        <span className={`${isLiked ? "text-pink-500" : "text-rootBg"} flex`}>
          <Image
            src={`/icons/${isLiked ? "heart.svg" : "notLiked.png"}`}
            width={150}
            height={150}
            alt=""
            className="h-8 w-8"
          />
          <p className="font-bold text-secColorH bg-secColorH animate-pulse rounded-lg">
            {likesCount}
          </p>
        </span>
        <span className="text-purple-500 flex items-center">
          <Image
            src="/icons/chat.svg"
            width={150}
            height={150}
            alt=""
            className="h-8 w-8"
          />
          <p className="font-bold text-secColorH bg-secColorH animate-pulse rounded-lg">{commentsCount}</p>
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

export default FeedPostSkeleton;
