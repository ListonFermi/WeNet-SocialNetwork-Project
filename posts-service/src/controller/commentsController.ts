import { NextFunction, Response } from "express";
import commentsServices from "../services/commentsServices";
import userServices from "../services/userServices";

export = {
  addComment: async function (req: any, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      const { _id } = req.user;
      const { comment } = req.body;

      const { userId, updatedAt } = await commentsServices.addComment(
        _id,
        postId,
        comment
      );

      const { username, profilePicUrl } = await userServices.getUser(userId);

      const commentData = {
        userId,
        profilePicUrl,
        username,
        comment,
        updatedAt,
      };

      res.status(200).send(commentData);
    } catch (error) {
      next(error);
    }
  },
  deleteComment: async function (req: any, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;
      const result = await commentsServices.deleteComment(commentId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },
};
