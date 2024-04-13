import { z } from "zod";

const userNameValidation = z
  .string()
  .min(3, "username must be at least 3 characters")
  .max(18, "username cannot exceed 18 characters")
  .regex(/^[a-zA-Z0-9]+$/, "username must contain only letters and numbers");

export const signupSchema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "invalid email" }),
  password: z
    .string()
    .min(6, "password must be at least 6 characters")
    .max(26, "password cannot exceed 26 characters")
    .regex(/^[a-zA-Z0-9]+$/, "password must contain only letters and numbers"),
});
