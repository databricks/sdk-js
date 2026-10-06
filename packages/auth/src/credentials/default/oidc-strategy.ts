import {env} from 'node:process';

import type {Profile} from '@databricks/sdk-core/profiles';

import type {TokenCredentials} from '../../auth';
import {newTokenCredentials} from '../../auth';
import type {IdTokenProvider} from '../../oidc';
import {
  newDatabricksOidcTokenProvider,
  newEnvIdTokenProvider,
  newFileTokenProvider,
} from '../../oidc';
import {resolveTokenEndpoint} from '../host-metadata';

import type {Strategy} from './chain';

export const envOidcStrategy: Strategy = {
  name: 'env-oidc',
  supportsGroupAssumption: true,
  configure: profile => {
    if (profile.host === undefined) return undefined;
    const name = profile.oidcTokenEnv ?? 'DATABRICKS_OIDC_TOKEN';
    if (env[name] === undefined || env[name] === '') return undefined;
    return newOidcCredentials(profile, 'env-oidc', newEnvIdTokenProvider(name));
  },
};

export const fileOidcStrategy: Strategy = {
  name: 'file-oidc',
  supportsGroupAssumption: true,
  configure: profile => {
    if (profile.host === undefined) return undefined;
    if (profile.oidcTokenFilePath === undefined) return undefined;
    return newOidcCredentials(
      profile,
      'file-oidc',
      newFileTokenProvider(profile.oidcTokenFilePath)
    );
  },
};

function newOidcCredentials(
  profile: Profile,
  name: string,
  idTokenProvider: IdTokenProvider
): TokenCredentials {
  const host = profile.host;
  if (host === undefined) {
    throw new Error('host is required');
  }
  let tokenEndpoint: Promise<string> | undefined;
  return newTokenCredentials(
    name,
    newDatabricksOidcTokenProvider({
      host,
      idTokenProvider,
      tokenEndpointProvider: async () => {
        tokenEndpoint ??= resolveTokenEndpoint(host, profile.accountId).catch(
          (cause: unknown) => {
            tokenEndpoint = undefined;
            throw new Error('discovering OIDC token endpoint failed', {cause});
          }
        );
        return {tokenEndpoint: await tokenEndpoint};
      },
      ...(profile.clientId !== undefined && {clientId: profile.clientId}),
      ...(profile.accountId !== undefined && {accountId: profile.accountId}),
      ...(profile.groupId !== undefined && {groupId: profile.groupId}),
      ...(profile.tokenAudience !== undefined && {
        audience: profile.tokenAudience,
      }),
    })
  );
}
