import { NextFunction, Request, Response } from "express";
import { ControllerFunction } from "../types/common";



const catchAsync = (fn: ControllerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
