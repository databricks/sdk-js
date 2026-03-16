import {describe, expect, it} from 'vitest';
import {newPostgresClient, type CreateBranchRequest} from '../src/index';

describe('sdk-tasks', () => {
  it('should expose the postgres client factory', () => {
    const req: CreateBranchRequest = {parent: 'projects/my-project'};
    expect(req.parent).toBe('projects/my-project');
    // newPostgresClient requires host — verify it throws without one.
    expect(() => newPostgresClient({})).toThrow();
  });
});
