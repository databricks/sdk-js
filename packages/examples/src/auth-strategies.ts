/**
 * Auth strategies: U2M (Databricks CLI) and M2M (OAuth client credentials) both
 * satisfy the same `Credentials` interface, so any client accepts either.
 *
 * Run: npm run auth-strategies --workspace @databricks/sdk-examples
 */

import {fileURLToPath} from 'node:url';

import type {TokenCredentials} from '@databricks/sdk-auth';
import {
  newM2mCredentials,
  newU2mCredentials,
} from '@databricks/sdk-auth/credentials';
import {LogLevel} from '@databricks/sdk-core/logger';
import {resolve} from '@databricks/sdk-core/profiles';

const log = new LogLevel('info');

export async function main(u2m: TokenCredentials, host: string): Promise<void> {
  // U2M resolves a refreshable token via the Databricks CLI.
  const token = await u2m.token();
  log.info(`U2M (${u2m.name()}): ${token.type ?? 'Bearer'} token`);

  // M2M uses an OAuth client-credentials grant. It satisfies the same
  // Credentials interface, so clients accept it interchangeably with U2M.
  const m2m = newM2mCredentials({
    host,
    clientId: '<client-id>',
    clientSecret: '<client-secret>',
    scopes: ['all-apis'],
  });
  log.info(`M2M (${m2m.name()}): same Credentials interface as U2M`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const {host} = await resolve({profile: 'demo'});
  if (host === undefined || host === '') {
    throw new Error(
      'The "demo" profile has no host; run `databricks auth login`.'
    );
  }
  await main(newU2mCredentials({profile: 'demo'}), host);
}
