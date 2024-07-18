"use client";
import userService from "@/utils/apiCalls/admin/userService";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 8.5],
  ["Eat", 1.5],
  ["Commute", 0.75],
  ["Watch TV", 3],
  ["Sleep", 8],
];

export const options = {
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
