import express from "express";
import authRoute from "./auth/auth.route";
import serverRoute from "./server/server.route";
import memberRoute from "./members/members.route";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/server", serverRoute);
router.use("/member", memberRoute);

export default router;
