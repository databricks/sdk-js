/**
 * File-based OIDC ID token provider. Reads the ID token from a file on disk.
 *
 * Node.js only. Not exported from the browser entry point.
 */

import {readFile} from 'node:fs/promises';

import type {IDTokenProvider} from './oidc';
import {idTokenProviderFn} from './oidc';

/**
 * Returns an IDTokenProvider that reads the ID token from a file. The file
 * should contain a single line with the token.
 *
 * @param path - Filesystem path to the file containing the ID token.
 * @throws Error when the path is empty, the file does not exist, or the file
 * is empty.
 */
export function newFileTokenProvider(path: string): IDTokenProvider {
  return idTokenProviderFn(async () => {
    if (path === '') {
      throw new Error('missing path');
    }
    let content: string;
    try {
      content = await readFile(path, 'utf-8');
    } catch (e: unknown) {
      if (isNodeErrorWithCode(e, 'ENOENT')) {
        throw new Error(`file "${path}" does not exist`);
      }
      throw e;
    }
    if (content.length === 0) {
      throw new Error(`file "${path}" is empty`);
    }
    return {value: content};
  });
}

function isNodeErrorWithCode(e: unknown, code: string): boolean {
  if (!(e instanceof Error) || !('code' in e)) {
    return false;
  }
  const errCode: unknown = e.code;
  return typeof errCode === 'string' && errCode === code;
}
