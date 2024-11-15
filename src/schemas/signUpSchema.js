import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least two characters")
  .max(20, "Must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
  user: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "password must be at least six characters" }),
});
