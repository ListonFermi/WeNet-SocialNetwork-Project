"use client";
import userService from "@/utils/apiCalls/userService";
import { toastOptions } from "@/utils/toastOptions";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function ChangePassword() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      let response: any = await toast.promise(
        userService.changePassword(data.currentPassword, data.newPassword),
        {
          pending: "Changing password",
          success: "Password changed successfully",
          error: "Failed to change password",
        },
        toastOptions
      );
      router.replace('/settings')
    } catch (error: any) {
      toast.error(error.message, toastOptions);
    }
  };

  return (
    <div className="bg-secColor h-full w-full">
      <ToastContainer />
      <div className="h-[20%] flex items-center justify-center">
        <h1 className="text-white font-bold text-2xl hidden md:block">
          Change Password
        </h1>
      </div>
      <div className="h-[60%] flex flex-col justify-center">
        <form
          className="max-w-md flex-col justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 px-8 pb-4">
            <input
              type="password"
              placeholder="Current Password"
              {...register("currentPassword", {
                required: "Enter a password",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                  message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              className="bg-black shadow appearance-none  rounded w-full py-2 px-3 text-white text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-600">{errors.currentPassword?.message}</p>
          </div>
          <div className="mb-6 px-8 pb-4">
            <input
              type="password"
              id="password"
              placeholder="New Password"
              {...register("newPassword", {
                required: "Enter a password",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                  message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              className="shadow appearance-none rounded w-full py-2 px-3 text-white text-lg font-semibold bg-feedBg leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-600">{errors.newPassword?.message}</p>
          </div>
          <div className="mb-6 px-8 pb-4">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: (value) => {
                  const { newPassword } = getValues();
                  return newPassword === value || "Passwords should match!";
                },
              })}
              className="shadow appearance-none rounded w-full py-2 px-3 text-white text-lg font-semibold bg-feedBg leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-600">{errors.confirmPassword?.message}</p>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-rootBg hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
