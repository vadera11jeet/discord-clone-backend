import { z } from "zod";

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
