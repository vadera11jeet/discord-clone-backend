import httpStatus from "http-status";
import logger from "../logger";

class AppError extends Error {
  statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  status: string = "failed";
  isOperational: null | undefined | boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    logger.error(`statusCode: ${statusCode} message: ${message}`);
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
