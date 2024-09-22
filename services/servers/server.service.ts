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
      members: {
        some: {
          profileId: profileId,
        },
      },
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

export async function isUserAlreadyMember(
  inviteCode: string,
  profileId: string
) {
  return db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: {
          profileId,
        },
      },
    },
  });
}

export async function addInvitedMember(inviteCode: string, profileId: string) {
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

export async function editServerInfoById(
  serverId: string,
  profileId: string,
  server: Prisma.ServerUpdateInput
) {
  return db.server.update({
    where: { id: serverId, profileId },
    data: {
      name: server.name,
      imageUrl: server.imageUrl,
    },
  });
}

export async function findServer(where: Prisma.ServerWhereUniqueInput) {
  return db.server.findUnique({
    where,
  });
}
