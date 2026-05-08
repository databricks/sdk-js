/**
 * Environment-variable OIDC ID token provider. Reads the ID token from a
 * named environment variable.
 *
 * Node.js only. Not exported from the browser entry point.
 */

import {env} from 'node:process';

import type {IDTokenProvider} from './oidc';
import {idTokenProviderFn} from './oidc';

/**
 * Returns an IDTokenProvider that reads the ID token from environment
 * variable `name`.
 *
 * Note that the IDTokenProvider does not cache the token and will read the
 * token from environment variable `name` each time.
 *
 * @param name - Name of the environment variable holding the ID token.
 * @throws Error when the environment variable is unset or empty.
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
