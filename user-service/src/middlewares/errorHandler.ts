import { Request, Response, NextFunction } from "express";

export const errorHandler= (error: any, req: Request, res: Response, next: NextFunction)=> {
    let errorMsg = error.message || 'An unexpected error occurred';
    console.log('adhjba')
    // Signup- Credentials exists error
    if (errorMsg.includes("E11000") || errorMsg.includes("duplicate key error")) {
      return res.status(409).send("Credentials already exist");
    }
  
    res.status(400).send(errorMsg);
}
