/**
 * SQL execution: list warehouses, then run a statement inline so the rows
 * arrive in the response body as `result.dataArray`.
 *
 * Run: npm run sql-execution --workspace @databricks/sdk-examples
 */

import {fileURLToPath} from 'node:url';

import {newU2mCredentials} from '@databricks/sdk-auth/credentials';
import {LogLevel} from '@databricks/sdk-core/logger';
import {resolve} from '@databricks/sdk-core/profiles';
import type {ClientOptions} from '@databricks/sdk-options/client';
import {
  Disposition,
  Format,
  StatementExecutionClient,
} from '@databricks/sdk-statementexecution/v1';
import {WarehousesClient} from '@databricks/sdk-warehouses/v1';

const log = new LogLevel('info');

export async function main(options: ClientOptions): Promise<void> {
  const {warehouses} = await new WarehousesClient(options).listWarehouses({});
  const warehouseId = warehouses?.[0]?.id;
  if (warehouseId === undefined) {
    throw new Error('No warehouse available in the workspace.');
  }

  const resp = await new StatementExecutionClient(options).executeStatement({
    warehouseId,
    statement: 'SELECT value FROM range(3) AS t(value)',
    waitTimeout: '50s',
    disposition: Disposition.INLINE,
    format: Format.JSON_ARRAY,
  });

  log.info(`State: ${resp.status?.state ?? '(unknown)'}`);
  for (const row of resp.result?.dataArray ?? []) {
    log.info(JSON.stringify(row));
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const {host} = await resolve({profile: 'demo'});
  if (host === undefined || host === '') {
    throw new Error(
      'The "demo" profile has no host; run `databricks auth login`.'
    );
  }
  await main({host, credentials: newU2mCredentials({profile: 'demo'})});
}
