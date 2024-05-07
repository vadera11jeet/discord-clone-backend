import { Response } from "express";
import logger from "../logger";

export const successResponse = function (
  res: Response,
  statusCode: number,
  data: unknown,
  message?: string
): void {
  
  logger.info(
    `responseData: ${JSON.stringify(data)} statusCode: ${statusCode} message: ${message}`
  );

  res.status(statusCode).json({
    data,
    message,
    status: "success",
  });
};

export const errorResponse = function (
  res: Response,
  statusCode: number,
  errorMessage: string
): void {
  if (process.env.environment === "production" && statusCode >= 500) {
    errorMessage = "internal server error";
  }

  res.status(statusCode).json({
    error: errorMessage,
    status: "failed",
  });
};
