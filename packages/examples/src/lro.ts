/**
 * Example: Long-Running Operations (LRO)
 *
 * Demonstrates the LRO helpers on the Lakebase Postgres client: name(),
 * metadata(), done(), and wait(). Uses CreateProjectOperation as a
 * representative -- all LRO wrappers share the same SDK-side code.
 *
 * Prerequisites:
 *   export DATABRICKS_HOST="https://<workspace>.cloud.databricks.com"
 *   export DATABRICKS_TOKEN="<your-pat>"
 *
 * Run from the repo root:
 *   npm run lro --workspace @databricks/sdk-examples
 */

import {newPatCredentials} from '@databricks/sdk-auth';
import {LogLevel} from '@databricks/sdk-databricks/logger';
import {Client} from '@databricks/sdk-postgres/v1';

const log = new LogLevel('debug');

const host = process.env.DATABRICKS_HOST ?? '';
const token = process.env.DATABRICKS_TOKEN ?? '';

if (host === '' || token === '') {
  log.error('Set DATABRICKS_HOST and DATABRICKS_TOKEN environment variables.');
  process.exit(1);
}

const projectId = `lro-example-${Date.now()}`;

const client = new Client({
  host,
  credentials: newPatCredentials(token),
});

// ---------------------------------------------------------------------------
// Part 1: Kick off a project creation and inspect the LRO handle.
// ---------------------------------------------------------------------------
log.info('=== Part 1: Create project and inspect the LRO ===\n');

const op = await client.createProjectOperation(undefined, {
  projectId,
  project: {
    spec: {
      displayName: `LRO Example ${projectId}`,
      pgVersion: 17,
    },
  },
});

// name() -- server-assigned operation name.
const opName = await op.name();
log.info('Operation name:', opName);

// metadata() -- typed metadata attached to the operation.
const meta = await op.metadata();
log.info('Operation metadata:', JSON.stringify(meta));

// done() -- single poll; likely still running right after creation.
const doneEarly = await op.done(undefined);
log.info('Done (immediately after create):', doneEarly);

// ---------------------------------------------------------------------------
// Part 2: Wait for the operation to complete.
// ---------------------------------------------------------------------------
log.info('\n=== Part 2: Wait for project creation ===\n');

const project = await op.wait(undefined);
log.info('Project created:', project.name);
log.info('Project UID:', project.uid);

// done() again -- should be true now that we waited.
const doneAfterWait = await op.done(undefined);
log.info('Done (after wait):', doneAfterWait);

// ---------------------------------------------------------------------------
// Part 3: Clean up -- delete the project (also an LRO).
// ---------------------------------------------------------------------------
log.info('\n=== Part 3: Delete project (cleanup) ===\n');

const deleteOp = await client.deleteProjectOperation(undefined, {
  name: project.name,
});

const deleteOpName = await deleteOp.name();
log.info('Delete operation name:', deleteOpName);

await deleteOp.wait(undefined);
log.info('Project deleted.');
