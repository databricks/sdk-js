import {describe, expect, it} from 'vitest';

// Import Secret from the browser subpath so this test can run under both
// the Node and browser runners (the default `/profiles` entry pulls in
// node:fs).
import {Secret} from '@databricks/sdk-core/profiles/browser';
import type {Profile} from '@databricks/sdk-core/profiles/browser';

import type {Header} from '../../../src/auth';
import {
  DefaultCredentials,
  patStrategy,
} from '../../../src/credentials/default/chain';
import type {Strategy} from '../../../src/credentials/default/chain';
import {DefaultCredentialsError} from '../../../src/credentials/default/errors';

const HOST = 'https://workspace.example';

function configuredStrategy(label: string): Strategy {
  return () => ({
    name: () => label,
    authHeaders: () =>
      Promise.resolve([{key: 'X-Test-Strategy', value: label}]),
  });
}

const unconfiguredStrategy: Strategy = () => undefined;

const loaderFor =
  (profile: Profile): (() => Promise<Profile>) =>
  () =>
    Promise.resolve(profile);

describe('DefaultCredentials chain', () => {
  const resolutionCases: {
    name: string;
    strategies: readonly Strategy[];
    profile: Profile;
    wantHeaders: Header[];
  }[] = [
    {
      name: 'returns the first configured strategy',
      strategies: [patStrategy, configuredStrategy('oauth-m2m')],
      profile: {host: HOST, token: new Secret('dapi-abc')},
      wantHeaders: [{key: 'Authorization', value: 'Bearer dapi-abc'}],
    },
    {
      name: 'falls through to the next strategy when earlier ones are unconfigured',
      strategies: [unconfiguredStrategy, configuredStrategy('oauth-m2m')],
      profile: {host: HOST},
      wantHeaders: [{key: 'X-Test-Strategy', value: 'oauth-m2m'}],
    },
  ];

  it.each(resolutionCases)(
    '$name',
    async ({strategies, profile, wantHeaders}) => {
      const creds = new DefaultCredentials(strategies, loaderFor(profile));
      const headers = await creds.authHeaders();
      expect(headers).toEqual(wantHeaders);
    }
  );

  it('caches the resolved strategy across calls', async () => {
    let buildCount = 0;
    const strategy: Strategy = () => {
      buildCount += 1;
      return {
        name: () => 'counting',
        authHeaders: () => Promise.resolve([]),
      };
    };
    const creds = new DefaultCredentials([strategy], loaderFor({}));
    await creds.authHeaders();
    await creds.authHeaders();
    expect(buildCount).toBe(1);
  });

  it('throws NO_AUTH_CONFIGURED when no strategy is configured', async () => {
    const creds = new DefaultCredentials(
      [patStrategy],
      loaderFor({host: HOST})
    );
    let caught: unknown;
    try {
      await creds.authHeaders();
    } catch (e) {
      caught = e;
    }
    if (!(caught instanceof DefaultCredentialsError)) {
      expect.fail(`expected DefaultCredentialsError, got ${String(caught)}`);
    }
    expect(caught.code).toBe('NO_AUTH_CONFIGURED');
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

  it('always reports name "default"', async () => {
    const creds = new DefaultCredentials(
      [patStrategy],
      loaderFor({host: HOST, token: new Secret('dapi-abc')})
    );
    expect(creds.name()).toBe('default');
    await creds.authHeaders();
    expect(creds.name()).toBe('default');
  });
});
