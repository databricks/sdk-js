import {describe, expect, it} from 'vitest';

import type {Credentials} from '@databricks/sdk-auth';
import type {HttpClient} from '@databricks/sdk-core/http';

import type {ClientOptions} from '../../src/client';

describe('ClientOptions', () => {
  it('accepts every documented field', () => {
    const httpClient: HttpClient = {
      send() {
        return Promise.resolve({
          statusCode: 200,
          headers: new Headers(),
          body: null,
        });
      },
    };
    const credentials: Credentials = {
      name: () => 'test',
      authHeaders: () => Promise.resolve([]),
    };
    const calls: string[] = [];
    const logger = {
      debug: (msg: string): void => calls.push(`debug:${msg}`),
      info: (msg: string): void => calls.push(`info:${msg}`),
      warn: (msg: string): void => calls.push(`warn:${msg}`),
      error: (msg: string): void => calls.push(`error:${msg}`),
    };

    const opts: ClientOptions = {
      host: 'https://example.cloud.databricks.com',
      httpClient,
      credentials,
      timeout: 7_000,
      logger,
    };

    expect(opts.host).toBe('https://example.cloud.databricks.com');
    expect(opts.httpClient).toBe(httpClient);
    expect(opts.credentials).toBe(credentials);
    expect(opts.timeout).toBe(7_000);
    expect(opts.logger).toBe(logger);
  });

  it('defaults to an empty object', () => {
    const opts: ClientOptions = {};

    expect(opts.host).toBeUndefined();
    expect(opts.httpClient).toBeUndefined();
    expect(opts.credentials).toBeUndefined();
    expect(opts.timeout).toBeUndefined();
    expect(opts.logger).toBeUndefined();
  });

  it('accepts the global console as a logger', () => {
    const opts: ClientOptions = {logger: console};

    expect(opts.logger).toBe(console);
  });
});
