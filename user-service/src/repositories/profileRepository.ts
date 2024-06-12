import mongoose, { ObjectId } from "mongoose";
import userCollection, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import { request } from "http";

export = {
  getUserData: async (_id: string | ObjectId): Promise<IUser> => {
    try {
      const userData = await userCollection.findOne({ _id });
      if (!userData) throw new Error("No user found");
      return userData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  editUserData: async (userData: IUser): Promise<IUser> => {
    try {
      let { _id } = userData;

      const user:any = await userCollection.findOne({ _id });
      if (!user) {
        throw new Error("User not found");
      }

      console.log({ user });
      console.log({ userData });
      const updatedUser = {
        ...user._doc,
        ...userData,
        dateOfBirth: new Date(userData?.dateOfBirth || user.dateOfBirth || ""),
      };
      console.log({updatedUser})
      const result = await userCollection.findOneAndUpdate(
        { _id },
        { $set: updatedUser },
        { new: true } // new: true returns the updated document
      );
      console.log({ result });

      if (!result) {
        throw new Error("User not found");
      }

      return result as IUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  generateJWT: async (userData: IUser): Promise<string> => {
    try {
      const secret: string | undefined = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT Secret not found");
      return jwt.sign({ userData }, secret, { expiresIn: "1h" });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  // uploadProfilePic: async (files: any): Promise<String> => {
  //   try {
      
  //   } catch (error: any) {
  //     throw new Error(error.message);
  //   }
  // }
};
