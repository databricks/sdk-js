import {env} from 'node:process';

import type {IDTokenProvider} from './oidc';
import {idTokenProviderFn} from './oidc';

/**
 * Returns an IDTokenProvider that reads the IDtoken from environment variable
 * `name`.
 *
 * Note that the IDTokenProvider does not cache the token and will read the
 * token from environment variable `name` each time.
 */
export function newEnvIDTokenProvider(name: string): IDTokenProvider {
  return idTokenProviderFn(() => {
    const t = env[name];
    if (t === undefined || t === '') {
      return Promise.reject(new Error(`missing env var "${name}"`));
    }
    return Promise.resolve({value: t});
  });
}
