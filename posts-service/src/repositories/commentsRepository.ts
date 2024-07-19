import { Types } from "mongoose";
import commentCollection, { IComment } from "../models/commentCollection";
import postsCollection from "../models/postsCollection";
import userCollection from "../models/userCollection";

export = {
  addComment: async function (
    userId: string | Types.ObjectId,
    postId: string | Types.ObjectId,
    comment: string
  ): Promise<IComment> {
    try {
      userId = new Types.ObjectId(userId);
      postId = new Types.ObjectId(postId);

      const commentData = await commentCollection.create({
        userId,
        postId,
        comment,
      });

      await userCollection.updateOne(
        { _id: userId },
        { $addToSet: { comments: commentData._id } }
      );

      await postsCollection.updateOne(
        { _id: postId },
        { $addToSet: { comments: commentData._id } }
      );

      return commentData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  editComment: async function (
    commentId: string,
    comment: string
  ): Promise<IComment> {
    try {
      const commentData = await commentCollection.findOne({
        _id: new Types.ObjectId(commentId),
      });
      if (!commentData) throw new Error("Comment not found");
      commentData.comment = comment;
      await commentData.save();

      return commentData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  deleteComment: async function (commentId: string): Promise<string> {
    try {
      await commentCollection.updateOne(
        { _id: new Types.ObjectId(commentId) },
        { $set: { isDeleted: true } }
      );

      await postsCollection.updateMany(
        { comments: new Types.ObjectId(commentId) },
        { $pull: { comments: new Types.ObjectId(commentId) } }
      );

      return "Comment deleted successfully";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getPostData: async function (postId: string | Types.ObjectId) {
    try {
      const post = await postsCollection.findOne({
        _id: new Types.ObjectId(postId),
      });
      if (!post) throw new Error("Post not found");
      return post;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
