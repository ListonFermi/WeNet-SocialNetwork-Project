import AWS from "aws-sdk";
import { IMulterFile } from "../types/types";

export async function uploadToS3Bucket(file: IMulterFile): Promise<string> {
  try {
    if (!file) {
      throw new Error("No file uploaded");
    }
    const params: any = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `posts/${Date.now()}_${file.originalname}`,
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

    const uploadedResult = await s3.upload(params).promise();

    if (!uploadedResult.Location)
      throw new Error("Error grabbing image url from s3Bucket");

    return uploadedResult.Location;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
