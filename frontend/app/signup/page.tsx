import Navbar from "@/components/Navbar";
import LeftDiv from "@/components/page/LeftDiv";
import RightDiv from "@/components/page/RightDiv";
import CenterDiv from "@/components/signup/CenterDiv";
import React from "react";

function Signup() {
  return (
    <div className="max-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1 hidden md:block bg-gray-800">
          <LeftDiv />
        </div>
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 p-4 h-screen overflow-y-auto no-scrollbar bg-secColor">
          <CenterDiv/>
        </div>
        <div className="relative flex-1 hidden md:block bg-gray-800">
          <RightDiv />
        </div>
      </div>
    </div>
  );
}

export default Signup;
