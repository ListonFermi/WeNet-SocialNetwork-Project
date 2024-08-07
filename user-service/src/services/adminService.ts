import adminRepository from "../repositories/adminRepository";

export = {
  verifyLogin: async (username: string, password: string): Promise<string> => {
    try {
      return await adminRepository.verifyLogin(username, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  generateJWT: async (adminUsername: string): Promise<string> => {
    try {
      return await adminRepository.generateJWT(adminUsername);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  dashboardCardData: async (): Promise<number[]> => {
    try {
      return await adminRepository.dashboardCardData();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  dashboardChartData: async () => {
    try {
      const dates = [],
        todaysDate = new Date();
      const data = await adminRepository.dashboardChartData(todaysDate);

      for (let i = 0; i < 14; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const formattedDate = date.toISOString().split("T")[0];
        dates.push(formattedDate);
      }

      const responseFormat = dates.map((date) => {
        const count = data.find((val) => val._id === date)?.count || 0;
        return [date, count];
      });

      return [["Day", "Users"], ...responseFormat];
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  dashboardChartDataAccountType: async () => {
    try {
      const personalAccountCount = await adminRepository.personalAccountCount();
      const celebrityAccountCount =
        await adminRepository.celebrityAccountCount();
      const companyAccountCount = await adminRepository.companyAccountCount();

      const responseFormat = [
        ["Account Type", "Users count"],
        ["Personal Accounts", personalAccountCount],
        ["Celebrity Accounts", celebrityAccountCount],
        ["Company/Institution Accounts", companyAccountCount],
      ];
      return responseFormat;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getTickRequestsData: async (pageNo: number, rowsPerPage: number) => {
    try {
      const skip = rowsPerPage * (pageNo - 1);
      const limit = rowsPerPage;

      const tickRequestData = await adminRepository.getTickRequestsData(
        skip,
        limit
      );

      const documentCount = await adminRepository.getTickRequestDocumentCount();

      const responseFormat = tickRequestData.map((data: any, index) => {
        const { imageUrl, description, status, createdAt, userId } = data;
        const requestId = data._id;
        const { username, firstName, lastName, profilePicUrl } = userId;

        return {
          sNo: skip + index + 1,
          requestId,
          userId: userId._id,
          username,
          firstName,
          lastName,
          profilePicUrl,
          imageUrl,
          description,
          status,
          createdAt,
        };
      });

      return [responseFormat, documentCount];
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  changeTickRequestStatus: async (
    requestId: string,
    status: "approved" | "rejected",
    userId: string
  ) => {
    try {
      const tickRequestData = await adminRepository.changeTickRequestStatus(
        requestId,
        status
      );

      if (status === "approved") await adminRepository.giveTickToUser(userId);

      return tickRequestData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
