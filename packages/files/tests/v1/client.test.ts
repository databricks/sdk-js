import {describe, expect, it} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-databricks/transport';

import {Client} from '../../src/v1';

/** Creates a ReadableStream from a string. */
function streamFrom(text: string): ReadableStream<Uint8Array> {
  const data = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller): void {
      controller.enqueue(data);
      controller.close();
    },
  });
}

/** Creates a mock HttpClient that records the request and returns a canned response. */
function mockClient(response: HttpResponse): {
  client: HttpClient;
  lastRequest: () => HttpRequest;
} {
  let captured: HttpRequest | undefined;
  const client: HttpClient = {
    send(request: HttpRequest): Promise<HttpResponse> {
      captured = request;
      return Promise.resolve(response);
    },
  };
  return {
    client,
    lastRequest(): HttpRequest {
      if (captured === undefined) {
        throw new Error('No request was captured.');
      }
      return captured;
    },
  };
}

/** Creates a mock HttpClient that returns a JSON error response. */
function errorClient(statusCode: number, errorBody: object): HttpClient {
  return {
    send(): Promise<HttpResponse> {
      const body = new TextEncoder().encode(JSON.stringify(errorBody));
      return Promise.resolve({
        statusCode,
        headers: new Headers({'content-type': 'application/json'}),
        body: new ReadableStream<Uint8Array>({
          start(controller): void {
            controller.enqueue(body);
            controller.close();
          },
        }),
      });
    },
  };
}

describe('Client.upload', () => {
  it('sends PUT to the correct URL with encoded path', async () => {
    const {client, lastRequest} = mockClient({
      statusCode: 204,
      headers: new Headers(),
      body: null,
    });
    const files = new Client({
      host: 'https://example.com',
      httpClient: client,
    });

    await files.upload(undefined, {
      filePath: '/Volumes/catalog/schema/file.txt',
      contents: streamFrom('data'),
    });

    const req = lastRequest();
    expect(req.method).toBe('PUT');
    expect(req.url).toBe(
      'https://example.com/api/2.0/fs/files/Volumes/catalog/schema/file.txt'
    );
    expect(req.headers.get('content-type')).toBe('application/octet-stream');
  });

  it('includes overwrite query parameter when set', async () => {
    const {client, lastRequest} = mockClient({
      statusCode: 204,
      headers: new Headers(),
      body: null,
    });
    const files = new Client({
      host: 'https://example.com',
      httpClient: client,
    });

    await files.upload(undefined, {
      filePath: '/path/to/file.txt',
      contents: streamFrom('data'),
      overwrite: true,
    });

    const req = lastRequest();
    expect(req.url).toContain('overwrite=true');
  });

  it('does not include overwrite query parameter when false', async () => {
    const {client, lastRequest} = mockClient({
      statusCode: 204,
      headers: new Headers(),
      body: null,
    });
    const files = new Client({
      host: 'https://example.com',
      httpClient: client,
    });

    await files.upload(undefined, {
      filePath: '/path/to/file.txt',
      contents: streamFrom('data'),
      overwrite: false,
    });

    const req = lastRequest();
    expect(req.url).not.toContain('overwrite');
  });

  it('passes the ReadableStream as the request body', async () => {
    const {client, lastRequest} = mockClient({
      statusCode: 204,
      headers: new Headers(),
      body: null,
    });
    const files = new Client({
      host: 'https://example.com',
      httpClient: client,
    });

    const contents = streamFrom('file contents');
    await files.upload(undefined, {
      filePath: '/path/to/file.txt',
      contents,
    });

    const req = lastRequest();
    expect(req.body).toBe(contents);
  });

  it('passes the AbortSignal through', async () => {
    const {client, lastRequest} = mockClient({
      statusCode: 204,
      headers: new Headers(),
      body: null,
    });
    const files = new Client({
      host: 'https://example.com',
      httpClient: client,
    });

    const controller = new AbortController();
    await files.upload(controller.signal, {
      filePath: '/path/to/file.txt',
      contents: streamFrom('data'),
    });

    const req = lastRequest();
    expect(req.signal).toBe(controller.signal);
  });

  it('throws APIError on error response', async () => {
    const client = errorClient(404, {
      error_code: 'NOT_FOUND',
      message: 'File not found',
    });
    const files = new Client({
      host: 'https://example.com',
      httpClient: client,
    });

    await expect(
      files.upload(undefined, {
        filePath: '/nonexistent/file.txt',
        contents: streamFrom('data'),
      })
    ).rejects.toThrow('File not found');
  });

  it('encodes special characters in file path', async () => {
    const {client, lastRequest} = mockClient({
      statusCode: 204,
      headers: new Headers(),
      body: null,
    });
    const files = new Client({
      host: 'https://example.com',
      httpClient: client,
    });

    await files.upload(undefined, {
      filePath: '/path/with spaces/file?.txt',
      contents: streamFrom('data'),
    });

    const req = lastRequest();
    expect(req.url).toContain('path/with%20spaces/file%3F.txt');
  });

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

    await files.upload(undefined, {
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

  it('strips trailing slash from host', async () => {
    const {client, lastRequest} = mockClient({
      statusCode: 204,
      headers: new Headers(),
      body: null,
    });
    const files = new Client({
      host: 'https://example.com/',
      httpClient: client,
    });

    await files.upload(undefined, {
      filePath: '/file.txt',
      contents: streamFrom('data'),
    });

    const req = lastRequest();
    expect(req.url).toMatch(/^https:\/\/example\.com\/api/);
  });
});
