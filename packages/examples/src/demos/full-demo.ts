/**
 * End-to-end demo of the SDK against a live workspace: profile and environment
 * resolution, U2M + M2M auth, token pagination, a Long-Running Operation,
 * streaming file upload, SQL execution, well-known Timestamp/Duration types,
 * oneof discriminated unions, and typed FieldMask.
 *
 * Prerequisites: a `demo` profile (`databricks auth login --profile demo`) and
 * a SQL warehouse in the workspace.
 *
 * Run: npm run full-demo --workspace @databricks/sdk-examples
 */

import {
  newM2mCredentials,
  newU2mCredentials,
} from '@databricks/sdk-auth/credentials';
import {CatalogsClient} from '@databricks/sdk-uc-catalogs/v1';
import {resolve} from '@databricks/sdk-core/profiles';
import {LogLevel} from '@databricks/sdk-core/logger';
import {PostgresClient, projectFieldMask} from '@databricks/sdk-postgres/v1';
import {FilesClient} from '@databricks/sdk-files/v2';
import {
  Disposition,
  Format,
  StatementExecutionClient as StatementClient,
} from '@databricks/sdk-statementexecution/v1';
import {WarehousesClient} from '@databricks/sdk-warehouses/v1';

const log = new LogLevel('info');

const PROFILE_NAME = 'demo';

function section(title: string): void {
  log.info('');
  log.info(`========== ${title} ==========`);
}

function rule(): void {
  log.info('-'.repeat(72));
}

// Build a fresh credentials object per client so each section is self-contained
// and the demo reads top-to-bottom without hidden globals.
function cliCredentials(): ReturnType<typeof newU2mCredentials> {
  return newU2mCredentials({profile: PROFILE_NAME});
}

// ---------------------------------------------------------------------------
// Part 1: Profile and environment resolution.
// ---------------------------------------------------------------------------
//
// `resolve()` is the single source of truth for client configuration. It
// reads ~/.databrickscfg (honoring DATABRICKS_CONFIG_FILE) and DATABRICKS_*
// environment variables, then merges them based on what the caller asked
// for:
//
//   resolve()                                  — file + env overlay (default)
//   resolve({profile: 'demo'})                 — that profile, file + env
//   resolve({profile: 'demo', disableEnv: true})— that profile, file only
//
// Both sources are read by default; `noProfile` and `disableEnv` turn off the
// file and the env overlay respectively.
//
// Profile-name fallback chain when `profile` is not set:
//   1. DATABRICKS_CONFIG_PROFILE env var
//   2. `default_profile` key in the [__settings__] INI section
//   3. The [DEFAULT] section
async function showProfile(): Promise<void> {
  section('1. Profile + environment resolution');

  // Helper: temporarily set DATABRICKS_HOST around a callback, restoring
  // the previous value (or leaving it unset) when done. The env var is
  // what `resolve()` will overlay on top of the file when overlay is
  // enabled.
  async function withEnvHost<T>(
    overrideHost: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const previous = process.env.DATABRICKS_HOST;
    process.env.DATABRICKS_HOST = overrideHost;
    try {
      return await fn();
    } finally {
      if (previous === undefined) {
        delete process.env.DATABRICKS_HOST;
      } else {
        process.env.DATABRICKS_HOST = previous;
      }
    }
  }

  // ----- 1a. Default resolution: no options. -----
  // `resolve()` reads the file, picks a profile via the fallback chain,
  // then overlays every DATABRICKS_* env var on top. The demo proves the
  // overlay by calling resolve() twice — once with no env, then with
  // DATABRICKS_HOST set — and showing the host changes.
  rule();
  log.info('1a. resolve() — no options, file + env overlay');
  const fromFile = await resolve();
  log.info('  Profile resolved:        ', fromFile.name ?? '(none)');
  log.info('  Host (file only):        ', fromFile.host ?? '(unset)');
  log.info('  Auth type:               ', fromFile.authType ?? '(unset)');
  await withEnvHost('https://env-override.example.com', async () => {
    const overlaid = await resolve();
    log.info('  After DATABRICKS_HOST=https://env-override.example.com:');
    log.info('    Host (env overlaid): ', overlaid.host ?? '(unset)');
  });

  // ----- 1b. Explicit profile: file + env by default, opt out of env. -----
  // `resolve({profile: 'demo'})` picks the named profile and still overlays
  // DATABRICKS_* env vars on top. Pass `disableEnv: true` when the config file
  // must be the source of truth and a stray shell variable should not silently
  // retarget your code.
  rule();
  log.info('1b. resolve({profile: "demo"}) — explicit profile, file + env');
  const demoProfile = await resolve({profile: PROFILE_NAME});
  log.info('  Profile resolved:        ', demoProfile.name);
  log.info('  Host:                    ', demoProfile.host);
  log.info('  Auth type:               ', demoProfile.authType ?? '(unset)');
  // Secrets (token, password, client_secret) are wrapped in a `Secret` type
  // that hides their value from logs and stack traces.
  log.info('  Token configured:        ', demoProfile.token !== undefined);

  // Same env override as 1a: the overlay applies by default, and
  // `disableEnv: true` suppresses it.
  await withEnvHost('https://env-override.example.com', async () => {
    const overlaid = await resolve({profile: PROFILE_NAME});
    const fileOnly = await resolve({profile: PROFILE_NAME, disableEnv: true});
    log.info('  After DATABRICKS_HOST=https://env-override.example.com:');
    log.info('    Host (env overlaid):   ', overlaid.host);
    log.info('    Host (disableEnv:true):', fileOnly.host);
  });
}

// ---------------------------------------------------------------------------
// Part 2: Auth strategies — U2M (CLI) and M2M (OAuth client credentials).
// ---------------------------------------------------------------------------
//
// Every auth strategy in the SDK satisfies the same `Credentials` interface
// (`name()`, `authHeaders()`), so transports, retry, and clients are
// strategy-agnostic.
async function showAuth(): Promise<void> {
  section('2. Authentication strategies');

  // --- 2a: U2M — shells out to the Databricks CLI for a refreshable token.
  rule();
  log.info('2a. U2M (Databricks CLI):');
  const u2m = cliCredentials();
  log.info('  Strategy name:        ', u2m.name());
  const token = await u2m.token();
  log.info('  Token type:           ', token.type ?? 'Bearer');
  log.info('  Expires at:           ', token.expiry?.toISOString() ?? '(none)');
  log.info('  Access token preview: ', `${token.value.slice(0, 16)}…`);
  // authHeaders() is what the SDK transport calls per request. PAT, M2M, and
  // U2M all return identical Header[] shapes here.
  const headers = await u2m.authHeaders();
  log.info('  Auth header keys:     ', headers.map(h => h.key).join(', '));

  // --- 2b: M2M — service principal OAuth client credentials. We construct
  // the credentials object to demonstrate the API surface; the actual token
  // request would require real M2M client credentials.
  rule();
  log.info('2b. M2M (OAuth client credentials):');
  const profile = await resolve({profile: PROFILE_NAME});
  const m2m = newM2mCredentials({
    host: profile.host ?? '',
    clientId: '<client-id>',
    clientSecret: '<client-secret>',
    scopes: ['all-apis'],
  });
  log.info('  Strategy name:        ', m2m.name());
  log.info(
    '  M2M satisfies the same Credentials interface as U2M — every client',
    '\n                            accepts either without code changes.'
  );
}

// ---------------------------------------------------------------------------
// Part 3: Token-based pagination via async iterators.
// ---------------------------------------------------------------------------
//
// Every paginated list endpoint comes in two forms:
//   - `listX(req)`        — single page; caller threads `pageToken` manually.
//   - `listXIter(req)`    — async generator that handles page tokens
//                            internally so callers loop with `for await`.
//
// The Unity Catalog list endpoint is a great target: the demo workspace has
// hundreds of catalogs, so a small page size guarantees multiple round
// trips. Section 3a shows the raw page-token protocol; 3b shows the same
// loop reduced to three lines via the iterator.
async function showPagination(host: string): Promise<void> {
  section('3. Token-based pagination (async iterator)');

  const client = new CatalogsClient({host, credentials: cliCredentials()});
  const pageSize = 10;
  const itemLimit = 25;

  // ----- 3a. Manual paging — threads pageToken by hand. -----
  rule();
  log.info('3a. Manual paging via listCatalogs({maxResults: 10})');
  let pages = 0;
  let manualTotal = 0;
  let pageToken: string | undefined;
  for (;;) {
    pages += 1;
    const resp = await client.listCatalogs({
      maxResults: pageSize,
      ...(pageToken !== undefined && {pageToken}),
    });
    const items = resp.catalogs ?? [];
    manualTotal += items.length;
    const tokenPreview =
      resp.nextPageToken !== undefined && resp.nextPageToken !== ''
        ? `${resp.nextPageToken.slice(0, 24)}…`
        : '(none — last page)';
    log.info(
      `  page ${String(pages)}: ${String(items.length)} item(s); next token: ${tokenPreview}`
    );
    if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
      break;
    }
    pageToken = resp.nextPageToken;
    if (manualTotal >= itemLimit) {
      log.info(`  (stopping after ${String(manualTotal)} items for the demo)`);
      break;
    }
  }
  log.info('  Items consumed:        ', manualTotal);
  log.info('  Page calls made:       ', pages);

  // ----- 3b. The same loop with the async iterator. -----
  rule();
  log.info(
    '3b. listCatalogsIter({maxResults: 10}) — token threading is internal'
  );
  let iterCount = 0;
  for await (const cat of client.listCatalogsIter({
    maxResults: pageSize,
  })) {
    iterCount += 1;
    if (iterCount === 1 || iterCount === 11 || iterCount === 21) {
      log.info(`  item ${String(iterCount)}: ${cat.name ?? '(unnamed)'}`);
    }
    if (iterCount >= itemLimit) {
      break;
    }
  }
  log.info('  Items consumed:        ', iterCount);
  log.info(
    '  ≥ pages fetched:       ',
    Math.ceil(iterCount / pageSize),
    '(transparent to the caller)'
  );
}

// ---------------------------------------------------------------------------
// Part 4: Long-Running Operation — Lakebase project creation.
// ---------------------------------------------------------------------------
//
// `createProjectOperation` issues the create request, then returns a typed
// `CreateProjectOperation` whose `wait()` polls the operation until done.
// The waiter shares the SDK's retry primitives with every other LRO in the
// SDK (jobs runs, warehouse start/stop, etc.).
async function showLro(host: string): Promise<{projectName: string}> {
  section('4. Long-Running Operation: create Lakebase project');

  const client = new PostgresClient({host, credentials: cliCredentials()});

  // Each run uses a fresh project ID so the LRO always exercises the full
  // create + poll cycle. Project IDs are 1–63 chars, lowercase, must start
  // with a letter, and may contain digits and hyphens.
  const projectId = `sdkjs-demo-${String(Date.now())}`;
  log.info('Project ID:              ', projectId);

  const startedAt = new Date();
  log.info('Started at:              ', startedAt.toISOString());

  const op = await client.createProjectOperation({
    projectId,
    project: {
      spec: {
        displayName: 'JS SDK Demo Project',
      },
    },
  });
  log.info('Operation name:          ', (await op.name()) ?? '(none)');
  log.info('Polling until done…');

  const project = await op.wait(undefined);
  const completedAt = new Date();
  const elapsedSec = (
    (completedAt.getTime() - startedAt.getTime()) /
    1000
  ).toFixed(1);

  log.info('Completed at:            ', completedAt.toISOString());
  log.info('Elapsed:                 ', `${elapsedSec}s`);
  log.info('Project name:            ', project.name);
  log.info('Display name:            ', project.status?.displayName);
  log.info('Owner:                   ', project.status?.owner);

  if (project.name === undefined || project.name === '') {
    throw new Error('createProject returned a project without a name.');
  }
  return {projectName: project.name};
}

// ---------------------------------------------------------------------------
// Part 5: Streaming file upload (Files API on a Unity Catalog volume).
// ---------------------------------------------------------------------------
//
// `uploadFile` accepts a `ReadableStream` for `contents`, so the client can
// stream a file body to the server without materializing the whole payload
// in memory. The demo builds a small chunked stream from text lines, then
// pulls 64 KiB chunks until 5 MiB total has been emitted, so the SDK
// forwards bytes to the network as they're produced rather than buffering
// the whole 5 MiB in memory before the request starts.
async function showStreamingUpload(host: string): Promise<void> {
  section('5. Streaming file upload (Files API)');

  const client = new FilesClient({host, credentials: cliCredentials()});
  // A Unity Catalog volume you can write to; override with DEMO_VOLUME.
  const volume = process.env.DEMO_VOLUME ?? '/Volumes/main/default/my_volume';
  const filePath = `${volume}/sdk-js-demo-${String(Date.now())}.bin`;

  const chunkSize = 64 * 1024;
  const totalBytes = 5 * 1024 * 1024;
  const totalChunks = Math.ceil(totalBytes / chunkSize);
  let bytesEmitted = 0;
  let chunksEmitted = 0;
  const contents = new ReadableStream<Uint8Array>({
    pull(controller): void {
      if (bytesEmitted >= totalBytes) {
        controller.close();
        return;
      }
      const remaining = totalBytes - bytesEmitted;
      const size = Math.min(chunkSize, remaining);
      const chunk = new Uint8Array(size);
      // Fill with a deterministic byte pattern so the demo doesn't depend
      // on a crypto RNG and the bytes can be inspected if needed.
      for (let i = 0; i < size; i++) {
        chunk[i] = (bytesEmitted + i) & 0xff;
      }
      controller.enqueue(chunk);
      bytesEmitted += size;
      chunksEmitted += 1;
      if (chunksEmitted === 1 || chunksEmitted % 16 === 0) {
        log.info(
          '  streamed chunk:       ',
          chunksEmitted,
          '/',
          totalChunks,
          `(${String(bytesEmitted)} bytes)`
        );
      }
    },
  });

  log.info('Uploading to:            ', filePath);
  log.info('Total payload:           ', `${String(totalBytes)} bytes`);
  log.info('Chunk size:              ', `${String(chunkSize)} bytes`);
  const startedAt = Date.now();
  await client.uploadFile({filePath, contents, overwrite: true});
  const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1);
  log.info(
    'Upload complete:         ',
    `${String(chunksEmitted)} chunks, ${String(bytesEmitted)} bytes`
  );
  log.info('Elapsed:                 ', `${elapsedSec}s`);
}

// ---------------------------------------------------------------------------
// Part 6: SQL execution against the warehouse.
// ---------------------------------------------------------------------------
//
// `executeStatement` exercises HTTP transport, request marshaling, response
// unmarshaling, and inline result delivery. Setting `waitTimeout` lets the
// service auto-start the warehouse (if stopped) and return inline results
// in a single round-trip.
async function showSqlExecution(host: string): Promise<void> {
  section('6. SQL execution');

  // Pick the first warehouse in the workspace. `executeStatement` will
  // auto-start it if it's stopped (via `waitTimeout`).
  const warehouses = new WarehousesClient({
    host,
    credentials: cliCredentials(),
  });
  const list = await warehouses.listWarehouses({});
  const warehouseId = list.warehouses?.[0]?.id;
  if (warehouseId === undefined) {
    throw new Error('No warehouse available in the workspace.');
  }
  log.info('Warehouse:               ', warehouseId);

  const client = new StatementClient({host, credentials: cliCredentials()});
  const resp = await client.executeStatement({
    warehouseId,
    statement:
      "SELECT current_timestamp() AS ts, 'demo' AS label, value FROM range(3) AS t(value)",
    waitTimeout: '50s',
    disposition: Disposition.INLINE,
    format: Format.JSON_ARRAY,
  });

  log.info('Statement ID:            ', resp.statementId);
  log.info('Statement state:         ', resp.status?.state);
  log.info('Total rows:              ', resp.manifest?.totalRowCount ?? 0);
  log.info('Schema:');
  for (const col of resp.manifest?.schema?.columns ?? []) {
    log.info(`  - ${col.name ?? '?'}: ${col.typeText ?? '?'}`);
  }
  log.info('Rows:');
  for (const row of resp.result?.dataArray ?? []) {
    log.info('  ', row);
  }
}

// ---------------------------------------------------------------------------
// Part 7: Lakebase API + well-known types (Timestamp / Duration).
// ---------------------------------------------------------------------------
//
// The Postgres (Lakebase) client returns proto Timestamp and Duration as
// Temporal.Instant and Temporal.Duration respectively. The demo loads the
// first project from the paginated list and shows the typed timestamp.
async function showLakebase(host: string): Promise<void> {
  section('7. Lakebase API + well-known types (Timestamp/Duration)');

  const client = new PostgresClient({host, credentials: cliCredentials()});
  let count = 0;
  for await (const project of client.listProjectsIter({
    pageSize: 5,
  })) {
    count += 1;
    log.info('Project:                ', project.name ?? '(unnamed)');
    log.info('  display name:         ', project.status?.displayName);
    log.info('  pg version:           ', project.status?.pgVersion);
    log.info('  owner:                ', project.status?.owner);
    // createTime is a Temporal.Instant — the SDK's wrapping of
    // google.protobuf.Timestamp. It supports subsecond precision and stable
    // string formatting via `.toString()` / `.toLocaleString(...)`.
    if (project.createTime !== undefined) {
      log.info('  createTime (Instant): ', project.createTime.toString());
      log.info(
        '    epoch nanoseconds:  ',
        project.createTime.epochNanoseconds.toString()
      );
    }
    if (project.updateTime !== undefined) {
      log.info('  updateTime (Instant): ', project.updateTime.toString());
    }
    // history_retention_duration is a Temporal.Duration (proto Duration).
    if (project.status?.historyRetentionDuration !== undefined) {
      log.info(
        '  history retention:    ',
        project.status.historyRetentionDuration.toString()
      );
    }
    if (count >= 3) {
      break;
    }
  }
  if (count === 0) {
    log.info('No Lakebase projects in this workspace.');
  }
}

// ---------------------------------------------------------------------------
// Part 8: OneOf in a server response (discriminated unions).
// ---------------------------------------------------------------------------
//
// Protobuf "oneof" surfaces in TypeScript responses as a discriminated union
// with a `$case` discriminator. Exactly one variant is populated by the
// server, and each variant has its own strongly-typed payload — the
// compiler narrows access inside a `switch` on `$case`.
//
// We dispatch on `ProjectDefaultEndpointSettings.suspension`, returned in
// every Lakebase project's status:
//
//   suspension?:
//     | {$case: 'suspendTimeoutDuration'; suspendTimeoutDuration: Temporal.Duration}
//     | {$case: 'noSuspension';           noSuspension: boolean}
//     | undefined
//
// Two variants, two distinct types (Duration vs boolean) — exactly the
// kind of polymorphic field where dynamic typing would force runtime
// guards but the discriminated union doesn't.
async function showOneOf(host: string, projectName: string): Promise<void> {
  section('8. OneOf in a response: ProjectDefaultEndpointSettings.suspension');

  const client = new PostgresClient({host, credentials: cliCredentials()});
  const project = await client.getProject({name: projectName});
  const suspension = project.status?.defaultEndpointSettings?.suspension;

  log.info('Project:                 ', project.name);

  // Switch on the discriminator. Inside each case the compiler narrows
  // `suspension` to exactly that variant — we can only access the field
  // that belongs to it, with its proper type.
  switch (suspension?.$case) {
    case 'suspendTimeoutDuration':
      // suspension is now { $case: …; suspendTimeoutDuration: Temporal.Duration }
      log.info('Variant:                 ', 'suspendTimeoutDuration');
      log.info(
        '  Duration (typed):      ',
        suspension.suspendTimeoutDuration.toString()
      );
      log.info(
        '  Duration in seconds:   ',
        suspension.suspendTimeoutDuration.total({unit: 'seconds'})
      );
      break;
    case 'noSuspension':
      // suspension is now { $case: 'noSuspension'; noSuspension: boolean }
      log.info('Variant:                 ', 'noSuspension');
      log.info('  Disabled (boolean):    ', suspension.noSuspension);
      break;
    case undefined:
      log.info('Variant:                 ', '(none — no suspension setting)');
      break;
  }

  // Trying to read the wrong variant is rejected at compile time:
  //
  //   if (suspension?.$case === 'suspendTimeoutDuration') {
  //     suspension.noSuspension;
  //     //         ^ Property "noSuspension" does not exist on type
  //     //           '{ $case: "suspendTimeoutDuration";
  //     //              suspendTimeoutDuration: Temporal.Duration }'.
  //   }
  log.info('Variant access narrowed by the compiler — no runtime type checks.');
}

// ---------------------------------------------------------------------------
// Part 9: Typed FieldMask for partial updates.
// ---------------------------------------------------------------------------
//
// `FieldMask<T>` is a phantom-typed wrapper over wire-format dotted paths.
// Each generated package exposes a per-message factory (e.g.
// `projectFieldMask(...)`) that knows the message's schema, validates
// every path against it, normalizes (dedup + sort + parent-subsumption),
// and serializes to comma-joined snake_case for the request URL.
function showFieldMask(): void {
  section('9. FieldMask: typed partial-update paths');

  // Build a typed mask via the generated factory. The result is a
  // `FieldMask<Project>`, which `UpdateProjectRequest.updateMask` accepts
  // directly — phantom typing prevents passing the wrong message's mask.
  const mask = projectFieldMask(
    'spec.displayName',
    'spec.historyRetentionDuration'
  );
  log.info('Wire-format mask:        ', mask.toString());

  // Normalization: a parent subsumes its children, so duplicates collapse.
  const subsumed = projectFieldMask('spec', 'spec.displayName');
  log.info('Parent subsumes child:   ', subsumed.toString());

  // Validation: an unknown path throws at build time, before any HTTP call.
  try {
    projectFieldMask('spec.bogus');
  } catch (e) {
    log.info('Bad path rejected:       ', (e as Error).message);
  }
}

// ---------------------------------------------------------------------------
// Part 10: Cleanup — delete the project we created in section 4.
// ---------------------------------------------------------------------------
//
// `deleteProjectOperation` is the symmetric LRO. We pass `purge: true` so
// the project is fully removed instead of soft-deleted.
async function showCleanup(host: string, projectName: string): Promise<void> {
  section('10. Cleanup');

  const client = new PostgresClient({host, credentials: cliCredentials()});
  const startedAt = new Date();
  log.info('Deleting project:        ', projectName);
  log.info('Started at:              ', startedAt.toISOString());

  const op = await client.deleteProjectOperation({
    name: projectName,
    purge: true,
  });
  await op.wait(undefined);

  const completedAt = new Date();
  const elapsedSec = (
    (completedAt.getTime() - startedAt.getTime()) /
    1000
  ).toFixed(1);
  log.info('Completed at:            ', completedAt.toISOString());
  log.info('Elapsed:                 ', `${elapsedSec}s`);
}

// ---------------------------------------------------------------------------

const profile = await resolve({profile: PROFILE_NAME});
const host = profile.host;
if (host === undefined || host === '') {
  log.error(
    `Profile "${PROFILE_NAME}" is missing a host. ` +
      `Run \`databricks auth login --profile ${PROFILE_NAME}\` first.`
  );
  process.exit(1);
}

const startedAt = Date.now();
await showProfile();
await showAuth();
await showPagination(host);
const {projectName} = await showLro(host);
await showStreamingUpload(host);
await showSqlExecution(host);
await showLakebase(host);
await showOneOf(host, projectName);
showFieldMask();
await showCleanup(host, projectName);

log.info('');
log.info(
  `=== Demo complete in ${((Date.now() - startedAt) / 1000).toFixed(1)}s ===`
);
