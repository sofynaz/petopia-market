import * as z from 'zod';
import { RoleEnum } from '@/constants';

export const createUserDto = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(20, { message: 'Username must be no more than 20 characters.' })
    .regex(/^[a-zA-Z0-9_]/, {
      message: 'User must not contain special characters',
    }),

  // Phone, email, and fullname are required strings
  phone: z.string().optional(),
  fullname: z.string({ required_error: 'Full name is required.' }),
  email: z
    .string({
      required_error: 'Email address is required',
    })
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),

  // Role is an optional enum value from Roles enum
  role: z.optional(z.nativeEnum(RoleEnum)),

  // Avatar, blocked status, email verification status, and phone verification status are optional strings and booleans
  avatar: z.string({ invalid_type_error: 'Invalid avatar.' }).optional(),
  is_blocked: z
    .boolean({ invalid_type_error: 'Invalid blocked status.' })
    .optional(),
  is_email_verify: z
    .boolean({ invalid_type_error: 'Invalid email verification status.' })
    .optional(),
  is_phone_verify: z
    .boolean({ invalid_type_error: 'Invalid phone verification status.' })
    .optional(),
});

// Defining a type
export type CreateUserDto = z.TypeOf<typeof createUserDto>;
