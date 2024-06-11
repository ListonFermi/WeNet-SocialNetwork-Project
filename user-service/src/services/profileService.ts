import { ObjectId } from "mongoose";
import { IUser } from "../models/User";
import profileRepository from "../repositories/profileRepository";

export = {
  getUserData: async (_id: string | ObjectId): Promise<IUser> => {
    try {
      return profileRepository.getUserData(_id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  editUserData: async (userData: IUser): Promise<IUser> => {
    try {
      return profileRepository.editUserData(userData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  generateJWT: async (userData: IUser): Promise<string> => {
    try {
      return await profileRepository.generateJWT(userData)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
};
