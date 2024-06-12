import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSideBar from "@/components/admin/AdminSideBar";
import UserManagement from "@/components/admin/usermanagement/UserManagement";
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
          <UserManagement />
          <div className="w-full h-full flex flex-col"></div>
        </div>
      </div>
    </div>
  );
}

export default page;
