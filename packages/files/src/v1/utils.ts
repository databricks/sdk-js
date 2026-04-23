/**
 * Internal utilities for the Files service client.
 */

import {APIError} from '@databricks/sdk-core/apierror';
import type {Logger} from '@databricks/sdk-databricks/logger';
import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';

export interface HttpCallOptions {
  readonly request: HttpRequest;
  readonly httpClient: HttpClient;
  readonly logger: Logger;
}

/**
 * Reads a response body stream into a single Uint8Array. Only used for error
 * responses where we need to buffer the JSON body to parse an APIError.
 */
export async function readAll(
  body: ReadableStream<Uint8Array> | null
): Promise<Uint8Array> {
  if (body === null) {
    return new Uint8Array(0);
  }
  return new Uint8Array(await new Response(body).arrayBuffer());
}

/**
 * Encodes a file path for use in the Files API URL. Each path segment is
 * individually percent-encoded while preserving the "/" separators.
 */
export function encodeFilePath(filePath: string): string {
  return filePath
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');
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

  // On error responses, buffer the body and throw an APIError.
  if (resp.statusCode < 200 || resp.statusCode >= 300) {
    const body = await readAll(resp.body);
    const apiErr = APIError.fromHttpError(resp.statusCode, resp.headers, body);
    if (apiErr !== undefined) {
      throw apiErr;
    }
    // Fallback if fromHttpError returns undefined for an unknown status.
    throw new Error(`unexpected HTTP status ${String(resp.statusCode)}`);
  }

  return resp;
}
