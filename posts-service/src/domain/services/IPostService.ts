import { Post } from "../entities/Post";

export interface IPostService {
  createPost(post: Post): Promise<Post>;
  getPostById(id: string): Promise<Post | null>;
  getPostsByUserId(userId: string): Promise<Post[]>;
}
