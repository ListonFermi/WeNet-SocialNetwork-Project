import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorMsg = error.message || "An unexpected error occurred";
  console.log(errorMsg);
  res.status(400).send(errorMsg);
};