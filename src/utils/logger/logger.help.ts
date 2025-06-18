import logger from './loggerUtils';

class LogHelper {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  info(message: string) {
    logger.info(`[${this.context}] ${message}`);
  }

  error(message: string) {
    logger.error(`[${this.context}] ${message}`);
  }

  warn(message: string) {
    logger.warn(`[${this.context}] ${message}`);
  }

  debug(message: string) {
    logger.debug(`[${this.context}] ${message}`);
  }
}

export default (context: string) => new LogHelper(context);
