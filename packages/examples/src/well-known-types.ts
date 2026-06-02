/**
 * Well-known types: the SDK maps protobuf Timestamp to Temporal.Instant and
 * Duration to Temporal.Duration, so dates and durations are first-class values
 * rather than bare strings.
 *
 * Run: npm run well-known-types --workspace @databricks/sdk-examples
 */

import {fileURLToPath} from 'node:url';

import {newU2mCredentials} from '@databricks/sdk-auth/credentials';
import {LogLevel} from '@databricks/sdk-core/logger';
import {resolve} from '@databricks/sdk-core/profiles';
import type {ClientOptions} from '@databricks/sdk-options/client';
import {PostgresClient} from '@databricks/sdk-postgres/v1';

const log = new LogLevel('info');

export async function main(options: ClientOptions): Promise<void> {
  const client = new PostgresClient(options);

  for await (const project of client.listProjectsIter({pageSize: 5})) {
    // createTime is a Temporal.Instant; historyRetentionDuration a Duration.
    const retention = project.status?.historyRetentionDuration;
    log.info(`${project.name ?? '(unnamed)'}:`);
    log.info(`  created: ${project.createTime?.toString() ?? '(none)'}`);
    if (retention !== undefined) {
      log.info(`  retention: ${String(retention.total({unit: 'seconds'}))}s`);
    }
    return;
  }
  log.info('No Lakebase projects in this workspace.');
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
