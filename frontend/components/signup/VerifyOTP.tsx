"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";

function VerifyOTP() {
  type Inputs = {
    _id: string;
    otp: string;
  };

  const {
    register,
    handleSubmit,
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

  const router = useRouter();
  const _id = useSelector((store: any) => store.user?.verifyUser);

  const [timer, setTimer] = useState(60);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userServiceUrl = process.env.NEXT_PUBLIC_USER_SERVICE_URL;
      data._id = _id;

      await toast.promise(
        axios.post(`${userServiceUrl}/signup/verifyOTP`, data),
        {
          pending: "Verifying OTP",
          success: "OTP verified successfully",
          error: "Failed to verify OTP",
        },
        toastOptions
      );
      router.replace("/login");
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to verify OTP";
      toast.error(errorMessage, toastOptions);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        className="w-full max-w-md flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="py-4 w-full flex justify-center">
          <input
            type="tel"
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^\d{4}$/,
                message: "Please enter a valid 4-digit OTP",
              },
            })}
            className="bg-black shadow appearance-none  rounded max-w-full py-2 px-3 text-white text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter OTP"
          ></input>
        </div>
        {timer > 0 && (
          <div className="text-xl text-white font-bold flex justify-center">
            {`${timer} secs`}
          </div>
        )}
        <div className="w-full flex justify-center items-center">
          {timer > 0 ? (
            <button
              type="submit"
              className="bg-rootBg hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Verify OTP
            </button>
          ) : (
            <button
              type="button"
              className="bg-rootBg hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Resend OTP
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default VerifyOTP;
