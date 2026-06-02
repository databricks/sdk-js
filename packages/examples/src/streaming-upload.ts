/**
 * Streaming upload: `uploadFile` takes a `ReadableStream`, so the body streams
 * to the server without buffering the whole payload in memory. The server
 * replies 204 No Content.
 *
 * Run: npm run streaming-upload --workspace @databricks/sdk-examples
 */

import {fileURLToPath} from 'node:url';

import {newU2mCredentials} from '@databricks/sdk-auth/credentials';
import {LogLevel} from '@databricks/sdk-core/logger';
import {resolve} from '@databricks/sdk-core/profiles';
import {FilesClient} from '@databricks/sdk-files/v2';
import type {ClientOptions} from '@databricks/sdk-options/client';

const log = new LogLevel('info');

const TOTAL_BYTES = 5 * 1024 * 1024;
const CHUNK_SIZE = 64 * 1024;

export async function main(options: ClientOptions): Promise<void> {
  const client = new FilesClient(options);
  // A Unity Catalog volume you can write to; override with DEMO_VOLUME.
  const volume = process.env.DEMO_VOLUME ?? '/Volumes/main/default/my_volume';
  const filePath = `${volume}/sdk-js-demo-${String(Date.now())}.bin`;

  // Produce 64 KiB chunks on demand until 5 MiB has been emitted.
  let emitted = 0;
  const contents = new ReadableStream<Uint8Array>({
    pull(controller): void {
      if (emitted >= TOTAL_BYTES) {
        controller.close();
        return;
      }
      const size = Math.min(CHUNK_SIZE, TOTAL_BYTES - emitted);
      controller.enqueue(new Uint8Array(size));
      emitted += size;
    },
  });

  await client.uploadFile({filePath, contents, overwrite: true});
  log.info(`Uploaded ${String(emitted)} bytes to ${filePath}.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const {host} = await resolve({profile: 'demo'});
  if (host === undefined || host === '') {
    throw new Error(
      'The "demo" profile has no host; run `databricks auth login`.'
    );
  }
  await main({host, credentials: newU2mCredentials({profile: 'demo'})});
}
