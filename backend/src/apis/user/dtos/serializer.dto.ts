import * as z from 'zod';

export const userDto = z
  .object({
    id: z.string(),
    phone: z.string(),
    email: z.string(),
    fullname: z.string(),
    role: z.string(),
    is_blocked: z.boolean(),
    is_verified: z.boolean(),
    is_email_verify: z.boolean(),
    is_phone_verify: z.boolean(),
    avatar: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .partial();

// Defining a type
export type UserDto = z.TypeOf<typeof userDto>;
