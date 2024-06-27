import { Types } from "mongoose";
import reportsCollection, { IReport } from "../models/reportsCollection";

export = {
  getReportsData: async function (): Promise<IReport> {
    try {
      const reportsData: any = await reportsCollection
        .find()
        .populate("reportedBy") // Populate 'reportedBy' field with 'username' from 'users' collection
        .populate("entityId") // Populate 'entityId' dynamically based on 'entityType'
        .exec();
      return reportsData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  resolveReport: async function (reportId: string): Promise<string> {
    try {
      const report = (await reportsCollection.findOne({
        _id: new Types.ObjectId(reportId),
      })) as IReport;
      report.isResolved = true;
      report?.save();

      return "Report is resolved successfully";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
