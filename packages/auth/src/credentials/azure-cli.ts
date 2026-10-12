import {AzureCliCredential} from '@azure/identity';
import {z} from 'zod';

import type {Token, TokenCredentials} from '../auth';
import {newTokenCredentials, tokenProviderFn} from '../auth';

import {AzureCliCredentialsError} from './errors';

const AZURE_DATABRICKS_SCOPE = '2ff814a6-3304-4ab8-85cb-cd0e6f879c1d/.default';

/** Configures {@link newAzureCliCredentials}. */
export interface AzureCliCredentialsOptions {
  /** Selects a tenant by ID, defaulting to the Azure CLI's current tenant. */
  tenantId?: string;
}

/**
 * Creates Node.js credentials using an existing `az login` session.
 * Azure CLI authentication is not included in the default credential chain.
 */
export function newAzureCliCredentials(
  options?: AzureCliCredentialsOptions
): TokenCredentials {
  const credential = new AzureCliCredential(
    options?.tenantId === undefined ? undefined : {tenantId: options.tenantId}
  );
  const provider = tokenProviderFn(() => fetchAzureCliToken(credential));
  return newTokenCredentials('azure-cli', provider);
}

const tokenResponseSchema = z.object({
  token: z.string().min(1),
  expiresOnTimestamp: z
    .number()
    .transform(timestamp => new Date(timestamp))
    .pipe(z.date()),
});

async function fetchAzureCliToken(
  credential: AzureCliCredential
): Promise<Token> {
  let response: unknown;
  try {
    response = await credential.getToken(AZURE_DATABRICKS_SCOPE);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    throw new AzureCliCredentialsError(
      'TOKEN_FETCH_FAILED',
      `cannot get Azure CLI access token: ${message}`,
      {cause: e}
    );
  }

  const result = tokenResponseSchema.safeParse(response);
  if (!result.success) {
    throw new AzureCliCredentialsError(
      'INVALID_RESPONSE',
      `invalid Azure CLI token response: ${result.error.message}`
    );
  }
  return {
    value: result.data.token,
    type: 'Bearer',
    expiry: result.data.expiresOnTimestamp,
  };
}
