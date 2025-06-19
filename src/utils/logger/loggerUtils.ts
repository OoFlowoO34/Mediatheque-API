import { createLogger, format, transports } from 'winston';

const { timestamp, combine, colorize, printf, errors } = format;
const logFormat = printf(({ timestamp, level, message, stack }) => {
    return stack
        ? `[${timestamp}] ${level}: ${message}\n${stack}`
        : `[${timestamp}] ${level}: ${message}`;
    });
    
const logger = createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
    
  // Default format applied to all transports unless overridden
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),

  transports: [
    // Console transport: overrides default format to add colors
    new transports.Console({
      format: combine(
        colorize(), // Adds color to the log level (info, warn, error)
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat
      ),
    }),

    // File transport for error logs: uses default format (no color)
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    // File transport for all combined logs (info and above)
    new transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

export default logger;
