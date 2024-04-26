import { Config } from '@repo/core';
import schema, { type EnvSchema } from './schema';

const _package = require('../../package.json');

const format = (env: EnvSchema): Record<string, any> => ({
  name: env.NAME,
  port: env.PORT,
  host: env.HOST,
  secret: env.SECRET,
  nodeEnv: env.NODE_ENV,
  isDev: env.NODE_ENV === 'development',
  // package
  package: {
    version: _package.version,
    author: _package.author,
    message: `Welcome to ${env.NAME} RestAPI's`,
  },
  // database
  db: {
    url: env.DATABASE_URL,
  },
  // cors origin
  cors: {
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    credentials: true,
  },
  // jwt
  jwt: {
    issuer: env.NAME,
    secret: env.SECRET,
    accessExp: env.JWT_ACCESS_EXP,
    refreshExp: env.JWT_REFRESH_EXP,
    resetPasswordExp: env.JWT_RESET_PASSWORD_EXP,
  },
  // smtp
  smtp: {
    host: env.EMAIL_HOST,
    pass: env.EMAIL_PASS,
    port: env.EMAIL_PORT,
    user: env.EMAIL_USER,
    from: env.EMAIL_FROM,
  },
  // twilio
  twilio: {
    from: env.TWILIO_FROM,
    accountSid: env.TWILIO_ACCOUNT_SID,
    authToken: env.TWILIO_AUTH_TOKEN,
  },
  // aws s3 bucket
  awsS3: {
    region: env.AWS_REGION,
    bucket: env.AWS_BUCKET,
    accessKey: env.AWS_ACCESS_KEY,
    secretKey: env.AWS_SECRET_KEY,
    contentType: {
      image: ['png', 'jpg', 'jpeg'],
    },
    expiresIn: '1m', // signed url expires in 1 minute
  },
  // otp
  otp: {
    length: 6,
    expiresIn: '5m', // otp expires in 5 minute
    issuer: env.NAME,
    secret: env.SECRET,
  },
});

// make config instance
export default new Config({ schema, format });
