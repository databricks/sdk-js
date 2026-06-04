import {describe, expect, it, vi} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';
import type {Logger} from '@databricks/sdk-core/logger';
import {PostgresClient} from '@databricks/sdk-postgres/v1';

const HOST = 'https://test.cloud.databricks.com';

// A project body that also carries a secret-bearing field. Unknown keys are
// stripped by the response schema, but the raw body is logged before parsing,
// so the redaction path still sees the secret.
const PROJECT_WIRE = {
  name: 'projects/demo',
  password: 'super-secret-value',
};

// Wraps a JS value as a 200 HttpResponse with a streamed JSON body. The
// response also sets an Authorization header to exercise header redaction.
function jsonResponse(body: unknown): HttpResponse {
  return {
    statusCode: 200,
    headers: new Headers({
      'content-type': 'application/json',
      authorization: 'Bearer server-secret',
    }),
    body: new Response(JSON.stringify(body)).body,
  };
}

function stubClient(): HttpClient {
  return {
    send(_request: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve(jsonResponse(PROJECT_WIRE));
    },
  };
}

function mockLogger(): Logger {
  return {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  };
}

// Pulls the object logged alongside the 'HTTP response' debug message.
function responseLog(logger: Logger): Record<string, unknown> {
  const calls = (logger.debug as ReturnType<typeof vi.fn>).mock.calls;
  const call = calls.find(c => c[0] === 'HTTP response');
  if (call === undefined) {
    throw new Error('no HTTP response debug log was emitted');
  }
  return call[1] as Record<string, unknown>;
}

describe('debug HTTP body logging', () => {
  it('does not log anything with the default logger', async () => {
    const client = new PostgresClient({host: HOST, httpClient: stubClient()});
    // The default NoOpLogger silently discards everything; nothing to assert
    // beyond the call completing without surfacing the body anywhere.
    await expect(
      client.getProject({name: 'projects/demo'})
    ).resolves.toBeDefined();
  });

  it('logs the response body redacted when a debug logger is supplied', async () => {
    const logger = mockLogger();
    const client = new PostgresClient({
      host: HOST,
      httpClient: stubClient(),
      logger,
    });

    await client.getProject({name: 'projects/demo'});

    const log = responseLog(logger);
    const body = log.body as string;
    // The body IS logged, with the secret field redacted, not in plaintext.
    expect(body).toContain('**REDACTED**');
    expect(body).not.toContain('super-secret-value');
    // Headers are omitted unless debugHeaders is set.
    expect(log.headers).toBeUndefined();
  });

  it('logs redacted headers only when debugHeaders is enabled', async () => {
    const logger = mockLogger();
    const client = new PostgresClient({
      host: HOST,
      httpClient: stubClient(),
      logger,
      debugHeaders: true,
    });

    await client.getProject({name: 'projects/demo'});

    const headers = responseLog(logger).headers as Record<string, string>;
    // The Authorization header is always redacted, never shown in plaintext.
    expect(headers.authorization).toBe('REDACTED');
    expect(JSON.stringify(headers)).not.toContain('server-secret');
  });
});
