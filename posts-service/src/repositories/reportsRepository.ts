import { Types } from "mongoose";
import reportsCollection, { IReport } from "../models/reportsCollection";
import userCollection from "../models/userCollection";
import postsCollection from "../models/postsCollection";
import commentCollection from "../models/commentCollection";

export = {
  addReport: async function (
    entityType: "posts" | "comments" | "users",
    entityId: string,
    reportedBy: string,
    reportType: string,
    reportDescription: string
  ): Promise<IReport> {
    try {
      const reportData = {
        entityType,
        entityId: new Types.ObjectId(entityId),
        reportedBy: new Types.ObjectId(reportedBy),
        reportType,
        reportDescription,
      };

      const report = await reportsCollection.create(reportData);

      //add the report information to the reporting user's document
      await userCollection.updateOne(
        { _id: new Types.ObjectId(reportedBy) },
        { $addToSet: { reported: report._id } }
      );

      //add the report information to the reported entity's document
      let reportedEntityData : any;                                                                                                                                                           
      if (entityType === "posts") {
        reportedEntityData = await postsCollection.findOneAndUpdate(
          { _id: new Types.ObjectId(entityId) },
          { $addToSet: { reports: report._id } },
          { new: true }
        );
      } else if (entityType === "comments") {
        reportedEntityData = await commentCollection.findOneAndUpdate(
          { _id: new Types.ObjectId(entityId) },
          { $addToSet: { reports: report._id } },
          { new: true }
        );
      }

      //add the report information to the reported user's document
      console.log({reportedEntityData})
      const reportedUserId: string | Types.ObjectId = reportedEntityData?.userId || entityId
      console.log({reportedUserId})
      await userCollection.updateOne(
        { _id: new Types.ObjectId(reportedUserId) },
        { $addToSet: { reportsReceived: report._id } }
      );

      return report;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
