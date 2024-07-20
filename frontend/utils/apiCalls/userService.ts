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
  getFollowingUsers: async function () {
    try {
      const url = `${userServiceUrl}/profile/getFollowing`;
      const res = await axios.get(url, { withCredentials: true });
      return res.data; 
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to get following users";
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
      const url = `${userServiceUrl}/profile/toggleBlock/${userId}`;
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
  isBlocked: async function (userId: string) {
    try {
      const url = `${userServiceUrl}/profile/isBlocked/${userId}`;
      const res = await axios.get(url, { withCredentials: true });
      return res.data; // returns isBlocked : Boolean
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to get isBlocked data";
      throw new Error(errorMessage);
    }
  },

  changeAccountType: async function (accountType: string): Promise<string> {
    try {
      const url = `${userServiceUrl}/changeAccountType`;
      const res = await axios.patch(
        url,
        { accountType },
        { withCredentials: true }
      );
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response?.data?.length
          ? error.response.data
          : "Failed to change account type";
      throw new Error(errorMessage);
    }
  },

  getBlockedUsers: async function (pageNo: number, rowsPerPage: number) {
    try {
      const url = `${userServiceUrl}/profile/getBlockedUsers/?pageNo=${pageNo}&rowsPerPage=${rowsPerPage}`;
      const res = await axios.get(url, { withCredentials: true });
      const [responseFormat, documentCount] = res.data;
      return [responseFormat, documentCount];
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

};
