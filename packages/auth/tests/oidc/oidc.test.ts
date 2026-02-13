import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import {
  idTokenProviderFn,
  newEnvIdTokenProvider,
  newFileTokenProvider,
} from '../../src/oidc/oidc';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

describe('idTokenProviderFn', () => {
  it('should adapt a function to IdTokenProvider interface', async () => {
    const provider = idTokenProviderFn(audience =>
      Promise.resolve({
        value: `token-for-${audience}`,
      })
    );

    const token = await provider.idToken('test-audience');
    expect(token.value).toBe('token-for-test-audience');
  });

  it('should propagate errors from the function', async () => {
    const expectedError = new Error('token fetch failed');
    const provider = idTokenProviderFn(() => Promise.reject(expectedError));

    await expect(provider.idToken('audience')).rejects.toThrow(expectedError);
  });
});

describe('newEnvIdTokenProvider', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {...originalEnv};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should read token from environment variable', async () => {
    process.env.TEST_TOKEN = 'my-token-value';
    const provider = newEnvIdTokenProvider('TEST_TOKEN');

    const token = await provider.idToken('audience');
    expect(token.value).toBe('my-token-value');
  });

  it('should throw error when env var is missing', async () => {
    delete process.env.MISSING_VAR;
    const provider = newEnvIdTokenProvider('MISSING_VAR');

    await expect(provider.idToken('audience')).rejects.toThrow(
      'missing env var "MISSING_VAR"'
    );
  });

  it('should read fresh value on each call', async () => {
    const provider = newEnvIdTokenProvider('CHANGING_TOKEN');

    process.env.CHANGING_TOKEN = 'first-value';
    const token1 = await provider.idToken('audience');

    process.env.CHANGING_TOKEN = 'second-value';
    const token2 = await provider.idToken('audience');

    expect(token1.value).toBe('first-value');
    expect(token2.value).toBe('second-value');
  });
});

describe('newFileTokenProvider', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'auth-test-'));
  });

  afterEach(async () => {
    await fs.rm(tempDir, {recursive: true, force: true});
  });

  it('should read token from file', async () => {
    const tokenPath = path.join(tempDir, 'token.txt');
    await fs.writeFile(tokenPath, 'file-token-value');

    const provider = newFileTokenProvider(tokenPath);
    const token = await provider.idToken('audience');

    expect(token.value).toBe('file-token-value');
  });

  it('should throw error when path is empty', async () => {
    const provider = newFileTokenProvider('');

    await expect(provider.idToken('audience')).rejects.toThrow('missing path');
  });

  it('should throw error when file does not exist', async () => {
    const provider = newFileTokenProvider('/nonexistent/path/token.txt');

    await expect(provider.idToken('audience')).rejects.toThrow(
      'file "/nonexistent/path/token.txt" does not exist'
    );
  });

  it('should throw error when file is empty', async () => {
    const tokenPath = path.join(tempDir, 'empty.txt');
    await fs.writeFile(tokenPath, '');

    const provider = newFileTokenProvider(tokenPath);

    await expect(provider.idToken('audience')).rejects.toThrow(
      `file "${tokenPath}" is empty`
    );
  });
});
