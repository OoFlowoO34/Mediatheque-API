import logger from './loggerUtils';

class LogHelper {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  info(message: string) {
    logger.info(`[${this.context}] ${message}`);
  }

  error(error: Error | string) {
    if (error instanceof Error) {
      // If the error is an instance of Error, log it with stack trace
      logger.error(error);
    } else {
      // If it's not an Error instance, log it as a string
      logger.error(`[${this.context}] ${String(error)}`);
    }
  }

  warn(message: string) {
    logger.warn(`[${this.context}] ${message}`);
  }

  debug(message: string) {
    logger.debug(`[${this.context}] ${message}`);
  }
}

export default (context: string) => new LogHelper(context);
export { LogHelper };