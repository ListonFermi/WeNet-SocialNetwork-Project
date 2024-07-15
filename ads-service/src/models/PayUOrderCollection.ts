import mongoose, { Document, Schema } from 'mongoose';

interface IPayUOrder extends Document {
  country: string;
  mode: string;
  error_Message: string;
  state: string;
  bankcode: string;
  txnid: string;
  net_amount_debit: string;
  lastname: string;
  zipcode: string;
  phone: string;
  productinfo: string;
  hash: string;
  status: string;
  firstname: string;
  city: string;
  isConsentPayment: string;
  error: string;
  addedon: string;
  encryptedPaymentId: string;
  bank_ref_num: string;
  key: string;
  email: string;
  amount: string;
  unmappedstatus: string;
  address2: string;
  payuMoneyId: string;
  address1: string;
  mihpayid: string;
  giftCardIssued: string;
  field1: string;
  cardnum: string;
  field7: string;
  field6: string;
  field9: string;
  field8: string;
  amount_split: string;
  field3: string;
  field2: string;
  field5: string;
  PG_TYPE: string;
  field4: string;
  name_on_card: string;
}

const PayUOrderSchema: Schema = new Schema(
  {
    country: { type: String },
    mode: { type: String },
    error_Message: { type: String },
    state: { type: String },
    bankcode: { type: String },
    txnid: { type: String },
    net_amount_debit: { type: String },
    lastname: { type: String },
    zipcode: { type: String },
    phone: { type: String },
    productinfo: { type: String },
    hash: { type: String },
    status: { type: String },
    firstname: { type: String },
    city: { type: String },
    isConsentPayment: { type: String },
    error: { type: String },
    addedon: { type: String },
    encryptedPaymentId: { type: String },
    bank_ref_num: { type: String },
    key: { type: String },
    email: { type: String },
    amount: { type: String },
    unmappedstatus: { type: String },
    address2: { type: String },
    payuMoneyId: { type: String },
    address1: { type: String },
    mihpayid: { type: String },
    giftCardIssued: { type: String },
    field1: { type: String },
    cardnum: { type: String },
    field7: { type: String },
    field6: { type: String },
    field9: { type: String },
    field8: { type: String },
    amount_split: { type: String },
    field3: { type: String },
    field2: { type: String },
    field5: { type: String },
    PG_TYPE: { type: String },
    field4: { type: String },
    name_on_card: { type: String },
    userId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IPayUOrder>('payuorders', PayUOrderSchema);
