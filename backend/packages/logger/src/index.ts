import winston from 'winston';
import { prettyPrint } from './formats';
import { LEVEL_LABEL, LEVELS } from './constant';

const logger = winston.createLogger({
  level: LEVEL_LABEL,
  levels: LEVELS,
  format: prettyPrint(process.env.NAME || 'Server'),
  transports: [
    new winston.transports.File({
      level: 'info',
      dirname: 'logs',
      filename: 'combined.log',
      format: winston.format.uncolorize(),
    }),
    new winston.transports.File({
      level: 'error',
      dirname: 'logs',
      filename: 'errors.log',
      format: winston.format.uncolorize(),
    }),
    new winston.transports.Console({
      level: 'info',
    }),
  ],
});

export default logger;
