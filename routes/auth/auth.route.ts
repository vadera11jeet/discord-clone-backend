import express, { Request, Response, NextFunction, Router } from "express";
import catchAsync from "../../utils/catchAsync";
import {
  checkUserExists,
  createUserProfile,
} from "../../controllers/auth/auth.controller";
import userProfileValidator from "../../middleware/validators/auth.validators";

const router: Router = express.Router();

router.get("/user-exists", catchAsync(checkUserExists));
router.post(
  "/create-user",
  userProfileValidator,
  catchAsync(createUserProfile)
);

export default router;
