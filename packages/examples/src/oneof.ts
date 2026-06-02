/**
 * OneOf: a protobuf oneof becomes a discriminated union with a `$case` tag, so
 * a switch on `$case` narrows to the active variant's type.
 *
 * Run: npm run oneof --workspace @databricks/sdk-examples
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

  for await (const project of client.listProjectsIter({pageSize: 1})) {
    const suspension = project.status?.defaultEndpointSettings?.suspension;
    // Inside each case the compiler narrows `suspension` to that variant.
    switch (suspension?.$case) {
      case 'suspendTimeoutDuration':
        log.info(
          `suspend after ${suspension.suspendTimeoutDuration.toString()}`
        );
        break;
      case 'noSuspension':
        log.info(`no suspension: ${String(suspension.noSuspension)}`);
        break;
      case undefined:
        log.info('no suspension setting');
        break;
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
