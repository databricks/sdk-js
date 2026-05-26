# Naming Audit: qualitymonitor

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/qualitymonitor/src/v2/`
**Versions audited:** v2
**Inferred domain:** Quality monitoring on Unity Catalog objects (currently only `schema`). The package defines a single `QualityMonitor` entity that wraps `AnomalyDetectionConfig` (last-run telemetry plus excluded tables) and a list of `ValidityCheckConfiguration` arms (percent-null, range, uniqueness). Every operation is marked `Deprecated: Use Data Quality Monitoring API instead (/api/data-quality/v1/monitors).` — i.e., this entire package is a deprecated shim that has been superseded by the `dataquality` package.
**Total weird names flagged:** 24

## Summary
| Severity | Count |
| --- | --- |
| High | 7 |
| Medium | 6 |
| Low | 8 |
| Observation | 3 |


## CRITICAL: Two packages, same domain
This package (`@databricks/sdk-qualitymonitor`, exporting `./v2`) and its sibling `@databricks/sdk-qualitymonitors` (plural, exporting `./v1`) **both exist** in this repo. They model overlapping data-quality concepts but with completely different shapes:
- `qualitymonitor` (singular, v2): schema-level monitor with `AnomalyDetectionConfig` and a list of `ValidityCheckConfiguration` arms. Wire path: `/api/2.0/quality-monitors`.
- `qualitymonitors` (plural, v1): table-level monitor with `DataMonitorInfo`, `Refresh` runs, `MonitorCronSchedule`, etc. Wire path: `/api/2.1/unity-catalog/tables/{full_table_name_arg}/monitor`.

The singular-vs-plural naming gives the reader no hint that these are different APIs over different UC resource types. Worse, both clients are deprecated in favour of the newer `dataquality` package (`/api/data-quality/v1/monitors`). Three packages, three vocabularies, one underlying business problem.

**Category:** 9 (singular/plural mismatch in a sibling), 12 (duplicate concept across packages), 6 (misleading — the singular/plural distinction does not communicate the actual API split).

**Recommendation:** Consolidate or rename. Possible options: (a) collapse both into `dataquality` (which is the deprecation target anyway) and remove the two deprecated packages from the SDK surface; (b) if both must be kept temporarily, rename to `qualitymonitorschema` (singular focuses on schemas) and `qualitymonitortables` (plural focuses on tables) so the directory name encodes the resource type, not a grammatical accident; (c) at minimum, surface a top-level `@deprecated` JSDoc on the `Client` class and on every exported type that points to `@databricks/sdk-dataquality`. None of the three options is done today.

## High severity

### 1. Package directory name `qualitymonitor` (singular) vs sibling `qualitymonitors` (plural) — repo layout
- **Why weird:** Two npm packages, two different sub-APIs, distinguished only by an `s`. A user with both installed will tab-complete `@databricks/sdk-qualitymonitor` and `@databricks/sdk-qualitymonitors` and have no obvious way to tell them apart from the import alone. The singular/plural form does not encode anything semantic (the singular package also returns lists of monitors; the plural package also returns single monitors).
- **Category:** 9 (singular/plural mismatch as the only differentiator), 1 (vague — neither name conveys the schema-vs-table split), 12 (duplicate concept).
- **Suggested name:** Rename one or both packages so the difference is on a meaningful dimension. Candidates: `qualitymonitor-schema` + `qualitymonitor-table`, or fold both into `dataquality` and delete these two.
- **Rationale:** Sibling packages must be distinguishable from the import string. Pluralisation alone is not enough.

### 2. `Client` class — `src/v2/client.ts:41`
- **Why weird:** A class literally named `Client` at the top of the package's public surface. A user importing both `@databricks/sdk-qualitymonitor` and `@databricks/sdk-qualitymonitors` (very likely during migration off the deprecated APIs) cannot import both as `Client`. The package name does namespace via the import path, but in IDE go-to-symbol the name appears unqualified — every audited package in this SDK has the same `Client` collision.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name).
- **Suggested name:** `QualityMonitorClient`.
- **Rationale:** Cross-package import collisions force users to alias. Generator-wide concern but especially acute here because three sibling packages (this, `qualitymonitors`, `dataquality`) all expose `Client`.

### 3. `ListQualityMonitorRequest` / `ListQualityMonitorResponse` / `listQualityMonitor` — `src/v2/model.ts:44-52`, `src/v2/client.ts:152`
- **Why weird:** Singular noun on a list operation. The response holds `qualityMonitors?: QualityMonitor[]` (plural), and the wire path is `/api/2.0/quality-monitors` (plural) — every concrete signal is plural; only the type/method name uses the singular `QualityMonitor`. Same singular-on-list bug as `dataquality` finding #1.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `ListQualityMonitorsRequest` / `ListQualityMonitorsResponse` / `listQualityMonitors`.
- **Rationale:** REST conventions, the package's own field naming (`qualityMonitors`), and the URL path all use plural. The singular form is generator template noise.

### 4. `QualityMonitor.objectType` + `QualityMonitor.objectId` — `src/v2/model.ts:62-65` (and copied into 3 request types)
- **Why weird:** `objectType` is a free-form `string` typed as values like `"schema"` (JSDoc says "Can be one of the following: schema." — one option in a one-element set is barely an enumeration). The companion `objectId` is a `string` whose actual content depends on what `objectType` says ("the uuid of the request object. For example, schema id."). This is a stringly-typed sum type with one current arm. Four separate types (`QualityMonitor`, `DeleteQualityMonitorRequest`, `GetQualityMonitorRequest`, `UpdateQualityMonitorRequest`) all duplicate these two fields with copy-pasted JSDoc.
- **Category:** 1 (vague — `objectType` could be anything), 6 (misleading — stringly-typed sum), 15 (generic field name losing meaning), 19 (underspecified ID — `objectId` shape depends on a sibling field's value).
- **Suggested name:** Model as a discriminated union: `target: {kind: 'schema', schemaId: string}`. With one arm today, a literal type `objectType: 'schema'` plus `schemaId: string` is enough.
- **Rationale:** TypeScript's strength is exhaustive discriminated unions. Leaving these as `string` defeats the type system and forces every caller to read the JSDoc. The "could be one of: schema" doc text strongly hints that the API team plans to add more arms — the type should be ready for them.

### 5. `QualityMonitor.objectId` doc text "The uuid of the request object" — `src/v2/model.ts:65`
- **Why weird:** `QualityMonitor` is the response shape too (the GET handler returns it), but the JSDoc says "uuid of the **request** object" — wording that is right only for the request types. Field is also typed `string` with no UUID brand. JSDoc says "For example, schema id" — example-driven docs on a stringly-typed field are a smell.
- **Category:** 6 (misleading — doc refers to request when type is dual-purpose), 19 (underspecified — `Id` says nothing about UUID format).
- **Suggested name:** Doc: "The UUID of the monitored object (e.g. the schema's `schema_id`)." Field: rename to `schemaId` once #4 is applied.
- **Rationale:** Doc-style accuracy and signalling that the value is a UUID.

### 6. `AnomalyDetectionRunStatus` value `WORKSPACE_MISMATCH_ERROR` overlap with `FAILED` — `src/v2/model.ts:6-15`
- **Why weird:** Both `FAILED` and `WORKSPACE_MISMATCH_ERROR` are error states with no documented distinction — a caller writing exhaustive status handling has to guess whether one is a sub-state of the other. The trailing `_ERROR` suffix on `WORKSPACE_MISMATCH_ERROR` is also dead context: every terminal-failure status here is by definition an error outcome.
- **Category:** 12 (likely duplicate concept — two indistinguishable error states), 18 (redundant suffix on the jargon value `WORKSPACE_MISMATCH_ERROR`).
- **Suggested name:** Rename the member jargon to `WORKSPACE_MISMATCH` (drop the redundant `_ERROR`). Resolve whether `FAILED` and `WORKSPACE_MISMATCH` are siblings or whether the latter is a `FAILED` sub-state.
- **Rationale:** Two members that both mean "the run errored" without documented separation is a real type-modelling gap; the `_ERROR` tail just compounds it.

### 7. `ValidityCheckConfiguration.name` JSDoc "Can be set by system. Does not need to be user facing." — `src/v2/model.ts:94-95`
- **Why weird:** A field whose own JSDoc admits it "does not need to be user facing" — yet it is part of the public TS type. The doc is also self-contradictory: "Can be set by system" implies output-only, but the field is plain optional (no `@readonly`). A user reading this has no idea whether to set it, what it does, or whether the server will ignore it.
- **Category:** 1 (vague — `name` is generic), 6 (misleading — output-only not typed as such), 15 (generic field name on a non-public-facing concept).
- **Suggested name:** Rename to `internalName` (matches the JSDoc), or mark with `@readonly` and rename to `systemAssignedName`.
- **Rationale:** Public types should not contain "system-set, not user-facing" fields without clear scoping.

## Medium severity

### 8. `AnomalyDetectionConfig.lastRunId` and `.latestRunStatus` (`Last` vs `Latest`) — `src/v2/model.ts:19,21`
- **Why weird:** Two adjacent fields use different superlative adjectives for the same concept: `lastRunId` and `latestRunStatus`. Both refer to the most recent run. JSDoc reinforces the mismatch: "Run id of the last run of the workflow" and "The status of the last run of the workflow." — same noun, different field-name modifier.
- **Category:** 17 (inconsistent vocabulary), 12 (duplicate concept across siblings).
- **Suggested name:** Pick one. `lastRunId` + `lastRunStatus`, or `latestRunId` + `latestRunStatus`.
- **Rationale:** Sibling fields describing properties of the same entity should use the same word.

### 9. `AnomalyDetectionConfig.excludedTableFullNames` — `src/v2/model.ts:23`
- **Why weird:** Same as `dataquality` finding #19. "Full names" is jargon; the JSDoc says "fully qualified table names". The shorter form drops the qualifying word that gives the name its meaning. Other Databricks SDK packages use `fullName` consistently for UC three-part names — here the suffix is `FullNames` (plural of FullName), making this the only field that says "full" then "names".
- **Category:** 1 (vague — "full" alone is generic), 5 (abbreviated jargon).
- **Suggested name:** `excludedTables` (since the values are by definition UC fully-qualified table names), or document the format in JSDoc.
- **Rationale:** Across the SDK, `fullName` is well-known UC vocabulary. The field at minimum should be `excludedTableFullyQualifiedNames` for accuracy, or `excludedTables` for brevity.

### 10. `PercentNullValidityCheck.upperBound` doc "Optional upper bound; we should use auto determined bounds for now" — `src/v2/model.ts:57`
- **Why weird:** Doc text reads like an internal TODO ("we should use auto determined bounds for now"). The "we" is the API team; "for now" implies the field's semantics are in flux. Public SDK documentation should be definitive, not provisional. Also: field is typed `number` with no unit hint — is this 0-100 or 0-1?
- **Category:** 6 (misleading — provisional doc text in a stable type), 1 (vague — `upperBound` of what units? percentage? fraction?).
- **Suggested name:** Field stays; doc should clarify units ("Optional upper bound on the null-percentage (0-100). If unset, the server auto-determines a bound."). Strip the internal TODO.
- **Rationale:** Doc-style cleanliness and unit precision.

### 11. `PercentNullValidityCheck.columnNames` (and `RangeValidityCheck.columnNames`, `UniquenessValidityCheck.columnNames`) — `src/v2/model.ts:56,73,82`
- **Why weird:** Three sibling check types each have an independent `columnNames: string[]` field with the same shape and meaning ("the columns to check"). Each carries its own near-identical JSDoc. The three checks could share a base type or a single field, but the wire-driven type model duplicates them.
- **Category:** 12 (duplicate concept across siblings).
- **Suggested name:** Either extract a `BaseValidityCheck { columnNames: string[] }` parent, or accept the duplication (one-line JSDoc each). Generator-emitted.
- **Rationale:** DRY at the type level; per-arm doc cost is small.

### 12. Method `listQualityMonitor` doc text "(Unimplemented) List quality monitors." — `src/v2/client.ts:150,204`
- **Why weird:** The method is implemented (has a complete body that constructs a URL, paginates, calls the server) — but the JSDoc literally says `(Unimplemented)`. Either (a) the server side is unimplemented and the doc is propagating a server-side TODO, or (b) this is a stale doc from when the method was a stub. Same comment appears on `updateQualityMonitor` (line 204: "(Unimplemented) Update a quality monitor on UC object.") — but the body of `updateQualityMonitor` is a complete `PUT` call.
- **Category:** 6 (misleading — body says implemented, doc says unimplemented).
- **Suggested name:** N/A. Fix the doc — either drop "(Unimplemented)" or move it to a server-side `@throws NotImplemented` annotation.
- **Rationale:** Method docs that lie about implementation status are worse than no docs.

### 13. `Deprecated:` JSDoc tag style — `src/v2/client.ts:67,99,121,149,203`
- **Why weird:** Every method JSDoc starts with `Deprecated: Use Data Quality Monitoring API instead (...)` — but the TS-standard JSDoc tag is `@deprecated`. The text is in the description body, not in the tag, so IDEs that read `@deprecated` (VS Code, TS LSP) will not strike through these methods or warn the user. The deprecation is documented but not enforced.
- **Category:** 14 (Go-style — Go doc comments use a leading word like "Deprecated:" by convention; TS uses `@deprecated`), 6 (misleading — looks deprecated but does not surface as deprecated in tooling).
- **Suggested name:** Use `@deprecated Use Data Quality Monitoring API instead (/api/data-quality/v1/monitors).` so IDE tooling strikes through call sites.
- **Rationale:** A whole package marked deprecated should advertise the deprecation through TS conventions, not Go conventions.

## Low severity

### 14. `flattenQueryParams` exported but unused — `src/v2/utils.ts:123`
- **Why weird:** Exported helper that is never called from `client.ts`. The package's one list endpoint handles pagination params (`pageToken`, `pageSize`) inline rather than via `flattenQueryParams`. Dead exported surface. Same as `dataquality` finding #35.
- **Category:** 6 (misleading — looks like it's used; isn't).
- **Suggested name:** N/A — should be unexported (or moved to a shared utils package — generator-wide concern).
- **Rationale:** Same as other audited packages.

### 15. `executeCall` vs `executeHttpCall` — `src/v2/utils.ts:26,65`
- **Why weird:** Layering not visible from names; identical to `dataquality` finding #36.
- **Category:** 1, 12, 17.
- **Suggested name:** `runWithRetry` (outer) + `sendHttpRequest` (inner).
- **Rationale:** Layering should be readable from the names without opening the source.

### 16. `HttpCallOptions` — `src/v2/utils.ts:15`
- **Why weird:** Same as `dataquality` finding #40; internal context bag called `Options`.
- **Category:** 1, 8.
- **Suggested name:** `HttpCallContext`.
- **Rationale:** Reserve `Options` for user-tunable knobs.

### 17. `PACKAGE_SEGMENT` — `src/v2/client.ts:36`
- **Why weird:** Same as `dataquality` finding #41; unspecific noun for a User-Agent identity object.
- **Category:** 1.
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Add the missing domain word.

### 18. `Call` type + `call` variable — `src/v2/client.ts:80, 107, 130, 167, 216`
- **Why weird:** Same as `dataquality` finding #42; variable named `call` of type `Call` repeated 5 times across the client.
- **Category:** 1, 12.
- **Suggested name:** `request` (variable) — reserve `Call` for the type.
- **Rationale:** Type/variable collision is common in Go idioms; TS prefers distinct names.

### 19. `req.objectType ?? ''` / `req.objectId ?? ''` URL composition — `src/v2/client.ts:106, 128, 210`
- **Why weird:** Same as `dataquality` finding #43 — `objectType`/`objectId` typed optional but required in practice for the URL path. Silently substitutes empty string producing malformed URLs like `/api/2.0/quality-monitors//`. Three call sites here.
- **Category:** 6.
- **Suggested name:** Make `objectType` and `objectId` non-optional on every request type that constructs a URL from them.
- **Rationale:** Type shape should match runtime requirement.

### 20. `respBody` vs `resp` — `src/v2/client.ts:84-95, 134-145, 171-182, 220-231`
- **Why weird:** Same as `dataquality` finding #44; two variables differ by `Body` only.
- **Category:** 5, 17.
- **Suggested name:** `rawBody` + `result`.
- **Rationale:** Distinguish by meaningful nouns.

### 21. `httpReq` local — `src/v2/client.ts:83, 110, 133, 170, 219`
- **Why weird:** Same as `dataquality` finding #45.
- **Category:** 5, 12.
- **Suggested name:** `httpRequest` (no abbreviation).
- **Rationale:** Avoid two `req`-rooted identifiers in the same scope.

## Observations

### 22. Action verbs in `Client`
The client uses `Create` / `Get` / `Update` / `Delete` / `List` for monitor operations. Verbs are consistent within the package. Listed per rule 17 to note the absence of inconsistency (relative to `qualitymonitors` plural, which adds `Cancel` / `Run` / `Regenerate`).

### 23. `qualitymonitor` lowercase package name vs `quality-monitors` wire path vs `QualityMonitor` types
Same shape as the `dataquality` casing observation: directory is one collapsed word (`qualitymonitor`), wire path is kebab-plural (`/quality-monitors`), TS types are PascalCase singular (`QualityMonitor`). The directory plural-vs-singular question (relative to `qualitymonitors`) is unique to this package family.
- **Category:** 3 (casing inconsistency), 9 (singular/plural mismatch).

### 24. Entire package is `@deprecated` per JSDoc
Every method's JSDoc starts with `Deprecated: Use Data Quality Monitoring API instead (/api/data-quality/v1/monitors).` — i.e., the package itself should not be used in new code. The TS surface does not surface this with `@deprecated` tags (#13), so IDE tooling does not strike through call sites. This is the single most important fact about this package and it is documented only inside method bodies.

## Domain glossary
- `uc` / Unity Catalog — implicit across the package (the monitored resource is a UC schema).
- `quality monitor` — the long-lived configuration entity (one per UC schema) holding anomaly-detection config and validity checks.
- `anomaly detection` — periodic workflow that compares incoming data against historical patterns to flag anomalies.
- `validity check` — an input-data constraint (null %, range, uniqueness) evaluated during anomaly detection.
- `run status` — eight-value lifecycle: `RUNNING`, `PENDING`, `CANCELED`, `SUCCESS`, `FAILED`, `JOB_DELETED`, `WORKSPACE_MISMATCH_ERROR` (+ sentinel `UNKNOWN`).
- `object type` / `object id` — stringly-typed reference to a UC object (currently always a schema).
- `refresh`, `monitor cron schedule`, `dashboard`, `notifications`, `data classification config` — none of these appear in this package; they all live in the sibling `qualitymonitors` (plural, v1) package.

## File coverage
- `src/v2/model.ts` (317 lines): read fully.
- `src/v2/client.ts` (233 lines): read fully.
- `src/v2/utils.ts` (150 lines): read fully.
- `src/v2/index.ts` (21 lines): read fully.
