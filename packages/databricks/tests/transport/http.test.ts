import {describe, expect, it, vi} from 'vitest';

import type {Credentials, Header} from '@databricks/sdk-auth';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '../../src/transport/http';
import {
  newAuthHttpClient,
  newFetchHttpClient,
  newHttpClient,
} from '../../src/transport/http';

/** Mock Credentials implementation for testing. */
class MockCredentials implements Credentials {
  readonly headers: Header[];
  readonly err?: Error;

  constructor(headers: Header[], err?: Error) {
    this.headers = headers;
    this.err = err;
  }

  authHeaders(): Promise<Header[]> {
    if (this.err) {
      return Promise.reject(this.err);
    }
    return Promise.resolve(this.headers);
  }
}

/** Mock HttpClient implementation for testing. */
class MockHttpClient implements HttpClient {
  readonly response?: HttpResponse;
  readonly err?: Error;
  capturedRequest?: HttpRequest;

  constructor(response?: HttpResponse, err?: Error) {
    this.response = response;
    this.err = err;
  }

  send(request: HttpRequest): Promise<HttpResponse> {
    this.capturedRequest = request;
    if (this.err) {
      return Promise.reject(this.err);
    }
    if (this.response === undefined) {
      return Promise.reject(new Error('no mock response configured'));
    }
    return Promise.resolve(this.response);
  }
}

// Sentinel errors for use with expect().toThrow().
const credentialsError = new Error('credentials error');
const transportError = new Error('transport error');

describe('newAuthHttpClient', () => {
  const testCases: {
    desc: string;
    credHeaders: Header[];
    credErr?: Error;
    baseResponse?: HttpResponse;
    baseErr?: Error;
    wantErr?: Error;
  }[] = [
    {
      desc: 'adds single auth header',
      credHeaders: [{key: 'Authorization', value: 'Bearer token123'}],
      baseResponse: {
        statusCode: 200,
        headers: new Headers(),
        body: new Uint8Array(),
      },
    },
    {
      desc: 'adds multiple auth headers',
      credHeaders: [
        {key: 'Authorization', value: 'Bearer token123'},
        {key: 'X-Custom-Auth', value: 'custom-value'},
      ],
      baseResponse: {
        statusCode: 200,
        headers: new Headers(),
        body: new Uint8Array(),
      },
    },
    {
      desc: 'propagates transport error',
      credHeaders: [{key: 'Authorization', value: 'Bearer token123'}],
      baseErr: transportError,
      wantErr: transportError,
    },
    {
      desc: 'propagates credentials error',
      credHeaders: [],
      credErr: credentialsError,
      wantErr: credentialsError,
    },
  ];

  it.each(testCases)(
    '$desc',
    async ({credHeaders, credErr, baseResponse, baseErr, wantErr}) => {
      const creds = new MockCredentials(credHeaders, credErr);
      const base = new MockHttpClient(baseResponse, baseErr);
      const client = newAuthHttpClient(base, creds);

      const request: HttpRequest = {
        url: 'https://example.com/api',
        method: 'GET',
        headers: new Headers(),
      };

      if (wantErr) {
        await expect(client.send(request)).rejects.toThrow(wantErr.message);
        return;
      }

      const response = await client.send(request);
      expect(response).toBe(baseResponse);

      // Verify that auth headers were added to the request sent to the base.
      for (const h of credHeaders) {
        expect(base.capturedRequest?.headers.get(h.key)).toBe(h.value);
      }
    }
  );

  it('does not modify the original request headers', async () => {
    const creds = new MockCredentials([
      {key: 'Authorization', value: 'Bearer token123'},
    ]);
    const base = new MockHttpClient({
      statusCode: 200,
      headers: new Headers(),
      body: new Uint8Array(),
    });
    const client = newAuthHttpClient(base, creds);

    const originalHeaders = new Headers();
    const request: HttpRequest = {
      url: 'https://example.com/api',
      method: 'GET',
      headers: originalHeaders,
    };

    await client.send(request);

    // The original request's headers must not be modified.
    expect(originalHeaders.get('Authorization')).toBeNull();

    // The base client should have received a different Headers object.
    expect(base.capturedRequest?.headers).not.toBe(originalHeaders);
    expect(base.capturedRequest?.headers.get('Authorization')).toBe(
      'Bearer token123'
    );
  });
});

describe('newHttpClient', () => {
  it('returns the custom client when provided', () => {
    const custom = new MockHttpClient({
      statusCode: 200,
      headers: new Headers(),
      body: new Uint8Array(),
    });

    const client = newHttpClient({httpClient: custom});
    expect(client).toBe(custom);
  });

  it('throws when no credentials are provided', () => {
    expect(() => newHttpClient({})).toThrow('no credentials provided');
  });

  it('returns an auth-wrapped client with credentials', async () => {
    const creds = new MockCredentials([
      {key: 'Authorization', value: 'Bearer token'},
    ]);

    // Mock fetch to verify the full pipeline works.
    const mockFetch = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ok: true}), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    try {
      const client = newHttpClient({credentials: creds});
      const response = await client.send({
        url: 'https://example.com/api',
        method: 'GET',
        headers: new Headers(),
      });

      expect(response.statusCode).toBe(200);

      // Verify fetch was called with auth headers.
      const fetchHeaders = mockFetch.mock.calls[0]?.[1]?.headers as Headers;
      expect(fetchHeaders.get('Authorization')).toBe('Bearer token');
    } finally {
      vi.unstubAllGlobals();
    }
  });
});

describe('newFetchHttpClient', () => {
  it('sends a request using fetch and returns the response', async () => {
    const responseBody = new TextEncoder().encode('hello');
    const mockFetch = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(responseBody, {
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
      expect(new TextDecoder().decode(response.body)).toBe('hello');

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
