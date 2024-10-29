import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "./prisma";
export class ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  constructor(statusCode: number, success: boolean, message: string, data: T) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
  }
  // For testing
  isSuccess() {
    console.log(`${this.success ? "Success" : "Failed"} `);
  }
  // Return JSON RESPONSE
  returnResponse(
    req: Request,
    res: Response,
    isCookieToSend: boolean = false,
    token?: any,
    tokenName?: string
  ) {
    const statusCode = this.statusCode || 200;
    const response = {
      statusCode: this.statusCode,
      success: this.success,
      message: this.message || "Success",
      data: this.data,
    };

    if (isCookieToSend) {
      res
        .status(statusCode)
        .cookie(tokenName as string, token, { httpOnly: true, secure: true })
        .json(response);
    } else {
      res.status(this.statusCode || 200).json(response);
    }
  }
  // Clear Cookie

  async clearCookie(req: Request, res: Response, tokenName: string) {
    const response = {
      statusCode: this.statusCode,
      success: this.success,
      message: this.message || "Success",
      data: this.data,
    };
    res.clearCookie(tokenName).json(response);
  }
}
