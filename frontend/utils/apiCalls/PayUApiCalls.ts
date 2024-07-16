import axios from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ADS_SERVICE_URL}/PayU`,
  withCredentials: true,
  timeout: 120000,
});

export const PayUUrl = {
  payment: `${process.env.NEXT_PUBLIC_ADS_SERVICE_URL}/PayU/payment`,
  response: `${process.env.NEXT_PUBLIC_ADS_SERVICE_URL}/PayU/response`,
  test: `${process.env.NEXT_PUBLIC_ADS_SERVICE_URL}/PayU/response/test`,
};

export default {
  paymentReq: async function (data: any) {
    try {
      const reshash = await apiClient.post("/payment", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log({reshash})
      return reshash.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  response: async function (pd: any) {
    try {
      const response = await apiClient.post("/response", JSON.stringify(pd), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log({response})
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  saveData: async function (pd: any) {
    try {
      const response = await apiClient.post("/response/saveData", JSON.stringify(pd), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
