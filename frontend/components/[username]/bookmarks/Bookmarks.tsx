'use client'
import React, { useEffect, useState } from "react";
import "@/assets/styles/globals.css";
import { toast } from "react-toastify";
import postService from "@/utils/apiCalls/postService";
import { IPost } from "@/types/types";
import FeedPost from "@/components/FeedPost";
import FeedPostSkeleton from "@/components/FeedPostSkeleton";

function Bookmarks() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<any>(null);

  useEffect(() => {
    (async function () {
      try {
        const bookmarkedPosts: IPost[] = await postService.getBookmarkedPosts();
        setBookmarkedPosts(bookmarkedPosts);
      } catch (error: any) {
        toast.error(error.message);
      }
    })();
  }, []);

  return (
    <>
      <div className="w-full flex justify-center py-10">
        <h1 className="text-3xl text-white font-bold">Bookmarked posts</h1>
      </div>
      {bookmarkedPosts ? (
        bookmarkedPosts.map((postData: any) => <FeedPost key={postData._id} postData={postData} />)
      ) : (
        <FeedPostSkeleton />
      )}
    </>
  );
}

export default Bookmarks;
