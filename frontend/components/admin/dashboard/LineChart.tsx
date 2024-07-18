"use client";
import userService from "@/utils/apiCalls/admin/userService";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Users count",
  curveType: "function",
  legend: { position: "bottom" },
};

export function LineChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const data = await userService.getDashboardChartData();
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
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      )}
    </>
  );
}
