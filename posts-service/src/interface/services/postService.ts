import { Post } from "../../domain/entities/Post";
import { IPostService } from "../../domain/services/IPostService";
import { IPostRepository } from "../../domain/repositories/IPostRepository";

export const postService = (postRepository: IPostRepository): IPostService => {
  return {
    createPost: async (post: Post): Promise<Post> => {
      return postRepository.createPost(post);
    },

    getPostById: async (id: string): Promise<Post | null> => {
      return postRepository.getPostById(id);
    },

    getPostsByUserId: async (userId: string): Promise<Post[]> => {
      return postRepository.getPostsByUserId(userId);
    }
  };
};
