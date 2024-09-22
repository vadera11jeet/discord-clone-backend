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
  isUserAlreadyMember,
  addInvitedMember,
  editServerInfoById,
  findServer,
} from "../../services/servers/server.service";

import { DEFAULT_PAGE_LIMIT } from "../../config/constant";
import { UserProfileType } from "../../types/express";

export async function createServer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userProfile = await findUserProfile({
    OR: [{ id: req.body.userId }, { userId: req.body.userId }],
  });

  if (!userProfile)
    return next(new AppError("Can't find user", httpStatus.NOT_FOUND));

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

  const user = req.user as UserProfileType;
  const serversInfo = await getServerByUserId(user.id, limit, skip);

  if (page * limit < serversInfo.totalCount) serversInfo.hasMore = true;

  successResponse(res, httpStatus.OK, { ...serversInfo });
}

export async function getServerDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isServerExists = await findServer({
    id: req.params.serverId,
  });

  if (!isServerExists)
    next(new AppError("Invalid server id", httpStatus.NOT_FOUND));

  const user = req.user as UserProfileType;
  const server = await getServerDetailsById(req.params.serverId, user.id);
  successResponse(res, httpStatus.OK, server);
}

export async function checkUserAlreadyMember(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isServerExists = await findServer({
    inviteCode: req.params.inviteCode,
  });

  if (!isServerExists) {
    return next(new AppError("Invalid invite code", httpStatus.NOT_FOUND));
  }

  const user = req.user as UserProfileType;
  const server = await isUserAlreadyMember(req.params.inviteCode, user.id);

  if (server) return successResponse(res, httpStatus.OK, server);

  return successResponse(res, httpStatus.OK, null);
}

export async function addInvitedMemberToServer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isServerExists = await findServer({
    inviteCode: req.params.inviteCode,
  });

  if (!isServerExists) {
    return next(new AppError("Invalid invite code", httpStatus.NOT_FOUND));
  }

  const user = req.user as UserProfileType;

  const server = await addInvitedMember(req.params.inviteCode, user.id);
  return successResponse(res, httpStatus.OK, server);
}

export async function editServeInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isServerExists = await findServer({
    id: req.params.serverId,
  });

  if (!isServerExists)
    next(new AppError("Invalid server id", httpStatus.NOT_FOUND));

  const user = req.user as UserProfileType;

  const server = await editServerInfoById(req.params.serverId, user.id, {
    name: req.body.serverName,
    imageUrl: req.body.imageUrl,
  });
  return successResponse(res, httpStatus.OK, server);
}
