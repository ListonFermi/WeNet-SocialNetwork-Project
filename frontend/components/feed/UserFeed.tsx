"use client";
import React, { useEffect, useState } from "react";
import "@/assets/styles/globals.css";
import { toast } from "react-toastify";
import postService from "@/utils/apiCalls/postService";
import FeedPost from "../FeedPost";
import FeedPostSkeleton from "../FeedPostSkeleton";
import { IPost, IUser } from "@/types/types";

function Feed({ currUserData }: { currUserData?: IUser }) {
  const [topPostsData, setTopPostsData] = useState<any>(null);

  useEffect(() => {
    (async function () {
      try {
        const { topPostsData }: { topPostsData: IPost[] } =
          await postService.getFeed();
        setTopPostsData(topPostsData);
      } catch (error: any) {
        toast.error(error.message);
      }
    })();
  }, []);

  return (
    <>
      {topPostsData ? (
        topPostsData.map(
          (postData: any) =>
            postData && <FeedPost key={postData._id} postData={postData} currUserData={currUserData} />
        )
      ) : (
        <FeedPostSkeleton />
      )}
    </>
  );
}

export default Feed;
