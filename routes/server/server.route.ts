import express, { Router } from "express";
import createServerValidation from "../../middleware/validators/server.validators";
import { createServer } from "../../controllers/server/server.controller";
import { authentication } from "../../middleware/auth.middleware";

const router: Router = express.Router();

router.route("/").post(authentication, createServerValidation, createServer);

export default router;
