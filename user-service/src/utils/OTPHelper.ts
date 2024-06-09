import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

export const OTPHelper = {
  transporter: nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  }),
  sendMail: async function (email: string, otp: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.GMAIL_ID,
        to: email,
        subject: "Registration OTP for WeNet",
        text: `Your OTP is ${otp}`,
      });
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  },
  generateOTP: function () {
    return Math.floor(1000 + Math.random() * 9000)+'';
  }
};
