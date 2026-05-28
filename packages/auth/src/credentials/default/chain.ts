import type {Profile} from '@databricks/sdk-core/profiles';

import type {Credentials, Header} from '../../auth';
import {newM2mCredentials} from '../m2m';
import {newPatCredentials} from '../pat';

import {DefaultCredentialsError} from './errors';

/**
 * A strategy inspects a profile and either returns configured credentials
 * or `undefined` if it is not applicable.
 */
export type Strategy = (profile: Profile) => Credentials | undefined;

const AUTH_DOC_URL = 'https://docs.databricks.com/aws/en/dev-tools/auth/index';
const NO_AUTH_CONFIGURED_MESSAGE = `cannot configure default credentials, please check ${AUTH_DOC_URL} to configure credentials for your preferred authentication method`;

/**
 * Lazy {@link Credentials} that resolves to the first configured strategy
 * on the first `authHeaders()` call.
 */
export class DefaultCredentials implements Credentials {
  private resolved: Credentials | undefined;

  constructor(
    private readonly strategies: readonly Strategy[],
    private readonly loadProfile: () => Promise<Profile>
  ) {}

  name(): string {
    return 'default';
  }

  async authHeaders(): Promise<Header[]> {
    this.resolved ??= await this.resolveChain();
    return this.resolved.authHeaders();
  }

  private async resolveChain(): Promise<Credentials> {
    const profile = await this.loadProfile();
    for (const strategy of this.strategies) {
      const built = strategy(profile);
      if (built !== undefined) {
        return built;
      }
    }
    throw new DefaultCredentialsError(
      'NO_AUTH_CONFIGURED',
      NO_AUTH_CONFIGURED_MESSAGE
    );
  }
}

/** PAT strategy: configured when `token` is set in the profile. */
export const patStrategy: Strategy = profile => {
  if (profile.host === undefined) return undefined;
  if (profile.token === undefined) return undefined;
  return newPatCredentials(profile.token.value);
};

/**
 * OAuth M2M strategy: configured when `clientId` and `clientSecret` are
 * both set in the profile.
 */
export const m2mStrategy: Strategy = profile => {
  if (profile.host === undefined) return undefined;
  if (profile.clientId === undefined) return undefined;
  if (profile.clientSecret === undefined) return undefined;
  return newM2mCredentials({
    host: profile.host,
    clientId: profile.clientId,
    clientSecret: profile.clientSecret.value,
    ...(profile.accountId !== undefined && {accountId: profile.accountId}),
  });
};
