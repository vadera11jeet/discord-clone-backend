import { MemberRole, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../config/responseConfig";
import { findUserProfile } from "../../services/auth/auth.service";
import AppError from "../../utils/AppError";
import {
  createDiscordServer,
  getServerByUserId,
  getServerDetailsById,
} from "../../services/servers/server.service";

import { DEFAULT_PAGE_LIMIT } from "../../config/constant";

export async function createServer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userProfile = await findUserProfile({
    OR: [{ id: req.body.userId }, { userId: req.body.userId }],
  });

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

export async function getUserServiceDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const limit = parseInt((req.query.limit as string) ?? DEFAULT_PAGE_LIMIT);
  const page = parseInt((req.query.page as string) ?? 1);
  const skip = (page - 1) * DEFAULT_PAGE_LIMIT;

  const serversInfo = await getServerByUserId(
    req.params.profileId,
    limit,
    skip
  );

  if (page * limit < serversInfo.totalCount) serversInfo.hasMore = true;

  successResponse(res, httpStatus.OK, { ...serversInfo });
}

export async function getServerDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const server = await getServerDetailsById(
    req.params.serverId,
    req.params.profileId
  );
  successResponse(res, httpStatus.OK, server);
}
