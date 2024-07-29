import { OTPCollection } from "../models/OTP";
import userCollection, { IUser } from "../models/User";
import wenetTickRequestCollection from "../models/WenetTickRequest";
import { OTPHelper } from "../utils/OTPHelper";
import hash from "../utils/hash";
import halfwayUser from "../utils/isHalfwayUser";
import jwt from "jsonwebtoken";
import { JwtPayload, jwtDecode } from "jwt-decode";
import dotenv from "dotenv";
import { IGoogleCredentialRes } from "../types/types";
import "core-js/stable/atob";
import mongoose, { Types } from "mongoose";
import { generateStrongPassword } from "../utils/generateStrongPassword";
import { MQUserData, MQUserDataToAds, publisher } from "../rabbitMq/publisher";
import { userServiceProducers } from "../rabbitMq/config";

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
      userData.isRestricted = true;
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
      if (!user) throw new Error("Error finding the username");
      user.email = email;
      user.dateOfBirth = dateOfBirth;
      user.gender = gender;

      if (user.gender === "male")
        user.profilePicUrl = "/img/DefaultProfilePicMale.png";
      else user.profilePicUrl = "/img/DefaultProfilePicFemale.png";

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
      if (!otpFromDb) throw new Error("Error getting the OTP from database");

      const timeNow = new Date().getTime();
      const otpUpdatedAt = new Date(otpFromDb.updatedAt).getTime();
      const isWithinLimit = (timeNow - otpUpdatedAt) / 1000 < 60;
      if (!isWithinLimit) throw new Error("Time limit exceeded");

      const isVerified = hash.compareHash(otp, otpFromDb.otp);
      if (isVerified) {
        const user = await userCollection.findOne({ _id });
        if (!user) throw new Error("user not found");
        user.isRestricted = false;
        await user?.save();

        return "Successfully verified OTP";
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  verifyLogin: async (username: string, password: string): Promise<IUser> => {
    try {
      const user = await userCollection.findOne({ username });
      if (!user) throw new Error("Please enter valid credentials");

      if (user.isRestricted) throw new Error("Sorry this user is restricted");

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
      const data = { userData, role: "wenet-user" };
      return jwt.sign(data, secret, {
        expiresIn: "1h",
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  googleSignin: async (
    credentialResponse: IGoogleCredentialRes
  ): Promise<{ user: IUser; exisitngUser: boolean }> => {
    try {
      const { credential } = credentialResponse;
      const decodedCredential: any = jwtDecode<JwtPayload>(credential);

      const {
        email,
        given_name: firstName,
        family_name: lastName,
        picture: profilePicUrl,
      } = decodedCredential;

      //logic for email already exists
      //grab the user data and sign it using JWT & send
      let user = await userCollection.findOne({ email });
      if (user) return { user, exisitngUser: true };

      //logic for email doesn't exist
      // create a new user with email, name and generate random username
      //grab and sign it using JWT & send
      const userData = {
        email,
        firstName,
        lastName,
        profilePicUrl,
        username: `${firstName}${lastName}`, //handle username later
        password: "tempPassword", //handle password later- giving empty string as of now
      };
      user = new userCollection(userData);
      const userDataToReturn = await user.save();
      return { user: userDataToReturn, exisitngUser: false };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  },
  sendUserDataToMQ: async (_id: string, action: string) => {
    try {
      const objectId = new mongoose.Types.ObjectId(_id);
      const user = await userCollection.findOne({ _id: objectId });

      if (!user) {
        throw new Error("User not found");
      }

      //user data to publish:
      const { username, firstName, lastName, profilePicUrl } = user;
      const userData: MQUserData = {
        _id: user._id,
        username,
        firstName,
        lastName,
        profilePicUrl: profilePicUrl ? profilePicUrl : "",
      };
      userServiceProducers.forEach(async (routingKey) => {
        if (routingKey != userServiceProducers[3])
          await publisher.publishUserMessage(userData, action, routingKey);
      });
    } catch (error: any) {
      console.error("Error sending user data to MQ:", error.message);
      throw new Error(error.message);
    }
  },
  sendUserDataToAdsMQ: async (_id: string, action: string) => {
    try {
      const objectId = new mongoose.Types.ObjectId(_id);
      const user = await userCollection.findOne({ _id: objectId });

      if (!user) {
        throw new Error("User not found");
      }

      //user data to publish:
      const { username, firstName, lastName, profilePicUrl, email } = user;
      const userData: MQUserDataToAds = {
        _id: user._id,
        username,
        firstName,
        lastName,
        profilePicUrl: profilePicUrl ? profilePicUrl : "",
        email,
      };
      await publisher.publishUserMessageToAds(userData, action);
    } catch (error: any) {
      console.error("Error sending user data to MQ:", error.message);
      throw new Error(error.message);
    }
  },
  changePassword: async (
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<string> => {
    try {
      const user = await userCollection.findOne({ _id: userId });
      if (!user) throw new Error("User not found");

      const passwordMatches = hash.compareHash(currentPassword, user.password);
      if (!passwordMatches) throw new Error("Please enter valid credentials");

      user.password = hash.hashString(newPassword);
      await user.save();

      return "Password changed successfully";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  forgotPassword: async (email: string): Promise<string> => {
    try {
      const user = await userCollection.findOne({ email: email });
      if (!user) throw new Error("Email not found");

      const newPassword = generateStrongPassword();

      await OTPHelper.sendMail(email, newPassword);

      user.password = hash.hashString(newPassword);
      await user.save();

      return "New password is send to your email";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  changeAccountType: async (
    userId: string,
    accountType: "personalAccount" | "celebrity" | "company"
  ): Promise<IUser> => {
    try {
      const user = await userCollection.findOne({ _id: userId });

      if (!user) {
        throw new Error("User not found");
      }

      if (accountType === "personalAccount") {
        user.accountType = {
          isProfessional: false,
          hasWeNetTick: false,
        };
      } else {
        user.accountType = {
          isProfessional: true,
          category: accountType,
          hasWeNetTick: false,
        };
      }
      await user.save();

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  requestWenetTick: async (
    userId: string,
    imageUrl: string,
    description: string
  ) => {
    try {
      return await wenetTickRequestCollection.create({
        userId: new Types.ObjectId(userId),
        imageUrl,
        description,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getTickRequestData: async (userId: string) => {
    try {
      return await wenetTickRequestCollection.findOne({
        userId: new Types.ObjectId(userId),
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getUserData: async (username: string) => {
    try {
      return await userCollection.findOne({ username });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
