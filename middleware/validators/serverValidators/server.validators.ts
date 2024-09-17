import { NextFunction, Request, Response } from "express";

import bodyValidator, { paramsValidator } from "../validator";
import {
  createServerSchema,
  profileParamsValidator,
  serverIdParamsValidator,
} from "./validation.schema";

function createServerValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  bodyValidator(req, res, next, createServerSchema);
}

export function profileIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  paramsValidator(req, res, next, profileParamsValidator);
}

export function serverIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  paramsValidator(req, res, next, serverIdParamsValidator);
}

export default createServerValidation;
