import { ObjectId } from "mongoose";
import userCollection, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

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
      const { _id } = userData;
      const user = await userCollection.findOne({ _id });
      if (!user) {
        throw new Error("User not found");
      }

      const updatedUser = { ...user, ...userData };
      const result: any = await userCollection.updateOne(
        { _id },
        { $set: updatedUser },
        { returnDocument: "after" }
      );

      if (!result.value) {
        throw new Error("User not found");
      }

      return result.value as IUser;
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
};
