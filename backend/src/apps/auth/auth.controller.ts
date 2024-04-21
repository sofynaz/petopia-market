import { ApiRes } from '@repo/core';
import { singleton } from 'tsyringe';
import { ActivityEnum } from '@/constants';
import { ActivityService } from '../users';
import { Request, Response } from 'express';
import { AuthService, TokenService } from './services';
import { registerDto } from './dtos';

@singleton()
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private activityService: ActivityService,
  ) {}

  // Method for user login
  async login(req: Request, res: Response) {
    // Generating access and refresh tokens
    const { access, refresh } = await this.tokenService.generate(req.user.id);

    // Setting access and refresh tokens as cookies
    res.cookie('access', access.token, {
      httpOnly: true,
      maxAge: access.maxAge,
    });
    res.cookie('refresh', refresh.token, {
      httpOnly: true,
      maxAge: refresh.maxAge,
    });

    // Combining user data with auth tokens
    const data = Object.assign(req.user.toJSON(), {
      access: access.token,
      refresh: refresh.token,
    });

    // create activity
    await this.activityService.create(req.user.id, ActivityEnum.LOGIN, req);

    // Returning success response with user data
    return ApiRes.ok(data, 'Login successfully');
  }

  // Method for user registration
  async register(req: Request) {
    // Parsing registration data
    const body = registerDto.parse(req.body);
    // Signing up user
    const { message, hash, ttl } = await this.authService.register(body);
    // Returning success response with registration details
    return ApiRes.created({ hash, ttl }, message);
  }
}
