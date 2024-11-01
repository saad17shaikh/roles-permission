import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError";

/**
 * Generates a JSON Web Token (JWT) with a specified payload.
 * This function signs a payload using the `ACCESS_TOKEN` environment variable as the secret key,
 * with an expiration time of 1 hour. If token generation fails, it throws an error.

 * @function generateJwtToken
 * @param {Object} params - An object containing the payload to be signed.
 * @param {Object} params.payload - The data to encode in the JWT token, typically containing user information.
 * @returns {string} The generated JWT token as a string.
 * @throws {ApiError} 500 Internal Server Error if the token cannot be generated.

 * @example
 * const token = generateJwtToken({ payload: { super_admin_id: "12345" } });
 * console.log(token);
 */

export const generateJwtToken = ({ payload }: { payload: any }): string => {
  try {
    return jwt.sign(payload, process.env.ACCESS_TOKEN as string, {
      expiresIn: "1h",
    });
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating token",
      null,
      false
    );
  }
};
