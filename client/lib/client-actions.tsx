"use client";
import { toast } from "react-toastify";

/**
 * Sends an HTTP request for authentication and returns the server response.
 *
 * This function uses the Fetch API to make a request to the specified endpoint
 * with the provided HTTP method and form data. It automatically includes credentials
 * such as cookies and parses the response as JSON.
 *
 * @param {Object} options - The options object containing request details.
 * @param {string} options.url - The endpoint URL to send the request to.
 * @param {string} options.method - The HTTP method to use (e.g., "POST", "GET").
 * @param {any} options.formData - The data to be sent in the request body, typically an object.
 *
 * @returns {Promise<any>} A promise that resolves to the parsed JSON response from the server.
 *
 * @example
 * const response = await authLoginFunc({
 *   url: "/api/auth/login",
 *   method: "POST",
 *   formData: { email: "test@example.com", password: "123456" },
 * });
 *
 * console.log(response);
 *  Output: { success: true, message: "Login successful", token: "xyz123" }
 */
export const authLoginFunc = async ({
  url,
  method,
  formData,
}: {
  url: string;
  method: string;
  formData: any;
}): Promise<any> => {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  return data;
};

/**
 * Handles authentication login with a toaster notification.
 *
 * This function sends a login request using `authLoginFunc` and displays a loading
 * toaster notification. Upon completion, it updates the toaster with success or error
 * messages based on the server response.
 *
 * @param {Object} options - The options object containing required parameters.
 * @param {Object} options.values - The form values to be sent in the request body.
 * @param {string} options.url - The endpoint URL where the login request is sent.
 * @param {Function} [options.afterSuccess] - An optional callback function to execute after a successful login.
 *
 * @example
 * authLoginWithToaster({
 *   values: { email: "test@example.com", password: "123456" },
 *   url: "/api/auth/login",
 *   afterSuccess: () => {
 *     console.log("Login successful!");
 *   },
 * });
 *
 * @returns {void}
 */

export const authLoginWithToaster = ({
  values,
  url,
  afterSuccess,
}: {
  values: any;
  url: string;
  afterSuccess?: () => void;
}): void => {
  const id = toast.loading("Please wait...", {
    closeButton: true,
  });

  authLoginFunc({
    formData: values,
    method: "POST",
    url,
  })
    .then((data) => {
      console.log(data);
      if (data.success) {
        toast.update(id, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: 3500,
          closeButton: true,
        });
        if (afterSuccess) {
          afterSuccess();
        }
      } else {
        toast.update(id, {
          render: data.message,
          type: "error",
          isLoading: false,
          autoClose: 3500,
        });
      }
    })
    .catch((err) => {
      console.log({ err });
    });
};
