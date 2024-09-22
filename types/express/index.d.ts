import { Express, Request, Response, NextFunction } from "express";

type UserProfileType = {
  id: string;
  userId: string;
  imageUrl: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
declare module "express-serve-static-core" {
  namespace Express {
    interface Request {
      user: UserProfileType | null;
    }
  }
}
