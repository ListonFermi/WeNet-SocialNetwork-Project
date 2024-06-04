import userCollection, { IUser } from "../models/User";

export = {
  addUser: async (userData: IUser): Promise<IUser> => {
    const user = new userCollection(userData);
    return await user.save();
  },
};
