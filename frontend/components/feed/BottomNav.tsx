import React from "react";
import Link from "next/link";
import Image from "next/image";
import getUserData from "@/utils/getUserData";

const BottomNav = () => {
  let userData;
  try {
    const decoded: any = getUserData();
    userData = decoded.userData;
  } catch (error: any) {
    console.log(error);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-2 flex justify-around items-center md:hidden">
      <a href="/" className="flex flex-col items-center">
        <Image src="/icons/home.svg" alt="Home" width={24} height={24} />
      </a>
      <a href="/notifications" className="flex flex-col items-center">
        <Image
          src="/icons/notification.svg"
          alt="Notifications"
          width={24}
          height={24}
        />
      </a>
      <a href="/messages" className="flex flex-col items-center">
        <Image src="/icons/message.svg" alt="Messages" width={24} height={24} />
      </a>
      <a
        href={`/profile/${userData?.username}/bookmarks`}
        className="flex flex-col items-center"
      >
        <Image
          src="/icons/bookmark.svg"
          alt="Bookmarks"
          width={24}
          height={24}
        />
      </a>
      <a href="/search" className="flex flex-col items-center">
        <Image src="/icons/search.svg" alt="Search" width={24} height={24} />
      </a>
      <a href="/createPost" className="flex flex-col items-center">
        <Image
          src="/icons/createPost.svg"
          alt="Create Post"
          width={24}
          height={24}
        />
      </a>
    </div>
  );
};

export default BottomNav;
