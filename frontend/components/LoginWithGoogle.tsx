"use client";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Bounce, ToastOptions, toast } from "react-toastify";

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
  async function handleSubmit(credentialResponse: any) {
    console.log(credentialResponse);
    const userServiceUrl = process.env.NEXT_PUBLIC_USER_SERVICE_URL;
    let response: any = await toast.promise(
      axios.post(`${userServiceUrl}/login/googleSignin`, credentialResponse),
      {
        pending: "Logging in",
        success: "User logged in successfully",
        error: "Failed to login",
      },
      toastOptions
    );
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
