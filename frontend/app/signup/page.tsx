import Navbar from "@/components/Navbar";
import LeftDiv from "@/components/page/LeftDiv";
import RightDiv from "@/components/page/RightDiv";
import CenterDiv from "@/components/signup/CenterDiv";
import React from "react";

function Signup() {
  return (
    <div className="max-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* LeftDiv */}
        <div className="relative flex-1 hidden md:block bg-gray-800">
          <LeftDiv />
        </div>
        {/* Feed */}
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 p-4 h-screen overflow-y-auto no-scrollbar bg-secColor">
          {/* <SignupForm /> */}
          <CenterDiv/>
        </div>
        {/* RightDiv */}
        <div className="relative flex-1 hidden md:block bg-gray-800">
          <RightDiv />
        </div>
      </div>
    </div>
  );
}

export default Signup;
