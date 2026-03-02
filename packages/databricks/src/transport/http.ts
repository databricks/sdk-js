import type {Credentials} from '@databricks/sdk-auth';

/** HttpRequest represents an outgoing HTTP request. */
export interface HttpRequest {
  /** The URL to send the request to. */
  url: string;

  /** The HTTP method (GET, POST, etc.). */
  method: string;

  /** The request headers. */
  headers: Headers;

  /** The request body. */
  body?: RequestInit['body'];

  /** An optional signal to abort the request. */
  signal?: AbortSignal;
}

/** HttpResponse represents the response from an HTTP request. */
export interface HttpResponse {
  /** The HTTP status code. */
  statusCode: number;

  /** The response headers. */
  headers: Headers;

  /**
   * Returns the raw response body as bytes. The body is read lazily on the
   * first call and cached for subsequent calls.
   */
  body(): Promise<Uint8Array>;
}

/**
 * HttpClient sends HTTP requests and returns responses. It is the TypeScript
 * equivalent of Go's http.RoundTripper.
 */
export interface HttpClient {
  /** Sends an HTTP request and returns the response. */
  send(request: HttpRequest): Promise<HttpResponse>;
}

/** Options for creating a new HttpClient via {@link newHttpClient}. */
export interface HttpClientOptions {
  /**
   * A custom HttpClient to use. When set, all other options are ignored and
   * the provided client is returned as-is.
   */
  httpClient?: HttpClient;

  /** Credentials to use for authenticating requests. */
  credentials?: Credentials;
}

/**
 * Creates a new HTTP client with the given options.
 *
 * If a custom httpClient is provided, it is returned as-is without any
 * additional configuration. Otherwise, a new fetch-based client is created
 * with authentication header injection.
 */
export function newHttpClient(options: HttpClientOptions): HttpClient {
  // If an HTTP client is provided, use it as is without any additional
  // configuration.
  if (options.httpClient !== undefined) {
    return options.httpClient;
  }

  if (options.credentials === undefined) {
    // TODO: Load default credentials from profile.
    throw new Error('no credentials provided');
  }

  const base = newFetchHttpClient();
  return newAuthHttpClient(base, options.credentials);
}

/**
 * Creates a new HttpClient that uses the Fetch API as its transport.
 *
 * This works in both Node.js (>= 18) and browser environments as both
 * provide a global fetch implementation.
 */
export function newFetchHttpClient(): HttpClient {
  return {
    async send(request: HttpRequest): Promise<HttpResponse> {
      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        signal: request.signal,
      });
      let cached: Uint8Array | undefined;
      return {
        statusCode: response.status,
        headers: response.headers,
        async body(): Promise<Uint8Array> {
          if (cached === undefined) {
            cached = new Uint8Array(await response.arrayBuffer());
          }
          return cached;
        },
      };
    },
  };
}

/**
 * Creates an HttpClient that wraps a base client and injects authentication
 * headers into every request. The original request's headers are not modified;
 * a clone is created instead.
 */
export function newAuthHttpClient(
  base: HttpClient,
  credentials: Credentials
): HttpClient {
  return {
    async send(request: HttpRequest): Promise<HttpResponse> {
      const authHeaders = await credentials.authHeaders();
      // Clone the headers to avoid mutating the original request.
      const headers = new Headers(request.headers);
      for (const h of authHeaders) {
        headers.set(h.key, h.value);
      }
      return base.send({...request, headers});
    },
  };
}
