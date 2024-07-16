import { Types } from "mongoose";
import conversationsCollection, {
  IConversation,
} from "../models/conversationsCollection";
import { uploadToS3Bucket } from "../utils/s3bucket";
import { IMulterFile } from "../types/types";
import messageCollection, { IMessage } from "../models/messageCollection";
import userCollection, { IUser } from "../models/userCollection";
import { emitSocketEvent } from "../socket";
import { ChatEventEnum } from "../constants";

export = {
  createConversation: async function (
    participantId: string,
    userId: string
  ): Promise<IConversation> {
    try {
      return await conversationsCollection.create({
        participants: [
          new Types.ObjectId(participantId),
          new Types.ObjectId(userId),
        ],
        lastMessage: "",
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  addConversationToUser: async function (
    userId: string,
    conversationId: string | Types.ObjectId
  ): Promise<IUser> {
    try {
      const updatedUser = await userCollection.findByIdAndUpdate(
        new Types.ObjectId(userId),
        {
          $addToSet: {
            singleConversations: new Types.ObjectId(conversationId),
          },
        },
        { new: true }
      );

      if (!updatedUser) throw new Error("User not found");

      return updatedUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  saveMessage: async function (
    convoId: string,
    senderId: string,
    message: string
  ): Promise<IMessage> {
    try {
      if (!message) throw new Error("There is no message");

      const convoExists = await conversationsCollection.exists({
        _id: convoId,
      });
      if (!convoExists) throw new Error("Conversation doesn't exist");

      const senderExists = await userCollection.exists({ _id: senderId });
      if (!senderExists) throw new Error("Sender doesn't exist");

      const newMessage = await messageCollection.create({
        convoId: new Types.ObjectId(convoId),
        sender: new Types.ObjectId(senderId),
        message,
      });

      return await newMessage.populate({
        path: "sender",
        select: "_id username firstName lastName profilePicUrl",
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  uploadImage: async function (imageFile: unknown): Promise<string> {
    try {
      return await uploadToS3Bucket(imageFile as IMulterFile);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  saveImage: async function (
    convoId: string,
    senderId: string,
    imageUrl: string
  ): Promise<IMessage> {
    try {
      const newMessage = await messageCollection.create({
        convoId: new Types.ObjectId(convoId),
        senderId: new Types.ObjectId(senderId),
        message: "",
        isAttachment: true,
        attachmentUrl: imageUrl,
      });
      return newMessage.populate({
        path: "sender",
        select: "_id username firstName lastName profilePicUrl",
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  saveLastMessage: async function (
    convoId: string,
    lastMessage: string
  ): Promise<IConversation> {
    try {
      const convoData = await conversationsCollection.findByIdAndUpdate(
        convoId,
        {
          $set: { lastMessage },
        },
        { new: true }
      );

      if (!convoData) throw new Error("Conversation not found");

      return convoData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getAllMessages: async function (convoId: string): Promise<IMessage[]> {
    try {
      const allMessagesData = await messageCollection
        .find({ convoId: new Types.ObjectId(convoId) })
        .populate({
          path: "sender",
          select: "_id username firstName lastName profilePicUrl",
        })
        .sort({ updatedAt: -1 });

      return allMessagesData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getConvoList: async function (userId: string): Promise<IConversation[]> {
    try {
      return await conversationsCollection
        .find({ participants: new Types.ObjectId(userId) })
        .populate({
          path: "participants",
          select: "_id username firstName lastName profilePicUrl",
        })
        .sort({ updatedAt: -1 });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  //socket methods
  emitSendMessageEvent: async function (
    req: any,
    receivedMessage: any,
    convoId: string,
    senderId: any
  ): Promise<string> {
    try {
      const conversation = await conversationsCollection.findByIdAndUpdate(
        convoId
      );
      if (!conversation) throw new Error("Error getting conversation data");

      conversation.participants.forEach((participantObjectId) => {
        if (participantObjectId.toString() === senderId.toString()) return;
        console.log("emitted to:");
        console.log(participantObjectId.toString());
        // emit the receive message event to the other participants with received message as the payload
        emitSocketEvent(
          req,
          participantObjectId.toString(),
          ChatEventEnum.MESSAGE_RECEIVED_EVENT,
          receivedMessage
        );
      });

      return "Recieved message event emitted successfully";
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
