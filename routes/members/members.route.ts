import express, { Router } from "express";
import { authentication } from "../../middleware/auth.middleware";
import catchAsync from "../../utils/catchAsync";
import { updateRoleOfMember } from "../../controllers/members/members.controller";
import { memberIdAndSeverIdParamsValidator } from "../../middleware/validators/membersValidator/members.validator";

const router: Router = express.Router();

router.use(authentication);

router
  .route("/:memberId/:serverId")
  .patch(memberIdAndSeverIdParamsValidator, catchAsync(updateRoleOfMember));

export default router;
