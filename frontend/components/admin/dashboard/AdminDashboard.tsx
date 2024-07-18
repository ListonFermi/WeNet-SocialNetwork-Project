import React from "react";
import { LineChart } from "./LineChart";
import DashboardCardSection from "./DashboardCardSection";
import { PieChart } from "./PieChart";

function AdminDashboard() {
  return (
    <div>
      <div className="w-full h-16 flex align-middle justify-center">
        <h1 className="text-2xl text-white font-bold"> Admin Dashboard</h1>
      </div>
      <div className="w-full flex justify-evenly">
        <DashboardCardSection />
      </div>
      <div className="w-full flex">
        <div className="bg-white w-[50%] m-4">
          <LineChart />
        </div>
        <div className="bg-white w-[50%] m-4">
          <PieChart />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
