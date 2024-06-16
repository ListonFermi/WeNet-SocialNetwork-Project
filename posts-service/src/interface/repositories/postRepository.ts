import { Post } from "../../domain/entities/Post";
import { IPostRepository } from "../../domain/repositories/IPostRepository";
import { PostModel, IPost } from "../models/PostModel"; // Assuming PostModel is a Mongoose model

// Helper function to transform Mongoose document to Post
const toPost = (postDoc: IPost): Post => {
  return {
    id: postDoc._id.toString(),
    userId: postDoc.userId,
    caption: postDoc.caption,
    imageUrl: postDoc.imageUrl,
    likedBy: postDoc.likedBy,
    comments: postDoc.comments,
    isDeleted: postDoc.isDeleted,
    weNetAds: postDoc.weNetAds,
    reportsId: postDoc.reportsId,
    createdAt: postDoc.createdAt,
    updatedAt: postDoc.updatedAt
  };
};

export const postRepository: IPostRepository = {
  createPost: async (post: Post): Promise<Post> => {
    const newPost = new PostModel(post);
    const savedPost = await newPost.save();
    return toPost(savedPost);
  },

  getPostById: async (id: string): Promise<Post | null> => {
    const postDoc = await PostModel.findById(id).exec();
    return postDoc ? toPost(postDoc) : null;
  },

  getPostsByUserId: async (userId: string): Promise<Post[]> => {
    const postDocs = await PostModel.find({ userId }).exec();
    return postDocs.map(toPost);
  }
};
