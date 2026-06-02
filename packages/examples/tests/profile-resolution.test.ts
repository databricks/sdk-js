import {mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

import {afterAll, beforeAll, describe, expect, it} from 'vitest';

import {resolve} from '@databricks/sdk-core/profiles';

import {main} from '../src/profile-resolution';

// A databrickscfg fixture with a default profile and a named `test` profile.
const FIXTURE = [
  '[DEFAULT]',
  'host = https://default.cloud.databricks.com',
  'token = default-token',
  '',
  '[test]',
  'host = https://test-profile.cloud.databricks.com',
  'token = test-token',
  '',
].join('\n');

describe('profile-resolution example', () => {
  let dir: string;
  const savedEnv: Record<string, string | undefined> = {};

  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), 'sdkjs-profiles-'));
    const configFile = join(dir, 'databrickscfg');
    writeFileSync(configFile, FIXTURE);
    // Snapshot and clear every DATABRICKS_* var so resolution is hermetic,
    // then point resolve() at the fixture file.
    for (const key of Object.keys(process.env)) {
      if (key.startsWith('DATABRICKS_')) {
        savedEnv[key] = process.env[key];
        Reflect.deleteProperty(process.env, key);
      }
    }
    process.env.DATABRICKS_CONFIG_FILE = configFile;
  });

  afterAll(() => {
    delete process.env.DATABRICKS_CONFIG_FILE;
    delete process.env.DATABRICKS_HOST;
    for (const [key, value] of Object.entries(savedEnv)) {
      if (value !== undefined) {
        process.env[key] = value;
      }
    }
    rmSync(dir, {recursive: true, force: true});
  });

  it('reads an explicit profile from the file', async () => {
    const profile = await resolve({profile: 'test'});
    expect(profile.name).toBe('test');
    expect(profile.host).toBe('https://test-profile.cloud.databricks.com');
  });

  it('ignores env for an explicit profile unless withEnv is set', async () => {
    process.env.DATABRICKS_HOST = 'https://env-override.example.com';
    try {
      const ignored = await resolve({profile: 'test'});
      const optedIn = await resolve({profile: 'test', withEnv: true});
      expect(ignored.host).toBe('https://test-profile.cloud.databricks.com');
      expect(optedIn.host).toBe('https://env-override.example.com');
    } finally {
      delete process.env.DATABRICKS_HOST;
    }
  });

  it('overlays env on the default (no-options) resolution', async () => {
    process.env.DATABRICKS_HOST = 'https://env-override.example.com';
    try {
      const overlaid = await resolve();
      expect(overlaid.host).toBe('https://env-override.example.com');
    } finally {
      delete process.env.DATABRICKS_HOST;
    }
  });

  it('runs the example without throwing', async () => {
    await main('test');
  });
});
