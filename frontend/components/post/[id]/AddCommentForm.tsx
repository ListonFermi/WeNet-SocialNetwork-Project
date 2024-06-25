"use client";
import { IUser } from "@/types/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

type Input = {
    comment: string;
  };

function AddCommentForm({ userData }: { userData: IUser }) {
  
    const { postId } = useParams<{ postId: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const profilePicUrl =
    userData?.profilePicUrl || "/img/DefaultProfilePicMale.png";

  const onSubmit: SubmitHandler<Input> = async (data: Input) => {
    toast(data.comment);
    // let response: any = await toast.promise(
    //     // axios.post(`${userServiceUrl}/signup`, data),
    //     {
    //       pending: "Signing up",
    //       success: "User registered successfully",
    //       error: "Failed to signup",
    //     },
    //     // toastOptions
    //   );


  };

  return (
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
                required: "Username is required",
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
  );
}

export default AddCommentForm;
