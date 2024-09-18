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

export async function getServerByUserId(
  profileId: string,
  take: number = 10,
  skip: number = 0
) {
  const serverList = await db.server.findMany({
    skip,
    take,
    where: {
      profileId: profileId,
    },
  });

  const totalCount = await db.server.count();

  return {
    serverList,
    totalCount,
    hasMore: false,
  };
}

export async function getServerDetailsById(
  serverId: string,
  profileId: string
) {
  return db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
}
export async function getServerInfoByInviteCode(
  inviteCode: string,
  profileId: string
) {
  return db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId,
        },
      },
    },
  });
}

export async function addMemberByServerId(
  inviteCode: string,
  profileId: string
) {
  return db.server.update({
    where: {
      inviteCode: inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId,
          },
        ],
      },
    },
  });
}
