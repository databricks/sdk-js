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

// Returns a mock HttpClient that always returns the same response.
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

// Returns a mock HttpClient that returns successive responses from the
// provided array. Once exhausted, repeats the last response.
function mockHttpClientSequence(responses: unknown[]): {
  httpClient: HttpClient;
  callCount: () => number;
} {
  let calls = 0;
  const httpClient: HttpClient = {
    send(_request: HttpRequest): Promise<HttpResponse> {
      const idx = Math.min(calls, responses.length - 1);
      const responseBody = responses[idx];
      calls++;
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
  return {httpClient, callCount: () => calls};
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

  describe('wait', () => {
    it('should return a parsed Branch when the operation completes', async () => {
      const wireResponse = {
        done: true,
        name: 'operations/create-branch-abc123',
        response: {name: 'branches/my-branch', uid: 'uid-123'},
      };
      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      const initialOp: Operation = {
        done: false,
        name: 'operations/create-branch-abc123',
      };
      const branchOp = new CreateBranchOperation(client, initialOp);

      const branch = await branchOp.wait(undefined);

      expect(branch.name).toBe('branches/my-branch');
      expect(branch.uid).toBe('uid-123');
    });

    it('should poll until the operation is done', async () => {
      const notDone = {
        done: false,
        name: 'operations/create-branch-abc123',
      };
      const done = {
        done: true,
        name: 'operations/create-branch-abc123',
        response: {name: 'branches/my-branch', uid: 'uid-456'},
      };
      const seq = mockHttpClientSequence([notDone, done]);
      const client = buildClient(seq);

      const initialOp: Operation = {
        done: false,
        name: 'operations/create-branch-abc123',
      };
      const branchOp = new CreateBranchOperation(client, initialOp);

      const branch = await branchOp.wait(undefined);

      expect(branch.name).toBe('branches/my-branch');
      expect(branch.uid).toBe('uid-456');
      expect(seq.callCount()).toBe(2);
    });

    it('should throw when the operation fails with an error code and message', async () => {
      const wireResponse = {
        done: true,
        name: 'operations/create-branch-abc123',
        error: {error_code: 'NOT_FOUND', message: 'branch not found'},
      };
      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      const initialOp: Operation = {
        done: false,
        name: 'operations/create-branch-abc123',
      };
      const branchOp = new CreateBranchOperation(client, initialOp);

      await expect(branchOp.wait(undefined)).rejects.toThrow(
        'operation failed: [NOT_FOUND] branch not found'
      );
    });

    it('should throw with only the message when error code is absent', async () => {
      const wireResponse = {
        done: true,
        name: 'operations/create-branch-abc123',
        error: {message: 'something went wrong'},
      };
      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      const initialOp: Operation = {
        done: false,
        name: 'operations/create-branch-abc123',
      };
      const branchOp = new CreateBranchOperation(client, initialOp);

      await expect(branchOp.wait(undefined)).rejects.toThrow(
        'operation failed: something went wrong'
      );
    });

    const emptyMessageCases: {desc: string; error: Record<string, string>}[] =
      [
        {desc: 'no message field', error: {}},
        {desc: 'empty message string', error: {message: ''}},
      ];

    it.each(emptyMessageCases)(
      'should throw with unknown error when $desc',
      async ({error}) => {
        const wireResponse = {
          done: true,
          name: 'operations/create-branch-abc123',
          error,
        };
        const mock = mockHttpClient(wireResponse);
        const client = buildClient(mock);

        const initialOp: Operation = {
          done: false,
          name: 'operations/create-branch-abc123',
        };
        const branchOp = new CreateBranchOperation(client, initialOp);

        await expect(branchOp.wait(undefined)).rejects.toThrow(
          'operation failed: unknown error'
        );
      }
    );

    it('should throw when operation completes without a response', async () => {
      const wireResponse = {
        done: true,
        name: 'operations/create-branch-abc123',
      };
      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      const initialOp: Operation = {
        done: false,
        name: 'operations/create-branch-abc123',
      };
      const branchOp = new CreateBranchOperation(client, initialOp);

      await expect(branchOp.wait(undefined)).rejects.toThrow(
        'operation completed but no response available'
      );
    });
  });
});
