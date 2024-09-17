import express, { Router } from "express";
import createServerValidation, {
  profileIdValidator,
  serverIdValidator,
} from "../../middleware/validators/serverValidators/server.validators";
import {
  createServer,
  getUserServiceDetails,
  getServerDetails,
} from "../../controllers/server/server.controller";
import { authentication } from "../../middleware/auth.middleware";

const router: Router = express.Router();

router.route("/").post(authentication, createServerValidation, createServer);

router
  .route("/user-server-details/:profileId")
  .get(authentication, profileIdValidator, getUserServiceDetails);

router
  .route("/:serverId/:profileId")
  .get(authentication, serverIdValidator, getServerDetails);

export default router;
