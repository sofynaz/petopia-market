import * as z from 'zod';
import config from '@/conf/config';
import { createUserDto } from '@/apps/users';

export const phoneDto = createUserDto.pick({
  phone: true,
});

export const verifyPhoneDto = createUserDto
  .pick({
    phone: true,
  })
  .extend({
    hash: z.string({
      required_error: 'Hash is required',
    }),
    otp: z
      .string({
        required_error: 'otp is required',
      })
      .min(config.get('otp.length'), 'Invalid otp Length'),
  });

// Defining a type
export type PhoneDto = z.infer<typeof phoneDto>;
export type VerifyPhoneDto = z.TypeOf<typeof verifyPhoneDto>;
