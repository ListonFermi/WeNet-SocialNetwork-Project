"use client";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Bounce, ToastOptions, toast } from "react-toastify";
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

function LoginWithGoogle() {

  const router = useRouter();

  async function handleSubmit(credentialResponse: any) {
    try {
      const userServiceUrl = process.env.NEXT_PUBLIC_USER_SERVICE_URL;
      await toast.promise(
        axios.post(`${userServiceUrl}/login/googleSignin`, credentialResponse, {
          withCredentials: true,
        }),
        {
          pending: "Logging in",
          success: "User logged in successfully",
          error: "Failed to login",
        },
        toastOptions
      );
      setTimeout(()=>router.replace("/feed"),2500)
    } catch (error: any) {
      console.log(error);
      const errorMessage = error?.response?.data?.length
        ? error.response.data
        : "Failed to signup";
      toast.error(errorMessage, toastOptions);
    }
  }

  return (
    <div className="p-4">
      <GoogleLogin
        onSuccess={handleSubmit}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default LoginWithGoogle;
