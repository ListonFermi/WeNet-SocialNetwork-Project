"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface props {
  postData: { _id: string; imageUrl: string };
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

function AddCaption({ postData }: props) {
  type Inputs = {
    _id: string;
    caption: string;
  };
  console.log({postData})
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const postsServiceUrl = process.env.NEXT_PUBLIC_POSTS_SERVICE_URL;
    try {
      console.log(data);
      data._id = postData._id;
      const res: any= await toast.promise(
        axios.post(`${postsServiceUrl}/createPost`, data, {
          withCredentials: true,
        }),
        {
          pending: "Creating post",
          success: "Post created successfully",
          error: "Failed to create post",
        },
        toastOptions
      );
      router.push(`/post/${res.data._id}`)
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
        <h1 className="font-bold text-white text-2xl">Add Caption</h1>
      </div>
      <div className="h-[30%] flex items-center justify-center">
        <Image src={postData.imageUrl} width={350} height={350} alt={"Image"} />
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
          ></textarea>
          <p className="text-red-600">{errors.caption?.message}</p>
          <div className="p-4">
            <button
              type="submit"
              className="bg-rootBg hover:bg-gray-500 p-2 rounded-lg font-bold"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCaption;
