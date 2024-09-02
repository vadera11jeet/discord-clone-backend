import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import httpStatus from "http-status";

dotenv.config();
import logger from "./logger";
import AppError from "./utils/AppError";
import { errorResponse } from "./config/responseConfig";
import routes from "./routes/route";
import loggerMiddleware from "./middleware/logger.middleware";

const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.status(httpStatus.OK).send("hello world");
});

app.use("/v1", loggerMiddleware, routes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  logger.error(`can't find route ${req.originalUrl}`);
  next(new AppError("can't find route", httpStatus.NOT_FOUND));
});

app.use((err: AppError, _: Request, res: Response, next: NextFunction) => {
  logger.error(
    `status: ${err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR} message: ${err}`
  );
  if (res.headersSent) {
    return next(err);
  }
  errorResponse(
    res,
    err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR,
    err.message
  );
});

app.listen(PORT, () => {
  logger.info(`server is running on port: ${PORT}`);
});
