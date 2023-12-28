import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

//@ts-ignore
export interface CustomRequest extends Request {
  userId?: string;
  user?: JwtPayload;
}

export const authenticateJwt = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secret = process.env.SECRET as Secret | undefined;

    if (!secret) {
      return res.sendStatus(500);
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      if (!user || typeof user === 'string') {
        return res.sendStatus(403);
      }

      req.userId = user.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
