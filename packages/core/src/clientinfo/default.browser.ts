/**
 * Browser-compatible {@link createDefault}. Contains no Node.js-specific
 * APIs (no `process.version`, `process.platform`, or `process.env`); only
 * the segments registered via {@link setProduct}, {@link setPartner}, and
 * {@link addToDefault} are returned, plus the core SDK identity.
 *
 * @module
 */

import {ClientInfo} from './clientinfo';
import {MODULE_NAME, VERSION, getBase} from './base';

/**
 * Returns a {@link ClientInfo} populated with SDK metadata and segments
 * registered via {@link addToDefault}. Unlike the Node.js variant, this
 * does not auto-detect runtime, OS, CI/CD, or agent because those signals
 * are not available in a browser.
 */
export function createDefault(): ClientInfo {
  return ClientInfo.EMPTY.with(
    {key: MODULE_NAME, value: VERSION},
    ...getBase().segments
  );
}
