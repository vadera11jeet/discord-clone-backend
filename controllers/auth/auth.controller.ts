import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../config/responseConfig";
import {
  findUserProfile,
  createProfile,
} from "../../services/auth/auth.service";
import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import { findRecentServerByUserId } from "../../services/servers/server.service";

export async function checkUserExists(
  req: Request,
  res: Response,
  _: NextFunction
) {
  const isUserExists = await findUserProfile({ userId: req.body.userId });

  let recentServer;
  if (isUserExists)
    recentServer = await findRecentServerByUserId(isUserExists.id);

  console.log({
    user: isUserExists,
    server: recentServer,
  });

  successResponse(res, httpStatus.OK, {
    user: isUserExists,
    server: recentServer,
  });
}

export async function createUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isUserExists = await findUserProfile({ userId: req.body.userId });

  if (isUserExists)
    next(new AppError("User already exists", httpStatus.CONFLICT));

  const createUser = await createProfile(req.body);
  successResponse(res, httpStatus.OK, createUser);
}
