import express, { Router } from "express";
import createServerValidation from "../../middleware/validators/server.validators";
import {
  createServer,
  getUserServiceDetails,
} from "../../controllers/server/server.controller";
import { authentication } from "../../middleware/auth.middleware";

const router: Router = express.Router();

router.route("/").post(authentication, createServerValidation, createServer);
router.route("/user-server-details/:profileId").get(getUserServiceDetails);

export default router;
