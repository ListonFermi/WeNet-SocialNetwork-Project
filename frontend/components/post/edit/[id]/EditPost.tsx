"use client";
import postService from "@/utils/apiCalls/postService";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Input = {
  _id: string;
  caption: string;
};

interface post {
  _id: string;
  imageUrl: string;
  caption: string;
}

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

function EditPost() {
  const { id } = useParams<{ id: string }>();
  const [postData, setPostData] = useState<null | post>(null);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  useEffect(() => {
    (async function (id: string) {
      try {
        const data = await postService.getSinglePostData(id);
        setPostData(data);
      } catch (error) {
        console.log({ error });
      }
    })(id);
  }, []);

  if (!postData)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <h1 className="text-white font-bold">Loading</h1>
      </div>
    );

  const onSubmit: SubmitHandler<Input> = async (data) => {
    console.log({ data });
    try {
      await toast.promise(
        postService.editPost(id, data.caption),
        {
          pending: "Editing post",
          success: "Post edited successfully",
          error: "Failed to edit post",
        },
        toastOptions
      );
      router.push(`/post/${id}`)

    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.response?.data?.length
        ? error.response.data
        : "Internal server error";
      toast.error(errorMessage, toastOptions);
    }
  };

  return (
    <div className="h-full bg-secColor">
      <ToastContainer />
      <div className="h-[10%] flex items-center justify-center">
        <h1 className="font-bold text-white text-2xl">Edit Post</h1>
      </div>
      <div className="h-[30%] flex items-center justify-center">
        <Image src={postData.imageUrl} width={350} height={350} alt={"Image"} className="h-96 w-96" />
      </div>
      <div className="h-[50%] flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full w-full flex flex-col items-center justify-center"
        >
          <textarea
            className="h-[50%] w-[75%] bg-black text-white"
            {...register("caption", {
              maxLength: {
                value: 140,
                message: "Caption should be less than 140 characters",
              },
            })}
            defaultValue={postData.caption}
          ></textarea>
          <p className="text-red-600">{errors.caption?.message}</p>
          <div className="p-4">
            <button
              type="submit"
              className="bg-rootBg hover:bg-gray-500 p-2 rounded-lg font-bold"
            >
              Edit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
