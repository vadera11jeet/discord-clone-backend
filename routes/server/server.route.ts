import express, { Router } from "express";
import createServerValidation, {
  inviteCodeAndProfileIdValidator,
  profileIdValidator,
  serverIdValidator,
} from "../../middleware/validators/serverValidators/server.validators";
import {
  createServer,
  getUserServiceDetails,
  getServerDetails,
  checkMemberAlreadyJoinServer,
  addMemberByInviteCode,
} from "../../controllers/server/server.controller";
import { authentication } from "../../middleware/auth.middleware";
import catchAsync from "../../utils/catchAsync";

const router: Router = express.Router();

router
  .route("/")
  .post(authentication, createServerValidation, catchAsync(createServer));

router
  .route("/user-server-details/:profileId")
  .get(authentication, profileIdValidator, catchAsync(getUserServiceDetails));

router
  .route("/invite/:inviteCode/:profileId")
  .get(
    authentication,
    inviteCodeAndProfileIdValidator,
    catchAsync(checkMemberAlreadyJoinServer)
  )
  .patch(authentication, catchAsync(addMemberByInviteCode));

router
  .route("/:serverId/:profileId")
  .get(authentication, serverIdValidator, catchAsync(getServerDetails));

export default router;
