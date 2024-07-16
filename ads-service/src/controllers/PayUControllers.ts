import { Request, Response } from "express";
import { PAYU_MERCHANT_KEY, PAYU_SALT } from "../utils/constants";
import axios from "axios";
import PayUOrderCollection from "../models/PayUOrderCollection";
var jsSHA = require("jssha");

export = {
  payment: async function (req: Request, res: Response) {
    try {
      const { txnid, amount, productinfo, firstname, email } = req.body;

      if (!txnid || !amount || !productinfo || !firstname || !email) {
        res.status(400).send("Mandatory fields missing");
        return;
      }

      console.log({ PAYU_MERCHANT_KEY, PAYU_SALT, txnid });

      const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_SALT}`;

      const sha = new jsSHA("SHA-512", "TEXT");
      sha.update(hashString);
      const hash = sha.getHash("HEX");

      res.send({ hash: hash });
    } catch (error) {
      console.log("error payment:", error);
      res.status(500).send("Internal server error");
    }
  },
  response: async function (req: Request, res: Response) {
    var pd = req.body;
    const formData = new URLSearchParams();
    formData.append("key", pd.key);
    formData.append("txnid", pd.txnid);
    formData.append("amount", parseFloat(pd.amount).toFixed(2)); // Ensure proper formatting
    formData.append("productinfo", pd.productinfo);
    formData.append("firstname", pd.firstname);
    formData.append("email", pd.email);
    formData.append("phone", pd.phone);
    formData.append("surl", pd.surl);
    formData.append("furl", pd.furl);
    formData.append("hash", pd.hash);
    formData.append("service_provider", pd.service_provider);

    console.log("Data being sent to PayU:", formData.toString());

    //url for test environment is : https://test.payu.in/_payment, change it below
    try {
      const result = await axios.post(
        "https://test.payu.in/_payment",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(result.request.res.responseUrl);
      res.send(result.request.res.responseUrl);
    } catch (err) {
      console.log("error", err);
    }
  },
  saveData: async function (req: Request, res: Response) {
    const {
      country,
      mode,
      error_Message,
      state,
      bankcode,
      txnid,
      net_amount_debit,
      lastname,
      zipcode,
      phone,
      productinfo,
      hash,
      status,
      firstname,
      city,
      isConsentPayment,
      error,
      addedon,
      encryptedPaymentId,
      bank_ref_num,
      key,
      email,
      amount,
      unmappedstatus,
      address2,
      payuMoneyId,
      address1,
      mihpayid,
      giftCardIssued,
      field1,
      cardnum,
      field7,
      field6,
      field9,
      field8,
      amount_split,
      field3,
      field2,
      field5,
      PG_TYPE,
      field4,
      name_on_card,
      userId,
    } = req.body;

    try {
      const newOrder = new PayUOrderCollection({
        country: country,
        mode: mode,
        error_Message: error_Message,
        state: state,
        bankcode: bankcode,
        txnid: txnid,
        net_amount_debit: net_amount_debit,
        lastname: lastname,
        zipcode: zipcode,
        phone: phone,
        productinfo: productinfo,
        hash: hash,
        status: status,
        firstname: firstname,
        city: city,
        isConsentPayment: isConsentPayment,
        error: error,
        addedon: addedon,
        encryptedPaymentId: encryptedPaymentId,
        bank_ref_num: bank_ref_num,
        key: key,
        email: email,
        amount: amount,
        unmappedstatus: unmappedstatus,
        address2: address2,
        payuMoneyId: payuMoneyId,
        address1: address1,
        mihpayid: mihpayid,
        giftCardIssued: giftCardIssued,
        field1: field1,
        cardnum: cardnum,
        field7: field7,
        field6: field6,
        field9: field9,
        field8: field8,
        amount_split: amount_split,
        field3: field3,
        field2: field2,
        field5: field5,
        PG_TYPE: PG_TYPE,
        field4: field4,
        name_on_card: name_on_card,
        userId: userId,
      });

      const PayUOrder = await newOrder.save();

      res.send(PayUOrder._id);
    } catch (err) {
      res.status(500).send("MongoDB could not save the data");
    }
  },
};
