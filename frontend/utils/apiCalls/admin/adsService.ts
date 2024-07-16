import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADS_SERVICE_ADMIN_URL,
  withCredentials: true,
  timeout: 120000,
});

export default {
  getAdsManagementData: async function (pageNo: number, rowsPerPage: number) {
    try {
      const res = await apiClient.get(
        `/adsManagementData?pageNo=${pageNo}&rowsPerPage=${rowsPerPage}`
      );
      const [responseFormat, documentCount] = res.data;
      return [responseFormat, documentCount];
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};