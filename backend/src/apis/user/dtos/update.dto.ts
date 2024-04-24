import * as z from 'zod';
import { createUserDto } from './create.dto';

export const updateUserDto = z.object({
  body: createUserDto.partial(),
  params: z.object({
    id: z.string({
      required_error: 'User ID is required',
    }),
  }),
});

// Defining a type
export type UpdateUserDto = z.TypeOf<typeof updateUserDto>['body'];
