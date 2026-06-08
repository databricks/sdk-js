/**
 * Profile-driven client config: construct a client WITHOUT an explicit host.
 *
 * The client resolves a profile (config file + DATABRICKS_* env vars) on its
 * first request and fills in whatever the caller left unset — here the host,
 * the workspace ID (sent as X-Databricks-Org-Id), and the credentials. Pass
 * `profileOptions` to pick a profile or to turn off the file (`noProfile`) or
 * the env overlay (`disableEnv`); any value set explicitly on the options wins.
 *
 * Run: npm run profile-client --workspace @databricks/sdk-examples
 */

import {fileURLToPath} from 'node:url';

import {LogLevel} from '@databricks/sdk-core/logger';
import type {ClientOptions} from '@databricks/sdk-options/client';
import {ModelServingQueryClient} from '@databricks/sdk-modelservingquery/v1';

const log = new LogLevel('info');

export async function main(options: ClientOptions): Promise<void> {
  // No host or workspaceId passed: both come from the resolved profile.
  const client = new ModelServingQueryClient(options);

  const resp = await client.query({
    name: 'my-embeddings-endpoint',
    input: 'Hello from the Databricks JS SDK.',
  });

  log.info(`Model: ${resp.model ?? '(unset)'}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // Default profile resolution: reads ~/.databrickscfg and DATABRICKS_* env.
  await main({});
}
