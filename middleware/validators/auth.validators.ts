import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import bodyValidator from "./validator";

export const userProfileSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Can't accept email with length of 255" }),

  userId: z
    .string({ message: "User id is required" })
    .trim()
    .min(3, { message: "UserId must have 3 Characters" })
    .max(255, { message: "Can't accept user id with length of 255" }),

  imageUrl: z
    .string()
    .trim()
    .url({ message: "Invalid URL" })
    .max(255, { message: "Can't accept image url with length of 255" }),

  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(3, { message: "name must have 3 Characters" })
    .max(255, { message: "Can't accept name with length of 255" }),
});

function userProfileValidator(req: Request, res: Response, next: NextFunction) {
  bodyValidator(req, res, next, userProfileSchema);
}

export default userProfileValidator;
