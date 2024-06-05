import Navbar from "@/components/Navbar";
import SignupForm from "@/components/SignupForm/SignupForm";
import VerifyUserForm from "@/components/SignupForm/VerifyUserForm";
import React from "react";

function Signup() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      {/* <div className="w-screen flex justify-center pt-8">
        <h1 className="text-white text-4xl font-bold">Signup</h1>
      </div> */}
      <div className="flex justify-center max-h-screen pt-10" >
        {/* <SignupForm /> */}
        <VerifyUserForm/>
      </div>
    </div>
  );
}

export default Signup;
