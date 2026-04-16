/* eslint-disable no-console -- E2E test with intentional logging to show streaming behavior. */
import {describe, expect, it, vi} from 'vitest';
import {newPatCredentials} from '@databricks/sdk-auth';

import {Client} from '../../src/v1/client';
import {readAll} from '../../src/v1/utils';

// Allow up to 30 minutes for the 4 GiB streaming test.
vi.setConfig({testTimeout: 30 * 60 * 1000});

const HOST = 'https://dbc-6b51e481-2d96.cloud.databricks.com/';
const VOLUME_PATH = '/Volumes/test-parth-1/schema-parth-1/parth-test';
const PAT_TOKEN: string | undefined = process.env.PATTOKEN;

describe.skipIf(PAT_TOKEN === undefined || PAT_TOKEN === '')(
  'Files E2E',
  () => {
    function createClient(): Client {
      if (PAT_TOKEN === undefined || PAT_TOKEN === '') {
        throw new Error('PATTOKEN is not set.');
      }
      return new Client({
        host: HOST,
        credentials: newPatCredentials(PAT_TOKEN),
        // Use console so HTTP request/response logs are visible.
        logger: console,
      });
    }

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

    /**
     * Creates a ReadableStream that produces data in multiple chunks to
     * exercise real streaming behavior. Each chunk is 64 KiB and the
     * pull callback logs every chunk so the streaming behavior is visible
     * in test output. Returns the stream and the full expected content.
     */
    function multiChunkStream(totalBytes: number): {
      stream: ReadableStream<Uint8Array>;
      expected: Uint8Array;
    } {
      const chunkSize = 64 * 1024; // 64 KiB per chunk.
      const expected = new Uint8Array(totalBytes);
      // Fill with a deterministic pattern so we can verify the download.
      for (let i = 0; i < totalBytes; i++) {
        expected[i] = i % 256;
      }

      let offset = 0;
      let chunkNumber = 0;
      const totalChunks = Math.ceil(totalBytes / chunkSize);
      const stream = new ReadableStream<Uint8Array>({
        pull(controller): void {
          if (offset >= totalBytes) {
            console.log(
              `[stream] all ${String(totalChunks)} chunks enqueued, closing stream`
            );
            controller.close();
            return;
          }
          const end = Math.min(offset + chunkSize, totalBytes);
          chunkNumber++;
          console.log(
            `[stream] enqueue chunk ${String(chunkNumber)}/${String(totalChunks)}: bytes ${String(offset)}-${String(end - 1)} (${String(end - offset)} bytes)`
          );
          controller.enqueue(expected.slice(offset, end));
          offset = end;
        },
      });

      return {stream, expected};
    }

    it('uploads and downloads a small file', async () => {
      const client = createClient();
      const fileName = `e2e-test-${String(Date.now())}.txt`;
      const filePath = `${VOLUME_PATH}/${fileName}`;
      const content = `Hello from sdk-js e2e test at ${new Date().toISOString()}`;

      // Upload the file.
      await client.upload(undefined, {
        filePath,
        contents: streamFrom(content),
      });

      // Download and verify the content.
      const resp = await client.download(undefined, {filePath});

      expect(resp.contentLength).toBe(new TextEncoder().encode(content).length);
      expect(resp.contentType).toBeDefined();

      const body = await readAll(resp.contents);
      const downloaded = new TextDecoder().decode(body);
      expect(downloaded).toBe(content);
    });

    it('uploads and downloads a 5 MiB file via streaming', async () => {
      const client = createClient();
      const fileName = `e2e-stream-${String(Date.now())}.bin`;
      const filePath = `${VOLUME_PATH}/${fileName}`;
      const size = 5 * 1024 * 1024; // 5 MiB.
      const {stream, expected} = multiChunkStream(size);

      console.log(`[e2e] uploading ${String(size)} bytes to ${filePath}`);

      // Upload using a multi-chunk stream.
      await client.upload(undefined, {
        filePath,
        contents: stream,
      });

      console.log('[e2e] upload complete, downloading');

      // Download and verify every byte matches.
      const resp = await client.download(undefined, {filePath});
      expect(resp.contentLength).toBe(size);

      const body = await readAll(resp.contents);
      expect(body.length).toBe(size);
      expect(body).toEqual(expected);

      console.log('[e2e] download verified, all bytes match');
    });

    /**
     * Creates a ReadableStream that generates data on the fly without
     * pre-allocating the full buffer. Each byte at position i has the
     * value i % 256, so it can be verified without holding the whole
     * file in memory.
     */
    function largeStream(
      totalBytes: number,
      chunkSize: number
    ): ReadableStream<Uint8Array> {
      let offset = 0;
      const totalChunks = Math.ceil(totalBytes / chunkSize);
      const logInterval = Math.max(1, Math.floor(totalChunks / 20)); // Log ~20 times.
      let chunkNumber = 0;
      return new ReadableStream<Uint8Array>({
        pull(controller): void {
          if (offset >= totalBytes) {
            console.log(
              `[stream] all ${String(totalChunks)} chunks enqueued, closing stream`
            );
            controller.close();
            return;
          }
          const end = Math.min(offset + chunkSize, totalBytes);
          const size = end - offset;
          const chunk = new Uint8Array(size);
          for (let i = 0; i < size; i++) {
            chunk[i] = (offset + i) % 256;
          }
          chunkNumber++;
          if (chunkNumber % logInterval === 0 || chunkNumber === 1) {
            const mb = Math.round(offset / (1024 * 1024));
            console.log(
              `[stream] chunk ${String(chunkNumber)}/${String(totalChunks)} (${String(mb)} MiB sent)`
            );
          }
          controller.enqueue(chunk);
          offset = end;
        },
      });
    }

    /**
     * Reads a stream chunk-by-chunk and verifies each byte matches the
     * expected pattern (position % 256) without buffering the whole file.
     * Returns the total number of bytes read.
     */
    async function verifyStreamContent(
      stream: ReadableStream<Uint8Array>,
      expectedTotalBytes: number
    ): Promise<number> {
      const reader = stream.getReader();
      let globalOffset = 0;
      const logInterval = 100 * 1024 * 1024; // Log every 100 MiB.
      let nextLogAt = logInterval;
      for (;;) {
        const {done, value} = await reader.read();
        if (done) {
          break;
        }
        for (let i = 0; i < value.length; i++) {
          const expected = (globalOffset + i) % 256;
          if (value[i] !== expected) {
            throw new Error(
              `byte mismatch at offset ${String(globalOffset + i)}: expected ${String(expected)}, got ${String(value[i])}`
            );
          }
        }
        globalOffset += value.length;
        if (globalOffset >= nextLogAt) {
          const mb = Math.round(globalOffset / (1024 * 1024));
          console.log(
            `[verify] ${String(mb)}/${String(Math.round(expectedTotalBytes / (1024 * 1024)))} MiB verified`
          );
          nextLogAt += logInterval;
        }
      }
      return globalOffset;
    }

    it('uploads and downloads a 4 GiB file via streaming', async () => {
      const client = createClient();
      const fileName = `e2e-4gib-${String(Date.now())}.bin`;
      const filePath = `${VOLUME_PATH}/${fileName}`;
      const size = 4 * 1024 * 1024 * 1024; // 4 GiB.
      const chunkSize = 1024 * 1024; // 1 MiB chunks.

      console.log(
        `[e2e] uploading ${String(size)} bytes (4 GiB) to ${filePath}`
      );
      const uploadStart = Date.now();

      // Upload using a streaming source that generates data on the fly.
      await client.upload(undefined, {
        filePath,
        contents: largeStream(size, chunkSize),
      });

      const uploadMs = Date.now() - uploadStart;
      console.log(
        `[e2e] upload complete in ${String(Math.round(uploadMs / 1000))}s, downloading`
      );

      // Download and verify every byte on the fly without buffering.
      const downloadStart = Date.now();
      const resp = await client.download(undefined, {filePath});
      expect(resp.contentLength).toBe(size);

      const totalRead = await verifyStreamContent(resp.contents, size);
      expect(totalRead).toBe(size);

      const downloadMs = Date.now() - downloadStart;
      console.log(
        `[e2e] download verified in ${String(Math.round(downloadMs / 1000))}s, all ${String(size)} bytes match`
      );
    });

    it('uploads with overwrite', async () => {
      const client = createClient();
      const fileName = `e2e-overwrite-${String(Date.now())}.txt`;
      const filePath = `${VOLUME_PATH}/${fileName}`;

      // Upload the first version.
      await client.upload(undefined, {
        filePath,
        contents: streamFrom('version 1'),
      });

      // Upload again with overwrite.
      await client.upload(undefined, {
        filePath,
        contents: streamFrom('version 2'),
        overwrite: true,
      });

      // Download and verify we got version 2.
      const resp = await client.download(undefined, {filePath});
      const body = await readAll(resp.contents);
      expect(new TextDecoder().decode(body)).toBe('version 2');
    });

    it('download returns 404 for nonexistent file', async () => {
      const client = createClient();
      const filePath = `${VOLUME_PATH}/nonexistent-${String(Date.now())}.txt`;

      await expect(client.download(undefined, {filePath})).rejects.toThrow();
    });
  }
);
