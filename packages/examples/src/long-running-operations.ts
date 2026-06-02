/**
 * Long-running operations: create and delete run asynchronously on the server,
 * so each returns an Operation whose `wait()` polls until it finishes.
 *
 * Run: npm run long-running-operations --workspace @databricks/sdk-examples
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
  const projectId = `sdkjs-demo-${String(Date.now())}`;

  const createOp = await client.createProjectOperation({
    projectId,
    project: {spec: {displayName: 'JS SDK LRO Demo'}},
  });
  const project = await createOp.wait(undefined);
  log.info(`Created ${project.name ?? '(unnamed)'}.`);
  if (project.name === undefined || project.name === '') {
    throw new Error('createProject returned a project without a name.');
  }

  const deleteOp = await client.deleteProjectOperation({
    name: project.name,
    purge: true,
  });
  await deleteOp.wait(undefined);
  log.info(`Deleted ${project.name}.`);
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
