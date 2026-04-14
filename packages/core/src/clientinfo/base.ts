/**
 * Shared state management for {@link ClientInfo} defaults. This module
 * is browser-safe and contains no Node.js-specific APIs.
 *
 * @module
 */

import {ClientInfo, ClientInfoError, isSemVer} from './clientinfo';

export const MODULE_NAME = 'sdk-js-core';
export const VERSION = '0.1.0';

// Holds segments added via addToDefault, setProduct, and setPartner.
// createDefault returns a copy of this with env detection appended.
let base = ClientInfo.EMPTY;

/**
 * Sets the product name and version globally. The version must be a
 * valid semver string.
 *
 * Must be called before any client is created. Not safe for concurrent
 * use.
 */
export function setProduct(name: string, version: string): void {
  if (!isSemVer(version)) {
    throw new ClientInfoError(
      'INVALID_VERSION',
      `Invalid version: ${version}.`
    );
  }
  addToDefault(name, version);
}

/**
 * Adds a partner identifier globally. Partner attribution is a
 * first-class concept used for support ticket routing.
 *
 * Must be called before any client is created. Not safe for concurrent
 * use.
 */
export function setPartner(partner: string): void {
  addToDefault('partner', partner);
}

/**
 * Adds a global key/value segment that will be included in every
 * {@link createDefault} call. Same key with different values is allowed
 * (e.g., multiple partners). Exact key+value duplicates are silently
 * ignored.
 *
 * Must be called before any client is created. Not safe for concurrent
 * use.
 */
export function addToDefault(key: string, value: string): void {
  base = base.with({key, value});
}

// Returns the base ClientInfo for use in createDefault.
export function getBase(): ClientInfo {
  return base;
}

// Resets the base segments. Exported for testing only.
export function resetBase(): void {
  base = ClientInfo.EMPTY;
}

// Returns the base segments as a formatted string. Exported for
// testing only.
export function baseToString(): string {
  return base.toString();
}
