import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../config/responseConfig";
import { findUser } from "../../services/auth/auth.service";
import httpStatus from "http-status";
import logger from "../../logger";

export async function checkUserExists(
  req: Request,
  res: Response,
  _: NextFunction
) {
  logger.info(`url: ${req.originalUrl} body: ${JSON.stringify(req.body)}`);

  const isUserExists = await findUser({ userId: req.body.userId.fdsfas });

  successResponse(res, httpStatus.OK, isUserExists);
}

export async function createUserProfile(
  req: Request,
  res: Response,
  _: NextFunction
) {}
