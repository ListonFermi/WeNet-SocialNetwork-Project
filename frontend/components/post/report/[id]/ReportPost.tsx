"use client";
import postService from "@/utils/apiCalls/postService";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostPreview from "./PostPreview";

type Input = {
  _id: string;
  reportType: string;
  reportDescription: string;
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

function ReportPost() {
  const { id } = useParams<{ id: string }>();
  const [postData, setPostData] = useState<null | post>(null);
  const router = useRouter();

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

  const reportTypes = [
    { value: "spam", label: "Spam" },
    { value: "abuse", label: "Abuse" },
    { value: "harassment", label: "Harassment" },
    { value: "misinformation", label: "Misinformation" },
    { value: "inappropriate", label: "Inappropriate Content" },
    { value: "hate_speech", label: "Hate Speech" },
    { value: "violence", label: "Violence" },
    { value: "self_harm", label: "Self-Harm" },
    {
      value: "intellectual_property_violation",
      label: "Intellectual Property Violation",
    },
    { value: "other", label: "Other" },
  ];

  const onSubmit: SubmitHandler<Input> = async (data) => {
    try {
      const { reportType, reportDescription } = data;
      await toast.promise(
        postService.reportEntity("posts", id, reportType, reportDescription),
        {
          pending: "Reporting post",
          success: "Post reported successfully",
          error: "Failed to report post",
        },
        toastOptions
      );
        router.push(`/post/${id}`);
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
      <div className="h-[15%] flex items-center justify-center">
        <h1 className="font-bold text-white text-2xl">Report Post</h1>
      </div>
      <div className="h-[30%] flex flex-col items-center justify-center">
        <PostPreview postData={postData} />
      </div>
      <div className="h-[50%] flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full w-full flex flex-col items-center justify-center"
        >
          <div className="flex flex-col">
            <label
              htmlFor="reportType"
              className="font-bold text-white text-sm p-2"
            >
              Report Type:
            </label>
            <select
              id="reportType"
              {...register("reportType", {
                required: "Report type is required",
              })}
            >
              <option value="">Select a report type</option>
              {reportTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.reportType && (
              <span className="text-red-500">{errors.reportType.message}</span>
            )}
          </div>
          <h1 className="font-bold text-white text-sm p-2">
            Report Description:{" "}
          </h1>
          <textarea
            className="h-[25%] w-[75%] bg-black text-white"
            {...register("reportDescription", {
              maxLength: {
                value: 140,
                message: "Description should be less than 140 characters",
              },
            })}
            placeholder="Enter your description for the reason to report this post"
          ></textarea>
          <p className="text-red-600">{errors.reportDescription?.message}</p>
          <div className="p-4">
            <button
              type="submit"
              className="bg-rootBg hover:bg-gray-500 p-2 rounded-lg font-bold"
            >
              Report Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportPost;
