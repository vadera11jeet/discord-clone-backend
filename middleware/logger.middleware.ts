import { Request, Response, NextFunction } from "express";
import logger from "../logger";

export default function loggerMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  logger.info(`url: ${req.originalUrl} body: ${JSON.stringify(req.body)}`);
  next();
}
