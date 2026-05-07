import {describe, expect, it} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';

import {Client} from '../../src/v1';

describe('Client.upload', () => {
  it('streams the request body incrementally', async () => {
    const events: string[] = [];
    let pullCount = 0;

    // A pull-based stream that produces two chunks one at a time. The pull
    // callback is only invoked when the consumer is ready for more data.
    const contents = new ReadableStream<Uint8Array>({
      pull(controller): void {
        pullCount++;
        if (pullCount <= 2) {
          const chunk = `chunk${String(pullCount)}`;
          events.push(`enqueue:${chunk}`);
          controller.enqueue(new TextEncoder().encode(chunk));
        } else {
          events.push('close');
          controller.close();
        }
      },
    });

    // The mock server reads the body stream chunk by chunk.
    const client: HttpClient = {
      async send(request: HttpRequest): Promise<HttpResponse> {
        if (!(request.body instanceof ReadableStream)) {
          expect.fail('Expected body to be a ReadableStream.');
        }
        const reader = request.body.getReader();
        for (;;) {
          const {done, value} = await reader.read();
          if (done) {
            break;
          }
          events.push(`receive:${new TextDecoder().decode(value)}`);
        }
        return {statusCode: 204, headers: new Headers(), body: null};
      },
    };

    const files = new Client({
      host: 'https://example.com',
      httpClient: client,
    });

    await files.upload({
      filePath: '/file.txt',
      contents,
    });

    // Each chunk is produced by the client and received by the server before
    // the next chunk is produced, proving incremental streaming.
    expect(events).toEqual([
      'enqueue:chunk1',
      'receive:chunk1',
      'enqueue:chunk2',
      'receive:chunk2',
      'close',
    ]);
  });
});
