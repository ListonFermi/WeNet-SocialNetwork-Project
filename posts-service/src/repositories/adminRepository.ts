import { Types } from "mongoose";
import reportsCollection, { IReport } from "../models/reportsCollection";
import postsCollection from "../models/postsCollection";

export = {
  getReportsData: async function (skip: number, limit: number): Promise<IReport[]> {
    try {
      const reportsData: any = await reportsCollection
        .find()
        .skip(skip)
        .limit(limit)
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
  getDashboardCardData: async function (): Promise<number[]> {
    try {
      const totalPosts = await postsCollection.countDocuments()
      const totalReports = await reportsCollection.countDocuments()
      return  [totalPosts, totalReports]
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getReportsDocumentCount: async function () {
    try {
      return await reportsCollection.countDocuments()
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
};
