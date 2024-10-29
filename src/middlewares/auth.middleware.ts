import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { decodedToken } from "../utils/helpers";

/**
 * Middleware to authenticate Super Admin users.
 * This function checks for a token in either cookies or the `Authorization` header.
 * If a valid token is found, it decodes it and extracts the `super_admin_id`,
 * assigning it to `req.super_admin_id` for downstream access.
 * If no valid token is found, it throws an "Unauthorized" error.

 * @async
 * @function authenticSuperAdmin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {ApiError} 401 Unauthorized if the token is missing or invalid
 *
 * @example
 * // Token is checked in cookies or Authorization header
 * app.use('/admin', authenticSuperAdmin, superAdminRoutes);
 */

export const authenticSuperAdmin = asyncHandler(async (req, res, next) => {
  const cookie =
    req.cookies?.superadmintoken ||
    req.header?.("Authorization")?.split(" ")[1];

  if (!cookie) {
    throw new ApiError(401, "Unauthorized", null, false);
  }

  const super_admin_id = decodedToken(cookie)?.super_admin_id;

  req.super_admin_id = super_admin_id;

  next();
});

/**
 * Middleware to authenticate Users.
 * This function checks for a token in either cookies or the `Authorization` header.
 * If a valid token is found, it decodes it and extracts the `super_admin_id`,
 * assigning it to `req.admin_id` for downstream access.
 * If no valid token is found, it throws an "Unauthorized" error.

 * @async
 * @function authenticSuperAdmin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {ApiError} 401 Unauthorized if the token is missing or invalid
 *
 * @example
 * // Token is checked in cookies or Authorization header
 * app.use('/admin', authenticUser, adminRoutes);
 */

export const authenticUser = asyncHandler(async (req, res, next) => {
  const cookie =
    req.cookies?.token || req.header?.("Authorization")?.split(" ")[1];

  if (!cookie) {
    throw new ApiError(401, "Unauthorized", null, false);
  }

  const admin_id = decodedToken(cookie)?.admin_id;
  console.log({ admin_id });
  req.admin_id = admin_id;

  next();
});
