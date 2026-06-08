/**
 * Example: Authentication and Error Handling
 *
 * Demonstrates PAT authentication against a Databricks workspace and
 * structured error handling with the ApiError and ErrorDetails types.
 *
 * Prerequisites:
 *   export DATABRICKS_HOST="https://<workspace>.cloud.databricks.com"
 *   export DATABRICKS_TOKEN="<your-pat>"
 *
 * Run from the repo root:
 *   npm run auth-and-errors --workspace @databricks/sdk-examples
 */

import {newPatCredentials} from '@databricks/sdk-auth/credentials';
import {ApiError} from '@databricks/sdk-core/apierror';
import {LogLevel} from '@databricks/sdk-core/logger';

const log = new LogLevel('debug');

const host = process.env.DATABRICKS_HOST ?? '';
const token = process.env.DATABRICKS_TOKEN ?? '';

if (host === '' || token === '') {
  log.error('Set DATABRICKS_HOST and DATABRICKS_TOKEN environment variables.');
  process.exit(1);
}

// Helper: convert auth headers to a plain object for fetch().
async function authHeaders(): Promise<Record<string, string>> {
  const creds = newPatCredentials(token);
  const headers = await creds.authHeaders();
  return Object.fromEntries(headers.map(h => [h.key, h.value]));
}

// Helper: parse a fetch Response into an ApiError (returns undefined on 2xx).
async function toApiError(resp: Response): Promise<ApiError | undefined> {
  const body = new Uint8Array(await resp.arrayBuffer());
  return ApiError.fromHttpError(resp.status, resp.headers, body);
}

// ---------------------------------------------------------------------------
// Part 1: Authenticate and call a real API
// ---------------------------------------------------------------------------
async function runAuth(): Promise<void> {
  log.info('=== Part 1: Authentication with PAT ===\n');

  const creds = newPatCredentials(token);
  const headersValues = await creds.authHeaders();
  const headers = Object.fromEntries(headersValues.map(h => [h.key, h.value]));

  const resp = await fetch(`${host}/api/2.0/preview/scim/v2/Me`, {headers});

  // Read the body once — it can only be consumed a single time.
  const body = new Uint8Array(await resp.arrayBuffer());
  const err = ApiError.fromHttpError(resp.status, resp.headers, body);

  if (err) {
    log.error('Request failed:', err.message);
    return;
  }

  const me = JSON.parse(new TextDecoder().decode(body)) as {
    displayName?: string;
    userName?: string;
    id?: string;
  };
  log.info('Authenticated as:', me.displayName ?? me.userName);
  log.info('User ID:', me.id);
}

// ---------------------------------------------------------------------------
// Part 2: Structured error handling
// ---------------------------------------------------------------------------
async function runErrorHandling(): Promise<void> {
  log.info('=== Part 2: Structured Error Handling ===\n');

  const headers = await authHeaders();

  // 2a: Request a non-existent Lakebase Postgres project — expect a 404.
  log.info('--- 2a: Requesting a non-existent Lakebase project ---');
  const resp404 = await fetch(
    `${host}/api/2.0/postgres/projects/does-not-exist`,
    {headers}
  );
  const err404 = await toApiError(resp404);
  if (err404) {
    log.info('  Code:       ', err404.code);
    log.info('  HTTP Status:', err404.httpStatusCode);
    log.info('  Message:    ', err404.message);
    if (err404.details.errorInfo) {
      log.info('  ErrorInfo:');
      log.info('    Reason:  ', err404.details.errorInfo.reason);
      log.info('    Domain:  ', err404.details.errorInfo.domain);
      log.info('    Metadata:', err404.details.errorInfo.metadata);
    }
    if (err404.details.requestInfo) {
      log.info('  RequestInfo:');
      log.info('    RequestId:  ', err404.details.requestInfo.requestId);
    }
  }

  // 2b: Use an invalid token to trigger an auth error.
  log.info('--- 2b: Using an invalid token ---');
  const resp401 = await fetch(`${host}/api/2.0/postgres/projects`, {
    headers: {Authorization: 'Bearer invalid-token-value'},
  });
  const err401 = await toApiError(resp401);
  if (err401) {
    log.info('  Code:       ', err401.code);
    log.info('  HTTP Status:', err401.httpStatusCode);
    log.info('  Message:    ', err401.message);
  }

  // 2c: Show that 2xx responses produce no ApiError.
  log.info('--- 2c: Successful request returns no error ---');
  const respOk = await fetch(`${host}/api/2.0/postgres/projects`, {headers});
  const errOk = await toApiError(respOk);
  log.info('  ApiError:', errOk ?? 'undefined (success)');
}

// ---------------------------------------------------------------------------

await runAuth();
await runErrorHandling();
