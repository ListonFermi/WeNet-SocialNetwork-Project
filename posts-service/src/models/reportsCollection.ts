import { Document, Schema, Types, model } from "mongoose";

interface IReport extends Document {
  entityType: "posts" | "comments" | "users";
  entityId: Types.ObjectId;
  reportedBy: Types.ObjectId;
  reportType: string;
  reportDescription: string;
  isResolved: boolean;
}

const ReportSchema = new Schema(
  {
    entityType: {
      type: String,
      required: true,
      enum: ["posts", "comments", "users"],
    },
    entityId: { type: Types.ObjectId, required: true, refPath: "entityType" },
    reportedBy: { type: Types.ObjectId, required: true, ref: 'users' },
    reportType:  { type: String, required: true },
    reportDescription: { type: String, required: true },
    isResolved: { type: Boolean, required: true, default: false}
  },
  { timestamps: true , strictPopulate: false}
);

export default model<IReport>("reports", ReportSchema);

export type {  IReport}