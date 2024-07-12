import adsRepository from "../repositories/adsRepository";
import PayURepository from "../repositories/PayURepository";

export = {
  addTransaction: async function (
    userId: string,
    PayUOrderId: string,
    status: "success" | "failed"
  ): Promise<string> {
    try {
      const PayUOrderData = await PayURepository.getPayUOrder(PayUOrderId);
      if (!PayUOrderData) throw new Error("PayU Order Data not found");

      const transaction = await adsRepository.addTransaction(
        userId,
        PayUOrderId,
        status,
        PayUOrderData.amount
      );
      if (!transaction) throw new Error("Transaction Data not found");

      if (status === "success") {
        const postId = PayUOrderData?.productinfo;
        const WeNetAdsData = await adsRepository.createWenetAds(
          userId,
          postId,
          transaction._id.toString()
        );
        const postData = await adsRepository.addAdDataToPost(postId);

        try {
          await adsRepository.sendPostAdDataToMQ(
            postData._id.toString(),
            postData.WeNetAds
          );
        } catch (error: any) {
          console.log(error.message);
        }
      }
      return transaction._id.toString();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
