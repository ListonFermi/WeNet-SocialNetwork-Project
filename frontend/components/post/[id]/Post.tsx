"use client";
import React, { useEffect, useState } from "react";
import FeedPostSkeleton from "../../FeedPostSkeleton";
import FeedPost from "../../FeedPost";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import postService from "@/utils/apiCalls/postService";

const toastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
};

function Post() {

  const { id } = useParams<{ id: string }>();

  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function (id: string) {
      try {
        const postData = await postService.getSinglePostData(id);
        setPostData(postData);
        setLoading(false);
      } catch (error: any) {
        toast.error('error', toastOptions);
      }
    })(id);
  }, []);

  return (
    <>
      <ToastContainer />
      {loading ? <FeedPostSkeleton /> : <FeedPost postData={postData} />}
    </>
  );
}

export default Post;
