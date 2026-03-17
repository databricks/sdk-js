import type {Credentials} from '@databricks/sdk-auth';

import type {ClientOptions} from '../options/options';

/** HttpRequest represents an outgoing HTTP request. */
export interface HttpRequest {
  /** The URL to send the request to. */
  url: string;

  /** The HTTP method (GET, POST, etc.). */
  method: string;

  /** The request headers. */
  headers: Headers;

  /** The request body. */
  body?: string | ArrayBuffer | Uint8Array | null;

  /** An optional signal to abort the request. */
  signal?: AbortSignal;
}

/** HttpResponse represents the response from an HTTP request. */
export interface HttpResponse {
  /** The HTTP status code. */
  statusCode: number;

  /** The response headers. */
  headers: Headers;

  /** The raw response body stream. */
  body: ReadableStream<Uint8Array> | null;
}

/**
 * HttpClient sends HTTP requests and returns responses.
 */
export interface HttpClient {
  /** Sends an HTTP request and returns the response. */
  send(request: HttpRequest): Promise<HttpResponse>;
}

/**
 * Creates a new HttpClient that uses the Fetch API as its transport.
 */
export function newFetchHttpClient(): HttpClient {
  return {
    async send(request: HttpRequest): Promise<HttpResponse> {
      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        ...(request.body !== undefined && {body: request.body}),
        ...(request.signal !== undefined && {signal: request.signal}),
      });
      return {
        statusCode: response.status,
        headers: response.headers,
        body: response.body,
      };
    },
  };
}

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

  if (opts.credentials === undefined) {
    // TODO: Load default credentials from profile.
    throw new Error('no credentials provided');
  }

  const base = newFetchHttpClient();
  let client: HttpClient = new AuthHttpClient(base, opts.credentials);

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
