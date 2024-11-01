import { Request } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user_id: string;
      admin_id: string;
      super_admin_id: string;
    }
  }
}
