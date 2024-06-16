import { Post } from "../entities/Post";

export interface IPostRepository {
  createPost(post: Post): Promise<Post>;
  getPostById(id: string): Promise<Post | null>;
  getPostsByUserId(userId: string): Promise<Post[]>;
}
