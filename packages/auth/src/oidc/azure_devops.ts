/**
 * Azure DevOps OIDC token provider for the Databricks SDK.
 */

import type {IdToken, IdTokenProvider} from './oidc';

/**
 * HTTP client interface for Azure DevOps.
 */
export interface HttpClient {
  post<T>(url: string, headers: Record<string, string>): Promise<T>;
}

/**
 * Error thrown when SYSTEM_ACCESSTOKEN is missing.
 */
export class MissingAccessTokenError extends Error {
  constructor() {
    super(
      'SYSTEM_ACCESSTOKEN env var not found, ' +
        'if calling from Azure DevOps Pipeline, please set this env var following ' +
        'https://learn.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml#systemaccesstoken'
    );
    this.name = 'MissingAccessTokenError';
  }
}

/**
 * Error thrown when not running in Azure DevOps Pipeline.
 */
export class NotInAzureDevOpsError extends Error {
  constructor(envVar: string) {
    super(`not calling from Azure DevOps Pipeline: missing env var ${envVar}`);
    this.name = 'NotInAzureDevOpsError';
  }
}

/**
 * Creates a new IdTokenProvider that retrieves an IdToken from an Azure DevOps environment.
 * This IdTokenProvider is only valid when running in Azure DevOps Pipelines.
 *
 * @param httpClient - HTTP client for making requests.
 */
export function newAzureDevOpsIdTokenProvider(
  httpClient: HttpClient
): IdTokenProvider {
  const accessToken = process.env.SYSTEM_ACCESSTOKEN;
  if (accessToken === undefined || accessToken === '') {
    throw new MissingAccessTokenError();
  }

  const teamFoundationCollectionUri = getRequiredEnv(
    'SYSTEM_TEAMFOUNDATIONCOLLECTIONURI'
  );
  const planId = getRequiredEnv('SYSTEM_PLANID');
  const jobId = getRequiredEnv('SYSTEM_JOBID');
  const teamProjectId = getRequiredEnv('SYSTEM_TEAMPROJECTID');
  const hostType = getRequiredEnv('SYSTEM_HOSTTYPE');

  return new AzureDevOpsIdTokenProvider(
    httpClient,
    accessToken,
    teamFoundationCollectionUri,
    planId,
    jobId,
    teamProjectId,
    hostType
  );
}

function getRequiredEnv(envVar: string): string {
  const value = process.env[envVar];
  if (value === undefined || value === '') {
    throw new NotInAzureDevOpsError(envVar);
  }
  return value;
}

class AzureDevOpsIdTokenProvider implements IdTokenProvider {
  private readonly httpClient: HttpClient;
  private readonly accessToken: string;
  private readonly teamFoundationCollectionUri: string;
  private readonly planId: string;
  private readonly jobId: string;
  private readonly teamProjectId: string;
  private readonly hostType: string;

  constructor(
    httpClient: HttpClient,
    accessToken: string,
    teamFoundationCollectionUri: string,
    planId: string,
    jobId: string,
    teamProjectId: string,
    hostType: string
  ) {
    this.httpClient = httpClient;
    this.accessToken = accessToken;
    this.teamFoundationCollectionUri = teamFoundationCollectionUri;
    this.planId = planId;
    this.jobId = jobId;
    this.teamProjectId = teamProjectId;
    this.hostType = hostType;
  }

  async idToken(_audience: string): Promise<IdToken> {
    // Azure DevOps OIDC endpoint format.
    // Reference: https://learn.microsoft.com/en-us/rest/api/azure/devops/distributedtask/oidctoken/create
    const requestUrl =
      `${this.teamFoundationCollectionUri}/${this.teamProjectId}/_apis/distributedtask/hubs/` +
      `${this.hostType}/plans/${this.planId}/jobs/${this.jobId}/oidctoken?api-version=7.2-preview.1`;

    const response = await this.httpClient.post<{oidcToken: string}>(
      requestUrl,
      {
        Authorization: `Bearer ${this.accessToken}`,
      }
    );

    if (!response.oidcToken) {
      throw new Error('empty OIDC token received from Azure DevOps');
    }

    return {value: response.oidcToken};
  }
}
