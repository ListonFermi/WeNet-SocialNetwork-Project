import { NextFunction, Response } from "express";
import profileService from "../services/profileService";

export = {
  getUserController: async (
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
  editUserController: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = req?.user;
      if (!user) throw new Error("No user found");
      const userData= await profileService.editUserData(user)
      const token = await profileService.generateJWT(userData);
      res.cookie("token", token);
      res.status(200).send("User data edited successfully");
    } catch (error) {
      next(error);
    }
  },
};
