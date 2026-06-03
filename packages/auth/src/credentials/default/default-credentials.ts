import type {Profile} from '@databricks/sdk-core/profiles';
import {resolve} from '@databricks/sdk-core/profiles';

import type {Credentials} from '../../auth';

import {DefaultCredentials, m2mStrategy, patStrategy} from './chain';
import type {Strategy} from './chain';
import {u2mStrategy} from './u2m-strategy';

const STRATEGIES: readonly Strategy[] = [patStrategy, m2mStrategy, u2mStrategy];

/** Options for {@link defaultCredentials}. */
export interface DefaultCredentialsOptions {
  /** Pre-resolved profile. Takes precedence over `profileName`. */
  profile?: Profile;

  /**
   * Name of the profile to resolve on first use. Bind this to the same
   * profile the client resolved so the host and credentials cannot drift
   * apart.
   */
  profileName?: string | undefined;

  /** Host the client resolved; overlaid onto the profile so strategies see it. */
  host?: string | undefined;
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
 * The profile is bound at construction: either the pre-resolved `profile`, or
 * the named `profileName` resolved on first use. The client's `host` is
 * overlaid so credentials authenticate against the same host the client uses.
 */
export function defaultCredentials(
  options?: DefaultCredentialsOptions
): Credentials {
  const host = options?.host;
  const loadProfile = async (): Promise<Profile> => {
    const profile =
      options?.profile ??
      (await resolve(
        options?.profileName !== undefined
          ? {profile: options.profileName}
          : undefined
      ));
    return host !== undefined ? {...profile, host} : profile;
  };
  return new DefaultCredentials(STRATEGIES, loadProfile);
}
