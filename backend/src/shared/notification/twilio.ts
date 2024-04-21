import config from '@/conf/config';
import { type ClientOpts, Twilio } from 'twilio';

// create twilio client
function createTwilioClient(options?: ClientOpts): Twilio {
  const authToken = config.get<string>('twilio.authToken');
  const accountSid = config.get<string>('twilio.accountSid');

  return new Twilio(accountSid, authToken, options);
}

// client of twilio
export const twilio = createTwilioClient({ lazyLoading: true });
