import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../config/responseConfig";
import { findUserProfile, createProfile } from "../../services/auth/auth.service";
import httpStatus from "http-status";

export async function checkUserExists(
  req: Request,
  res: Response,
  _: NextFunction
) {
  const isUserExists = await findUserProfile({ userId: req.body.userId });

  successResponse(res, httpStatus.OK, isUserExists);
}

export async function createUserProfile(
  req: Request,
  res: Response,
  _: NextFunction
) {
  const createUser = await createProfile(req.body);
}
