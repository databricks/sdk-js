# Naming Audit: disasterrecovery

**Path:** `packages/disasterrecovery/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level Disaster Recovery — manage `FailoverGroup` resources (regions, workspace sets, UC replication config) and `StableUrl` resources (failover-aware endpoints for workspaces), including a `failover` action to swing the primary region.
**Total weird names flagged:** 9

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 3 |
| Low | 1 |
| Observation | 2 |

## High severity

### 1. `FailoverFailoverGroupRequest` — `src/v1/model.ts:91`
- **Why weird:** Stutter: the word `Failover` appears twice in a single type name. Mechanically this is `<Verb><Resource>Request` (`Failover` verb + `FailoverGroup` noun + `Request`), but the result reads as a typo.
- **Category:** 7 (overly verbose), 17 (inconsistency in action-verb naming — every other action type spells out the verb only once since the resource has only one `failover` action).
- **Suggested name:** `FailoverRequest` (the resource is unambiguous in this package) or `TriggerFailoverRequest` (more explicit verb).
- **Rationale:** No other request in the package re-states the resource word inside its verb. The wire path is `…/failover`, so a single `Failover` in the type name is sufficient.

### 2. `StableUrl` (and all references: `CreateStableUrlRequest`, `stableUrl`, `stableUrlId`, `stableUrlNames`, `ListStableUrlsResponse`, etc.) — `src/v1/model.ts:53,57,64,82,87,162,167,198,211,213,247,326`
- **Why weird:** Acronym casing for `URL` is inconsistent with the wider JS/TS ecosystem, which treats `URL` as ALLCAPS (Web `URL` global, `URLSearchParams`, `urlencoded`). This package uses `Url` (PascalCase capital-then-lower) for one of the two top-level resources. `client.ts` mirrors the inconsistency: `createStableUrl`, `getStableUrl`, `deleteStableUrl`, `listStableUrls`.
- **Category:** 3 (acronym casing inconsistency).
- **Suggested name:** `StableURL` / `CreateStableURLRequest` / `stableURLId` (matches Web `URL` global) **or** keep `Stable` + `Url` consistently across both type and wire (current) but explicitly document the choice.
- **Rationale:** The mixed casing is jarring against the surrounding Web platform conventions (e.g., `URLSearchParams`). This is a package-wide rename; the cheaper compromise is to keep `Url` but document the convention.

### 3. `effectivePrimaryRegion` vs `initialPrimaryRegion` vs `targetPrimaryRegion` field triplet — `src/v1/model.ts:125,149,101`
- **Why weird:** Three subtly-different "primary region" fields whose semantics depend entirely on a JSDoc paragraph:
  - `effectivePrimaryRegion` — current truth; mutated by failover.
  - `initialPrimaryRegion` — create-only input; never returned.
  - `targetPrimaryRegion` — request-only on `failover` action.
  A reader scanning the type sees three identical-looking string fields. Two of them (`initial`, `target`) are write-only — that critical fact is hidden in JSDoc.
- **Category:** 1 (vague — adjectives `effective`/`initial`/`target` carry the entire weight), 15 (generic field name across three different lifecycles), 6 (misleading — type signature gives no hint that `initialPrimaryRegion` is response-stripped).
- **Suggested name:** Consider splitting: keep `primaryRegion` (effective) on `FailoverGroup`; lift `initialPrimaryRegion` into `CreateFailoverGroupRequest` as a sibling of `failoverGroup`; keep `targetPrimaryRegion` on `FailoverFailoverGroupRequest`. If the generator cannot split (since this mirrors a proto with output_only annotations), at minimum mark `initialPrimaryRegion` `@deprecated`-style write-only in JSDoc with a `WRITE-ONLY` tag.
- **Rationale:** The current shape forces the user to read three different paragraphs to learn that the same-typed fields obey three different rules. This is the most user-hostile naming pattern in the file.

## Medium severity

### 4. `UcCatalog` (and field `catalogs: UcCatalog[]`) — `src/v1/model.ts:278`
- **Why weird:** Field name on `UcReplicationConfig` is `catalogs`, a plain plural — the leading `Uc` prefix is redundant inside a type that already lives in `UcReplicationConfig`. Adjacent identifiers (e.g., `unityCatalogAssets` at line 131) spell the domain out as `unityCatalog`, so the `Uc` abbreviation is also locally inconsistent.
- **Category:** 5 (cryptic abbreviation `Uc`), 8 (redundant `Uc` prefix inside Uc context), 17 (inconsistency — `unityCatalog` vs `Uc`).
- **Suggested name:** `Catalog` (or `ReplicatedCatalog`), and field type `catalogs: Catalog[]`.
- **Rationale:** `UcReplicationConfig.catalogs: UcCatalog[]` reads as "UC replication config's UC catalogs" — redundant. The full `unityCatalog` spelling is used adjacent in the file; either propagate that or drop the prefix entirely inside the UC-scoped type.

### 5. `UcReplicationConfig` — `src/v1/model.ts:284`
- **Why weird:** `Uc` is a two-letter abbreviation in a type name. Comments in the same file (line 113) spell it out as "UCDR" with `Unity Catalog` in `unityCatalogAssets` (line 131). Single SDK uses both `unityCatalog` (full) and `Uc` (abbreviated) for the same concept across adjacent fields/types.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistency — `unityCatalogAssets: UcReplicationConfig`).
- **Suggested name:** `UnityCatalogReplicationConfig` (or `UnityCatalogConfig`). Field stays `unityCatalogAssets` -> `unityCatalogConfig` (see #4).
- **Rationale:** Within a five-line span the same domain is spelled `unityCatalog` and `Uc`. Pick one. The full spelling is unambiguous and the field name already votes for it.

### 6. `Client` class name — `src/v1/client.ts:52`
- **Why weird:** Plain `Client` is the maximally-generic name. Once imported, callers see `import { Client } from '@databricks/sdk-disasterrecovery/v1'` — fine if used qualified, but `new Client()` floating in user code is meaningless. Sibling packages all do the same per generator convention; flagging this once at the package level.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `DisasterRecoveryClient`. (Or rely on import aliases.)
- **Rationale:** Most SDK conventions name the client after the service. The bare `Client` is a generator default and inherits whatever the import alias is.

## Low severity

### 7. `failoverFailoverGroup` method name on `Client` — `src/v1/client.ts:204`
- **Why weird:** Stutter (same as #1). Methods elsewhere are `createFailoverGroup`, `getFailoverGroup`, `listFailoverGroups`, `updateFailoverGroup`, `deleteFailoverGroup` — all use `<verb><Resource>`. This one collides because `failover` is both the verb and (lower-cased) part of the resource.
- **Category:** 7 (overly verbose), 17 (inconsistency — verb visually merges with resource).
- **Suggested name:** `triggerFailover` (verb `trigger`, since `failover` is the object) or just `failover` (single-word, since the package is already "disasterrecovery").
- **Rationale:** `client.failoverFailoverGroup({...})` reads like a typo. `client.failover({...})` or `client.triggerFailover({...})` are unambiguous.

## Observations

### 8. Action-verb consistency on `Client` (mostly good)
Methods are `create*`/`get*`/`list*`/`update*`/`delete*` plus one bespoke action (`failoverFailoverGroup`). Aside from the stutter (#7), this is consistent. Listed as observation per rule 17 since the audit asks to flag inconsistencies — here only the one method breaks the pattern.

### 9. Acronym casing inconsistency: `URL` vs `Uri` vs `Url`
Within this package:
- `stableUrl`/`StableUrl` (PascalCase capital-then-lower).
- `uriByRegion`/`LocationMappingEntry.uri` (`Uri` capital-then-lower).
Two different casings for two related acronyms (URL/URI), and both differ from the Web platform's ALLCAPS `URL`/`URLSearchParams`. The TS code uses `Url`/`Uri` to follow Go-style camelCase. Pick one. (Listed at observation since this is a package-wide policy question, not a single-line fix.)
- **Category:** 3 (acronym casing).

## Domain glossary
- **DR** — Disaster Recovery. Encoded in the package name `disasterrecovery`. Mentioned once in a JSDoc on `replicateWorkspaceAssets` ("control plane DR").
- **UCDR** — Unity Catalog Disaster Recovery (UC data plane replication). Mentioned in JSDoc at `model.ts:113`. Not present as an identifier.
- **CPDR** — Control Plane Disaster Recovery (notebooks, jobs, clusters, etc.). Mentioned in JSDoc at `model.ts:113,308`. Not present as an identifier — encoded only via `replicateWorkspaceAssets: boolean`.
- **UC** — Unity Catalog. Appears as the `Uc` prefix on `UcCatalog`, `UcReplicationConfig`, and as `unityCatalog…` in field names (inconsistency, see #4).
- **EA** — Early Access / Early Adoption? Mentioned in JSDoc on `WorkspaceSet.workspaceIds` (line 305) as "EA: exactly 2 workspaces (one per region)". Not decoded anywhere in the package.
- **RPO** — Recovery Point Objective. Not explicitly named; `replicationPoint` (line 144) is effectively the RPO marker.
- **RTO** — Recovery Time Objective. Not present in this package.
- **spog** — Single Pane of Glass (Databricks-internal term for the account-level UI host). Referenced once in a comment on `StableUrl.url` (line 256) as `<spog_host>`. No identifier carries the term.
- **etag** — Entity Tag (RFC 9110). Used for optimistic concurrency. Lowercase per wire.
- **FQ** (used in this audit) — Fully-qualified resource name (e.g., `accounts/{account_id}/failover-groups/{failover_group_id}`).
- **wkt** — Well-Known Types (import path `@databricks/sdk-core/wkt`).
- **m2m** / **u2m** / **pat** / **oidc** / **iam** — not encountered in this package.

## File coverage
- `src/v1/model.ts` (620 lines): read fully.
- `src/v1/client.ts` (418 lines): read fully.
- `src/v1/index.ts` (30 lines): read fully.
