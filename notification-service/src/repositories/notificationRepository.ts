import { Types } from "mongoose";
import notificationCollection, {
  INotification,
} from "../models/notificationCollection";
import userCollection from "../models/userCollection";

export = {
  addNotification: async function (
    notificationData: INotification
  ): Promise<INotification> {
    try {
      return await notificationCollection.create(notificationData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  addNotificationToUser: async function (
    userId: string | Types.ObjectId,
    notificationId: string | Types.ObjectId
  ): Promise<string> {
    try {
      await userCollection.findByIdAndUpdate(userId, {
        $set: { $addToSet: { notifications: notificationId } },
      });
      return "Notification added to user collection";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getNotifications: async function (userId: string): Promise<INotification[]> {
    try {
      return await notificationCollection
        .find({
          userId: new Types.ObjectId(userId),
        })
        .populate("doneByUser")
        .populate("entityId")
        .sort({ createdAt: -1 });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  markAsRead: async function (userId: string) {
    try {
      await notificationCollection.updateMany(
        { userId: new Types.ObjectId(userId), isRead: false },
        { $set: { isRead: true } }
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  // sendNotificationToMQ :

};
