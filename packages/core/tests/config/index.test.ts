import {describe, expect, it} from 'vitest';

import {resolveClientConfig} from '../../src/config';

describe('resolveClientConfig', () => {
  it('threads the caller profile alongside the host', () => {
    const config = resolveClientConfig({
      host: 'https://a.cloud.databricks.com',
      profile: 'prod',
    });
    expect(config).toEqual({
      host: 'https://a.cloud.databricks.com',
      profile: 'prod',
    });
  });

  it('passes through workspace and account IDs', () => {
    const config = resolveClientConfig({workspaceId: 'ws-1', accountId: 'ac-1'});
    expect(config).toEqual({workspaceId: 'ws-1', accountId: 'ac-1'});
  });

  it('omits fields the caller left unset', () => {
    expect(resolveClientConfig({})).toEqual({});
  });
});
