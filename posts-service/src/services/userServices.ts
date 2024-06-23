import { IUser } from "../models/userCollection";
import userRepository from "../repositories/userRepository";

export ={
    addUser : async function (userData: IUser) : Promise<string> {
        try {
            return await userRepository.addUser(userData)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}