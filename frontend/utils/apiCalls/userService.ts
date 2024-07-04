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


  getProfileData : async function (username: string) {
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
};
