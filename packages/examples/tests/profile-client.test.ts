import {mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

import {afterEach, beforeEach, describe, expect, it} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';

import {main} from '../src/profile-client';

function jsonResponse(body: unknown): HttpResponse {
  return {
    statusCode: 200,
    headers: new Headers({'content-type': 'application/json'}),
    body: new Response(JSON.stringify(body)).body,
  };
}

const ENV_KEYS = [
  'HOME',
  'DATABRICKS_CONFIG_FILE',
  'DATABRICKS_CONFIG_PROFILE',
  'DATABRICKS_HOST',
  'DATABRICKS_WORKSPACE_ID',
  'DATABRICKS_TOKEN',
];

describe('profile-client example', () => {
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const key of ENV_KEYS) {
      saved[key] = process.env[key];
    }
    // Point HOME at an empty dir so no config file exists; only the
    // DATABRICKS_* env vars below feed the resolved profile.
    process.env.HOME = mkdtempSync(join(tmpdir(), 'sdkjs-profile-client-'));
    delete process.env.DATABRICKS_CONFIG_FILE;
    delete process.env.DATABRICKS_CONFIG_PROFILE;
    process.env.DATABRICKS_WORKSPACE_ID = 'ws-from-profile';
    process.env.DATABRICKS_TOKEN = 'pat-from-profile';
  });

  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (saved[key] === undefined) {
        Reflect.deleteProperty(process.env, key);
      } else {
        process.env[key] = saved[key];
      }
    }
  });

  const hostCases: {
    name: string;
    environmentHost: string;
    explicitHost?: string;
    wantOrigin: string;
  }[] = [
    {
      name: 'defaults a scheme-less environment host to HTTPS',
      environmentHost: 'profile-host.cloud.databricks.com',
      wantOrigin: 'https://profile-host.cloud.databricks.com',
    },
    {
      name: 'defaults a scheme-less explicit host to HTTPS',
      environmentHost: 'ignored.cloud.databricks.com',
      explicitHost: 'explicit-host.cloud.databricks.com',
      wantOrigin: 'https://explicit-host.cloud.databricks.com',
    },
    {
      name: 'preserves an explicit HTTPS host',
      environmentHost: 'ignored.cloud.databricks.com',
      explicitHost: 'https://explicit-host.cloud.databricks.com/',
      wantOrigin: 'https://explicit-host.cloud.databricks.com',
    },
    {
      name: 'preserves an explicit HTTP host',
      environmentHost: 'ignored.cloud.databricks.com',
      explicitHost: ' http://localhost:8080/ ',
      wantOrigin: 'http://localhost:8080',
    },
  ];

  it.each(hostCases)(
    '$name',
    async ({environmentHost, explicitHost, wantOrigin}) => {
      process.env.DATABRICKS_HOST = environmentHost;
      let seen: HttpRequest | undefined;
      const httpClient: HttpClient = {
        send(request: HttpRequest): Promise<HttpResponse> {
          seen = request;
          return Promise.resolve(jsonResponse({model: 'demo-model'}));
        },
      };

      await main({
        httpClient,
        ...(explicitHost !== undefined && {host: explicitHost}),
      });

      if (seen === undefined) {
        throw new Error('The client did not send a request.');
      }
      const url = new URL(seen.url);
      expect(url.origin).toBe(wantOrigin);
      expect(url.pathname).toBe(
        '/serving-endpoints/my-embeddings-endpoint/invocations'
      );
      expect(seen.headers.get('X-Databricks-Workspace-Id')).toBe(
        'ws-from-profile'
      );
      expect(seen.headers.get('Authorization')).toBe('Bearer pat-from-profile');
    }
  );
});
