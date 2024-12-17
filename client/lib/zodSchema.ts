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

export const AdminSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid Email" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
