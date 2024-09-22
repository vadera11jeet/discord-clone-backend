import { z } from "zod";

export const createServerSchema = z.object({
  userId: z
    .string({ message: "user id must be string" })
    .trim()
    .min(1, { message: "User id must not empty" })
    .max(255, { message: "User id can't exceed 255 characters " }),

  serverName: z
    .string({ message: "Server name must be string" })
    .trim()
    .min(3, { message: "Server name at least 3 characters long" })
    .max(255, { message: "Server name can't exceed 255 characters" }),

  imageUrl: z
    .string({ message: "Url name must be string" })
    .trim()
    .url({ message: "Image url is not valid URL" }),
});

export const serverIdParamsValidator = z.object({
  serverId: z
    .string({ message: "Server id must be string" })
    .trim()
    .uuid({ message: "Server id must be uuid" }),
});

export const inviteCodeAndProfileIdValidation = z.object({
  inviteCode: z
    .string({ message: "Invite code must be string" })
    .trim()
    .uuid({ message: "Invite code  must be uuid" }),
});

export const editServerBodyValidator = z.object({
  name: z
    .string({ message: "Server name is required" })
    .min(3, { message: "Server name have minimum 3 characters" })
    .trim(),
  imageUrl: z
    .string({ message: "Url name must be string" })
    .trim()
    .url({ message: "Image url is not valid URL" }),
});
