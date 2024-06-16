import { Request, Response } from "express";
import { IPostService } from "../../domain/services/IPostService";

export const postController = (postService: IPostService) => {
  return {
    createPost: async (req: Request, res: Response): Promise<Response> => {
      const post = req.body;
      const createdPost = await postService.createPost(post);
      return res.status(201).json(createdPost);
    },

    getPost: async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params;
      const post = await postService.getPostById(id);
      if (post) {
        return res.status(200).json(post);
      } else {
        return res.status(404).json({ message: "Post not found" });
      }
    },

    getPostsByUser: async (req: Request, res: Response): Promise<Response> => {
      const { userId } = req.params;
      const posts = await postService.getPostsByUserId(userId);
      return res.status(200).json(posts);
    }
  };
};
