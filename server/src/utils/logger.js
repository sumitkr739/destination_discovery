const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

class Logger {
  constructor(context = 'App') {
    this.context = context;
  }

  formatMessage(level, message, meta = {}) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      context: this.context,
      message,
      ...meta
    });
  }

  error(message, error = null) {
    const meta = error ? { error: error.message, stack: error.stack } : {};
    console.error(this.formatMessage(LOG_LEVELS.ERROR, message, meta));
  }

  warn(message, meta = {}) {
    console.warn(this.formatMessage(LOG_LEVELS.WARN, message, meta));
  }

  info(message, meta = {}) {
    console.log(this.formatMessage(LOG_LEVELS.INFO, message, meta));
  }

  debug(message, meta = {}) {
    if (process.env.NODE_ENV === 'development') {
      console.log(this.formatMessage(LOG_LEVELS.DEBUG, message, meta));
    }
  }
}

export default Logger;
