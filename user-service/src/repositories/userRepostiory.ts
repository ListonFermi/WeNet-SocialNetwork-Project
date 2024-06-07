import { OTPCollection } from "../models/OTP";
import userCollection, { IUser } from "../models/User";
import { OTPHelper } from "../utils/OTPHelper";
import hash from "../utils/hash";
import halfwayUser from "../utils/isHalfwayUser";

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
      console.log(error);
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
      console.log(error);
      throw new Error(error.message);
    }
  },
  sendOTP: async (email: string): Promise<string> => {
    try {
      let otp= OTPHelper.generateOTP()
      const user = await userCollection.findOne({email})
      await OTPCollection.insertMany([{_id: user?._id, otp: hash.hashString(otp) }])
      await OTPHelper.sendMail(email,otp)
      return "";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
