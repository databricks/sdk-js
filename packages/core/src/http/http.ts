/**
 * HTTP transport primitives. Defines the {@link HttpClient} interface and a
 * {@link newFetchHttpClient} implementation backed by the Fetch API.
 *
 * @module
 */

/** HttpRequest represents an outgoing HTTP request. */
export interface HttpRequest {
  /** The URL to send the request to. */
  url: string;

  /** The HTTP method (GET, POST, etc.). */
  method: string;

  /** The request headers. */
  headers: Headers;

  /** The request body. */
  body?: string | ArrayBuffer | Uint8Array | ReadableStream<Uint8Array> | null;

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
      const init: RequestInit = {
        method: request.method,
        headers: request.headers,
      };
      if (request.body !== undefined) {
        init.body = request.body;
        // The Fetch spec requires duplex: 'half' for streaming request bodies.
        // See https://fetch.spec.whatwg.org/#dom-requestinit-duplex.
        if (request.body instanceof ReadableStream) {
          init.duplex = 'half';
        }
      }
      if (request.signal !== undefined) {
        init.signal = request.signal;
      }
      const response = await fetch(request.url, init);
      return {
        statusCode: response.status,
        headers: response.headers,
        body: response.body,
      };
    },
  };
}
