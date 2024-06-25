import { Types } from "mongoose";
import postsCollection, { IPost } from "../models/postsCollection";
import { IMulterFile } from "../types/types";
import { uploadToS3Bucket } from "../utils/s3bucket";

export = {
  uploadImage: async function (imageFile: unknown): Promise<string> {
    try {
      return await uploadToS3Bucket(imageFile as IMulterFile);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  createPost: async function (
    userId: string,
    imageUrl: string
  ): Promise<IPost> {
    try {
      const postData = { userId, imageUrl };
      return await postsCollection.create(postData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  addCaption: async function (postId: string, caption: string): Promise<IPost> {
    try {
      const _id = new Types.ObjectId(postId);
      const post: any = await postsCollection.findOne({ _id });
      if (!post) {
        throw new Error("Post Id not found");
      }

      const updatedPost = { ...post._doc, caption, isDeleted: false };
      const result = await postsCollection.findOneAndUpdate(
        { _id },
        { $set: updatedPost },
        { new: true } // new: true returns the updated document
      );

      if (!result) {
        throw new Error("Post not found");
      }

      return result as IPost;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getSinglePost: async function (postId: string): Promise<IPost> {
    try {
      const _id = new Types.ObjectId(postId);
      const postData = await postsCollection.findOne({ _id });
      if (!postData) throw new Error("Post not found");
      if (postData.isDeleted) throw new Error("This post has been deleted");
      return postData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  // addComment : async function (comment: string, postId: string): Promise<IComment> {
  //   try {
      
  //   } catch (error) {
      
  //   }
  // }
};
