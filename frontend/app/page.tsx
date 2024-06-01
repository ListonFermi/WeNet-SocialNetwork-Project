import React from "react";
import "../assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Feed from "@/components/page/Feed";
import LeftDiv from "@/components/page/LeftDiv";
import RightDiv from "@/components/page/RightDiv";

export const metadata = {
  title: "WeNet | Social Network Platform",
  description: "Connect with the world",
};

function Page() {
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
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 p-4 h-screen overflow-y-auto no-scrollbar bg-feedBg">
          <Feed />
        </div>
        {/* RightDiv */}
        <div className="relative flex-1 hidden md:block bg-gray-800">
          <RightDiv />
        </div>
      </div>
    </div>
  );
}

export default Page;
