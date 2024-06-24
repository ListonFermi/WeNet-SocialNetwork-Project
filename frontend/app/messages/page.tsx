import Navbar from "@/components/Navbar";
import FeedLeftDiv from "@/components/feed/FeedLeftDiv";
import React from "react";
import UserFeed from "@/components/feed/UserFeed";
import SideBar from "@/components/feed/SideBar";
import Conversations from "@/components/messages/Conversations";

function page() {
  return (
    <div className="max-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="md:flex h-screen hidden">
        <div className="w-1/6 h-full">
          <SideBar />
        </div>
        <div className="w-[25%] h-full bg-yellow-400">
            <Conversations/>
        </div>
        <div className="w-[58.333%] h-full bg-pink-400"></div>
      </div>
    </div>
  );
}

export default page;
