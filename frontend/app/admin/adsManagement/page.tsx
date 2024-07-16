import AdsManagementTable from "@/components/admin/adsManagement/AdsManagementTable";
import React, { useEffect } from "react";

function page() {
  return (
    <>
      <div className="flex h-[10%] w-full justify-center items-center">
        <h1 className="text-2xl font-bold">WeNet Ads Management</h1>
      </div>
      <AdsManagementTable/>
    </>
  );
}

export default page;
