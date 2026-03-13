import {describe, it, expect} from 'vitest';
import {
  withHost,
  withCredentials,
  withTimeout,
  withLogger,
  withHttpClient,
  resolveOptions,
} from '../../src/options/options';
import type {Credentials, Header} from '@databricks/sdk-auth';
import type {Logger} from '../../src/options/options';

describe('resolveOptions', () => {
  it('should return empty options when no options are provided', () => {
    const result = resolveOptions();
    expect(result.host).toBeUndefined();
    expect(result.credentials).toBeUndefined();
    expect(result.timeoutMs).toBeUndefined();
    expect(result.logger).toBeUndefined();
  });

  it('should set host via withHost', () => {
    const result = resolveOptions(
      withHost('https://my-workspace.cloud.databricks.com')
    );
    expect(result.host).toBe('https://my-workspace.cloud.databricks.com');
  });

  it('should set credentials via withCredentials', () => {
    const creds: Credentials = {
      authHeaders(): Promise<Header[]> {
        return Promise.resolve([{key: 'Authorization', value: 'Bearer token'}]);
      },
    };
    const result = resolveOptions(withCredentials(creds));
    expect(result.credentials).toBe(creds);
  });

  it('should set timeout via withTimeout', () => {
    const result = resolveOptions(withTimeout(5000));
    expect(result.timeoutMs).toBe(5000);
  });

  it('should set logger via withLogger', () => {
    const logger: Logger = {
      debug(): void {
        // Intentionally empty.
      },
      info(): void {
        // Intentionally empty.
      },
      warn(): void {
        // Intentionally empty.
      },
      error(): void {
        // Intentionally empty.
      },
    };
    const result = resolveOptions(withLogger(logger));
    expect(result.logger).toBe(logger);
  });

  it('should set httpClient via withHttpClient', () => {
    const mockFetch = (): Promise<Response> =>
      Promise.resolve(new Response('ok'));
    const result = resolveOptions(withHttpClient(mockFetch));
    expect(result.httpClient).toBe(mockFetch);
  });

  it('should allow chaining multiple options', () => {
    const result = resolveOptions(
      withHost('https://example.com'),
      withTimeout(3000)
    );
    expect(result.host).toBe('https://example.com');
    expect(result.timeoutMs).toBe(3000);
  });

  it('should allow later options to override earlier ones', () => {
    const result = resolveOptions(
      withHost('https://first.com'),
      withHost('https://second.com')
    );
    expect(result.host).toBe('https://second.com');
  });
});
