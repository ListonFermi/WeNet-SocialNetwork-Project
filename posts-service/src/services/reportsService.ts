import { IReport } from "../models/reportsCollection";
import reportsRepository from "../repositories/reportsRepository";

export = {
  addReport: async function (
    entityType: "posts" | "comments" | "users",
    entityId: string,
    reportedBy: string,
    reportType: string,
    reportDescription: string
  ): Promise<IReport> {
    try {
      return await reportsRepository.addReport(
        entityType,
        entityId,
        reportedBy,
        reportType,
        reportDescription
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
