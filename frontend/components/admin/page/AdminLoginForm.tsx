"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";

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

function AdminLoginForm() {

  const dispatch = useDispatch()
  const router = useRouter();

  type Inputs = {
    username: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userServiceAdminUrl = process.env.NEXT_PUBLIC_USER_SERVICE_ADMIN_URL;
      let response: any = await toast.promise(
        axios.post(`${userServiceAdminUrl}/login`, data, { withCredentials: true }),
        {
          pending: "Logging in",
          success: "Logged in successfully",
          error: "Failed to login",
        },
        toastOptions
      );
      setTimeout(()=>router.push("admin/dashboard"),2500)
    } catch (error: any) {
      console.error(error)
      const errorMessage = error?.response?.data?.length
        ? error.response.data
        : "Failed to Login";
      toast.error(errorMessage, toastOptions);
    }    
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full flex justify-center py-20">
        <h1 className="text-3xl text-white font-bold">We-Net Admin Login</h1>
      </div>
      <div className="w-full max-h-full flex flex-col align-middle justify-center items-center">
        <form className="max-w-md flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            {/* <label htmlFor="username" className="block text-gray-500 text-sm font-bold mb-2">
            Username
          </label> */}
            <input
              type="text"
              id="email"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9_]{3,16}$/,
                  message: "Username must be 3-16 characters long and can only contain letters, numbers, and underscores",
                },
                minLength: { value: 5, message: "Enter atleast 5 characters" },
              })}
              className="bg-black shadow appearance-none  rounded w-full py-2 px-3 text-white text-lg font-semibold leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-600">{errors.username?.message}</p>
          </div>
          <div className="mb-6">
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
              className="shadow appearance-none rounded w-full py-2 px-3 text-white text-lg font-semibold bg-feedBg leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-rootBg hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminLoginForm;
