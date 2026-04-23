import {describe, expect, it} from 'vitest';

import {APIError} from '@databricks/sdk-core/apierror';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {HttpClient, HttpResponse} from '@databricks/sdk-core/http';

import {encodeFilePath, readAll, sendAndCheckError} from '../../src/v1/utils';

/** Creates a ReadableStream that enqueues the given chunks in order. */
function streamFromChunks(...chunks: Uint8Array[]): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller): void {
      for (const chunk of chunks) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });
}

describe('encodeFilePath', () => {
  it.each([
    {
      name: 'path with leading slash',
      input: '/Volumes/catalog/schema/file.txt',
      expected: '/Volumes/catalog/schema/file.txt',
    },
    {
      name: 'path with spaces',
      input: '/path/with spaces/file name.txt',
      expected: '/path/with%20spaces/file%20name.txt',
    },
    {
      name: 'path with percent character',
      input: '/path/special%chars/file',
      expected: '/path/special%25chars/file',
    },
    {
      name: 'path with question mark',
      input: '/path/to/file?.txt',
      expected: '/path/to/file%3F.txt',
    },
    {
      name: 'path with hash',
      input: '/path/to/file#1.txt',
      expected: '/path/to/file%231.txt',
    },
    {
      name: 'path without leading slash',
      input: 'no-leading-slash/file.txt',
      expected: 'no-leading-slash/file.txt',
    },
    {
      name: 'single segment with leading slash',
      input: '/single',
      expected: '/single',
    },
  ])('$name', ({input, expected}) => {
    expect(encodeFilePath(input)).toBe(expected);
  });
});

describe('readAll', () => {
  it.each([
    {
      name: 'null body',
      body: null,
      expected: new Uint8Array(0),
    },
    {
      name: 'empty stream',
      body: streamFromChunks(),
      expected: new Uint8Array(0),
    },
    {
      name: 'single chunk',
      body: streamFromChunks(new TextEncoder().encode('hello world')),
      expected: new TextEncoder().encode('hello world'),
    },
    {
      name: 'multiple chunks',
      body: streamFromChunks(
        new TextEncoder().encode('hello '),
        new TextEncoder().encode('world')
      ),
      expected: new TextEncoder().encode('hello world'),
    },
  ])('$name', async ({body, expected}) => {
    const result = await readAll(body);
    expect(result).toEqual(expected);
  });
});

describe('sendAndCheckError', () => {
  it('returns the response on 2xx status', async () => {
    const responseBody = streamFromChunks(new TextEncoder().encode('ok'));
    const mockClient: HttpClient = {
      send(): Promise<HttpResponse> {
        return Promise.resolve({
          statusCode: 200,
          headers: new Headers({'content-type': 'text/plain'}),
          body: responseBody,
        });
      },
    };

    const resp = await sendAndCheckError({
      request: {
        url: 'https://example.com',
        method: 'GET',
        headers: new Headers(),
      },
      httpClient: mockClient,
      logger: new NoOpLogger(),
    });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBe(responseBody);
  });

  it.each([
    {
      name: 'non-2xx with JSON body',
      statusCode: 404,
      body: streamFromChunks(
        new TextEncoder().encode(
          JSON.stringify({error_code: 'NOT_FOUND', message: 'File not found'})
        )
      ),
      expectedMessage: 'File not found',
    },
    {
      name: 'non-2xx with empty body',
      statusCode: 500,
      body: null,
      expectedMessage: '',
    },
  ])(
    'throws APIError on $name',
    async ({statusCode, body, expectedMessage}) => {
      const mockClient: HttpClient = {
        send(): Promise<HttpResponse> {
          return Promise.resolve({
            statusCode,
            headers: new Headers(),
            body,
          });
        },
      };

      try {
        await sendAndCheckError({
          request: {
            url: 'https://example.com',
            method: 'GET',
            headers: new Headers(),
          },
          httpClient: mockClient,
          logger: new NoOpLogger(),
        });
        expect.fail('Expected an APIError to be thrown.');
      } catch (e: unknown) {
        if (!(e instanceof APIError)) {
          expect.fail('Expected an APIError instance.');
        }
        expect(e.message).toBe(expectedMessage);
      }
    }
  );

  it('rethrows transport errors from the HttpClient', async () => {
    const networkError = new Error('connection refused');
    const mockClient: HttpClient = {
      send(): Promise<HttpResponse> {
        return Promise.reject(networkError);
      },
    };

    await expect(
      sendAndCheckError({
        request: {
          url: 'https://example.com',
          method: 'GET',
          headers: new Headers(),
        },
        httpClient: mockClient,
        logger: new NoOpLogger(),
      })
    ).rejects.toBe(networkError);
  });
});
