import { Types } from "mongoose";
import userCollection, { IUser } from "../models/userCollection";

export = {
  addUser: async function (userData: IUser): Promise<string> {
    try {
      if (typeof userData._id === "string") {
        userData._id = new Types.ObjectId(userData._id);
      }
      await userCollection.create(userData);
      return "User data added successfully";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getUser: async function (userId: string | Types.ObjectId): Promise<IUser> {
    try {
      let _id
      if (typeof userId === "string") {
        _id = new Types.ObjectId(userId);
      }else{
        _id = userId
      }
      const userData= await userCollection.findOne(_id)
      if(!userData) throw new Error('User not found')
      return userData
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  updateUser: async function (userData: IUser): Promise<string> {
    try {
      const _id = new Types.ObjectId( userData._id) 
      const user: any = await userCollection.findOne({ _id});
      if (!user) {
        throw new Error("User not found");
      }

      const updatedUser = {
        ...user._doc,
        ...userData,
      };
      await userCollection.findOneAndUpdate(
        { _id },
        { $set: updatedUser },
      );

      return "User data updated successfully";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
