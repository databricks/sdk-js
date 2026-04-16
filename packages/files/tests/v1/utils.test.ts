import {describe, expect, it} from 'vitest';

import {encodeFilePath, readAll} from '../../src/v1/utils';

describe('encodeFilePath', () => {
  it.each([
    {
      name: 'normal path with leading slash',
      input: '/Volumes/catalog/schema/file.txt',
      expected: 'Volumes/catalog/schema/file.txt',
    },
    {
      name: 'path with spaces',
      input: '/path/with spaces/file name.txt',
      expected: 'path/with%20spaces/file%20name.txt',
    },
    {
      name: 'path with percent character',
      input: '/path/special%chars/file',
      expected: 'path/special%25chars/file',
    },
    {
      name: 'path with question mark',
      input: '/path/to/file?.txt',
      expected: 'path/to/file%3F.txt',
    },
    {
      name: 'path with hash',
      input: '/path/to/file#1.txt',
      expected: 'path/to/file%231.txt',
    },
    {
      name: 'path without leading slash',
      input: 'no-leading-slash/file.txt',
      expected: 'no-leading-slash/file.txt',
    },
    {
      name: 'single segment',
      input: '/single',
      expected: 'single',
    },
  ])('$name', ({input, expected}) => {
    expect(encodeFilePath(input)).toBe(expected);
  });
});

describe('readAll', () => {
  it('returns empty Uint8Array for null body', async () => {
    const result = await readAll(null);
    expect(result).toEqual(new Uint8Array(0));
  });

  it('reads a single chunk', async () => {
    const data = new TextEncoder().encode('hello world');
    const stream = new ReadableStream<Uint8Array>({
      start(controller): void {
        controller.enqueue(data);
        controller.close();
      },
    });
    const result = await readAll(stream);
    expect(result).toEqual(data);
  });

  it('concatenates multiple chunks', async () => {
    const chunk1 = new TextEncoder().encode('hello ');
    const chunk2 = new TextEncoder().encode('world');
    const stream = new ReadableStream<Uint8Array>({
      start(controller): void {
        controller.enqueue(chunk1);
        controller.enqueue(chunk2);
        controller.close();
      },
    });
    const result = await readAll(stream);
    expect(new TextDecoder().decode(result)).toBe('hello world');
  });

  it('reads an empty stream', async () => {
    const stream = new ReadableStream<Uint8Array>({
      start(controller): void {
        controller.close();
      },
    });
    const result = await readAll(stream);
    expect(result).toEqual(new Uint8Array(0));
  });
});
