// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {APIError} from '@databricks/sdk-databricks/apierror';
import type {Logger} from '@databricks/sdk-databricks/logger';
import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-databricks/transport';
import type {z} from 'zod';

export interface HttpCallOptions {
  readonly request: HttpRequest;
  readonly httpClient: HttpClient;
  readonly logger: Logger;
}

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

export async function executeHttpCall(
  opts: HttpCallOptions
): Promise<Uint8Array> {
  opts.logger.debug('HTTP request', {
    method: opts.request.method,
    url: opts.request.url,
  });

  let resp: HttpResponse;
  try {
    resp = await opts.httpClient.send(opts.request);
  } catch (e: unknown) {
    opts.logger.debug('HTTP request failed');
    throw e;
  }

  const body = await readAll(resp.body);

  opts.logger.debug('HTTP response', {
    statusCode: resp.statusCode,
    body: new TextDecoder().decode(body),
  });

  const apiErr = APIError.fromHttpError(resp.statusCode, resp.headers, body);
  if (apiErr !== undefined) {
    throw apiErr;
  }

  return body;
}

export function buildHttpRequest(
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

export function parseResponse<T>(body: Uint8Array, schema: z.ZodType<T>): T {
  const text = new TextDecoder().decode(body);
  const parsed: unknown = JSON.parse(text);
  return schema.parse(parsed);
}

export function marshalRequest(data: unknown, schema: z.ZodType): string {
  return JSON.stringify(schema.parse(data));
}

export function flattenQueryParams(
  prefix: string,
  value: unknown,
  params: URLSearchParams
): void {
  if (value === null || value === undefined) {
    return;
  }
  if (Array.isArray(value)) {
    // arrays of objects are not yet supported
    for (const item of value) {
      params.append(prefix, String(item));
    }
  } else if (typeof value === 'object') {
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      flattenQueryParams(`${prefix}.${key}`, val, params);
    }
  } else if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  ) {
    params.append(prefix, String(value));
  } else {
    throw new Error(`Unsupported query parameter type: ${typeof value}`);
  }
}

/**
 * Sends an HTTP request and checks for API errors. On non-2xx responses the
 * body is buffered and parsed into an APIError. On 2xx the raw HttpResponse
 * is returned with the body stream untouched.
 */
export async function sendAndCheckError(
  opts: HttpCallOptions
): Promise<HttpResponse> {
  opts.logger.debug('HTTP request', {
    method: opts.request.method,
    url: opts.request.url,
  });

  let resp: HttpResponse;
  try {
    resp = await opts.httpClient.send(opts.request);
  } catch (e: unknown) {
    opts.logger.debug('HTTP request failed');
    throw e;
  }

  opts.logger.debug('HTTP response', {statusCode: resp.statusCode});

  if (resp.statusCode < 200 || resp.statusCode >= 300) {
    const body = await readAll(resp.body);
    const apiErr = APIError.fromHttpError(resp.statusCode, resp.headers, body);
    if (apiErr !== undefined) {
      throw apiErr;
    }
    throw new Error(`unexpected HTTP status ${String(resp.statusCode)}`);
  }

  return resp;
}
