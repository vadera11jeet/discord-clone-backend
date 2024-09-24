import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../config/responseConfig";
import AppError from "../../utils/AppError";
import {
  isUserServerMember,
  kickUserFromServer,
  updateRole,
} from "../../services/members/members.service";
import { UserProfileType } from "../../types/express";
import { findServer } from "../../services/servers/server.service";

export async function updateRoleOfMember(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const memberDetails = await isUserServerMember({
    id: req.params.memberId,
    serverId: req.params.serverId,
  });

  if (!memberDetails)
    return next(
      new AppError("Invalid member id or server id", httpStatus.BAD_REQUEST)
    );

  const user = req.user as UserProfileType;

  const updatedMemberRole = await updateRole(
    req.params.serverId,
    user.id,
    req.params.memberId,
    req.body.role
  );

  return successResponse(res, httpStatus.OK, updatedMemberRole);
}

export async function kickMemberFromServer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user as UserProfileType;

  const isUserAdmin = await findServer({
    id: req.params.serverId,
    profileId: user.id,
  });

  if (!isUserAdmin) {
    return next(
      new AppError(
        "You don't have access to perform this operation",
        httpStatus.FORBIDDEN
      )
    );
  }

  const deleteUser = await kickUserFromServer(
    req.params.memberId,
    req.params.serverId,
    user.id
  );

  console.log(deleteUser);

  successResponse(res, httpStatus.OK, deleteUser);
}
