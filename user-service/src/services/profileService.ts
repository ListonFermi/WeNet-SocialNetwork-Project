import { ObjectId } from "mongoose";
import { IUser } from "../models/User";
import profileRepository from "../repositories/profileRepository";

export = {
  getUserData: async (_id: string | ObjectId): Promise<IUser> => {
    try {
      return await profileRepository.getUserData(_id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  editUserData: async (_id: string | ObjectId, userData: IUser): Promise<IUser> => {
    try {
      return profileRepository.editUserData(_id,userData);
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
  uploadImage: async (imageFile: unknown, imageType: string): Promise<string> => {
    try {
      return await profileRepository.uploadImage(imageFile,imageType)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  getProfileData: async (username: string): Promise<IUser> => {
    try {
      return profileRepository.getProfileData(username);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
