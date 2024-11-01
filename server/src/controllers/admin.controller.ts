import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { hashPassword, isEmptyFields } from "../utils/helpers";
import {
  AdminOperation,
  rolePermissions,
  RolesOperation,
  UserOperation,
} from "../utils/prismaOperation";
import { prisma } from "../utils/prisma";
import { ApiError } from "../utils/ApiError";
import { generateJwtToken } from "../utils/generateJwtToken";
import bcrypt from "bcryptjs";

// Login
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  // Here we need to manage login for both admin and user
  /* 
      1. check empty fields
      2. find user 
      3. compare password
      4. create access token 
      5. return response
    */
  console.log(req.body);
  isEmptyFields([email, password]);

  const hasAdmin = await new AdminOperation(prisma)?.findFirst({
    whereCondition: {
      email,
    },
    select: {
      admin_id: true,
      password: true,
      email: true,
    },
  });
  if (!hasAdmin) {
    const hasUser = await new UserOperation(prisma)?.findFirst({
      whereCondition: {
        email,
      },
      select: {
        admin_id: true,
        user_id: true,
        email: true,
        password: true,
      },
    });
    if (!hasUser) {
      throw new ApiError(404, "Invalid Credentials", null, false);
    } else if (!bcrypt.compareSync(password, hasUser.password)) {
      throw new ApiError(400, "Invalid Credentials", null, false);
    } else {
      const token = generateJwtToken({
        payload: {
          user_id: hasUser.user_id,
          admin_id: hasUser.admin_id,
          email: hasUser.email,
          isAdmin: false,
        },
      });
      return new ApiResponse(200, true, "Login Success", null)?.returnResponse(
        req,
        res,
        true,
        token,
        "token"
      );
    }
  }

  if (!bcrypt.compareSync(password, hasAdmin.password)) {
    throw new ApiError(400, "Invalid Credentials", null, false);
  }
  const token = generateJwtToken({
    payload: {
      admin_id: hasAdmin.admin_id,
      email: hasAdmin.email,
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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<
// ? ROLES

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

export const allRoles = asyncHandler(async (req, res) => {
  // const roles = await new RolesOperation(prisma).findMany({
  //   whereCondition:,
  //   findManyArgs: {
  //     select: {
  //       name: true,
  //       role_id: true,
  //       is_primary: true,
  //       created_at: true,
  //     },
  //   },
  // });
  const roles = await prisma.roles.findMany({
    where: {
      admin_id: req.admin_id,
      is_primary: false,
    },
    select: {
      name: true,
      role_id: true,
      is_primary: true,
      created_at: true,
    },
  });

  return new ApiResponse(200, true, "All Roles", roles).returnResponse(
    req,
    res
  );
});

export const updateRole = asyncHandler(async (req, res) => {
  const role_id = req.params.id;
  const { name, permissions, description } = req.body;

  isEmptyFields([name]);
  if (permissions?.length === 0) {
    throw new ApiError(400, "Permissions cannot be empty", null, false);
  }
  await prisma.$transaction(async (tx) => {
    await tx.roles.update({
      where: {
        role_id,
      },
      data: {
        name,
        description,
      },
    });
    await tx.rolePermissions.deleteMany({
      where: {
        role_id,
      },
    });
    await tx.rolePermissions.createMany({
      data: permissions.map((permission_id: string) => ({
        role_id,
        permission_id,
      })),
    });
  });
  return new ApiResponse(200, true, "Role Updated", null).returnResponse(
    req,
    res
  );
});

export const deleteRole = asyncHandler(async (req, res) => {
  const role_id = req.params.id;
  await prisma.roles.delete({
    where: {
      role_id,
    },
  });
  return new ApiResponse(200, true, "Role Deleted", null).returnResponse(
    req,
    res
  );
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<
// ? USERS

// Create roles
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

//
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.users.findMany({
    where: {
      admin_id: req.admin_id,
    },
    include: {
      role: true,
    },
  });
  return new ApiResponse(
    200,
    true,
    "Users fetched successfully",
    users
  ).returnResponse(req, res);
});

export const updateUser = asyncHandler(async (req, res) => {
  const user_id = req.params.id;
  const { name, email, role_id } = req.body;
  isEmptyFields([name, email, role_id]);
  const updatingUser = await prisma.users.update({
    where: {
      user_id,
    },
    data: {
      name,
      email,
      role: { connect: { role_id: role_id } },
    },
  });
  return new ApiResponse(200, true, "User Updated", null).returnResponse(
    req,
    res
  );
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user_id = req.params.id;
  await prisma.users.delete({
    where: {
      user_id,
    },
  });
  return new ApiResponse(200, true, "User Deleted", null).returnResponse(
    req,
    res
  );
});
