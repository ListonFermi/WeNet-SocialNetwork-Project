import { IComment } from "../models/commentCollection";
import { SERVICES } from "../rabbitmq/config";
import commentsRepository from "../repositories/commentsRepository";
import postsRepository from "../repositories/postsRepository";

export = {
  addComment: async function (
    currUserId: string,
    postId: string,
    comment: string
  ): Promise<IComment> {
    try {
      const commentData = await commentsRepository.addComment(
        currUserId,
        postId,
        comment
      );

      const postData = await commentsRepository.getPostData(commentData.postId);

      try {
        const userId = postData.userId.toString();
        const doneByUser = currUserId;
        const postId = commentData.postId;

        if (userId !== doneByUser) {
          SERVICES.notification.forEach(async () => {
            await postsRepository.sendNotificationToMQ(
              userId,
              doneByUser,
              "comment",
              `Commented on your post`,
              "posts",
              postId
            );
          });
        }
      } catch (error: any) {
        console.log(error.message);
      }

      return commentData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  editComment: async function (
    commentId: string,
    comment: string
  ): Promise<string> {
    try {
      const commentData = await commentsRepository.editComment(
        commentId,
        comment
      );
      const commentRes = commentData.comment;
      return commentRes;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  deleteComment: async function (commentId: string): Promise<string> {
    try {
      return await commentsRepository.deleteComment(commentId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
