import { UserService } from '@/apis/user';
import { OtpHelper } from '@/shared/helpers';
import { AuthNotification } from '../auth.notification';
import { ForbiddenError } from '@repo/core';
import { Messages } from '@/constants';
import { RegisterDto, VerifyEmailDto } from '../dtos';
import { singleton } from 'tsyringe';

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
    const { otp, ttl, hash } = this.otpHelper.generate(user.email);
    // send otp to user email
    const message = await this.authNotification.sendVerifyCodeOnEmail(
      user.email,
      otp,
    );
    return { ttl, hash, message };
  }

  async resentEmailOtp(email: string) {
    const user = await this.userService.findByEmail(email);
    // check user is already verified
    if (user.is_email_verify)
      throw new ForbiddenError(Messages.USER_EMAIL_ALREADY_VERIFIED);
    // create otp
    const { otp, ttl, hash } = this.otpHelper.generate(user.email);
    // send otp to user email
    const message = await this.authNotification.sendVerifyCodeOnEmail(
      user.email,
      otp,
    );
    return { ttl, hash, message };
  }

  async verifyEmailOtp({ hash, otp, email }: VerifyEmailDto) {
    // verify otp
    const isVerify = this.otpHelper.verify(email, otp, hash);
    // check otp is valid or not
    if (!isVerify) throw new ForbiddenError(Messages.INVALID_OTP);
    // find user by email
    let user = await this.userService.findByEmail(email);
    // check user is already verified
    if (user.is_email_verify)
      throw new ForbiddenError(Messages.USER_EMAIL_ALREADY_VERIFIED);
    // update phone verified
    user.is_email_verify = true;
    // save update
    user = await user.save();
    // send welcome email
    await this.authNotification.sendWelcomeEmail(user.email, user.fullname);

    return user;
  }
}
