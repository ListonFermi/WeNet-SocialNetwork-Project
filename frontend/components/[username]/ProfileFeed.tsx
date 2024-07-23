"use client";
import React, { useEffect, useState } from "react";
import FeedPost from "../FeedPost";
import postService from "@/utils/apiCalls/postService";
import { IPost, IUser } from "@/types/types";
import { useParams } from "next/navigation";

function ProfileFeed({ currUserData }: { currUserData: IUser }) {
  const [postData, setPostData] = useState<IPost[] | null>(null);

  const params = useParams<{ username: string }>();
  const paramsUsername = params.username;

  useEffect(() => {
    (async function (paramsUsername: string) {
      try {
        const postData = await postService.getProfileFeed(paramsUsername);
        console.log({ postData });
        setPostData(postData);
      } catch (error: any) {
        alert(error.message);
      }
    })(paramsUsername);
  }, [paramsUsername]);

  if (postData?.length === 0) {
    return (
      <div className="h-96 w-full flex flex-col items-center justify-center">
        <h1 className="text-white font-bold">No posts made yet!</h1>
        <div className="p-2">
          {currUserData.username == paramsUsername ? (
            <a href="/createPost">
              <button className="bg-rootBg p-2 text-white font-bold rounded-lg">
                Create a post
              </button>
            </a>
          ) : (
            <a href="/">
              <button className="bg-rootBg p-2 text-white font-bold rounded-lg">
                Go to feed
              </button>
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {postData?.length &&
        postData.map((post) => (
          <FeedPost
            key={post._id}
            postData={post}
            currUserData={currUserData}
          />
        ))}
    </div>
  );
}

export default ProfileFeed;
