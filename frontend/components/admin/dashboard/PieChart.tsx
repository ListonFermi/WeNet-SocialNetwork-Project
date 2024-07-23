"use client";
import userService from "@/utils/apiCalls/admin/userService";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const options = {
  title: "Account Type",
  is3D: true,
};

export function PieChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const data = await userService.getDashboardChartDataAccountType();
        setData(data);
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, []);
  return (
    <>
      {data && (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      )}
    </>
  );
}
