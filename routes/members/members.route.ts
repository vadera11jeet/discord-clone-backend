import express, { Router } from "express";
import { authentication } from "../../middleware/auth.middleware";
import catchAsync from "../../utils/catchAsync";

const router: Router = express.Router();

router.use(authentication);

router.route("/:memberId");

export default router;
