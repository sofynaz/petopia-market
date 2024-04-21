import { format, Logform } from 'winston';

export const logError: Logform.FormatWrap = format((info) => {
  if (info?.level === 'error' && info instanceof Error) {
    return {
      ...info,
      message: `${info.message as string}${
        info.stack ? `\n${info.stack}` : ''
      }`,
    };
  }

  return info;
});
