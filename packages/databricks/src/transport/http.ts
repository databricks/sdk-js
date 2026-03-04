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
