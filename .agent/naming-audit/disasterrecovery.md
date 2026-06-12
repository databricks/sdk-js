# Naming Audit: disasterrecovery

**Path:** `packages/disasterrecovery/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 5

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |
| Medium | 2 |
| Low | 1 |

## High severity

### 1. `FailoverFailoverGroupRequest` — `src/v1/model.ts:99`
- **Why weird:** Stutter: the word `Failover` appears twice in a single type name. Mechanically this is `<Verb><Resource>Request` (`Failover` verb + `FailoverGroup` noun + `Request`), but the result reads as a typo.
- **Category:** 7 (overly verbose), 17 (inconsistency in action-verb naming — every other action type spells out the verb only once since the resource has only one `failover` action).
- **Suggested name:** `FailoverRequest` (the resource is unambiguous in this package) or `TriggerFailoverRequest` (more explicit verb).
- **Rationale:** No other request in the package re-states the resource word inside its verb. The wire path is `…/failover`, so a single `Failover` in the type name is sufficient.

### 2. Write-only "primary region" fields are not distinguished in the type shape — `src/v1/model.ts:133,157,109`
- **Why weird:** Two of the three "primary region" fields are write-only, but the type signature gives no hint:
  - `effectivePrimaryRegion` — current truth; mutated by failover.
  - `initialPrimaryRegion` — create-only input; never returned.
  - `targetPrimaryRegion` — request-only on `failover` action.
  A reader scanning the type sees three identical-looking, always-present string fields. The fact that `initial` and `target` are write-only (response-stripped) is hidden in JSDoc rather than expressed in the type.
- **Category:** type-shape (optionality / write-only semantics not reflected in the field's declared shape).
- **Suggested fix:** Reflect the write-only semantics in the type shape — split the write-only inputs onto the request types where they actually apply (`initialPrimaryRegion` on `CreateFailoverGroupRequest`, `targetPrimaryRegion` on the failover request) rather than declaring all three on the resource. This is a shape change, not a rename; the field names stay the same.
- **Rationale:** The current shape forces the user to read JSDoc to learn that same-typed, always-present fields obey three different read/write rules. A shape that separates write-only inputs from the returned resource makes the contract self-evident.

## Medium severity

### 3. `UcCatalog` (and field `catalogs: UcCatalog[]`) — `src/v1/model.ts:295`
- **Why weird:** Field name on `UcReplicationConfig` is `catalogs`, a plain plural — the leading `Uc` prefix is redundant inside a type that already lives in `UcReplicationConfig`. Adjacent identifiers (e.g., `unityCatalogAssets` at line 139) spell the domain out as `unityCatalog`, so the `Uc` abbreviation is also locally inconsistent.
- **Category:** 5 (cryptic abbreviation `Uc`), 8 (redundant `Uc` prefix inside Uc context), 17 (inconsistency — `unityCatalog` vs `Uc`).
- **Suggested name:** `Catalog` (or `ReplicatedCatalog`), and field type `catalogs: Catalog[]`.
- **Rationale:** `UcReplicationConfig.catalogs: UcCatalog[]` reads as "UC replication config's UC catalogs" — redundant. The full `unityCatalog` spelling is used adjacent in the file; either propagate that or drop the prefix entirely inside the UC-scoped type.

### 4. `UcReplicationConfig` — `src/v1/model.ts:301`
- **Why weird:** `Uc` is a two-letter abbreviation in a type name. The same file spells the domain out: the `FailoverGroup` JSDoc (line 121) says "Unity Catalog" and the field `unityCatalogAssets` (line 139) uses the full spelling. Single SDK uses both `unityCatalog` (full) and `Uc` (abbreviated) for the same concept across adjacent fields/types.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistency — `unityCatalogAssets: UcReplicationConfig`).
- **Suggested name:** `UnityCatalogReplicationConfig` (or `UnityCatalogConfig`).
- **Rationale:** Within a five-line span the same domain is spelled `unityCatalog` and `Uc`. Pick one. The full spelling is unambiguous and the field name already votes for it.

## Low severity

### 5. `failoverFailoverGroup` method name on `DisasterRecoveryClient` — `src/v1/client.ts:221`
- **Why weird:** Stutter (same as #1). Methods elsewhere are `createFailoverGroup`, `getFailoverGroup`, `listFailoverGroups`, `updateFailoverGroup`, `deleteFailoverGroup` — all use `<verb><Resource>`. This one collides because `failover` is both the verb and (lower-cased) part of the resource.
- **Category:** 7 (overly verbose), 17 (inconsistency — verb visually merges with resource).
- **Suggested name:** `triggerFailover` (verb `trigger`, since `failover` is the object) or just `failover` (single-word, since the package is already "disasterrecovery").
- **Rationale:** `client.failoverFailoverGroup({...})` reads like a typo. `client.failover({...})` or `client.triggerFailover({...})` are unambiguous.
