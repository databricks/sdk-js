# Naming Audit: qualitymonitor

**Path:** `packages/qualitymonitor/src/v2/`
**Versions audited:** v2
**Inferred domain:** Quality monitoring on Unity Catalog objects (currently only `schema`). The package defines a single `QualityMonitor` entity that wraps `AnomalyDetectionConfig` (last-run telemetry plus excluded tables) and a list of `ValidityCheckConfiguration` arms (percent-null, range, uniqueness). A nested concept (`CustomCheckConfiguration` -> `CustomScalarCheck`) lets callers attach templated SQL checks with per-column matchers. Every operation is marked `Deprecated: Use Data Quality Monitoring API instead (/api/data-quality/v1/monitors).` — i.e., this entire package is a deprecated shim that has been superseded by the `dataquality` package.
**Total weird names flagged:** 42

## Summary
| Severity | Count |
| --- | --- |
| High | 13 |
| Medium | 16 |
| Low | 8 |
| Observation | 5 |


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

### 3. `ListQualityMonitorRequest` / `ListQualityMonitorResponse` / `listQualityMonitor` — `src/v2/model.ts:92-100`, `src/v2/client.ts:152`
- **Why weird:** Singular noun on a list operation. The response holds `qualityMonitors?: QualityMonitor[]` (plural), and the wire path is `/api/2.0/quality-monitors` (plural) — every concrete signal is plural; only the type/method name uses the singular `QualityMonitor`. Same singular-on-list bug as `dataquality` finding #1.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `ListQualityMonitorsRequest` / `ListQualityMonitorsResponse` / `listQualityMonitors`.
- **Rationale:** REST conventions, the package's own field naming (`qualityMonitors`), and the URL path all use plural. The singular form is generator template noise.

### 4. `QualityMonitor.objectType` + `QualityMonitor.objectId` — `src/v2/model.ts:109-113` (and copied into 4 request types)
- **Why weird:** `objectType` is a free-form `string` typed as values like `"schema"` (JSDoc says "Can be one of the following: schema." — one option in a one-element set is barely an enumeration). The companion `objectId` is a `string` whose actual content depends on what `objectType` says ("the uuid of the request object. For example, schema id."). This is a stringly-typed sum type with one current arm. Five separate types (`QualityMonitor`, `DeleteQualityMonitorRequest`, `GetQualityMonitorRequest`, `UpdateQualityMonitorRequest`, the response of any GET) all duplicate these two fields with copy-pasted JSDoc.
- **Category:** 1 (vague — `objectType` could be anything), 6 (misleading — stringly-typed sum), 15 (generic field name losing meaning), 19 (underspecified ID — `objectId` shape depends on a sibling field's value).
- **Suggested name:** Model as a discriminated union: `target: {kind: 'schema', schemaId: string}`. With one arm today, a literal type `objectType: 'schema'` plus `schemaId: string` is enough.
- **Rationale:** TypeScript's strength is exhaustive discriminated unions. Leaving these as `string` defeats the type system and forces every caller to read the JSDoc. The "could be one of: schema" doc text strongly hints that the API team plans to add more arms — the type should be ready for them.

### 5. `QualityMonitor.objectId` doc text "The uuid of the request object" — `src/v2/model.ts:113`
- **Why weird:** `QualityMonitor` is the response shape too (the GET handler returns it), but the JSDoc says "uuid of the **request** object" — wording that is right only for the request types. Field is also typed `string` with no UUID brand. JSDoc says "For example, schema id" — example-driven docs on a stringly-typed field are a smell.
- **Category:** 6 (misleading — doc refers to request when type is dual-purpose), 19 (underspecified — `Id` says nothing about UUID format).
- **Suggested name:** Doc: "The UUID of the monitored object (e.g. the schema's `schema_id`)." Field: rename to `schemaId` once #4 is applied.
- **Rationale:** Doc-style accuracy and signalling that the value is a UUID.

### 6. `QualityMonitor.anomalyDetectionConfig` and `QualityMonitor.validityCheckConfigurations` co-existing — `src/v2/model.ts:114-116`
- **Why weird:** `QualityMonitor` has both an `anomalyDetectionConfig?` field and a `validityCheckConfigurations?` field, even though `AnomalyDetectionConfig` already contains its own `validityCheckConfigurations?` (line 40). The same data is reachable two ways: `monitor.anomalyDetectionConfig.validityCheckConfigurations` and `monitor.validityCheckConfigurations`. Either it is duplicated (and one is authoritative — but which?) or the field at the top level overrides the nested one, but the JSDoc says nothing.
- **Category:** 12 (duplicate concept — same array exposed at two levels), 6 (misleading — silently ambiguous).
- **Suggested name:** Document the relationship in JSDoc — clarify which location is authoritative when both are set.
- **Rationale:** A reader cannot tell which one is the source of truth, which one is read-only, or whether both must match. The data model embeds ambiguity that callers have to test by experiment.

### 7. Enum members `ANOMALY_DETECTION_JOB_TYPE_*` — `src/v2/model.ts:5-9`
- **Why weird:** Enum is called `AnomalyDetectionJobType`, but every member is prefixed `ANOMALY_DETECTION_JOB_TYPE_` — at the call site users write `AnomalyDetectionJobType.ANOMALY_DETECTION_JOB_TYPE_NORMAL` (6 redundant tokens).
- **Category:** 2 (redundant enum prefix), 14 (proto/Go-style names), 18 (overly long enum values).
- **Suggested name:** `AnomalyDetectionJobType.{Normal, InternalHidden}` and drop the unset sentinel (rely on `jobType?: ... | undefined`). Or strip just the prefix: `ANOMALY_DETECTION_JOB_TYPE_NORMAL` -> `NORMAL`.
- **Rationale:** TS enums namespace their values, so the `ANOMALY_DETECTION_JOB_TYPE_` prefix is dead context.

### 8. Enum members `ANOMALY_DETECTION_RUN_STATUS_*` — `src/v2/model.ts:12-21`
- **Why weird:** Eight values, every one prefixed with `ANOMALY_DETECTION_RUN_STATUS_`, including `ANOMALY_DETECTION_RUN_STATUS_WORKSPACE_MISMATCH_ERROR` — a 51-character symbol. Sentinel is `_UNKNOWN` while the sibling enum (`AnomalyDetectionJobType`, #7) uses `_UNSPECIFIED` — inconsistent sentinel naming inside the same file. Also: `_FAILED` and `_WORKSPACE_MISMATCH_ERROR` are both error states with no documented difference.
- **Category:** 2 (redundant prefix), 14 (proto-style), 17 (sentinel inconsistency — `UNKNOWN` vs `UNSPECIFIED` in sibling enums), 18 (long enum values), 12 (likely duplicate concept — two error states).
- **Suggested name:** `AnomalyDetectionRunStatus.{Running, Pending, Canceled, Success, Failed, JobDeleted, WorkspaceMismatchError}`. Drop the sentinel. Resolve whether `Failed` and `WorkspaceMismatchError` are siblings or whether the latter is a `Failed` sub-state.
- **Rationale:** Same as #7. Cross-enum sentinel inconsistency will trip users who write `=== AnomalyDetectionJobType.ANOMALY_DETECTION_JOB_TYPE_UNSPECIFIED` and find that the run-status enum uses `_UNKNOWN` instead.

### 9. Enum members `THRESHOLD_TYPE_*` — `src/v2/model.ts:23-28`
- **Why weird:** Four-value enum with proto-style `THRESHOLD_TYPE_UNSPECIFIED` / `_AUTO` / `_UNBOUNDED` / `_MANUAL`. The field that uses it is `Threshold.thresholdType` (line 131) — meaning at the call site you'd write `threshold.thresholdType === ThresholdType.THRESHOLD_TYPE_MANUAL` — "threshold" appears four times in the same expression. Also: the enum is *external* to the `Threshold` interface, even though it is used only by that one field, on that one interface — perfect candidate for a string-literal union (`'auto' | 'unbounded' | 'manual'`).
- **Category:** 2 (redundant enum prefix), 14 (proto-style), 18 (long enum values), 20 (type-suffix tautology — `Threshold.thresholdType: ThresholdType`).
- **Suggested name:** Replace the enum with a string-literal union on the field directly: `kind?: 'auto' | 'unbounded' | 'manual'`. Or, if keeping the enum, drop the prefix: `ThresholdType.{Auto, Unbounded, Manual}`.
- **Rationale:** Three-value, locally-used "kind" indicators are exactly where TS string-literal unions excel.

### 10. `CustomScalarCheck.checkName` / `.sqlQuery` / `.columnMatchers` / `.thresholds` — `src/v2/model.ts:67-76`
- **Why weird:** The type is called `CustomScalarCheck`, but its first field is `checkName` (the type already says "Check"). Same redundancy as `ValidityCheckConfiguration.name` (#12). The four fields are: a name, a SQL query, a list of matchers, and a thresholds object — there is no internal qualifier that justifies `check` on `checkName`.
- **Category:** 8 (redundant suffix — `check` is already in the type name).
- **Suggested name:** `name`, `sqlQuery`, `columnMatchers`, `thresholds`. Or, if the rest of the family follows the pattern, accept and standardise on `check*`.
- **Rationale:** Redundant prefixes are dead context — readers know they are looking at a `CustomScalarCheck` from the type.

### 11. `ValidityCheckConfiguration` + `PercentNullValidityCheck` / `RangeValidityCheck` / `UniquenessValidityCheck` — `src/v2/model.ts:102-160`
- **Why weird:** Identical to `dataquality` finding #14. Four sibling types all carry the `ValidityCheck` suffix, and the wrapping discriminated-union container type is `ValidityCheckConfiguration` — adding `Configuration` on top of `Check`. The wire-style discriminator names (`percentNullValidityCheck`, etc.) re-state the `ValidityCheck` suffix again. Combined, the path `monitor.validityCheckConfigurations[0].checkType.$case === 'percentNullValidityCheck'` repeats "validity-check" three times within nine identifier-positions.
- **Category:** 8 (redundant suffix), 20 (type-suffix tautology), 18 (effectively-long discriminator strings).
- **Suggested name:** Drop `ValidityCheck` from each arm type -> `PercentNullCheck` / `RangeCheck` / `UniquenessCheck`. Drop `Configuration` from container -> `ValidityCheck` (the container). Discriminator: `kind: 'percentNull' | 'range' | 'uniqueness'`.
- **Rationale:** A `ValidityCheck.kind === 'range'` reads cleanly; the current form is "validity check configuration that has a check type whose case is range validity check" — five repetitions of "check".

### 12. `ValidityCheckConfiguration.name` JSDoc "Can be set by system. Does not need to be user facing." — `src/v2/model.ts:148-149`
- **Why weird:** A field whose own JSDoc admits it "does not need to be user facing" — yet it is part of the public TS type. The doc is also self-contradictory: "Can be set by system" implies output-only, but the field is plain optional (no `@readonly`). A user reading this has no idea whether to set it, what it does, or whether the server will ignore it.
- **Category:** 1 (vague — `name` is generic), 6 (misleading — output-only not typed as such), 15 (generic field name on a non-public-facing concept).
- **Suggested name:** Rename to `internalName` (matches the JSDoc), or mark with `@readonly` and rename to `systemAssignedName`.
- **Rationale:** Public types should not contain "system-set, not user-facing" fields without clear scoping.

### 13. `QualityMonitor` field-name irregularity: `anomalyDetectionConfig` (singular `Config`) vs `validityCheckConfigurations` (plural `Configurations`) — `src/v2/model.ts:114,116`
- **Why weird:** The two configuration fields on `QualityMonitor` use different singular/plural forms of "Config(uration)". `anomalyDetectionConfig` is a single object; `validityCheckConfigurations` is an array. The plural form follows from the array shape, but the *word* differs (`Config` vs `Configuration`). A reader scanning the type sees two near-synonyms within three lines.
- **Category:** 17 (inconsistent word choice between sibling fields), 7 (verbose — `Configurations` is longer than necessary).
- **Suggested name:** Pick one: `anomalyDetectionConfig` + `validityCheckConfigs` (both abbreviated), or rename the array to `validityChecks` and the object to `anomalyDetection` (drop the Config suffix entirely — the type names already say "Config").
- **Rationale:** Inconsistent word forms within the same type lose information.

## Medium severity

### 14. `AnomalyDetectionConfig.lastRunId` and `.latestRunStatus` (`Last` vs `Latest`) — `src/v2/model.ts:32,34`
- **Why weird:** Two adjacent fields use different superlative adjectives for the same concept: `lastRunId` and `latestRunStatus`. Both refer to the most recent run. JSDoc reinforces the mismatch: "Run id of the last run of the workflow" and "The status of the last run of the workflow." — same noun, different field-name modifier.
- **Category:** 17 (inconsistent vocabulary), 12 (duplicate concept across siblings).
- **Suggested name:** Pick one. `lastRunId` + `lastRunStatus`, or `latestRunId` + `latestRunStatus`.
- **Rationale:** Sibling fields describing properties of the same entity should use the same word.

### 15. `AnomalyDetectionConfig.jobType` doc text "The type of the last run of the workflow." — `src/v2/model.ts:36`
- **Why weird:** Field name says `jobType`, doc says "The type of the **last run** of the workflow." That is conflating two things: the type of the workflow/job (a config property) vs the type of the last run (a per-run property). A reader cannot tell which it is. Looking at the enum (`AnomalyDetectionJobType` with `_NORMAL` and `_INTERNAL_HIDDEN`), these look like job classifications, not per-run modes — so the doc is probably wrong.
- **Category:** 6 (misleading — name and doc contradict), 1 (vague — `jobType` could be either).
- **Suggested name:** If this is a workflow-level property: keep `jobType`, fix the doc to "The classification of the anomaly-detection job." If per-run: rename to `lastRunJobType` and keep the doc.
- **Rationale:** Field-name vs doc disagreement forces callers to test by experiment.

### 16. `AnomalyDetectionConfig.excludedTableFullNames` — `src/v2/model.ts:38`
- **Why weird:** Same as `dataquality` finding #19. "Full names" is jargon; the JSDoc says "fully qualified table names". The shorter form drops the qualifying word that gives the name its meaning. Other Databricks SDK packages use `fullName` consistently for UC three-part names — here the suffix is `FullNames` (plural of FullName), making this the only field that says "full" then "names".
- **Category:** 1 (vague — "full" alone is generic), 5 (abbreviated jargon).
- **Suggested name:** `excludedTables` (since the values are by definition UC fully-qualified table names), or document the format in JSDoc.
- **Rationale:** Across the SDK, `fullName` is well-known UC vocabulary. The field at minimum should be `excludedTableFullyQualifiedNames` for accuracy, or `excludedTables` for brevity.

### 17. `Threshold.boundValue` JSDoc says "Meaningful only if threshold_type is MANUAL" — `src/v2/model.ts:129-130`
- **Why weird:** Two fields, one of which is meaningful only when the other has a specific value. This is again the discriminated-union pattern modelled as plain optional fields. Reads as: when `thresholdType === MANUAL`, you must provide `boundValue`; when `thresholdType === AUTO` or `UNBOUNDED`, you must not. The type does not encode this.
- **Category:** 6 (misleading — type allows nonsensical combinations), 11 (missing union — should be discriminated).
- **Suggested name:** Model as: `Threshold = {kind: 'auto'} | {kind: 'unbounded'} | {kind: 'manual', value: number}`.
- **Rationale:** Same anti-pattern as `objectType`/`objectId` (#4). Wire-driven shape rather than TS-friendly modelling.

### 18. `Threshold.thresholdType` — `src/v2/model.ts:131`
- **Why weird:** Type-suffix tautology. `Threshold.thresholdType: ThresholdType` — three "threshold" tokens in one line. Compare with the parallel pattern in `AnomalyDetectionConfig.jobType: AnomalyDetectionJobType` and `validityCheckConfigurations[i].checkType: ...`. Repetition runs throughout the package.
- **Category:** 20 (type-suffix tautology), 8 (redundant suffix).
- **Suggested name:** `kind: ThresholdKind` or `mode: ThresholdMode`. Or, with #9 applied: `kind: 'auto' | 'unbounded' | 'manual'`.
- **Rationale:** "Kind" / "Mode" reads cleanly when a discriminator is required.

### 19. `CustomScalarCheck.checkName` doc "Name of the custom check" — `src/v2/model.ts:68-69`
- **Why weird:** Field is on `CustomScalarCheck` (already a custom-check); the doc says "Name of the custom check". Both the type name and the doc say "custom check" — but the discriminator `$case: 'scalarCheck'` says "scalar check". The doc is one step abstracted from the actual type — readers see "custom check" and have to map it back to `CustomScalarCheck`.
- **Category:** 8 (redundant suffix — `check` is in the type name), 17 (inconsistent vocabulary — "scalar" vs "custom").
- **Suggested name:** Field: `name`. Doc: "Name of the scalar check definition."
- **Rationale:** Drop the redundant prefix; align the doc with the actual type name.

### 20. `CustomScalarCheck.sqlQuery` doc "Templated SQL query for this check" — `src/v2/model.ts:70-71`
- **Why weird:** "Templated" appears in the doc but not the field name — a caller looking at autocomplete sees only `sqlQuery: string` and has no hint that templating syntax is allowed (or expected). The JSDoc carries the only signal. Other SDK packages with templated SQL fields (e.g. `dataquality.CustomMetric.definition`) call them out as Jinja templates explicitly.
- **Category:** 1 (vague — `sqlQuery` undersells the template syntax), 6 (misleading — looks like raw SQL).
- **Suggested name:** `sqlQueryTemplate`, or `templatedSql`, or keep the name and expand the JSDoc to spell out the templating language (Jinja? Mustache? proprietary?).
- **Rationale:** Templates and raw SQL are very different inputs; the type signature should hint at the distinction.

### 21. `CustomScalarCheck.columnMatchers` and `ColumnMatcher.variableName` — `src/v2/model.ts:43-48,72-73`
- **Why weird:** `ColumnMatcher` is a pair `{variableName, columnNames}`. The JSDoc on `variableName` says "Variable name within a custom sql query that this matcher applies to" — so `variableName` is the template variable from #20. Then `columnNames` is "List of column names (in target tables) to match." So the data flow is: `sqlQuery` references template variables, each `ColumnMatcher` maps one variable to a list of candidate column names. None of this is obvious from the type names alone. `ColumnMatcher.variableName` looks like a TS variable name, not a template placeholder.
- **Category:** 1 (vague — `variableName` could mean many things), 5 (jargon — `Matcher` is itself a generic word).
- **Suggested name:** Rename `ColumnMatcher` -> `TemplateColumnBinding` (or `SqlVariableBinding`). Field `variableName` -> `templateVariable` or `placeholder`. Field `columnNames` -> `candidateColumns`.
- **Rationale:** Template binding is the concept here; the current naming hides it.

### 22. `CustomCheckThresholds.lowerBound` / `.upperBound` vs `RangeValidityCheck.lowerBound` / `.upperBound` — `src/v2/model.ts:62-64,123-125`
- **Why weird:** Two unrelated types use the same field name pair (`lowerBound`/`upperBound`) for very different things. In `CustomCheckThresholds`, the bounds are `Threshold` objects (i.e. `{boundValue, thresholdType}`). In `RangeValidityCheck`, the bounds are `number`. Same field name, different types — a reader pattern-matching on `lowerBound` cannot rely on it being a number anywhere.
- **Category:** 17 (inconsistent type for identical field name), 15 (generic field name — `lowerBound` of what?).
- **Suggested name:** `CustomCheckThresholds.lower: Threshold` + `.upper: Threshold` (drop `Bound` since `Threshold` is the type). `RangeValidityCheck.lowerBound: number` + `.upperBound: number` (keep).
- **Rationale:** Identical field names across sibling types should imply identical semantics. Differentiate the threshold-wrapping case by dropping `Bound`.

### 23. `PercentNullValidityCheck.upperBound` doc "Optional upper bound; we should use auto determined bounds for now" — `src/v2/model.ts:105-106`
- **Why weird:** Doc text reads like an internal TODO ("we should use auto determined bounds for now"). The "we" is the API team; "for now" implies the field's semantics are in flux. Public SDK documentation should be definitive, not provisional. Also: field is typed `number` with no unit hint — is this 0-100 or 0-1?
- **Category:** 6 (misleading — provisional doc text in a stable type), 1 (vague — `upperBound` of what units? percentage? fraction?).
- **Suggested name:** Field stays; doc should clarify units ("Optional upper bound on the null-percentage (0-100). If unset, the server auto-determines a bound."). Strip the internal TODO.
- **Rationale:** Doc-style cleanliness and unit precision.

### 24. `PercentNullValidityCheck.columnNames` (and `RangeValidityCheck.columnNames`, `UniquenessValidityCheck.columnNames`) — `src/v2/model.ts:103,120,135`
- **Why weird:** Three sibling check types each have an independent `columnNames: string[]` field with the same shape and meaning ("the columns to check"). Each carries its own near-identical JSDoc. The three checks could share a base type or a single field, but the wire-driven type model duplicates them.
- **Category:** 12 (duplicate concept across siblings).
- **Suggested name:** Either extract a `BaseValidityCheck { columnNames: string[] }` parent, or accept the duplication (one-line JSDoc each). Generator-emitted.
- **Rationale:** DRY at the type level; per-arm doc cost is small.

### 25. Method `listQualityMonitor` doc text "(Unimplemented) List quality monitors." — `src/v2/client.ts:150,203`
- **Why weird:** The method is implemented (has a complete body that constructs a URL, paginates, calls the server) — but the JSDoc literally says `(Unimplemented)`. Either (a) the server side is unimplemented and the doc is propagating a server-side TODO, or (b) this is a stale doc from when the method was a stub. Same comment appears on `updateQualityMonitor` (line 203-204: "(Unimplemented) Update a quality monitor on UC object.") — but the body of `updateQualityMonitor` is a complete `PUT` call.
- **Category:** 6 (misleading — body says implemented, doc says unimplemented).
- **Suggested name:** N/A. Fix the doc — either drop "(Unimplemented)" or move it to a server-side `@throws NotImplemented` annotation.
- **Rationale:** Method docs that lie about implementation status are worse than no docs.

### 26. `listQualityMonitor` parameter is non-optional, but `req` is empty in normal use — `src/v2/client.ts:152-154`
- **Why weird:** `listQualityMonitor(req: ListQualityMonitorRequest, options?: CallOptions)` requires the caller to pass `req` even when they want all defaults. `ListQualityMonitorRequest` is `{pageToken?, pageSize?}` — both optional. So the only "no special args" call is `listQualityMonitor({})` — an empty object placeholder.
- **Category:** 6 (misleading — looks like there's a required input but there isn't).
- **Suggested name:** Make `req?: ListQualityMonitorRequest` optional: `listQualityMonitor(req?: ListQualityMonitorRequest, options?: CallOptions)`.
- **Rationale:** Optionality on the wire should match optionality at the TS surface. Generator-wide concern.

### 27. `Deprecated:` JSDoc tag style — `src/v2/client.ts:67,99,121,149,202`
- **Why weird:** Every method JSDoc starts with `Deprecated: Use Data Quality Monitoring API instead (...)` — but the TS-standard JSDoc tag is `@deprecated`. The text is in the description body, not in the tag, so IDEs that read `@deprecated` (VS Code, TS LSP) will not strike through these methods or warn the user. The deprecation is documented but not enforced.
- **Category:** 14 (Go-style — Go doc comments use a leading word like "Deprecated:" by convention; TS uses `@deprecated`), 6 (misleading — looks deprecated but does not surface as deprecated in tooling).
- **Suggested name:** Use `@deprecated Use Data Quality Monitoring API instead (/api/data-quality/v1/monitors).` so IDE tooling strikes through call sites.
- **Rationale:** A whole package marked deprecated should advertise the deprecation through TS conventions, not Go conventions.

### 28. Method names `createQualityMonitor` / `deleteQualityMonitor` / `getQualityMonitor` / `listQualityMonitor` / `updateQualityMonitor` — `src/v2/client.ts:70,102,124,152,206`
- **Why weird:** Five methods, all of which repeat "QualityMonitor" in the name even though they are members of a `Client` class whose package (`qualitymonitor`) already encodes that domain. Compare with sister packages where methods are `create` / `get` / `delete` / `list` (verbs only). The "QualityMonitor" suffix is dead context — calling `client.createQualityMonitor(...)` from a package literally called `qualitymonitor` is reading the noun twice.
- **Category:** 7 (overly verbose), 8 (redundant suffix).
- **Suggested name:** `create` / `delete` / `get` / `list` / `update` (drop the noun).
- **Rationale:** When the class is `Client` and the package is `qualitymonitor`, the only entity to act on is the quality monitor; the noun adds no signal.

### 29. `UpdateQualityMonitorRequest` carries `objectType` + `objectId` + `qualityMonitor` — `src/v2/model.ts:139-145`
- **Why weird:** Three top-level fields where the relationship is implicit. The `objectType`/`objectId` pair identifies the target (also redundant with `qualityMonitor.objectType`/`qualityMonitor.objectId`). The `qualityMonitor` field carries the new state — including its own `objectType`/`objectId`. So the same identifiers are present twice on the request. Per the URL builder, only the top-level `req.objectType` and `req.objectId` are used to construct the path; the values inside `qualityMonitor` are sent in the body. Nothing checks that they match.
- **Category:** 12 (duplicate concept — identifiers at two levels), 6 (misleading — silent overwriting possibility).
- **Suggested name:** Either: (a) move identifiers entirely to the nested `qualityMonitor` (server reads them from the body and the path is derived from the body in TS land), or (b) move identifiers entirely to top-level and let `qualityMonitor` be just the mutable fields.
- **Rationale:** Same identifier surfaced twice on the same request is an invitation to bugs.

## Low severity

### 30. `flattenQueryParams` exported but unused — `src/v2/utils.ts:123`
- **Why weird:** Exported helper that is never called from `client.ts`. The package's one list endpoint handles pagination params (`pageToken`, `pageSize`) inline rather than via `flattenQueryParams`. Dead exported surface. Same as `dataquality` finding #35.
- **Category:** 6 (misleading — looks like it's used; isn't).
- **Suggested name:** N/A — should be unexported (or moved to a shared utils package — generator-wide concern).
- **Rationale:** Same as other audited packages.

### 31. `executeCall` vs `executeHttpCall` — `src/v2/utils.ts:26,65`
- **Why weird:** Layering not visible from names; identical to `dataquality` finding #36.
- **Category:** 1, 12, 17.
- **Suggested name:** `runWithRetry` (outer) + `sendHttpRequest` (inner).
- **Rationale:** Layering should be readable from the names without opening the source.

### 32. `HttpCallOptions` — `src/v2/utils.ts:15`
- **Why weird:** Same as `dataquality` finding #40; internal context bag called `Options`.
- **Category:** 1, 8.
- **Suggested name:** `HttpCallContext`.
- **Rationale:** Reserve `Options` for user-tunable knobs.

### 33. `PACKAGE_SEGMENT` — `src/v2/client.ts:36`
- **Why weird:** Same as `dataquality` finding #41; unspecific noun for a User-Agent identity object.
- **Category:** 1.
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Add the missing domain word.

### 34. `Call` type + `call` variable — `src/v2/client.ts:80, 107, 130, 167, 216`
- **Why weird:** Same as `dataquality` finding #42; variable named `call` of type `Call` repeated 5 times across the client.
- **Category:** 1, 12.
- **Suggested name:** `request` (variable) — reserve `Call` for the type.
- **Rationale:** Type/variable collision is common in Go idioms; TS prefers distinct names.

### 35. `req.objectType ?? ''` / `req.objectId ?? ''` URL composition — `src/v2/client.ts:106, 128, 210`
- **Why weird:** Same as `dataquality` finding #43 — `objectType`/`objectId` typed optional but required in practice for the URL path. Silently substitutes empty string producing malformed URLs like `/api/2.0/quality-monitors//`. Three call sites here.
- **Category:** 6.
- **Suggested name:** Make `objectType` and `objectId` non-optional on every request type that constructs a URL from them.
- **Rationale:** Type shape should match runtime requirement.

### 36. `respBody` vs `resp` — `src/v2/client.ts:84-95, 134-145, 171-182, 218-231`
- **Why weird:** Same as `dataquality` finding #44; two variables differ by `Body` only.
- **Category:** 5, 17.
- **Suggested name:** `rawBody` + `result`.
- **Rationale:** Distinguish by meaningful nouns.

### 37. `httpReq` local — `src/v2/client.ts:83, 110, 133, 170, 219`
- **Why weird:** Same as `dataquality` finding #45.
- **Category:** 5, 12.
- **Suggested name:** `httpRequest` (no abbreviation).
- **Rationale:** Avoid two `req`-rooted identifiers in the same scope.

## Observations

### 38. Action verbs in `Client`
The client uses `Create` / `Get` / `Update` / `Delete` / `List` for monitor operations. Verbs are consistent within the package. Listed per rule 17 to note the absence of inconsistency (relative to `qualitymonitors` plural, which adds `Cancel` / `Run` / `Regenerate`).

### 39. Acronym casing
Mixed conventions, all generator-emitted: `Id` (PascalCase-capital-then-lower in `objectId`, `lastRunId`), `URL` (only via the web-standard `URLSearchParams`), `Sql` (capital-then-lower in `sqlQuery`), `Http` (capital-then-lower in `HttpClient`, `HttpRequest`). No within-package collisions.
- **Category:** 3 (acronym casing).

### 40. No `wkt` (well-known types), `FieldMask`, or `time` imports
Unlike `dataquality` and other newer packages, this package has no `Timestamp`, `FieldMask`, or `Duration` fields. The lack of these is consistent with the package being older and frozen (deprecated) — newer features were added to `dataquality` instead.

### 41. `qualitymonitor` lowercase package name vs `quality-monitors` wire path vs `QualityMonitor` types
Same shape as the `dataquality` casing observation: directory is one collapsed word (`qualitymonitor`), wire path is kebab-plural (`/quality-monitors`), TS types are PascalCase singular (`QualityMonitor`). The directory plural-vs-singular question (relative to `qualitymonitors`) is unique to this package family.
- **Category:** 3 (casing inconsistency), 9 (singular/plural mismatch).

### 42. Entire package is `@deprecated` per JSDoc
Every method's JSDoc starts with `Deprecated: Use Data Quality Monitoring API instead (/api/data-quality/v1/monitors).` — i.e., the package itself should not be used in new code. The TS surface does not surface this with `@deprecated` tags (#27), so IDE tooling does not strike through call sites. This is the single most important fact about this package and it is documented only inside method bodies.

## Domain glossary
- `uc` / Unity Catalog — implicit across the package (the monitored resource is a UC schema).
- `quality monitor` — the long-lived configuration entity (one per UC schema) holding anomaly-detection config and validity checks.
- `anomaly detection` — periodic workflow that compares incoming data against historical patterns to flag anomalies.
- `validity check` — an input-data constraint (null %, range, uniqueness) evaluated during anomaly detection.
- `custom scalar check` — a templated SQL query that produces a single value, compared against per-column thresholds.
- `column matcher` — a binding from a template variable in the SQL query to a list of candidate column names.
- `threshold` — a `{boundValue, thresholdType}` pair where `thresholdType ∈ {AUTO, UNBOUNDED, MANUAL}` and `boundValue` is meaningful only when type is `MANUAL`.
- `job type` — classifies an anomaly-detection job as `NORMAL` or `INTERNAL_HIDDEN`.
- `run status` — eight-value lifecycle: `RUNNING`, `PENDING`, `CANCELED`, `SUCCESS`, `FAILED`, `JOB_DELETED`, `WORKSPACE_MISMATCH_ERROR` (+ sentinel `UNKNOWN`).
- `object type` / `object id` — stringly-typed reference to a UC object (currently always a schema).
- `refresh`, `monitor cron schedule`, `dashboard`, `notifications`, `data classification config` — none of these appear in this package; they all live in the sibling `qualitymonitors` (plural, v1) package.

## File coverage
- `src/v2/model.ts` (512 lines): read fully.
- `src/v2/client.ts` (233 lines): read fully.
- `src/v2/utils.ts` (150 lines): read fully.
- `src/v2/index.ts` (29 lines): read fully.
