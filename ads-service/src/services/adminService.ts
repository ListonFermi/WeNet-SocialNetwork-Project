import adminRepository from "../repositories/adminRepository";

export = {
  getAdsManagementData: async function (pageNo: number, rowsPerPage: number) {
    try {
      const skip = rowsPerPage * (pageNo - 1);
      const limit = rowsPerPage;

      const adsManagementData = await adminRepository.getAdsManagementData(
        skip,
        limit
      );

      const responseFormat = adsManagementData.map((data, index) => {
        let { userData, postData, transactionData } = data;

        (userData = userData[0]),
        (postData = postData[0]),
        (transactionData = transactionData[0]);

        const sNo = skip + (index + 1);

        const advertisementId = data._id.toString().toUpperCase();

        const username = userData.username;

        const postImageUrl = postData.imageUrl;
        const postId = postData._id;
        const expiresOn = postData.WeNetAds.expiresOn;
        const isActive = postData.WeNetAds.isPromoted;

        const transactionId = transactionData._id.toString().toUpperCase();
        const transactionDate = transactionData.createdAt;
        const transactionAmount = transactionData.transactionAmount;
        const PayUTransactionId =
          transactionData.PayUTransactionId.toString().toUpperCase();

        return {
          sNo,
          advertisementId,
          username,
          postImageUrl,
          postId,
          transactionId,
          transactionDate,
          transactionAmount,
          PayUTransactionId,
          expiresOn,
          isActive,
        };
      });

      const documentCount =
        await adminRepository.getAdsManagementDocumentCount();

      return [responseFormat, documentCount];
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
