import { INotification } from "../models/notificationCollection";
import notificationRepository from "../repositories/notificationRepository";

export = {
  addNotification: async function (notificationData: INotification) {
    try {
      const notification = await notificationRepository.addNotification(
        notificationData
      );
      if (!notification) throw new Error("Notification not found");

      const { userId } = notificationData;
      const { _id } = notification;
      try {
        await notificationRepository.addNotificationToUser(userId, _id);
      } catch (error: any) {
        throw new Error(error.message);
      }

      //sending live notification
      try {
        // await notificationRepository.
      } catch (error: any) {
        throw new Error(error.message);
      }


    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getNotifications: async function (userId: string) {
    try {
      const notificationData = await notificationRepository.getNotifications(
        userId
      );
      await notificationRepository.markAsRead(userId)
      return notificationData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};