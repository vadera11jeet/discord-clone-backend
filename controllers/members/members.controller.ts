import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../config/responseConfig";
import AppError from "../../utils/AppError";
import {
  isUserServerMember,
  updateRole,
} from "../../services/members/members.service";

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

  const updatedMemberRole = await updateRole(
    req.params.serverId,
    req.params.memberId,
    req.body.role
  );

  return successResponse(res, httpStatus.OK, updatedMemberRole);
}
