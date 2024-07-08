import axios from "axios";

const userServiceUrl = process.env.NEXT_PUBLIC_USER_SERVICE_URL;

export default {
  changePassword: async function (
    currentPassword: string,
    newPassword: string
  ) {
    try {
      const url = `${userServiceUrl}/changePassword`;
      const res = await axios.patch(
        url,
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to change password";
      throw new Error(errorMessage);
    }
  },
  forgotPassword: async function (email: string) {
    try {
      const url = `${userServiceUrl}/forgotPassword`;
      const res = await axios.post(url, { email });
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to get new password";
      throw new Error(errorMessage);
    }
  },

  getCurrUserData: async function () {
    try {
      const url = `${userServiceUrl}/profile/userData`;
      console.log({ url });
      const res = await axios.get(url, { withCredentials: true });
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to get current user data";
      throw new Error(errorMessage);
    }
  },
  getProfileData: async function (username: string) {
    try {
      const url = `${userServiceUrl}/profile/${username}`;
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to get new password";
      throw new Error(errorMessage);
    }
  },
  isFollowing: async function (userId: string) {
    try {
      const url = `${userServiceUrl}/profile/isFollowing/${userId}`;
      const res = await axios.get(url, { withCredentials: true });
      return res.data; // returns isFollowing : Boolean
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to toggle follow";
      throw new Error(errorMessage);
    }
  },
  toggleFollow: async function (userId: string) {
    try {
      const url = `${userServiceUrl}/profile/toggleFollow/${userId}`;
      const res = await axios.post(url, {}, { withCredentials: true });
      return res.data; // returns isFollowing : Boolean
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to toggle follow";
      throw new Error(errorMessage);
    }
  },
  searchUsers: async function (keyword: string) {
    try {
      const url = `${userServiceUrl}/profile/search`;
      const res = await axios.get(url, {
        params: { keyword },
        withCredentials: true,
      });
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to toggle follow";
      throw new Error(errorMessage);
    }
  },

  blockUser: async function (userId: string) {
    try {
      const url = `${userServiceUrl}/profile/block/${userId}`;
      const res = await axios.post(url, {}, { withCredentials: true });
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to toggle follow";
      throw new Error(errorMessage);
    }
  },
};
