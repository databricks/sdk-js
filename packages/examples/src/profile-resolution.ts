/**
 * Profile resolution: resolve() reads ~/.databrickscfg (or
 * DATABRICKS_CONFIG_FILE). For an explicit profile it ignores DATABRICKS_*
 * environment variables unless you opt in with `withEnv`.
 *
 * Run: npm run profile-resolution --workspace @databricks/sdk-examples
 */

import {fileURLToPath} from 'node:url';

import {LogLevel} from '@databricks/sdk-core/logger';
import {resolve} from '@databricks/sdk-core/profiles';

const log = new LogLevel('info');

export async function main(profileName: string): Promise<void> {
  // File only: DATABRICKS_* env vars are ignored for an explicit profile.
  const fileOnly = await resolve({profile: profileName});
  log.info(`host (file only): ${fileOnly.host ?? '(unset)'}`);

  // withEnv overlays DATABRICKS_* on top of the file values.
  const withEnv = await resolve({profile: profileName, withEnv: true});
  log.info(`host (withEnv):   ${withEnv.host ?? '(unset)'}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main('demo');
}
