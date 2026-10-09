import type {
  AzureCliCredential,
  AzureCliCredentialOptions,
} from '@azure/identity';
import {afterEach, describe, expect, it, vi} from 'vitest';

import type {
  AzureCliCredentialsErrorCode,
  AzureCliCredentialsOptions,
  DefaultCredentialsErrorCode,
} from '../../src/credentials';
import {
  AzureCliCredentialsError,
  DefaultCredentialsError,
  defaultCredentials,
  newAzureCliCredentials,
} from '../../src/credentials';
import * as browserCredentials from '../../src/credentials/index.browser';

const {credentialMock, getTokenMock} = vi.hoisted(() => {
  const getTokenMock = vi.fn<AzureCliCredential['getToken']>();
  const credentialMock = vi.fn((_options?: AzureCliCredentialOptions) => ({
    getToken: getTokenMock,
  }));
  return {credentialMock, getTokenMock};
});

// Azure Identity needs a local CLI login; mock it to test the SDK wrapper offline.
vi.mock('@azure/identity', () => ({
  AzureCliCredential: credentialMock,
}));

const EXPIRY = new Date('2026-12-31T00:00:00Z');
const DATABRICKS_SCOPE = '2ff814a6-3304-4ab8-85cb-cd0e6f879c1d/.default';

describe('newAzureCliCredentials', () => {
  afterEach(() => {
    credentialMock.mockClear();
    getTokenMock.mockReset();
  });

  const successCases: {
    name: string;
    options?: AzureCliCredentialsOptions;
    wantAzureOptions?: AzureCliCredentialOptions;
  }[] = [
    {name: 'leaves the tenant unset when options are omitted'},
    {name: 'leaves the tenant unset for empty options', options: {}},
    {
      name: 'forwards an explicit tenant',
      options: {tenantId: 'tenant-id'},
      wantAzureOptions: {tenantId: 'tenant-id'},
    },
  ];

  it.each(successCases)('$name', async ({options, wantAzureOptions}) => {
    getTokenMock.mockResolvedValue({
      token: 'azure-token',
      expiresOnTimestamp: EXPIRY.getTime(),
    });

    const credentials = newAzureCliCredentials(options);

    expect(credentials.name()).toBe('azure-cli');
    expect(credentialMock).toHaveBeenCalledExactlyOnceWith(wantAzureOptions);
    expect(getTokenMock).not.toHaveBeenCalled();
    await expect(credentials.token()).resolves.toStrictEqual({
      value: 'azure-token',
      type: 'Bearer',
      expiry: EXPIRY,
    });
    await expect(credentials.authHeaders()).resolves.toStrictEqual([
      {key: 'Authorization', value: 'Bearer azure-token'},
    ]);
    expect(getTokenMock).toHaveBeenCalledTimes(2);
    expect(getTokenMock).toHaveBeenNthCalledWith(1, DATABRICKS_SCOPE);
    expect(getTokenMock).toHaveBeenNthCalledWith(2, DATABRICKS_SCOPE);
  });

  it('does not forward undeclared vendor options', () => {
    const vendorOptions: AzureCliCredentialOptions = {
      tenantId: 'tenant-id',
      subscription: 'ignored-subscription',
      processTimeoutInMs: 15_000,
    };

    newAzureCliCredentials(vendorOptions);

    expect(credentialMock).toHaveBeenCalledExactlyOnceWith({
      tenantId: 'tenant-id',
    });
    expect(getTokenMock).not.toHaveBeenCalled();
  });

  it('asks the Azure CLI for a fresh token on subsequent calls', async () => {
    const refreshedExpiry = new Date(EXPIRY.getTime() + 3600_000);
    getTokenMock
      .mockResolvedValueOnce({
        token: 'first-token',
        expiresOnTimestamp: EXPIRY.getTime(),
      })
      .mockResolvedValueOnce({
        token: 'refreshed-token',
        expiresOnTimestamp: refreshedExpiry.getTime(),
      });
    const credentials = newAzureCliCredentials();

    await expect(credentials.token()).resolves.toStrictEqual({
      value: 'first-token',
      type: 'Bearer',
      expiry: EXPIRY,
    });
    await expect(credentials.token()).resolves.toStrictEqual({
      value: 'refreshed-token',
      type: 'Bearer',
      expiry: refreshedExpiry,
    });
    expect(credentialMock).toHaveBeenCalledOnce();
    expect(getTokenMock).toHaveBeenCalledTimes(2);
  });

  const errorCases: {
    name: string;
    setup: () => void;
    wantCode: AzureCliCredentialsErrorCode;
    wantMessage: RegExp;
  }[] = [
    {
      name: 'the Azure CLI is not installed',
      setup: (): void => {
        getTokenMock.mockRejectedValue(
          new Error('Azure CLI could not be found.')
        );
      },
      wantCode: 'TOKEN_FETCH_FAILED',
      wantMessage: /Azure CLI could not be found/,
    },
    {
      name: 'the user is not logged in',
      setup: (): void => {
        getTokenMock.mockRejectedValue(new Error("Please run 'az login'."));
      },
      wantCode: 'TOKEN_FETCH_FAILED',
      wantMessage: /az login/,
    },
    {
      name: 'the CLI command fails',
      setup: (): void => {
        getTokenMock.mockRejectedValue(new Error('CLI command failed'));
      },
      wantCode: 'TOKEN_FETCH_FAILED',
      wantMessage: /CLI command failed/,
    },
    {
      name: 'the CLI reports malformed JSON',
      setup: (): void => {
        getTokenMock.mockRejectedValue(new SyntaxError('invalid JSON'));
      },
      wantCode: 'TOKEN_FETCH_FAILED',
      wantMessage: /invalid JSON/,
    },
    {
      name: 'the token is empty',
      setup: (): void => {
        getTokenMock.mockResolvedValue({
          token: '',
          expiresOnTimestamp: EXPIRY.getTime(),
        });
      },
      wantCode: 'INVALID_RESPONSE',
      wantMessage: /invalid Azure CLI token response/,
    },
    {
      name: 'the token expiry is NaN',
      setup: (): void => {
        getTokenMock.mockResolvedValue({
          token: 'azure-token',
          expiresOnTimestamp: NaN,
        });
      },
      wantCode: 'INVALID_RESPONSE',
      wantMessage: /invalid Azure CLI token response/,
    },
    {
      name: 'the token expiry is infinite',
      setup: (): void => {
        getTokenMock.mockResolvedValue({
          token: 'azure-token',
          expiresOnTimestamp: Infinity,
        });
      },
      wantCode: 'INVALID_RESPONSE',
      wantMessage: /invalid Azure CLI token response/,
    },
    {
      name: 'the token expiry exceeds the date range',
      setup: (): void => {
        getTokenMock.mockResolvedValue({
          token: 'azure-token',
          expiresOnTimestamp: Number.MAX_VALUE,
        });
      },
      wantCode: 'INVALID_RESPONSE',
      wantMessage: /invalid Azure CLI token response/,
    },
  ];

  it.each(errorCases)(
    'rejects when $name',
    async ({setup, wantCode, wantMessage}) => {
      setup();
      const result = newAzureCliCredentials().authHeaders();

      await expect(result).rejects.toBeInstanceOf(AzureCliCredentialsError);
      await expect(result).rejects.toMatchObject({
        name: 'AzureCliCredentialsError',
        code: wantCode,
        message: wantMessage,
      });
    }
  );

  it('preserves the Azure Identity error as the cause', async () => {
    const cause = new Error('Azure authentication failed');
    getTokenMock.mockRejectedValue(cause);

    await expect(newAzureCliCredentials().token()).rejects.toMatchObject({
      cause,
    });
  });

  it('allows retrying after a failed token request', async () => {
    getTokenMock
      .mockRejectedValueOnce(new Error("Please run 'az login'."))
      .mockResolvedValueOnce({
        token: 'azure-token',
        expiresOnTimestamp: EXPIRY.getTime(),
      });
    const credentials = newAzureCliCredentials();

    await expect(credentials.token()).rejects.toBeInstanceOf(
      AzureCliCredentialsError
    );
    await expect(credentials.token()).resolves.toStrictEqual({
      value: 'azure-token',
      type: 'Bearer',
      expiry: EXPIRY,
    });
  });

  const defaultChainCases: {
    name: string;
    authType?: string;
    wantCode: DefaultCredentialsErrorCode;
  }[] = [
    {
      name: 'does not auto-detect Azure CLI authentication',
      wantCode: 'NO_AUTH_CONFIGURED',
    },
    {
      name: 'does not select Azure CLI authentication through authType',
      authType: 'azure-cli',
      wantCode: 'AUTH_TYPE_NOT_FOUND',
    },
  ];

  it.each(defaultChainCases)('$name', async ({authType, wantCode}) => {
    const credentials = defaultCredentials({
      profile: {
        host: 'https://workspace.azuredatabricks.net',
        ...(authType !== undefined && {authType}),
      },
    });
    const result = credentials.authHeaders();

    await expect(result).rejects.toBeInstanceOf(DefaultCredentialsError);
    await expect(result).rejects.toMatchObject({code: wantCode});
    expect(credentialMock).not.toHaveBeenCalled();
    expect(getTokenMock).not.toHaveBeenCalled();
  });

  it('does not export Azure CLI credentials from the browser entry point', () => {
    expect(Object.keys(browserCredentials)).not.toContain(
      'newAzureCliCredentials'
    );
  });
});
