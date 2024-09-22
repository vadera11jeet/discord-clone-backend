import { Prisma, PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db =
  globalThis.prisma ||
  new PrismaClient({
    // log: ["query"],
  });

if (process.env.ENVIRONMENT !== "production") globalThis.prisma = db;
