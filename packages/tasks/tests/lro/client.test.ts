import {describe, expect, it} from 'vitest';

import type {Operation} from '../../src/index';
import {CreateBranchOperation} from '../../src/index';

describe('CreateBranchOperation', () => {
  describe('name', () => {
    it('should return the operation name', async () => {
      const op: Operation = {
        done: false,
        name: 'operations/create-branch-abc123',
      };
      const branchOp = new CreateBranchOperation(op);

      const name = await branchOp.name();

      expect(name).toBe('operations/create-branch-abc123');
    });
  });

  describe('metadata', () => {
    it('should return parsed metadata when present', async () => {
      const op: Operation = {
        done: true,
        name: 'operations/create-branch-abc123',
        metadata: {},
      };
      const branchOp = new CreateBranchOperation(op);

      const metadata = await branchOp.metadata();

      expect(metadata).toStrictEqual({});
    });

    it('should return undefined when metadata is not present', async () => {
      const op: Operation = {
        done: false,
        name: 'operations/create-branch-abc123',
      };
      const branchOp = new CreateBranchOperation(op);

      const metadata = await branchOp.metadata();

      expect(metadata).toBeUndefined();
    });
  });
});
