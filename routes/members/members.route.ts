import express, { Router } from "express";
import { authentication } from "../../middleware/auth.middleware";
import catchAsync from "../../utils/catchAsync";
import {
  kickMemberFromServer,
  updateRoleOfMember,
} from "../../controllers/members/members.controller";
import {
  memberIdAndSeverIdParamsValidator,
  validateUpdateRoleBody,
} from "../../middleware/validators/membersValidator/members.validator";

const router: Router = express.Router();

router.use(authentication);

router
  .route("/:memberId/:serverId")
  .patch(
    memberIdAndSeverIdParamsValidator,
    validateUpdateRoleBody,
    catchAsync(updateRoleOfMember)
  )
  .delete(memberIdAndSeverIdParamsValidator, catchAsync(kickMemberFromServer));

export default router;
