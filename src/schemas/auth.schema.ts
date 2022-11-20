import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z
      .string({
        required_error: 'First name is required',
      })
      .min(2)
      .max(255),
    lastName: z
      .string({
        required_error: 'Last name is required',
      })
      .min(2)
      .max(255),
    username: z
      .string({ required_error: 'Username is required' })
      .min(2)
      .max(255),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email()
      .min(6)
      .max(255),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(1, {
        message: 'Password must be at least 1 character',
      })
      .max(75, {
        message: 'Password must be at most 75 characters',
      }),
    passwordConfirmation: z
      .string({
        required_error: 'Password confirmation is required',
      })
      .min(6)
      .max(75),
    bio: z.string().min(2).max(255).optional(),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export const loginSchema = z.object({
  email: z.string().email().min(6).max(255),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1)
    .max(75),
});

export type RegisterInput = z.TypeOf<typeof registerSchema>;
export type LoginInput = z.TypeOf<typeof loginSchema>;
