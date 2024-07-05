import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyUser(req: any, res: Response, next: NextFunction) {
  const userToken = req.cookies?.token;
  if (!userToken) {
    return res.status(401).send("JWT not found in the cookies");
  }

  const secret = process.env.JWT_SECRET || "";
  if (!secret) {
    return res.status(500).json("JWT secret not found in the env");
  }

  try {
    const decoded: any = jwt.verify(userToken, secret);

    req.user = decoded?.userData;
    if (!decoded?.role || decoded.role != "wenet-user") {
      return res.status(401).send("Invalid JWT");
    }

    next();
  } catch (err: any) {
    return res.status(401).send("Invalid JWT");
  }
}
