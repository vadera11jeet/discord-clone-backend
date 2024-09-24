import { Prisma } from "@prisma/client";
import { db } from "../../lib/db";

export function updateRole(
  serverId: string,
  profileId: string,
  memberId: string,
  role: Prisma.EnumMemberRoleFieldUpdateOperationsInput
) {
  return db.server.update({
    where: {
      id: serverId,
      profileId: profileId,
    },
    data: {
      members: {
        update: {
          where: {
            id: memberId,
            profileId: {
              not: profileId,
            },
          },
          data: {
            role,
          },
        },
      },
    },
    include: {
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

export function isUserServerMember(where: Prisma.MemberWhereUniqueInput) {
  return db.member.findUnique({
    where,
  });
}

export function kickUserFromServer(
  memberId: string,
  serverId: string,
  profileId: string
) {
  return db.server.update({
    where: {
      profileId,
      id: serverId,
    },
    data: {
      members: {
        deleteMany: {
          id: memberId,
          profileId: {
            not: profileId,
          },
        },
      },
    },
    include: {
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
