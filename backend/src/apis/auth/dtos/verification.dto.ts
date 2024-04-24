import * as z from 'zod';
import config from '@/conf/config';
import { createUserDto } from '@/apis/user';

export const emailDto = createUserDto.pick({
  email: true,
});

export const verifyEmailDto = createUserDto
  .pick({
    email: true,
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
export type EmailDto = z.infer<typeof emailDto>;
export type VerifyEmailDto = z.TypeOf<typeof verifyEmailDto>;
