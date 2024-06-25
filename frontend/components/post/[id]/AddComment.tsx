import getUserData from "@/utils/getUserData";
import React from "react";
import AddCommentForm from "./AddCommentForm";

function AddComment() {
  let userData;
  try {
    const decoded: any = getUserData();
    userData = decoded.userData;
  } catch (error: any) {
    console.log(error);
  }

  return <AddCommentForm userData={userData}/>
}

export default AddComment;
