# Naming Audit: storageconfigurations

**Path:** `packages/storageconfigurations/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level Databricks storage configurations
(create/get/list/delete a root S3 bucket and optional IAM role used by
workspaces in an account).
**Total weird names flagged:** 4

This audit is scoped to proto-architectural-leak naming (mid-position
`Public`/`Internal`/`External`, `Proto` suffix/infix, architectural-layer
words such as `Service`/`Manager`/`Wrapper`, `Impl`, `Rpc`/`Grpc`,
`Foo_PublicRequest`-style paired naming, etc.). Domain words like
`External*`/`Online*` and standard end-position suffixes (`Request`,
`Response`, `Info`) are not flagged here.

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 4     |
| Medium       | 0     |
| Low          | 0     |
| Observation  | 0     |

All 4 remaining findings are the same category: `Public` suffix on
`Client` methods leaking from the upstream proto/service layout into the
TS surface. The request/response interfaces and marshal schema were
renamed in regeneration; the `Client` method names are the last
surviving carriers of the leak.

## High severity

### 1. `Client.createStorageConfigurationPublic` — `src/v1/client.ts:70`
- **Why weird:** A method on the `Client` class whose name ends in
  `Public`. Reads as "the method on the public class that calls the
  public endpoint" — the suffix only exists because the underlying
  proto/spec uses `Public` to distinguish account-API routes.
- **Category:** Proto-architectural leak — `Public` suffix on
  client method.
- **Suggested:** `createStorageConfiguration`.
- **Rationale:** Methods on `Client` are inherently public; the suffix
  is meaningless to a TS caller.
- **Status:** Still present after regeneration on 2026-05-26.

### 2. `Client.deleteStorageConfigurationPublic` — `src/v1/client.ts:99`
- **Why weird:** Same `Public` suffix on `Client` method as #1.
- **Category:** Proto-architectural leak — `Public` suffix on
  client method.
- **Suggested:** `deleteStorageConfiguration`.
- **Rationale:** Same as #1.
- **Status:** Still present after regeneration on 2026-05-26.

### 3. `Client.getStorageConfigurationPublic` — `src/v1/client.ts:124`
- **Why weird:** Same `Public` suffix on `Client` method as #1.
- **Category:** Proto-architectural leak — `Public` suffix on
  client method.
- **Suggested:** `getStorageConfiguration`.
- **Rationale:** Same as #1.
- **Status:** Still present after regeneration on 2026-05-26.

### 4. `Client.listStorageConfigurationPublic` — `src/v1/client.ts:149`
- **Why weird:** Same `Public` suffix on `Client` method as #1.
- **Category:** Proto-architectural leak — `Public` suffix on
  client method.
- **Suggested:** `listStorageConfigurations` (drop `Public`; pluralise
  while renaming).
- **Rationale:** Same as #1.
- **Status:** Still present after regeneration on 2026-05-26.

## Medium severity

_None._

## Low severity

_None._

## Observation

_None._
