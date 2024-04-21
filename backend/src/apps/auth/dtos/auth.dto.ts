import * as z from 'zod';
import { createUserDto } from '@/apps/users';

export const registerDto = createUserDto.pick({
  phone: true,
  email: true,
  username: true,
  password: true,
});

export const resetPasswordDto = z.object({
  token: z.string(),
  password: z.string(),
});

// Defining a type
export type RegisterDto = z.TypeOf<typeof registerDto>;
export type ResetPasswordDto = z.TypeOf<typeof resetPasswordDto>;
