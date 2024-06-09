import React from "react";
import "@/assets/styles/globals.css";
import Link from "next/link";

function AdminNavbar() {
  return (
    <div className={`h-14 bg-rootBg flex items-center justify-center`}>
      <a className="text-4xl font-sans font-bold cursor-pointer" href="/admin">
        WeNet- Admin
      </a>
    </div>
  );
}

export default AdminNavbar;
