import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import { IUser } from "../models/User";
import { MQActions } from "../rabbitMq/config";
import profileService from "../services/profileService";

export = {
  signupController: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: IUser = req.body;
      const user = await userService.addUser(userData);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
  sendOTPController: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: IUser = req.body;
      const user = await userService.addUserData(userData);
      if (!user) next(new Error("User not found"));
      await userService.sendOTP(user?.email);
      res.status(200).send("OTP sent successfully");
    } catch (error) {
      next(error);
    }
  },
  verifyOTPController: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const otpData: { _id: string; otp: string } = req.body;
      const { _id, otp } = otpData;
      await userService.verifyOTP(_id, otp);

      try {
        await userService.sendUserDataToMQ(_id, MQActions.addUser);

        //userData with email, to ads Service
        await userService.sendUserDataToAdsMQ(_id, MQActions.addUser);
      } catch (error: any) {
        console.log(error.message);
      }

      res.status(200).send("OTP verified successfully");
    } catch (error) {
      next(error);
    }
  },
  loginController: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const loginData: { username: string; password: string } = req.body;
      const userData: IUser = await userService.verifyLogin(
        loginData.username,
        loginData.password
      );

      if (!userData) next(new Error("User doesn't exist"));

      const token = await userService.generateJWT(userData);
      res.cookie("token", token);
      res.status(200).json({ userData, message: "Logged in successfully" });
    } catch (error) {
      next(error);
    }
  },
  googleSigninController: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { user, exisitngUser }: any = await userService.googleSignin(
        req.body
      );

      const action = exisitngUser ? MQActions.editUser : MQActions.addUser;

      await userService.sendUserDataToMQ(user._id, action);
      await userService.sendUserDataToAdsMQ(user._id, action);

      const token = await userService.generateJWT(user);
      res.cookie("token", token);
      res
        .status(200)
        .json({ userData: user, message: "Logged in successfully" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  changePassword: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user._id;
      const { newPassword, currentPassword } = req.body;

      const message = await userService.changePassword(
        userId,
        currentPassword,
        newPassword
      );

      res.status(200).send(message);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  forgotPassword: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.body;

      const message = await userService.forgotPassword(email);

      res.status(200).send(message);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  changeAccountType: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user._id;
      const { accountType } = req.body;

      const userData = await userService.changeAccountType(userId, accountType);
      if (!userData) throw new Error("user data not found");

      const token = await profileService.generateJWT(userData);
      res.cookie("token", token);

      res.status(200).send("Account type updated successfully");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  requestWenetTick: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { imageUrl, description } = req.body;
      const userId = req.user._id;

      const wenetRequestData = await userService.requestWenetTick(
        userId,
        imageUrl,
        description
      );

      res.status(200).send(wenetRequestData);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  hasRequestedTick: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user._id;

      const data = await userService.hasRequestedTick(userId);

      res.status(200).send(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  hasWenetTick: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username } = req.params;
      const data = await userService.hasWenetTick(username);
      res.status(200).send(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
