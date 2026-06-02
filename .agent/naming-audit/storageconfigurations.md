# Naming Audit: storageconfigurations

**Path:** `packages/storageconfigurations/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level Databricks storage configurations
(create/get/list/delete a root S3 bucket and optional IAM role used by
workspaces in an account).
**Total weird names flagged:** 4

## Summary

| Severity | Count |
| -------- | ----- |
| High     | 4     |

## High severity

### 1. `Client.createStorageConfigurationPublic` — `src/v1/client.ts:67`
- **Why weird:** A method on the `Client` class whose name ends in
  `Public`. Reads as "the method on the public class that calls the
  public endpoint" — the suffix only exists because the underlying
  proto/spec uses `Public` to distinguish account-API routes.
- **Category:** Proto-architectural leak — `Public` suffix on
  client method.
- **Suggested:** `createStorageConfiguration`.
- **Rationale:** Methods on `Client` are inherently public; the suffix
  is meaningless to a TS caller.
- **Status:** Still present after regeneration on 2026-06-01.

### 2. `Client.deleteStorageConfigurationPublic` — `src/v1/client.ts:96`
- **Why weird:** Same `Public` suffix on `Client` method as #1.
- **Category:** Proto-architectural leak — `Public` suffix on
  client method.
- **Suggested:** `deleteStorageConfiguration`.
- **Rationale:** Same as #1.
- **Status:** Still present after regeneration on 2026-06-01.

### 3. `Client.getStorageConfigurationPublic` — `src/v1/client.ts:121`
- **Why weird:** Same `Public` suffix on `Client` method as #1.
- **Category:** Proto-architectural leak — `Public` suffix on
  client method.
- **Suggested:** `getStorageConfiguration`.
- **Rationale:** Same as #1.
- **Status:** Still present after regeneration on 2026-06-01.

### 4. `Client.listStorageConfigurationPublic` — `src/v1/client.ts:146`
- **Why weird:** Same `Public` suffix on `Client` method as #1.
- **Category:** Proto-architectural leak — `Public` suffix on
  client method.
- **Suggested:** `listStorageConfigurations` (drop `Public`; pluralise
  while renaming).
- **Rationale:** Same as #1.
- **Status:** Still present after regeneration on 2026-06-01.
