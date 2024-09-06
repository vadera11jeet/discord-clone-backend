import { Prisma } from "@prisma/client";
import { db } from "../../lib/db";

export async function findRecentServerByUserId(userId: string) {
  return db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: userId,
        },
      },
    },
  });
}

export async function createDiscordServer(
  serverInfo: Prisma.ServerCreateInput
) {
  return db.server.create({ data: serverInfo });
}
