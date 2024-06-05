"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

function VerifyUserForm() {
  type Inputs = {
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Handle form submission
    // Send data to backend or perform other actions
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-secColor text-white p-20">
      <h1 className="text-3xl font-bold mb-6">Verify User</h1>
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
            })}
            className="bg-black shadow appearance-none rounded w-full py-2 px-3 text-white text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-600">{errors.dateOfBirth?.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-500 text-sm font-bold mb-2">
            Gender:
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="male"
              value="Male"
              {...register("gender", { required: true })}
              className="mr-2"
            />
            <label htmlFor="male" className="mr-4">
              Male
            </label>
            <input
              type="radio"
              id="female"
              value="Female"
              {...register("gender", { required: true })}
              className="mr-2"
            />
            <label htmlFor="female">Female</label>
          </div>
          <p className="text-red-600">{errors.gender?.message}</p>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send OTP
        </button>
        <div className="mt-4 flex gap-2">
          <div className="w-12 h-12 rounded-md bg-gray-800"></div>
          <div className="w-12 h-12 rounded-md bg-gray-800"></div>
          <div className="w-12 h-12 rounded-md bg-gray-800"></div>
          <div className="w-12 h-12 rounded-md bg-gray-800"></div>
          <div className="w-12 h-12 rounded-md bg-gray-800"></div>
          <div className="w-12 h-12 rounded-md bg-gray-800"></div>
          <div className="w-12 h-12 rounded-md bg-gray-800"></div>
        </div>
        <button
          type="button"
          className="bg-rootBg hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default VerifyUserForm;
