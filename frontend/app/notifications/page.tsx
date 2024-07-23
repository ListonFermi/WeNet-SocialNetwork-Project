import Navbar from "@/components/Navbar";
import BottomNav from "@/components/feed/BottomNav";
import FeedLeftDiv from "@/components/feed/FeedLeftDiv";
import NotificationBar from "@/components/notifications/NotificationBar";
import React from "react";

function page() {
  return (
    <div className="max-h-screen flex flex-col">
      <Navbar />
      <div className="max-h-screen flex flex-1 overflow-hidden">
        <div className="relative flex-1 hidden md:block bg-feedBg">
          <FeedLeftDiv />
        </div>
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 p-4 h-screen overflow-y-auto no-scrollbar bg-feedBg">
          <div className="h-[10%] w-full flex items-center justify-center p-2">
            <h1 className="text-white font-bold text-xl">Notifications</h1>
          </div>
          <NotificationBar/>
        </div>
        <div className="relative flex-1 hidden md:block bg-feedBg"></div>
      </div>
      <BottomNav/>
    </div>
  );
}

export default page;
