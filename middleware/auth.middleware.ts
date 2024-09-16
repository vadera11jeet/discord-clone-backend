import { Request, Response, NextFunction } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import AppError from "../utils/AppError";
import httpStatus from "http-status";

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.__session;

  if (!token) {
    return next(new AppError("You are not logged in", httpStatus.UNAUTHORIZED));
  }

  try {
    await clerkClient.verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    next();
  } catch (error: any) {
    return next(new AppError(error.message, httpStatus.UNAUTHORIZED));
  }
}
