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
  ): Promise<IUser> => {
    try {
      return await userRepository.googleSignin(credentialResponse);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  sendUserDataToMQ : async (_id: string, action: string) : Promise<void> =>{
    try {
      await userRepository.sendUserDataToMQ(_id, action)
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
};
