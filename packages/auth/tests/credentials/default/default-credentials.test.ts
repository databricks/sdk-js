import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

import type {Profile} from '@databricks/sdk-core/profiles';
import {Secret} from '@databricks/sdk-core/profiles';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {defaultCredentials} from '../../../src/credentials';

const HOST = 'https://workspace.example';
const TOKEN_ENDPOINT = `${HOST}/oidc/v1/token`;
const CUSTOM_ENV = 'SDK_TEST_OIDC_TOKEN';

describe('defaultCredentials OIDC', () => {
  let directory: string;
  let tokenFile: string;
  let exchanges: URLSearchParams[];
  let fetchMock: ReturnType<typeof vi.fn<typeof fetch>>;

  beforeEach(async () => {
    directory = await mkdtemp(join(tmpdir(), 'default-oidc-'));
    tokenFile = join(directory, 'id-token');
    await writeFile(tokenFile, 'file-id-token');
    vi.stubEnv('DATABRICKS_OIDC_TOKEN', undefined);
    vi.stubEnv(CUSTOM_ENV, undefined);
    exchanges = [];
    fetchMock = vi.fn<typeof fetch>((input, init) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (url === `${HOST}/.well-known/databricks-config`) {
        return Promise.resolve(
          new Response(JSON.stringify({oidc_endpoint: `${HOST}/oidc`}))
        );
      }
      if (url === `${HOST}/oidc/.well-known/oauth-authorization-server`) {
        return Promise.resolve(
          new Response(JSON.stringify({token_endpoint: TOKEN_ENDPOINT}))
        );
      }
      expect(url).toBe(TOKEN_ENDPOINT);
      expect(init?.method).toBe('POST');
      expect(new Headers(init?.headers).get('Content-Type')).toBe(
        'application/x-www-form-urlencoded'
      );
      if (typeof init?.body !== 'string') {
        expect.fail('Expected a form-encoded token exchange.');
      }
      exchanges.push(new URLSearchParams(init.body));
      return Promise.resolve(
        new Response(
          '{"access_token":"access-token","token_type":"Bearer","expires_in":3600}'
        )
      );
    });
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(async () => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    await rm(directory, {recursive: true, force: true});
  });

  const successCases: {
    name: string;
    profile?: Profile;
    env?: Record<string, string>;
    file?: boolean;
    wantName: string;
    wantToken: string;
  }[] = [
    {
      name: 'automatically selects the default OIDC token environment variable',
      env: {DATABRICKS_OIDC_TOKEN: 'env-id-token'},
      wantName: 'env-oidc',
      wantToken: 'env-id-token',
    },
    {
      name: 'selects a custom OIDC token environment variable',
      profile: {authType: 'env-oidc', oidcTokenEnv: CUSTOM_ENV},
      env: {[CUSTOM_ENV]: 'custom-id-token'},
      wantName: 'env-oidc',
      wantToken: 'custom-id-token',
    },
    {
      name: 'automatically selects a configured OIDC token file',
      file: true,
      wantName: 'file-oidc',
      wantToken: 'file-id-token',
    },
    {
      name: 'explicit file authentication overrides an available environment token',
      profile: {authType: 'file-oidc'},
      file: true,
      env: {DATABRICKS_OIDC_TOKEN: 'ignored-env-token'},
      wantName: 'file-oidc',
      wantToken: 'file-id-token',
    },
    {
      name: 'environment OIDC precedes file OIDC during automatic selection',
      file: true,
      env: {DATABRICKS_OIDC_TOKEN: 'env-id-token'},
      wantName: 'env-oidc',
      wantToken: 'env-id-token',
    },
    {
      name: 'an empty environment token leaves file OIDC available',
      file: true,
      env: {DATABRICKS_OIDC_TOKEN: ''},
      wantName: 'file-oidc',
      wantToken: 'file-id-token',
    },
    {
      name: 'explicit environment authentication overrides configured PAT and CLI',
      profile: {
        authType: 'env-oidc',
        name: 'DEFAULT',
        token: new Secret('ignored-pat'),
        databricksCliPath: '/must/not/be/invoked',
      },
      env: {DATABRICKS_OIDC_TOKEN: 'env-id-token'},
      wantName: 'env-oidc',
      wantToken: 'env-id-token',
    },
  ];

  it.each(successCases)(
    '$name',
    async ({profile, env, file, wantName, wantToken}) => {
      for (const [name, value] of Object.entries(env ?? {})) {
        vi.stubEnv(name, value);
      }
      const credentials = defaultCredentials({
        profile: {
          host: HOST,
          clientId: 'client-id',
          ...profile,
          ...(file === true && {oidcTokenFilePath: tokenFile}),
        },
      });
      expect(credentials.name()).toBe('default');
      expect(fetchMock).not.toHaveBeenCalled();
      await expect(credentials.authHeaders()).resolves.toStrictEqual([
        {key: 'Authorization', value: 'Bearer access-token'},
      ]);
      expect(credentials.name()).toBe(wantName);
      expect(fetchMock).toHaveBeenCalledTimes(3);
      expect(exchanges).toHaveLength(1);
      expect(Object.fromEntries(exchanges[0])).toStrictEqual({
        client_id: 'client-id',
        scope: 'all-apis',
        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
        subject_token: wantToken,
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      });
    }
  );

  it.each(['env-oidc', 'file-oidc'])(
    'allows account-wide federation and forwards group roles for %s',
    async authType => {
      vi.stubEnv('DATABRICKS_OIDC_TOKEN', 'env-id-token');
      const credentials = defaultCredentials({
        profile: {
          host: HOST,
          accountId: 'account-id',
          groupId: 'group-id',
          token: new Secret('ignored-pat'),
          authType,
          oidcTokenFilePath: tokenFile,
        },
      });
      await credentials.authHeaders();
      expect(credentials.name()).toBe(authType);
      expect(exchanges[0].has('client_id')).toBe(false);
      expect(exchanges[0].get('assume_group')).toBe('group-id');
    }
  );

  it.each(['env-oidc', 'file-oidc'])(
    'reads rotated ID tokens and reuses discovery for %s',
    async authType => {
      vi.stubEnv('DATABRICKS_OIDC_TOKEN', 'first');
      await writeFile(tokenFile, 'first');
      const credentials = defaultCredentials({
        profile: {host: HOST, authType, oidcTokenFilePath: tokenFile},
      });
      await credentials.authHeaders();
      vi.stubEnv('DATABRICKS_OIDC_TOKEN', 'second');
      await writeFile(tokenFile, 'second');
      await credentials.authHeaders();
      expect(exchanges.map(params => params.get('subject_token'))).toEqual([
        'first',
        'second',
      ]);
      expect(fetchMock).toHaveBeenCalledTimes(4);
    }
  );

  it('uses the configured account ID during token endpoint discovery', async () => {
    vi.stubEnv('DATABRICKS_OIDC_TOKEN', 'env-id-token');
    const accountEndpoint = `${HOST}/oidc/accounts/configured-account/v1/token`;
    fetchMock.mockImplementation((input, init) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (url === `${HOST}/.well-known/databricks-config`) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              oidc_endpoint: `${HOST}/oidc/accounts/{account_id}`,
              account_id: 'metadata-account',
            })
          )
        );
      }
      if (
        url ===
        `${HOST}/oidc/accounts/configured-account/.well-known/oauth-authorization-server`
      ) {
        return Promise.resolve(
          new Response(JSON.stringify({token_endpoint: accountEndpoint}))
        );
      }
      expect(url).toBe(accountEndpoint);
      if (typeof init?.body !== 'string') {
        expect.fail('Expected a form-encoded token exchange.');
      }
      expect(new URLSearchParams(init.body).get('client_id')).toBe(null);
      return Promise.resolve(new Response('{"access_token":"account-token"}'));
    });
    const credentials = defaultCredentials({
      profile: {
        host: HOST,
        authType: 'env-oidc',
        accountId: 'configured-account',
      },
    });
    await expect(credentials.authHeaders()).resolves.toStrictEqual([
      {key: 'Authorization', value: 'Bearer account-token'},
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('retries discovery after a transient discovery failure', async () => {
    vi.stubEnv('DATABRICKS_OIDC_TOKEN', 'env-id-token');
    fetchMock.mockRejectedValueOnce(new Error('connection failed'));
    const credentials = defaultCredentials({
      profile: {host: HOST, authType: 'env-oidc'},
    });
    await expect(credentials.authHeaders()).rejects.toThrow(
      'discovering OIDC token endpoint failed'
    );
    await expect(credentials.authHeaders()).resolves.toStrictEqual([
      {key: 'Authorization', value: 'Bearer access-token'},
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it.each([
    {profile: {host: HOST, authType: 'env-oidc'}, code: 'NO_AUTH_CONFIGURED'},
    {profile: {host: HOST, authType: 'file-oidc'}, code: 'NO_AUTH_CONFIGURED'},
    {profile: {authType: 'env-oidc'}, code: 'NO_AUTH_CONFIGURED'},
    {
      profile: {host: HOST, authType: 'github-oidc'},
      code: 'AUTH_TYPE_NOT_FOUND',
    },
  ])(
    'rejects incomplete or unsupported OIDC selection $profile',
    async ({profile, code}) => {
      await expect(
        defaultCredentials({profile}).authHeaders()
      ).rejects.toMatchObject({code});
      expect(fetchMock).not.toHaveBeenCalled();
    }
  );

  it('does not fall back after an explicitly selected file cannot be read', async () => {
    vi.stubEnv('DATABRICKS_OIDC_TOKEN', 'must-not-be-used');
    const credentials = defaultCredentials({
      profile: {
        host: HOST,
        authType: 'file-oidc',
        oidcTokenFilePath: join(directory, 'missing'),
      },
    });
    await expect(credentials.authHeaders()).rejects.toThrow('does not exist');
    expect(exchanges).toHaveLength(0);
  });

  it('keeps PAT ahead of OIDC during automatic selection', async () => {
    vi.stubEnv('DATABRICKS_OIDC_TOKEN', 'ignored-id-token');
    const credentials = defaultCredentials({
      profile: {host: HOST, token: new Secret('dapi-token')},
    });
    await expect(credentials.authHeaders()).resolves.toStrictEqual([
      {key: 'Authorization', value: 'Bearer dapi-token'},
    ]);
    expect(credentials.name()).toBe('pat');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
