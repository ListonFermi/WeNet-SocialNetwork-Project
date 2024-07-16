import { Schema, Types, model } from "mongoose";

interface ITransaction extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  PayUOrdersId: Types.ObjectId;
  PayUTransactionId: string;
  transactionStatus: "success" | "failed";
}

const TransactionSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true, ref: "users" },
    PayUOrderId: { type: Types.ObjectId, required: true, ref: "payuorders" },
    PayUTransactionId: { type: String, required: true},
    transactionStatus: {
      type: String,
      required: true,
      enum: ["success", "failed"],
    },
    transactionAmount: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<ITransaction>("transactions", TransactionSchema);

export type { ITransaction };
