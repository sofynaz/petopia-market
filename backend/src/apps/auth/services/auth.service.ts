import { singleton } from 'tsyringe';
import { UserService } from '@/apps/users';
import { ForbiddenError } from '@repo/core';
import { OtpHelper } from '@/shared/helpers';
import { AuthNotification } from '../helpers';
import { Messages } from '@/constants';
import { RegisterDto } from '../dtos';

@singleton()
export class AuthService {
  constructor(
    private otpHelper: OtpHelper,
    private userService: UserService,
    private authNotification: AuthNotification,
  ) {}

  async auth(username: string, password: string) {
    // check user is validate or not
    const user = await this.userService.validateUser(username, password);
    // check user account is blocked
    if (user.is_blocked) throw new ForbiddenError(Messages.USER_IS_BLOCKED);

    return user;
  }

  async register(registerDto: RegisterDto) {
    // create new user account
    const user = await this.userService.create(registerDto);
    // create otp
    const { otp, ttl, hash } = this.otpHelper.generate(user.phone);
    // send otp to user phone
    const message = await this.authNotification.sendRegisterOtp(
      user.phone,
      otp,
    );

    return { ttl, hash, message };
  }
}
