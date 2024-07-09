"use client";
import React, { useEffect, useState } from "react";
import FeedPost from "../FeedPost";
import postService from "@/utils/apiCalls/postService";
import { IPost, IUser } from "@/types/types";
import { useParams } from "next/navigation";

function ProfileFeed({ currUserData }: { currUserData: IUser }) {
  const [postData, setPostData] = useState<IPost[] | null>(null);

  const params = useParams<{ username: string }>();
  const paramsUsername = params.username;

  useEffect(() => {
    (async function (paramsUsername: string) {
      try {
        const postData = await postService.getProfileFeed(paramsUsername);
        console.log({postData})
        setPostData(postData);
      } catch (error: any) {
        alert(error.message);
      }
    })(paramsUsername);
  }, []);

  return (
    <div>
      {postData?.length &&
        postData.map((post) => (
          <FeedPost key={post._id} postData={post} currUserData={currUserData} />
        ))}
    </div>
  );
}

export default ProfileFeed;
