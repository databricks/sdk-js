/**
 * Example: Lakebase Postgres Client
 *
 * Demonstrates the generated Postgres client, including:
 *   - Typed client initialization with PAT credentials
 *   - Pagination (manual and async iterator)
 *   - Long-running operations (LRO): name(), metadata(), done(), wait()
 *   - Well-known types: Temporal.Instant and Temporal.Duration
 *   - Custom HttpClient for request/response logging
 *
 * Live mode (default):
 *   export DATABRICKS_HOST="https://<workspace>.cloud.databricks.com"
 *   export DATABRICKS_TOKEN="<your-pat>"
 *   npm run lakebase-postgres --workspace @databricks/sdk-examples
 *
 * Mock mode (no workspace required):
 *   MOCK=true npm run lakebase-postgres --workspace @databricks/sdk-examples
 */

import {newPatCredentials} from '@databricks/sdk-auth';
import {LogLevel} from '@databricks/sdk-databricks/logger';
import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {Client} from '@databricks/sdk-postgres/v1';

import {createMockPostgresClient} from './mock-postgres';

const log = new LogLevel('debug');

const useMock = process.env.MOCK === 'true';

const host = useMock
  ? 'https://mock.databricks.com'
  : (process.env.DATABRICKS_HOST ?? '');
const token = process.env.DATABRICKS_TOKEN ?? '';

if (!useMock && (host === '' || token === '')) {
  log.error('Set DATABRICKS_HOST and DATABRICKS_TOKEN environment variables.');
  log.error('Or run with MOCK=true for offline demo mode.');
  process.exit(1);
}

const credentials = useMock ? undefined : newPatCredentials(token);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Reads all bytes from a ReadableStream. */
async function readAll(
  body: ReadableStream<Uint8Array> | null
): Promise<Uint8Array> {
  if (body === null) {
    return new Uint8Array(0);
  }
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  for (;;) {
    const {done, value} = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const total = chunks.reduce((acc, c) => acc + c.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

/** Wraps an HttpClient to log full request and response bodies. */
function withVerboseLogging(inner: HttpClient): HttpClient {
  return {
    async send(request: HttpRequest): Promise<HttpResponse> {
      // Log request.
      log.info(`  [HTTP] --> ${request.method} ${request.url}`);
      if (request.body !== undefined && request.body !== null) {
        const text =
          typeof request.body === 'string'
            ? request.body
            : new TextDecoder().decode(request.body as Uint8Array);
        log.info(`  [HTTP] --> Body: ${text}`);
      }

      const response = await inner.send(request);

      // Buffer the body so we can log it and still pass it downstream.
      const bodyBytes = await readAll(response.body);
      const bodyText = new TextDecoder().decode(bodyBytes);

      log.info(`  [HTTP] <-- ${response.statusCode}`);
      log.info(`  [HTTP] <-- Body: ${bodyText}`);

      // Re-create the stream for the consumer.
      return {
        statusCode: response.statusCode,
        headers: response.headers,
        body: new ReadableStream({
          start(controller) {
            controller.enqueue(bodyBytes);
            controller.close();
          },
        }),
      };
    },
  };
}

// ---------------------------------------------------------------------------
// Part 1: Client initialization
// ---------------------------------------------------------------------------
log.info('=== Part 1: Client Initialization ===\n');

// Keep a reference to the base HttpClient so Part 5 can wrap the same instance.
let baseHttpClient: HttpClient | undefined;
let client: Client;
if (useMock) {
  log.info('Running in MOCK mode (no live workspace).\n');
  baseHttpClient = createMockPostgresClient();
  client = new Client({host, httpClient: baseHttpClient});
} else {
  client = new Client({host, credentials: credentials!});
}
log.info('Postgres client created.');

// ---------------------------------------------------------------------------
// Part 2: Pagination
// ---------------------------------------------------------------------------
log.info('\n=== Part 2: Pagination ===\n');

// 2a: Manual pagination — request one page at a time.
log.info('--- 2a: Manual pagination ---');
const firstPage = await client.listProjects(undefined, {pageSize: 2});
for (const p of firstPage.projects ?? []) {
  log.info('  Project:', p.name);
}
if (
  firstPage.nextPageToken !== undefined &&
  firstPage.nextPageToken !== ''
) {
  log.info('  Next page token:', firstPage.nextPageToken);
  const secondPage = await client.listProjects(undefined, {
    pageSize: 2,
    pageToken: firstPage.nextPageToken,
  });
  for (const p of secondPage.projects ?? []) {
    log.info('  Project (page 2):', p.name);
  }
} else {
  log.info('  (no more pages)');
}

// 2b: Async iterator — iterates all pages automatically.
log.info('--- 2b: Async iterator (all projects) ---');
const names: string[] = [];
for await (const p of client.listProjectsIter(undefined, {})) {
  names.push(p.name ?? '<unnamed>');
}
log.info('  Total projects:', names.length);
log.info('  Names:', names.join(', '));

// ---------------------------------------------------------------------------
// Part 3: Long-Running Operation (LRO) — create a project
// ---------------------------------------------------------------------------
log.info('\n=== Part 3: Long-Running Operation (LRO) ===\n');

const projectId = `demo-${Date.now()}`;
let projectName: string | undefined;

try {
  const op = await client.createProjectOperation(undefined, {
    projectId,
    project: {
      spec: {
        displayName: `SDK Demo ${projectId}`,
        pgVersion: 17,
      },
    },
  });

  // name() — server-assigned operation name.
  const opName = await op.name();
  log.info('Operation name:', opName);

  // metadata() — typed operation metadata.
  const meta = await op.metadata();
  log.info('Operation metadata:', JSON.stringify(meta));

  // done() — single poll; likely still running right after creation.
  const doneEarly = await op.done(undefined);
  log.info('Done (immediately after create):', doneEarly);

  // wait() — polls until the operation completes; returns the typed Project.
  log.info('Waiting for project creation...');
  const project = await op.wait(undefined);
  projectName = project.name;
  log.info('Project created:', project.name);
  log.info('Project UID:', project.uid);

  // done() again — should be true now.
  const doneAfterWait = await op.done(undefined);
  log.info('Done (after wait):', doneAfterWait);

  // ---------------------------------------------------------------------------
  // Part 4: Well-known types — Temporal.Instant and Temporal.Duration
  // ---------------------------------------------------------------------------
  log.info('\n=== Part 4: Well-Known Types ===\n');

  // Fetch the project to see fully-populated timestamps.
  const fetched = await client.getProject(undefined, {name: project.name});

  // Temporal.Instant — automatic deserialization from ISO 8601 timestamps.
  log.info('createTime (Temporal.Instant):', fetched.createTime?.toString());
  log.info('updateTime (Temporal.Instant):', fetched.updateTime?.toString());
  if (fetched.createTime !== undefined) {
    log.info(
      '  epochMilliseconds:',
      fetched.createTime.epochMilliseconds.toString()
    );
  }

  // Temporal.Duration — automatic deserialization from duration strings.
  const retention = fetched.status?.historyRetentionDuration;
  if (retention !== undefined) {
    log.info(
      'historyRetentionDuration (Temporal.Duration):',
      retention.toString()
    );
    log.info('  total seconds:', retention.total('seconds').toString());
  } else {
    log.info('historyRetentionDuration: not set on this project');
  }

  // ---------------------------------------------------------------------------
  // Part 5: Custom HttpClient — verbose request/response logging
  // ---------------------------------------------------------------------------
  log.info('\n=== Part 5: Custom HttpClient ===\n');

  // Build a base HttpClient, then wrap it with verbose logging that shows
  // the full request and response bodies for every HTTP call.
  // Reuse the same base HttpClient (mock or authenticated) and wrap it.
  const innerClient: HttpClient =
    baseHttpClient ?? newHttpClient({credentials: credentials!});
  const verboseClient = withVerboseLogging(innerClient);

  // Pass the custom HttpClient to a new postgres Client.
  const customClient = new Client({host, httpClient: verboseClient});

  log.info('Fetching project through custom HttpClient:');
  const refetched = await customClient.getProject(undefined, {
    name: project.name,
  });
  log.info('Got project:', refetched.name);
} finally {
  // ---------------------------------------------------------------------------
  // Part 6: Cleanup — delete the project
  // ---------------------------------------------------------------------------
  log.info('\n=== Part 6: Cleanup ===\n');

  if (projectName !== undefined) {
    try {
      const deleteOp = await client.deleteProjectOperation(undefined, {
        name: projectName,
      });
      log.info('Delete operation:', await deleteOp.name());
      await deleteOp.wait(undefined);
      log.info('Project deleted.');
    } catch (err) {
      log.warn(
        'Cleanup failed (the project may still be provisioning):',
        err instanceof Error ? err.message : String(err)
      );
      log.warn('Delete it manually:', `projects/${projectId}`);
    }
  }
}
