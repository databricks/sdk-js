import {describe, expect, it} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';

import {main} from '../src/pagination';

function jsonResponse(body: unknown): HttpResponse {
  return {
    statusCode: 200,
    headers: new Headers({'content-type': 'application/json'}),
    body: new Response(JSON.stringify(body)).body,
  };
}

describe('pagination example', () => {
  it('threads page tokens across pages via the iterator', async () => {
    // Three fixed pages keyed by page_token; the last omits next_page_token.
    const pages = new Map<string | null, unknown>([
      [null, {catalogs: [{name: 'a'}], next_page_token: 'tok-2'}],
      ['tok-2', {catalogs: [{name: 'b'}], next_page_token: 'tok-3'}],
      ['tok-3', {catalogs: [{name: 'c'}]}],
    ]);

    const seenTokens: (string | null)[] = [];
    const httpClient: HttpClient = {
      send(request: HttpRequest): Promise<HttpResponse> {
        const token = new URL(request.url).searchParams.get('page_token');
        seenTokens.push(token);
        return Promise.resolve(jsonResponse(pages.get(token)));
      },
    };

    await main({host: 'https://test.cloud.databricks.com', httpClient});

    expect(seenTokens).toEqual([null, 'tok-2', 'tok-3']);
  });
});
