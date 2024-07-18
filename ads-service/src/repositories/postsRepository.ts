import postsCollection, { IPost } from "../models/postsCollection";

export = {
  addPost: async function (postData: IPost) {
    try {
      return await postsCollection.create(postData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};