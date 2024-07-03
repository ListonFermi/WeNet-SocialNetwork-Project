import { Schema, Types, Document, model } from "mongoose";

interface IMessage extends Document {
  _id: Types.ObjectId;
  convoId: Types.ObjectId;
  sender: Types.ObjectId;
  message: string;
  isAttachment: boolean;
  attachmentUrl: string;
}

const MessageSchema = new Schema<IMessage>(
  {
    convoId: {
      type: Schema.Types.ObjectId,
      ref: "conversations",
      required: true,
    },
    sender: { type: Schema.Types.ObjectId, ref: "users", required: true },
    message: { type: String, required: true, default: ''},
    isAttachment: { type: Boolean, required: true, default: false },
    attachmentUrl: { type: String },
  },
  { timestamps: true }
);

export default model<IMessage>("messages", MessageSchema);

export type { IMessage };
