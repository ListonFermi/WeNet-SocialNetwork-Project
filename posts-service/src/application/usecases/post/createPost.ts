import { Post } from "../../../domain/entities/Post";
import { IPostRepository } from "../../../domain/repositories/IPostRepository";

export const createPost = (postRepository: IPostRepository) => async (post: Post): Promise<Post> => {
  return postRepository.createPost(post);
};
