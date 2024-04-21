import * as z from 'zod';

// env validation schema
const schema = z.object({
  PORT: z.coerce.number().default(3000),
  NAME: z.string(),
  HOST: z.string(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  SECRET: z.string(),

  // database
  DATABASE_URL: z.string(),

  // jwt
  JWT_ACCESS_EXP: z.string().default('30m'),
  JWT_REFRESH_EXP: z.string().default('30d'),
  JWT_RESET_PASSWORD_EXP: z.string().default('1h'),

  // smtp
  EMAIL_PORT: z.coerce.number(),
  EMAIL_HOST: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  EMAIL_FROM: z.string(),

  // twilio
  TWILIO_FROM: z.string(),
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),

  // s3 bucket
  AWS_REGION: z.string(),
  AWS_BUCKET: z.string(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_KEY: z.string(),
});

export default schema;

export type EnvSchema = z.infer<typeof schema>;
