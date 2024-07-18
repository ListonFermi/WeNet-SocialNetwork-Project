import { NextFunction, Request, Response } from "express";
import messageServices from "../services/messageServices";

export = {
  getConvoMessages: async function (
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { convoId } = req.params;
      const userId = req.user._id
      const allMessagesData = await messageServices.getConvoMessages(convoId, userId);

      res.status(200).json(allMessagesData);
    } catch (error: any) {
      next(error);
    }
  },
  createConversation: async function (
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { participantId } = req.params;
      const userId = req.user._id;
      const conversationData = await messageServices.createChat(
        participantId,
        userId
      );
      res.status(200).send(conversationData);
    } catch (error: any) {
      next(error);
    }
  },
  sendMessage: async function (req: any, res: Response, next: NextFunction) {
    try {
      const { convoId } = req.params;
      const { message } = req.body;
      const userId = req.user._id;

      const latestMessage = await messageServices.sendMessage(
        convoId,
        userId,
        message,
        null
      );

      //emit socket event
      try {
        const result = await messageServices.emitSendMessageEvent(
          req,
          latestMessage,
          convoId,
          userId
        );
        console.log(result);
      } catch (error: any) {
        console.log("Error emitting event :" + error.message);
      }

      res.status(200).json(latestMessage);
    } catch (error: any) {
      next(error);
    }
  },
  getConvoList: async function (
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user._id 

      const convoListData = await messageServices.getConvoList(userId)

      res.status(200).json(convoListData);
    } catch (error: any) {
      next(error);
    }
  },
};
