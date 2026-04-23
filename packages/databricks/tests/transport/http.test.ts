import {describe, expect, it, vi} from 'vitest';

import type {Credentials, Header} from '@databricks/sdk-auth';
import type {HttpClient} from '@databricks/sdk-core/http';

import {newHttpClient} from '../../src/transport/http';

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
      name: () => 'test',
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
          ? {name: () => 'test', authHeaders: () => Promise.reject(credErr)}
          : {
              name: () => 'test',
              authHeaders: () => Promise.resolve(tc.credHeaders),
            };

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
        name: () => 'test',
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
        name: () => 'test',
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
