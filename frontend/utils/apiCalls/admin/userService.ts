import { USER_SERVICE_URL } from "@/utils/constants";
import axios from "axios";

const apiClient = axios.create({
  baseURL: `${USER_SERVICE_URL}\admin`,
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
  getDashboardChartDataAccountType: async function () {
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
  getTickRequestsData: async function (
    pageNo: number,
    rowsPerPage: number
  ) {
    try {
      const res = await apiClient.get(
        `/getTickRequestsData?pageNo=${pageNo}&rowsPerPage=${rowsPerPage}`
      );
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to get tick requests data";
      throw new Error(errorMessage);
    }
  },
  changeTickRequestStatus: async function (
    requestId : string, status : "approved"| "rejected", userId: string
  ) {
    try {
      const res = await apiClient.patch(
        `/changeTickRequestStatus/${requestId}`,{status, userId}
      );
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed change tick request status";
      throw new Error(errorMessage);
    }
  },
};
