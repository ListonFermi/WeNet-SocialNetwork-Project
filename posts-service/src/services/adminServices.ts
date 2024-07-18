import { IReport } from "../models/reportsCollection";
import adminRepository from "../repositories/adminRepository";

export = {
  getReportsData: async function (
    pageNo: number,
    rowsPerPage: number
  ): Promise<[IReport[],number]> {
    try {
      const skip = rowsPerPage * (pageNo - 1);
      const limit = rowsPerPage;
      const reportsData= await adminRepository.getReportsData(skip, limit);
      const documentCount = await adminRepository.getReportsDocumentCount();
      return [reportsData,documentCount]
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  resolveReport: async function (reportId: string): Promise<string> {
    try {
      return await adminRepository.resolveReport(reportId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getDashboardCardData: async function (): Promise<number[]> {
    try {
      const [totalPosts, totalReports] =
        await adminRepository.getDashboardCardData();
      return [totalPosts, totalReports];
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
