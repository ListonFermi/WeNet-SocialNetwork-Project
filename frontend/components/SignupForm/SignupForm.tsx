"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

function SignupForm() {
  type Inputs = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {};

  return (
    <div className="flex flex-col items-center justify-center bg-secColor text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Signup</h1>
      <button className="bg-secColor hover:bg-secColor text-white font-bold py-2 px-4 rounded mb-4">
        Signup with google
      </button>
      <p className="text-center mb-4">OR</p>
      <form
        className="w-full max-w-md flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          {/* <label htmlFor="username" className="block text-gray-500 text-sm font-bold mb-2">
            Username
          </label> */}
          <input
            type="text"
            id="username"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message:
                  "Please valid characters only. [Alphabets A to Z, a to z ]",
              },
              minLength: { value: 5, message: "Enter atleast 5 characters" },
            })}
            className="bg-black shadow appearance-none  rounded w-full py-2 px-3 text-white text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-600">{errors.username?.message}</p>
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            {/* <label
              htmlFor="firstName"
              className="block text-gray-500 text-sm font-bold mb-2"
            >
              First Name
            </label> */}
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              {...register("firstName", {
                required: "First Name is required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message:
                    "Please valid characters only. [Alphabets A to Z, a to z ]",
                },
                minLength: { value: 3, message: "Enter atleast 3 characters" },
              })}
              className="shadow appearance-none rounded w-full py-2 px-3 text-white text-lg font-semibold bg-feedBg leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-600">{errors.firstName?.message}</p>
          </div>
          <div className="w-1/2 pl-2">
            {/* <label
              htmlFor="lastName"
              className="block text-gray-500 text-sm font-bold mb-2"
            >
              Last Name
            </label> */}
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last Name is required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message:
                    "Please valid characters only. [Alphabets A to Z, a to z ]",
                },
                minLength: { value: 3, message: "Enter atleast 3 characters" },
              })}
              className="shadow appearance-none rounded w-full py-2 px-3 text-white text-lg font-semibold bg-feedBg leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-600">{errors.lastName?.message}</p>
          </div>
        </div>
        <div className="mb-4">
          {/* <label
            htmlFor="password"
            className="block text-gray-500 text-sm font-bold mb-2"
          >
            Password
          </label> */}
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", {
              required: "Enter a password",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                message:
                  "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
              },
            })}
            className="shadow appearance-none  rounded w-full py-2 px-3 text-white text-lg font-semibold bg-feedBg leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-600">{errors.password?.message}</p>
        </div>
        <div className="mb-6">
          {/* <label
            htmlFor="confirmPassword"
            className="block text-gray-500 text-sm font-bold mb-2"
          >
            Confirm Password
          </label> */}
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
        <button
          type="submit"
          className="bg-rootBg hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
