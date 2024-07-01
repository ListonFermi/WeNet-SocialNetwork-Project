import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminLoginForm from "@/components/admin/page/AdminLoginForm";
import React from "react";

function page() {
  return (
    <div className="max-h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 p-4 h-screen overflow-y-auto no-scrollbar bg-secColor">
          <AdminLoginForm/>
        </div>
      </div>
    </div>
  );
}

export default page;
