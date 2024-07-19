import { IPost, IWeNetAds } from "../models/postsCollection";
import { MQActions, SERVICES } from "../rabbitmq/config";
import postsRepository from "../repositories/postsRepository";

export = {
  uploadImage: async function (imageFile: unknown): Promise<string> {
    try {
      return await postsRepository.uploadImage(imageFile);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  createPost: async function (
    userId: string,
    imageUrl: string
  ): Promise<IPost> {
    try {
      const postData = await postsRepository.createPost(userId, imageUrl);
      if (!postData) throw new Error("Post data not found");

      return postData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  addCaption: async function (
    postId: string,
    caption: string,
    userId: string
  ): Promise<IPost> {
    try {
      const postData = await postsRepository.addCaption(postId, caption);
      if (!postData) throw new Error("Post data not found");

      //To notification service
      try {
        const { _id, caption, imageUrl, isDeleted } = postData as IPost;
        SERVICES.notification.forEach(async () => {
          await postsRepository.sendPostDataToMQ(
            _id,
            userId,
            caption,
            imageUrl,
            isDeleted,
            MQActions.addPost
          );
        });
      } catch (error: any) {
        console.log(error.message);
      }

      //To ads service
      try {
        const { _id, caption, imageUrl, isDeleted, WeNetAds } =
          postData as IPost;
        await postsRepository.sendPostDataToAdsMQ(
          _id,
          userId,
          caption,
          imageUrl,
          isDeleted,
          WeNetAds,
          MQActions.addPost
        );
      } catch (error: any) {
        console.log(error.message);
      }

      return postData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getSinglePost: async function (postId: string): Promise<IPost> {
    try {
      return await postsRepository.getSinglePost(postId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  editPost: async function (postId: string, caption: string): Promise<string> {
    try {
      return await postsRepository.editPost(postId, caption);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  deletePost: async function (postId: string): Promise<string> {
    try {
      return await postsRepository.deletePost(postId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  toggleLike: async function (
    entity: string,
    entityId: string,
    currUserId: string
  ): Promise<number> {
    try {
      const post = await postsRepository.toggleLike(
        entity,
        entityId,
        currUserId
      );

      try {
        const userId = post.userId.toString();
        const doneByUser = currUserId;
        const postId = post._id.toString();

        const postIsLiked = await postsRepository.postIsLiked(doneByUser,postId)

        if (userId !== doneByUser && postIsLiked == true ) {
          SERVICES.notification.forEach(async () => {
            await postsRepository.sendNotificationToMQ(
              userId,
              doneByUser,
              "like",
              `Liked your ${entity}`,
              "posts",
              postId
            );
          });
        }
      } catch (error: any) {
        console.log(error.message);
      }

      return post?.likedBy?.length;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  toggleBookmark: async function (
    postId: string,
    userId: string
  ): Promise<string> {
    try {
      return await postsRepository.toggleBookmark(postId, userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  postIsLiked: async function (
    userId: string,
    postId: string
  ): Promise<boolean> {
    try {
      return await postsRepository.postIsLiked(userId, postId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getTopPosts: async function (): Promise<string[]> {
    try {
      return await postsRepository.getTopPosts();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getBookmarkedPosts: async function (userId: string): Promise<string[]> {
    try {
      return await postsRepository.getBookmarkedPosts(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getProfilePosts: async function (userId: string): Promise<string[]> {
    try {
      return await postsRepository.getProfilePosts(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  createWeNetAd: async function (
    postId: string,
    WeNetAds: IWeNetAds
  ): Promise<string> {
    try {
      const postData = await postsRepository.createWeNetAd(postId, WeNetAds);
      if (!postData) throw new Error("Post data not found");

      return "Ad data added to post data";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
