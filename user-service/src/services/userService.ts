import userRepository from "../repositories/userRepository";
import { IUser } from "../models/User";
import { IGoogleCredentialRes } from "../types/types";

export = {
  addUser: async (userData: IUser): Promise<IUser> => {
    try {
      return await userRepository.addUser(userData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  addUserData: async (userData: IUser): Promise<IUser> => {
    try {
      return await userRepository.addUserData(userData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  sendOTP: async (email: string): Promise<String> => {
    try {
      return await userRepository.sendOTP(email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  verifyOTP: async (_id: string, otp: string): Promise<String> => {
    try {
      return await userRepository.verifyOTP(_id, otp);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  verifyLogin: async (username: string, password: string): Promise<IUser> => {
    try {
      return await userRepository.verifyLogin(username, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  generateJWT: async (userData: IUser): Promise<string> => {
    try {
      return await userRepository.generateJWT(userData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  googleSignin: async (
    credentialResponse: IGoogleCredentialRes
  ): Promise<{user: IUser,exisitngUser: boolean }> => {
    try {
      const {user, exisitngUser}= await userRepository.googleSignin(credentialResponse);

      return {user, exisitngUser}
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  sendUserDataToMQ: async (_id: string, action: string): Promise<void> => {
    try {
      await userRepository.sendUserDataToMQ(_id, action);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  sendUserDataToAdsMQ: async (_id: string, action: string): Promise<void> => {
    try {
      await userRepository.sendUserDataToAdsMQ(_id, action);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  changePassword: async (
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<string> => {
    try {
      return await userRepository.changePassword(
        userId,
        currentPassword,
        newPassword
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  forgotPassword: async (email: string): Promise<string> => {
    try {
      return await userRepository.forgotPassword(email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  changeAccountType: async (
    userId: string,
    accountType: string
  ): Promise<IUser> => {
    try {
      if (!userId) throw new Error("userId not found");
      if (
        accountType != "personalAccount" &&
        accountType != "celebrity" &&
        accountType != "company"
      )
        throw new Error("Enter valid account type");

      return await userRepository.changeAccountType(userId, accountType);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  requestWenetTick: async (
    userId: string,
    imageUrl: string,
    description: string
  ) => {
    try {
      return await userRepository.requestWenetTick(
        userId,
        imageUrl,
        description
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  hasRequestedTick: async (userId: string) => {
    try {
      const tickRequestData = await userRepository.getTickRequestData(userId);
      if (!tickRequestData) return { hasRequestedTick: false, status: null };

      return { hasRequestedTick: true, status: tickRequestData.status };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  hasWenetTick: async (username: string) => {
    try {
      const user = await userRepository.getUserData(username);
      if (!user) throw new Error("User not found");

      if (user.accountType?.hasWeNetTick) return true;
      else return false;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
