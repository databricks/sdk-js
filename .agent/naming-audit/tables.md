# Naming Audit: `tables` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/uc/tables/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`, `src/v1/transport.ts`
**Package import path:** `@databricks/sdk-tables/v1`
**Domain:** Unity Catalog tables (`/api/2.1/unity-catalog/tables`,
`/api/2.1/unity-catalog/constraints`, `/api/2.1/unity-catalog/table-summaries`).

**Go reference:** `databricks/sdk-go` `databricks/api/` (the 1:1 port source).

---

## Summary (counts)

| Severity              | Count |
| --------------------- | ----- |
| High                  | 4     |
| Medium                | 6     |
| Pass / acceptable     | 6     |
| **Total findings**    | **16** |

(Findings often span multiple audit categories; counts above are unique
findings.)

---

## Findings

### 1. `Kv` is a cryptic abbreviation in `DeltaRuntimePropertiesKvPairs` — category 5 (Cryptic abbreviations) and category 8 (Redundant suffixes)

**Symbol:** `DeltaRuntimePropertiesKvPairs` (model.ts:401).

**Issue:** `Kv` (key-value) is borderline cryptic for a TypeScript API; the
"Pairs" suffix is redundant if `Kv` already means key-value. The type holds
a single `Record<string, string>` field — both the prefix `Kv` and the
suffix `Pairs` redundantly state what the field's type already says.

**Suggested:** `DeltaRuntimeProperties` (drop `KvPairs` entirely; the field
content `deltaRuntimeProperties: Record<string, string>` makes it
self-describing).

---

### 2. `ListTablesRequest.maxResults` and `pageToken` paginate negatively-documented semantics — category 6 (Misleading names) — *pass with note*

**Symbol:** `ListTablesRequest.maxResults?: number | undefined`
(model.ts:530), JSDoc: "Maximum number of tables to return. If not set, all
the tables are returned (not recommended)."

The pagination docstring is long and warns that unpaginated calls will be
deprecated. The naming is fine; the API behaviour is the issue.

**Pass on naming.**

---

### 3. `ColumnInfo.position` underspecified field — category 1 (Vague/generic)

**Symbol:** `ColumnInfo.position?: number | undefined` (model.ts:244).
JSDoc: "Ordinal position of column (starting at position 0)."

**Issue:** Bare `position` (number) — a consumer cannot tell from the
field name that it's 0-indexed. The JSDoc clarifies.

**Suggested:** **Pass with note** — the field is short and conventional.

---

### 4. `OptionSpec` has many `is…` boolean fields — category 17 (Inconsistent action verbs) — *pass with note*

**Symbols:** `OptionSpec.isRequired` (model.ts:586),
`OptionSpec.isSecret` (model.ts:588), `OptionSpec.isHidden` (model.ts:590),
`OptionSpec.isUpdatable` (model.ts:592), `OptionSpec.isLoggable`
(model.ts:596), `OptionSpec.isCreatable` (model.ts:598),
`OptionSpec.isCopiable` (model.ts:600).

The boolean fields all use the `is…` prefix, which is the right convention
for booleans. **Pass on naming.**

(The number of booleans on `OptionSpec` (7+) is itself a code smell — the
type packs configuration for a UI form, with each boolean controlling a
different aspect of display. A consumer struggling to set all of these
correctly may want a richer type. **Note for upstream.**)

---

### 5. `EffectivePredictiveOptimizationFlag.value` is a generic field on a specific type — category 1 (Vague/generic) and category 15 (Generic field names losing meaning)

**Symbol:** `EffectivePredictiveOptimizationFlag.value?: string`
(model.ts:433). JSDoc: "Whether predictive optimization should be enabled
for this object and objects under it."

**Issue:** The type's *purpose* is to indicate whether PO is enabled. The
field name `value` says nothing about that — the generic `value` token
loses the domain meaning the type name carries.

**Suggested:** rename the field to reflect its meaning (e.g.
`predictiveOptimization`, matching the type's "enabled" sense).

---

### 6. `EffectivePredictiveOptimizationFlag.inheritedFromType` / `inheritedFromName` — category 17 (Inconsistent action verbs)

**Symbols:** `EffectivePredictiveOptimizationFlag.inheritedFromType?: string`
(model.ts:435), `EffectivePredictiveOptimizationFlag.inheritedFromName?: string`
(model.ts:437).

**Issue:** Two fields describing the source of inheritance — the object
type ("CATALOG"|"SCHEMA"|…) and the object's name. Naming is OK, but the
suffix pair `…Type` / `…Name` repeats inside one struct that has only
three fields.

**Pass with note** — the current flat form is wire-faithful.

---

### 7. `TablesClient.createTable` / `deleteTable` / `getTable` / `updateTable` / `listTables` / `tableExists` — *pass*

Standard `{verb}{Resource}` shape. Convention. **Pass.**

(Note: `TablesClient.tableExists` (client.ts:495) breaks the verb-first
pattern — it reads `noun-verb` instead of `verb-noun`. The corresponding
shape in other SDKs is `existsTable` or `checkTableExists`. **Flag at
SDK-wide level.**)

---

### 8. `TablesClient.createTableConstraint` / `deleteTableConstraint` — *pass*

Same `{verb}{Resource}` pattern. **Pass.**

---

### 9. `TablesClient` private fields `host`, `workspaceId`, `httpClient`, `logger`, `userAgent` — *pass*

Standard. **Pass.**

---

### 10. Singular/plural — package name `tables` vs type names singular — category 9 (Singular/plural mismatch) — *pass*

Package: `@databricks/sdk-tables` (plural — collection). Types: `TableInfo`,
`TableSummary`, `TableConstraint`, etc. (singular — one item). SDK-wide
pattern. **Pass.**

---

### 11. `_PropertiesEntry` / `_DeltaRuntimePropertiesEntry` underscore-suffixed proto map-entry type names — category 4 (Underscores in TS identifiers)

**Symbols:** `CreateTableRequest_PropertiesEntry` (model.ts:363),
`DeltaRuntimePropertiesKvPairs_DeltaRuntimePropertiesEntry` (model.ts:407),
`TableInfo_PropertiesEntry` (model.ts:783),
`UpdateTableRequest_PropertiesEntry` (model.ts:870).

**Issue:** Underscores in PascalCase identifiers are not idiomatic TS
(Google style guide § 5.1 disallows them; the generated code carries an
`eslint-disable-next-line @typescript-eslint/naming-convention` comment
above each, at model.ts:362, 406, 782, 869). The underscores survive from
the proto's nested map-entry message naming. None of these four types is
referenced anywhere — the actual map fields use `Record<string, string>`
(e.g. `CreateTableRequest.properties`, model.ts:359) — yet they are still
declared and re-exported from `index.ts`.

**Suggested:** drop the map-entry types entirely; `Record<string, string>`
is sufficient and is already what the fields use.

**Flag for SDK-wide generator cleanup.**

---

### 12. `OptionSpec_OauthStage` / `OptionSpec_OptionType` proto-nested infix — file:line model.ts:213, 226

**Why:** Underscore-separated `OuterMessage_InnerEnum` naming is a literal
transcription of proto nested-enum scoping. The infix `_` and the
container-prefix on a sibling enum is a proto/grpc architectural leak;
TypeScript has no nested-enum concept.

**Category:** proto-architectural-leak (`Proto` infix / Go-Java nested-name
form).

**Suggested:** `OauthStage` and `OptionType` (drop the `OptionSpec_`
prefix) — or, if collision risk exists, `OptionOauthStage` /
`OptionTypeKind`.

**Rationale:** the `OptionSpec_` prefix exists solely to mirror the proto
nesting; the eslint-disable comments on lines 212, 225 acknowledge the
non-idiomatic shape.

---

### 13. `OptionSpec` type name carries a `Spec` config-suffix — file:line model.ts:565

**Why:** `Spec` is a generic config-style suffix that re-appears across
the file (`SecurableKindManifest`, `EffectivePredictiveOptimizationFlag`,
`SseEncryptionDetails`, `EncryptionDetails`). It echoes proto/k8s
"Spec"-shaped messages whose only job is to describe a struct.

**Category:** proto-architectural-leak (repeated `Spec` config-suffix).

**Suggested:** `Option` (the type already lives in `SecurableKindManifest.options`
and is self-describing) or `OptionDefinition`.

**Rationale:** the `Spec` suffix adds no domain meaning beyond "this is a
struct describing X" — a proto convention, not a TS one.

---

### 14. `SecurableKindManifest` type name — file:line model.ts:650

**Why:** `Manifest` is a config-style suffix (analogous to `Spec`/`Config`).
It tags the type as a descriptor message rather than a domain concept.

**Category:** proto-architectural-leak (config-suffix style).

**Suggested:** `SecurableKindCapabilities` (matches `capabilities` field
content) or fold into a richer `SecurableKind`-keyed structure.

**Rationale:** the type holds five fields (`securableType`, `securableKind`,
`assignablePrivileges`, `options`, `capabilities`) — the `Manifest` token
adds no information beyond "this is the descriptor".

---

### 15. `ColumnInfo`, `TableInfo`, `TableSummary` — repeated `Info`/`Summary` config-suffix — file:line model.ts:237, 711, 788

**Why:** `Info` and `Summary` are generic descriptor-suffixes used to
distinguish the wire/RPC message from the domain noun (`Column`, `Table`).
Two `…Info` types and a `…Summary` type in the same file flag this as a
repeated config-suffix pattern.

**Category:** proto-architectural-leak (repeated `Info` config-suffix).

**Suggested:** `Column`, `Table`, `TableOverview`.

**Rationale:** in a TS surface the noun *is* the type; the `Info`/`Summary`
tag exists only to disambiguate from the proto request/response messages
and from server-internal representations — a generator/architectural leak.

---

### 16. `EncryptionDetails` / `SseEncryptionDetails` — repeated `Details` config-suffix — file:line model.ts:441, 664

**Why:** Two `…Details` types in the same file. `Details` is a generic
"descriptor" suffix with no domain meaning — same family as `Info`/`Spec`.

**Category:** proto-architectural-leak (repeated `Details` config-suffix).

**Suggested:** `Encryption` and `SseEncryption` (or `SseEncryptionConfig`
if disambiguation is needed).

**Rationale:** `Details` is generator boilerplate for proto messages
wrapping `oneof`s or option blobs; idiomatic TS uses the bare domain noun.
