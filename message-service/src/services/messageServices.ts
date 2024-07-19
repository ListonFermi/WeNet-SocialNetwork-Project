import { IConversation } from "../models/conversationsCollection";
import { IMessage } from "../models/messageCollection";
import messageRepository from "../repositories/messageRepository";

export = {
  getConvoMessages: async function (
    convoId: string,
    userId: string
  ): Promise<IMessage[]> {
    try {
      const messageData = await messageRepository.getAllMessages(convoId);

      await messageRepository.markAsRead(convoId, userId);

      return messageData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  createChat: async function (
    participantId: string,
    userId: string
  ): Promise<IConversation> {
    try {
      const conversationData: IConversation =
        await messageRepository.createConversation(participantId, userId);

      await messageRepository.addConversationToUser(
        userId,
        conversationData._id
      );

      return conversationData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  sendMessage: async function (
    convoId: string,
    senderId: string,
    message: string,
    imageFile: unknown | null
  ): Promise<IMessage> {
    try {
      let messageData;
      if (imageFile) {
        const imageUrl = await messageRepository.uploadImage(imageFile);
        messageData = await messageRepository.saveImage(
          convoId,
          senderId,
          imageUrl
        );

        if (!messageData) throw new Error("Failed to get message data");

        const convoData = await messageRepository.getConvoData(convoId);
        const { participants } = convoData;
        const unreadByUser = participants.filter(
          (participant) => participant._id.toString() != senderId
        )[0];
        await messageRepository.saveLastMessage(
          convoId,
          "📎attachment",
          messageData._id,
          unreadByUser
        );

        return messageData;
      }

      //This repository method saves the message to the message collection
      messageData = await messageRepository.saveMessage(
        convoId,
        senderId,
        message
      );

      //This repository method saves the last message to the conversation collection
      const convoData = await messageRepository.getConvoData(convoId);
      const { participants } = convoData;
      const unreadByUser = participants.filter(
        (participant) => participant._id.toString() != senderId
      )[0];
      await messageRepository.saveLastMessage(
        convoId,
        message,
        messageData._id,
        unreadByUser
      );

      return messageData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  emitSendMessageEvent: async function (
    req: any,
    receivedMessage: any,
    convoId: string,
    senderId: any
  ): Promise<string> {
    try {
      return await messageRepository.emitSendMessageEvent(
        req,
        receivedMessage,
        convoId,
        senderId
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getConvoList: async function (userId: string) {
    try {
      const convoListData = await messageRepository.getConvoList(userId);

      const responseFormat =
        convoListData.length > 0
          ? convoListData.map((data) => {
              const { _id, participants, lastMessage, unread, updatedAt } =
                data;

              const otherParticipant = participants.filter(
                (participant) => participant._id.toString() != userId
              )[0];

              const { username, firstName, lastName, profilePicUrl } =
                otherParticipant as any;

              const unreadCount = unread.filter(
                (data: any) => data[1].toString() == userId
              ).length;

              return {
                convoId: _id,
                username,
                firstName,
                lastName,
                profilePicUrl,
                timestamp: updatedAt,
                lastMessage,
                unreadCount,
              };
            })
          : [];
      return responseFormat;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  unreadCount: async function (userId: string) {
    try {
      const convoListData = await messageRepository.getConvoList(userId);

      let unreadCount = 0;
      convoListData.forEach((data) => {
        const { unread } = data;
        unreadCount += unread.filter(
          (data: any) => data[1].toString() == userId
        ).length;
      });

      return unreadCount;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
