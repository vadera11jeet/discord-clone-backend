import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import bodyValidator from "./validator";

const createServerSchema = z.object({
  userId: z
    .string({ message: "user id must be string" })
    .trim()
    .min(1, { message: "User id must not empty" })
    .max(255, { message: "User id can't exceed 255 characters " }),

  name: z
    .string({ message: "Server name must be string" })
    .trim()
    .min(3, { message: "Server name at least 3 characters long" })
    .max(255, { message: "Server name can't exceed 255 characters" }),

  imageUrl: z
    .string({ message: "Url name must be string" })
    .trim()
    .url({ message: "Image url is not valid URL" }),
});

function createServerValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  bodyValidator(req, res, next, createServerSchema);
}

export default createServerValidation;
