"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Comment from "./Comment";
import { IComment, IUser } from "@/types/types";
import { useSelector } from "react-redux";

type props = {
  userId: string;
};

function SingleComment({ userId }: props) {
  const postData = useSelector((store: any) => store?.post?.postData);

  return (
    <>
      {(userId && postData) ? (
        postData.comments.map((comment:any) => {
          return <Comment key={comment._id} commentData={seggregateData(comment)} currentUserId={userId}/>;
        })
      ) : (
        <div>Comments are loading...</div>
      )}
    </>
  );
}

export default SingleComment;

function seggregateData(singleCommentData:any): IComment {
  const { _id,userId, comment, updatedAt } = singleCommentData;
  const { profilePicUrl, username } = userId;

  return {
    _id,
    userId: userId._id,
    profilePicUrl,
    username,
    comment,
    updatedAt,
  };
}
