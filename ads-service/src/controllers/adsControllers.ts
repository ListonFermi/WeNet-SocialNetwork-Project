import { NextFunction, Request, Response } from "express";
import adsService from "../services/adsService";

export = {
  addTransaction: async function (req: any, res: Response, next: NextFunction) {
    try {
      const userId = req.user._id;
      const { PayUOrderId, status } = req.body;

      const transactionId = await adsService.addTransaction(
        userId,
        PayUOrderId,
        status
      );

      res.status(200).send(transactionId);
    } catch (error) {
      next(error);
    }
  },
};
