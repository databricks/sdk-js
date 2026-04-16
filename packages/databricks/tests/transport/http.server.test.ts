/**
 * Tests for newFetchHttpClient against a local HTTPS/HTTP2 server. These
 * verify actual fetch behavior (body types, streaming, headers, signals)
 * without mocking. The server is started by test-server.global.ts; all
 * tests run in both Node.js and the browser.
 */

import {describe, expect, inject, it} from 'vitest';

import {newFetchHttpClient} from '../../src/transport/http';

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ProvidedContext {
    baseUrl: string;
  }
}

/** Creates a ReadableStream that emits data in multiple chunks. */
function multiChunkStream(chunks: Uint8Array[]): ReadableStream<Uint8Array> {
  let index = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller): void {
      if (index >= chunks.length) {
        controller.close();
        return;
      }
      controller.enqueue(chunks[index]);
      index++;
    },
  });
}

/** Reads a ReadableStream into a single Uint8Array. */
async function readAll(body: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  for (;;) {
    const {done, value} = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const c of chunks) {
    result.set(c, offset);
    offset += c.length;
  }
  return result;
}

describe('newFetchHttpClient (server)', () => {
  const baseUrl = inject('baseUrl');

  it('sends and receives a JSON body', async () => {
    const requestBody = '{"key":"value"}';

    const client = newFetchHttpClient();
    const resp = await client.send({
      url: `${baseUrl}/json`,
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: requestBody,
    });

    expect(resp.statusCode).toBe(200);
    expect(resp.headers.get('content-type')).toBe('application/json');

    const json = JSON.parse(await new Response(resp.body).text()) as Record<
      string,
      string
    >;
    expect(json.receivedMethod).toBe('POST');
    expect(json.receivedContentType).toBe('application/json');
    expect(json.receivedBody).toBe(requestBody);
  });

  it('sends a Uint8Array body', async () => {
    const data = new Uint8Array([0x00, 0x01, 0x02, 0xff]);

    const client = newFetchHttpClient();
    const resp = await client.send({
      url: `${baseUrl}/bytes`,
      method: 'PUT',
      headers: new Headers({'Content-Type': 'application/octet-stream'}),
      body: data,
    });

    expect(resp.statusCode).toBe(200);

    const json = JSON.parse(await new Response(resp.body).text()) as {
      length: number;
      bytes: number[];
    };
    expect(json.length).toBe(4);
    expect(json.bytes).toEqual([0x00, 0x01, 0x02, 0xff]);
  });

  it('streams a ReadableStream body to the server', async () => {
    const chunk1 = new TextEncoder().encode('hello ');
    const chunk2 = new TextEncoder().encode('world');
    const stream = multiChunkStream([chunk1, chunk2]);

    const client = newFetchHttpClient();
    const resp = await client.send({
      url: `${baseUrl}/stream-upload`,
      method: 'PUT',
      headers: new Headers({'Content-Type': 'application/octet-stream'}),
      body: stream,
    });

    expect(resp.statusCode).toBe(200);
    const text = await new Response(resp.body).text();
    expect(text).toBe('hello world');
  });

  it('streams a large body without buffering', async () => {
    // 2 MiB in 64 KiB chunks.
    const chunkSize = 64 * 1024;
    const chunkCount = 32;
    const totalSize = chunkSize * chunkCount;
    const chunks: Uint8Array[] = [];
    for (let i = 0; i < chunkCount; i++) {
      const chunk = new Uint8Array(chunkSize);
      chunk.fill(i % 256);
      chunks.push(chunk);
    }
    const stream = multiChunkStream(chunks);

    const client = newFetchHttpClient();
    const resp = await client.send({
      url: `${baseUrl}/stream-large`,
      method: 'PUT',
      headers: new Headers({'Content-Type': 'application/octet-stream'}),
      body: stream,
    });

    expect(resp.statusCode).toBe(200);
    expect(resp.headers.get('content-length')).toBe(String(totalSize));

    expect(resp.body).not.toBeNull();
    const body = await readAll(resp.body);
    expect(body.length).toBe(totalSize);

    for (let i = 0; i < chunkCount; i++) {
      const offset = i * chunkSize;
      expect(body[offset]).toBe(i % 256);
    }
  });

  it('receives a streaming response body', async () => {
    const client = newFetchHttpClient();
    const resp = await client.send({
      url: `${baseUrl}/stream-download`,
      method: 'GET',
      headers: new Headers(),
    });

    expect(resp.statusCode).toBe(200);
    expect(resp.headers.get('content-type')).toBe('text/plain');
    expect(resp.headers.get('x-custom')).toBe('test-value');

    const text = await new Response(resp.body).text();
    expect(text).toBe('chunk1chunk2chunk3');
  });

  it('sends no body for GET requests', async () => {
    const client = newFetchHttpClient();
    const resp = await client.send({
      url: `${baseUrl}/no-body`,
      method: 'GET',
      headers: new Headers(),
    });

    expect(resp.statusCode).toBe(200);

    const json = JSON.parse(await new Response(resp.body).text()) as {
      method: string;
      bodyLength: number;
    };
    expect(json.method).toBe('GET');
    expect(json.bodyLength).toBe(0);
  });

  it('passes request headers to the server', async () => {
    const client = newFetchHttpClient();
    const resp = await client.send({
      url: `${baseUrl}/headers`,
      method: 'GET',
      headers: new Headers({
        Accept: 'application/octet-stream',
        'X-Custom-Header': 'my-value',
      }),
    });

    const json = JSON.parse(await new Response(resp.body).text()) as Record<
      string,
      string
    >;
    expect(json.accept).toBe('application/octet-stream');
    expect(json.custom).toBe('my-value');
  });

  it('returns error status codes without throwing', async () => {
    const client = newFetchHttpClient();
    const resp = await client.send({
      url: `${baseUrl}/error`,
      method: 'GET',
      headers: new Headers(),
    });

    expect(resp.statusCode).toBe(500);
    const text = await new Response(resp.body).text();
    expect(text).toBe('{"error":"internal"}');
  });

  it('respects AbortSignal cancellation', async () => {
    const client = newFetchHttpClient();
    const controller = new AbortController();
    controller.abort();

    await expect(
      client.send({
        url: `${baseUrl}/slow`,
        method: 'GET',
        headers: new Headers(),
        signal: controller.signal,
      })
    ).rejects.toThrow();
  });
});
