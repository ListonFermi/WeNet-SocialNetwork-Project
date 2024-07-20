"use client";
import React, { useEffect, useState } from "react";
import "@/assets/styles/globals.css";
import { toast } from "react-toastify";
import postService from "@/utils/apiCalls/postService";
import FeedPost from "../FeedPost";
import FeedPostSkeleton from "../FeedPostSkeleton";
import { IPost, IUser } from "@/types/types";
import userService from "@/utils/apiCalls/userService";

function Feed({ currUserData }: { currUserData?: IUser }) {
  const [topPostsData, setTopPostsData] = useState<IPost[] | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<IPost[] | null>(null);
  const [otherPosts, setOtherPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    console.log("started uE");
    (async function () {
      try {
        let { topPostsData }: { topPostsData: IPost[] } =
          await postService.getFeed();
        topPostsData = topPostsData.filter((data) => data && data?.userId);

        const followingUsers = await userService.getFollowingUsers();

        setTopPostsData(topPostsData);

        const filteredPosts = topPostsData.filter((post) =>
          followingUsers.includes(post.userId)
        );
        setFilteredPosts(filteredPosts);

        const otherPosts = topPostsData.filter(
          (post) => !followingUsers.includes(post.userId)
        );
        setOtherPosts(otherPosts);
      } catch (error: any) {
        toast.error(error.message || "An error occurred");
        setTopPostsData(null);
        setFilteredPosts(null);
        setOtherPosts(null);
      }
    })();
  }, []);

  return (
    <>
      {topPostsData ? (
        topPostsData.length === 0 ? (
          <div className="h-96 w-full flex flex-col items-center justify-center">
            <h1 className="text-white font-bold">
              No posts to show from followers!
            </h1>
          </div>
        ) : (
          <>
            {filteredPosts?.map(
              (postData) =>
                postData && (
                  <FeedPost
                    key={postData._id}
                    postData={postData}
                    currUserData={currUserData}
                  />
                )
            )}
            <div className="w-full flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold p-4">
                Suggested Posts
              </h2>
            </div>
            {otherPosts?.map(
              (postData) =>
                postData && (
                  <FeedPost
                    key={postData._id}
                    postData={postData}
                    currUserData={currUserData}
                  />
                )
            )}
          </>
        )
      ) : (
        <FeedPostSkeleton />
      )}
    </>
  );
}

export default Feed;
