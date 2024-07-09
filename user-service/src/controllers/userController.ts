import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import { IUser } from "../models/User";
import { MQActions, SERVICES } from "../rabbitMq/config";
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
        SERVICES.allOtherServices.forEach(async () => {
          await userService.sendUserDataToMQ(_id, MQActions.addUser);
        });
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
      console.error(error);
      next(error);
    }
  },
  googleSigninController: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: any = await userService.googleSignin(req.body);

      await userService.sendUserDataToMQ(userData._id, MQActions.addUser);

      const token = await userService.generateJWT(userData);
      res.cookie("token", token);
      res.status(200).json({ userData, message: "Logged in successfully" });
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

      try {
        SERVICES.allOtherServices.forEach(async () => {
          if(!userData._id) throw new Error('user Id not found to send in MQ')
          await userService.sendUserDataToMQ(userData._id?.toString(), MQActions.editUser);
        });
      } catch (error: any) {
        console.log(error.message);
      }

      const token = await profileService.generateJWT(userData);
      res.cookie("token", token);

      res.status(200).send("Account type updated successfully");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
