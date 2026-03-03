import {describe, it, expect, vi, beforeEach} from 'vitest';
import {NoOpLogger, LogLevel} from '../../src/logger/logger';
import type {Logger, Level} from '../../src/logger/logger';

describe('NoOpLogger', () => {
  it('satisfies the Logger interface', () => {
    const logger: Logger = new NoOpLogger();
    // Calling every method must not throw.
    logger.debug('debug');
    logger.info('info');
    logger.warn('warn');
    logger.error('error');
  });
});

describe('LogLevel', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const methods = ['debug', 'info', 'warn', 'error'] as const;

  // Table mapping each level to the set of methods that should be forwarded.
  const levelCases: {level: Level; active: readonly string[]}[] = [
    {level: 'debug', active: ['debug', 'info', 'warn', 'error']},
    {level: 'info', active: ['info', 'warn', 'error']},
    {level: 'warn', active: ['warn', 'error']},
    {level: 'error', active: ['error']},
    {level: 'off', active: []},
  ];

  it.each(levelCases)('level "$level" forwards $active', ({level, active}) => {
    const mock: Logger = {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
    const logger = new LogLevel(level, mock);

    for (const m of methods) {
      logger[m]('msg', 42);
    }

    for (const m of methods) {
      if (active.includes(m)) {
        expect(mock[m]).toHaveBeenCalledWith('msg', 42);
      } else {
        expect(mock[m]).not.toHaveBeenCalled();
      }
    }
  });

  it('defaults to console as the underlying logger', () => {
    const debugSpy = vi
      .spyOn(console, 'debug')
      .mockImplementation(() => undefined);
    const infoSpy = vi
      .spyOn(console, 'info')
      .mockImplementation(() => undefined);

    const logger = new LogLevel('info');
    logger.debug('should be silent');
    logger.info('should be emitted');

    expect(debugSpy).not.toHaveBeenCalled();
    expect(infoSpy).toHaveBeenCalledWith('should be emitted');
  });

  it('satisfies the Logger interface', () => {
    const logger: Logger = new LogLevel('debug');
    expect(logger).toBeInstanceOf(LogLevel);
  });
});
