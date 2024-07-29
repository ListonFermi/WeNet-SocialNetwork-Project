import { NextFunction, Request, Response } from "express";
import profileService from "../services/profileService";
import userService from "../services/userService";
import { MQActions } from "../rabbitMq/config";

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
      res.status(200).json(userData);
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

      const userData: any = await profileService.editUserData(
        req.user._id,
        req.body
      );
      if (!userData) throw new Error("User data not found");

      try {
        await userService.sendUserDataToMQ(userData._id, MQActions.editUser);
        await userService.sendUserDataToAdsMQ(userData._id, MQActions.editUser);
      } catch (error: any) {
        console.log(error.message);
      }

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

      const { imageType } = req.params;
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
  getProfileData: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username } = req.params;
      if (!username) throw new Error("No username found in params");

      const userData = await profileService.getProfileData(username);
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  },
  toggleFollow: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userToFollow } = req.params;
      const currentUserId = req.user._id;

      const isFollowing: boolean = await profileService.toggleFollow(
        currentUserId,
        userToFollow
      );

      res.status(200).send(isFollowing);
    } catch (error) {
      next(error);
    }
  },
  isFollowing: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const currentUserId = req.user._id;

      const isFollowing: boolean = await profileService.isFollowing(
        currentUserId,
        userId
      );

      res.status(200).send(String(isFollowing));
    } catch (error) {
      next(error);
    }
  },
  searchUsers: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { keyword } = req.query;

      const usersData = await profileService.searchUsers(keyword);

      res.status(200).send(usersData);
    } catch (error) {
      next(error);
    }
  },
  toggleBlockUser: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const currUserId = req.user._id;

      const isBlocked = await profileService.toggleBlock(currUserId, userId);

      res.status(200).send(isBlocked);
    } catch (error) {
      next(error);
    }
  },
  isBlocked: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const currentUserId = req.user._id;

      const isBlocked: boolean = await profileService.isBlocked(
        currentUserId,
        userId
      );

      res.status(200).send(isBlocked);
    } catch (error) {
      next(error);
    }
  },
  getBlockedUsers: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user._id;
      const { pageNo, rowsPerPage } = req.query;
      const [responseFormat, documentCount] =
        await profileService.getBlockedUsers(pageNo, rowsPerPage, userId);
      res.status(200).send([responseFormat, documentCount]);
    } catch (error) {
      next(error);
    }
  },
  getFollowingUsers: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user._id;
      const data = await profileService.getFollowingUsers(userId);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  },
  uploadWeNetTickRequestPic: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const imageFile = req.file;
      if (!imageFile) throw new Error("Image File not found");

      req.body.imageUrl = await profileService.uploadImage(
        imageFile,
        "wenet-tick-request"
      );
      next();
    } catch (error) {
      next(error);
    }
  },
};
