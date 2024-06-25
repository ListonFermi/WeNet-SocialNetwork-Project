import axios from "axios";

const postServiceUrl = process.env.NEXT_PUBLIC_POSTS_SERVICE_URL;

export default {
  getSinglePostData: async function (id: string) {
    try {
      const url = `${postServiceUrl}/singlePost/${id}`;
      const res = await axios.get(url, { withCredentials: true });
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to get post data";
      throw new Error(errorMessage);
    }
  },
  addComment: async function (comment: string, postId: string) {
    try {
      const url = `${postServiceUrl}/addComment/${postId}`;
      const res = await axios.post(url, { comment }, { withCredentials: true });
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to comment on the post";
      throw new Error(errorMessage);
    }
  },
};
