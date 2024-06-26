"use client";
import {  IUser } from "@/types/types";
import postService from "@/utils/apiCalls/postService";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comment from "./Comment";

type Input = {
  comment: string;
};

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

function AddCommentForm({ userData }: { userData: IUser }) {
  const { id } = useParams<{ id: string }>();

  const [commentData, setCommentData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const profilePicUrl =
    userData?.profilePicUrl || "/img/DefaultProfilePicMale.png";

  const onSubmit: SubmitHandler<Input> = async (data: Input) => {
    try {
      const commentData: any = await await toast.promise(
        postService.addComment(data.comment, id),
        {
          pending: "Adding your comment",
          success: "comment added successfully",
          error: "Failed add your comment",
        },
        toastOptions
      );
      setCommentData(commentData);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="w-full h-40 bg-secColor flex rounded-lg overflow-hidden mt-2">
        <ToastContainer />
        <div className="h-full w-[25%] flex flex-col items-center justify-center">
          <Image
            src={profilePicUrl}
            alt="Profile Pic"
            width={500}
            height={500}
            className="w-20 h-20 object-cover rounded-full cursor-pointer hover:border-2"
          />
          {userData?.username && (
            <h1 className="text-white font-semibold">@{userData.username}</h1>
          )}
        </div>
        <div className="h-full w-[75%]">
          <form className="h-full w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="h-4/5 w-full p-2">
              <textarea
                className="h-full w-full rounded-lg bg-black text-white p-4"
                placeholder="Add your comment here"
                {...register("comment", {
                  required: "",
                  maxLength: {
                    value: 140,
                    message: "Must be within 140 characters",
                  },
                })}
              ></textarea>
            </div>
            <div className="flex justify-end px-4">
              <p className="text-red-600">{errors.comment?.message}</p>
              <button
                type="submit"
                className="bg-rootBg hover:bg-green-700 text-white text-xs md:text-sm font-bold p-1 rounded focus:outline-none focus-shadow-outline"
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>
      {commentData && userData._id && (
        <Comment commentData={commentData} currentUserId={userData._id} />
      )}
    </>
  );
}

export default AddCommentForm;
