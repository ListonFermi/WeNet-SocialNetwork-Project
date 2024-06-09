import userRepository from "../repositories/userRepository";
import { IUser } from "../models/User";
import { ObjectId } from "mongoose";

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
      return await userRepository.verifyOTP(_id,otp);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  verifyLogin: async (username: string, password: string): Promise<IUser> => {
    try {
      return await userRepository.verifyLogin(username, password)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  generateJWT: async (_id: string | ObjectId | undefined): Promise<string> => {
    try {
      return await userRepository.generateJWT(_id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
};
