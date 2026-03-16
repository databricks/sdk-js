import {APIError} from '@databricks/sdk-databricks/apierror';
import type {Logger} from '@databricks/sdk-databricks/logger';
import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-databricks/transport';
import type {z} from 'zod';

interface HttpCallOptions {
  readonly request: HttpRequest;
  readonly httpClient: HttpClient;
  readonly logger: Logger;
}

// Reads the entire body of an HTTP response into a Uint8Array.
async function readAll(
  body: ReadableStream<Uint8Array> | null
): Promise<Uint8Array> {
  if (body === null) {
    return new Uint8Array(0);
  }
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  for (;;) {
    const {done, value} = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
  }
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

/**
 * Executes an HTTP call and returns the response body or throws an error.
 * This function takes care of logging the request and response.
 */
async function executeHttpCall(opts: HttpCallOptions): Promise<Uint8Array> {
  opts.logger.debug('HTTP request', opts.request.method, opts.request.url);

  let resp: HttpResponse;
  try {
    resp = await opts.httpClient.send(opts.request);
  } catch (e: unknown) {
    opts.logger.debug('HTTP request failed');
    throw e;
  }

  const body = await readAll(resp.body);

  opts.logger.debug(
    'HTTP response',
    resp.statusCode,
    new TextDecoder().decode(body)
  );

  const apiErr = APIError.fromHttpError(resp.statusCode, resp.headers, body);
  if (apiErr !== undefined) {
    throw apiErr;
  }

  return body;
}

/**
 * Builds an HttpRequest with common defaults. The Content-Type header is
 * always set to application/json.
 */
function buildHttpRequest(
  method: string,
  url: string,
  signal?: AbortSignal,
  body?: string
): HttpRequest {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  const req: HttpRequest = {url, method, headers};
  if (body !== undefined) {
    req.body = body;
  }
  if (signal !== undefined) {
    req.signal = signal;
  }
  return req;
}

/**
 * Parses a JSON response body using the given Zod schema. The schema
 * validates and transforms the wire-format JSON into the expected
 * camelCase TypeScript type.
 */
function parseResponse<T>(body: Uint8Array, schema: z.ZodType<T>): T {
  const text = new TextDecoder().decode(body);
  const parsed: unknown = JSON.parse(text);
  return schema.parse(parsed);
}

/**
 * Serializes a camelCase object to a JSON string in snake_case wire format
 * using the given Zod marshal schema.
 */
function marshalRequest(data: unknown, schema: z.ZodType): string {
  return JSON.stringify(schema.parse(data));
}

// Builds a URL from a base path and optional query parameters. Undefined
// values are silently omitted from the query string.
function buildUrl(
  host: string,
  path: string,
  params?: Record<string, string | number | undefined>
): string {
  let url = `${host}${path}`;
  if (params !== undefined) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        searchParams.set(key, String(value));
      }
    }
    const query = searchParams.toString();
    if (query !== '') {
      url = `${url}?${query}`;
    }
  }
  return url;
}

export {
  buildHttpRequest,
  buildUrl,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  readAll,
};
