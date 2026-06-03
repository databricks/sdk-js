// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Options} from '@databricks/sdk-core/ops';
import {execute, retryOn} from '@databricks/sdk-core/ops';
import {ApiError} from '@databricks/sdk-core/apierror';
import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';
import type {Logger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {LroOptions} from '@databricks/sdk-options/lro';
import JSONBig from 'json-bigint';
import type {z} from 'zod';

// JSON codec that preserves int64 precision. On the way in, large integer
// literals come back as bigint instead of being rounded to JS Number. On the
// way out, bigint values are emitted as raw JSON number digits.
const jsonBigint = JSONBig({useNativeBigInt: true});

export interface HttpCallOptions {
  readonly request: HttpRequest;
  readonly httpClient: HttpClient;
  readonly logger: Logger;
}

/**
 * Translates public CallOptions to the internal Options shape accepted by
 * execute(). Even though the shapes match today, this isolates the public
 * API from the executor's internal type so they can diverge.
 */
export async function executeCall(
  call: (signal?: AbortSignal) => Promise<void>,
  options?: CallOptions
): Promise<void> {
  const opts: Options = {
    ...(options?.retrier !== undefined && {retrier: options.retrier}),
    ...(options?.rateLimiter !== undefined && {
      rateLimiter: options.rateLimiter,
    }),
    ...(options?.timeout !== undefined && {timeout: options.timeout}),
  };
  return execute(options?.signal, call, opts);
}

/**
 * Sentinel thrown by a polling call to signal that the operation has not
 * yet reached a terminal state. {@link executeWait} treats this error as
 * retriable; any other error aborts the wait.
 */
export class StillRunningError extends Error {}

/**
 * Polls until the call returns without throwing {@link StillRunningError}.
 * Abort and overall-deadline behavior come from the supplied LroOptions.
 */
export async function executeWait(
  call: (signal?: AbortSignal) => Promise<void>,
  options?: LroOptions
): Promise<void> {
  const opts: Options = {
    ...(options?.timeout !== undefined && {timeout: options.timeout}),
    retrier: () =>
      retryOn({}, (err: Error) => err instanceof StillRunningError),
  };
  return execute(options?.signal, call, opts);
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

  // Log only statusCode. The body can contain plaintext secrets, e.g.
  // getSecret(), so logging it would leak them into debug logs.
  opts.logger.debug('HTTP response', {statusCode: resp.statusCode});

  const apiErr = ApiError.fromHttpError(resp.statusCode, resp.headers, body);
  if (apiErr !== undefined) {
    throw apiErr;
  }

  return body;
}

export function buildHttpRequest(
  method: string,
  url: string,
  headers: Headers,
  signal?: AbortSignal,
  body?: string | ReadableStream<Uint8Array>
): HttpRequest {
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
  // 204 responses return an empty body; treat as `{}`.
  const parsed: unknown = text === '' ? {} : jsonBigint.parse(text);
  return schema.parse(parsed);
}

export function marshalRequest(data: unknown, schema: z.ZodType): string {
  return jsonBigint.stringify(schema.parse(data));
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
