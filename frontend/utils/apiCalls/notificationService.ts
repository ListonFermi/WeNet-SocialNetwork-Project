import axios from "axios";
import { NOTIFICATION_SERVICE_URL } from "../constants";

const apiClient = axios.create({
  baseURL: NOTIFICATION_SERVICE_URL,
  withCredentials: true,
  timeout: 120000,
});

export default {
  getNotifications: async function () {
    try {
      const res = await apiClient.get("/");
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to get notification data";
      throw new Error(errorMessage);
    }
  },
};
