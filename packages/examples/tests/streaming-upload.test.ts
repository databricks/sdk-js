import {describe, expect, it} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';

import {main} from '../src/streaming-upload';

const TOTAL_BYTES = 5 * 1024 * 1024;

// Drains a ReadableStream<Uint8Array> and returns the total number of bytes.
async function countStreamBytes(
  stream: ReadableStream<Uint8Array>
): Promise<number> {
  const reader = stream.getReader();
  let total = 0;
  for (;;) {
    const {done, value} = await reader.read();
    if (done) {
      return total;
    }
    total += value.length;
  }
}

describe('streaming-upload example', () => {
  it('streams ~5 MiB via a PUT and handles the 204 empty body', async () => {
    let streamedBytes = 0;
    const httpClient: HttpClient = {
      async send(request: HttpRequest): Promise<HttpResponse> {
        const url = new URL(request.url);
        // The upload is a PUT to the volume file with overwrite=true. The
        // file name carries a timestamp, so assert the stable prefix and the
        // .bin suffix rather than the exact path.
        expect(request.method).toBe('PUT');
        const path = decodeURIComponent(url.pathname);
        expect(path).toMatch(
          /^\/api\/2\.0\/fs\/files\/Volumes\/.+\/sdk-js-demo-\d+\.bin$/
        );
        expect(url.searchParams.get('overwrite')).toBe('true');

        // The body is a ReadableStream that the SDK forwards as raw bytes.
        const body = request.body;
        if (!(body instanceof ReadableStream)) {
          throw new Error('expected a streamed request body.');
        }
        streamedBytes = await countStreamBytes(body);

        // The server returns 204 No Content with an empty body. This is the
        // path the example exercises: uploadFile must resolve, not throw.
        return {statusCode: 204, headers: new Headers(), body: null};
      },
    };

    await main({host: 'https://test.cloud.databricks.com', httpClient});

    // The whole 5 MiB payload was streamed to the transport.
    expect(streamedBytes).toBe(TOTAL_BYTES);
  });
});
