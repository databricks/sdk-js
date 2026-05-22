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

### 2. `Client.deleteStorageConfigurationPublic` — `src/v1/client.ts:99`
- **Why weird:** Same `Public` suffix on `Client` method as #1.
- **Category:** Proto-architectural leak — `Public` suffix on
  client method.
- **Suggested:** `deleteStorageConfiguration`.
- **Rationale:** Same as #1.

### 3. `Client.getStorageConfigurationPublic` — `src/v1/client.ts:124`
- **Why weird:** Same `Public` suffix on `Client` method as #1.
- **Category:** Proto-architectural leak — `Public` suffix on
  client method.
- **Suggested:** `getStorageConfiguration`.
- **Rationale:** Same as #1.

### 4. `Client.listStorageConfigurationPublic` — `src/v1/client.ts:149`
- **Why weird:** Same `Public` suffix on `Client` method as #1.
- **Category:** Proto-architectural leak — `Public` suffix on
  client method.
- **Suggested:** `listStorageConfigurations` (drop `Public`; pluralise
  while renaming).
- **Rationale:** Same as #1.

## Medium severity

_None._

## Low severity

_None._

## Observation

_None._

## Fixed

- **`CreateStorageConfigurationPublicRequest` interface** — renamed to
  `CreateStorageConfigurationRequest` (`src/v1/model.ts:5`). Fixed in
  regeneration on 2026-05-22.
- **`DeleteStorageConfigurationPublicRequest` interface** — renamed to
  `DeleteStorageConfigurationRequest` (`src/v1/model.ts:20`). Fixed in
  regeneration on 2026-05-22.
- **`GetStorageConfigurationPublicRequest` interface** — renamed to
  `GetStorageConfigurationRequest` (`src/v1/model.ts:25`). Fixed in
  regeneration on 2026-05-22.
- **`ListStorageConfigurationPublicRequest` interface** — renamed to
  `ListStorageConfigurationRequest` (`src/v1/model.ts:30`). Fixed in
  regeneration on 2026-05-22.
- **`ListStorageConfigurationPublicResponse` interface** — renamed to
  `ListStorageConfigurationResponse` (`src/v1/model.ts:34`). Fixed in
  regeneration on 2026-05-22.
- **`marshalCreateStorageConfigurationPublicRequestSchema`** — renamed
  to `marshalCreateStorageConfigurationRequestSchema`
  (`src/v1/model.ts:90`). Fixed in regeneration on 2026-05-22.
- **`CreateStorageConfigurationPublicRequest` import** — import in
  `client.ts` now references `CreateStorageConfigurationRequest`
  (`src/v1/client.ts:22`). Fixed in regeneration on 2026-05-22.
- **`DeleteStorageConfigurationPublicRequest` import** — import in
  `client.ts` now references `DeleteStorageConfigurationRequest`
  (`src/v1/client.ts:23`). Fixed in regeneration on 2026-05-22.
- **`GetStorageConfigurationPublicRequest` import** — import in
  `client.ts` now references `GetStorageConfigurationRequest`
  (`src/v1/client.ts:24`). Fixed in regeneration on 2026-05-22.
- **`marshalCreateStorageConfigurationPublicRequestSchema` import** —
  import in `client.ts` now references
  `marshalCreateStorageConfigurationRequestSchema`
  (`src/v1/client.ts:30`). Fixed in regeneration on 2026-05-22.

## File coverage

| File                  | Lines | Audited                                          |
| --------------------- | ----- | ------------------------------------------------ |
| `src/v1/model.ts`     | 111   | All 7 interfaces + 3 schema constants + every field. |
| `src/v1/client.ts`    | 178   | `Client` class, constructor, 4 methods, import list. |
| `src/v1/utils.ts`     | 151   | All exported / private functions. No proto-leak hits. |
| `src/v1/transport.ts` | 75    | `newHttpClient` factory + auth wrapper. No proto-leak hits. |
| `src/v1/index.ts`     | 16    | All re-exports — names mirror `model.ts` (covered above). |

Type & symbol checklist:

- [x] `CreateStorageConfigurationRequest` interface — clean post-regen
  (was flagged; now fixed).
- [x] `DeleteStorageConfigurationRequest` interface — clean post-regen
  (was flagged; now fixed).
- [x] `GetStorageConfigurationRequest` interface — clean post-regen
  (was flagged; now fixed).
- [x] `ListStorageConfigurationRequest` interface — clean post-regen
  (was flagged; now fixed).
- [x] `ListStorageConfigurationResponse` interface — clean post-regen
  (was flagged; now fixed).
- [x] `RootBucketInfo` interface — clean (domain-appropriate `Info`
  suffix; out of scope for proto-architectural-leak audit).
- [x] `StorageConfiguration` interface — clean.
- [x] `unmarshalRootBucketInfoSchema`, `unmarshalStorageConfigurationSchema`,
  `marshalRootBucketInfoSchema`, `marshalCreateStorageConfigurationRequestSchema`
  — clean (no `Public` infix on any schema).
- [x] `Client` class itself — clean (terminal-position `Client` is the
  standard SDK convention).
- [x] `Client.createStorageConfigurationPublic` — flagged (#1).
- [x] `Client.deleteStorageConfigurationPublic` — flagged (#2).
- [x] `Client.getStorageConfigurationPublic` — flagged (#3).
- [x] `Client.listStorageConfigurationPublic` — flagged (#4).
- [x] `client.ts` import list — clean post-regen (no `Public` infix on
  any imported name).
- [x] `utils.ts` (`executeCall`, `executeHttpCall`, `buildHttpRequest`,
  `parseResponse`, `marshalRequest`, `flattenQueryParams`, `readAll`,
  `HttpCallOptions`) — no proto-architectural-leak names. (The
  `executeCall` / `executeHttpCall` verb overlap and the generic
  `body` shadowing are common across packages and out of scope here.)
- [x] `transport.ts` (`newHttpClient`, auth-wrapping class) — no
  `Public`/`Internal`/`Proto`/`Service`/`Manager` leak in domain
  identifiers. (The auth wrapper class itself is a cross-package
  pattern, not flagged here.)
- [x] `index.ts` re-exports — names mirror `model.ts` and are clean
  post-regen.
