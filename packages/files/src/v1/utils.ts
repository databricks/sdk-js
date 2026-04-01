/**
 * Internal utilities for the Files service client.
 */

import type {Logger} from '@databricks/sdk-databricks/logger';
import type {
  HttpClient,
  HttpRequest,
} from '@databricks/sdk-databricks/transport';

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
