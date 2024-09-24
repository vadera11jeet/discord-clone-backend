import { Request, Response, NextFunction } from "express";
import bodyValidator, { paramsValidator } from "../validator";
import {
  memberIdAndServerIdSchema,
  updateRoleSchema,
} from "./validation.schema";

export function memberIdAndSeverIdParamsValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  paramsValidator(req, res, next, memberIdAndServerIdSchema);
}

export function validateUpdateRoleBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  bodyValidator(req, res, next, updateRoleSchema);
}
