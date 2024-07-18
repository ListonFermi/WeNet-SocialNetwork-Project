import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_SERVICE_ADMIN_URL,
  withCredentials: true,
  timeout: 120000,
});

export default {
  getDashboardCardData: async function () {
    try {
      const res = await apiClient.get("/dashboardCardData");
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to get dashboard card data";
      throw new Error(errorMessage);
    }
  },
  getDashboardChartData: async function () {
    try {
      const res = await apiClient.get("/dashboardChartData");
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to get dashboard chart data";
      throw new Error(errorMessage);
    }
  },
  getDashboardChartDataAccountType:  async function () {
    try {
      const res = await apiClient.get("/dashboardChartData/AccountType");
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to get dashboard chart data";
      throw new Error(errorMessage);
    }
  },
};
