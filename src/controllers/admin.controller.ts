import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { hashPassword, isEmptyFields } from "../utils/helpers";
import {
  AdminOperation,
  rolePermissions,
  UserOperation,
} from "../utils/prismaOperation";
import { prisma } from "../utils/prisma";
import { ApiError } from "../utils/ApiError";
import { generateJwtToken } from "../utils/generateJwtToken";
import bcrypt from "bcryptjs";

// Login
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  /* 
      1. check empty fields
      2. find user 
      3. compare password
      4. create access token 
      5. return response
    */
  console.log(req.body);
  isEmptyFields([email, password]);

  const userData = await new AdminOperation(prisma)?.findFirst({
    whereCondition: {
      email,
    },
    select: {
      admin_id: true,
      password: true,
      email: true,
    },
  });
  console.log(userData);

  if (!userData) {
    throw new ApiError(404, "Invalid Credentials", null, false);
  }
  if (!bcrypt.compareSync(password, userData.password)) {
    throw new ApiError(400, "Invalid Credentials", null, false);
  }
  const token = generateJwtToken({
    payload: {
      admin_id: userData.admin_id,
      email: userData.email,
      isAdmin: true,
    },
  });
  return new ApiResponse(200, true, "Login Success", null)?.returnResponse(
    req,
    res,
    true,
    token,
    "token"
  );
});

// Logout
export const logoutUser = asyncHandler(async (req, res) => {
  return new ApiResponse(200, true, "Logout Success", null).clearCookie(
    req,
    res,
    "token"
  );
});

// Create roles
export const createRoles = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;
  isEmptyFields([name]);
  await prisma.$transaction(async (tx) => {
    await rolePermissions({
      tx,
      role_name: `${name}`,
      permissions,
      admin_id: req.admin_id,
    });
  });

  return new ApiResponse(200, true, "Role Created", null).returnResponse(
    req,
    res
  );
});

export const createUsers = asyncHandler(async (req, res) => {
  const { name, email, role_id } = req.body;
  isEmptyFields([name, email, role_id]);
  const creatingUser = await new UserOperation(prisma).create({
    data: {
      name,
      email,
      password: hashPassword("123456"),
      admin: { connect: { admin_id: req.admin_id } },
      role: { connect: { role_id: role_id } },
    },
  });
  return new ApiResponse(200, true, "User Created", null).returnResponse(
    req,
    res
  );
});
