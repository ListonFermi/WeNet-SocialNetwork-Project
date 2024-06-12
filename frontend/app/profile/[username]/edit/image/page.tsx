import Navbar from "@/components/Navbar";
import FeedLeftDiv from "@/components/feed/FeedLeftDiv";
import React from "react";
import Profile from "@/components/[username]/Profile";
import EditProfile from "@/components/[username]/edit/EditProfile";
import AddImage from "@/components/[username]/edit/AddImage";

function page() {
  
  return (
    <div className="max-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* LeftDiv */}
        <div className="relative flex-1 hidden md:block bg-feedBg">
          <FeedLeftDiv />
        </div>
        {/* Profile */}
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 h-screen overflow-y-auto no-scrollbar bg-feedBg">
          <AddImage/>
        </div>
        {/* RightDiv */}
        <div className="relative flex-1 hidden md:block bg-feedBg">
          {/* <FeedRightDiv /> */}
        </div>
      </div>
    </div>
  );
}

export default page;