import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

import {afterEach, beforeEach, describe, expect, it} from 'vitest';

import {newFileTokenProvider} from '../../src/oidc/file';

describe('newFileTokenProvider', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'oidc-file-test-'));
  });

  afterEach(async () => {
    await rm(tmpDir, {recursive: true, force: true});
  });

  it('reads the token from a file', async () => {
    const path = join(tmpDir, 'token');
    await writeFile(path, 'content');
    const provider = newFileTokenProvider(path);
    const token = await provider.idToken('any-audience');
    expect(token.value).toBe('content');
  });

  it('preserves file contents verbatim including a trailing newline', async () => {
    const path = join(tmpDir, 'token');
    await writeFile(path, 'token-with-newline\n');
    const provider = newFileTokenProvider(path);
    const token = await provider.idToken('');
    expect(token.value).toBe('token-with-newline\n');
  });

  it('does not cache and re-reads the file each call', async () => {
    const path = join(tmpDir, 'token');
    await writeFile(path, 'first');
    const provider = newFileTokenProvider(path);
    expect((await provider.idToken('')).value).toBe('first');

    await writeFile(path, 'second');
    expect((await provider.idToken('')).value).toBe('second');
  });

  it('rejects when the path is empty', async () => {
    const provider = newFileTokenProvider('');
    await expect(provider.idToken('')).rejects.toThrow('missing path');
  });

  it('rejects when the file does not exist', async () => {
    const path = join(tmpDir, 'does-not-exist');
    const provider = newFileTokenProvider(path);
    await expect(provider.idToken('')).rejects.toThrow(
      `file "${path}" does not exist`
    );
  });

  it('rejects when the file is empty', async () => {
    const path = join(tmpDir, 'token');
    await writeFile(path, '');
    const provider = newFileTokenProvider(path);
    await expect(provider.idToken('')).rejects.toThrow(
      `file "${path}" is empty`
    );
  });
});
