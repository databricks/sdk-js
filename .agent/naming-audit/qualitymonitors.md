# Naming Audit: qualitymonitors

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/qualitymonitors/src/v1/`
**Versions audited:** v1
**Inferred domain:** Lakehouse Monitoring on Unity Catalog tables (legacy/deprecated surface). The package models a `Monitor` per UC table with an `analysisConfig` chosen from `InferenceLog` / `TimeSeries` / `Snapshot`, scheduled refreshes (`Cancel` / `Get` / `List` / `Run`), Quartz cron scheduling, custom metric definitions (`Aggregate`/`Derived`/`Drift`), data classification toggles, dashboard regeneration, and notification routing on failure and on new classification tags. **Every** client method JSDoc starts with "Deprecated: Use Data Quality Monitors API instead (/api/data-quality/v1/monitors)" — this entire package is a deprecated wire-compatible facade for the `dataquality` package.
**Total weird names flagged:** 50

## CRITICAL: TWO co-existing packages with the same domain

Three packages in this repository overlap on the same domain at the wire level:

| Package directory | npm name | Version(s) | Wire path | Resource type | Domain object |
| --- | --- | --- | --- | --- | --- |
| `qualitymonitors` (plural, **this audit**) | `@databricks/sdk-qualitymonitors` | v1 | `/api/2.1/unity-catalog/tables/{name}/monitor` and `/api/2.1/quality-monitoring/...` | `DataMonitorInfo` | `Monitor` (per UC table) |
| `qualitymonitor` (singular) | `@databricks/sdk-qualitymonitor` | v2 | undetermined (anomaly-detection oriented) | `QualityMonitor` | `QualityMonitor` (per UC schema, anomaly detection) |
| `dataquality` | `@databricks/sdk-dataquality` | v1 | `/api/data-quality/v1/monitors` | `Monitor` | `Monitor` (per UC schema or table, both flavours) |

**Why this matters:**

1. **Singular/plural mismatch between packages.** Every other package in this repo (e.g. `apps`, `alerts`, `clusters`, `jobs`) uses plural for the package name. The fact that we have *both* `qualitymonitor` and `qualitymonitors` co-existing is a violation of any consistent convention. One of them is wrong. (Audit-rule category 9: singular/plural mismatch at the package level.)
2. **Domain duplication.** `dataquality` is documented in its own client JSDoc as the *replacement* for `qualitymonitors`. Both packages are exported to users today. A consumer of the SDK who installs `@databricks/sdk-qualitymonitors` and `@databricks/sdk-dataquality` gets two `Client` classes for the same domain with subtly different shapes.
3. **Three names for the "monitor" entity in three sibling packages.** `qualitymonitors.DataMonitorInfo`, `qualitymonitor.QualityMonitor`, `dataquality.Monitor`. The same wire concept (a monitor on a UC table) is named three different ways across the SDK. (Audit-rule category 12: duplicate concept, surfaced across packages.)
4. **All client methods in this package carry a "Deprecated" prefix in their JSDoc.** Yet the package is shipped, exported from `index.ts`, and has its own client class — a deprecation marker in the doc string is not a TypeScript-level deprecation. There is no `@deprecated` JSDoc tag, so editors will not flag usage.

**Recommendation:** Decide on one package name and merge / dual-publish. Rename `qualitymonitors` → either retired (and `dataquality` becomes the sole source of truth) or renamed to `qualitymonitorslegacy`. The current state is the worst of all worlds: two near-identical packages with names that differ by a single letter, neither flagged as deprecated at the TS level.

## Summary
| Severity | Count |
| --- | --- |
| High | 10 |
| Medium | 24 |
| Low | 10 |
| Observation | 6 |

## High severity

### 1. Package name `qualitymonitors` collides with sibling `qualitymonitor` (singular)
- **Why weird:** Two npm packages, `@databricks/sdk-qualitymonitors` and `@databricks/sdk-qualitymonitor`, both ship from this repository, on different versions (v1 vs v2), differing by one trailing `s`. The two packages handle overlapping wire surfaces (this one targets UC tables; the singular targets UC schemas with anomaly detection). A package consumer scanning npm sees two near-identical names with no human-readable cue as to which to pick.
- **Category:** 9 (singular/plural mismatch — at the package boundary), 12 (duplicate concept).
- **Suggested name:** Pick one (`qualitymonitor` or `qualitymonitors`) and consolidate. If both must remain, rename this one to `qualitymonitorslegacy` to make the deprecation visible at the package boundary.
- **Rationale:** Package-level naming is the first cue a user gets. Singular vs plural in two npm names is a UX trap.

### 2. `DataMonitorInfo` — `src/v1/model.ts:213`
- **Why weird:** The package's central response type is named `DataMonitorInfo`, but no other domain type in the package uses the `Data` prefix. The companion request types are now `CreateMonitorRequest`, `UpdateMonitorRequest`, `DeleteMonitorRequest`, `GetMonitorRequest` — they all carry the `Request` suffix and the `Monitor` noun, but the response alone is `DataMonitorInfo`, with `Data` and `Info` as filler.
- **Category:** 1 (vague — `Data` and `Info` are noise), 8 (redundant suffix — `Info`), 17 (inconsistent — every other monitor type in the package uses the `Monitor` stem; only this one prepends `Data` and appends `Info`), 20 (type-suffix tautology — `Info` adds no semantic content).
- **Suggested name:** `Monitor`.
- **Rationale:** Every API in the client (`createMonitor`, `getMonitor`, `updateMonitor`) returns this type. Naming it `Monitor` aligns with the API verbs and with the sister `dataquality` package which already calls it `Monitor`. The `Data` and `Info` syllables are dead context.

### 3. `Client` class — `src/v1/client.ts:57`
- **Why weird:** A class literally named `Client` at the top of the package's public surface. A user importing two SDK packages (e.g., `@databricks/sdk-qualitymonitors` and `@databricks/sdk-dataquality`) cannot import both as `Client` without aliasing. There is no domain word in the name. The same problem exists across the entire generator and is called out in every audit, but it is especially acute here because two packages with similar names ship the same class name.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name).
- **Suggested name:** `QualityMonitorsClient` (or, after consolidation per #1, `QualityMonitorClient`).
- **Rationale:** Cross-package import collisions force users to alias.

### 4. `fullTableNameArg` field — `src/v1/model.ts:95,107,286,302,307,334,379,399,423`
- **Why weird:** The field name carries the `_Arg` suffix which is a generator artefact — the doc clarifies "This field corresponds to the {full_table_name_arg} arg in the endpoint path." `Arg` is a proto convention for "this is a URL path parameter, not a body field." In TS the body/path distinction is invisible to the caller; the suffix leaks the wire model. The same field appears identically in 9 of the 13 request types in the package, copy-pasted with the same JSDoc.
- **Category:** 5 (cryptic abbreviation — `Arg` for "argument"), 15 (generic naming via `Arg`).
- **Suggested name:** `tableFullName` (matches the rest of the SDK's UC fully-qualified name convention; e.g. `dataquality.AnomalyDetectionConfig.excludedTableFullNames`).
- **Rationale:** The `Arg` suffix advertises a wire artefact that has zero meaning at the TypeScript boundary. `tableFullName` is the established UC vocabulary across the SDK for three-part `catalog.schema.table` references.

### 5. `ProblemType` enum — `src/v1/model.ts:30-34`
- **Why weird:** `ProblemType` is a generic name for "what kind of ML problem is this table's data about". Without the JSDoc on `InferenceLogAnalysisConfig.problemType` ("Problem type the model aims to solve"), the reader cannot tell that `ProblemType` is ML-specific (vs the more general English meaning of "problem"). Sibling `dataquality` package uses `InferenceProblemType` for the same concept.
- **Category:** 1 (vague — `ProblemType` is generic), 17 (inconsistent across sibling packages).
- **Suggested name:** `InferenceProblemType` (matches `dataquality.InferenceProblemType`).
- **Rationale:** The generic `ProblemType` could mean anything outside ML. Cross-package parity with `dataquality` is the second motivation.

### 6. `RefreshState` enum + sentinel `UNKNOWN` vs `_UNSPECIFIED` elsewhere — `src/v1/model.ts:37-66`
- **Why weird:** Three flavors of "unset" sentinel coexist in this one file: `_UNSPECIFIED` (3 enums), `UNKNOWN` (1 enum, this one), `UNKNOWN_TRIGGER` (1 enum, `RefreshTrigger`). A user writing `if (refresh.state === RefreshState.UNKNOWN)` and `if (refresh.trigger === RefreshTrigger.UNKNOWN_TRIGGER)` in the same code block has to remember that the second has a suffix and the first does not.
- **Category:** 17 (inconsistent sentinel naming across sibling enums).
- **Suggested name:** Pick one sentinel name and apply uniformly across the file (either `_UNSPECIFIED` everywhere or `UNKNOWN` everywhere).
- **Rationale:** Sentinel-name consistency across sibling enums in the same file.

### 7. `RefreshTrigger.UNKNOWN_TRIGGER` — `src/v1/model.ts:73`
- **Why weird:** The "unset" sentinel is uniquely named `UNKNOWN_TRIGGER`, while sibling `RefreshState` uses `UNKNOWN` and the proto-prefixed enums use `_UNSPECIFIED`. Three different unset-sentinel conventions in this one file.
- **Category:** 17 (inconsistent sentinels).
- **Suggested name:** Align with the sentinel chosen in #6.
- **Rationale:** Same as #6 — sentinel consistency.

### 8. `SchedulePauseStatus` — `src/v1/model.ts:84-88`
- **Why weird:** Three-value enum (`UNSPECIFIED`, `UNPAUSED`, `PAUSED`) for a binary on/off concept. Sibling `dataquality.CronSchedulePauseStatus` has the same shape and was flagged there. Boolean would suffice. The `UNSPECIFIED` sentinel also has no clear semantics (is a schedule with `pauseStatus = UNSPECIFIED` running or stopped?).
- **Category:** 11 (trivial enum where boolean would suffice).
- **Suggested name:** Collapse to `paused?: boolean` on `MonitorCronSchedule`.
- **Rationale:** "Paused" is binary. Other packages (`jobs`, `alerts`) already use `paused: boolean`.

### 9. `analysisConfig` discriminated union with `$case` discriminator — `src/v1/model.ts:122-135,221-234,432-444`
- **Why weird:** Same shape as `dataquality.DataProfilingConfig.analysisConfig` (audit #10 in that package). The field is named `analysisConfig`, but its arms are types named `InferenceLogAnalysisConfig`, `TimeSeriesAnalysisConfig`, `SnapshotAnalysisConfig` — three names ending in `AnalysisConfig`. The discriminator is `$case`, the arm key matches the arm payload type's prefix (e.g., `inferenceLog` for `InferenceLogAnalysisConfig`). Naming the variants `$case` is a ts-proto convention foreign to TypeScript culture; the more idiomatic discriminator is `kind` or `type`.
- **Category:** 1 (vague — `$case` is unusual TS), 12 (duplicate concept — `AnalysisConfig` repeated 3 times), 20 (type-suffix tautology — `AnalysisConfig` on every arm).
- **Suggested name:** Field name: `analysis`. Discriminator: `kind: 'inferenceLog' | 'timeSeries' | 'snapshot'`. Arm payloads: keep `InferenceLogAnalysisConfig` or rename to `InferenceLogAnalysis` / `TimeSeriesAnalysis` / `SnapshotAnalysis`.
- **Rationale:** `$case` is a ts-proto idiom; in idiomatic TS you write `if (config.analysis.kind === 'inferenceLog')`, not `if (config.analysisConfig?.$case === 'inferenceLog')`.

### 10. `CreateMonitorRequest`, `UpdateMonitorRequest`, `DataMonitorInfo` carry **17 duplicated fields** — `src/v1/model.ts:102-180,213-279,418-489`
- **Why weird:** Three types share a 17-field overlap (outputSchemaName, assetsDir, analysisConfig, slicingExprs, customMetrics, baselineTableName, schedule, notifications, dataClassificationConfig, tableName, status, latestMonitorFailureMsg, profileMetricsTableName, driftMetricsTableName, dashboardId, monitorVersion, fullTableNameArg). Each is copy-pasted with the same JSDoc and the same `[Create:REQ Update:REQ]`-style annotation in the comment. The "annotation in the comment" tells the reader which fields are required at create vs update vs read — but is never enforced by the type system.
- **Category:** 6 (misleading — type says optional, semantics say required-at-create), 7 (overly verbose — three nearly-identical types where one with a generic param could do).
- **Suggested name:** One `Monitor` interface for the read shape; `CreateMonitorRequest` and `UpdateMonitorRequest` carry only their differences (e.g., `CreateMonitorRequest` has the input-only `skipBuiltinDashboard` and `warehouseId`). Or use TypeScript's `Pick`/`Omit`/`Partial` to derive types from a base. Encode `[Create:REQ Update:IGN]` in the type system (not the doc): non-optional in `CreateMonitorRequest`, omitted in `UpdateMonitorRequest`.
- **Rationale:** The current state is a maintenance hazard — adding a field requires editing three places. Worse, the wire-side `[Create:REQ ...]` semantics live only in comments.

## Medium severity

### 11. `[Create:REQ Update:REQ]` doc-comment annotations — `src/v1/model.ts:115,118,122,136,145,148,153,155,157,159,161,163,165,167,169,174` (and again for `DataMonitorInfo` and `UpdateMonitorRequest`)
- **Why weird:** Every field on `CreateMonitorRequest` / `UpdateMonitorRequest` / `DataMonitorInfo` has a prefix annotation in its JSDoc — `[Create:REQ Update:REQ]`, `[Create:OPT Update:OPT]`, `[Create:ERR Update:IGN]` — that encodes per-operation requirement semantics in the comment. These are generator markers, not human-friendly. A user opening the JSDoc tooltip sees `[Create:ERR Update:IGN]` and must decode "ERR means errors if you pass this, IGN means it's ignored on update". The TypeScript type does not enforce any of this.
- **Category:** 6 (misleading — comment marker pretends to be authoritative but is not enforced), 18 (long, noisy comment prefix).
- **Suggested name:** Remove the markers from comments. Encode the semantics in the type (separate `CreateMonitorRequest` vs `UpdateMonitorRequest` vs `Monitor` types with the right optionality and field presence).
- **Rationale:** Doc markers are not type-checked. They look like type annotations but are inert.

### 12. `latestMonitorFailureMsg` — `src/v1/model.ts:164,263,473`
- **Why weird:** Three problems in one field name. (a) `Msg` is an abbreviation for `Message` — sister field on `RefreshInfo` is `message` (full word), and `dataquality.DataProfilingConfig` uses `latestMonitorFailureMessage` (full word). Inconsistency within the SDK. (b) `Monitor` is in the path — `monitor.latestMonitorFailureMsg` repeats "monitor". (c) The field is documented as `[Create:ERR Update:IGN]` (read-only, server-populated), but the type does not mark it.
- **Category:** 5 (cryptic abbreviation — `Msg`), 7 (overly verbose), 8 (redundant `Monitor` in path), 17 (inconsistent with sibling `message` and with `dataquality`).
- **Suggested name:** `latestFailureMessage`.
- **Rationale:** Full word, no redundant prefix; matches `dataquality`.

### 13. `profileMetricsTableName` and `driftMetricsTableName` — `src/v1/model.ts:166,168,265,267,475,477`
- **Why weird:** Pair of fields with the suffix `TableName`. Sibling Zod field is `profile_metrics_table_name` — six tokens on the wire. JSDoc on both: identical except for the leading noun. The naming pattern is consistent within the pair but verbose. Compare with `dataquality.DataProfilingConfig.{profileMetricsTableName, driftMetricsTableName}` (same names — at least consistent across packages).
- **Category:** 7 (overly verbose).
- **Suggested name:** `profileMetricsTable` / `driftMetricsTable` (drop `Name` — these are reference fields, not column names).
- **Rationale:** "Table" is sufficient context.

### 14. `outputSchemaName` field — `src/v1/model.ts:116,215,425`
- **Why weird:** JSDoc says "Schema where output tables are created. Needs to be in 2-level format `{catalog}.{schema}`." So `outputSchemaName` is a two-part UC reference, not just a name. Sister field `baselineTableName` is a three-part UC reference; `tableName` is also three-part. The naming gives no cue about which "name" shape applies.
- **Category:** 19 (underspecified — name vs full name vs two-part), 15 (generic name).
- **Suggested name:** `outputSchemaFullName` (matches UC vocabulary; the value is `catalog.schema`).
- **Rationale:** The "Name" suffix is ambiguous in UC contexts where the term `FullName` is reserved for fully qualified references.

### 15. `assetsDir` — `src/v1/model.ts:121,220,430`
- **Why weird:** Identical to `dataquality.DataProfilingConfig.assetsDir` (audit #12 in that package). `assets` is generic ("which assets?"), and `Dir` is an abbreviation. JSDoc says "absolute path to a custom directory to store data-monitoring assets".
- **Category:** 1 (vague), 5 (cryptic abbreviation — `Dir`).
- **Suggested name:** `assetsDirectory` or `monitoringAssetsPath`.
- **Rationale:** Same as `dataquality` #12.

### 16. `slicingExprs` — `src/v1/model.ts:144,243,453`
- **Why weird:** Identical to `dataquality.DataProfilingConfig.slicingExprs` (audit #25 in that package). `Exprs` truncates "Expressions".
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** `slicingExpressions` (or, for clarity, `columnSlicingExpressions`).
- **Rationale:** Same as `dataquality` #25.

### 17. `skipBuiltinDashboard` (negative boolean) — `src/v1/model.ts:109`
- **Why weird:** Same pattern as `dataquality.DataProfilingConfig.skipBuiltinDashboard` (audit #11 in that package). Negative boolean field name. Reading `skipBuiltinDashboard: true` requires a mental NOT-flip.
- **Category:** 6 (misleading), 13 (verb-tense — `skip` is action-y, field is state-y).
- **Suggested name:** `disableBuiltinDashboard` or invert to `createBuiltinDashboard: boolean`.
- **Rationale:** Same as `dataquality` #11.

### 18. `baselineTableName` — `src/v1/model.ts:152,251,461`
- **Why weird:** A three-part UC reference (per JSDoc: "Baseline table name") but the name says only `Name`. Same shape concern as #14.
- **Category:** 19 (underspecified ID — wire-side three-part name, not flagged as such).
- **Suggested name:** `baselineTableFullName`.
- **Rationale:** UC vocabulary uses `FullName` for three-part references.

### 19. `tableName` — `src/v1/model.ts:160,259,469`
- **Why weird:** Three-part UC reference per JSDoc ("UC table to monitor. Format: `catalog.schema.table_name`"), but the name says only `Name`. Compare with `fullTableNameArg` on the same types — *two* fields representing essentially the same UC table reference, one called `tableName` (`[Create:ERR Update:IGN]`) and one called `fullTableNameArg` (the URL path param). This is the same data appearing under two field names in the same interface.
- **Category:** 12 (duplicate concept — two fields for the same table reference), 19 (underspecified — three-part wire format hidden behind `Name`).
- **Suggested name:** Drop one of the two. If `tableName` (the body field) is truly read-only and copied from the URL path, remove it. Otherwise, rename to `tableFullName`.
- **Rationale:** Having both `tableName` and `fullTableNameArg` in the same type forces a caller to choose which to populate.

### 20. `dashboardId` is read-only at create, optional at update — `src/v1/model.ts:173,272,482`
- **Why weird:** JSDoc reads `[Create:ERR Update:OPT]`, meaning the field errors if set on create but is optional on update. Type marks both as optional. A caller writing `createMonitor({dashboardId: 'x', ...})` gets a runtime error from the API but no type-time signal. Same pattern as #12 in general; called out separately because `dashboardId` is one of the most likely fields to be mistakenly set.
- **Category:** 6 (misleading optionality).
- **Suggested name:** Move `dashboardId` out of `CreateMonitorRequest` entirely. Keep in `UpdateMonitorRequest` and `DataMonitorInfo`.
- **Rationale:** Type-level enforcement of "ERR" semantics.

### 21. `monitorVersion: number` — `src/v1/model.ts:179,278,488`
- **Why weird:** Field name says "monitor version" but on a type called `CreateMonitorRequest` / `UpdateMonitorRequest` / `DataMonitorInfo`, the `monitor` part is dead context. JSDoc also notes the field "has flexibility to take on negative values, which can indicate corrupted monitor_version numbers" — using a magic-value (negative) to indicate corruption is a code smell (the type should be `number | 'corrupted'` or split into `version: number` + `corrupted: boolean`).
- **Category:** 7 (overly verbose — `monitor` in path), 6 (misleading — magic-value encoding of corruption state).
- **Suggested name:** `version: number`.
- **Rationale:** Field path already gives Monitor context.

### 22. `warehouseId` only on `CreateMonitorRequest` and `RegenerateDashboardRequest`, not on `DataMonitorInfo` — `src/v1/model.ts:114,384`
- **Why weird:** `warehouseId` is an input-only field for picking a SQL warehouse to render the dashboard. Not on the response (`DataMonitorInfo`) — so a caller has no way to see which warehouse was actually chosen if they left this blank. Sibling `dataquality.DataProfilingConfig` has both `warehouseId` (input) and `effectiveWarehouseId` (output) — the latter is missing here. Inconsistent across two near-identical packages.
- **Category:** 17 (inconsistent — input-only vs input+output across sibling packages).
- **Suggested name:** Add `effectiveWarehouseId` to `DataMonitorInfo` to match `dataquality`.
- **Rationale:** Cross-package parity.

### 23. `Notifications` vs `dataquality.NotificationSettings` — `src/v1/model.ts:352`
- **Why weird:** Sister package uses `NotificationSettings`; this package uses just `Notifications`. The plural noun is fine, but the sister naming differs. Also: only one nested type, `Destination` (vs `dataquality.NotificationDestination`) — again one is shorter and one is longer.
- **Category:** 17 (inconsistent — sibling package uses different type names for the same concept).
- **Suggested name:** Pick one: either `Notifications` + `Destination` (this package's form) or `NotificationSettings` + `NotificationDestination` (sibling's form), and apply uniformly across both packages.
- **Rationale:** Consistency across sibling packages.

### 24. `Destination` — `src/v1/model.ts:292`
- **Why weird:** The `Destination` type holds only `emailAddresses?: string[]`. Naming a type for an email recipient list as `Destination` is generic. Compare with sister `dataquality.NotificationDestination` which has the same shape. The name `Destination` reads as "a place"; the content is "a list of email addresses".
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `EmailDestination` (matches content), or merge with `Notifications` if there's only one channel.
- **Rationale:** Generic noun for a specific data shape.

### 25. `onNewClassificationTagDetected` field — `src/v1/model.ts:356`
- **Why weird:** Five-word field name (`on` + `New` + `Classification` + `Tag` + `Detected`) — past-tense verb at the end of a noun phrase. The doc says "Destinations to send notifications on new classification tag detected." The grammatical structure is awkward English. Sister `Notifications.onFailure` is concise (two words, no verb tense problem).
- **Category:** 7 (overly verbose), 13 (verb tense — past-participle at the end of a field name).
- **Suggested name:** `onNewClassificationTag` (drop `Detected`; the field is on `Notifications` so the verb is implicit).
- **Rationale:** Length and clarity. The `Detected` adds no information.

### 26. `Notifications.onFailure: Destination` — `src/v1/model.ts:354`
- **Why weird:** Field name says only "failure"; the comment hints at more ("notifications on failure/timeout") — same caveat as `dataquality.NotificationSettings.onFailure` (audit #33 in that package). Field name and JSDoc disagree on whether timeouts are included.
- **Category:** 1 (vague), 17 (inconsistent doc/name).
- **Suggested name:** `onFailureOrTimeout` (matches doc) or `onFailure` (matches name; update doc).
- **Rationale:** Same as `dataquality` #33.

### 27. `Notifications` field name uses plural but each value is a single `Destination` — `src/v1/model.ts:352-357`
- **Why weird:** The type is plural (`Notifications`) but each field (`onFailure`, `onNewClassificationTagDetected`) holds a single `Destination`, not an array. The plural-vs-singular doesn't match the content. Compare: `dataquality.NotificationSettings` (singular type, singular fields).
- **Category:** 9 (singular/plural mismatch — type plural, content singular).
- **Suggested name:** `NotificationSettings` (matches `dataquality`).
- **Rationale:** Same as `dataquality` parity.

### 28. `InferenceLogAnalysisConfig.problemType: ProblemType` — `src/v1/model.ts:314`
- **Why weird:** Field name does not say "ML"; type is the generic `ProblemType` (#5). The reader has no cue from the field name that this is ML-specific.
- **Category:** 1 (vague — `problemType` alone is generic).
- **Suggested name:** `mlProblemType: InferenceProblemType` (relying on rename of the enum per #5).
- **Rationale:** Disambiguate from generic English meaning.

### 29. `predictionProbaCol` — `src/v1/model.ts:326`
- **Why weird:** `Proba` is a Python ML idiom for "probability" — sklearn `predict_proba` etc. In a TS API, the name leaks the upstream Python convention. JSDoc says "Column for prediction probabilities" — uses the full word.
- **Category:** 5 (cryptic Python-ML abbreviation), 14 (foreign-ecosystem idiom).
- **Suggested name:** `predictionProbabilityCol` (or `predictionProbabilitiesCol`).
- **Rationale:** Python's `predict_proba` is sklearn vocabulary; a TS SDK should not require knowing sklearn to read field names.

### 30. `timestampCol`, `predictionCol`, `labelCol`, `modelIdCol`, `predictionProbaCol` (Col suffix) — `src/v1/model.ts:316,320,322,324,326`
- **Why weird:** `Col` is an abbreviation for `Column`. Five fields on `InferenceLogAnalysisConfig` use it. Same in `TimeSeriesAnalysisConfig.timestampCol`. TS has no length constraint.
- **Category:** 5 (cryptic abbreviation — `Col`).
- **Suggested name:** `timestampColumn`, `predictionColumn`, `labelColumn`, `modelIdColumn`, `predictionProbabilityColumn`.
- **Rationale:** Full words; matches `dataquality.InferenceLogConfig` if that package has the same pattern (worth cross-checking).

### 31. `modelIdCol` — `src/v1/model.ts:324`
- **Why weird:** `Id` ambiguity flagged across the SDK. `modelIdCol` — the column in the user's table that holds a model identifier — could be any UC ID or a free-form model version string. JSDoc says only "Column for the model identifier."
- **Category:** 19 (underspecified ID — what *kind* of model ID?).
- **Suggested name:** Document, or rename to `modelVersionColumn` if that is what the wire expects.
- **Rationale:** "Model ID" in Databricks could mean MLflow run ID, MLflow model version, registered model name, or a customer-chosen string.

### 32. `MonitorCronSchedule` vs `dataquality.CronSchedule` — `src/v1/model.ts:343`
- **Why weird:** Same wire shape, different type names. Sister `dataquality.CronSchedule` drops the `Monitor` prefix. The prefix here is dead context — this type only ever lives on a `Monitor`.
- **Category:** 8 (redundant prefix — `Monitor` is in the access path).
- **Suggested name:** `CronSchedule` (matches `dataquality`).
- **Rationale:** Cross-package consistency.

### 33. `quartzCronExpression` (leaks library name) — `src/v1/model.ts:345`
- **Why weird:** Same as `dataquality.CronSchedule.quartzCronExpression` (audit #30 in that package). `Quartz` is a Java scheduling library; users do not need to know that.
- **Category:** 14 (implementation-detail leak).
- **Suggested name:** `cronExpression`.
- **Rationale:** Same as `dataquality` #30.

### 34. `timezoneId` — `src/v1/model.ts:347`
- **Why weird:** Same as `dataquality.CronSchedule.timezoneId` (audit #30 in that package). `Id` for what is in fact an IANA timezone name (e.g., `America/New_York`) — the field is a tz name, not an "ID" in the database sense.
- **Category:** 19 (misnamed — calling a tz name an `Id`), 5 (jargon).
- **Suggested name:** `timezone` (matches JS-standard `Intl.DateTimeFormat.timeZone`).
- **Rationale:** IANA tz names are not IDs in the UUID sense.

## Low severity

### 35. `flattenQueryParams` exported but unused — `src/v1/utils.ts:123`
- **Why weird:** Same as `dataquality` audit #35. Helper exported but never called from `client.ts`.
- **Category:** 6 (misleading — looks used; isn't).
- **Suggested name:** N/A — unexport.
- **Rationale:** Dead exported surface.

### 36. `executeCall` vs `executeHttpCall` — `src/v1/utils.ts:26,65`
- **Why weird:** Same as `dataquality` audit #36.
- **Category:** 1, 12, 17.
- **Suggested name:** `runWithRetry` (outer) + `sendHttpRequest` (inner).
- **Rationale:** Layering should be readable from names.

### 37. `buildHttpRequest` — `src/v1/utils.ts:96`
- **Why weird:** Same as `dataquality` audit #37 — "build" hints at builder pattern, function spreads literals.
- **Category:** 1, 6.
- **Suggested name:** `makeHttpRequest`.
- **Rationale:** "Make" matches the reality.

### 38. `readAll` — `src/v1/utils.ts:40`
- **Why weird:** Same as `dataquality` audit #39. "ReadAll" does not say "drain a stream".
- **Category:** 1, 5.
- **Suggested name:** `drainStream`.
- **Rationale:** Self-describing.

### 39. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Same as `dataquality` audit #40. Internal context bag named `Options` — collides with the public `CallOptions` /  `ClientOptions` semantics.
- **Category:** 1, 8.
- **Suggested name:** `HttpCallContext`.
- **Rationale:** Reserve `Options` for user-tunable knobs.

### 40. `PACKAGE_SEGMENT` — `src/v1/client.ts:52`
- **Why weird:** Same as `dataquality` audit #41.
- **Category:** 1.
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Domain-word missing.

### 41. `Call` type + `call` variable name collision in every method — `src/v1/client.ts:93,136,177,220,258,296,339,382,424`
- **Why weird:** Same as `dataquality` audit #42. Variable `call: Call` in 9 methods.
- **Category:** 1, 12.
- **Suggested name:** `request` (variable).
- **Rationale:** Type/variable collision.

### 42. `respBody` vs `resp` — every method in `client.ts`
- **Why weird:** Same as `dataquality` audit #44. Two variables differ only by `Body`.
- **Category:** 5, 17.
- **Suggested name:** `rawBody` + `result`.
- **Rationale:** Distinguish by meaningful nouns.

### 43. `httpReq` local — every method in `client.ts`
- **Why weird:** Same as `dataquality` audit #45.
- **Category:** 5, 12.
- **Suggested name:** `httpRequest`.
- **Rationale:** No abbreviation.

### 44. `req.fullTableNameArg ?? ''` URL composition — `src/v1/client.ts:90,133,175,218,256,294,336,379,421`
- **Why weird:** Same as `dataquality` audit #43. `fullTableNameArg` typed optional but required in practice; silent empty-string substitution yields URLs like `/api/2.1/unity-catalog/tables//monitor`.
- **Category:** 6.
- **Suggested name:** Make `fullTableNameArg` non-optional on every request type.
- **Rationale:** Type should match runtime requirement.

## Observations

### 45. Every method's first JSDoc line is "Deprecated: Use Data Quality Monitors API instead"
- **Note:** All 9 client methods (`cancelRefresh`, `createMonitor`, `deleteMonitor`, `getMonitor`, `getRefresh`, `listRefreshes`, `regenerateDashboard`, `runRefresh`, `updateMonitor`) start their JSDoc with that sentence. None uses the `@deprecated` JSDoc tag, so editors do not render the deprecation visually. The package is deprecated in spirit, but live in build.

### 46. Acronym casing
- `Id` (capital-then-lower in `refreshId`, `dashboardId`, `warehouseId`, `monitorVersion`); `Ms` (`startTimeMs`, `endTimeMs`); `Http` (in imported types). No within-package collisions, all generator-emitted.
- **Category:** 3 (acronym casing).

### 47. URL paths mix `unity-catalog` and `quality-monitoring`
- **Note:** Eight of nine methods use `/api/2.1/unity-catalog/tables/{}/monitor[/...]`; one (`regenerateDashboard`) uses `/api/2.1/quality-monitoring/tables/{}/monitor/dashboard`. The package name does not match either prefix. The sister `dataquality` package uses `/api/data-quality/v1/monitors`.
- **Category:** 17 (inconsistent — package name vs wire path).

### 48. No `FieldMask` types
- This package does not have any `FieldMask<...>` types (unlike `dataquality`). The deprecated API does not support partial updates via field masks; the entire monitor body is replaced on `PUT`. (Listed as observation to contrast with sibling packages.)

### 49. Verb consistency
- `Cancel`, `Create`, `Delete`, `Get`, `List`, `Regenerate`, `Run`, `Update` — eight different verbs in nine methods. Within the package the verbs are appropriate and consistent. The unusual one is `Regenerate` (vs `Recreate` or `RebuildDashboard`) — generator-driven choice, fine in context.
- **Category:** 17 (verb inventory, none inconsistent).

### 50. `Notifications` is a slim type with two channel fields
- Two-channel `Notifications` (`onFailure`, `onNewClassificationTagDetected`) follows the proto shape. A TS-idiomatic shape might be `notifications: Array<{channel: 'failure' | 'newClassificationTag', destination: Destination}>` to allow future expansion. Listed as observation, not a flag.

## Domain glossary
- `uc` / Unity Catalog — the resource container for the monitored table.
- `inference log` — predictions + labels + (optional) probabilities for a deployed ML model.
- `time series` — analysis configuration where rows have a timestamp column and are bucketed by granularity.
- `snapshot` — analysis configuration with no time dimension; the table is treated as a single snapshot.
- `refresh` — a single run of the monitoring pipeline; produces metric rows in `profileMetricsTableName` / `driftMetricsTableName`.
- `monitor` — the long-lived per-table configuration entity.
- `baseline table` — a separate table whose statistics drift is computed against.
- `profile metrics` / `drift metrics` — two distinct output tables; profile = per-window distribution stats, drift = stats compared against baseline or previous window.
- `quartz` — Apache Quartz Scheduler (Java library); leaks via `quartzCronExpression`.
- `assets dir` — workspace directory holding the dashboard and other monitor assets.
- `slicing exprs` — column expressions to group data by for targeted analysis.
- `data classification` — automated tagging of columns by data type / PII / etc.; controlled by `dataClassificationConfig.enabled` and `Notifications.onNewClassificationTagDetected`.
- `proba` — Python ML idiom for "probability" (sklearn `predict_proba`).
- `oss`, `m2m`/`u2m`/`pat`, `iam`, `abac` — not encountered.

## File coverage
- `src/v1/model.ts` (935 lines): read fully.
- `src/v1/client.ts` (441 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (39 lines): read fully.

## Fixed

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
</content>
</invoke>