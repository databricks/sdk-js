import {describe, expect, it} from 'vitest';

import type {TokenCredentials} from '@databricks/sdk-auth';

import {main} from '../src/auth-strategies';

describe('auth-strategies example', () => {
  it('reads the U2M token and builds an M2M credential', async () => {
    // A stub U2M credential so the example never shells out to the CLI.
    let tokenCalls = 0;
    const fakeU2m: TokenCredentials = {
      name: () => 'databricks-cli',
      token: () => {
        tokenCalls += 1;
        return Promise.resolve({value: 'fake-token-0123', type: 'Bearer'});
      },
      authHeaders: () => Promise.resolve([]),
    };

    await main(fakeU2m, 'https://test.cloud.databricks.com');

    // The example read the U2M token once; building the M2M credential (which
    // only reports its name) made no network call.
    expect(tokenCalls).toBe(1);
  });
});
