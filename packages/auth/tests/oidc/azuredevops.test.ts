import type {HttpClient} from '@databricks/sdk-core/http';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {newTokenCredentials} from '../../src';
import type {AzureDevOpsIdTokenProviderOptions} from '../../src/oidc';
import {
  newAzureDevOpsIdTokenProvider,
  newDatabricksOidcTokenProvider,
} from '../../src/oidc';
import * as browserOidc from '../../src/oidc/index.browser';

const PIPELINE_ENV = {
  SYSTEM_ACCESSTOKEN: 'pipeline-access-token',
  SYSTEM_TEAMFOUNDATIONCOLLECTIONURI: 'https://dev.azure.com/myorg',
  SYSTEM_PLANID: 'plan-id',
  SYSTEM_JOBID: 'job-id',
  SYSTEM_TEAMPROJECTID: 'project-id',
  SYSTEM_HOSTTYPE: 'build',
};
const REQUEST_URL =
  'https://dev.azure.com/myorg/project-id/_apis/distributedtask/hubs/build' +
  '/plans/plan-id/jobs/job-id/oidctoken?api-version=7.2-preview.1';

function responseClient(
  body: string,
  statusCode = 200
): {
  client: HttpClient;
  send: ReturnType<typeof vi.fn<HttpClient['send']>>;
} {
  const send = vi.fn<HttpClient['send']>(() =>
    Promise.resolve({
      statusCode,
      headers: new Headers(),
      body: new Response(body).body,
    })
  );
  return {client: {send}, send};
}

describe('newAzureDevOpsIdTokenProvider', () => {
  beforeEach(() => {
    for (const [name, value] of Object.entries(PIPELINE_ENV)) {
      vi.stubEnv(name, value);
    }
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it.each(
    Object.keys(PIPELINE_ENV).flatMap(name =>
      [undefined, ''].map(value => ({name, value}))
    )
  )('rejects missing or empty $name at construction', ({name, value}) => {
    vi.stubEnv(name, value);
    const {client, send} = responseClient('{"oidcToken":"id-token"}');
    expect(() => newAzureDevOpsIdTokenProvider({httpClient: client})).toThrow(
      name === 'SYSTEM_ACCESSTOKEN'
        ? 'SYSTEM_ACCESSTOKEN env var not found'
        : `not calling from Azure DevOps Pipeline: missing env var ${name}`
    );
    expect(send).not.toHaveBeenCalled();
  });

  it.each(['', 'requested-audience'])(
    'requests a pipeline token without forwarding audience "%s"',
    async audience => {
      const {client, send} = responseClient(
        '{"oidcToken":"pipeline-id-token"}'
      );
      const provider = newAzureDevOpsIdTokenProvider({httpClient: client});
      await expect(provider.idToken(audience)).resolves.toStrictEqual({
        value: 'pipeline-id-token',
      });
      expect(send).toHaveBeenCalledExactlyOnceWith({
        url: REQUEST_URL,
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer pipeline-access-token',
          Accept: 'application/json',
        }),
      });
    }
  );

  it.each([
    {name: 'server error', body: '{}', status: 500},
    {name: 'unauthorized', body: '{}', status: 401},
    {name: 'invalid JSON', body: '{', status: 200},
    {name: 'missing token', body: '{}', status: 200},
    {name: 'wrong token type', body: '{"oidcToken":42}', status: 200},
    {name: 'empty token', body: '{"oidcToken":""}', status: 200},
  ])('rejects $name', async ({body, status}) => {
    const {client, send} = responseClient(body, status);
    const provider = newAzureDevOpsIdTokenProvider({httpClient: client});
    await expect(provider.idToken('')).rejects.toThrow(
      'failed to request ID token from Azure DevOps'
    );
    expect(send).toHaveBeenCalledTimes(1);
  });

  it('preserves transport failures as causes', async () => {
    const cause = new Error('connection failed');
    const send = vi.fn<HttpClient['send']>(() => Promise.reject(cause));
    const provider = newAzureDevOpsIdTokenProvider({httpClient: {send}});
    await expect(provider.idToken('')).rejects.toMatchObject({cause});
  });

  it('captures pipeline settings and encodes each path segment', async () => {
    vi.stubEnv(
      'SYSTEM_TEAMFOUNDATIONCOLLECTIONURI',
      'https://dev.azure.com/org/'
    );
    vi.stubEnv('SYSTEM_TEAMPROJECTID', 'project with spaces');
    vi.stubEnv('SYSTEM_HOSTTYPE', 'release');
    vi.stubEnv('SYSTEM_PLANID', 'plan/id');
    const {client, send} = responseClient('{"oidcToken":"id-token"}');
    const provider = newAzureDevOpsIdTokenProvider({httpClient: client});
    vi.stubEnv('SYSTEM_ACCESSTOKEN', 'changed-token');
    vi.stubEnv('SYSTEM_HOSTTYPE', 'changed-hub');
    await provider.idToken('');
    expect(send).toHaveBeenCalledExactlyOnceWith({
      url:
        'https://dev.azure.com/org/project%20with%20spaces/_apis/' +
        'distributedtask/hubs/release/plans/plan%2Fid/jobs/job-id/' +
        'oidctoken?api-version=7.2-preview.1',
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer pipeline-access-token',
        Accept: 'application/json',
      }),
    });
  });

  it('fetches a new pipeline ID token for each call', async () => {
    const {client, send} = responseClient('{"oidcToken":"first"}');
    const provider = newAzureDevOpsIdTokenProvider({httpClient: client});
    await expect(provider.idToken('')).resolves.toStrictEqual({value: 'first'});
    send.mockImplementationOnce(() =>
      Promise.resolve({
        statusCode: 200,
        headers: new Headers(),
        body: new Response('{"oidcToken":"second"}').body,
      })
    );
    await expect(provider.idToken('')).resolves.toStrictEqual({
      value: 'second',
    });
    expect(send).toHaveBeenCalledTimes(2);
  });

  const defaultOptionsCases: (AzureDevOpsIdTokenProviderOptions | undefined)[] =
    [undefined, {}];

  it.each(defaultOptionsCases)(
    'exchanges the pipeline ID token with default transport and options %j',
    async options => {
      const tokenEndpoint = 'https://workspace.example/oidc/v1/token';
      const fetchMock = vi.fn<typeof fetch>((input, init) => {
        const url = input instanceof Request ? input.url : input.toString();
        if (url === REQUEST_URL) {
          expect(init?.method).toBe('POST');
          expect(new Headers(init?.headers).get('Authorization')).toBe(
            'Bearer pipeline-access-token'
          );
          return Promise.resolve(
            new Response('{"oidcToken":"pipeline-id-token"}')
          );
        }
        expect(url).toBe(tokenEndpoint);
        expect(init?.method).toBe('POST');
        if (typeof init?.body !== 'string') {
          expect.fail('Expected a form-encoded exchange request.');
        }
        expect(
          Object.fromEntries(new URLSearchParams(init.body))
        ).toStrictEqual({
          client_id: 'client-id',
          scope: 'all-apis',
          subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
          subject_token: 'pipeline-id-token',
          grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        });
        return Promise.resolve(
          new Response('{"access_token":"databricks-access-token"}')
        );
      });
      vi.stubGlobal('fetch', fetchMock);
      const credentials = newTokenCredentials(
        'azure-devops-oidc',
        newDatabricksOidcTokenProvider({
          host: 'https://workspace.example',
          clientId: 'client-id',
          tokenEndpointProvider: () => Promise.resolve({tokenEndpoint}),
          idTokenProvider: newAzureDevOpsIdTokenProvider(options),
        })
      );
      expect(credentials.name()).toBe('azure-devops-oidc');
      await expect(credentials.authHeaders()).resolves.toStrictEqual([
        {key: 'Authorization', value: 'Bearer databricks-access-token'},
      ]);
      expect(fetchMock).toHaveBeenCalledTimes(2);
    }
  );

  it('does not export pipeline environment access from the browser entry point', () => {
    expect(browserOidc).not.toHaveProperty('newAzureDevOpsIdTokenProvider');
    expect(browserOidc).toHaveProperty('newGithubIdTokenProvider');
  });
});
