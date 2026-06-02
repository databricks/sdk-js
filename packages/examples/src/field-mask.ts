/**
 * Typed FieldMask: projectFieldMask validates camelCase paths against the
 * message schema and serializes them to comma-joined snake_case. Pure
 * client-side — no workspace needed.
 *
 * Run: npm run field-mask --workspace @databricks/sdk-examples
 */

import {fileURLToPath} from 'node:url';

import {LogLevel} from '@databricks/sdk-core/logger';
import {projectFieldMask} from '@databricks/sdk-postgres/v1';

const log = new LogLevel('info');

export function main(): void {
  // camelCase paths serialize to snake_case; a parent path subsumes children.
  const mask = projectFieldMask(
    'spec.displayName',
    'spec.historyRetentionDuration'
  );
  log.info(mask.toString());
  log.info(projectFieldMask('spec', 'spec.displayName').toString());

  // Unknown paths are rejected at build time, before any request.
  try {
    projectFieldMask('spec.bogus');
  } catch (e) {
    log.info((e as Error).message);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
