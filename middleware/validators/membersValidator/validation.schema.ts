import { z } from "zod";

enum Role {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
  MODERATOR = "MODERATOR",
}

export const memberIdAndServerIdSchema = z.object({
  memberId: z
    .string({ message: "Member id must be string" })
    .trim()
    .uuid({ message: "Member id must be uuid" }),
  serverId: z
    .string({ message: "Sever id must be string" })
    .trim()
    .uuid({ message: "Sever id must be uuid" }),
});

export const updateRoleSchema = z.object({
  role: z.enum([Role.ADMIN, Role.MODERATOR, Role.GUEST], {
    message: "Role must be Admin, user, guest",
  }),
});
