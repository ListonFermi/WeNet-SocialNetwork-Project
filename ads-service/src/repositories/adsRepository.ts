import { Types } from "mongoose";
import transactionCollection, {
  ITransaction,
} from "../models/transactionCollection";
import WeNetAdsCollection from "../models/WeNetAdsCollection";
import postsCollection, { IPost } from "../models/postsCollection";
import { POST_PROMOTION_PERIOD } from "../utils/constants";
import { publisher } from "../rabbitMQ/publisher";
import { MQActions } from "../rabbitMQ/config";

export = {
  addTransaction: async function (
    userId: string,
    PayUOrderId: string,
    PayUTransactionId: string,
    status: "success" | "failed",
    transactionAmount: string
  ): Promise<ITransaction> {
    try {
      const transaction = await transactionCollection.create({
        userId: new Types.ObjectId(userId),
        PayUOrderId: new Types.ObjectId(PayUOrderId),
        PayUTransactionId,
        transactionStatus: status,
        transactionAmount,
      });
      return transaction;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  createWenetAds: async function (
    userId: string,
    postId: string,
    transactionId: string
  ) {
    try {
      return await WeNetAdsCollection.create({
        userId: new Types.ObjectId(userId),
        postId: new Types.ObjectId(postId),
        transactionId: new Types.ObjectId(transactionId),
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  addAdDataToPost: async function (postId: string): Promise<IPost> {
    try {
      const postData = await postsCollection.findById(postId);
      if (!postData) {
        throw new Error("Post not found");
      }

      const currentDate = new Date();
      const promotionPeriod = POST_PROMOTION_PERIOD;

      if (postData.WeNetAds.isPromoted) {
        // Extend the expiresOn date
        const expiresOnDate = new Date(postData.WeNetAds.expiresOn);
        postData.WeNetAds.expiresOn = new Date(
          expiresOnDate.getTime() + promotionPeriod * 24 * 60 * 60 * 1000
        );
      } else {
        // Set the promotion start date to today and the end date
        postData.WeNetAds.isPromoted = true;
        postData.WeNetAds.expiresOn = new Date(
          currentDate.getTime() + promotionPeriod * 24 * 60 * 60 * 1000
        );
      }

      await postData.save();
      return postData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  sendPostAdDataToMQ: async function (postId: string, WeNetAds: any) {
    try {
      const adsServiceMessageData = { postId, WeNetAds };
      await publisher.publishAdsServiceMessage(
        adsServiceMessageData,
        MQActions.addWeNetAd
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getPosts: async function () {
    try {
      const currentDate = new Date();
      const postData = await postsCollection.find({
        isDeleted: false,
        "WeNetAds.isPromoted": true,
        "WeNetAds.expiresOn": { $gt: currentDate },
      }).populate('userId');

      if (!postData || postData.length === 0) {
        return [];
      }

      return postData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
