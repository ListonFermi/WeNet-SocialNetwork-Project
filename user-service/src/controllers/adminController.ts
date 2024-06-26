import { NextFunction, Request, Response } from "express";
import adminService from "../services/adminService";
import userCollection from "../models/User";

export = {
  login: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, password } = req.body;

      const adminUsername = await adminService.verifyLogin(username, password);
      
      const adminToken = await adminService.generateJWT(adminUsername)
      res.cookie("adminToken", adminToken);
      
      res.status(200).send("Admin logged in successfully");
    } catch (error: any) {
      next(error);
    }
  },
  userManagement: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData = await userCollection.find()
      res.status(200).json(userData)
    }catch(error: any){
      next(error)
    }
  }
};
