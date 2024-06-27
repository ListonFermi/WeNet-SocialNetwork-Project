import {Types} from "mongoose";
import { IUser } from "../models/userCollection";
import userRepository from "../repositories/userRepository";

export = {
  addUser: async function (userData: IUser): Promise<string> {
    try {
      return await userRepository.addUser(userData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getUser: async function (userId: string | Types.ObjectId): Promise<IUser> {
    try {
      return await userRepository.getUser(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  updateUser: async function (userData: IUser): Promise<string> {
    try {
      return await userRepository.updateUser(userData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
