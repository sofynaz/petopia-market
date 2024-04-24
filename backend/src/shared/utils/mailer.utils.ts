import logger from '@repo/logger';
import config from '@/conf/config';
import { ejsCompiler } from '@repo/core';
import { createTransport, SendMailOptions } from 'nodemailer';

// interface and types
export interface ISendMailOptions extends SendMailOptions {
  context?: Record<string, any>;
  template?: string;
}

// create transporter instance
export const mailer = createTransport({
  host: config.get('smtp.host'),
  port: config.get('smtp.port'),
  auth: {
    user: config.get('smtp.user'),
    pass: config.get('smtp.pass'),
  },
});

// compiler
mailer.use('compile', async (mail, callback) => {
  const { template, context } = mail.data as any;
  // if template is not empty, use the template to compile ejs template
  if (template) {
    try {
      mail.data.html = await ejsCompiler(template, context);
    } catch (error) {
      logger.error(error);
      return callback(error as Error);
    }
  }
  return callback();
});
