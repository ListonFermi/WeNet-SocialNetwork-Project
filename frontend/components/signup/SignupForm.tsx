"use client";
import React from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import LoginWithGoogle from "../LoginWithGoogle";
import { ToastContainer, toast, Bounce, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { verifyUser } from "@/redux/userSlice";

interface SignupFormProps {
  setIsVerifyForm: React.Dispatch<React.SetStateAction<boolean>>;
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

const SignupForm: React.FC<SignupFormProps> = ({ setIsVerifyForm }) => {
  type Inputs = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
  };

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userServiceUrl = process.env.NEXT_PUBLIC_USER_SERVICE_URL;
      let response: any = await toast.promise(
        axios.post(`${userServiceUrl}/signup`, data),
        {
          pending: "Signing up",
          success: "User registered successfully",
          error: "Failed to signup",
        },
        toastOptions
      );
      dispatch(verifyUser({ _id: response.data._id }));
      setIsVerifyForm(true);
    } catch (error: any) {
      console.error(error)
      const errorMessage = error?.response?.data?.length
        ? error.response.data
        : "Internal server error";
      toast.error(errorMessage, toastOptions);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full flex justify-center py-10">
        <h1 className="text-3xl text-white font-bold">Signup</h1>
      </div>
      <div className="w-full max-h-full flex flex-col align-middle justify-center items-center">
        <LoginWithGoogle />
        <p className="text-center mb-4 font-semibold text-white">OR</p>
        <form
          className="w-full max-w-md flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message:
                    "Please use valid characters only. [Alphabets A to Z, a to z ]",
                },
                minLength: { value: 5, message: "Enter at least 5 characters" },
              })}
              className="bg-black shadow appearance-none  rounded w-full py-2 px-3 text-white text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-600">{errors.username?.message}</p>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                {...register("firstName", {
                  required: "First Name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message:
                      "Please use valid characters only. [Alphabets A to Z, a to z ]",
                  },
                  minLength: {
                    value: 3,
                    message: "Enter at least 3 characters",
                  },
                })}
                className="shadow appearance-none rounded w-full py-2 px-3 text-white text-lg font-semibold bg-feedBg leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-red-600">{errors.firstName?.message}</p>
            </div>
            <div className="w-1/2 pl-2">
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                {...register("lastName", {
                  required: "Last Name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message:
                      "Please use valid characters only. [Alphabets A to Z, a to z ]",
                  },
                  minLength: {
                    value: 3,
                    message: "Enter at least 3 characters",
                  },
                })}
                className="shadow appearance-none rounded w-full py-2 px-3 text-white text-lg font-semibold bg-feedBg leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-red-600">{errors.lastName?.message}</p>
            </div>
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Enter a password",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                  message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              className="shadow appearance-none  rounded w-full py-2 px-3 text-white text-lg font-semibold bg-feedBg leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords should match!";
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
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
