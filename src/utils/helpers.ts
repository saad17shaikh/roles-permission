import { ApiError } from "./ApiError";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
/**
 * Decodes and verifies a JSON Web Token (JWT) for Super Admin authentication.
 * This function takes a token (expected from cookies or headers), verifies it using
 * the `ACCESS_TOKEN` environment variable, and returns the decoded token payload.
 * If the token is invalid or cannot be verified, it throws an "Unauthorized" error.

 * @function decodedToken
 * @param {string} cookie - JWT token string extracted from cookies or headers.
 * @returns {Object} Decoded token payload, which typically includes user identifiers and permissions.
 * @throws {ApiError} 401 Unauthorized if the token is invalid or missing.

 * @example
 * const decoded = decodedToken(cookie);
 * console.log(decoded.super_admin_id);
 */

export const decodedToken = (cookie: any) => {
  const decoded: any = jwt.verify(cookie, process.env.ACCESS_TOKEN as string);
  if (!decoded) {
    throw new ApiError(401, "Unauthorized", null, false);
  }
  return decoded;
};

/**
 * Checks if the provided fields are empty.
 * This function takes an array of field names and verifies that none of them are empty.
 * If any field is found to be empty, it throws a "Bad Request" error.

 * @function isEmptyFields
 * @param {string[]} fields - An array of field names that should not be empty.
 * @throws {ApiError} 400 Bad Request if any field is empty.
 * @returns {void} This function does not return a value; it throws an error if validation fails.

 * @example
 * isEmptyFields(["name", "email"]); // Throws an error if any field is empty
 */
export const isEmptyFields = (fields: string[]) => {
  if (fields.some((item) => !item)) {
    throw new ApiError(400, "Please provide all fields", null, false);
  }
};

/**
 *
 */
export const isSuperAdminExists = async (id: string) => {
  const user = await prisma?.superAdmin.findUnique({
    where: {
      super_admin_id: id,
    },
  });

  if (!user) {
    throw new ApiError(401, "Super Admin does not exist", null, false);
  } else {
    return user;
  }
};

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 12);
};



