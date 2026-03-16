import {z} from 'zod';

// ---------------------------------------------------------------------------
// Interfaces.
// ---------------------------------------------------------------------------

export interface Operation {
  done: boolean;
  error?: OperationError | undefined;
  metadata?: unknown;
  name: string;
  response?: unknown;
}

export interface OperationError {
  errorCode?: string | undefined;
  message?: string | undefined;
}

export interface Branch {
  name?: string | undefined;
  uid?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BranchOperationMetadata {}

export interface CreateBranchRequest {
  parent: string;
}

export interface GetOperationRequest {
  name: string;
}

export interface CancelOperationRequest {
  name: string;
}

// ---------------------------------------------------------------------------
// Zod schemas for the wire format (snake_case JSON from the API).
//
// Each schema validates the snake_case wire format and transforms it into
// the camelCase TypeScript interface.
// ---------------------------------------------------------------------------

export const operationErrorSchema = z
  .object({
    error_code: z.string().optional(),
    message: z.string().optional(),
  })
  .transform(d => ({
    errorCode: d.error_code,
    message: d.message,
  }));

export const operationSchema = z
  .object({
    done: z
      .boolean()
      .optional()
      .transform(v => v ?? false),
    error: operationErrorSchema.optional(),
    metadata: z.unknown().optional(),
    name: z
      .string()
      .optional()
      .transform(v => v ?? ''),
    response: z.unknown().optional(),
  })
  .transform(d => ({
    done: d.done,
    error: d.error,
    metadata: d.metadata,
    name: d.name,
    response: d.response,
  }));

export const branchSchema = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
  }));

export const branchOperationMetadataSchema = z.object({}).transform(() => ({}));

// ---------------------------------------------------------------------------
// Marshal schemas (camelCase TypeScript -> snake_case wire format).
// ---------------------------------------------------------------------------

export const marshalCreateBranchRequestSchema = z
  .object({
    parent: z.string(),
  })
  .transform(d => ({
    parent: d.parent,
  }));
