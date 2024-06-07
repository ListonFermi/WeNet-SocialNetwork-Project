import userCollection, { IUser } from "../models/User";

export = {
  isHalfwayUser: async function (userData: IUser): Promise<IUser | null> {
    try {
      const { username } = userData;
      const user = await userCollection.findOne({ username, email: null });
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
