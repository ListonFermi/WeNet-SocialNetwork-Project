"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import LoginWithGoogle from "../LoginWithGoogle";

function LoginForm() {
  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {};

  return (
    <>
      <div className="w-full flex justify-center py-20">
        <h1 className="text-3xl text-white font-bold">Login</h1>
      </div>
      <div className="w-full max-h-full flex flex-col align-middle justify-center items-center">
        <LoginWithGoogle />
        <p className="text-center mb-4 font-semibold text-white">OR</p>
        <form className="max-w-md flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            {/* <label htmlFor="username" className="block text-gray-500 text-sm font-bold mb-2">
            Username
          </label> */}
            <input
              type="email"
              id="email"
              placeholder="Username"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
                minLength: { value: 5, message: "Enter atleast 5 characters" },
              })}
              className="bg-black shadow appearance-none  rounded w-full py-2 px-3 text-white text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              placeholder="Confirm Password"
              {...register("password", {
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
            <p className="text-red-600">{errors.password?.message}</p>
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
}

export default LoginForm;
