"use client";
import React, { useEffect, useState } from "react";
import FeedPost from "../FeedPost";
import postService from "@/utils/apiCalls/postService";
import { IPost } from "@/types/types";
import { useParams } from "next/navigation";

function ProfileFeed({ currUserId }: { currUserId: string }) {
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
          <FeedPost postData={post} currentUserId={currUserId} />
        ))}
    </div>
  );
}

export default ProfileFeed;
