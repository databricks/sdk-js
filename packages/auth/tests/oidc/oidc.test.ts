import {describe, expect, it} from 'vitest';

import {idTokenProviderFn} from '../../src/oidc/oidc';

describe('idTokenProviderFn', () => {
  it('forwards the audience to the wrapped function', async () => {
    const provider = idTokenProviderFn(audience =>
      Promise.resolve({value: `id-token-for-${audience}`})
    );
    const token = await provider.idToken('my-audience');
    expect(token.value).toBe('id-token-for-my-audience');
  });

  it('propagates rejections from the wrapped function', async () => {
    const provider = idTokenProviderFn(() => Promise.reject(new Error('boom')));
    await expect(provider.idToken('audience')).rejects.toThrow('boom');
  });
});
