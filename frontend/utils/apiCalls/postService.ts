import axios from "axios";

const postServiceUrl = process.env.NEXT_PUBLIC_POSTS_SERVICE_URL;

export default {
  //posts

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
  editPost: async function (postId: string, caption: string) {
    try {
      const url = `${postServiceUrl}/editPost/${postId}`;
      const res = await axios.patch(
        url,
        { caption },
        { withCredentials: true }
      );
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to edit the post";
      throw new Error(errorMessage);
    }
  },
  deletePost: async function (postId: string) {
    try {
      const url = `${postServiceUrl}/deletePost/${postId}`;
      const res = await axios.delete(url, { withCredentials: true });
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to delete the post";
      throw new Error(errorMessage);
    }
  },
  toggleLike: async function (entity: string, entityId: string) {
    try {
      const url = `${postServiceUrl}/toggleLike/${entity}/${entityId}`;
      const res = await axios.patch(url, "", { withCredentials: true });
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : `Failed to toggle ${entity} like`;
      throw new Error(errorMessage);
    }
  },

  //comments

  addComment: async function (comment: string, postId: string) {
    try {
      const url = `${postServiceUrl}/comment/${postId}`;
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
