import React from "react";
import SingleComment from "./SingleComment";
import Post from "./Post";
import getUserData from "@/utils/getUserData";
import AddCommentForm from "./AddCommentForm";

function SinglePost() {

  let userData;
  try {
    const decoded: any = getUserData();
    userData = decoded.userData;
  } catch (error: any) {
    console.log(error);
  } 

  return (
    <>
      <div className="">
        <Post currUserData={userData}/>
      </div>
      <div>
        <AddCommentForm userData={userData} />
        <SingleComment userId={userData?._id} />
      </div>
    </>
  );
}

export default SinglePost;