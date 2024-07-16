import { NextFunction, Request, Response } from "express";
import adsService from "../services/adsService";

export = {
  addTransaction: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { PayUOrderId, email, status } = req.body;
      console.log({ PayUOrderId, email, status } )

      const transactionId = await adsService.addTransaction(
        email,
        PayUOrderId,
        status
      );

      res.status(200).send(transactionId);
    } catch (error) {
      next(error);
    }
  },
};
