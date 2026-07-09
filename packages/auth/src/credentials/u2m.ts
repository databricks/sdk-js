/**
 * Databricks CLI ("U2M") credentials. Obtains access tokens by shelling out
 * to the `databricks` CLI binary (>= 0.100.0). The CLI must have been logged
 * in ahead of time via `databricks auth login`.
 *
 * Node.js only. Not exported from the browser entry point.
 */

import {execFile} from 'node:child_process';
import {stat} from 'node:fs/promises';
import {join, sep} from 'node:path';
import {env, platform} from 'node:process';
import {promisify} from 'node:util';

import {ProfileError, resolve} from '@databricks/sdk-core/profiles';
import {z} from 'zod';

import type {Token, TokenCredentials} from '../auth';
import {newTokenCredentials, tokenProviderFn} from '../auth';

import {U2mCredentialsError} from './errors';

const execFileAsync = promisify(execFile);

/**
 * Minimum Databricks CLI version that supports `databricks auth token`. The
 * legacy Python CLI predates this and is not compatible.
 */
const MIN_CLI_VERSION = {major: 0, minor: 100, patch: 0};

/**
 * Fallback heuristic for {@link isModernCli} when `databricks version` cannot
 * be parsed: the modern Go-based CLI binary is always larger than this, while
 * the legacy Python launcher is smaller.
 */
const DATABRICKS_CLI_MIN_SIZE = 1024 * 1024;

/** Options for the Databricks CLI auth strategy. */
export interface U2mCredentialsOptions {
  /**
   * The Databricks CLI profile name, as configured via `databricks auth
   * login`.
   */
  profile: string;

  /**
   * Path to the `databricks` CLI binary. If omitted, the binary is searched
   * for in `PATH`.
   */
  cliPath?: string;
}

/**
 * Creates a TokenCredentials that obtains Databricks access tokens by
 * shelling out to the Databricks CLI.
 *
 * @param options - CLI profile (required) and optional CLI binary path.
 * @throws U2mCredentialsError when `profile` is empty, or when the CLI cannot
 * be located, is out of date, or fails to return a usable token.
 */
export function newU2mCredentials(
  options: U2mCredentialsOptions
): TokenCredentials {
  if (options.profile === '') {
    throw new U2mCredentialsError('PROFILE_REQUIRED', 'profile is required');
  }
  const provider = tokenProviderFn(() => fetchCliToken(options));
  return newTokenCredentials('databricks-cli', provider);
}

async function fetchCliToken(options: U2mCredentialsOptions): Promise<Token> {
  await ensureProfileExists(options.profile);
  const cliPath = await findDatabricksCli(options.cliPath);
  return execCliCommand([
    cliPath,
    'auth',
    'token',
    '--profile',
    options.profile,
  ]);
}

/**
 * Verifies that the requested profile exists in the Databricks config file.
 *
 * `databricks auth token --profile X` treats an unknown profile as "no
 * profile" and fails with a host-related error, which is misleading. Checking
 * up front lets us throw a precise error that names the missing profile.
 */
async function ensureProfileExists(profile: string): Promise<void> {
  try {
    await resolve({profile});
  } catch (e) {
    if (e instanceof ProfileError && e.code === 'PROFILE_NOT_FOUND') {
      throw new U2mCredentialsError(
        'PROFILE_NOT_FOUND',
        `profile "${profile}" was not found in the Databricks config file`
      );
    }
    throw e;
  }
}

const cliTokenResponseSchema = z.object({
  access_token: z.string().min(1),
  token_type: z.string().optional(),
  expiry: z.string(),
});

async function execCliCommand(args: string[]): Promise<Token> {
  const [cliPath, ...rest] = args;

  let stdout: string;
  try {
    const result = await execFileAsync(cliPath, rest);
    stdout = result.stdout;
  } catch (e) {
    throw new U2mCredentialsError(
      'TOKEN_FETCH_FAILED',
      `cannot get access token: ${cliErrorMessage(e)}`
    );
  }

  let raw: unknown;
  try {
    raw = JSON.parse(stdout);
  } catch (e) {
    const cause = e instanceof Error ? e.message : String(e);
    throw new U2mCredentialsError(
      'INVALID_RESPONSE',
      `cannot parse CLI response: ${cause}`
    );
  }

  const result = cliTokenResponseSchema.safeParse(raw);
  if (!result.success) {
    throw new U2mCredentialsError(
      'INVALID_RESPONSE',
      `invalid CLI response: ${result.error.message}`
    );
  }
  const parsed = result.data;

  const expiry = new Date(parsed.expiry);
  if (Number.isNaN(expiry.getTime())) {
    throw new U2mCredentialsError(
      'INVALID_RESPONSE',
      `cannot parse token expiry: ${parsed.expiry}`
    );
  }

  return {
    value: parsed.access_token,
    ...(parsed.token_type !== undefined && {type: parsed.token_type}),
    expiry,
  };
}

interface ExecFileError {
  stderr?: string | Buffer;
  message: string;
}

function cliErrorMessage(e: unknown): string {
  if (typeof e === 'object' && e !== null) {
    const err = e as ExecFileError;
    if (err.stderr !== undefined) {
      return stripErrorPrefix(err.stderr.toString().trim());
    }
    return err.message;
  }
  return String(e);
}

/**
 * Removes a leading "Error:" label that the CLI prints on its stderr. Without
 * this the wrapped message reads "Error: Error: ..." once the SDK adds its own
 * context.
 */
function stripErrorPrefix(message: string): string {
  const match = /^Error:\s*/.exec(message);
  if (match === null) {
    return message;
  }
  return message.slice(match[0].length);
}

/**
 * Locates the `databricks` CLI binary, either at `cliPath` (if provided) or
 * by searching `PATH`. Validates that the binary is the modern Go CLI and not
 * the legacy Python one.
 */
async function findDatabricksCli(cliPath?: string): Promise<string> {
  if (cliPath !== undefined) {
    if (cliPath.includes(sep) || cliPath.includes('/')) {
      return validateCliPath(cliPath);
    }
    return findInPath(cliPath);
  }
  try {
    return await findInPath('databricks');
  } catch (e) {
    if (platform === 'win32') {
      return findInPath('databricks.exe');
    }
    throw e;
  }
}

async function findInPath(name: string): Promise<string> {
  const pathEnv = env.PATH ?? '';
  if (pathEnv === '') {
    throw new U2mCredentialsError('CLI_NOT_FOUND', 'databricks CLI not found');
  }
  const delim = platform === 'win32' ? ';' : ':';
  let legacyError: U2mCredentialsError | undefined;
  for (const dir of pathEnv.split(delim)) {
    if (dir === '') {
      continue;
    }
    try {
      return await validateCliPath(join(dir, name));
    } catch (e) {
      if (
        e instanceof U2mCredentialsError &&
        e.code === 'LEGACY_CLI_DETECTED'
      ) {
        legacyError = e;
      }
    }
  }
  throw (
    legacyError ??
    new U2mCredentialsError('CLI_NOT_FOUND', 'databricks CLI not found')
  );
}

async function validateCliPath(path: string): Promise<string> {
  let info;
  try {
    info = await stat(path);
  } catch {
    throw new U2mCredentialsError('CLI_NOT_FOUND', 'databricks CLI not found');
  }
  if (info.isDirectory()) {
    throw new U2mCredentialsError('CLI_NOT_FOUND', 'databricks CLI not found');
  }
  if (!(await isModernCli(path, info.size))) {
    throw new U2mCredentialsError(
      'LEGACY_CLI_DETECTED',
      'legacy databricks CLI detected; upgrade to >= 0.100.0'
    );
  }
  return path;
}

/**
 * Reports whether the binary at `path` is the modern Go-based Databricks CLI.
 *
 * The modern CLI reports its version as `Databricks CLI v<semver>`; the legacy
 * Python CLI does not. When the version cannot be obtained (e.g. the binary is
 * not executable in this environment), fall back to the binary-size heuristic,
 * since the legacy launcher is far smaller than `size` bytes.
 */
async function isModernCli(path: string, size: number): Promise<boolean> {
  const version = await cliVersion(path);
  if (version !== undefined) {
    return isAtLeastMinVersion(version);
  }
  return size >= DATABRICKS_CLI_MIN_SIZE;
}

interface CliVersion {
  major: number;
  minor: number;
  patch: number;
}

const CLI_VERSION_PATTERN = /Databricks CLI v(\d+)\.(\d+)\.(\d+)/;

/**
 * Runs `<path> version` and parses the reported semantic version. Returns
 * undefined when the command fails or its output does not match the modern
 * CLI's version banner.
 */
async function cliVersion(path: string): Promise<CliVersion | undefined> {
  let stdout: string;
  try {
    const result = await execFileAsync(path, ['version']);
    stdout = result.stdout;
  } catch {
    return undefined;
  }
  const match = CLI_VERSION_PATTERN.exec(stdout);
  if (match === null) {
    return undefined;
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

/** Reports whether `version` is at least {@link MIN_CLI_VERSION}. */
function isAtLeastMinVersion(version: CliVersion): boolean {
  if (version.major !== MIN_CLI_VERSION.major) {
    return version.major > MIN_CLI_VERSION.major;
  }
  if (version.minor !== MIN_CLI_VERSION.minor) {
    return version.minor > MIN_CLI_VERSION.minor;
  }
  return version.patch >= MIN_CLI_VERSION.patch;
}
