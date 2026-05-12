import {readFile} from 'node:fs/promises';

import type {IDTokenProvider} from './oidc';
import {idTokenProviderFn} from './oidc';

/**
 * Returns an IDTokenProvider that reads the ID token from a file. The file
 * should contain a single line with the token.
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
      if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
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
