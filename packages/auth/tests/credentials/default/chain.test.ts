import {describe, expect, it} from 'vitest';

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

describe('DefaultCredentials chain', () => {
  const selectedError = new Error('selected provider failed');
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

  it('caches the resolved strategy across calls', async () => {
    let buildCount = 0;
    const strategy: Strategy = {
      name: 'counting',
      supportsGroupAssumption: true,
      configure: () => {
        buildCount += 1;
        return {
          name: () => 'counting',
          authHeaders: () => Promise.resolve([]),
        };
      },
    };
    const creds = new DefaultCredentials([strategy], loaderFor({}));
    await creds.authHeaders();
    await creds.authHeaders();
    expect(buildCount).toBe(1);
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
