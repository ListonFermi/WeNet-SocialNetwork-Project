import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSideBar from "@/components/admin/AdminSideBar";
import ReportManagement from "@/components/admin/reportManagement/ReportManagementTable";
import React from "react";

function page() {
  return (
    <div className="max-h-screen flex flex-col">
      {/* Navbar */}
      <AdminNavbar />
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* LeftDiv */}
        <div className="relative hidden md:block bg-gray-800 w-96">
          {" "}
          {/* Keep the sidebar width fixed */}
          <AdminSideBar />
        </div>
        {/* Feed */}
        <div className="flex-1 p-4 h-screen overflow-y-auto no-scrollbar bg-feedBg">
          <div className="w-full h-full flex flex-col">
            <ReportManagement />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
