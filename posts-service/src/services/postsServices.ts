import { IPost } from "../models/postsCollection";
import postsRepository from "../repositories/postsRepository";

export = {
  uploadImage: async function (imageFile: unknown): Promise<string> {
    try {
      return await postsRepository.uploadImage(imageFile);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  createPost: async function (
    userId: string,
    imageUrl: string
  ): Promise<IPost> {
    try {
      return postsRepository.createPost(userId, imageUrl);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  addCaption: async function (postId: string, caption: string): Promise<IPost> {
    try {
      return postsRepository.addCaption(postId, caption);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getSinglePost: async function (postId: string): Promise<IPost> {
    try {
      return await postsRepository.getSinglePost(postId)
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
