import { NextFunction, Response } from "express";
import profileService from "../services/profileService";
import AWS from "aws-sdk";
import userService from "../services/userService";
import { MQActions } from "../../rabbitMq/config";

export = {
  getUser: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { _id } = req?.user;
      if (!_id) throw new Error("No user id found");
      const userData = await profileService.getUserData(_id);
      res.status(200).json({ userData });
    } catch (error) {
      next(error);
    }
  },
  editUser: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = req?.user;
      if (!user) throw new Error("No user found");

      const userData: any = await profileService.editUserData(req.user._id,req.body);
      if(!userData) throw new Error("User data not found")

      await userService.sendUserDataToMQ(userData._id, MQActions.editUser);

      const token = await profileService.generateJWT(userData);
      res.cookie("token", token);

      res.status(200).send("User data edited successfully");
    } catch (error) {
      next(error);
    }
  },
  updatePic: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const imageFile = req.file;
      if (!imageFile) throw new Error("Image File not found");

      const {imageType} = req.params;
      if (!imageType) throw new Error("Image type not found");

      req.body[`${imageType}Url`] = await profileService.uploadImage(
        imageFile,
        imageType
      );
      next();
    } catch (error) {
      next(error);
    }
  },
};
