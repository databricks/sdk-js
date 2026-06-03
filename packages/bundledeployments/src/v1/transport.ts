// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Credentials} from '@databricks/sdk-auth';
import {defaultCredentials} from '@databricks/sdk-auth/credentials';
import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';
import {newFetchHttpClient} from '@databricks/sdk-core/http';
import type {ClientOptions} from '@databricks/sdk-options/client';

/** Creates a new HTTP client with the given options. */
export function newHttpClient(options?: ClientOptions): HttpClient {
  const opts = options ?? {};

  // If an HTTP client is provided, use it as-is. Throw if other options are
  // also set, since they would be silently ignored.
  if (opts.httpClient !== undefined) {
    if (opts.credentials !== undefined || opts.timeout !== undefined) {
      throw new Error(
        'httpClient cannot be combined with credentials or timeout'
      );
    }
    return opts.httpClient;
  }

  const credentials = opts.credentials ?? defaultCredentials();

  const base = newFetchHttpClient();
  let client: HttpClient = new AuthHttpClient(base, credentials);

  if (opts.timeout !== undefined) {
    client = new TimeoutHttpClient(client, opts.timeout);
  }

  return client;
}

/** Wraps an HttpClient and adds authentication headers to requests. */
class AuthHttpClient implements HttpClient {
  constructor(
    private readonly base: HttpClient,
    private readonly credentials: Credentials
  ) {}

  async send(request: HttpRequest): Promise<HttpResponse> {
    const authHeaders = await this.credentials.authHeaders();
    // Do not modify the original request.
    const headers = new Headers(request.headers);
    for (const h of authHeaders) {
      headers.set(h.key, h.value);
    }
    return this.base.send({...request, headers});
  }
}

/** Wraps an HttpClient and applies a default timeout to requests. */
class TimeoutHttpClient implements HttpClient {
  constructor(
    private readonly base: HttpClient,
    private readonly timeout: number
  ) {}

  async send(request: HttpRequest): Promise<HttpResponse> {
    const timeoutSignal = AbortSignal.timeout(this.timeout);
    const signal =
      request.signal !== undefined
        ? AbortSignal.any([request.signal, timeoutSignal])
        : timeoutSignal;
    return this.base.send({...request, signal});
  }
}
