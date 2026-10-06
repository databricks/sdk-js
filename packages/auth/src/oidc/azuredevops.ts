import {env} from 'node:process';

import type {HttpClient} from '@databricks/sdk-core/http';
import {newFetchHttpClient} from '@databricks/sdk-core/http';
import {z} from 'zod';

import type {IdTokenProvider} from './oidc';
import {idTokenProviderFn} from './oidc';

/** Configures {@link newAzureDevOpsIdTokenProvider}. */
export interface AzureDevOpsIdTokenProviderOptions {
  /** Uses the Fetch API when omitted. */
  httpClient?: HttpClient;
}

/**
 * Returns a new IdTokenProvider that retrieves an IdToken from an Azure DevOps
 * environment.
 *
 * This IdTokenProvider is only valid when running in Azure DevOps Pipelines.
 */
export function newAzureDevOpsIdTokenProvider(
  options?: AzureDevOpsIdTokenProviderOptions
): IdTokenProvider {
  const accessToken = env.SYSTEM_ACCESSTOKEN;
  if (accessToken === undefined || accessToken === '') {
    throw new Error(
      'SYSTEM_ACCESSTOKEN env var not found, ' +
        'if calling from Azure DevOps Pipeline, please set this env var ' +
        'following https://learn.microsoft.com/en-us/azure/devops/pipelines/' +
        'build/variables?view=azure-devops&tabs=yaml#systemaccesstoken'
    );
  }
  const collectionUri = requiredEnv('SYSTEM_TEAMFOUNDATIONCOLLECTIONURI');
  const planId = requiredEnv('SYSTEM_PLANID');
  const jobId = requiredEnv('SYSTEM_JOBID');
  const projectId = requiredEnv('SYSTEM_TEAMPROJECTID');
  const hostType = requiredEnv('SYSTEM_HOSTTYPE');
  const client = options?.httpClient ?? newFetchHttpClient();

  // Azure DevOps fixes the token audience to api://AzureADTokenExchange.
  return idTokenProviderFn(async () => {
    try {
      const url = new URL(collectionUri);
      url.pathname =
        `${url.pathname.replace(/\/+$/, '')}/${encodeURIComponent(projectId)}` +
        `/_apis/distributedtask/hubs/${encodeURIComponent(hostType)}` +
        `/plans/${encodeURIComponent(planId)}/jobs/${encodeURIComponent(jobId)}` +
        '/oidctoken';
      url.searchParams.set('api-version', '7.2-preview.1');
      const response = await client.send({
        url: url.href,
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        }),
      });
      if (response.statusCode < 200 || response.statusCode >= 300) {
        await response.body?.cancel();
        throw new Error(`HTTP ${response.statusCode.toString()}`);
      }
      const raw: unknown = await new Response(response.body).json();
      const parsed = idTokenResponseSchema.parse(raw);
      if (parsed.oidcToken === '') {
        throw new Error('empty OIDC token received from Azure DevOps');
      }
      return {value: parsed.oidcToken};
    } catch (cause: unknown) {
      throw new Error('failed to request ID token from Azure DevOps', {cause});
    }
  });
}

function requiredEnv(name: string): string {
  const value = env[name];
  if (value === undefined || value === '') {
    throw new Error(
      `not calling from Azure DevOps Pipeline: missing env var ${name}`
    );
  }
  return value;
}

const idTokenResponseSchema = z.object({oidcToken: z.string()});
