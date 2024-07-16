import { Schema, Document, model, Types } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePicUrl: string;
  email: string;
  JWT?: string;
  notifications: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicUrl: { type: String },
  },
  { timestamps: true }
);

export default model<IUser>("users", UserSchema);
export type { IUser };
