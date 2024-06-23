import { Types } from "mongoose";
import userCollection, { IUser } from "../models/userCollection";

export = {
  addUser: async function (userData: IUser): Promise<string> {
    try {
      if (typeof userData._id === "string") {
        userData._id = new Types.ObjectId(userData._id);
      }
      await userCollection.create(userData);
      return 'User data added successfully'
    } catch (error: any) {
        throw new Error(error.message)
    }
  },
};
