import { NextFunction, Request, Response } from "express";
import adminService from "../services/adminService";

export = {
  getAdsManagementData: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { pageNo, rowsPerPage } = req.query;
      const data = await adminService.getAdsManagementData(
        Number(pageNo),
        Number(rowsPerPage)
      );
      res.status(200).send(data)
    } catch (error: any) {
      next(error);
    }
  },
  toggleStatus: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {postId} = req.params
      const message = await adminService.toggleStatus(postId)
      res.status(200).send(message)
    } catch (error: any) {
      next(error);
    }
  },
};
