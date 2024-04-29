import express from "express";
import authRoute from "./auth/auth.route";
import loggerMiddleware from "../middleware/logger.middleware";

const router = express.Router();

router.use("/auth", loggerMiddleware, authRoute);

export default router;
