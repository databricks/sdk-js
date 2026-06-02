import {describe, expect, it} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';

import {main} from '../src/sql-execution';

// Two warehouses, so the example must pick the first one.
const WAREHOUSES_WIRE = {
  warehouses: [{id: 'wh-demo-1'}, {id: 'wh-demo-2'}],
};

// A SUCCEEDED statement with three inline rows, in wire format.
const STATEMENT_WIRE = {
  statement_id: 'stmt-demo-1',
  status: {state: 'SUCCEEDED'},
  result: {data_array: [['0'], ['1'], ['2']]},
};

function jsonResponse(body: unknown): HttpResponse {
  return {
    statusCode: 200,
    headers: new Headers({'content-type': 'application/json'}),
    body: new Response(JSON.stringify(body)).body,
  };
}

async function bodyText(body: HttpRequest['body']): Promise<string> {
  return typeof body === 'string' ? body : new Response(body ?? null).text();
}

describe('sql-execution example', () => {
  it('runs the statement on the first warehouse', async () => {
    let executeBody: Record<string, unknown> | undefined;
    const httpClient: HttpClient = {
      async send(request: HttpRequest): Promise<HttpResponse> {
        const url = new URL(request.url);
        if (url.pathname === '/api/2.0/sql/warehouses') {
          return jsonResponse(WAREHOUSES_WIRE);
        }
        executeBody = JSON.parse(await bodyText(request.body)) as Record<
          string,
          unknown
        >;
        return jsonResponse(STATEMENT_WIRE);
      },
    };

    await main({host: 'https://test.cloud.databricks.com', httpClient});

    // The example picked the first warehouse and sent the inline SELECT.
    expect(executeBody).toMatchObject({
      warehouse_id: 'wh-demo-1',
      disposition: 'INLINE',
      format: 'JSON_ARRAY',
    });
    expect(executeBody?.statement).toMatch(/SELECT/);
  });
});
