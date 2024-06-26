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
        {_id: userId},
        { $addToSet: { comments: commentData._id } }
      )

      await postsCollection.updateOne(
        { _id: postId },
        { $addToSet: { comments: commentData._id } }
      );

      return commentData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
