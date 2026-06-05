import type {Profile} from '@databricks/sdk-core/profiles';

import type {Credentials, Header} from '../../auth';
import {newM2mCredentials} from '../m2m';
import {newPatCredentials} from '../pat';

import {DefaultCredentialsError} from './errors';

/**
 * A named strategy that inspects a profile and either returns configured
 * credentials or `undefined` if it is not applicable. The `name` matches the
 * `name()` of the credentials it produces, so it can be selected by a
 * profile's `authType`.
 */
export interface Strategy {
  /** Short identifier, e.g. `pat`, `oauth-m2m`, or `databricks-cli`. */
  readonly name: string;
  readonly configure: (profile: Profile) => Credentials | undefined;
}

const AUTH_DOC_URL = 'https://docs.databricks.com/aws/en/dev-tools/auth/index';
const NO_AUTH_CONFIGURED_MESSAGE = `cannot configure default credentials, please check ${AUTH_DOC_URL} to configure credentials for your preferred authentication method`;

/**
 * Lazy {@link Credentials} that resolves to a configured strategy on the
 * first `authHeaders()` call.
 *
 * If the profile sets `authType`, the strategy whose name matches it is
 * selected. Otherwise the strategies are tried in order and the first
 * configured one wins.
 */
export class DefaultCredentials implements Credentials {
  private resolved: Credentials | undefined;

  constructor(
    private readonly strategies: readonly Strategy[],
    private readonly loadProfile: () => Promise<Profile>
  ) {}

  /**
   * Returns `default` until a strategy has been resolved, then delegates to
   * the resolved strategy so callers (logging, telemetry) can tell which
   * authentication method won.
   */
  name(): string {
    return this.resolved?.name() ?? 'default';
  }

  async authHeaders(): Promise<Header[]> {
    this.resolved ??= await this.resolveChain();
    return this.resolved.authHeaders();
  }

  private async resolveChain(): Promise<Credentials> {
    const profile = await this.loadProfile();
    if (profile.authType !== undefined) {
      return this.resolveByAuthType(profile, profile.authType);
    }
    for (const strategy of this.strategies) {
      const built = strategy.configure(profile);
      if (built !== undefined) {
        return built;
      }
    }
    throw new DefaultCredentialsError(
      'NO_AUTH_CONFIGURED',
      NO_AUTH_CONFIGURED_MESSAGE
    );
  }

  private resolveByAuthType(profile: Profile, authType: string): Credentials {
    const strategy = this.strategies.find(s => s.name === authType);
    if (strategy === undefined) {
      throw new DefaultCredentialsError(
        'AUTH_TYPE_NOT_FOUND',
        `auth type "${authType}" not found, please check ${AUTH_DOC_URL} for a list of supported auth types`
      );
    }
    const built = strategy.configure(profile);
    if (built === undefined) {
      throw new DefaultCredentialsError(
        'NO_AUTH_CONFIGURED',
        NO_AUTH_CONFIGURED_MESSAGE
      );
    }
    return built;
  }
}

/** PAT strategy: configured when `token` is set in the profile. */
export const patStrategy: Strategy = {
  name: 'pat',
  configure: profile => {
    if (profile.host === undefined) return undefined;
    if (profile.token === undefined) return undefined;
    return newPatCredentials(profile.token.value);
  },
};

/**
 * OAuth M2M strategy: configured when `clientId` and `clientSecret` are
 * both set in the profile.
 */
export const m2mStrategy: Strategy = {
  name: 'oauth-m2m',
  configure: profile => {
    if (profile.host === undefined) return undefined;
    if (profile.clientId === undefined) return undefined;
    if (profile.clientSecret === undefined) return undefined;
    return newM2mCredentials({
      host: profile.host,
      clientId: profile.clientId,
      clientSecret: profile.clientSecret.value,
      ...(profile.accountId !== undefined && {accountId: profile.accountId}),
    });
  },
};
