import {mkdtempSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import type {Credentials} from '@databricks/sdk-auth';
import {newM2mCredentials} from '@databricks/sdk-auth/credentials';
import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';

import {main} from '../src/profile-client';

const HOST = 'https://profile-host.cloud.databricks.com';
const OIDC_ROOT = `${HOST}/oidc`;
const TOKEN_ENDPOINT = `${OIDC_ROOT}/v1/token`;
const ENV_KEYS = [
  'HOME',
  'DATABRICKS_CONFIG_FILE',
  'DATABRICKS_CONFIG_PROFILE',
  'DATABRICKS_HOST',
  'DATABRICKS_TOKEN',
  'DATABRICKS_CLIENT_ID',
  'DATABRICKS_CLIENT_SECRET',
  'DATABRICKS_AUTH_TYPE',
  'DATABRICKS_GROUP_ID',
];

function jsonResponse(body: unknown): HttpResponse {
  return {
    statusCode: 200,
    headers: new Headers({'content-type': 'application/json'}),
    body: new Response(JSON.stringify(body)).body,
  };
}

function urlOf(input: string | URL | Request): string {
  if (typeof input === 'string') return input;
  if (input instanceof URL) return input.href;
  return input.url;
}

function stubM2mFetch(): URLSearchParams[] {
  const tokenForms: URLSearchParams[] = [];
  const fetchMock = vi.fn<typeof fetch>((input, init) => {
    const url = urlOf(input);
    if (url === `${HOST}/.well-known/databricks-config`) {
      return Promise.resolve(
        new Response(JSON.stringify({oidc_endpoint: OIDC_ROOT}), {status: 200})
      );
    }
    if (url === `${OIDC_ROOT}/.well-known/oauth-authorization-server`) {
      return Promise.resolve(
        new Response(JSON.stringify({token_endpoint: TOKEN_ENDPOINT}), {
          status: 200,
        })
      );
    }
    if (url === TOKEN_ENDPOINT) {
      const body = init?.body;
      if (typeof body !== 'string') {
        expect.fail('expected token request body to be a string');
      }
      tokenForms.push(new URLSearchParams(body));
      return Promise.resolve(
        new Response(
          JSON.stringify({access_token: 'access-token', token_type: 'Bearer'}),
          {status: 200}
        )
      );
    }
    return Promise.resolve(
      new Response(`unexpected URL: ${url}`, {status: 599})
    );
  });
  vi.stubGlobal('fetch', fetchMock);
  return tokenForms;
}

function recordingHttpClient(): {
  httpClient: HttpClient;
  request: () => HttpRequest;
} {
  let seen: HttpRequest | undefined;
  return {
    httpClient: {
      send(request: HttpRequest): Promise<HttpResponse> {
        seen = request;
        return Promise.resolve(jsonResponse({model: 'demo-model'}));
      },
    },
    request: (): HttpRequest => {
      if (seen === undefined) {
        throw new Error('the client did not send a request');
      }
      return seen;
    },
  };
}

function expectNoRoleHeaders(request: HttpRequest): void {
  for (const header of [
    'assume_group',
    'X-Databricks-Assume-Group',
    'X-Databricks-Role',
  ]) {
    expect(request.headers.has(header), `${header} should be absent`).toBe(
      false
    );
  }
}

function expectGroupedClientRequest(
  tokenForms: URLSearchParams[],
  request: HttpRequest,
  groupId: string
): void {
  expect(tokenForms).toHaveLength(1);
  expect([...tokenForms[0].entries()]).toEqual([
    ['grant_type', 'client_credentials'],
    ['scope', 'all-apis'],
    ['assume_group', groupId],
  ]);
  expect(request.headers.get('Authorization')).toBe('Bearer access-token');
  expectNoRoleHeaders(request);
}

describe('generated client group assumption', () => {
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const key of ENV_KEYS) {
      saved[key] = process.env[key];
      Reflect.deleteProperty(process.env, key);
    }
    process.env.HOME = mkdtempSync(join(tmpdir(), 'group-client-home-'));
    process.env.DATABRICKS_HOST = HOST;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    for (const key of ENV_KEYS) {
      if (saved[key] === undefined) {
        Reflect.deleteProperty(process.env, key);
      } else {
        process.env[key] = saved[key];
      }
    }
  });

  const defaultGroupCases: {
    name: string;
    configure: () => void;
  }[] = [
    {
      name: 'profile',
      configure: (): void => {
        const configFile = join(
          mkdtempSync(join(tmpdir(), 'group-client-profile-')),
          'databrickscfg'
        );
        writeFileSync(
          configFile,
          `[DEFAULT]\nhost = ${HOST}\nclient_id = client-id\nclient_secret = client-secret\ngroup_id = group-id\n`
        );
        Reflect.deleteProperty(process.env, 'DATABRICKS_HOST');
        process.env.DATABRICKS_CONFIG_FILE = configFile;
        process.env.DATABRICKS_CONFIG_PROFILE = 'DEFAULT';
      },
    },
    {
      name: 'environment',
      configure: (): void => {
        process.env.DATABRICKS_CLIENT_ID = 'client-id';
        process.env.DATABRICKS_CLIENT_SECRET = 'client-secret';
        process.env.DATABRICKS_GROUP_ID = 'group-id';
      },
    },
  ];

  it.each(defaultGroupCases)(
    'uses the $name group for default M2M without API role headers',
    async ({configure}) => {
      configure();
      const tokenForms = stubM2mFetch();
      const recorder = recordingHttpClient();

      await main({httpClient: recorder.httpClient});

      expectGroupedClientRequest(tokenForms, recorder.request(), 'group-id');
    }
  );

  it('uses an explicit M2M group without API role headers', async () => {
    process.env.DATABRICKS_GROUP_ID = 'profile-group-must-not-win';
    const tokenForms = stubM2mFetch();
    const recorder = recordingHttpClient();
    const credentials = newM2mCredentials({
      host: HOST,
      clientId: 'client-id',
      clientSecret: 'client-secret',
      groupId: 'explicit-group',
    });

    await main({host: HOST, httpClient: recorder.httpClient, credentials});

    expectGroupedClientRequest(
      tokenForms,
      recorder.request(),
      'explicit-group'
    );
  });

  it('does not apply a profile group to explicit credentials', async () => {
    process.env.DATABRICKS_GROUP_ID = 'profile-group';
    const recorder = recordingHttpClient();
    const credentials: Credentials = {
      name: () => 'explicit',
      authHeaders: () =>
        Promise.resolve([{key: 'Authorization', value: 'Bearer explicit'}]),
    };

    await main({httpClient: recorder.httpClient, credentials});

    const request = recorder.request();
    expect(request.headers.get('Authorization')).toBe('Bearer explicit');
    expectNoRoleHeaders(request);
  });
});
