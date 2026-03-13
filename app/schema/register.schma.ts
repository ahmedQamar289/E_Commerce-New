import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(2, "Name must be at least 2 characters long")
      .max(100, "Name must be at most 100 characters long"),
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
      ),
    rePassword: z
      .string()
      .nonempty("Re-entered password is required")
      .min(6, "Re-entered password must be at least 6 characters long")
      .max(100, "Re-entered password must be at most 100 characters long"),
    phone: z
      .string()
      .nonempty("Phone is required")
      .min(10, "Phone number must be at least 10 digits long")
      .max(20, "Phone number must be at most 20 digits long"),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    message: "Passwords don't match",
  });

export type RegisterSchemaValues = z.infer<typeof registerSchema>;
