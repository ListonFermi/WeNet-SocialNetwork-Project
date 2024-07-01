import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const adminToken = req.cookies?.adminToken;

  if (!adminToken) {
    return res.status(401).send("Admin JWT not found in the cookies");
  }

  const secret = process.env.JWT_SECRET || "";
  if (!secret) {
    return res.status(500).send("JWT secret not found in the env");
  }

  try {
    const decoded: any = jwt.verify(adminToken, secret);

    if (!decoded?.role || decoded.role != "wenet-admin") {
      return res.status(401).send("Invalid admin JWT");
    }
    
    next();
  } catch (err: any) {
    return res.status(401).send("Invalid admin JWT");
  }
}
