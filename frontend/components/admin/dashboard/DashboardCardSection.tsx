"use client";
import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import userService from "@/utils/apiCalls/admin/userService";
import postService from "@/utils/apiCalls/admin/postService";

function DashboardCardSection() {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalPosts, setTotalPosts] = useState(null);
  const [totalReports, setTotalReports] = useState(null);
  const [totalVerifiedAccounts, setTotalVerifiedAccounts] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const [totalUsers, totalVerifiedAccounts] =
          await userService.getDashboardCardData();
        setTotalUsers(totalUsers);
        setTotalVerifiedAccounts(totalVerifiedAccounts);
      } catch (error: any) {
        alert(error.message);
      }
      try {
        const [totalPosts, totalReports] =
          await postService.getDashboardCardData();
        setTotalPosts(totalPosts);
        setTotalReports(totalReports);
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, []);

  return (
    <>
      <div className="w-1/4 p-3">
        {totalUsers && (
          <a href="/admin/userManagement">
            <DashboardCard
              text="Total Users"
              count={totalUsers}
              iconName="userManagement"
            />
          </a>
        )}
      </div>
      <div className="w-1/4 p-3">
        {totalPosts && (
          <a href="">
            <DashboardCard
              text="Total Posts"
              count={totalPosts}
              iconName="posts"
            />
          </a>
        )}
      </div>
      <div className="w-1/4 p-3">
        {totalReports && (
          <a href="/admin/reportManagement">
            <DashboardCard
              text="Total Reports"
              count={totalReports}
              iconName="reportsManagement"
            />
          </a>
        )}
      </div>
      <div className="w-1/4 p-3">
        {totalVerifiedAccounts && (
          <a href="/admin/WeNetTickManagement">
            <DashboardCard
              text="Total Verified Accounts"
              count={totalVerifiedAccounts}
              iconName="WeNetTickManagement"
            />
          </a>
        )}
      </div>
    </>
  );
}

export default DashboardCardSection;
