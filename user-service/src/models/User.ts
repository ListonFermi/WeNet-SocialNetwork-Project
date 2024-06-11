import { Schema, Document, model } from "mongoose";

interface IProfessionalAccount {
  isProfessional: boolean;
  category: string;
  hasWeNetTick: boolean;
}

interface IUser extends Document {
  _id? : string | Schema.Types.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string ;
  dateOfBirth?: Date;
  gender?: "male" | "female";
  isRestricted?: boolean;
  bio?: string;
  profilePicUrl?: string;
  coverPicUrl?: string;
  followers?: Schema.Types.ObjectId[];
  following?: Schema.Types.ObjectId[];
  postsCount?: number;
  likesReceivedCount?: number;
  isPrivate?: boolean;
  professionalAccount?: IProfessionalAccount;
  blockedByUsers?: Schema.Types.ObjectId[];
  blockedUsers?: Schema.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  location?: string;
  JWT?: string;
}

const ProfessionalAccountSchema = new Schema<IProfessionalAccount>({
  isProfessional: { type: Boolean, required: true, default: false },
  category: { type: String, required: true },
  hasWeNetTick: { type: Boolean, required: true, default: false },
});

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, trim: true, required: true, unique: true },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    password: { type: String, required: true },
    email: { type: String, trim: true, unique: true, sparse: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female"] },
    isRestricted: { type: Boolean, required: true, default: false },
    bio: { type: String },
    profilePicUrl: { type: String, trim: true },
    coverPicUrl: { type: String, trim: true },
    followers: [{ type: Schema.Types.ObjectId, ref: "users" }],
    following: [{ type: Schema.Types.ObjectId, ref: "users" }],
    postsCount: { type: Number, required: true, default: 0 },
    likesReceivedCount: { type: Number, required: true, default: 0 },
    isPrivate: { type: Boolean, required: true, default: false },
    professionalAccount: { type: ProfessionalAccountSchema },
    blockedByUsers: [{ type: Schema.Types.ObjectId, ref: "users" }],
    blockedUsers: [{ type: Schema.Types.ObjectId, ref: "users" }],
    location: {type: String}
  },
  { timestamps: true }
);

export default model<IUser>("users", UserSchema);
export type { IUser, IProfessionalAccount };
