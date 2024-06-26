import { Schema, Types, model } from "mongoose";

interface IPost extends Document {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  caption?: string;
  imageUrl: string;
  likedBy: Types.ObjectId[];
  comments: Types.ObjectId[];
  isDeleted: boolean;
  WeNetAds: IWeNetAds;
  bookmarkedBy: Types.ObjectId[];
  reports: Types.ObjectId[];
  updatedAt? : Date;
  createdAt? : Date;
}

interface IWeNetAds {
  isPromoted: boolean;
  expiresOn?: Date;
}

const WeNetAdsSchema = new Schema({
  isPromoted: { type: Boolean, required: true, default: false },
  expiresOn: { type: Date },
});

const PostSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "users" },
    caption: { type: String },
    imageUrl: { type: String, required: true },
    likedBy: [{ type: Types.ObjectId, ref: "users" }],
    comments: [{ type: Types.ObjectId, ref: 'comments' }],
    isDeleted: { type: Boolean, required: true, default: true },
    WeNetAds: { type: WeNetAdsSchema },
    bookmarkedBy: [{ type: Types.ObjectId }],
    reports: [{ type: Types.ObjectId }],
  },
  { timestamps: true }
);

export default model<IPost>("posts", PostSchema);

export type {  IPost, IWeNetAds}
