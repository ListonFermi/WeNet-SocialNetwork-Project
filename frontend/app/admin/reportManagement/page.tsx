import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSideBar from "@/components/admin/AdminSideBar";
import ReportManagement from "@/components/admin/reportManagement/ReportManagementTable";
import React from "react";

function page() {
  return (
    <div className="max-h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative hidden md:block bg-gray-800 w-96">
          <AdminSideBar />
        </div>
        <div className="flex-1 p-4 h-screen overflow-y-auto no-scrollbar  bg-white">
          <div className="flex h-[10%] w-full justify-center items-center">
            <h1 className="text-2xl font-bold">WeNet Reports Management</h1>
          </div>
          <div className="w-full h-[90%] flex flex-col">
            <ReportManagement />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
