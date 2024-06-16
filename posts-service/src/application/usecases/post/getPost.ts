import { Post } from "../../../domain/entities/Post";
import { IPostRepository } from "../../../domain/repositories/IPostRepository";

export const getPost = (postRepository: IPostRepository) => async (id: string): Promise<Post | null> => {
  return postRepository.getPostById(id);
};
