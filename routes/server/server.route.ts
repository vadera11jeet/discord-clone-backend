import express, { Router } from "express";
import createServerValidation from "../../middleware/validators/server.validators";
import { createServer } from "../../controllers/server/server.controller";

const router: Router = express.Router();

router.route("/").post(createServerValidation, createServer);

export default router;
