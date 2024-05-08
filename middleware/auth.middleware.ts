import { Request, Response, NextFunction } from "express";
import { ClerkClient } from "@clerk/clerk-sdk-node";
import { z } from "zod";

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.__session;

  if (!token) {
    return res.status(401).json();
  }
}