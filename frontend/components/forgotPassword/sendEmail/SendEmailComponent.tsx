"use client";
import userService from "@/utils/apiCalls/userService";
import { toastOptions } from "@/utils/toastOptions";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyUserForm: React.FC = () => {
  type Inputs = {
    email: string;
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await toast.promise(
        userService.forgotPassword(data.email),
        {
          pending: "Verifying email",
          success: "New password sent successfully",
          error: "Failed to send new password",
        },
        toastOptions
      );
      router.push("/login");
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : "Failed to send new password";
      toast.error(errorMessage, toastOptions);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full flex justify-center py-10">
        <h1 className="text-3xl text-white font-bold">
          Get new password in email
        </h1>
      </div>
      <div className="w-full max-h-full flex flex-col align-middle justify-center items-center">
        <form
          className="w-full max-w-md flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <input
              type="text"
              id="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="bg-black shadow appearance-none  rounded w-full py-2 px-3 text-white text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Get new password
            </button>
          </div>
        </form>
        <h2 className="text-white">
          {`If your email is verified you'll get your new password in your email.`}
        </h2>
      </div>
    </>
  );
};

export default VerifyUserForm;
