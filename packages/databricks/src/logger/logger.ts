/**
 * Logger interface and built-in implementations.
 *
 * @packageDocumentation
 */

/** Supported log levels in order of increasing severity. */
export type Level = 'debug' | 'info' | 'warn' | 'error' | 'off';

/**
 * A logger that receives messages at different severity levels.
 *
 * The method signatures are intentionally compatible with the global
 * {@link Console} object so that `console` can be used as a Logger when level
 * filtering is not needed.
 */
export interface Logger {
  /** Logs a debug-level message. */
  debug(message: string, ...args: unknown[]): void;

  /** Logs an info-level message. */
  info(message: string, ...args: unknown[]): void;

  /** Logs a warn-level message. */
  warn(message: string, ...args: unknown[]): void;

  /** Logs an error-level message. */
  error(message: string, ...args: unknown[]): void;
}

/** A logger that silently discards all messages. */
export class NoOpLogger implements Logger {
  debug(): void {
    // Intentionally empty.
  }

  info(): void {
    // Intentionally empty.
  }

  warn(): void {
    // Intentionally empty.
  }

  error(): void {
    // Intentionally empty.
  }
}

// Numeric severity used by LogLevel to gate calls.
const LEVEL_SEVERITY: Record<Level, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  off: 4,
};

/**
 * A decorator that adds level filtering to any {@link Logger}.
 *
 * Only messages at or above the configured minimum level are forwarded to the
 * underlying logger. The default underlying logger is `console`.
 *
 * @example
 * ```typescript
 * // Only warn and error go to console.
 * const logger = new LogLevel('warn');
 * ```
 */
export class LogLevel implements Logger {
  private readonly threshold: number;
  private readonly logger: Logger;

  constructor(level: Level, logger: Logger = console) {
    this.threshold = LEVEL_SEVERITY[level];
    this.logger = logger;
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.threshold <= LEVEL_SEVERITY.debug) {
      this.logger.debug(message, ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.threshold <= LEVEL_SEVERITY.info) {
      this.logger.info(message, ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.threshold <= LEVEL_SEVERITY.warn) {
      this.logger.warn(message, ...args);
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.threshold <= LEVEL_SEVERITY.error) {
      this.logger.error(message, ...args);
    }
  }
}
