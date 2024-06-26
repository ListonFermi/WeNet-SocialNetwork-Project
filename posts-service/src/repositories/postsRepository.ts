import { Types } from "mongoose";
import postsCollection, { IPost } from "../models/postsCollection";
import { IMulterFile } from "../types/types";
import { uploadToS3Bucket } from "../utils/s3bucket";
import userCollection from "../models/userCollection";

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
      const postData = await postsCollection
        .findOne({ _id })
        .populate({
          path: "comments",
          populate: {
            path: "userId",
            select: "username profilePicUrl", // Adjust as necessary
          },
        })
        .exec();
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
  editPost: async function (postId: string, caption: string): Promise<string> {
    try {
      const _id = new Types.ObjectId(postId);
      const post: any = await postsCollection.findOne({ _id });
      if (!post) throw new Error("Post not found");
      if (post.isDeleted) throw new Error("This post has been deleted");

      const updatedPost = { ...post._doc, caption, isDeleted: false };
      await postsCollection.findOneAndUpdate({ _id }, { $set: updatedPost });

      return "Post edited successfully";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  deletePost: async function (postId: string): Promise<string> {
    try {
      const _id = new Types.ObjectId(postId);
      const post: any = await postsCollection.findOne({ _id });
      if (!post) throw new Error("Post not found");
      if (post.isDeleted) throw new Error("This post has already been deleted");

      const updatedPost = { ...post._doc, isDeleted: true };
      await postsCollection.findOneAndUpdate({ _id }, { $set: updatedPost });

      return "Post deleted successfully from be";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  toggleLike: async function (
    entity: string,
    entityId: string | Types.ObjectId,
    userId: string | Types.ObjectId
  ): Promise<number> {
    try {
      userId = new Types.ObjectId(userId);
      const user = await userCollection.findOne({ _id: userId });
      if (!user) throw new Error("User not found");

      entityId = new Types.ObjectId(entityId);

      if (entity === "post") {
        const postIndex = user.postsLiked.findIndex((postId: Types.ObjectId) =>
          postId.equals(entityId)
        );

        if (postIndex !== -1) {
          //unlike Post
          user.postsLiked.splice(postIndex, 1);
          await postsCollection.updateOne(
            { _id: entityId },
            { $pull: { likedBy: userId } }
          );
        } else {
          //like Post
          user.postsLiked.push(entityId);
          await postsCollection.updateOne(
            { _id: entityId },
            { $addToSet: { likedBy: userId } }
          );
        }

        await user.save();
        return user.postsLiked.length;
      } else if (entity === "comment") {
        const commentIndex = user.commentsLiked.findIndex(
          (commentId: Types.ObjectId) => commentId.equals(entityId)
        );

        if (commentIndex !== -1) {
          //unlike comment
          user.commentsLiked.splice(commentIndex, 1);
          // await postsCollection.updateOne(        change it to comment collection
          //   { _id: entityId },
          //   { $pull: { likedBy: userId } }
          // );
        } else {
          //like comment
          user.commentsLiked.push(entityId);
          // await postsCollection.updateOne(           change it to comment collection
          //   { _id: entityId },
          //   { $addToSet: { likedBy: userId } }
          // );
        }
        await user.save();
        return user.commentsLiked.length;
      } else {
        throw new Error("Invalid entity type");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
