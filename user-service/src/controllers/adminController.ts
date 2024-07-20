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

      const adminToken = await adminService.generateJWT(adminUsername);
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
      const userData = await userCollection.find();
      res.status(200).json(userData);
    } catch (error: any) {
      next(error);
    }
  },
  dashboardCardData: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const [totalUsers, totalVerifiedAccounts] =
        await adminService.dashboardCardData();
      res.status(200).send([totalUsers, totalVerifiedAccounts]);
    } catch (error: any) {
      next(error);
    }
  },
  dashboardChartData: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await adminService.dashboardChartData();
      res.status(200).send(data);
    } catch (error: any) {
      next(error);
    }
  },
  dashboardChartDataAccountType: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await adminService.dashboardChartDataAccountType();
      res.status(200).send(data);
    } catch (error: any) {
      next(error);
    }
  },
  getTickRequestsData: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { pageNo, rowsPerPage } = req.query;
      const data = await adminService.getTickRequestsData(
        Number(pageNo),
        Number(rowsPerPage)
      );
      res.status(200).send(data);
    } catch (error: any) {
      next(error);
    }
  },
  changeTickRequestStatus: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { requestId } = req.params;
      const { status, userId } = req.body;

      if (status != "approved" && status != "rejected")
        throw new Error("Invalid status for the tick request");

      const data = await adminService.changeTickRequestStatus(
        requestId,
        status,
        userId
      );
      res.status(200).send(data);
    } catch (error: any) {
      next(error);
    }
  },
};
