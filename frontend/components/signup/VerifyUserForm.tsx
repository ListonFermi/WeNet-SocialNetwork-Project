"use client";
import { validateDateOfBirth } from "@/utils/validateDOB";
import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyOTP from "./VerifyOTP";

interface VerifyUserFormProps {
  setIsVerifyOTPComp: React.Dispatch<React.SetStateAction<boolean>>;
}
const VerifyUserForm: React.FC<VerifyUserFormProps> = ({
  setIsVerifyOTPComp,
}) => {
  type Inputs = {
    _id?: string;
    email: string;
    dateOfBirth: Date;
    gender: string;
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

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

  const {verifyUser} = useSelector((store: any) => store.user);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userServiceUrl = process.env.NEXT_PUBLIC_USER_SERVICE_URL;

      data._id = verifyUser;
      let response = await toast.promise(
        axios.post(`${userServiceUrl}/signup/sendOTP`, data),
        {
          pending: "Sending OTP",
          success: "OTP sent successfully",
          error: "Failed to sent OTP",
        },
        toastOptions
      );
      setIsVerifyOTPComp(true);
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to signup";
      toast.error(errorMessage, toastOptions);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full flex justify-center py-10">
        <h1 className="text-3xl text-white font-bold">Verify User</h1>
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
          <div className="mb-4">
            <input
              type="date"
              id="dateOfBirth"
              placeholder="Date of Birth"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
                validate: validateDateOfBirth,
              })}
              className="bg-black shadow appearance-none  rounded w-full py-2 px-3 text-white text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-600">{errors.dateOfBirth?.message}</p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-500 text-sm font-bold mb-2"
            >
              Gender:
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="male"
                value="male"
                {...register("gender", { required: true })}
                className="mr-2"
              />
              <label htmlFor="male" className="mr-4 text-white font-semibold">
                Male
              </label>
              <input
                type="radio"
                id="female"
                value="female"
                {...register("gender", { required: true })}
                className="mr-2"
              />
              <label htmlFor="female" className="mr-4 text-white font-semibold">
                Female
              </label>
            </div>
            <p className="text-red-600">{errors.gender?.message}</p>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send OTP
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyUserForm;
