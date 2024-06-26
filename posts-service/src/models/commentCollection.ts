import { Document, Schema, Types, model } from "mongoose";

interface IComment extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  comment: string;
  isDeleted: Boolean;
  likedBy: Types.ObjectId[];
  reports: Types.ObjectId[];
  updatedAt?: Date;
  createdAt?: Date;
}

const CommentSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "users" , required: true},
    postId: { type: Types.ObjectId, ref: "posts" , required: true},
    comment: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
    likedBy: { type: Types.ObjectId, ref: "users" },
    reports: { type: Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

export default model<IComment>("comments", CommentSchema);

export type { IComment };
