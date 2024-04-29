import { Prisma } from "@prisma/client";
import { db } from "../../lib/db";

export function findUser(whereCondition: Prisma.ProfileWhereUniqueInput) {

  return db.profile.findUnique({
    where: whereCondition,
  });
  
}
