import { Document, Schema, model } from "mongoose";

interface IOTP extends Document {
  _id: Schema.Types.ObjectId;
  otp: string;
}

const OTPSchema = new Schema<IOTP>(
  {
    otp: { required: true, type: String },
  },
  { timestamps: true }
);

export const OTPCollection= model<IOTP>("otps", OTPSchema);
export type { IOTP };
