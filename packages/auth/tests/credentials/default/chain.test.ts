import {afterEach, describe, expect, it, vi} from 'vitest';

// Import Secret from the browser subpath so this test can run under both
// the Node and browser runners (the default `/profiles` entry pulls in
// node:fs).
import {Secret} from '@databricks/sdk-core/profiles/browser';
import type {Profile} from '@databricks/sdk-core/profiles/browser';

import type {Credentials, Header} from '../../../src/auth';
import {
  DefaultCredentials,
  m2mStrategy,
  patStrategy,
} from '../../../src/credentials/default/chain';
import type {Strategy} from '../../../src/credentials/default/chain';
import {DefaultCredentialsError} from '../../../src/credentials/default/errors';
import type {DefaultCredentialsErrorCode} from '../../../src/credentials/default/errors';

const HOST = 'https://workspace.example';

function configuredStrategy(
  label: string,
  supportsGroupAssumption = true,
  onConfigure?: (profile: Profile) => void
): Strategy {
  return {
    name: label,
    supportsGroupAssumption,
    configure: (profile): Credentials => {
      onConfigure?.(profile);
      return {
        name: () => label,
        authHeaders: () =>
          Promise.resolve([{key: 'X-Test-Strategy', value: label}]),
      };
    },
  };
}

function unconfiguredStrategy(
  label: string,
  supportsGroupAssumption = true,
  onConfigure?: () => void
): Strategy {
  return {
    name: label,
    supportsGroupAssumption,
    configure: (): undefined => {
      onConfigure?.();
      return undefined;
    },
  };
}

const loaderFor =
  (profile: Profile): (() => Promise<Profile>) =>
  () =>
    Promise.resolve(profile);

// Stubs the M2M discovery endpoints and answers token grants with grant().
function stubM2mFetch(
  grant: (params: URLSearchParams) => Response
): ReturnType<typeof vi.fn<typeof fetch>> {
  const fetchMock = vi.fn<typeof fetch>((input, init) => {
    const url = input instanceof Request ? input.url : input.toString();
    if (url === `${HOST}/.well-known/databricks-config`) {
      return Promise.resolve(
        new Response(JSON.stringify({oidc_endpoint: `${HOST}/oidc`}))
      );
    }
    if (url === `${HOST}/oidc/.well-known/oauth-authorization-server`) {
      return Promise.resolve(
        new Response(JSON.stringify({token_endpoint: `${HOST}/oidc/v1/token`}))
      );
    }
    const body = init?.body;
    if (typeof body !== 'string') {
      expect.fail('expected body to be a string');
    }
    return Promise.resolve(grant(new URLSearchParams(body)));
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('DefaultCredentials chain', () => {
  const selectedError = new Error('selected provider failed');

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  const resolutionCases: {
    name: string;
    strategies: readonly Strategy[];
    profile: Profile;
    want: {headers: Header[]} | {error: Error};
  }[] = [
    {
      name: 'returns the first configured strategy',
      strategies: [patStrategy, configuredStrategy('oauth-m2m')],
      profile: {host: HOST, token: new Secret('dapi-abc')},
      want: {
        headers: [{key: 'Authorization', value: 'Bearer dapi-abc'}],
      },
    },
    {
      name: 'falls through to the next strategy when earlier ones are unconfigured',
      strategies: [
        unconfiguredStrategy('pat'),
        configuredStrategy('oauth-m2m'),
      ],
      profile: {host: HOST},
      want: {
        headers: [{key: 'X-Test-Strategy', value: 'oauth-m2m'}],
      },
    },
    {
      // PAT is configured and comes first, but authType pins oauth-m2m, so
      // oauth-m2m must win.
      name: 'selects the strategy named by authType over an earlier configured strategy',
      strategies: [patStrategy, configuredStrategy('oauth-m2m')],
      profile: {
        host: HOST,
        token: new Secret('dapi-abc'),
        authType: 'oauth-m2m',
      },
      want: {
        headers: [{key: 'X-Test-Strategy', value: 'oauth-m2m'}],
      },
    },
    {
      name: 'skips unsupported strategies when a group is configured',
      strategies: [
        configuredStrategy('pat', false),
        configuredStrategy('oauth-m2m'),
      ],
      profile: {host: HOST, groupId: 'group-123'},
      want: {
        headers: [{key: 'X-Test-Strategy', value: 'oauth-m2m'}],
      },
    },
    {
      name: 'preserves normal strategy ordering when the group is empty',
      strategies: [
        configuredStrategy('pat', false),
        configuredStrategy('oauth-m2m'),
      ],
      profile: {host: HOST, groupId: ''},
      want: {headers: [{key: 'X-Test-Strategy', value: 'pat'}]},
    },
    {
      name: 'does not configure a fallback after the selected strategy fails',
      strategies: [
        {
          name: 'oauth-m2m',
          supportsGroupAssumption: true,
          configure: () => ({
            name: () => 'oauth-m2m',
            authHeaders: () => Promise.reject(selectedError),
          }),
        },
        configuredStrategy('fallback', true, () => {
          expect.fail('fallback strategy should not be configured');
        }),
      ],
      profile: {host: HOST, groupId: 'group-123'},
      want: {error: selectedError},
    },
  ];

  it.each(resolutionCases)('$name', async ({strategies, profile, want}) => {
    const creds = new DefaultCredentials(strategies, loaderFor(profile));
    if ('error' in want) {
      await expect(creds.authHeaders()).rejects.toBe(want.error);
    } else {
      await expect(creds.authHeaders()).resolves.toEqual(want.headers);
    }
  });

  const repeatedResolutionCases: {
    name: string;
    credentials?: Credentials;
    wantCode?: DefaultCredentialsErrorCode;
    wantBuildCount: number;
  }[] = [
    {
      name: 'reuses a successful resolution',
      credentials: {
        name: () => 'counting',
        authHeaders: () => Promise.resolve([]),
      },
      wantBuildCount: 1,
    },
    {
      name: 'retries a failed resolution',
      wantCode: 'NO_AUTH_CONFIGURED',
      wantBuildCount: 2,
    },
  ];

  it.each(repeatedResolutionCases)(
    '$name',
    async ({credentials, wantCode, wantBuildCount}) => {
      let buildCount = 0;
      const strategy: Strategy = {
        name: 'counting',
        supportsGroupAssumption: true,
        configure: () => {
          buildCount += 1;
          return credentials;
        },
      };
      const creds = new DefaultCredentials([strategy], loaderFor({}));

      for (let call = 0; call < 2; call += 1) {
        const result = creds.authHeaders();
        if (wantCode === undefined) {
          await expect(result).resolves.toStrictEqual([]);
        } else {
          await expect(result).rejects.toMatchObject({code: wantCode});
        }
      }
      expect(buildCount).toBe(wantBuildCount);
    }
  );

  it('retries a failed resolution for each concurrent call', async () => {
    const loadError = new Error('profile load failed');
    let loaderCalls = 0;
    const creds = new DefaultCredentials([patStrategy], () => {
      loaderCalls += 1;
      return Promise.reject(loadError);
    });

    const results = await Promise.allSettled(
      Array.from({length: 3}, () => creds.authHeaders())
    );

    expect(results).toStrictEqual(
      Array.from({length: 3}, () => ({status: 'rejected', reason: loadError}))
    );
    expect(loaderCalls).toBe(3);
  });

  it('passes the configured group to the M2M token request', async () => {
    const tokenEndpoint = `${HOST}/oidc/v1/token`;
    const fetchMock = vi.fn<typeof fetch>((input, init) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (url === `${HOST}/.well-known/databricks-config`) {
        return Promise.resolve(
          new Response(JSON.stringify({oidc_endpoint: `${HOST}/oidc`}), {
            status: 200,
          })
        );
      }
      if (url === `${HOST}/oidc/.well-known/oauth-authorization-server`) {
        return Promise.resolve(
          new Response(JSON.stringify({token_endpoint: tokenEndpoint}), {
            status: 200,
          })
        );
      }
      const body = init?.body;
      if (typeof body !== 'string') {
        expect.fail('expected body to be a string');
      }
      const params = new URLSearchParams(body);
      expect(params.get('assume_group')).toBe('group-123');
      return Promise.resolve(
        new Response(JSON.stringify({access_token: 'token'}), {status: 200})
      );
    });
    vi.stubGlobal('fetch', fetchMock);
    const creds = new DefaultCredentials(
      [patStrategy, m2mStrategy],
      loaderFor({
        host: HOST,
        groupId: 'group-123',
        token: new Secret('ignored-pat'),
        clientId: 'client-id',
        clientSecret: new Secret('client-secret'),
      })
    );

    expect(await creds.authHeaders()).toEqual([
      {key: 'Authorization', value: 'Bearer token'},
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('caches M2M tokens until they expire', async () => {
    const now = 1_700_000_000_000;
    vi.useFakeTimers({toFake: ['Date']});
    vi.setSystemTime(now);
    const grantedGroups: (string | null)[] = [];
    stubM2mFetch(params => {
      grantedGroups.push(params.get('assume_group'));
      return new Response(
        JSON.stringify({
          access_token: `token-${grantedGroups.length.toString()}`,
          expires_in: 3600,
        })
      );
    });
    const creds = new DefaultCredentials(
      [m2mStrategy],
      loaderFor({
        host: HOST,
        clientId: 'client-id',
        clientSecret: new Secret('client-secret'),
        groupId: 'group-a',
      })
    );

    for (let call = 0; call < 5; call += 1) {
      expect(await creds.authHeaders()).toStrictEqual([
        {key: 'Authorization', value: 'Bearer token-1'},
      ]);
    }
    vi.setSystemTime(now + 3600 * 1000 + 1);
    expect(await creds.authHeaders()).toStrictEqual([
      {key: 'Authorization', value: 'Bearer token-2'},
    ]);
    expect(grantedGroups).toStrictEqual(['group-a', 'group-a']);
  });

  it('shares one resolution and token grant between concurrent first calls', async () => {
    const fetchMock = stubM2mFetch(
      () =>
        new Response(JSON.stringify({access_token: 'token', expires_in: 3600}))
    );
    let loaderCalls = 0;
    const creds = new DefaultCredentials([m2mStrategy], () => {
      loaderCalls += 1;
      return Promise.resolve({
        host: HOST,
        clientId: 'client-id',
        clientSecret: new Secret('client-secret'),
      });
    });

    const headers = await Promise.all(
      Array.from({length: 5}, () => creds.authHeaders())
    );

    expect(headers).toStrictEqual(
      Array.from({length: 5}, () => [
        {key: 'Authorization', value: 'Bearer token'},
      ])
    );
    expect(loaderCalls).toBe(1);
    // Discovery takes two fetches and the token grant one.
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('invokes the profile loader exactly once', async () => {
    let loaderCalls = 0;
    const loader = (): Promise<Profile> => {
      loaderCalls += 1;
      return Promise.resolve({host: HOST, token: new Secret('dapi-abc')});
    };
    const creds = new DefaultCredentials([patStrategy], loader);
    await creds.authHeaders();
    await creds.authHeaders();
    expect(loaderCalls).toBe(1);
  });

  const errorCases: {
    name: string;
    strategies: readonly Strategy[];
    profile: Profile;
    wantCode: DefaultCredentialsErrorCode;
  }[] = [
    {
      name: 'throws NO_AUTH_CONFIGURED when no strategy is configured',
      strategies: [patStrategy],
      profile: {host: HOST},
      wantCode: 'NO_AUTH_CONFIGURED',
    },
    {
      name: 'throws AUTH_TYPE_NOT_FOUND when no strategy matches authType',
      strategies: [patStrategy, m2mStrategy],
      profile: {
        host: HOST,
        token: new Secret('dapi-abc'),
        authType: 'made-up',
      },
      wantCode: 'AUTH_TYPE_NOT_FOUND',
    },
    {
      name: 'throws NO_AUTH_CONFIGURED when the strategy named by authType is not configured',
      strategies: [patStrategy, configuredStrategy('oauth-m2m')],
      profile: {host: HOST, authType: 'pat'},
      wantCode: 'NO_AUTH_CONFIGURED',
    },
    {
      name: 'throws GROUP_ROLE_UNSUPPORTED for an explicitly selected PAT strategy',
      strategies: [patStrategy, m2mStrategy],
      profile: {
        host: HOST,
        token: new Secret('dapi-abc'),
        groupId: 'group-123',
        authType: 'pat',
      },
      wantCode: 'GROUP_ROLE_UNSUPPORTED',
    },
    {
      name: 'throws GROUP_ROLE_UNSUPPORTED for an explicitly selected CLI strategy',
      strategies: [configuredStrategy('databricks-cli', false)],
      profile: {
        host: HOST,
        groupId: 'group-123',
        authType: 'databricks-cli',
      },
      wantCode: 'GROUP_ROLE_UNSUPPORTED',
    },
    {
      name: 'throws NO_AUTH_CONFIGURED when grouped strategies are exhausted',
      strategies: [
        configuredStrategy('pat', false),
        unconfiguredStrategy('oauth-m2m'),
        configuredStrategy('databricks-cli', false),
      ],
      profile: {host: HOST, groupId: 'group-123'},
      wantCode: 'NO_AUTH_CONFIGURED',
    },
  ];

  it.each(errorCases)('$name', async ({strategies, profile, wantCode}) => {
    const creds = new DefaultCredentials(strategies, loaderFor(profile));
    let caught: unknown;
    try {
      await creds.authHeaders();
    } catch (e) {
      caught = e;
    }
    if (!(caught instanceof DefaultCredentialsError)) {
      expect.fail(`expected DefaultCredentialsError, got ${String(caught)}`);
    }
    expect(caught.code).toBe(wantCode);
  });

  describe('name()', () => {
    const nameCases: {
      name: string;
      strategies: readonly Strategy[];
      profile: Profile;
      wantName: string;
    }[] = [
      {
        name: 'reports the first configured strategy when authType is not set',
        strategies: [patStrategy],
        profile: {host: HOST, token: new Secret('dapi-abc')},
        wantName: 'pat',
      },
      {
        name: 'reports the strategy selected by authType',
        strategies: [patStrategy, configuredStrategy('oauth-m2m')],
        profile: {
          host: HOST,
          token: new Secret('dapi-abc'),
          authType: 'oauth-m2m',
        },
        wantName: 'oauth-m2m',
      },
    ];

    it.each(nameCases)('$name', async ({strategies, profile, wantName}) => {
      const creds = new DefaultCredentials(strategies, loaderFor(profile));
      expect(creds.name()).toBe('default');
      await creds.authHeaders();
      expect(creds.name()).toBe(wantName);
    });
  });
});
