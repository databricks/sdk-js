import {describe, expect, it} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-databricks/transport';

import {Client} from '../../src/v1/client';
import {readAll} from '../../src/v1/utils';

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

describe('Client.download', () => {
  it('sends GET to the correct URL', async () => {
    const {client, lastRequest} = mockClient({
      statusCode: 200,
      headers: new Headers({
        'content-type': 'application/octet-stream',
        'content-length': '11',
      }),
      body: streamFrom('hello world'),
    });
    const files = new Client({
      host: 'https://example.com',
      httpClient: client,
    });

    const resp = await files.download(undefined, {
      filePath: '/Volumes/catalog/schema/file.txt',
    });

    const req = lastRequest();
    expect(req.method).toBe('GET');
    expect(req.url).toBe(
      'https://example.com/api/2.0/fs/files/Volumes/catalog/schema/file.txt'
    );
    expect(req.headers.get('accept')).toBe('application/octet-stream');

    const body = await readAll(resp.contents);
    expect(new TextDecoder().decode(body)).toBe('hello world');
  });

  it('extracts response headers', async () => {
    const {client} = mockClient({
      statusCode: 200,
      headers: new Headers({
        'content-type': 'text/plain',
        'content-length': '5',
        'last-modified': 'Tue, 01 Jan 2025 00:00:00 GMT',
      }),
      body: streamFrom('hello'),
    });
    const files = new Client({
      host: 'https://example.com',
      httpClient: client,
    });

    const resp = await files.download(undefined, {
      filePath: '/file.txt',
    });

    expect(resp.contentType).toBe('text/plain');
    expect(resp.contentLength).toBe(5);
    expect(resp.lastModified).toBe('Tue, 01 Jan 2025 00:00:00 GMT');
  });

  it('omits headers when not present', async () => {
    const {client} = mockClient({
      statusCode: 200,
      headers: new Headers(),
      body: streamFrom('data'),
    });
    const files = new Client({
      host: 'https://example.com',
      httpClient: client,
    });

    const resp = await files.download(undefined, {
      filePath: '/file.txt',
    });

    expect(resp.contentType).toBeUndefined();
    expect(resp.contentLength).toBeUndefined();
    expect(resp.lastModified).toBeUndefined();
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
      files.download(undefined, {filePath: '/nonexistent.txt'})
    ).rejects.toThrow('File not found');
  });

  it('handles null response body gracefully', async () => {
    const {client} = mockClient({
      statusCode: 200,
      headers: new Headers(),
      body: null,
    });
    const files = new Client({
      host: 'https://example.com',
      httpClient: client,
    });

    const resp = await files.download(undefined, {
      filePath: '/empty.txt',
    });

    // Should return an empty stream, not null.
    const body = await readAll(resp.contents);
    expect(body).toEqual(new Uint8Array(0));
  });
});
