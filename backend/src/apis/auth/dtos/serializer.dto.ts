import * as z from 'zod';
import { userDto } from '@/apis/user';

export const authDto = userDto
  .extend({
    ttl: z.number(),
    hash: z.string(),
    access: z.string(),
    refresh: z.string(),
  })
  .partial();

// Defining a type
export type AuthDto = z.TypeOf<typeof authDto>;
