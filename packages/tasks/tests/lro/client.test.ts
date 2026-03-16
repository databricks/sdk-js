import {describe, expect, it} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-databricks/transport';

import type {Operation} from '../../src/index';
import {CreateBranchOperation, newPostgresClient} from '../../src/index';
import type {PostgresClient} from '../../src/index';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mockHttpClient(responseBody: unknown): {
  httpClient: HttpClient;
  lastRequest: () => HttpRequest | undefined;
} {
  let captured: HttpRequest | undefined;
  const httpClient: HttpClient = {
    send(request: HttpRequest): Promise<HttpResponse> {
      captured = request;
      const body = new TextEncoder().encode(JSON.stringify(responseBody));
      const stream = new ReadableStream<Uint8Array>({
        start(controller): void {
          controller.enqueue(body);
          controller.close();
        },
      });
      return Promise.resolve({
        statusCode: 200,
        headers: new Headers({'Content-Type': 'application/json'}),
        body: stream,
      });
    },
  };
  return {httpClient, lastRequest: () => captured};
}

function buildClient(mock: {httpClient: HttpClient}): PostgresClient {
  return newPostgresClient({
    host: 'https://test.databricks.com',
    httpClient: mock.httpClient,
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('CreateBranchOperation', () => {
  describe('name', () => {
    it('should return the operation name', async () => {
      const mock = mockHttpClient({});
      const client = buildClient(mock);
      const op: Operation = {
        done: false,
        name: 'operations/create-branch-abc123',
      };
      const branchOp = new CreateBranchOperation(client, op);

      const name = await branchOp.name();

      expect(name).toBe('operations/create-branch-abc123');
    });
  });

  describe('metadata', () => {
    it('should return parsed metadata when present', async () => {
      const mock = mockHttpClient({});
      const client = buildClient(mock);
      const op: Operation = {
        done: true,
        name: 'operations/create-branch-abc123',
        metadata: {},
      };
      const branchOp = new CreateBranchOperation(client, op);

      const metadata = await branchOp.metadata();

      expect(metadata).toStrictEqual({});
    });

    it('should return undefined when metadata is not present', async () => {
      const mock = mockHttpClient({});
      const client = buildClient(mock);
      const op: Operation = {
        done: false,
        name: 'operations/create-branch-abc123',
      };
      const branchOp = new CreateBranchOperation(client, op);

      const metadata = await branchOp.metadata();

      expect(metadata).toBeUndefined();
    });
  });

  describe('done', () => {
    it('should update internal state after polling', async () => {
      const polledOperation = {
        done: true,
        name: 'operations/create-branch-abc123',
        metadata: {},
      };
      const mock = mockHttpClient(polledOperation);
      const client = buildClient(mock);

      const initialOp: Operation = {
        done: false,
        name: 'operations/create-branch-abc123',
      };
      const branchOp = new CreateBranchOperation(client, initialOp);

      // Before polling: not done, no metadata.
      expect(await branchOp.metadata()).toBeUndefined();

      const isDone = await branchOp.done(undefined);

      expect(isDone).toBe(true);
      // After polling: metadata reflects the updated operation.
      expect(await branchOp.metadata()).toStrictEqual({});
    });
  });
});
