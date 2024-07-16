import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADS_SERVICE_URL,
  withCredentials: true,
  timeout: 120000,
});

export default {
  addTransaction: async function (PayUOrderId: string, email: string, status: 'success'| 'failed') {
    try {
      const res = await apiClient.post("/addTransaction", { PayUOrderId,email, status });
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
