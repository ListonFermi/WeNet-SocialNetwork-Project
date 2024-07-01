import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSideBar from "@/components/admin/AdminSideBar";
import UserManagement from "@/components/admin/usermanagement/UserManagement";
import React from "react";

function page() {
  return (
    <div className="max-h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative hidden md:block bg-gray-800 w-96">
          <AdminSideBar />
        </div>
        <div className="flex-1 p-4 h-screen overflow-y-auto no-scrollbar bg-feedBg">
          <div className="w-full h-full flex flex-col">
            <UserManagement />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
