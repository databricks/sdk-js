/**
 * Profile resolution: resolve() reads ~/.databrickscfg (or
 * DATABRICKS_CONFIG_FILE) and overlays DATABRICKS_* environment variables on
 * top. Pass `disableEnv` to use the config file alone.
 *
 * Run: npm run profile-resolution --workspace @databricks/sdk-examples
 */

import {fileURLToPath} from 'node:url';

import {LogLevel} from '@databricks/sdk-core/logger';
import {resolve} from '@databricks/sdk-core/profiles';

const log = new LogLevel('info');

export async function main(profileName: string): Promise<void> {
  // Default: config file values with DATABRICKS_* env vars overlaid on top.
  const withEnv = await resolve({profile: profileName});
  log.info(`host (file + env): ${withEnv.host ?? '(unset)'}`);

  // disableEnv uses the config file alone, ignoring DATABRICKS_* env vars.
  const fileOnly = await resolve({profile: profileName, disableEnv: true});
  log.info(`host (file only):  ${fileOnly.host ?? '(unset)'}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main('demo');
}
