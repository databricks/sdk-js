# Naming Audit: connections

**Path:** `packages/connections/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 5

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 4 |

## High severity

### 1. `ConnectionInfo` — `src/v1/model.ts:89`
- **Why weird:** `Info` is the central domain entity — every type holds info about something. The Go SDK uses `XxxInfo` widely as a Go-style noun, but in TS the type would simply be `Connection`. `typescript.mdc` lists `Info` as a vague suffix.
- **Category:** 1 (vague suffix), 8 (redundant type suffix).
- **Suggested name:** `Connection`.
- **Rationale:** The domain noun is "connection". Stripping `Info` improves every reference (`connection.connectionType` → `Connection.connectionType`).

## Medium severity

### 2. `ConnectionInfo.securableType: SecurableType` — `src/v1/model.ts:118`
- **Why weird:** The value is *always* `SecurableType.CONNECTION` since this is a Connection, so the field is essentially constant.
- **Category:** 16 (field type contradicts domain — a connection's securable_type can only be CONNECTION).
- **Suggested name:** Drop the field (it's always `CONNECTION`), or document why a non-`CONNECTION` value would ever appear.
- **Rationale:** Constant fields on response shapes are usually generator leaks. Worth pushing back upstream.

### 3. `SecurableType.STAGING_TABLE` and TODO comment — `src/v1/model.ts:74-75`
- **Why weird:** Enum value pinned by inline TODO: "Staging tables aren't full-fleged securables yet." Internal SDK TODOs in user-facing enum values.
- **Category:** 6 (misleading — value advertised but not actually a securable yet).
- **Suggested name:** Hide until promotion or mark `@experimental`.
- **Rationale:** Public SDK enums shouldn't carry "not really a thing yet" entries.

### 4. `ConnectionInfo_OptionsEntry` / `ConnectionInfo_PropertiesEntry` / `CreateConnectionRequest_OptionsEntry` / `UpdateConnectionRequest_PropertiesEntry` — `src/v1/model.ts:127,133,176,182,271,277`
- **Why weird:** Proto-architectural-leak naming. Proto-style nested entry types with underscore-joined identifiers leak into the public TS surface. Each `Options` and `Properties` map gets a corresponding `*_OptionsEntry`/`*_PropertiesEntry` interface — six total — that is exported but trivial (`{key?, value?}`). The wire shape is already covered by `Record<string, string>`.
- **Category:** Proto-architectural leak (`_OptionsEntry` / `_PropertiesEntry` proto map-entry message names), 12 (duplicate concept), 5 (cryptic — underscore-joined identifiers).
- **Suggested name:** Remove the `*Entry` interfaces from the public API; rely on `Record<string, string>`.
- **Rationale:** These entry types add visual noise and are not used by the surface (the field is `Record<string, string>`).

### 5. `ProvisioningInfo_State` — `src/v1/model.ts:79`
- **Why weird:** Proto-architectural-leak naming. Underscore-joined identifier (`ProvisioningInfo_State`) is a proto nested-enum name (`ProvisioningInfo.State`) emitted verbatim into TS. The enum is suppressed via `eslint-disable @typescript-eslint/naming-convention`, confirming it breaks TS conventions. Standalone TS would name this `ProvisioningState` (or merge into `ProvisioningInfo`).
- **Category:** Proto-architectural leak (`_State` underscore-joined nested enum name).
- **Suggested name:** `ProvisioningState`.
- **Rationale:** Proto nesting has no analogue in TS modules; the underscore is a wire-name artefact. Same generator pattern produces `*_Response`, `*_OptionsEntry`, `*_PropertiesEntry`.
