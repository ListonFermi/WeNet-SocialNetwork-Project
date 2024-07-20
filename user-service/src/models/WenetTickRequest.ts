import mongoose, { Schema, Document } from "mongoose";

export interface IWenetickRequest extends Document {
  userId: mongoose.Types.ObjectId;
  imageUrl: string;
  description: string;
  status: "pending" | "approved" | "rejected";
}

const WenetickRequestSchema: Schema<IWenetickRequest> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WenetickRequest = mongoose.model<IWenetickRequest>(
  "wenettickrequests",
  WenetickRequestSchema
);

export default WenetickRequest;
