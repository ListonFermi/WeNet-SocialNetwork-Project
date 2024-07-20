import jwt from "jsonwebtoken";
import userCollection from "../models/User";
import wenetTickRequestCollection from "../models/WenetTickRequest";

export = {
  verifyLogin: async (username: string, password: string): Promise<string> => {
    try {
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminUsername || !adminPassword) throw new Error("ENV issues");
      console.log({ adminUsername, adminPassword, username, password });
      const isMatching =
        username === adminUsername && password === adminPassword;
      if (!isMatching) throw new Error("Credentials doesn't match");
      return adminUsername;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  generateJWT: async (adminUsername: string): Promise<string> => {
    try {
      const secret: string | undefined = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT Secret not found");
      return jwt.sign({ adminUsername, role: "wenet-admin" }, secret, {
        expiresIn: "1h",
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  dashboardCardData: async (): Promise<number[]> => {
    try {
      const totalUsers = await userCollection.countDocuments();
      const totalVerifiedAccounts = await userCollection.countDocuments({
        accountType: { hasWeNetTick: true },
      });
      return [totalUsers, totalVerifiedAccounts];
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  dashboardChartData: async (startDate: Date) => {
    try {
      startDate.setDate(startDate.getDate() - 14);
      startDate.setHours(0, 0, 0, 0);

      return await userCollection.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  personalAccountCount: async () => {
    try {
      return await userCollection.countDocuments({
        "accountType.isProfessional": false,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  celebrityAccountCount: async () => {
    try {
      return await userCollection.countDocuments({
        "accountType.category": "celebrity",
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  companyAccountCount: async () => {
    try {
      return await userCollection.countDocuments({
        "accountType.category": "company",
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getTickRequestsData: async (skip: number, limit: number) => {
    try {
      return await wenetTickRequestCollection
        .find()
        .skip(skip)
        .limit(limit)
        .populate("userId");
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getTickRequestDocumentCount: async () => {
    try {
      return await wenetTickRequestCollection.countDocuments();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  changeTickRequestStatus: async (
    requestId: string,
    status: "approved" | "rejected"
  ) => {
    try {
      const tickRequestData = await wenetTickRequestCollection.findById(
        requestId
      );
      if (!tickRequestData) throw new Error("Tick request data not found");

      tickRequestData.status = status;
      await tickRequestData.save();

      return tickRequestData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  giveTickToUser: async (userId: string) => {
    try {
      const updatedUser = await userCollection.findByIdAndUpdate(
        userId,
        { $set: { 'accountType.hasWeNetTick': true } },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) throw new Error("User not found");
  
      return updatedUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  
};
