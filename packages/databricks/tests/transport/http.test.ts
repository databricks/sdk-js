import {describe, expect, it, vi} from 'vitest';

import type {Credentials, Header} from '@databricks/sdk-auth';

import type {HttpClient, HttpRequest} from '../../src/transport/http';
import {newFetchHttpClient, newHttpClient} from '../../src/transport/http';

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
      desc: 'Uint8Array body — no duplex',
      request: {
        url: 'https://example.com/api',
        method: 'PUT',
        headers: new Headers(),
        body: new Uint8Array([1, 2, 3]),
      },
      wantBodyType: 'Uint8Array',
      wantDuplex: undefined,
      wantSignal: false,
    },
    {
      desc: 'ArrayBuffer body — no duplex',
      request: {
        url: 'https://example.com/api',
        method: 'PUT',
        headers: new Headers(),
        body: new ArrayBuffer(4),
      },
      wantBodyType: 'ArrayBuffer',
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
    {
      desc: 'ReadableStream body with signal — sets both duplex and signal',
      request: {
        url: 'https://example.com/upload',
        method: 'PUT',
        headers: new Headers(),
        body: streamFrom('data'),
        signal: AbortSignal.timeout(5000),
      },
      wantBodyType: 'ReadableStream',
      wantDuplex: 'half',
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
          expect.fail(`unexpected wantBodyType: ${tc.wantBodyType}`);
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
    {
      desc: 'maps 500 error',
      fetchResponse: new Response('internal error', {status: 500}),
      wantStatus: 500,
      wantHeader: undefined,
      wantBody: 'internal error',
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

describe('newHttpClient', () => {
  it('throws when no credentials are provided', () => {
    expect(() => newHttpClient()).toThrow('no credentials provided');
  });

  it('throws when options has no credentials', () => {
    expect(() => newHttpClient({})).toThrow('no credentials provided');
  });

  it('returns the provided httpClient as-is', () => {
    const custom: HttpClient = {
      send() {
        return Promise.resolve({
          statusCode: 200,
          headers: new Headers(),
          body: null,
        });
      },
    };
    const client = newHttpClient({httpClient: custom});
    expect(client).toBe(custom);
  });

  it('throws when httpClient is combined with other options', () => {
    const custom: HttpClient = {
      send() {
        return Promise.resolve({
          statusCode: 200,
          headers: new Headers(),
          body: null,
        });
      },
    };
    const credentials: Credentials = {
      authHeaders: () => Promise.resolve([]),
    };
    expect(() => newHttpClient({httpClient: custom, credentials})).toThrow(
      'httpClient cannot be combined with credentials or timeout'
    );
  });

  // Table-driven auth transport tests, mirroring Go's TestAuthTransport_RoundTrip.
  const roundTripCases: {
    desc: string;
    credHeaders: Header[];
    credErr?: Error;
    fetchErr?: Error;
    wantErr?: string;
  }[] = [
    {
      desc: 'adds single auth header',
      credHeaders: [{key: 'Authorization', value: 'Bearer token123'}],
    },
    {
      desc: 'adds multiple auth headers',
      credHeaders: [
        {key: 'Authorization', value: 'Bearer token123'},
        {key: 'X-Custom-Auth', value: 'custom-value'},
      ],
    },
    {
      desc: 'propagates transport error',
      credHeaders: [{key: 'Authorization', value: 'Bearer token123'}],
      fetchErr: new TypeError('fetch failed'),
      wantErr: 'fetch failed',
    },
    {
      desc: 'propagates credential errors',
      credHeaders: [],
      credErr: new Error('credentials error'),
      wantErr: 'credentials error',
    },
  ];

  it.each(roundTripCases)('$desc', async tc => {
    const mockFetch = tc.fetchErr
      ? vi.fn<typeof fetch>().mockRejectedValue(tc.fetchErr)
      : vi
          .fn<typeof fetch>()
          .mockResolvedValue(new Response('', {status: 200}));
    vi.stubGlobal('fetch', mockFetch);

    try {
      const credErr = tc.credErr;
      const credentials: Credentials =
        credErr !== undefined
          ? {authHeaders: () => Promise.reject(credErr)}
          : {authHeaders: () => Promise.resolve(tc.credHeaders)};

      const client = newHttpClient({credentials});
      const sendPromise = client.send({
        url: 'https://example.com/api',
        method: 'GET',
        headers: new Headers(),
      });

      if (tc.wantErr !== undefined) {
        await expect(sendPromise).rejects.toThrow(tc.wantErr);
        return;
      }

      await sendPromise;

      // Verify auth headers were added to the request.
      expect(mockFetch).toHaveBeenCalledOnce();
      const call = mockFetch.mock.calls[0];
      expect(call).toBeDefined();
      const [, init] = call;
      const headers = new Headers(init?.headers);
      for (const h of tc.credHeaders) {
        expect(headers.get(h.key)).toBe(h.value);
      }
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('does not modify the original request headers', async () => {
    const mockFetch = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response('', {status: 200}));
    vi.stubGlobal('fetch', mockFetch);

    try {
      const credentials: Credentials = {
        authHeaders: () =>
          Promise.resolve([{key: 'Authorization', value: 'Bearer token123'}]),
      };
      const client = newHttpClient({credentials});
      const originalHeaders = new Headers({'Content-Type': 'text/plain'});
      await client.send({
        url: 'https://example.com/api',
        method: 'GET',
        headers: originalHeaders,
      });

      // The original headers must not have been modified.
      expect(originalHeaders.get('Authorization')).toBeNull();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  const timeoutCases: {
    desc: string;
    timeout: number | undefined;
    wantSignal: boolean;
  }[] = [
    {desc: 'applies timeout to requests', timeout: 5000, wantSignal: true},
    {
      desc: 'does not apply timeout when omitted',
      timeout: undefined,
      wantSignal: false,
    },
  ];

  it.each(timeoutCases)('$desc', async tc => {
    const mockFetch = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response('', {status: 200}));
    vi.stubGlobal('fetch', mockFetch);

    try {
      const credentials: Credentials = {
        authHeaders: () =>
          Promise.resolve([{key: 'Authorization', value: 'Bearer token'}]),
      };
      const client = newHttpClient({
        credentials,
        ...(tc.timeout !== undefined && {timeout: tc.timeout}),
      });
      await client.send({
        url: 'https://example.com/api',
        method: 'GET',
        headers: new Headers(),
      });

      expect(mockFetch).toHaveBeenCalledOnce();
      const call = mockFetch.mock.calls[0];
      expect(call).toBeDefined();
      const [, init] = call;
      if (tc.wantSignal) {
        expect(init?.signal).toBeInstanceOf(AbortSignal);
      } else {
        expect(init?.signal).toBeUndefined();
      }
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
