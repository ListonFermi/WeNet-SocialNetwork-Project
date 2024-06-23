import FeedPost from "@/components/FeedPost";
import React from "react";
import SingleComment from "./SingleComment";

function SinglePost() {
  return (
    <>
      <div className="">
        <FeedPost />
      </div>
      <div>
        <SingleComment/>
      </div>
    </>
  );
}

export default SinglePost;
