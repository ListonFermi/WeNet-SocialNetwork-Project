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
      return await postsRepository.getSinglePost(postId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  editPost: async function (postId: string, caption: string): Promise<string> {
    try {
      return await postsRepository.editPost(postId, caption);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  deletePost: async function (postId: string): Promise<string> {
    try {
      return await postsRepository.deletePost(postId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  toggleLike: async function (
    entity: string,
    entityId: string,
    userId: string
  ): Promise<number> {
    try {
      return await postsRepository.toggleLike(entity, entityId, userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  toggleBookmark: async function (
    postId: string,
    userId: string
  ): Promise<string> {
    try {
      return await postsRepository.toggleBookmark(postId, userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  postIsLiked: async function (
    userId: string,
    postId: string
  ): Promise<boolean> {
    try {
      return await postsRepository.postIsLiked(userId, postId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getTopPosts: async function (): Promise<string[]> {
    try {
      return await postsRepository.getTopPosts();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getBookmarkedPosts: async function (userId: string): Promise<string[]> {
    try {
      return await postsRepository.getBookmarkedPosts(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
