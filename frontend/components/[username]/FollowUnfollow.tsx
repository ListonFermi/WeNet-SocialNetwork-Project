"use client";
import React, { useEffect, useState } from "react";
import UnFollowAlert from "./UnFollowAlert";
import userService from "@/utils/apiCalls/userService";

type props = {
  userId: string;
  username: string
};

function FollowUnfollow(props: props) {
  const { userId , username} = props;

  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    (async function (userId) {
      try {
        const isFollowing = await userService.isFollowing(userId);
        console.log({isFollowing})
        setIsFollowing(isFollowing);
      } catch (error: any) {
        alert(error.messaage);
      }
    })(userId);
  }, []);

  if (isFollowing === null) return;

  async function toggleFollow() {
    try {
      const isFollowing = await userService.toggleFollow(userId);
      setIsFollowing(isFollowing);
    } catch (error: any) {
      alert(error.messaage);
    }
  }

  return (
    <div className="p-2">
      {isFollowing ? (
        <UnFollowAlert alert={`Are you sure you want to unfollow ${username} ?`} onConfirm={toggleFollow}>
          <button
            type="button"
            className="bg-red-700 hover:bg-red-500 text-white text-xs md:text-sm font-bold p-2 rounded focus:outline-none focus-shadow-outline"
          >
            UnFollow
          </button>
        </UnFollowAlert>
      ) : (
        <button
          type="button"
          className="bg-rootBg hover:bg-green-700 text-white text-xs md:text-sm font-bold p-2 rounded focus:outline-none focus-shadow-outline"
          onClick={toggleFollow}
        >
          Follow
        </button>
      )}
    </div>
  );
}

export default FollowUnfollow;
