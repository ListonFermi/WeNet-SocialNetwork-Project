"use client";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { IComment } from "@/types/types";
import { useSelector } from "react-redux";

type props = {
  userId: string;
};

function SingleComment({ userId }: props) {
  const postData = useSelector((store: any) => store?.post?.postData);

  const [comments, setComments] = useState<IComment[] | null>(null);

  useEffect(() => {
    if (postData?.comments?.length) {
      const sortedComments = [...postData.comments].sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setComments(sortedComments);
    }
  }, [postData]);

  return (
    <>
      {userId && postData ? (
        comments && comments.length > 0 ? (
          comments.map((comment: any) => (
            <Comment
              key={comment._id}
              commentData={seggregateData(comment)}
              currentUserId={userId}
            />
          ))
        ) : (
          <div>No comments yet.</div>
        )
      ) : (
        <div>Comments are loading...</div>
      )}
    </>
  );
}

export default SingleComment;

function seggregateData(singleCommentData: any): IComment {
  const { _id, userId, comment, updatedAt, createdAt } = singleCommentData;
  const { profilePicUrl, username } = userId;

  return {
    _id,
    userId: userId._id,
    profilePicUrl,
    username,
    comment,
    updatedAt,
    createdAt,
  };
}
