import { IPost } from "../models/postsCollection";
import postsRepository from "../repositories/postsRepository";

export = {
  addPost: async function (postData: IPost) {
    try {
        return await postsRepository.addPost(postData)
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
