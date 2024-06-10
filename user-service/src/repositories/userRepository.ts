import { ObjectId } from "mongoose";
import { OTPCollection } from "../models/OTP";
import userCollection, { IUser } from "../models/User";
import { OTPHelper } from "../utils/OTPHelper";
import hash from "../utils/hash";
import halfwayUser from "../utils/isHalfwayUser";
import jwt from "jsonwebtoken";
import { JwtPayload, jwtDecode } from "jwt-decode";
import dotenv from "dotenv";
import { IGoogleCredentialRes } from "../types/types";
import "core-js/stable/atob";

dotenv.config();

export = {
  addUser: async (userData: IUser): Promise<IUser> => {
    try {
      userData.password = hash.hashString(userData.password);
      const isHalfwayUser = await halfwayUser.isHalfwayUser(userData);
      if (isHalfwayUser) {
        const { firstName, lastName, password } = userData;
        isHalfwayUser.firstName = firstName;
        isHalfwayUser.lastName = lastName;
        isHalfwayUser.password = hash.hashString(password);
        return await isHalfwayUser.save();
      }
      const user = new userCollection(userData);
      return await user.save();
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  addUserData: async (userData: IUser): Promise<IUser> => {
    try {
      const { _id, email, dateOfBirth, gender } = userData;
      const user = await userCollection.findOne({ _id });
      if (!user) throw new Error("Internal server error");
      user.email = email;
      user.dateOfBirth = dateOfBirth;
      user.gender = gender;
      return await user.save();
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  sendOTP: async (email: string): Promise<string> => {
    try {
      let otp = OTPHelper.generateOTP();
      const user = await userCollection.findOne({ email });
      await OTPCollection.insertMany([
        { _id: user?._id, otp: hash.hashString(otp) },
      ]);
      await OTPHelper.sendMail(email, otp);
      return "Email sent successfully";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  verifyOTP: async (_id: string, otp: string): Promise<string> => {
    try {
      const otpFromDb: any = await OTPCollection.findOne({ _id });
      if (!otpFromDb) throw new Error("Error verifying OTP from database");

      const timeNow = new Date().getTime();
      const otpUpdatedAt = new Date(otpFromDb.updatedAt).getTime();
      const isWithinLimit = (timeNow - otpUpdatedAt) / 1000 < 60;
      if (!isWithinLimit) throw new Error("Time limit exceeded");

      const isVerified = hash.compareHash(otp, otpFromDb.otp);
      if (isVerified) return "Successfully verified OTP";
      else throw new Error("OTP verification failed");
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  verifyLogin: async (username: string, password: string): Promise<IUser> => {
    try {
      const user = await userCollection.findOne({ username });
      if (!user) throw new Error("Please enter valid credentials");

      const passwordMatches = hash.compareHash(password, user.password);
      if (!passwordMatches) throw new Error("Please enter valid credentials");

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  generateJWT: async (userData: IUser): Promise<string> => {
    try {
      const secret: string | undefined = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT Secret not found");
      return jwt.sign({ userData }, secret, { expiresIn: "1h" });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  googleSignin: async (credentialResponse: IGoogleCredentialRes): Promise<void> => {
    // {credential: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY3NGRiYmE4ZmFlZTY5YW…pfZQrkF54rS2XKD0Df_ThB_512QFQWyr4mtJoRyQtFhEltsGw',
    // clientId: '404291875462-ko7on4mhdb6bslaabtn3tgb3oko5nvac.apps.googleusercontent.com',
    // select_by: 'btn'}
    try {
      const { credential } = credentialResponse;
      console.log({credential})
      const decodedCredential : any = jwtDecode<JwtPayload>(credential);
      console.log({decodedCredential})

      const { email, given_name, family_name ,picture  } = decodedCredential
      

      //logic for email already exists
        // grab the who user data and sign it using JWT & send

      //logic for email doesn't exist
        // create a new user with email, name and generate random username
        //grab and sign it using JWT & send

        // Change all the return types in userrepository, service & controller to IUser

    } catch (error: any) {
      console.log(error)
      throw new Error(error.message);
    }
  },
};
