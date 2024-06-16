import mongoose, { Schema, Document } from "mongoose";

const weNetAdsSchema = new Schema({
  isPromoted: { type: Boolean, required: true , default: false},
  expiresOn: { type: Date, required: true, default: Date.now },
});

const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    isDeleted: { type: Boolean, required: true, default: false },
    weNetAds: { type: weNetAdsSchema, required: true },
    reportsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
  },
  { timestamps: true }
);

// Define the Post interface extending Mongoose Document
export interface IPost extends Document {
    _id: string;
  userId: string;
  caption: string;
  imageUrl: string;
  likedBy:string[];
  comments: string[];
  isDeleted: boolean;
  weNetAds: {
    isPromoted: boolean;
    expiresOn: Date;
  };
  reportsId: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const PostModel = mongoose.model<IPost>("Post", postSchema, "Post");
