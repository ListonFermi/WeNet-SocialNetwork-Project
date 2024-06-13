import { ObjectId } from "mongoose";
import userCollection, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import { uploadToS3Bucket } from "../utils/s3Bucket";
import { IMulterFile } from "../types/types";

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
  editUserData: async (_id: string | ObjectId,userData: IUser): Promise<IUser> => {
    try {
      const user: any = await userCollection.findOne({ _id });
      if (!user) {
        throw new Error("User not found");
      }

      const updatedUser = {
        ...user._doc,
        ...userData,
        dateOfBirth: new Date(userData?.dateOfBirth || user.dateOfBirth || ""),
      };
      const result = await userCollection.findOneAndUpdate(
        { _id },
        { $set: updatedUser },
        { new: true } // new: true returns the updated document
      );

      if (!result) {
        throw new Error("User not found");
      }
      console.log({result})
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
  uploadImage: async (imageFile: unknown, imageType: string): Promise<string> => {
    try {
      const folderName = imageType;
      return await uploadToS3Bucket(imageFile as IMulterFile, folderName);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
