import { IComment } from "../models/commentCollection";
import commentsRepository from "../repositories/commentsRepository";

export = {
  addComment: async function (
    userId: string,
    postId: string,
    comment: string
  ): Promise<IComment> {
    try {
      return await commentsRepository.addComment(userId, postId, comment);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  deleteComment: async function (commentId: string): Promise<string> {
    try {
      return await commentsRepository.deleteComment(commentId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
