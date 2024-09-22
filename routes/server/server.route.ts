import express, { Router } from "express";
import {
  createServerValidation,
  editServerValidator,
  inviteCodeValidator,
  serverIdValidator,
} from "../../middleware/validators/serverValidators/server.validators";
import {
  createServer,
  getUserServiceDetails,
  getServerDetails,
  checkUserAlreadyMember,
  addInvitedMemberToServer,
  editServeInfo,
} from "../../controllers/server/server.controller";
import { authentication } from "../../middleware/auth.middleware";
import catchAsync from "../../utils/catchAsync";

const router: Router = express.Router();

router.use(authentication);

router.route("/").post(createServerValidation, catchAsync(createServer));

router.route("/user-server-details").get(catchAsync(getUserServiceDetails));

router
  .route("/:serverId")
  .get(serverIdValidator, catchAsync(getServerDetails))
  .patch(serverIdValidator, editServerValidator, catchAsync(editServeInfo));

router
  .route("/invite/:inviteCode")
  .get(inviteCodeValidator, catchAsync(checkUserAlreadyMember))
  .patch(inviteCodeValidator, catchAsync(addInvitedMemberToServer));

export default router;
