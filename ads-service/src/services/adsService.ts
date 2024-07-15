import adsRepository from "../repositories/adsRepository";
import PayURepository from "../repositories/PayURepository";
import userServices from "./userServices";

export = {
  addTransaction: async function (
    email: string,
    PayUOrderId: string,
    status: "success" | "failed"
  ): Promise<string> {
    try {
      const PayUOrderData = await PayURepository.getPayUOrder(PayUOrderId);
      if (!PayUOrderData) throw new Error("PayU Order Data not found");
      console.log("Got order id");
      console.log(PayUOrderData);

      const userData = await userServices.getUserDataByEmail(email);
      if (!userData) throw new Error("User Data not found.");
      const userId = userData._id.toString();

      const transaction = await adsRepository.addTransaction(
        userId,
        PayUOrderId,
        status,
        PayUOrderData.amount
      );
      console.log("Added transaction");
      console.log(transaction);
      if (!transaction) throw new Error("Transaction Data not found");

      if (status === "success") {
        const postId = PayUOrderData?.productinfo;
        const WeNetAdsData = await adsRepository.createWenetAds(
          userId,
          postId,
          transaction._id.toString()
        );
        console.log("created WeNetAdsData");
        console.log(WeNetAdsData);

        const postData = await adsRepository.addAdDataToPost(postId);
        console.log("Added ad data to post ");
        console.log(postData);

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
