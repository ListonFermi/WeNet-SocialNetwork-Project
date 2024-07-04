'use client'
import React, { useEffect, useState } from "react";
import "@/assets/styles/globals.css";
import { toast } from "react-toastify";
import postService from "@/utils/apiCalls/postService";
import FeedPost from "../FeedPost";
import FeedPostSkeleton from "../FeedPostSkeleton";
import { IPost } from "@/types/types";

function PublicFeed() {
  const [topPostsData, setTopPostsData] = useState<any>(null);

  useEffect(() => {
    (async function () {
      try {
        const {topPostsData}: {topPostsData: IPost[]} = await postService.getPublicFeed();
        setTopPostsData(topPostsData);
      } catch (error: any) {
        toast.error(error.message);
      }
    })();
  }, []);

  return (
    <>
      {topPostsData ? (
        topPostsData.map((postData: any) => postData && <FeedPost key={postData._id} postData={postData} />)
      ) : (
        <FeedPostSkeleton />
      )}
    </>
  );
}

export default PublicFeed;
