import logger from '@repo/logger';
import config from '@/conf/config';
import { singleton } from 'tsyringe';
import { defaultsDeep } from 'lodash';
import { InternalServerError, saveLog } from '@repo/core';
import { type ISendMailOptions, mailer, twilio } from '../notification';

@singleton()
export class NotificationHelper {
  async email(sendMailOptions: ISendMailOptions) {
    const verify = await mailer.verify();
    // check connection configuration
    if (!verify)
      throw new InternalServerError('Failed to connect to mail server');
    // add default from email address
    const options = defaultsDeep(sendMailOptions, {
      from: config.get('smtp.from'),
    });
    // if app is dev so console on print user email
    if (config.get('isDev')) logger.info(`Sending mail to ${options.to}`);
    // after send mail, return the result
    return await mailer.sendMail(options);
  }

  async phone(to: string, body: string) {
    const from: string = config.get('twilio.from');

    const isDev = config.get('isDev');

    // if is dev, message save in logs file
    if (isDev) return saveLog('twilio.log', `"${to}"\n${body}`);

    return await twilio.messages.create({ body, from, to });
  }
}
