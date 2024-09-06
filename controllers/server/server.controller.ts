import { MemberRole, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../config/responseConfig";
import { findUserProfile } from "../../services/auth/auth.service";
import AppError from "../../utils/AppError";
import { createDiscordServer } from "../../services/servers/server.service";

export async function createServer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userProfile = await findUserProfile({ id: req.body.userId });

  if (!userProfile)
    return next(new AppError("Can't find user", httpStatus.BAD_REQUEST));

  const serverDetails: Prisma.ServerCreateInput = {
    name: req.body.serverName,
    profile: {
      connect: { id: userProfile!.id },
    },
    imageUrl: req.body.imageUrl,
    inviteCode: uuidv4(),
    channels: {
      create: [
        { name: "general", profile: { connect: { id: userProfile!.id } } },
      ],
    },
    members: {
      create: [
        {
          profile: { connect: { id: userProfile!.id } },
          role: MemberRole.ADMIN,
        },
      ],
    },
  };

  const newDiscordServer = await createDiscordServer(serverDetails);

  successResponse(res, httpStatus.OK, newDiscordServer);
}
