/**
 * End-to-end check: int64 round-trip with the regenerated sdk-js using the
 * `demo` profile from ~/.databrickscfg. Tests both directions and overflow.
 */

import {execFileSync} from 'node:child_process';
import {newPatCredentials} from '@databricks/sdk-auth/credentials';
import {resolve} from '@databricks/sdk-core/profiles';
import {ApiError} from '@databricks/sdk-core/apierror';
import {codeToString} from '@databricks/sdk-core/apierror/codes';
import {newFetchHttpClient} from '@databricks/sdk-core/http';
import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';
import {Client as JobsClient} from '@databricks/sdk-jobs/v2';
import JSONBig from 'json-bigint';
import {z} from 'zod';

// Mirrors the unmarshal schema the generator now emits for an int64 field:
// json-bigint hands us number for small values, bigint for values that
// wouldn't fit, so the schema accepts either and normalizes to bigint.
const int64Schema = z
  .union([z.number(), z.bigint()])
  .transform(v => BigInt(v));

// Same json-bigint config the generated utils.ts uses.
const jsonBigint = JSONBig({useNativeBigInt: true});

// Captures the most recent request body so we can assert exactly what shape
// the SDK marshaled. Adds Authorization manually (the SDK won't wire its own
// auth when a custom httpClient is supplied).
class CapturingHttpClient implements HttpClient {
  lastBody: string | undefined;
  lastUrl: string | undefined;
  lastMethod: string | undefined;
  private readonly inner = newFetchHttpClient();
  constructor(private readonly token: string) {}

  async send(request: HttpRequest): Promise<HttpResponse> {
    this.lastMethod = request.method;
    this.lastUrl = request.url;
    this.lastBody =
      typeof request.body === 'string' ? request.body : undefined;
    const headers = new Headers(request.headers);
    headers.set('Authorization', `Bearer ${this.token}`);
    return this.inner.send({...request, headers});
  }
}

async function main(): Promise<void> {
  const profile = await resolve({profile: 'demo'});
  if (profile.host === undefined) {
    throw new Error('demo profile must declare host');
  }
  const host = profile.host;
  // The demo profile uses databricks-cli OAuth — sdk-js auth only ships
  // PAT/M2M today. Mint a short-lived access token through the CLI so this
  // script can use the standard PAT credentials path.
  const cliOut = execFileSync(
    'databricks',
    ['--profile', 'demo', 'auth', 'token'],
    {encoding: 'utf8'},
  );
  const token = (JSON.parse(cliOut) as {access_token: string}).access_token;
  const httpClient = new CapturingHttpClient(token);
  const client = new JobsClient({host, httpClient});

  // ----- 1. server → client: real response unmarshal -----
  console.log('=== 1. Real server response (jobs.list) ===');
  const list = await client.listJobs({limit: 5n});
  const jobs = list.jobs ?? [];
  if (jobs.length === 0) throw new Error('no jobs returned');
  const job = jobs[0]!;
  console.log('  jobId =', job.jobId, '(', typeof job.jobId, ')');
  console.log('  createdTime =', job.createdTime, '(', typeof job.createdTime, ')');
  if (typeof job.jobId !== 'bigint') throw new Error('jobId not bigint');
  console.log('  ✓ bigint type\n');

  // ----- 2. client → server (URL query) -----
  console.log('=== 2. URL query marshal (jobs.get) ===');
  const got = await client.getJob({jobId: job.jobId});
  if (got.jobId !== job.jobId) throw new Error('mismatch');
  console.log('  ✓ round-trip via URL\n');

  // ----- 3. server → client overflow, JSON number > 2^53 -----
  // The SDK's parseResponse uses json-bigint, which preserves large integers
  // as bigint instead of rounding to JS Number. Simulate that path here.
  console.log('=== 3. Synthetic inbound JSON NUMBER > 2^53 ===');
  const overflowNumberJson = '{"job_id":9007199254740993}';
  const parsedNum = (jsonBigint.parse(overflowNumberJson) as {job_id: unknown})
    .job_id;
  console.log('  jsonBigint.parse job_id:', parsedNum, '(', typeof parsedNum, ')');
  const fromNum = int64Schema.parse(parsedNum);
  console.log('  unmarshaled:', fromNum);
  if (fromNum !== 9007199254740993n) {
    throw new Error('inbound JSON number > 2^53 lost precision');
  }
  console.log('  ✓ full precision preserved through json-bigint\n');

  // ----- 4. server → client, max int64 -----
  console.log('=== 4. Synthetic inbound JSON NUMBER at int64 max ===');
  const maxJson = '{"job_id":9223372036854775807}';
  const parsedMax = (jsonBigint.parse(maxJson) as {job_id: unknown}).job_id;
  console.log('  jsonBigint.parse job_id:', parsedMax, '(', typeof parsedMax, ')');
  const fromMax = int64Schema.parse(parsedMax);
  if (fromMax !== 9223372036854775807n) {
    throw new Error('inbound int64 max did not round-trip');
  }
  console.log('  ✓ int64 max preserved\n');

  // ----- 5/6. wire format experiments -----
  console.log('=== 5/6. Body wire format: does server accept string AND number? ===');
  const nonExistentId = '999999999999';
  await testWire(host, token, 'JSON string', `{"job_id":"${nonExistentId}"}`);
  await testWire(host, token, 'JSON number', `{"job_id":${nonExistentId}}`);
  console.log();

  // ----- 7. outbound overflow via SDK -----
  console.log('=== 7. SDK marshal of bigint > 2^53 (deleteJob with huge id) ===');
  const big = 2n ** 53n + 1n;
  console.log('  big =', big, '(>', BigInt(Number.MAX_SAFE_INTEGER), ')');
  try {
    await client.deleteJob({jobId: big});
    console.log('  unexpectedly succeeded');
  } catch (e) {
    if (e instanceof ApiError) {
      console.log(
        '  SDK sent: ' + (httpClient.lastMethod ?? '?') + ' ' +
        (httpClient.lastUrl ?? '?'),
      );
      console.log('  body sent:', httpClient.lastBody);
      console.log('  server code:', codeToString(e.code), '/ HTTP', e.httpStatusCode);
      console.log('  server message:', e.message);
      // Two things to verify here:
      //  (a) the body was emitted as a raw JSON number, not a string —
      //      e.g. {"job_id":9007199254740993} with no quotes around the
      //      digits;
      //  (b) the server received the full value (its message echoes the
      //      id, which proves no precision loss in transit).
      const bodyHasQuotedNumber = httpClient.lastBody?.includes(
        '"' + big.toString() + '"',
      );
      const bodyHasRawNumber = httpClient.lastBody?.includes(
        ':' + big.toString(),
      );
      if (bodyHasQuotedNumber) {
        console.log('  ✗ body emitted as JSON string — that\'s wrong');
      } else if (!bodyHasRawNumber) {
        console.log('  ⚠ body shape unexpected; check it');
      } else {
        console.log('  ✓ body emitted as raw JSON number');
      }
      if (e.message.includes(big.toString())) {
        console.log(
          '  ✓ server received the full int64 value (no precision loss)',
        );
      } else {
        console.log('  ⚠ server may have garbled the value; check message');
      }
    } else {
      throw e;
    }
  }

  console.log('\nDONE.');
}

async function testWire(host: string, token: string, label: string, body: string): Promise<void> {
  const resp = await fetch(`${host}/api/2.2/jobs/delete`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    body,
  });
  const text = await resp.text();
  console.log(`  [${label.padEnd(11)}] body=${body}`);
  console.log(`               -> HTTP ${resp.status}: ${text.slice(0, 160).trim()}`);
}

await main();
