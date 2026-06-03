import {describe, expect, it} from 'vitest';

import {Secret} from '@databricks/sdk-core/profiles';
import type {Profile} from '@databricks/sdk-core/profiles';

import {defaultCredentials} from '../../../src/credentials/default/default-credentials';

describe('defaultCredentials', () => {
  it('reports name "default"', () => {
    expect(defaultCredentials().name()).toBe('default');
  });

  it('overlays the client host onto a pre-resolved profile', async () => {
    // The profile has a token but no host, so PAT only configures once the
    // client host is overlaid; this proves host and credentials stay coupled.
    const profile: Profile = {token: new Secret('dapi-abc')};
    const creds = defaultCredentials({
      profile,
      host: 'https://workspace.example',
    });
    const headers = await creds.authHeaders();
    expect(headers).toEqual([{key: 'Authorization', value: 'Bearer dapi-abc'}]);
  });

  it('prefers a pre-resolved profile over the named profile', async () => {
    const profile: Profile = {
      host: 'https://workspace.example',
      token: new Secret('dapi-from-object'),
    };
    const creds = defaultCredentials({profile, profileName: 'ignored'});
    const headers = await creds.authHeaders();
    expect(headers).toEqual([
      {key: 'Authorization', value: 'Bearer dapi-from-object'},
    ]);
  });
});
