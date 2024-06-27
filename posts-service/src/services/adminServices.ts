import { IReport } from "../models/reportsCollection"
import adminRepository from "../repositories/adminRepository"

export = {
    getReportsData: async function (): Promise<IReport>{
        try {
            return await adminRepository.getReportsData()
        } catch (error: any) {
            throw new Error(error.message)
        }
    },
    resolveReport: async function (reportId: string): Promise<string>{
        try {
            return await adminRepository.resolveReport(reportId)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}