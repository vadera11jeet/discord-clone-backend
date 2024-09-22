import { NextFunction, Request, Response } from "express";

import bodyValidator, { paramsValidator } from "../validator";
import {
  createServerSchema,
  serverIdParamsValidator,
  editServerBodyValidator,
  inviteCodeAndProfileIdValidation,
} from "./validation.schema";

export function createServerValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  bodyValidator(req, res, next, createServerSchema);
}

export function serverIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  paramsValidator(req, res, next, serverIdParamsValidator);
}

export function inviteCodeValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  paramsValidator(req, res, next, inviteCodeAndProfileIdValidation);
}

export function editServerValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  bodyValidator(req, res, next, editServerBodyValidator);
}
