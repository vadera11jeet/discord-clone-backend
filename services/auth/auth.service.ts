import { Prisma } from "@prisma/client";
import { db } from "../../lib/db";

export function findUserProfile(
  whereCondition: Prisma.ProfileWhereUniqueInput
) {
  return db.profile.findUnique({
    where: whereCondition,
  });
}

export async function createProfile(userProfile: Prisma.ProfileCreateInput) {
  return db.profile.create({ data: userProfile });
}
