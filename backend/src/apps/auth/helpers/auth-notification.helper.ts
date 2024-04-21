import config from '@/conf/config';
import { mask } from '@repo/core';
import { singleton } from 'tsyringe';
import { NotificationHelper } from '@/shared/helpers';

@singleton()
export class AuthNotification {
  private issue: string = config.get('name');

  constructor(private messenger: NotificationHelper) {}

  async sendRegisterOtp(phone: string, otp: string) {
    // message of register phone
    const body: string = `${this.issue}: Use OTP ${otp} to reset your password. Do NOT SHARE this code with anyone.`;
    // send otp to user phone
    await this.messenger.phone(phone, body);
    // response message
    return `Verification otp sent on ${mask.phoneMask(phone)}`;
  }

  async sendResetPasswordOtp(phone: string, otp: string) {
    // message of forgot password
    const message: string = `${this.issue}: Use OTP ${otp} to reset your password. Do NOT SHARE this code with anyone.`;
    // send message on phone
    await this.messenger.phone(phone, message);
    // response message
    return `Verification otp sent on ${mask.phoneMask(phone)}`;
  }
}
