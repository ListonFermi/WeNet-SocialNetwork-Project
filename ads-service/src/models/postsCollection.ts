import { Schema, Types, model } from "mongoose";

interface IPost extends Document {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  caption: string;
  imageUrl: string;
  isDeleted: boolean;
}

interface IWeNetAds {
  isPromoted: boolean;
  expiresOn: Date | string;
}

const WeNetAdsSchema = new Schema({
  isPromoted: { type: Boolean, required: true, default: false },
  expiresOn: { type: Date, default: new Date() },
});

const PostSchema = new Schema(
  {
    _id :  { type: Types.ObjectId},
    userId: { type: Types.ObjectId, ref: "users" },
    caption: { type: String },
    imageUrl: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
    WeNetAds: {
      type: WeNetAdsSchema,
      required: true,
      default: { isPromoted: false, expiresOn: new Date() },
    },
  },
  { timestamps: true }
);

export default model<IPost>("posts", PostSchema);

export type {  IPost}
