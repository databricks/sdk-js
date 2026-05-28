import {newU2mCredentials} from '../u2m';

import type {Strategy} from './chain';

/**
 * U2M (Databricks CLI) strategy. Configured when the profile was loaded
 * from the config file (so the section name is known) and a host is set.
 * The CLI must have been logged in ahead of time via `databricks auth
 * login`.
 */
export const u2mStrategy: Strategy = profile => {
  if (profile.host === undefined) return undefined;
  if (profile.name === undefined) return undefined;
  return newU2mCredentials({
    profile: profile.name,
    ...(profile.databricksCliPath !== undefined && {
      cliPath: profile.databricksCliPath,
    }),
  });
};
