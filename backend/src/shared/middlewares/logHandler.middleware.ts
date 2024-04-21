import morgan from 'morgan';
import logger from '@repo/logger';

type LogType = 'error' | 'info' | 'warn';

export const logHandler = (type: LogType[] = []) => {
  type = type.length ? type : ['info', 'error', 'warn'];

  const Formats = `":method :url HTTP/:http-version" :status - :response-time ms`;

  const isBetween = (code: number) => (min: number, max: number) =>
    code >= min && code < max;

  return type.map((t) =>
    morgan(Formats, {
      skip: (_, res) =>
        t === 'info'
          ? !isBetween(res.statusCode)(1, 300)
          : t === 'warn'
            ? !isBetween(res.statusCode)(300, 400)
            : res.statusCode < 400,
      stream: { write: (message) => logger[t](message.trim()) },
    }),
  );
};
