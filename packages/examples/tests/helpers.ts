import type {Credentials} from '@databricks/sdk-auth';

/**
 * Credentials stub for tests that drive a fake `httpClient`. The client layers
 * authentication on top of the provided transport, so a no-op credential
 * suppresses the SDK's auth headers (the stub transport needs no real auth)
 * and avoids resolving the default credential chain.
 */
export const testCredentials: Credentials = {
  name: () => 'test',
  authHeaders: () => Promise.resolve([]),
};
