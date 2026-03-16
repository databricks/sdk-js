import {describe, expect, it, vi} from 'vitest';

import type {Credentials, Header} from '@databricks/sdk-auth';

import type {HttpClient} from '../../src/transport/http';
import {newFetchHttpClient, newHttpClient} from '../../src/transport/http';

describe('newFetchHttpClient', () => {
  it('sends a request using fetch and returns the response', async () => {
    const mockFetch = vi.fn<typeof fetch>().mockResolvedValue(
      new Response('hello', {
        status: 201,
        headers: {'X-Request-Id': 'abc123'},
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    try {
      const client = newFetchHttpClient();
      const response = await client.send({
        url: 'https://example.com/api/resource',
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: '{"key":"value"}',
      });

      expect(response.statusCode).toBe(201);
      expect(response.headers.get('X-Request-Id')).toBe('abc123');

      // Read the body stream to verify content.
      const text = await new Response(response.body).text();
      expect(text).toBe('hello');

      // Verify fetch was called with the correct parameters.
      expect(mockFetch).toHaveBeenCalledOnce();
      const call = mockFetch.mock.calls[0];
      expect(call).toBeDefined();
      const [url, init] = call;
      expect(url).toBe('https://example.com/api/resource');
      expect(init?.method).toBe('POST');
      expect(init?.body).toBe('{"key":"value"}');
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
