import { Post } from "../../../domain/entities/Post";
import { IPostRepository } from "../../../domain/repositories/IPostRepository";

export const getPostsByUser = (postRepository: IPostRepository) => async (userId: string): Promise<Post[]> => {
  return postRepository.getPostsByUserId(userId);
};
