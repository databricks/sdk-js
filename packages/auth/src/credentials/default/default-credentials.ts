import type {Profile} from '@databricks/sdk-core/profiles';
import {resolve} from '@databricks/sdk-core/profiles';

import type {Credentials} from '../../auth';

import {DefaultCredentials, m2mStrategy, patStrategy} from './chain';
import type {Strategy} from './chain';
import {u2mStrategy} from './u2m-strategy';

const STRATEGIES: readonly Strategy[] = [patStrategy, m2mStrategy, u2mStrategy];

interface DefaultCredentialsOptions {
  /**
   * Pre-resolved profile. When omitted, the profile is resolved on first
   * use from the default config file and environment variables.
   */
  profile?: Profile;
}

/**
 * Returns a lazy {@link Credentials} that resolves to the first configured
 * authentication strategy on first use.
 *
 * Strategies are tried in this order:
 *   1. PAT (`pat`).
 *   2. OAuth M2M (`oauth-m2m`).
 *   3. Databricks CLI (`databricks-cli`).
 *
 * When no profile is provided via `options.profile`, the profile is
 * resolved on first use from the default config file (~/.databrickscfg)
 * and environment variables.
 */
export function defaultCredentials(
  options?: DefaultCredentialsOptions
): Credentials {
  const explicit = options?.profile;
  const loadProfile = (): Promise<Profile> =>
    explicit !== undefined ? Promise.resolve(explicit) : resolve();
  return new DefaultCredentials(STRATEGIES, loadProfile);
}
