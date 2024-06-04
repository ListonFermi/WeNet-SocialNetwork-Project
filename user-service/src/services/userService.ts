import userRepository from "../repositories/userRepostiory";
import { IUser } from "../models/User";

export = {
  addUser: async (userData: IUser): Promise<IUser> => {
    return await userRepository.addUser(userData);
  },
};
