import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export default function bodyValidator(
  req: Request,
  res: Response,
  next: NextFunction,
  validationSchema: z.ZodType
) {
  const validate = validationSchema.safeParse(req.body);

  if (validate.error)
    return next(
      new AppError(
        validate.error.errors[0].message,
        httpStatus.UNPROCESSABLE_ENTITY
      )
    );

  next();
}
