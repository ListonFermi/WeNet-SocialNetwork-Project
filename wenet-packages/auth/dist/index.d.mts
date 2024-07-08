import { Request, Response, NextFunction } from 'express';

declare function verifyAdmin(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;

declare function verifyUser(req: any, res: Response, next: NextFunction): Response<any, Record<string, any>>;

export { verifyAdmin, verifyUser };
