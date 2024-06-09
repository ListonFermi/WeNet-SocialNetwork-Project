import React from "react";
import DashboardCard from "./DashboardCard";

function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="w-full h-16 flex align-middle justify-center">
        <h1 className="text-2xl text-white font-bold"> Admin Dashboard</h1>
      </div>
      {/* Cards  */}
      <div className="w-full flex justify-evenly">
        <div className="w-1/4 p-3">
          <DashboardCard  />
        </div>
        <div className="w-1/4 p-3">
          <DashboardCard />
        </div>
        <div className="w-1/4 p-3">
          <DashboardCard />
        </div>
        <div className="w-1/4 p-3">
          <DashboardCard />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
