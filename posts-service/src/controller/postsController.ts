import { NextFunction, Request, Response } from "express";
import postsServices from "../services/postsServices";

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
      res.status(200).send(postData)
    } catch (error) {
      next(error);
    }
  },
};
