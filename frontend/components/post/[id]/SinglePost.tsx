"use client";
import React from "react";
import SingleComment from "./SingleComment";
import AddComment from "./AddComment";
import FeedPostSkeleton from "../../FeedPostSkeleton";
import { useParams } from "next/navigation";
import Post from "./Post";

function SinglePost() {
  const params = useParams<{ id: string }>();
  console.log(params.id);

  return (
    <>
      <div className="">
        <Post/>
      </div>
      <div>
        <AddComment />
        <SingleComment />
      </div>
    </>
  );
}

export default SinglePost;
