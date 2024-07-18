import React from "react";
import "@/assets/styles/globals.css";

function AdminNavbar() {
  return (
    <div className={`h-14 bg-rootBg flex items-center justify-center`}>
      <a className="text-4xl font-sans font-bold cursor-pointer" href="/admin/dashboard">
        WeNet- Admin
      </a>
    </div>
  );
}

export default AdminNavbar;
