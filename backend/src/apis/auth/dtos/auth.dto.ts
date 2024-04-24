import * as z from 'zod';
import { createUserDto } from '@/apis/user';

export const loginDto = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerDto = createUserDto.pick({
  username: true,
  email: true,
  fullname: true,
  password: true,
});

// Defining a type
export type RegisterDto = z.TypeOf<typeof registerDto>;
