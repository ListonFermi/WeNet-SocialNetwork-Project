import { Types } from "mongoose";
import userCollection, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import { uploadToS3Bucket } from "../utils/s3Bucket";
import { IMulterFile } from "../types/types";

export = {
  getUserData: async (_id: string | Types.ObjectId): Promise<IUser> => {
    try {
      const userData = await userCollection.findOne({ _id });
      if (!userData) throw new Error("No user found");
      return userData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  editUserData: async (
    _id: string | Types.ObjectId,
    userData: IUser
  ): Promise<IUser> => {
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
  uploadImage: async (
    imageFile: unknown,
    imageType: string
  ): Promise<string> => {
    try {
      const folderName = imageType;
      return await uploadToS3Bucket(imageFile as IMulterFile, folderName);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getProfileData: async (username: string): Promise<IUser> => {
    try {
      const userData = await userCollection.findOne({ username });
      if (!userData) throw new Error("No user found");
      return userData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  isFollowing: async (user1: string, user2: string): Promise<boolean> => {
    try {
      const user1Id = new Types.ObjectId(user1);
      const user2Id = new Types.ObjectId(user2);

      const user1Data = await userCollection.findOne({ _id: user1Id });
      if (!user1Data) throw new Error("Current user not found");

      const user2Data = await userCollection.findOne({ _id: user2Id });
      if (!user2Data) throw new Error("User to be followed not found");
      console.log({ user1Data, user2Data });

      let isFollowing = false;
      let index1, index2;

      if (user1Data.following && user2Data.followers) {
        index1 = user1Data.following.findIndex((id: Types.ObjectId) =>
          id.equals(user2Id)
        );
        index2 = user2Data.followers.findIndex((id: Types.ObjectId) =>
          id.equals(user1Id)
        );
        console.log({ index1, index2 });
        isFollowing = index1 !== -1 && index2 !== -1;
      }

      return isFollowing;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  toggleFollow: async (user1: string, user2: string): Promise<boolean> => {
    try {
      const user1Id = new Types.ObjectId(user1);
      const user2Id = new Types.ObjectId(user2);

      const user1Data = await userCollection.findOne({ _id: user1Id });
      if (!user1Data) throw new Error("Current user not found");

      const user2Data = await userCollection.findOne({ _id: user2Id });
      if (!user2Data) throw new Error("User to be followed not found");

      let isFollowing = false;
      let index1, index2;

      if (user1Data.following && user2Data.followers) {
        index1 = user1Data.following.findIndex((id: Types.ObjectId) =>
          id.equals(user2Id)
        );
        index2 = user2Data.followers.findIndex((id: Types.ObjectId) =>
          id.equals(user1Id)
        );
        isFollowing = index1 !== -1 && index2 !== -1;
      }

      if (isFollowing) {
        //unfollow operation
        if (index1 != undefined) user1Data.following?.splice(index1, 1);
        if (index2 != undefined) user2Data.followers?.splice(index2, 1);
      } else {
        //follow operation
        user1Data.following?.push(user2Id);
        user2Data.followers?.push(user1Id);
      }

      await user1Data.save();
      await user2Data.save();

      return !isFollowing;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
