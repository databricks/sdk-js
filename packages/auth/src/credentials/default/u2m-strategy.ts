import {newTokenCredentials} from '../../auth';
import {newCachedTokenProvider} from '../../cache';
import {newU2mCredentials} from '../u2m';

import type {Strategy} from './chain';

/**
 * U2M (Databricks CLI) strategy. Configured when the profile was loaded
 * from the config file (so the section name is known) and a host is set.
 * The CLI must have been logged in ahead of time via `databricks auth
 * login`. The token provider is wrapped in a cache to avoid shelling out to
 * the CLI on every request.
 */
export const u2mStrategy: Strategy = {
  name: 'databricks-cli',
  supportsGroupAssumption: false,
  configure: profile => {
    if (profile.host === undefined) return undefined;
    if (profile.name === undefined) return undefined;
    const credentials = newU2mCredentials({
      profile: profile.name,
      ...(profile.databricksCliPath !== undefined && {
        cliPath: profile.databricksCliPath,
      }),
    });
    return newTokenCredentials(
      credentials.name(),
      newCachedTokenProvider(credentials)
    );
  },
};
