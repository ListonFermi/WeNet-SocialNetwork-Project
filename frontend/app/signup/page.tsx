import Navbar from "@/components/Navbar";
import SignupForm from "@/components/SignupForm/SignupForm";
import React from "react";

function Signup() {
  return (
    <div className="bg-black h-screen ">
      <Navbar />
      <div className="w-full flex-col items-center">
        <h1 className="text-white text-4xl font-bold mt-10">Signup</h1>
        <div>
        <SignupForm/>
        </div>
      </div>
    </div>
  );
}

export default Signup;
