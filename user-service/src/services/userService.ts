import userRepository from "../repositories/userRepostiory";
import { IUser } from "../models/User";

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
      await userRepository.sendOTP(email);
      return "";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
