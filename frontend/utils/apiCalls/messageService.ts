import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MESSAGE_SERVICE_URL,
  withCredentials: true,
  timeout: 120000,
});

export default {
  getConvoMessages: async function (convoId: string) {
    try {
      const res = await apiClient.get(`/${convoId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  sendMessage: async function (convoId: string, formData: FormData) {
    try {
      const res = await apiClient.post(`/${convoId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  createConversation: async function (participantId: string) {
    try {
      const res = await apiClient.post(`/createConversation/${participantId}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getConvoList: async function () {
    try {
      const res = await apiClient.get(`/convoList`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getUnreadCount: async function () {
    try {
      const res = await apiClient.get("/unreadCount");
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
