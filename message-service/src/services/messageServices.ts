import { IConversation } from "../models/conversationsCollection";
import { IMessage } from "../models/messageCollection";
import messageRepository from "../repositories/messageRepository";

export = {
  getConvoMessages: async function (convoId: string) : Promise<IMessage[]> {
    try {
      return await messageRepository.getAllMessages(convoId); 
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  createChat: async function (participantId: string, userId: string) : Promise<IConversation> {
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
  ): Promise<IMessage[]> {
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

        await messageRepository.saveLastMessage(convoId, "📎attachment");

        return await messageRepository.getAllMessages(convoId);
      }

      //This repository method saves the message to the message collection
      await messageRepository.saveMessage(convoId, senderId, message); 

      //This repository method saves the last message to the conversation collection
      await messageRepository.saveLastMessage(convoId, message);
      
      return await messageRepository.getAllMessages(convoId);

    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
