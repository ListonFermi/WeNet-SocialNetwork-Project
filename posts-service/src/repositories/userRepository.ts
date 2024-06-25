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
};
