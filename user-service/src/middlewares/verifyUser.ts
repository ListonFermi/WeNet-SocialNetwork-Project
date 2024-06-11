import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const verifyUser = (req: any, res: Response, next: NextFunction) => {
  const userToken = req.cookies?.token;

  if (!userToken) {
    return res.status(401).json({ message: "Token not found" });
  }

  const secret = process.env.JWT_SECRET || "";
  if (!secret) {
    return res.status(500).json({ message: "JWT secret not found" });
  }

  try {
    const decoded: any = jwt.verify(userToken, secret);
    req.user = decoded?.userData; 
    next();
  } catch (err: any) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
