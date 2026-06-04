// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Options} from '@databricks/sdk-core/ops';
import {execute} from '@databricks/sdk-core/ops';
import {ApiError} from '@databricks/sdk-core/apierror';
import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';
import type {Logger} from '@databricks/sdk-core/logger';
import {
  redactedDumpBody,
  redactHeaders,
} from '@databricks/sdk-core/logger/debug';
import type {CallOptions} from '@databricks/sdk-options/call';
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
  // When true, redacted request/response headers are logged at debug level.
  readonly debugHeaders: boolean;
  // Per-value byte budget for debug-level body and header logs.
  readonly debugTruncateBytes: number;
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
  const requestLog: Record<string, unknown> = {
    method: opts.request.method,
    url: opts.request.url,
  };
  // Bodies are logged independent of debugHeaders, matching the Go SDK.
  if (typeof opts.request.body === 'string') {
    requestLog.requestBody = redactedDumpBody(
      opts.request.body,
      opts.debugTruncateBytes
    );
  } else if (opts.request.body !== undefined && opts.request.body !== null) {
    // A streaming body is not drained, matching the Go SDK's <io.Reader>.
    requestLog.requestBody = '<stream>';
  }
  if (opts.debugHeaders) {
    requestLog.headers = redactHeaders(
      opts.request.headers,
      opts.debugTruncateBytes
    );
  }
  opts.logger.debug('HTTP request', requestLog);

  let resp: HttpResponse;
  try {
    resp = await opts.httpClient.send(opts.request);
  } catch (e: unknown) {
    opts.logger.debug('HTTP request failed');
    throw e;
  }

  const body = await readAll(resp.body);

  // Secret-bearing fields are redacted by key and every value is truncated, so
  // the body is safe to log; matches the Go SDK.
  const responseLog: Record<string, unknown> = {
    statusCode: resp.statusCode,
    body: redactedDumpBody(
      new TextDecoder().decode(body),
      opts.debugTruncateBytes
    ),
  };
  if (opts.debugHeaders) {
    responseLog.headers = redactHeaders(resp.headers, opts.debugTruncateBytes);
  }
  opts.logger.debug('HTTP response', responseLog);

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
