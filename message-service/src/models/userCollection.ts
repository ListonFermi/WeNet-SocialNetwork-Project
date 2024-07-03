import { Schema, Document, model, Types } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePicUrl: string;
  JWT?: string;
  singleConversations: Types.ObjectId[]
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, trim: true, required: true, unique: true },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    profilePicUrl: { type: String, trim: true },
    singleConversations: [{ type: Schema.Types.ObjectId, ref: "conversations"  }]
  },
  { timestamps: true }
);

export default model<IUser>("users", UserSchema);
export type { IUser };