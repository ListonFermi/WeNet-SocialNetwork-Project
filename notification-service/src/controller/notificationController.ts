import { NextFunction, Response } from "express";
import notificationServices from "../services/notificationServices";

export = {
  getNotifications: async function (
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user._id;
      
      const notification = await notificationServices.getNotifications(userId);
      res.status(200).json(notification);
    } catch (error: any) {
      next(error);
    }
  },
};
