import express, { Request, Response, NextFunction, Router } from "express";
import catchAsync from "../../utils/catchAsync";
import { checkUserExists } from "../../controllers/auth/auth.controller";

const router: Router = express.Router();

router.get("/user-exists", catchAsync(checkUserExists));

export default router;
