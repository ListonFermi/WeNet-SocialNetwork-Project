import Navbar from "@/components/Navbar";
import FeedLeftDiv from "@/components/feed/FeedLeftDiv";
import React from "react";
import Profile from "@/components/[username]/Profile";
import EditProfile from "@/components/[username]/edit/EditProfile";
import BottomNav from "@/components/feed/BottomNav";

function page() {
  
  return (
    <div className="max-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1 hidden md:block bg-feedBg">
          <FeedLeftDiv />
        </div>
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 h-screen overflow-y-auto no-scrollbar bg-feedBg">
          <EditProfile/>
        </div>
        <div className="relative flex-1 hidden md:block bg-feedBg">
        </div>
      </div>
      <BottomNav/>
    </div>
  );
}

export default page;
