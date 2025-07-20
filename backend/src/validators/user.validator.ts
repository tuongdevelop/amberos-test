import { z } from 'zod';

export const registerSchema = z.object({
  full_name: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must contain at least 8 characters')
    .regex(/\d.*\d/, 'Password must contain at least 2 numbers')
    .regex(/[^a-zA-Z0-9].*[^a-zA-Z0-9]/, 'Password must contain at least 2 symbols'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  phone_number: z.string().optional(),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  nok_name: z.string().optional(),
  nok_phone_number: z.string().optional(),
}).partial().refine(obj => Object.keys(obj).length > 0, { message: "At least one field must be provided for update" });
