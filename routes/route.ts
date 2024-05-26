import express from "express";
import authRoute from "./auth/auth.route";
import serverRoute from "./server/server.route";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/server", serverRoute);

export default router;
