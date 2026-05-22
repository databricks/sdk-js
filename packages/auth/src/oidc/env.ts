import {env} from 'node:process';

import type {IdTokenProvider} from './oidc';
import {idTokenProviderFn} from './oidc';

/**
 * Returns an IdTokenProvider that reads the ID token from environment variable
 * `name`.
 *
 * Note that the IdTokenProvider does not cache the token and will read the
 * token from environment variable `name` each time.
 */
export function newEnvIdTokenProvider(name: string): IdTokenProvider {
  return idTokenProviderFn(() => {
    const t = env[name];
    if (t === undefined || t === '') {
      return Promise.reject(new Error(`missing env var "${name}"`));
    }
    return Promise.resolve({value: t});
  });
}
