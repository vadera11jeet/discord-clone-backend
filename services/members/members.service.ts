import { Prisma } from "@prisma/client";
import { db } from "../../lib/db";

export function updateRole(
  serverId: string,
  memberId: string,
  role: Prisma.EnumMemberRoleFieldUpdateOperationsInput
) {
  return db.member.update({
    where: {
      id: memberId,
      serverId: serverId,
    },
    data: {
      role: role,
    },
  });
}

export function isUserServerMember(where: Prisma.MemberWhereUniqueInput) {
  return db.member.findUnique({
    where,
  });
}
