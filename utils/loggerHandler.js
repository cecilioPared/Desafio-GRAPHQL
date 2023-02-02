import winston from 'winston';

const logger = winston.createLogger({
      level: 'info',
      transports: [
            new winston.transports.Console({ level: 'info' }),
            new winston.transports.File({
                  filename: './logs/warn.log',
                  level: 'warn',
            }),
            new winston.transports.File({
                  filename: './logs/error.log',
                  level: 'error',
            }),
      ],
});

export default logger;