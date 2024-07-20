import WeNetTickManagementTable from "@/components/admin/weNetTickManagement/WeNetTickManagementTable";
import React, { useEffect } from "react";

function page() {
  return (
    <>
      <div className="flex h-[10%] w-full justify-center items-center">
        <h1 className="text-2xl font-bold">WeNet Tick Management</h1>
      </div>
      <WeNetTickManagementTable/>
    </>
  );
}

export default page;
