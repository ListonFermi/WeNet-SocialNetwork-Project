import React from "react";
import SingleComment from "./SingleComment";
import AddComment from "./AddComment";
import Post from "./Post";

function SinglePost() {

  
   

  return (
    <>
      <div className="">
        <Post />
      </div>
      <div>
        <AddComment />
        <SingleComment />
      </div>
    </>
  );
}

export default SinglePost;
