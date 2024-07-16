import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSideBar from "@/components/admin/AdminSideBar";
import React from "react";

type prop = {
  children: React.ReactNode;
};

export default function adsManagementLayout({ children }: prop) {
  return (
    <div className="max-h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative hidden md:block bg-gray-800 w-96">
          <AdminSideBar />
        </div>
        <div className="flex-1 p-4 h-screen overflow-y-auto no-scrollbar bg-white">
          <div className="w-full h-full flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}
