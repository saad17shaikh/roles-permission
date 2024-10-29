import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "./ApiResponse";

/**
 * A utility function for handling asynchronous route functions in Express.
 * It catches any errors that occur within the asynchronous function
 * and passes them to the next middleware in the Express pipeline.
 * This helps prevent the need for try-catch blocks within each route handler.
 *
 * @function asyncHandler
 * @param {Function} fn - The asynchronous function to handle. It should be an Express route handler
 *                        or middleware function with parameters `(req, res, next)`.
 * @returns {Function} A wrapper function that calls the provided `fn` function
 *                     and catches any rejected promises, passing the error to the next middleware.
 *
 * @example
 * // Usage with an async route handler
 * router.get('/example', asyncHandler(async (req, res) => {
 *   const data = await someAsyncOperation();
 *   res.json(data);
 * }));
 *
 * @remarks
 * If an error is caught, it logs the error and returns an API response with the status code,
 * success indicator, error message, and null data. The status code defaults to 500 if not specified.
 */
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
