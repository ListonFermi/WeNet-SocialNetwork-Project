import { NextFunction, Request, Response } from "express";
import messageServices from "../services/messageServices";

export = {
  getConvoMessages: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { convoId } = req.params;

      const allMessagesData = await messageServices.getConvoMessages(convoId)
        
      res.status(200).json(allMessagesData);
    } catch (error: any) {
      next(error);
    }
  },
  createChat: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { participantId } = req.params;
      const { userId } = req.body;
      const conversationData = await messageServices.createChat(
        participantId,
        userId
      );
      res.status(200).send(conversationData);
    } catch (error: any) {
      next(error);
    }
  },
  sendMessage: async function (
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { convoId } = req.params;
      const { message } = req.body;
      const userId = req.user._id

      const allMessagesData = await messageServices.sendMessage(
        convoId,
        userId,
        message,
        null
      );
        
      res.status(200).json(allMessagesData);
    } catch (error: any) {
      next(error);
    }
  },
};
