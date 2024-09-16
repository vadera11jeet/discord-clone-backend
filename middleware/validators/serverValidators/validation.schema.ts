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

export const profileParamsValidator = z.object({
  profileId: z
    .string({ message: "Profile id must be string" })
    .trim()
    .uuid({ message: "Profile id must be uuid" }),
});

export const serverIdParamsValidator = z.object({
  serverId: z
    .string({ message: "Profile id must be string" })
    .trim()
    .uuid({ message: "Profile id must be uuid" }),
});
