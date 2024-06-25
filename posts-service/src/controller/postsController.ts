import { NextFunction, Request, Response } from "express";
import postsServices from "../services/postsServices";
import userServices from "../services/userServices";

export = {
  createPost: async function (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const imageFile = req.file;
      if (!imageFile) throw new Error("Image File not found");

      const imageUrl = await postsServices.uploadImage(imageFile);

      const userId = req.user._id;
      const postData = await postsServices.createPost(userId, imageUrl);

      res.status(200).send({ postData });
    } catch (error) {
      next(error);
    }
  },
  addCaption: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id, caption } = req.body;
      const postData = await postsServices.addCaption(_id, caption);
      res.status(200).send(postData);
    } catch (error) {
      next(error);
    }
  },
  getSinglePost: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { postId } = req.params;
      const { userId, imageUrl, caption, likedBy, comments, updatedAt } =
        await postsServices.getSinglePost(postId);

      const { username, firstName, lastName, profilePicUrl } =
        await userServices.getUser(userId);

      const isLiked = false; /// should check if the current user has liked the post - do this after implementing like feature

      const postData = {
        username,
        firstName,
        lastName,
        profilePicUrl,
        caption,
        imageUrl,
        likedBy,
        isLiked,
        comments,
        updatedAt,
      };

      res.status(200).json(postData);
    } catch (error) {
      next(error);
    }
  },
};
