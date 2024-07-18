import { Request, NextFunction, Response } from "express";
import adminServices from "../services/adminServices";

export = {
  getReportsData: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reportsData = await adminServices.getReportsData();
      res.status(200).send(reportsData);
    } catch (error) {
      next(error);
    }
  },
  resolveReport: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { reportId } = req.params;
      const message = await adminServices.resolveReport(reportId);
      res.status(200).send(message);
    } catch (error) {
      next(error);
    }
  },
  getDashboardCardData: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const [totalPosts, totalReports] =
        await adminServices.getDashboardCardData();
      res.status(200).send([totalPosts, totalReports]);
    } catch (error) {
      next(error);
    }
  },
};
