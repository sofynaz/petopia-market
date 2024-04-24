import { ApiRes } from '@repo/core';
import { singleton } from 'tsyringe';
import type { Request } from 'express';

@singleton()
export class UserController {
  async getMe(req: Request) {
    // get user from request
    const user = req.user;
    // send user data
    return ApiRes.ok(user, 'User data');
  }
}
