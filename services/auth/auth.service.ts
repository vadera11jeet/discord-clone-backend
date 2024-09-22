import { Prisma } from "@prisma/client";
import { db } from "../../lib/db";

export function findUserProfile(whereCondition: Prisma.ProfileWhereInput) {
  return db.profile.findFirst({
    where: whereCondition,
  });
}

export async function createProfile(userProfile: Prisma.ProfileCreateInput) {
  return db.profile.create({ data: userProfile });
}

export async function getUserInfoByUserID(userId: string) {
  return db.profile.findUnique({
    where: {
      userId,
    },
  });
}
