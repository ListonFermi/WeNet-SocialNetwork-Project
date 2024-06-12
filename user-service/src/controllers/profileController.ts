import { NextFunction, Response } from "express";
import profileService from "../services/profileService";
import AWS from "aws-sdk";

export = {
  getUserController: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { _id } = req?.user;
      if (!_id) throw new Error("No user id found");
      const userData = await profileService.getUserData(_id);
      res.status(200).json({ userData });
    } catch (error) {
      next(error);
    }
  },
  editUserController: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = req?.user;
      if (!user) throw new Error("No user found");

      const userData = await profileService.editUserData(req.body);

      const token = await profileService.generateJWT(userData);
      res.cookie("token", token);
      res.status(200).send("User data edited successfully");
    } catch (error) {
      next(error);
    }
  },
  updateProfilePic: async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const file = req.file;

      console.log('req.user')
      console.log(req.user)

      if (!file) {
        throw new Error("no new file uploaded");
      }

      const params: any = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `profile-pics/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };

      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      const s3 = new AWS.S3();

      s3.upload(params, async (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          console.error("Error uploading file:", err);
          return res.status(500).send(err);
        }

        console.log("File uploaded successfully", data);

        req.body = { profilePicUrl: data.Location, _id: req.user._id };
        const user = req?.user;
        if (!user) throw new Error("No user found");
        

        const userData = await profileService.editUserData(req.body);

        const token = await profileService.generateJWT(userData);
        res.cookie("token", token);
        res.status(200).send("User data edited successfully");
      });
    } catch (error) {
      next(error);
    }
  },
};
