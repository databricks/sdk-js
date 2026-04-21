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

import {z} from 'zod';

import type {Token, TokenCredentials} from '../auth';
import {newTokenCredentials, tokenProviderFn} from '../auth';

import {U2mCredentialsError} from './errors';

const execFileAsync = promisify(execFile);

/**
 * Distinguishes the modern Go-based Databricks CLI (>= 0.100.0) from the
 * legacy Python CLI by minimum file size.
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
  const cliPath = await findDatabricksCli(options.cliPath);
  return execCliCommand([
    cliPath,
    'auth',
    'token',
    '--profile',
    options.profile,
  ]);
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
      return err.stderr.toString().trim();
    }
    return err.message;
  }
  return String(e);
}

/**
 * Locates the `databricks` CLI binary, either at `cliPath` (if provided) or
 * by searching `PATH`. Validates that the binary is the modern Go CLI and
 * not the legacy Python one, via a minimum-size check.
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
  if (info.size < DATABRICKS_CLI_MIN_SIZE) {
    throw new U2mCredentialsError(
      'LEGACY_CLI_DETECTED',
      'legacy databricks CLI detected; upgrade to >= 0.100.0'
    );
  }
  return path;
}
