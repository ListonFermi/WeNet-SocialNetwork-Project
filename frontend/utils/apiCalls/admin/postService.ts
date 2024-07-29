import { POSTS_SERVICE_URL } from "@/utils/constants";
import axios from "axios";

const apiClient = axios.create({
  baseURL: `${POSTS_SERVICE_URL}/admin`,
  withCredentials: true,
  timeout: 120000,
});

export default {
  getDashboardCardData: async function () {
    try {
        const res = await apiClient.get('/getDashboardCardData')
        return res.data
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to get dashboard card data";
      throw new Error(errorMessage);
    }
  },
};
