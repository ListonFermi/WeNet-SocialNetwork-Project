import { Types } from "mongoose";
import postsCollection from "../models/postsCollection";
import WeNetAdsCollection from "../models/WeNetAdsCollection";

export = {
  getAdsManagementData: async function (skip: number, limit: number) {
    try {
      return await WeNetAdsCollection.aggregate([
        { $sort: { createdAt: 1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "postId",
            foreignField: "_id",
            as: "postData",
          },
        },
        {
          $lookup: {
            from: "transactions",
            localField: "transactionId",
            foreignField: "_id",
            as: "transactionData",
          },
        },
      ]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getAdsManagementDocumentCount: async function () {
    try {
      return await WeNetAdsCollection.countDocuments();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  toggleStatus: async function(postId: string){
    try {
      const post = await postsCollection.findOne({_id: new Types.ObjectId(postId)})
      if(!post) throw new Error('post not found')

      post.WeNetAds.isPromoted = !post.WeNetAds.isPromoted
      await post.save()
      return post
    } catch (error:any) {
      throw new Error(error.message)
    }
  }
};
