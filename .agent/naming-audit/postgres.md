# Naming Audit: postgres

**Path:** `packages/postgres/src/v1/`
**Versions audited:** v1
**Inferred domain:** Lakebase Autoscaling Postgres — manages Lakebase `Project`s, `Branch`es (Postgres-style branching for PITR / dev forks), `Endpoint`s (autoscaling read-write or read-only compute endpoints), `Database`s (logical Postgres databases inside a branch), `Role`s (Postgres roles bound to Databricks identities or plain Postgres roles), `SyncedTable`s (UC-managed Delta→Postgres sync pipelines), `Catalog`s (Unity Catalog mirrors of logical PG databases), short-lived `DatabaseCredential`s, and long-running `Operation`s with per-resource `*Operation` waiter-style classes.
**Total weird names flagged:** 5

## Summary
| Severity | Count |
| --- | --- |
| Medium | 3 |
| Low | 2 |

## Medium severity

### 1. `BranchSpec.expiration` discriminated union — `noExpiry: boolean` accepts an invalid `false` — `src/v1/model.ts:814-840`
- **Why weird:** Discriminated union of `expireTime` / `ttl` / `noExpiry`. The doc on `noExpiry` says "If set to false, the request is invalid; provide either ttl or expire_time instead." So the boolean's `false` value is documented as invalid — the type system permits a value the API rejects.
- **Category:** 16 (type allows `false` but spec rejects it).
- **Suggested name:** Use a union `expiration?: {expireTime: Instant} | {ttl: Duration} | 'never'`, or hoist the three to top-level mutually-exclusive optional fields.
- **Rationale:** Boolean fields whose `false` value is invalid encourage type-level lies.

### 2. `EndpointSpec.suspension` discriminated union — `noSuspension: boolean` accepts an invalid `false` — `src/v1/model.ts:1338-1357`
- **Why weird:** Same pattern as #1 — one variant carries a duration, the other a boolean documented as accepting only `true`. The type permits `false`, the spec rejects it.
- **Category:** 16 (type allows `false` but spec rejects), echo of #1.
- **Suggested name:** Inline: `suspension?: Temporal.Duration | 'never'`.
- **Rationale:** Same as #1.

### 3. `Project.initialEndpointSpec` — write-only field exposed on read shape — `src/v1/model.ts:1660`
- **Why weird:** `Project` carries an `initialEndpointSpec` field that is a create-time-only input but exposed on the response type too — a read-flow consumer sees a field that is typically empty after project creation.
- **Category:** 7 (overly verbose surface), 16 (write-only fields exposed on read shape).
- **Suggested name:** Hoist the `initialEndpointSpec` onto `CreateProjectRequest` only (where it belongs); leave `Project` to spec/status.
- **Rationale:** Input/output shape confusion — create-time-only input on a read shape.

## Low severity

### 4. `GenerateDatabaseCredentialRequest.claims: RequestedClaims[]` — plural of a plural type — `src/v1/model.ts:1399`
- **Why weird:** Same as `database` audit #5 — `RequestedClaims` is already plural; `claims: RequestedClaims[]` is "an array of plural claims objects".
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** Same as `database` audit #5 — singular type `RequestedClaim` + plural field `claims: RequestedClaim[]`.
- **Rationale:** Same as `database` audit #5.

### 5. `Operation.done: boolean | undefined` — tri-state boolean — `src/v1/model.ts:1617`
- **Why weird:** Boolean that can be `undefined` is a tri-state value. JSDoc says "If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed…" — but doesn't say what `undefined` means. The `*Operation.wait()` methods check `op.done === undefined && throw` (e.g. `client.ts:1764`).
- **Category:** 16 (type allows three values but spec only documents two).
- **Suggested name:** Make non-optional `done: boolean`. If absent on the wire, treat as `false` in unmarshal.
- **Rationale:** Tri-state booleans always confuse callers.
