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

  const cases: {
    name: string;
    file?: {filename: string; content: string};
    filename: string;
    wantValue?: string;
    wantError?: string | RegExp;
  }[] = [
    {
      name: 'reads the token from a file',
      file: {filename: 'token', content: 'content'},
      filename: 'token',
      wantValue: 'content',
    },
    {
      name: 'preserves file contents verbatim including a trailing newline',
      file: {filename: 'token', content: 'token-with-newline\n'},
      filename: 'token',
      wantValue: 'token-with-newline\n',
    },
    {
      name: 'rejects when the path is empty',
      filename: '',
      wantError: 'missing path',
    },
    {
      name: 'rejects when the file does not exist',
      filename: 'does-not-exist',
      wantError: /^file ".+" does not exist$/,
    },
    {
      name: 'rejects when the file is empty',
      file: {filename: 'token', content: ''},
      filename: 'token',
      wantError: /^file ".+" is empty$/,
    },
  ];

  it.each(cases)('$name', async ({file, filename, wantValue, wantError}) => {
    if (file !== undefined) {
      await writeFile(join(tmpDir, file.filename), file.content);
    }
    const path = filename === '' ? '' : join(tmpDir, filename);
    const provider = newFileTokenProvider(path);
    if (wantError !== undefined) {
      await expect(provider.idToken('')).rejects.toThrow(wantError);
    } else {
      expect((await provider.idToken('')).value).toBe(wantValue);
    }
  });

  it('does not cache and re-reads the file each call', async () => {
    const path = join(tmpDir, 'token');
    await writeFile(path, 'first');
    const provider = newFileTokenProvider(path);
    expect((await provider.idToken('')).value).toBe('first');

    await writeFile(path, 'second');
    expect((await provider.idToken('')).value).toBe('second');
  });
});
