import { Types } from "mongoose";
import postsCollection, { IPost } from "../models/postsCollection";
import { IMulterFile } from "../types/types";
import { uploadToS3Bucket } from "../utils/s3bucket";
import userCollection from "../models/userCollection";
import { MQINotification, MQIPost, publisher } from "../rabbitmq/publisher";
import { MQActions } from "../rabbitmq/config";
import commentCollection from "../models/commentCollection";

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

      await userCollection.updateOne(
        { _id: result.userId },
        { $addToSet: { posts: result._id } }
      );

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
  ): Promise<IPost> {
    try {
      userId = new Types.ObjectId(userId);
      const user = await userCollection.findOne({ _id: userId });
      if (!user) throw new Error("User not found");

      entityId = new Types.ObjectId(entityId);

      if (entity === "post") {
        const postIndex = user.postsLiked.findIndex((postId: Types.ObjectId) =>
          postId.equals(entityId)
        );

        const post = await postsCollection.findOne({ _id: entityId });
        if (!post) throw new Error("Post not found");

        if (postIndex !== -1) {
          // Unlike Post
          user.postsLiked.splice(postIndex, 1);
          const likedByIndex = post.likedBy.findIndex(
            (userIdItem: Types.ObjectId) => userIdItem.equals(userId)
          );
          if (likedByIndex !== -1) {
            post.likedBy.splice(likedByIndex, 1);
          }
        } else {
          // Like Post
          user.postsLiked.push(entityId);
          post.likedBy.push(userId);
        }

        await user.save();
        await post.save();

        return post // Returning the updated likes count
      } 
      // else if (entity === "comment") {
      //   const commentIndex = user.commentsLiked.findIndex(
      //     (commentId: Types.ObjectId) => commentId.equals(entityId)
      //   );

      //   const comment = await commentCollection.findOne({ _id: entityId });
      //   const post = await postsCollection.findOne({ _id: entityId });

      //   if (commentIndex !== -1) {
      //     //unlike comment
      //     user.commentsLiked.splice(commentIndex, 1);
      //     // await postsCollection.updateOne(        change it to comment collection
      //     //   { _id: entityId },
      //     //   { $pull: { likedBy: userId } }
      //     // );
      //   } else {
      //     //like comment
      //     user.commentsLiked.push(entityId);
      //     // await postsCollection.updateOne(           change it to comment collection
      //     //   { _id: entityId },
      //     //   { $addToSet: { likedBy: userId } }
      //     // );
      //   }
      //   await user.save();
      //   return comment
      //   // return {df:'d'} as IPost
      // }
      
      else {
        throw new Error("Invalid entity type");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  toggleBookmark: async function (
    postId: string | Types.ObjectId,
    userId: string | Types.ObjectId
  ): Promise<string> {
    try {
      userId = new Types.ObjectId(userId);
      const user = await userCollection.findOne({ _id: userId });
      if (!user) throw new Error("User not found");

      postId = new Types.ObjectId(postId);
      const postIndex = user.postsBookmarked.findIndex((id: Types.ObjectId) =>
        id.equals(postId)
      );

      let message;
      if (postIndex !== -1) {
        //remove bookmark
        user.postsBookmarked.splice(postIndex, 1);
        await postsCollection.updateOne(
          { _id: postId },
          { $pull: { bookmarkedBy: userId } }
        );
        message = "Post removed from bookmark successfully";
      } else {
        //add bookmark
        user.postsBookmarked.push(postId);
        await postsCollection.updateOne(
          { _id: postId },
          { $addToSet: { bookmarkedBy: userId } }
        );
        message = "Post added to bookmark successfully";
      }
      await user.save();

      return message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  postIsLiked: async function (
    userId: string,
    postId: string
  ): Promise<boolean> {
    try {
      const user = await userCollection
        .findById(userId)
        .select("postsLiked")
        .exec();
      if (!user) {
        throw new Error("User not found");
      }

      const isLiked = user.postsLiked.includes(
        postId as unknown as Types.ObjectId
      );
      return isLiked;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getTopPosts: async function (): Promise<string[]> {
    try {
      const posts = await postsCollection.aggregate([
        {
          $match: { isDeleted: false },
        },
        {
          $addFields: {
            likesCount: { $size: "$likedBy" },
          },
        },
        {
          $sort: { likesCount: -1 },
        },
        {
          $limit: 35,
        },
        {
          $project: {
            _id: 1,
          },
        },
      ]);

      return posts.map((post) => post._id.toString());
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getBookmarkedPosts: async function (userId: string): Promise<string[]> {
    try {
      const user = await userCollection
        .findById(userId)
        .select("postsBookmarked")
        .exec();

      if (!user) {
        throw new Error("User not found");
      }

      // Return the array of bookmarked post IDs
      return user.postsBookmarked.map((postId) => postId.toString());
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  sendPostDataToMQ: async (
    postId: string | Types.ObjectId,
    userId: string,
    caption: string,
    imageUrl: string,
    isDeleted: boolean,
    action: string
  ) => {
    try {
      const postData: MQIPost = {
        _id: postId,
        userId,
        caption,
        imageUrl,
        isDeleted,
      };

      await publisher.publishPostMessage(postData, action);
    } catch (error: any) {
      console.error("Error sending user data to MQ:", error.message);
      throw new Error(error.message);
    }
  },
  sendNotificationToMQ: async (
    userId: string | Types.ObjectId,
    doneByUser: string | Types.ObjectId,
    type: "follow" | "like" | "comment",
    notificationMessage: string,
    entityType: "posts" | "users",
    entityId: string | Types.ObjectId,
  ) => {
    try {
      //notification data to publish:
      const notificationData: MQINotification = {
        userId,
        doneByUser,
        type,
        notificationMessage,
        entityType,
        entityId,
      };
      await publisher.publishNotificationMessage(
        notificationData,
        MQActions.addNotification
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
