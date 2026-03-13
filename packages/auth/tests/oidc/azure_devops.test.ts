import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import {
  newAzureDevOpsIdTokenProvider,
  MissingAccessTokenError,
  NotInAzureDevOpsError,
} from '../../src/oidc/azure_devops';

describe('newAzureDevOpsIdTokenProvider', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {...originalEnv};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  const setAzureDevOpsEnv = (): void => {
    process.env.SYSTEM_ACCESSTOKEN = 'access-token';
    process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI =
      'https://dev.azure.com/myorg';
    process.env.SYSTEM_PLANID = 'plan-123';
    process.env.SYSTEM_JOBID = 'job-456';
    process.env.SYSTEM_TEAMPROJECTID = 'project-789';
    process.env.SYSTEM_HOSTTYPE = 'build';
  };

  it('should throw MissingAccessTokenError when SYSTEM_ACCESSTOKEN is missing', () => {
    delete process.env.SYSTEM_ACCESSTOKEN;

    const mockHttpClient = {post: vi.fn()};

    expect(() => newAzureDevOpsIdTokenProvider(mockHttpClient)).toThrow(
      MissingAccessTokenError
    );
  });

  it('should throw NotInAzureDevOpsError when required env vars are missing', () => {
    process.env.SYSTEM_ACCESSTOKEN = 'token';
    delete process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI;

    const mockHttpClient = {post: vi.fn()};

    expect(() => newAzureDevOpsIdTokenProvider(mockHttpClient)).toThrow(
      NotInAzureDevOpsError
    );
  });

  it('should throw NotInAzureDevOpsError with env var name', () => {
    process.env.SYSTEM_ACCESSTOKEN = 'token';
    delete process.env.SYSTEM_PLANID;
    process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI = 'https://dev.azure.com';

    const mockHttpClient = {post: vi.fn()};

    expect(() => newAzureDevOpsIdTokenProvider(mockHttpClient)).toThrow(
      'missing env var SYSTEM_PLANID'
    );
  });

  it('should fetch token from Azure DevOps', async () => {
    setAzureDevOpsEnv();

    const mockHttpClient = {
      post: vi.fn().mockResolvedValue({oidcToken: 'azure-oidc-token'}),
    };

    const provider = newAzureDevOpsIdTokenProvider(mockHttpClient);
    const token = await provider.idToken('audience');

    expect(token.value).toBe('azure-oidc-token');
    expect(mockHttpClient.post).toHaveBeenCalledWith(
      'https://dev.azure.com/myorg/project-789/_apis/distributedtask/hubs/build/plans/plan-123/jobs/job-456/oidctoken?api-version=7.2-preview.1',
      {Authorization: 'Bearer access-token'}
    );
  });

  it('should throw error when empty token received', async () => {
    setAzureDevOpsEnv();

    const mockHttpClient = {
      post: vi.fn().mockResolvedValue({oidcToken: ''}),
    };

    const provider = newAzureDevOpsIdTokenProvider(mockHttpClient);

    await expect(provider.idToken('audience')).rejects.toThrow(
      'empty OIDC token received from Azure DevOps'
    );
  });
});

describe('MissingAccessTokenError', () => {
  it('should have correct name', () => {
    const error = new MissingAccessTokenError();
    expect(error.name).toBe('MissingAccessTokenError');
  });

  it('should have helpful message', () => {
    const error = new MissingAccessTokenError();
    expect(error.message).toContain('SYSTEM_ACCESSTOKEN');
    expect(error.message).toContain('Azure DevOps Pipeline');
  });
});

describe('NotInAzureDevOpsError', () => {
  it('should have correct name', () => {
    const error = new NotInAzureDevOpsError('TEST_VAR');
    expect(error.name).toBe('NotInAzureDevOpsError');
  });

  it('should include env var name in message', () => {
    const error = new NotInAzureDevOpsError('MY_ENV_VAR');
    expect(error.message).toContain('MY_ENV_VAR');
  });
});
