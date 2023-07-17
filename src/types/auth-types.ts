import { z } from "zod";

const zPassword = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" });

export const resetPasswordSchema = z
  .object({
    password: zPassword,
    confirmPassword: zPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z
  .object({
    email: z.string().email(),
    password: zPassword,
  })
  .required();

export const signUpSchema = signInSchema
  .extend({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" }),
    confirmPassword: zPassword,
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
