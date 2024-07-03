import { Document, Schema, Types, model } from "mongoose";

interface IConversation extends Document {
  _id: Types.ObjectId;
  participants: Types.ObjectId[];
  lastMessage: string;
}

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "users", required: true },
    ],
    lastMessage: { type: String},
  },
  { timestamps: true }
);

export default model<IConversation>("conversations", ConversationSchema);
export type { IConversation };