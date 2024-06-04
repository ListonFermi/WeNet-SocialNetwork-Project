import { Request, Response } from "express";
import userService from "../services/userService";
import { IUser } from "../models/User";

export = {
  signupController: async (req: Request, res: Response): Promise<void> => {
    try{
      const userData: IUser = req.body;
      const user = await userService.addUser(userData);
      res.status(201).json(user);
    }catch(e){
      console.log(e)
      res.status(500).json('Internal Server Error')
    }
  },
};
