import Navbar from "@/components/Navbar";
import SideBar from "@/components/feed/SideBar";
import React from "react";

type prop = {
  children: React.ReactNode;
};

export default function MessagesLayout({ children }: prop) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/6 hidden md:block">
          <SideBar />
        </div>
        {children}
      </div>
    </div>
  );
}
