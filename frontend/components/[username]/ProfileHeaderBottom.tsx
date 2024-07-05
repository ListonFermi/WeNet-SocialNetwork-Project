"use client";
import { IUser } from "@/types/types";
import React from "react";

function ProfileHeaderBottom({ userData }: { userData: IUser }) {
  
  let followingCount, followersCount;
  if (userData && userData?.followers && userData?.following) {
    const { followers, following } = userData;

    followingCount = following.length;
    followersCount = followers.length;
  }

  return (
    <div className=" h-24 w-full pt-2 bg-secColor">
      {/* Follower Following Count  */}
      <div className="h-full flex justify-around">
        <div className="flex flex-col items-center">
          {!userData ? (
            <div className="h-9 w-9 shadow-md bg-secColor animate-pulse"></div>
          ) : (
            <h1 className="text-4xl font-bold text-white">{followingCount}</h1>
          )}
          <p className="font-semibold text-white">Following</p>
        </div>
        <div className="flex flex-col items-center">
          {!userData ? (
            <div className="h-9 w-9 shadow-md bg-secColor animate-pulse"></div>
          ) : (
            <h1 className="text-4xl font-bold text-white">{followersCount}</h1>
          )}
          <p className="font-semibold text-white">Followers</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeaderBottom;
