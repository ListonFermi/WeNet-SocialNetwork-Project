import { NextFunction, Request, Response } from "express";
import reportsService from "../services/reportsService";

export = {
  addReport: async function (req: any, res: Response, next: NextFunction) {
    try {
      const { entityType, entityId } = req.params;
      const { reportType, reportDescription } = req.body;

      const reportedBy = req.user._id;
      const reportData = await reportsService.addReport(
        entityType,
        entityId,
        reportedBy,
        reportType,
        reportDescription
      );

      res.status(200).send(reportData);
    } catch (error) {
      next(error);
    }
  },
 

};
