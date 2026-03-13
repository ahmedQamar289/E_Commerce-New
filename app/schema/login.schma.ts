import * as z from "zod";

export const loginSchema = z
  .object({
     email: z
      .email("Invalid email address")
      .nonempty("Email is required")
      .max(100, "Email must be at most 100 characters long")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be a valid email address",
      ),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must be at most 100 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),})

export type LoginSchemaValues = z.infer<typeof loginSchema>;
