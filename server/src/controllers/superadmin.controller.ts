import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { prisma } from "../utils/prisma";
import {
  AdminOperation,
  rolePermissions,
  SuperAdminOperation,
} from "../utils/prismaOperation";
import bcryptjs from "bcryptjs";
import { generateJwtToken } from "../utils/generateJwtToken";
import { hashPassword, isEmptyFields } from "../utils/helpers";

// Super Admin Login
export const superAdminLogin = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    /* 
      1. check empty fields
      2. find user 
      3. compare password
      4. create access token 
      5. return response
    */

    // 1.
    isEmptyFields([email, password]);

    // 2.
    const superAdminOps = new SuperAdminOperation(prisma);
    const superAdmin = await superAdminOps.findFirst({
      whereCondition: {
        email,
      },
      select: {
        email: true,
        super_admin_id: true,
        password: true,
      },
    });
    console.log({ email, password });
    console.log({ superAdmin });
    if (!superAdmin) {
      throw new ApiError(404, "Invalid Credentials", null, false);
    }
    // 3.
    const isMatch = await bcryptjs.compare(password, superAdmin.password);
    if (!isMatch) {
      throw new ApiError(400, "Invalid credentials", null, false);
    }
    const token = generateJwtToken({
      payload: {
        super_admin_id: superAdmin.super_admin_id,
        email: superAdmin.email,
      },
    });

    // 5.
    return new ApiResponse(200, true, "Login Successfull", null).returnResponse(
      req,
      res,
      true,
      token,
      "superadmintoken"
    );
  }
);

// Logout Super Admin
export const logoutSuperAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    return new ApiResponse(200, true, "Logout Success", null).clearCookie(
      req,
      res,
      "superadmintoken"
    );
  }
);

// Create Admin
export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, address, password } = req.body;

  isEmptyFields([name, email, phone, address, password]);

  const superAdmin = new SuperAdminOperation(prisma).findFirst({
    whereCondition: { super_admin_id: req.super_admin_id },
  });

  if (!superAdmin) {
    throw new ApiError(404, "SuperAdmin doesnot exist", null, false);
  }

  await prisma.$transaction(async (tx) => {
    const { role } = await rolePermissions({
      tx,
      role_name: `${name}_admin`,
      isAdmin: true,
    });

    const createAdmin = await new AdminOperation(prisma).createWithTransaction({
      data: {
        name,
        email,
        password: hashPassword(password),
        phone,
        address,
        role: { connect: { role_id: role.role_id } },
        super_admin: { connect: { super_admin_id: req.super_admin_id } },
      },
      tx,
      select: {
        admin_id: true,
      },
    });

    await tx.roles.update({
      where: {
        role_id: role.role_id,
      },
      data: {
        admin_id: createAdmin?.admin_id,
      },
    });
  });

  return new ApiResponse(200, true, "Admin Created", null).returnResponse(
    req,
    res
  );
});
