import {describe, expect, it, vi} from 'vitest';

import type {HttpRequest} from '../../src/http';
import {newFetchHttpClient} from '../../src/http';

// Helper to build a ReadableStream from a string.
function streamFrom(text: string): ReadableStream<Uint8Array> {
  const data = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller): void {
      controller.enqueue(data);
      controller.close();
    },
  });
}

describe('newFetchHttpClient', () => {
  const bodyCases: {
    desc: string;
    request: HttpRequest;
    wantBodyType:
      | 'string'
      | 'Uint8Array'
      | 'ArrayBuffer'
      | 'ReadableStream'
      | 'null'
      | 'undefined';
    wantDuplex: 'half' | undefined;
    wantSignal: boolean;
  }[] = [
    {
      desc: 'string body — no duplex',
      request: {
        url: 'https://example.com/api',
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: '{"key":"value"}',
      },
      wantBodyType: 'string',
      wantDuplex: undefined,
      wantSignal: false,
    },
    {
      desc: 'null body — no duplex',
      request: {
        url: 'https://example.com/api',
        method: 'DELETE',
        headers: new Headers(),
        body: null,
      },
      wantBodyType: 'null',
      wantDuplex: undefined,
      wantSignal: false,
    },
    {
      desc: 'undefined body — omitted from init',
      request: {
        url: 'https://example.com/api',
        method: 'GET',
        headers: new Headers(),
      },
      wantBodyType: 'undefined',
      wantDuplex: undefined,
      wantSignal: false,
    },
    {
      desc: 'ReadableStream body — sets duplex to half',
      request: {
        url: 'https://example.com/upload',
        method: 'PUT',
        headers: new Headers({'Content-Type': 'application/octet-stream'}),
        body: streamFrom('streamed data'),
      },
      wantBodyType: 'ReadableStream',
      wantDuplex: 'half',
      wantSignal: false,
    },
    {
      desc: 'with AbortSignal — passes signal through',
      request: {
        url: 'https://example.com/api',
        method: 'GET',
        headers: new Headers(),
        signal: AbortSignal.timeout(5000),
      },
      wantBodyType: 'undefined',
      wantDuplex: undefined,
      wantSignal: true,
    },
  ];

  it.each(bodyCases)('$desc', async tc => {
    const mockFetch = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response('ok', {status: 200}));
    vi.stubGlobal('fetch', mockFetch);

    try {
      const client = newFetchHttpClient();
      await client.send(tc.request);

      expect(mockFetch).toHaveBeenCalledOnce();
      const call = mockFetch.mock.calls[0];
      expect(call).toBeDefined();
      const [url, init] = call;
      expect(url).toBe(tc.request.url);
      expect(init?.method).toBe(tc.request.method);

      const body = init?.body;
      switch (tc.wantBodyType) {
        case 'string':
          expect(typeof body).toBe('string');
          expect(body).toBe(tc.request.body);
          break;
        case 'Uint8Array':
          expect(body).toBeInstanceOf(Uint8Array);
          expect(body).toBe(tc.request.body);
          break;
        case 'ArrayBuffer':
          expect(body).toBeInstanceOf(ArrayBuffer);
          expect(body).toBe(tc.request.body);
          break;
        case 'ReadableStream':
          expect(body).toBeInstanceOf(ReadableStream);
          expect(body).toBe(tc.request.body);
          break;
        case 'null':
          expect(body).toBeNull();
          break;
        case 'undefined':
          expect(body).toBeUndefined();
          break;
        default:
          expect.fail('unexpected wantBodyType');
      }

      expect(init?.duplex).toBe(tc.wantDuplex);

      if (tc.wantSignal) {
        expect(init?.signal).toBeInstanceOf(AbortSignal);
      } else {
        expect(init?.signal).toBeUndefined();
      }
    } finally {
      vi.unstubAllGlobals();
    }
  });

  const responseCases: {
    desc: string;
    fetchResponse: Response;
    wantStatus: number;
    wantHeader: {key: string; value: string} | undefined;
    wantBody: string;
  }[] = [
    {
      desc: 'maps 200 with body and headers',
      fetchResponse: new Response('hello', {
        status: 200,
        headers: {'X-Request-Id': 'abc123'},
      }),
      wantStatus: 200,
      wantHeader: {key: 'X-Request-Id', value: 'abc123'},
      wantBody: 'hello',
    },
    {
      desc: 'maps 201 created',
      fetchResponse: new Response('created', {status: 201}),
      wantStatus: 201,
      wantHeader: undefined,
      wantBody: 'created',
    },
    {
      desc: 'maps 204 no content',
      fetchResponse: new Response(null, {status: 204}),
      wantStatus: 204,
      wantHeader: undefined,
      wantBody: '',
    },
    {
      desc: 'maps 404 error',
      fetchResponse: new Response('not found', {status: 404}),
      wantStatus: 404,
      wantHeader: undefined,
      wantBody: 'not found',
    },
  ];

  it.each(responseCases)('$desc', async tc => {
    const mockFetch = vi.fn<typeof fetch>().mockResolvedValue(tc.fetchResponse);
    vi.stubGlobal('fetch', mockFetch);

    try {
      const client = newFetchHttpClient();
      const response = await client.send({
        url: 'https://example.com/api',
        method: 'GET',
        headers: new Headers(),
      });

      expect(response.statusCode).toBe(tc.wantStatus);

      if (tc.wantHeader !== undefined) {
        expect(response.headers.get(tc.wantHeader.key)).toBe(
          tc.wantHeader.value
        );
      }

      const text = await new Response(response.body).text();
      expect(text).toBe(tc.wantBody);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('propagates fetch errors', async () => {
    const fetchError = new TypeError('fetch failed');
    const mockFetch = vi.fn<typeof fetch>().mockRejectedValue(fetchError);
    vi.stubGlobal('fetch', mockFetch);

    try {
      const client = newFetchHttpClient();
      await expect(
        client.send({
          url: 'https://example.com/api',
          method: 'GET',
          headers: new Headers(),
        })
      ).rejects.toThrow('fetch failed');
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
