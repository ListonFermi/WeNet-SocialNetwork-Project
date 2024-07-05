import { Schema, Document, model, Types } from "mongoose";

interface INotification extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  doneByUser: Types.ObjectId;
  type: "follow" | "like" | "comment";
  notificationMessage: string;
  entityType: "posts" | "users";
  entityId: Types.ObjectId;
  isRead: boolean;
}

const NotificationSchema: Schema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
    },
    doneByUser: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
    },
    type: {
      type: String,
      required: true,
      enum: ["follow", "like", "comment"],
    },
    notificationMessage: {
      type: String,
      required: true,
    },
    entityType: {
      type: String,
      required: true,
      enum: ["posts", "users"],
    },
    entityId: {
      type: Types.ObjectId,
      required: true,
      refPath: "entityType",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<INotification>("notifications", NotificationSchema);

export type { INotification };
