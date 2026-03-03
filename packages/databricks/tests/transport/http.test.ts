import {describe, expect, it, vi} from 'vitest';

import {newFetchHttpClient} from '../../src/transport/http';

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
