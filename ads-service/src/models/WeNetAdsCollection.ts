import { Schema, Types, model } from "mongoose";

interface IWeNetAds extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  transactionId: Types.ObjectId;
  expiresOn: string;
}

const WeNetAdsSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "users" },
    postId: { type: Types.ObjectId, ref: "posts" },
    transactionId: { type: Types.ObjectId, ref: "transactions" },
    expiresOn: { type: Date },
  },
  { timestamps: true }
);

export default model<IWeNetAds>("wenetads", WeNetAdsSchema);

export type { IWeNetAds };
