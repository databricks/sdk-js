# Naming Audit: disasterrecovery

**Path:** `packages/disasterrecovery/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level Disaster Recovery — manage `FailoverGroup` resources (regions, workspace sets, UC replication config) and `StableUrl` resources (failover-aware endpoints for workspaces), including a `failover` action to swing the primary region.
**Total weird names flagged:** 25

## Summary
| Severity | Count |
| --- | --- |
| High | 7 |
| Medium | 11 |
| Low | 5 |
| Observation | 2 |

## High severity

### 1. `FailoverFailoverGroupRequest` — `src/v1/model.ts:91`
- **Why weird:** Stutter: the word `Failover` appears twice in a single type name. Mechanically this is `<Verb><Resource>Request` (`Failover` verb + `FailoverGroup` noun + `Request`), but the result reads as a typo.
- **Category:** 7 (overly verbose), 17 (inconsistency in action-verb naming — every other action type spells out the verb only once since the resource has only one `failover` action).
- **Suggested name:** `FailoverRequest` (the resource is unambiguous in this package) or `TriggerFailoverRequest` (more explicit verb).
- **Rationale:** No other request in the package re-states the resource word inside its verb. The wire path is `…/failover`, so a single `Failover` in the type name is sufficient.

### 2. `FailoverFailoverGroupRequest_FailoverType.FAILOVER_TYPE_UNSPECIFIED` / `.FORCED` — `src/v1/model.ts:11-12`
- **Why weird:** (a) `FAILOVER_TYPE_UNSPECIFIED` redundantly re-states the enum name; (b) shipping an `UNSPECIFIED` sentinel is a proto-import — idiomatic TS uses `undefined` for "not set"; (c) the actual content is a single real value (`FORCED`), which makes a two-member enum with one sentinel look like a placeholder.
- **Category:** 2 (redundant enum prefix), 18 (long enum value).
- **Suggested name:** Drop `UNSPECIFIED`; keep `Forced` (or `Forced | Graceful` if the API ever grows a graceful mode).
- **Rationale:** `failoverType?: FailoverType | undefined` already encodes "not set". Same rationale as the proto enum guidance applied across the SDK.

### 3. `FailoverGroup_State.STATE_UNSPECIFIED` — `src/v1/model.ts:18`
- **Why weird:** Redundant `STATE_` prefix on every value; `UNSPECIFIED` sentinel as in #2. The remaining values (`CREATING`, `CREATION_FAILED`, `INITIAL_REPLICATION`, `ACTIVE`, `FAILING_OVER`, `DELETING`, `FAILOVER_FAILED`, `DELETION_FAILED`) are reasonable, but the lone `STATE_UNSPECIFIED` is noise.
- **Category:** 2 (redundant enum prefix).
- **Suggested name:** Drop `STATE_UNSPECIFIED`. Keep the rest as-is or rename to PascalCase (`Creating`, `CreationFailed`, …) to match TS-style enum members.
- **Rationale:** Optional `state?: FailoverGroupState` encodes the unset case. PascalCase members align with TS conventions while leaving the SCREAMING_SNAKE_CASE wire values intact via the Zod schema.

### 4. `StableUrl` (and all references: `CreateStableUrlRequest`, `stableUrl`, `stableUrlId`, `stableUrlNames`, `ListStableUrlsResponse`, etc.) — `src/v1/model.ts:53,57,64,82,87,162,167,198,211,213,247,317`
- **Why weird:** Acronym casing for `URL` is inconsistent with the wider JS/TS ecosystem, which treats `URL` as ALLCAPS (Web `URL` global, `URLSearchParams`, `urlencoded`). This package uses `Url` (PascalCase capital-then-lower) for one of the two top-level resources. `client.ts` mirrors the inconsistency: `createStableUrl`, `getStableUrl`, `deleteStableUrl`, `listStableUrls`.
- **Category:** 3 (acronym casing inconsistency).
- **Suggested name:** `StableURL` / `CreateStableURLRequest` / `stableURLId` (matches Web `URL` global) **or** keep `Stable` + `Url` consistently across both type and wire (current) but explicitly document the choice.
- **Rationale:** Within `client.ts` line 8 we import `CallOptions` and the file uses `URLSearchParams` (line 83) right beside `stableUrlId` (line 128), giving us `URLSearchParams` and `stableUrlId` on adjacent lines. The mixed casing is jarring. (Note: this is a package-wide rename; the cheaper compromise is to keep `Url` but document the convention. See observation #25 — same issue applies in `utils.ts` field `url` on `StableUrl`.)

### 5. `effectivePrimaryRegion` vs `initialPrimaryRegion` vs `targetPrimaryRegion` field triplet — `src/v1/model.ts:125,149,101`
- **Why weird:** Three subtly-different "primary region" fields whose semantics depend entirely on a JSDoc paragraph:
  - `effectivePrimaryRegion` — current truth; mutated by failover.
  - `initialPrimaryRegion` — create-only input; never returned.
  - `targetPrimaryRegion` — request-only on `failover` action.
  A reader scanning the type sees three identical-looking string fields. Two of them (`initial`, `target`) are write-only — that critical fact is hidden in JSDoc.
- **Category:** 1 (vague — adjectives `effective`/`initial`/`target` carry the entire weight), 15 (generic field name across three different lifecycles), 6 (misleading — type signature gives no hint that `initialPrimaryRegion` is response-stripped).
- **Suggested name:** Consider splitting: keep `primaryRegion` (effective) on `FailoverGroup`; lift `initialPrimaryRegion` into `CreateFailoverGroupRequest` as a sibling of `failoverGroup`; keep `targetPrimaryRegion` on `FailoverFailoverGroupRequest`. If the generator cannot split (since this mirrors a proto with output_only annotations), at minimum mark `initialPrimaryRegion` `@deprecated`-style write-only in JSDoc with a `WRITE-ONLY` tag.
- **Rationale:** The current shape forces the user to read three different paragraphs to learn that the same-typed fields obey three different rules. This is the most user-hostile naming pattern in the file.

### 6. `replicationPoint: Temporal.Instant` — `src/v1/model.ts:144`
- **Why weird:** `Point` is generic; this is a recovery-point timestamp (the data-loss bound aka RPO marker). The JSDoc says "The latest point in time to which data has been replicated", which is much clearer than the field name. A reader sees `failoverGroup.replicationPoint` and may guess "endpoint of replication" or "destination point".
- **Category:** 1 (vague), 6 (misleading — `Point` suggests a location, not a time).
- **Suggested name:** `replicationLagTime` / `lastReplicatedAt` / `recoveryPointTime` (the last matches Databricks DR docs and the well-known RPO term).
- **Rationale:** Other timestamp fields on the same struct use the `…Time` suffix (`createTime`, `updateTime`). Consistency + clarity in one rename.

### 7. `replicateWorkspaceAssets` field on `WorkspaceSet` — `src/v1/model.ts:311`
- **Why weird:** Field documented as "Whether to enable control plane DR (notebooks, jobs, clusters, etc.) for this set." The field name says `replicateWorkspaceAssets` but the doc says "control plane DR" — those aren't synonyms. A user looking for "enable CPDR" will not find a `cpdr` field; a user looking for "replicate" will not realise this is the control-plane toggle vs the data-plane (UC) replication elsewhere on the parent.
- **Category:** 6 (misleading — field name and doc disagree), 1 (vague — `workspaceAssets` is undefined jargon).
- **Suggested name:** `enableControlPlaneReplication` (matches doc and matches the implied UCDR/CPDR split), or `replicateControlPlane`.
- **Rationale:** The parent `FailoverGroup` has `unityCatalogAssets` (UC data plane) and this boolean (control plane). Naming them as a matched pair — e.g., `unityCatalogReplication` + `controlPlaneReplication` — would make the symmetry visible.

## Medium severity

### 8. `WorkspaceSet.name: string` (resource-name vs human-name ambiguity) — `src/v1/model.ts:301`
- **Why weird:** `name` on `WorkspaceSet` is documented only as "Resource name for this workspace set". `name` on `FailoverGroup` (line 120) is documented as a fully-qualified resource name (`accounts/{account_id}/failover-groups/{failover_group_id}`). `name` on `StableUrl` (line 252) is fully-qualified too. `name` on `LocationMapping` (line 227) is "Resource name for this location". A user can't tell from the field which `name`s are FQ resource names versus simple labels.
- **Category:** 15 (generic field name losing meaning across types), 19 (under-specified identifier).
- **Suggested name:** Where the value is FQ, prefer `resourceName`; where the value is a label, prefer `label` or `displayName`. Failing that, tighten every JSDoc to spell out the wire format like `FailoverGroup.name` does.
- **Rationale:** The package has at least three different meanings for `name`. Searching IDE for `.name` in a `FailoverGroup` chain returns many hits with different semantics.

### 9. `UcCatalog` (and field `catalogs: UcCatalog[]`) — `src/v1/model.ts:269`
- **Why weird:** Field name on `UcReplicationConfig` is `catalogs`, a plain plural — the leading `Uc` prefix is redundant inside a type that already lives in `UcReplicationConfig`. Adjacent identifiers (e.g., `unityCatalogAssets` at line 131) spell the domain out as `unityCatalog`, so the `Uc` abbreviation is also locally inconsistent.
- **Category:** 5 (cryptic abbreviation `Uc`), 8 (redundant `Uc` prefix inside Uc context), 17 (inconsistency — `unityCatalog` vs `Uc`).
- **Suggested name:** `Catalog` (or `ReplicatedCatalog`), and field type `catalogs: Catalog[]`.
- **Rationale:** `UcReplicationConfig.catalogs: UcCatalog[]` reads as "UC replication config's UC catalogs" — redundant. The full `unityCatalog` spelling is used adjacent in the file; either propagate that or drop the prefix entirely inside the UC-scoped type.

### 10. `UcReplicationConfig` — `src/v1/model.ts:275`
- **Why weird:** `Uc` is a two-letter abbreviation in a type name. Comments in the same file (line 113) spell it out as "UCDR" with `Unity Catalog` in `unityCatalogAssets` (line 131). Single SDK uses both `unityCatalog` (full) and `Uc` (abbreviated) for the same concept across adjacent fields/types.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistency — `unityCatalogAssets: UcReplicationConfig`).
- **Suggested name:** `UnityCatalogReplicationConfig` (or `UnityCatalogConfig`). Field stays `unityCatalogAssets` -> `unityCatalogConfig` (see #11).
- **Rationale:** Within a five-line span the same domain is spelled `unityCatalog` and `Uc`. Pick one. The full spelling is unambiguous and the field name already votes for it.

### 11. `unityCatalogAssets: UcReplicationConfig` — `src/v1/model.ts:131`
- **Why weird:** Field named `unityCatalogAssets` but the type is `UcReplicationConfig`. "Assets" doesn't appear in the type name. The type contains location mappings + catalogs + a workspace-set reference — none of which are commonly called "assets". The sibling `replicateWorkspaceAssets` (line 311) uses "assets" with a completely different meaning (control-plane objects vs Unity Catalog config).
- **Category:** 15 (generic word "assets" used in two different meanings within the file), 20 (type-suffix tautology since the field carries replication config of a `UcReplicationConfig`).
- **Suggested name:** `unityCatalogReplication` or `unityCatalogConfig`.
- **Rationale:** Field name should match the type's purpose; "assets" is a misleading umbrella here.

### 12. `WorkspaceSet.stableUrlNames: string[]` (with FQ-name semantics) — `src/v1/model.ts:317`
- **Why weird:** Field is `string[]` of fully-qualified resource names (per JSDoc: `accounts/{account_id}/stable-urls/{stable_url_id}`). The name `stableUrlNames` implies a list of `StableUrl` objects' `name` field; the FQ-vs-id semantics are buried in the doc.
- **Category:** 19 (under-specified identifier — strings that are actually FQ resource names), 6 (misleading singular/plural framing — these are references, not names).
- **Suggested name:** `stableUrlRefs` or `stableUrlResourceNames` (matches the FQ semantics explicitly).
- **Rationale:** Other places in the same SDK use `*Ref` or `*ResourceName` for FQ references; `*Names` is ambiguous (Could be display names? Could be IDs?).

### 13. `dataReplicationWorkspaceSet: string` — `src/v1/model.ts:284`
- **Why weird:** Long compound noun field of type `string`, semantics (a workspace-set reference by name? id? FQ?) hidden in JSDoc. The doc says "The workspace set whose workspaces will be used for data replication of all UC catalogs' underlying storage." — implying the value is a `WorkspaceSet.name`, but again the type is a bare `string`.
- **Category:** 7 (overly verbose), 19 (under-specified id), 6 (string for a typed concept).
- **Suggested name:** `dataReplicationWorkspaceSetName` or `dataReplicationWorkspaceSetRef`. Or split: `dataReplicationWorkspaceSet: { name: string }` for symmetry with the rest of the model.
- **Rationale:** Within `UcReplicationConfig`, `locationMappings` is typed, `catalogs: UcCatalog[]` is typed, but `dataReplicationWorkspaceSet: string` is loose. Inconsistent typing across siblings.

### 14. `etag` field on multiple types — `src/v1/model.ts:78,106,138`
- **Why weird:** `etag` lowercased. Web/HTTP convention is `ETag` (capital E-Tag, RFC 9110 §8.8.3). The wire format here is `etag` (lowercase, per the Zod schema line 332). Mixed casing across the ecosystem; the lowercase here at least mirrors the wire, but a TS reader might expect `eTag` or `ETag`.
- **Category:** 3 (acronym casing).
- **Suggested name:** Keep `etag` for wire fidelity; document the choice in a top-level comment. (Or use `eTag` if the SDK style guide prefers JS-camelCase for acronyms.)
- **Rationale:** Low-impact but flagged because the audit asks for casing inconsistencies. The Google TS style guide (loaded skill `google-ts-styleguide:ts-style-guide`) generally prefers camelCase for acronyms (so `etag` is actually fine).

### 15. `validateOnly: boolean` — `src/v1/model.ts:44,59`
- **Why weird:** "ValidateOnly" is a generic flag pattern; doesn't say what is validated or what the side effect of the validation is. Same word used identically on `CreateFailoverGroupRequest` and `CreateStableUrlRequest`. Fine on its own but worth noting: there is no dryRun/preview field elsewhere, so a user familiar with `dryRun: boolean` convention may not search for `validateOnly`.
- **Category:** 1 (vague), 6 (mildly misleading — "validate only" could imply the result is a validation report; here it's a side-effect suppressor).
- **Suggested name:** `dryRun` (industry standard) or keep `validateOnly` with a tighter JSDoc.
- **Rationale:** Two of the four Create-style APIs use this; `dryRun` is the common convention in Kubernetes/many DBR SDKs.

### 16. `parent` field on `Create*Request` / `List*Request` — `src/v1/model.ts:40,55,173,200`
- **Why weird:** Bare `parent` with format `accounts/{account_id}`. The literal word "parent" requires JSDoc to decode; idiomatic naming would be `account` or `accountId` or `parentResourceName`.
- **Category:** 1 (vague), 19 (under-specified id).
- **Suggested name:** `account` (since the format hard-codes `accounts/{account_id}`) or `parentResourceName`.
- **Rationale:** "Parent" is proto AIP-132 jargon. SDK users speak in domain terms ("the account this group belongs to").

### 17. `failoverGroupId` / `stableUrlId` client-provided suffix fields — `src/v1/model.ts:49,64`
- **Why weird:** Field is a client-side hint that becomes part of the resource name; pattern is "if set, server uses it as the trailing identifier". JSDoc on `failoverGroupId` says: "Used to construct the resource name as `{parent}/failover-groups/{failover_group_id}`." Two ids floating around — the FQ `name` (server-formed) and this client suffix — invite confusion.
- **Category:** 19 (under-specified identifier among multiple), 20 (type-suffix tautology — `failoverGroup.Id` in a `CreateFailoverGroupRequest`).
- **Suggested name:** `requestedFailoverGroupId` / `requestedStableUrlId` to make it clear this is a suggestion, not the final resource id. Alternative: `customId` / `userProvidedId`.
- **Rationale:** Once created, the FQ `name` is the canonical reference; `failoverGroupId` is a vestigial input. Names should reflect lifecycle.

### 18. `Client` class name — `src/v1/client.ts:52`
- **Why weird:** Plain `Client` is the maximally-generic name. Once imported, callers see `import { Client } from '@databricks/sdk-disasterrecovery/v1'` — fine if used qualified, but `new Client()` floating in user code is meaningless. Sibling packages all do the same per generator convention; flagging this once at the package level.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `DisasterRecoveryClient`. (Or rely on import aliases.)
- **Rationale:** Most SDK conventions name the client after the service. The bare `Client` is a generator default and inherits whatever the import alias is.

## Low severity

### 19. `failoverFailoverGroup` method name on `Client` — `src/v1/client.ts:204`
- **Why weird:** Stutter (same as #1). Methods elsewhere are `createFailoverGroup`, `getFailoverGroup`, `listFailoverGroups`, `updateFailoverGroup`, `deleteFailoverGroup` — all use `<verb><Resource>`. This one collides because `failover` is both the verb and (lower-cased) part of the resource.
- **Category:** 7 (overly verbose), 17 (inconsistency — verb visually merges with resource).
- **Suggested name:** `triggerFailover` (verb `trigger`, since `failover` is the object) or just `failover` (single-word, since the package is already "disasterrecovery").
- **Rationale:** `client.failoverFailoverGroup({...})` reads like a typo. `client.failover({...})` or `client.triggerFailover({...})` are unambiguous.

### 20. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:47`
- **Why weird:** Generic CS-term constant; the comment (line 46) explains it as "Package identity segment for this client to be used in the User-Agent header." Without the comment the name doesn't communicate that it's a User-Agent payload.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT` or `PKG_UA_SEGMENT`.
- **Rationale:** Same as other packages in the audit. Flag once per package.

### 21. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Exported helper but no caller in `client.ts` (the client builds URLSearchParams inline). Dead-looking surface area.
- **Category:** Observation / 11 (unused public helper).
- **Suggested name:** Either remove the export (generator default) or document why it ships per-package.
- **Rationale:** Carried by every generated package. Surfaces as `import { flattenQueryParams } from './utils'` no-op.

### 22. `readAll` — `src/v1/utils.ts:40`
- **Why weird:** Generic name for "read a `ReadableStream<Uint8Array>` to a single Uint8Array". Could collide cognitively with `Array.prototype` ergonomics.
- **Category:** 1 (vague).
- **Suggested name:** `drainStream` / `readStreamToBuffer`.
- **Rationale:** Internal helper. Skip if generated identically across all packages.

### 23. `executeCall` / `executeHttpCall` naming pair — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions whose names differ only by `Http` infix but operate on very different layers (retry/rate-limit wrapper vs raw HTTP send + APIError lift).
- **Category:** 1 (vague), 17 (inconsistent).
- **Suggested name:** `runCallWithOptions` / `sendHttp` (or `wrapCall` / `dispatchHttp`).
- **Rationale:** At the call site (`client.ts:104,111`), the two are visually similar; the more descriptive name disambiguates.

## Observations

### 24. Action-verb consistency on `Client` (mostly good)
Methods are `create*`/`get*`/`list*`/`update*`/`delete*` plus one bespoke action (`failoverFailoverGroup`). Aside from the stutter (#19), this is consistent. Listed as observation per rule 17 since the audit asks to flag inconsistencies — here only the one method breaks the pattern.

### 25. Acronym casing inconsistency: `URL` vs `Uri` vs `Url`
Within this package:
- `stableUrl`/`StableUrl` (PascalCase capital-then-lower).
- `uriByRegion`/`LocationMappingEntry.uri` (`Uri` capital-then-lower).
- `URLSearchParams` (Web global, ALLCAPS in code).
Three different casings for two acronyms (URL/URI). The Web platform uses `URL` (ALLCAPS) globally; the TS code uses `Url`/`Uri` to follow Go-style camelCase. Pick one. (Listed at observation since this is a package-wide policy question, not a single-line fix.)
- **Category:** 3 (acronym casing).

## Domain glossary
- **DR** — Disaster Recovery. Encoded in the package name `disasterrecovery`. Mentioned once in a JSDoc on `replicateWorkspaceAssets` ("control plane DR").
- **UCDR** — Unity Catalog Disaster Recovery (UC data plane replication). Mentioned in JSDoc at `model.ts:113`. Not present as an identifier.
- **CPDR** — Control Plane Disaster Recovery (notebooks, jobs, clusters, etc.). Mentioned in JSDoc at `model.ts:113,308`. Not present as an identifier — encoded only via `replicateWorkspaceAssets: boolean`.
- **UC** — Unity Catalog. Appears as the `Uc` prefix on `UcCatalog`, `UcReplicationConfig`, and as `unityCatalog…` in field names (inconsistency, see #10).
- **EA** — Early Access / Early Adoption? Mentioned in JSDoc on `WorkspaceSet.workspaceIds` (line 305) as "EA: exactly 2 workspaces (one per region)". Not decoded anywhere in the package.
- **RPO** — Recovery Point Objective. Not explicitly named; `replicationPoint` (line 144) is effectively the RPO marker.
- **RTO** — Recovery Time Objective. Not present in this package.
- **spog** — Single Pane of Glass (Databricks-internal term for the account-level UI host). Referenced once in a comment on `StableUrl.url` (line 256) as `<spog_host>`. No identifier carries the term.
- **etag** — Entity Tag (RFC 9110). Used for optimistic concurrency. Lowercase per wire.
- **FQ** (used in this audit) — Fully-qualified resource name (e.g., `accounts/{account_id}/failover-groups/{failover_group_id}`).
- **wkt** — Well-Known Types (import path `@databricks/sdk-core/wkt`).
- **m2m** / **u2m** / **pat** / **oidc** / **iam** — not encountered in this package.

## File coverage
- `src/v1/model.ts` (608 lines): read fully.
- `src/v1/client.ts` (419 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (31 lines): read fully.
