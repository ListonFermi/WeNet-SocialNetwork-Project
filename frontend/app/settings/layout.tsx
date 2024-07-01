import Navbar from "@/components/Navbar";
import SideBar from "@/components/feed/SideBar";
import React from "react";

type prop = {
  children: React.ReactNode;
};

export default function SettingsLayout({ children }: prop) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="max-h-screen flex">
        <div className="h-full w-1/6 hidden md:block">
            <SideBar/>
        </div>
        {children}
        </div>
    </div>
  );
}
