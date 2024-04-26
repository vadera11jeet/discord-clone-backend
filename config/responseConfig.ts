import { Response } from "express";

export const successResponse = function (
  res: Response,
  statusCode: number,
  data: unknown,
  message?: string
): void {
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
