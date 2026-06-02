/**
 * Token-based pagination: `listXIter` threads page tokens internally, so a
 * small page size transparently fetches multiple pages as you iterate.
 *
 * Run: npm run pagination --workspace @databricks/sdk-examples
 */

import {fileURLToPath} from 'node:url';

import {newU2mCredentials} from '@databricks/sdk-auth/credentials';
import {LogLevel} from '@databricks/sdk-core/logger';
import {resolve} from '@databricks/sdk-core/profiles';
import type {ClientOptions} from '@databricks/sdk-options/client';
import {CatalogsClient} from '@databricks/sdk-uc-catalogs/v1';

const log = new LogLevel('info');

export async function main(options: ClientOptions): Promise<void> {
  const client = new CatalogsClient(options);

  let count = 0;
  for await (const catalog of client.listCatalogsIter({maxResults: 10})) {
    log.info(catalog.name ?? '(unnamed)');
    if (++count >= 25) {
      break;
    }
  }
  log.info(`Listed ${String(count)} catalogs.`);
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
