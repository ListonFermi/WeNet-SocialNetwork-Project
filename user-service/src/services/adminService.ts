import { ObjectId } from "mongoose";
import adminRepository from "../repositories/adminRepository";

export = {
  verifyLogin: async (username: string, password: string): Promise<string> => {
    try {
      return await adminRepository.verifyLogin(username, password)
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  generateJWT: async (adminUsername: string): Promise<string> => {
    try {
      return await adminRepository.generateJWT(adminUsername)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
};
