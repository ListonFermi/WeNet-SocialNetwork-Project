import { Schema, Types, model } from "mongoose";

interface IPost extends Document {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  caption: string;
  imageUrl: string;
  isDeleted: boolean;
}

const PostSchema = new Schema(
  {
    _id :  { type: Types.ObjectId},
    userId: { type: Types.ObjectId, ref: "users" },
    caption: { type: String },
    imageUrl: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default model<IPost>("posts", PostSchema);

export type {  IPost}
