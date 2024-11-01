import { z } from "zod";

export const authLogin = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Invalid Email" }),
  password: z.string().min(1, { message: "Password is required" }),
});
