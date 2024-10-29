import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "./ApiResponse";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log({ err });
      new ApiResponse(
        err?.statusCode || 500,
        false,
        err?.message,
        null
      )?.returnResponse(req, res);
      return;
    });
  };
};
