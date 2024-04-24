import { mask } from '@repo/core';
import config from '@/conf/config';
import { singleton } from 'tsyringe';
import { NotificationHelper } from '@/shared/helpers';

@singleton()
export class AuthNotification {
  private issuer: string = config.get('name');

  constructor(private notification: NotificationHelper) {}

  async sendVerifyCodeOnEmail(email: string, code: string) {
    // send verification code in email phone
    await this.notification.onEmail({
      to: email,
      subject: `Verify your email to use ${this.issuer}`,
      template: 'verification-email.ejs',
      context: {
        code,
        issuer: this.issuer,
      },
    });
    // response message
    return `Verification otp sent on ${mask.emailMask(email)}`;
  }

  async sendWelcomeEmail(email: string, username: string) {
    await this.notification.onEmail({
      to: email,
      subject: `Welcome to ${this.issuer}`,
      template: 'welcome-email.ejs',
      context: {
        username,
        loginUrl: '#',
        issuer: this.issuer,
      },
    });
  }
}
