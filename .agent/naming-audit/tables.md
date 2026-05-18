# Naming Audit: `tables` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/tables/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`
**Package import path:** `@databricks/sdk-tables/v1`
**Domain:** Unity Catalog tables (`/api/2.1/unity-catalog/tables`,
`/api/2.1/unity-catalog/constraints`, `/api/2.1/unity-catalog/table-summaries`).

**Cross-package references:**

- `catalogs/v1`, `connections/v1` — also export `SecurableType`.
- `volumes/v1`, `externallocations/v1` — also export `EncryptionDetails`,
  `SseEncryptionAlgorithm`, `SseEncryptionDetails`.
- `catalogs/v1` — also defines `EffectivePredictiveOptimizationFlag`.
- `functions/v1`, `registeredmodels/v1` — also define the entire
  `Dependency` / `DependencyList` / `TableDependency` / `FunctionDependency` /
  `ConnectionDependency` / `CredentialDependency` / `VolumeDependency` /
  `SecretDependency` family.
- `functions/v1` — also exports `ColumnTypeName`.
- `abacpolicies/v1` — defines `RowFilterOptions` / `ColumnMaskOptions` which
  duplicate the role of this package's `RowFilter` / `ColumnMask`.
- `schemas/v1`, `functions/v1`, `registeredmodels/v1` — also use the
  `fullNameArg` request-field pattern.
- `onlinetables/v1`, `database/v1`, `postgres/v1`, `featurestore/v1` — also
  use the table-name modelling and the `MATERIALIZED_VIEW` /
  `STREAMING_TABLE` / `MANAGED` lifecycle vocabulary.

**Go reference:** `databricks/sdk-go` `databricks/api/` (the 1:1 port source).

---

## Inventory

### Enums (model.ts)

1. `ColumnTypeName` (model.ts:5) — 27 values: `BOOLEAN`, `BYTE`, `SHORT`,
   `INT`, `LONG`, `FLOAT`, `DOUBLE`, `DATE`, `TIMESTAMP`, `STRING`, `BINARY`,
   `DECIMAL`, `INTERVAL`, `ARRAY`, `STRUCT`, `MAP`, `CHAR`, `NULL`,
   `USER_DEFINED_TYPE`, `TIMESTAMP_NTZ`, `VARIANT`, `GEOMETRY`, `GEOGRAPHY`,
   `TIME`, `FILE`, `TABLE_TYPE`, `TABLEREF_TYPE`.
2. `DataSourceFormat` (model.ts:36) — 26 values, most suffixed `_FORMAT`:
   `DELTA`, `CSV`, `JSON`, `AVRO`, `PARQUET`, `ORC`, `TEXT`, `UNITY_CATALOG`,
   `DELTASHARING`, `DATABRICKS_FORMAT`, `MYSQL_FORMAT`, `ORACLE_FORMAT`,
   `POSTGRESQL_FORMAT`, `REDSHIFT_FORMAT`, `SNOWFLAKE_FORMAT`, `SQLDW_FORMAT`,
   `SQLSERVER_FORMAT`, `SALESFORCE_FORMAT`, `SALESFORCE_DATA_CLOUD_FORMAT`,
   `TERADATA_FORMAT`, `BIGQUERY_FORMAT`, `NETSUITE_FORMAT`,
   `WORKDAY_RAAS_FORMAT`, `MONGODB_FORMAT`, `HIVE`, `VECTOR_INDEX_FORMAT`,
   `DATABRICKS_ROW_STORE_FORMAT`, `DELTA_UNIFORM_HUDI`,
   `DELTA_UNIFORM_ICEBERG`, `ICEBERG`.
3. `SecurableKind` (model.ts:81) — 70+ values, all prefixed with one of
   `TABLE_`, `RECIPIENT_`, `CONNECTION_`, `CATALOG_`, `SCHEMA_`.
4. `SecurableType` (model.ts:182) — 17 values: `CATALOG`, `SCHEMA`, `TABLE`,
   `STORAGE_CREDENTIAL`, `EXTERNAL_LOCATION`, `FUNCTION`, `SHARE`, `PROVIDER`,
   `RECIPIENT`, `CLEAN_ROOM`, `METASTORE`, `PIPELINE`, `VOLUME`, `CONNECTION`,
   `CREDENTIAL`, `EXTERNAL_METADATA`, `STAGING_TABLE`.
5. `SseEncryptionAlgorithm` (model.ts:203) — 3 values:
   `SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED`, `AWS_SSE_S3`, `AWS_SSE_KMS`.
6. `TableType` (model.ts:209) — 9 values: `MANAGED`, `EXTERNAL`, `VIEW`,
   `MATERIALIZED_VIEW`, `STREAMING_TABLE`, `MANAGED_SHALLOW_CLONE`, `FOREIGN`,
   `EXTERNAL_SHALLOW_CLONE`, `METRIC_VIEW`.
7. `OptionSpec_OauthStage` (model.ts:229) — 3 values:
   `OAUTH_STAGE_UNSPECIFIED`, `BEFORE_AUTHORIZATION_CODE`,
   `BEFORE_ACCESS_TOKEN`.
8. `OptionSpec_OptionType` (model.ts:242) — 9 values:
   `OPTION_TYPE_UNSPECIFIED`, `OPTION_BOOLEAN`, `OPTION_NUMBER`,
   `OPTION_BIGINT`, `OPTION_STRING`, `OPTION_ENUM`,
   `OPTION_SERVICE_CREDENTIAL`, `OPTION_MULTILINE_STRING`,
   `OPTION_STORAGE_CREDENTIAL`.

### Interfaces (model.ts)

1. `ColumnInfo` (model.ts:254) — 12 fields (`name`, `typeText`, `typeName`,
   `position`, `typePrecision`, `typeScale`, `typeIntervalType`, `typeJson`,
   `comment`, `nullable`, `partitionIndex`, `mask`).
2. `ColumnMask` (model.ts:279) — 3 fields.
3. `ConditionalDisplay` (model.ts:305) — 2 fields.
4. `ConnectionDependency` (model.ts:317) — 1 field.
5. `CreateTable` (model.ts:322) — 38 fields.
6. `CreateTable_PropertiesEntry` (model.ts:394) — 2 fields.
7. `CreateTableConstraint` (model.ts:399) — 2 fields.
8. `CredentialDependency` (model.ts:406) — 1 field.
9. `DeleteTable` (model.ts:411) — 1 field.
10. `DeleteTable_Response` (model.ts:417) — empty body.
11. `DeleteTableConstraint` (model.ts:419) — 3 fields.
12. `DeleteTableConstraint_Response` (model.ts:432) — empty body.
13. `DeltaRuntimePropertiesKvPairs` (model.ts:438) — 1 field.
14. `DeltaRuntimePropertiesKvPairs_DeltaRuntimePropertiesEntry`
    (model.ts:444) — 2 fields.
15. `Dependency` (model.ts:453) — discriminated union (table / function /
    connection / credential / volume / secret).
16. `DependencyList` (model.ts:473) — 1 field.
17. `EffectivePredictiveOptimizationFlag` (model.ts:478) — 3 fields.
18. `EncryptionDetails` (model.ts:488) — discriminated union (one variant:
    `sseEncryptionDetails`).
19. `ForeignKeyConstraint` (model.ts:498) — 5 fields (`name`, `childColumns`,
    `parentTable`, `parentColumns`, `rely`).
20. `FunctionDependency` (model.ts:512) — 1 field.
21. `GetTable` (model.ts:517) — 4 fields.
22. `ListTableSummaries` (model.ts:528) — 6 fields.
23. `ListTableSummaries_Response` (model.ts:556) — 2 fields.
24. `ListTables` (model.ts:566) — 9 fields.
25. `ListTables_Response` (model.ts:594) — 2 fields.
26. `NamedTableConstraint` (model.ts:604) — 1 field.
27. `OptionSpec` (model.ts:614) — 15 fields.
28. `PolicyFunctionArgument` (model.ts:661) — discriminated union (column /
    constant).
29. `PrimaryKeyConstraint` (model.ts:676) — 4 fields.
30. `RowFilter` (model.ts:687) — 3 fields.
31. `SecretDependency` (model.ts:704) — 1 field.
32. `SecurableKindManifest` (model.ts:710) — 5 fields.
33. `SseEncryptionDetails` (model.ts:724) — 2 fields.
34. `TableConstraint` (model.ts:738) — discriminated union (primary key /
    foreign key / named).
35. `TableDependency` (model.ts:756) — 1 field.
36. `TableExists` (model.ts:761) — 1 field.
37. `TableExists_Response` (model.ts:767) — 1 field (`tableExists`).
38. `TableInfo` (model.ts:772) — 36 fields (duplicates `CreateTable` /
    `UpdateTable` field-by-field).
39. `TableInfo_PropertiesEntry` (model.ts:844) — 2 fields.
40. `TableSummary` (model.ts:849) — 3 fields.
41. `UpdateTable` (model.ts:857) — 37 fields (`fullNameArg` + the same set as
    `CreateTable`).
42. `UpdateTable_PropertiesEntry` (model.ts:931) — 2 fields.
43. `UpdateTable_Response` (model.ts:937) — empty body.
44. `VolumeDependency` (model.ts:940) — 1 field.

### Zod schemas (model.ts)

- Unmarshal: 25 schemas — `unmarshalColumnInfoSchema`,
  `unmarshalColumnMaskSchema`, `unmarshalConditionalDisplaySchema`,
  `unmarshalConnectionDependencySchema`, `unmarshalCredentialDependencySchema`,
  `unmarshalDeleteTable_ResponseSchema`,
  `unmarshalDeleteTableConstraint_ResponseSchema`,
  `unmarshalDeltaRuntimePropertiesKvPairsSchema`, `unmarshalDependencySchema`,
  `unmarshalDependencyListSchema`,
  `unmarshalEffectivePredictiveOptimizationFlagSchema`,
  `unmarshalEncryptionDetailsSchema`, `unmarshalForeignKeyConstraintSchema`,
  `unmarshalFunctionDependencySchema`,
  `unmarshalListTableSummaries_ResponseSchema`,
  `unmarshalListTables_ResponseSchema`,
  `unmarshalNamedTableConstraintSchema`, `unmarshalOptionSpecSchema`,
  `unmarshalPolicyFunctionArgumentSchema`,
  `unmarshalPrimaryKeyConstraintSchema`, `unmarshalRowFilterSchema`,
  `unmarshalSecretDependencySchema`, `unmarshalSecurableKindManifestSchema`,
  `unmarshalSseEncryptionDetailsSchema`, `unmarshalTableConstraintSchema`,
  `unmarshalTableDependencySchema`, `unmarshalTableExists_ResponseSchema`,
  `unmarshalTableInfoSchema`, `unmarshalTableSummarySchema`,
  `unmarshalUpdateTable_ResponseSchema`, `unmarshalVolumeDependencySchema`.
- Marshal: a near-parallel set of `marshal…Schema` symbols (no
  `marshalDeleteTable_*` /`marshalGetTableSchema` since requests there have
  no body).

### Client (client.ts)

- Class `Client` (client.ts:60).
- Public methods: `createTable`, `createTableConstraint`, `deleteTable`,
  `deleteTableConstraint`, `getTable`, `listTableSummaries`,
  `listTableSummariesIter`, `listTables`, `listTablesIter`, `tableExists`,
  `updateTable`.
- Private fields: `host`, `httpClient`, `logger`, `userAgent`.
- Module constant: `PACKAGE_SEGMENT` (client.ts:55).

### Utils (utils.ts)

- Interface: `HttpCallOptions`.
- Functions: `executeCall`, `readAll`, `executeHttpCall`, `buildHttpRequest`,
  `parseResponse`, `marshalRequest`, `flattenQueryParams`.

### Index (index.ts)

- Re-exports `Client`, 8 enums (5 flat + 2 underscored — see findings 1 and
  2), and 41 interfaces.

---

## Summary (counts)

| Severity              | Count |
| --------------------- | ----- |
| High                  | 16    |
| Medium                | 26    |
| Low / SDK-wide note   | 11    |
| Pass / acceptable     | 10    |
| **Total findings**    | **63** |

(Findings often span multiple audit categories; counts above are unique
findings.)

---

## Findings

### 1. `OptionSpec_OauthStage` / `OptionSpec_OptionType` underscore in type names — category 4 (Underscores in TS identifiers) and category 14 (Go/Java-style names)

**Symbols:** `OptionSpec_OauthStage` (model.ts:229),
`OptionSpec_OptionType` (model.ts:242).

**Issue:** Both enum type names carry an internal `_` to model nested-enum
namespacing from `.proto` source. The Google TS Style Guide § 5.3 mandates
`UpperCamelCase` for type names with no underscores; the project's lint rule
(`.agent/rules/typescript.mdc` § *Identifiers*) enforces the same. The file
suppresses the lint for each (model.ts:228, 241):

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum OptionSpec_OauthStage { ... }
```

The suppression comment is the audit signal: lint disagrees, and the
suppression is hard-coded across the SDK for every proto-nested enum.

**Note on inconsistency *within this file*:** the file uses *both* the flat
form (`ColumnTypeName`, `DataSourceFormat`, `SecurableKind`, `SecurableType`,
`SseEncryptionAlgorithm`, `TableType` — all flat) and the underscored form
(`OptionSpec_*`). Same generator, same package, two conventions in the same
file.

**Suggested:** `OauthStage` and `OptionType` if the parent `OptionSpec`
namespace can be dropped; or fold to `OptionSpecOauthStage` /
`OptionSpecOptionType` to keep the parent prefix without the underscore.
Cross-reference `featurestore.PublishSpec_PublishMode` for the same problem.
**Flag for SDK-wide generator cleanup.**

---

### 2. `CreateTable_PropertiesEntry` / `TableInfo_PropertiesEntry` / `UpdateTable_PropertiesEntry` / `DeltaRuntimePropertiesKvPairs_DeltaRuntimePropertiesEntry` underscore in type names — category 4 (Underscores in TS identifiers)

**Symbols:**
- `CreateTable_PropertiesEntry` (model.ts:394).
- `TableInfo_PropertiesEntry` (model.ts:844).
- `UpdateTable_PropertiesEntry` (model.ts:931).
- `DeltaRuntimePropertiesKvPairs_DeltaRuntimePropertiesEntry` (model.ts:444).
- The response wrappers `DeleteTable_Response`, `DeleteTableConstraint_Response`,
  `UpdateTable_Response`, `ListTables_Response`, `ListTableSummaries_Response`,
  `TableExists_Response` (model.ts:417, 432, 937, 594, 556, 767).

**Issue:** Twelve type names carry `_` to mirror proto-message namespacing.
Each is preceded by an `eslint-disable-next-line` comment. The Google TS
Style Guide § 5.3 mandates `UpperCamelCase` for type names with no
underscores; the project's lint rule (`.agent/rules/typescript.mdc` §
*Identifiers*) enforces the same. Every one of these exports requires a
hard-coded lint suppression to keep the proto-nested form.

**Suggested:** fold the parent prefix without the underscore — e.g.
`CreateTablePropertiesEntry`, `TableInfoPropertiesEntry`,
`DeleteTableResponse`, etc. Wire payloads are unaffected; only the TS
identifier changes.

**Coordinate with generator.** Cross-reference
`onlinetables.OnlineTableSpec_ContinuousSchedulingPolicy` (audited in
`onlinetables.md` finding 2) for the same family of wrapper-with-underscore
issues.

---

### 3. `DeltaRuntimePropertiesKvPairs` type name vs. `deltaRuntimePropertiesKvpairs` field name acronym-casing mismatch — category 3 (Acronym casing inconsistencies)

**Symbols:**
- Type: `DeltaRuntimePropertiesKvPairs` (model.ts:438) — `KvPairs` (capital
  `P`).
- Field: `deltaRuntimePropertiesKvpairs` (model.ts:374, 824, 911) — `Kvpairs`
  (lowercase `p`).

**Issue:** The same word ("KvPairs") is cased differently across type and
field names *within the same generated package*:

```ts
// type name
export interface DeltaRuntimePropertiesKvPairs { ... }       // KvPairs

// field name on TableInfo / CreateTable / UpdateTable
deltaRuntimePropertiesKvpairs?: DeltaRuntimePropertiesKvPairs | undefined;
//                       ^^^^^^^^^^^^^                  ^^^^^^^^^^^^^^
//                       Kvpairs (field)                KvPairs (type)
```

The wire form is `delta_runtime_properties_kvpairs` (model.ts:1353, 1565,
1894, 1936) — snake_case with two underscores around `kvpairs` (not three).
The field-name camelCase conversion turns `kvpairs` into one camelCase
token; the type-name PascalCase keeps `KvPairs` as two tokens. The mismatch
is purely a generator quirk: it tokenizes the wire string differently for
struct names vs. field names.

**Suggested:** unify casing.
- Either `DeltaRuntimePropertiesKvpairs` (field-consistent — but breaks the
  acronym-rule from the Google style guide which keeps multi-letter
  acronyms readable, e.g. `xmlHttpRequest`).
- Or `deltaRuntimePropertiesKvPairs` (type-consistent — and "Kv" / "Pairs"
  read naturally as two words).

**Prefer the type-consistent form.** Apply on the field. Cross-reference
the proto-source field naming convention. **Flag for SDK-wide generator
cleanup.**

---

### 4. `Kv` is a cryptic abbreviation in `DeltaRuntimePropertiesKvPairs` — category 5 (Cryptic abbreviations) and category 8 (Redundant suffixes)

**Symbol:** `DeltaRuntimePropertiesKvPairs` (model.ts:438).

**Issue:** `Kv` (key-value) is borderline cryptic for a TypeScript API; the
"Pairs" suffix is redundant if `Kv` already means key-value. The type holds
a single `Record<string, string>` field — both the prefix `Kv` and the
suffix `Pairs` redundantly state what the field's type already says.

**Suggested:** `DeltaRuntimeProperties` (drop `KvPairs` entirely; the field
content `deltaRuntimeProperties: Record<string, string>` makes it
self-describing).

---

### 5. `OptionSpec_OauthStage` member values prefix repeats the enum name — category 2 (Redundant enum prefixes) and category 18 (Long enum values)

**Symbol:** `OptionSpec_OauthStage.OAUTH_STAGE_UNSPECIFIED` (model.ts:230).

**Issue:** Member is already namespaced under `OptionSpec_OauthStage`. The
`OAUTH_STAGE_` segment duplicates the enum name. Reads as:

```ts
spec.oauthStage === OptionSpec_OauthStage.OAUTH_STAGE_UNSPECIFIED
//                                       ^^^^^^^^^^^^^^^^^^^^^^^
//                                       duplicates the enum name
```

Companion values `BEFORE_AUTHORIZATION_CODE` / `BEFORE_ACCESS_TOKEN` do not
repeat the prefix — they break the pattern, so only the `UNSPECIFIED` value
is verbose. This is the classic protobuf "first enum is the unspecified
placeholder with the type name as its prefix" pattern.

**Suggested wire-level (coordinated with API):** plain `UNSPECIFIED`.
**Suggested TS-level only:** `Unspecified = 'OAUTH_STAGE_UNSPECIFIED'`.

---

### 6. `OptionSpec_OptionType` member values prefix repeats the enum name — category 2 (Redundant enum prefixes) and category 18 (Long enum values)

**Symbol:** `OptionSpec_OptionType.OPTION_TYPE_UNSPECIFIED` (model.ts:243)
and every other value (`OPTION_BOOLEAN`, `OPTION_NUMBER`, etc.).

**Issue:** Every member is prefixed `OPTION_` — repeating the enum name
`OptionType`. The 9 values are:
- `OPTION_TYPE_UNSPECIFIED`
- `OPTION_BOOLEAN`, `OPTION_NUMBER`, `OPTION_BIGINT`, `OPTION_STRING`,
  `OPTION_ENUM`
- `OPTION_SERVICE_CREDENTIAL`, `OPTION_MULTILINE_STRING`,
  `OPTION_STORAGE_CREDENTIAL`

Reads as:
```ts
spec.type === OptionSpec_OptionType.OPTION_BOOLEAN  // "the OptionType is OPTION_BOOLEAN"
```

`OptionType.Boolean` would be far cleaner. The wire form is fixed; the TS
identifier can be split (`Boolean = 'OPTION_BOOLEAN'`).

**Suggested:** drop `OPTION_` prefix on the TS identifiers. Combined with
finding 1's rename (`OptionType` instead of `OptionSpec_OptionType`):
```ts
export enum OptionType {
  Unspecified = 'OPTION_TYPE_UNSPECIFIED',
  Boolean = 'OPTION_BOOLEAN',
  Number = 'OPTION_NUMBER',
  Bigint = 'OPTION_BIGINT',
  // ...
}
```

---

### 7. `SseEncryptionAlgorithm.SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED` member value prefix repeats the enum name — category 2 (Redundant enum prefixes) and category 18 (Long enum values)

**Symbol:** `SseEncryptionAlgorithm.SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED`
(model.ts:204). 37 characters.

**Issue:** Identical pattern to findings 5 and 6 — the leading
`SSE_ENCRYPTION_ALGORITHM_` segment duplicates the enum name. The other two
values (`AWS_SSE_S3`, `AWS_SSE_KMS`) do not include the prefix, so only
`UNSPECIFIED` is overly verbose.

**Suggested:** TS-side `Unspecified = 'SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED'`.
Wire string remains.

---

### 8. SSE acronym casing in `SseEncryptionAlgorithm` / `SseEncryptionDetails` — category 3 (Acronym casing inconsistencies)

**Symbols:** `SseEncryptionAlgorithm` (model.ts:203),
`SseEncryptionDetails` (model.ts:724), `sseEncryptionDetails` (field name in
`EncryptionDetails` discriminator at model.ts:491).

**Issue:** "SSE" is a three-letter acronym (Server-Side Encryption). Google
TS Style Guide § 5.1 says multi-letter acronyms should be cased like
ordinary words (e.g. `xmlHttpRequest`, not `XMLHTTPRequest`). The current
form `Sse…` is *correct* under that rule. However, all enum members use
`AWS_SSE_S3` / `AWS_SSE_KMS` / `SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED` —
keeping the full upper-case acronym in the wire values. The split makes the
TS identifier rule and the wire value rule diverge: `Sse` in code,
`SSE` on the wire.

This is consistent with the rest of the SDK (`HttpClient`, `JsonStringify`
etc.) but is worth flagging for anyone reviewing this file fresh.

**Pass** under Google's rule; **note** the inconsistency for SDK-wide review.

---

### 9. `SseEncryptionDetails.awsKmsKeyArn` is the only field that names the cloud — category 3 (Acronym casing inconsistencies) and category 16 (Field contradicting type domain)

**Symbol:** `SseEncryptionDetails.awsKmsKeyArn` (model.ts:731).

**Issue:** `AWS`, `KMS`, and `ARN` are three back-to-back acronyms. The
field is `awsKmsKeyArn`. The JSDoc explains it's "The ARN of the SSE-KMS
key used with the S3 location, when algorithm = 'SSE-KMS'". Under the
Google rule, `AwsKmsKeyArn` would become `awsKmsKeyArn` in camelCase form —
which the code already uses. So far OK.

But this is the *only* AWS-specific field in `tables`. `accessPoint`
(model.ts:381) is also AWS S3-specific (JSDoc: "The AWS access point to
use when accesing s3 for this external location") — but the field name
does not say `awsAccessPoint`. The two AWS-specific fields in `TableInfo`
use different naming conventions for their AWS-ness.

**Suggested:** either rename `accessPoint` → `awsAccessPoint`, or drop the
`aws` prefix on `awsKmsKeyArn` if it's understood to be AWS-only (the
enclosing `SseEncryptionAlgorithm` already says `AWS_SSE_KMS`).

(One JSDoc typo: "accesing" — single `s`, model.ts:381 — likely also in
the upstream `.proto`.)

---

### 10. `SecurableType` is a generic identifier name shared with `catalogs` / `connections` — category 12 (Duplicate concepts) and category 1 (Vague/generic)

**Symbol:** `SecurableType` (model.ts:182).

**Issue:** `SecurableType` is also exported from `catalogs/v1/model.ts:28`,
`connections/v1/model.ts:109`, and at least two other audited packages.
Each definition is the same enum with the same 17 values. Five copies of
the same enum across the SDK. The values overlap with `SecurableKind` (see
finding 11) but are at a different level of granularity (a `TABLE` of
`SecurableType` maps to ~50 `TABLE_*` `SecurableKind` values).

Within the `tables` package, `SecurableType` only appears on
`SecurableKindManifest.securableType` (model.ts:712) — a single field on a
single type. The enum's *value* to this package is marginal: a consumer
who already has a `TableInfo` knows it's a `TABLE`.

**Suggested:** hoist to `@databricks/sdk-core/securable` or similar.
**SDK-wide cleanup.**

---

### 11. `SecurableKind` is a 70+ value enum with `TABLE_` prefix on most values — category 2 (Redundant enum prefixes) and category 18 (Long enum values)

**Symbol:** `SecurableKind` (model.ts:81) — 70+ members, 50+ with `TABLE_`
prefix.

**Issue:** The enum mixes two concerns:

1. Table-specific kinds: `TABLE_STANDARD`, `TABLE_EXTERNAL`, `TABLE_DELTA`,
   `TABLE_VIEW`, `TABLE_FOREIGN_HIVE_METASTORE_DBFS_SHALLOW_CLONE_EXTERNAL`
   (60+ chars!).
2. Non-table kinds: `RECIPIENT_*`, `CONNECTION_*`, `CATALOG_*`, `SCHEMA_*`.

The longest values (`TABLE_DELTA_UNIFORM_ICEBERG_FOREIGN_HIVE_METASTORE_EXTERNAL`,
`TABLE_FOREIGN_SALESFORCE_DATA_CLOUD_FILE_SHARING_VIEW`,
`TABLE_FOREIGN_HIVE_METASTORE_DBFS_SHALLOW_CLONE_EXTERNAL`) are 50–60
characters each. As enum members they are functional but exceed Google's
90-column line cap when used in expressions.

The two-concerns problem is structural: `SecurableKind` is generated for the
whole UC `Securable` taxonomy. In `tables` only the `TABLE_*` half matters,
but the enum exports all values. The non-`TABLE_*` values are unreachable
through any field on this package's types.

**Suggested:**
- For local TS readability: rename TS identifiers to `UpperCamelCase`
  (`TableStandard`, `TableExternal`, …) without changing the wire string.
- For SDK-wide structure: hoist `SecurableKind` to a shared module and let
  service packages re-export, so consumers don't see the entire taxonomy in
  every type-import location.
- Consider splitting `SecurableKind` into `SecurableKind` + `TableKind` if
  the API surface allows. **Coordinate with protocol team.**

---

### 12. `SecurableKind` lint suppressions for SCREAMING_SNAKE_CASE — category 4 (Underscores in TS identifiers)

**Symbol:** Every value in `SecurableKind` (model.ts:82–179).

**Issue:** All values are SCREAMING_SNAKE_CASE with underscores in TS
identifiers. The wire string and the TS identifier are the same value
(`'TABLE_DELTA'`, etc.). Even at default lint settings the file does *not*
suppress these — meaning the lint rule is permissive about enum *values*
but not enum *names* (findings 1 and 2). This is an enforcement gap.

**Suggested (TS side only, no wire change):**
```ts
export enum SecurableKind {
  TableStandard = 'TABLE_STANDARD',
  TableExternal = 'TABLE_EXTERNAL',
  TableDelta = 'TABLE_DELTA',
  // ...
}
```

**Pass with note** if the project policy chose to accept SCREAMING_SNAKE for
enum *values* as a wire-compatibility shortcut. **Flag for SDK-wide
cleanup** otherwise.

---

### 13. `ColumnTypeName.TABLE_TYPE` and `TABLEREF_TYPE` collide with the `TableType` enum domain — category 6 (Misleading names) and category 16 (Field contradicting type domain)

**Symbols:** `ColumnTypeName.TABLE_TYPE` (model.ts:31),
`ColumnTypeName.TABLEREF_TYPE` (model.ts:32).

**Issue:** Two values in `ColumnTypeName` are named the same as the
*type-name* of another enum in this file:

- `ColumnTypeName.TABLE_TYPE` — a column-data-type value of "table".
- `TableType` (model.ts:209) — the *enum* describing kinds of UC tables
  (`MANAGED`, `EXTERNAL`, `VIEW`, …).

A reader scanning the file sees `TABLE_TYPE` as a `ColumnTypeName` value
and `TableType` as a separate enum — but the names overlap, suggesting they
are related. They are not: one is about Spark column SQL types ("the column
holds a table"), the other is about UC table classifications.

`TABLEREF_TYPE` is also cryptic — the `REF` suffix is unclear (table
reference type? table-ref?), and the field has no JSDoc to disambiguate.

**Suggested:**
- Rename `TABLE_TYPE` → `TABLE` (matches the pattern: `ARRAY`, `STRUCT`,
  `MAP` are the same kind of compound type).
- Rename `TABLEREF_TYPE` → `TABLE_REFERENCE` (matches `USER_DEFINED_TYPE`).
- Or document the relationship in JSDoc.

**Coordinate with protocol.**

---

### 14. `ColumnTypeName.USER_DEFINED_TYPE` and `TIMESTAMP_NTZ` cryptic value forms — category 5 (Cryptic abbreviations) and category 18 (Long enum values)

**Symbols:** `ColumnTypeName.USER_DEFINED_TYPE` (model.ts:24),
`ColumnTypeName.TIMESTAMP_NTZ` (model.ts:25).

**Issue:**
- `USER_DEFINED_TYPE` — 17 characters. The companion values (`BOOLEAN`,
  `INT`, `STRING`) are short. The `_TYPE` suffix is redundant inside an
  enum already named `ColumnTypeName`.
- `TIMESTAMP_NTZ` — "NTZ" is "no time zone" (a Spark/Delta abbreviation).
  Has no JSDoc.

**Suggested:**
- `USER_DEFINED_TYPE` → `USER_DEFINED` (drop the `_TYPE` suffix).
- Add JSDoc to `TIMESTAMP_NTZ` clarifying `NTZ = "no time zone"`.

---

### 15. `DataSourceFormat` enum values split between `_FORMAT` suffix and bare forms — category 17 (Inconsistent action verbs)

**Symbols:** `DataSourceFormat` values (model.ts:36–78).

**Issue:** 18 of the 26 values carry a `_FORMAT` suffix
(`DATABRICKS_FORMAT`, `MYSQL_FORMAT`, etc.), but 8 are bare (`DELTA`, `CSV`,
`JSON`, `AVRO`, `PARQUET`, `ORC`, `TEXT`, `UNITY_CATALOG`, `HIVE`,
`DELTASHARING`, `DELTA_UNIFORM_HUDI`, `DELTA_UNIFORM_ICEBERG`, `ICEBERG`).
The split is along provenance: the bare values are the "native" Databricks
formats; the `_FORMAT` suffix marks query-federation source formats (added
later, per the `BEGIN`/`END` comments at model.ts:47, 66).

So the suffix carries semantic information (source-federation vs. native).
But that distinction should be expressed *outside* the wire string — e.g. a
boolean `isFederationSource` on a richer type, or two enums. The current
form has the suffix as a soft tag inside one enum.

For consumers, this means writing:
```ts
if (format === 'DELTA' || format === 'PARQUET') {} // bare
if (format === 'MYSQL_FORMAT' || format === 'POSTGRESQL_FORMAT') {} // suffix
```

**Suggested:** drop `_FORMAT` suffixes on the TS identifiers
(`MYSQL = 'MYSQL_FORMAT'`); the wire string remains. Cross-reference
`connections.ConnectionType` for the same domain.

---

### 16. `DataSourceFormat.DELTASHARING` (no underscore) vs. `DELTA_UNIFORM_HUDI` (underscore-split) — category 17 (Inconsistent action verbs)

**Symbols:** `DataSourceFormat.DELTASHARING` (model.ts:46),
`DataSourceFormat.DELTA_UNIFORM_HUDI` (model.ts:73).

**Issue:** Inconsistent tokenisation within the same enum:
- `DELTASHARING` — single token ("delta sharing" without separator).
- `DELTA_UNIFORM_HUDI` — three tokens.

The wire form for "delta sharing" *should* be `DELTA_SHARING` to follow the
pattern, but the protocol team chose `DELTASHARING`. Same problem exists
across `SecurableKind` (`TABLE_DELTASHARING`, `TABLE_DELTA_ICEBERG_DELTASHARING`,
etc.).

**Suggested:** push back upstream — `DELTA_SHARING` would be more
consistent. **Not a per-package fix.**

---

### 17. `TableType` enum — category 18 (Long enum values) — *pass with note*

**Symbol:** `TableType` (model.ts:209) — 9 values: `MANAGED`, `EXTERNAL`,
`VIEW`, `MATERIALIZED_VIEW`, `STREAMING_TABLE`, `MANAGED_SHALLOW_CLONE`,
`FOREIGN`, `EXTERNAL_SHALLOW_CLONE`, `METRIC_VIEW`.

**Issue:**
- `STREAMING_TABLE` — 15 chars, ends in `_TABLE` (already inside `TableType`
  — minor redundancy).
- `MANAGED_SHALLOW_CLONE`, `EXTERNAL_SHALLOW_CLONE` — 21–22 chars, no
  redundant prefix.
- `MATERIALIZED_VIEW`, `METRIC_VIEW` — clean.

The `_TABLE` suffix on `STREAMING_TABLE` is the only redundancy (compare
to `MANAGED`, `EXTERNAL` which don't say `MANAGED_TABLE` / `EXTERNAL_TABLE`).
But it documents that a streaming table is a kind of table (vs. a view or
materialized view).

**Suggested:** consider `STREAMING` for the TS identifier; wire string
remains. **Pass with note.**

(Cross-package: `SecurableKind.TABLE_STREAMING_LIVE_TABLE` (model.ts:106)
and the deprecated `TABLE_STREAMING_LIVE_TABLE_DELTASHARING` use the
phrase "streaming live table" — older vocabulary. `TableType.STREAMING_TABLE`
is the newer name. The two enums in the same file disagree on the
streaming-table label.)

---

### 18. `SecurableKind` values like `TABLE_DELTASHARING_OPEN_DIR_BASED` — category 5 (Cryptic abbreviations) and category 18 (Long enum values)

**Symbol:** `SecurableKind.TABLE_DELTASHARING_OPEN_DIR_BASED` (model.ts:96).

**Issue:** "OPEN DIR BASED" abbreviates "open-directory-based" — i.e. a
delta-sharing table backed by an open directory listing. The acronym is
unique to delta-sharing internals. No JSDoc.

The value sits among 70+ others, most also opaque without internal
knowledge (e.g. `TABLE_DELTA_UNIFORM_ICEBERG_EXTERNAL_DELTASHARING` has
JSDoc, `TABLE_DELTASHARING_OPEN_DIR_BASED` does not).

**Suggested:** add JSDoc to clarify. **Pass on naming** (wire-string
constraint), **flag for documentation cleanup.**

---

### 19. `SecurableKind` deprecated values mixed with current — category 6 (Misleading names) and category 17 (Inconsistent action verbs)

**Symbols:**
- `SecurableKind.TABLE_FEATURE_STORE` (model.ts:104) and
  `TABLE_FEATURE_STORE_EXTERNAL` (model.ts:105) — both marked "deprecated"
  in JSDoc (model.ts:103).
- `SecurableKind.TABLE_FOREIGN_HIVE_METASTORE` (model.ts:129) — also
  marked deprecated.

**Issue:** Five+ deprecated values left in the enum without `@deprecated`
JSDoc tags (only inline comments). Consumers code-completing on
`SecurableKind` see all values equally — no syntactic signal of deprecation.

**Suggested:**
- Add `@deprecated` JSDoc tags so IDEs strike through the symbol.
- Or, more aggressively, drop the deprecated values when the next breaking
  release happens.

**Flag for SDK-wide deprecation policy.**

---

### 20. `fullNameArg` field name across multiple request types — category 14 (Go/Java-style names) and category 5 (Cryptic abbreviations)

**Symbols:** `fullNameArg` on `DeleteTable` (model.ts:413),
`DeleteTableConstraint` (model.ts:421), `GetTable` (model.ts:519),
`TableExists` (model.ts:763), `UpdateTable` (model.ts:859),
`CreateTableConstraint` (model.ts:401). 7 occurrences in this file alone;
also used in `schemas/v1`, `functions/v1`, `registeredmodels/v1`.

**Issue:** The `Arg` suffix on a field name is a Go convention (Go SDK uses
`FullNameArg` to mark a URL-path-argument vs. a query/body field). In TS,
the convention is to use the bare field name (`fullName`) since the
distinction between URL-path / query / body is handled by the client code
and JSDoc. The wire form is `full_name_arg` (model.ts:1583, 1911) — the
suffix even reaches the wire, which is unusual.

The same package also has a `fullName` field on response/struct types
(`CreateTable.fullName` model.ts:360, `TableInfo.fullName` model.ts:810,
`TableSummary.fullName` model.ts:851). So the package has both `fullName`
(noun) and `fullNameArg` (with `Arg` suffix) — distinguishing input from
output by suffix, which is a Go-ism.

**Suggested:** rename `fullNameArg` → `fullName` SDK-wide. The URL-path
argument vs. response field distinction can be inferred from the request
type (e.g. `DeleteTable.fullName` is obviously a path argument because
`DeleteTable` is a delete request). Cross-reference Google AIP-122
(resource name in REST methods uses `name`, not `nameArg`).

**Flag for SDK-wide cleanup.**

---

### 21. `TableExists` request type is a verb-as-noun — category 6 (Misleading names)

**Symbol:** `TableExists` (model.ts:761) request type.

**Issue:** The request type is named `TableExists` — a verb-as-noun. Inside
`tables` the implicit verb "does this table exist?" reads as the type name.
Awkward but matches Go. Code-completing on the package surface shows
`TableExists` alongside the noun-shaped `TableInfo` and `TableSummary`,
without a `Request` suffix or other syntactic hint that this is a request
input.

**Suggested:** rename to `TableExistsRequest` (would *not* match other
request types in this package — none of them carry the `Request` suffix —
but resolves the verb-as-noun reading).

**Flag at port time.**

---

### 22. Request type naming pattern is inconsistent (`CreateTable`, `DeleteTable`, no `Request` suffix) — category 17 (Inconsistent action verbs) and category 20 (Type-suffix tautology)

**Symbols:** All request types in this package (`CreateTable`, `DeleteTable`,
`DeleteTableConstraint`, `GetTable`, `ListTables`, `ListTableSummaries`,
`TableExists`, `UpdateTable`, `CreateTableConstraint`).

**Issue:** None carry the `Request` suffix that some sister packages do
(`featurestore.CreateOnlineStoreRequest`,
`onlinetables.CreateOnlineTableRequest`, etc.). Within `tables`, the same
type names also clash with the *response* concept — e.g. `CreateTable` is
sometimes interpreted as "an action: create the table" and sometimes as
"the type representing a table to be created."

**Suggested:** rename to `CreateTableRequest`, `GetTableRequest`, etc., or
keep the current convention and document that "verb-noun" types are always
input. Pick one. **Flag SDK-wide.**

(Note that `onlinetables` uses `Request` suffix; `tables` does not. Same
SDK, same generator, two conventions.)

---

### 23. `CreateTable` and `TableInfo` and `UpdateTable` share 36+ identical fields — category 12 (Duplicate concepts) and category 7 (Overly verbose)

**Symbols:** `CreateTable` (model.ts:322, 38 fields), `TableInfo`
(model.ts:772, 36 fields), `UpdateTable` (model.ts:857, 37 fields).

**Issue:** Three types describe essentially the same shape:
- `CreateTable` — fields a caller sets when creating a table.
- `TableInfo` — fields the server returns about a table.
- `UpdateTable` — fields a caller sets when updating a table (the only
  delta is `fullNameArg` added at the top).

Comparing field lists:
- `CreateTable.fullName` vs `UpdateTable.fullName`: both fields exist in
  both types. `UpdateTable` *also* has `fullNameArg`. The `fullName` field
  on `CreateTable` is server-output (the server fills it). The same field
  on `UpdateTable` is also server-output.
- `CreateTable.createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `tableId`,
  `deletedAt`, `metastoreId` — all server-populated. They appear in
  `CreateTable` *because* the type is also used as the response shape of
  `createTable()`. The client.ts code confirms (client.ts:117) — the
  response is parsed as `TableInfo`, but `CreateTable` carries the same
  fields anyway as part of the "fields you *could* set" surface.

So `CreateTable` is *both* an input and an output type, with the same set
of fields. Same for `UpdateTable`. `TableInfo` is the response shape but
shares the field set. Three types that are *almost* identical.

**Suggested:** collapse to one `Table` type, with optional fields for the
output-only segments (or use `Pick`/`Omit` types if input-only / output-only
need to be distinct). The current shape is generator-driven (proto-source
messages map 1:1).

**Strong flag for generator cleanup.** Cross-reference the same problem in
`featurestore`, `database`, `postgres`.

---

### 24. `CreateTable.fullName` is server-generated — category 6 (Misleading names)

**Symbol:** `CreateTable.fullName?: string | undefined` (model.ts:360).
JSDoc: "Full name of table, in form of __catalog_name__.__schema_name__.__table_name__".

**Issue:** The field appears in the request *input* type but is server-output
(derived from `catalogName`, `schemaName`, `name`). A caller writing
`createTable({ fullName: 'foo.bar.baz' })` would believe they are setting
the full name; the server ignores it. No JSDoc marks the field as
output-only.

Same applies to `createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`tableId`, `metastoreId`, `deletedAt`, `pipelineId`, `dataAccessConfigurationId`,
`deltaRuntimePropertiesKvpairs`, `effectivePredictiveOptimizationFlag` —
all server-output but exposed on the input type. Same critique applies to
`UpdateTable`.

**Suggested:** mark with JSDoc `@readonly` and add a sentence "Output only;
ignored on input." Or restructure types (finding 23). **Coordinate with
generator.**

---

### 25. `CreateTable.tableConstraints` not used on input — category 6 (Misleading names) and category 7 (Overly verbose)

**Symbol:** `CreateTable.tableConstraints?: TableConstraint[] | undefined`
(model.ts:352). JSDoc: "List of table constraints. Note: this field is not
set in the output of the __listTables__ API."

**Issue:** The JSDoc note is structured oddly: it explains the field's
*output* behaviour, but the field appears in the *input* type. Combined
with the existence of a separate `createTableConstraint` method
(client.ts:147), the typical workflow is:
1. Call `createTable` (without constraints).
2. Call `createTableConstraint` (one per constraint).

So `CreateTable.tableConstraints` is also an unusual input — the server
might or might not honour it depending on the deployment.

**Suggested:** clarify JSDoc on input behaviour; possibly mark deprecated.

---

### 26. `CreateTable.enablePredictiveOptimization` is a `string`, not a boolean — category 6 (Misleading names) and category 16 (Field contradicting type domain)

**Symbol:** `CreateTable.enablePredictiveOptimization?: string | undefined`
(model.ts:356). Same field on `TableInfo` (model.ts:806) and `UpdateTable`
(model.ts:893). No JSDoc.

**Issue:** The `enable…` prefix strongly suggests a boolean. The type is
`string`. A caller writing
`createTable({ enablePredictiveOptimization: true })` gets a TS error and
must look up the JSDoc to learn the field accepts string enum values
(typically `'ENABLE'`, `'DISABLE'`, `'INHERIT'` per UC). The
companion `effectivePredictiveOptimizationFlag.value` (model.ts:480) is
also a `string` with the same domain.

**Suggested:**
- Type as an enum (e.g. `PredictiveOptimizationFlag = 'ENABLE' | 'DISABLE'
  | 'INHERIT'`) and rename to `predictiveOptimization`.
- Or document the accepted values in JSDoc.

**Coordinate with protocol.** Cross-reference `catalogs/v1` which has the
same field.

---

### 27. `CreateTable.dataAccessConfigurationId` underspecified ID — category 19 (Underspecified IDs) and category 7 (Overly verbose)

**Symbol:** `CreateTable.dataAccessConfigurationId?: string | undefined`
(model.ts:362). 28 chars. Same field on `TableInfo` (model.ts:812) and
`UpdateTable` (model.ts:899).

**Issue:** A `string` field with no type discrimination. The JSDoc says
"Unique ID of the Data Access Configuration to use with the table data."
A consumer cannot know the ID's format (UUID? snowflake? human-readable?).
Same applies to:
- `metastoreId` (model.ts:358) — UC metastore identifier.
- `pipelineId` (model.ts:355) — DLT pipeline identifier.
- `tableId` (model.ts:372) — UC table identifier.

All are bare strings. The TS SDK has no typed IDs; that is an SDK-wide
choice. **Pass with note.**

---

### 28. `CreateTable.accessPoint` (S3-specific) leaks AWS into a generic-looking field — category 6 (Misleading names) and category 16 (Field contradicting type domain)

**Symbol:** `CreateTable.accessPoint?: string | undefined` (model.ts:381).
JSDoc: "The AWS access point to use when accesing s3 for this external
location." (Note also the JSDoc typo "accesing".)

**Issue:** A field named `accessPoint` reads like a generic concept (the
endpoint at which the table is accessed?). In reality it is AWS S3–specific.
The JSDoc clarifies, but the field name does not. A caller targeting Azure
or GCP will not know to skip the field.

**Suggested:** rename to `awsAccessPoint` or `s3AccessPoint` (matches the
JSDoc).

**Cross-reference:** `SseEncryptionDetails.awsKmsKeyArn` (finding 9) takes
the AWS prefix; `accessPoint` does not. Inconsistent within this file.

---

### 29. `CreateTable.browseOnly` is server-output but appears in request — category 6 (Misleading names)

**Symbol:** `CreateTable.browseOnly?: boolean | undefined` (model.ts:383).
JSDoc: "Indicates whether the principal is limited to retrieving metadata
for the associated object through the BROWSE privilege when include_browse
is enabled in the request."

**Issue:** Server-output field on an input type, again. The JSDoc is also
describing the server's behaviour ("when include_browse is enabled in the
request") which is a different request entirely. Confusing because the
field's *meaning* depends on context.

**Suggested:** mark `@readonly` and add a one-line "Output only." Or move
to `TableInfo` only.

---

### 30. `ListTables.omitColumns` / `omitProperties` / `omitUsername` use negative form — category 13 (Verb-tense inconsistency) and category 17 (Inconsistent action verbs)

**Symbols:** `ListTables.omitColumns?: boolean` (model.ts:582),
`omitProperties?: boolean` (model.ts:584), `omitUsername?: boolean`
(model.ts:586). Same package also has `includeBrowse?: boolean`
(model.ts:588), `includeManifestCapabilities?: boolean` (model.ts:589).

**Issue:** Five boolean flags on the same request type:
- Three positive `include…` (which add output).
- Three negative `omit…` (which subtract output).

The mixing of positive and negative forms is unusual. Code completion
shows both `omitColumns` and `includeBrowse` on the same type — a reader
might miss that `omitColumns: false` is the default-include state, while
`includeBrowse: false` is the default-exclude state.

**Suggested:** unify on `include…` (the SDK-wide convention) — e.g.
`includeColumns: boolean | undefined` defaulting to `true`. **Flag at port
time.**

(Note: `omitUsername` is also a singular — "username", not "usernames" —
even though the JSDoc lists three fields (owner, updated_by, created_by).
Should be `omitUsernames`. See finding 31.)

---

### 31. `ListTables.omitUsername` singular but covers three fields — category 9 (Singular/plural mismatch)

**Symbol:** `ListTables.omitUsername?: boolean | undefined` (model.ts:586).
JSDoc: "Whether to omit the username of the table (e.g. owner, updated_by,
created_by) from the response or not."

**Issue:** Singular `Username` but the JSDoc lists three fields. Plural
`omitUsernames` would match the impact ("omit *all* the username fields").

**Suggested:** `omitUsernames`. Wire form (`omit_username`) is the
single-token version; the TS-side identifier can be pluralised without
changing the wire string. **Coordinate with protocol team.**

---

### 32. `ListTables.maxResults` and `pageToken` paginate negatively-documented semantics — category 6 (Misleading names) — *pass with note*

**Symbol:** `ListTables.maxResults?: number | undefined` (model.ts:578),
JSDoc: "Maximum number of tables to return. If not set, all the tables
are returned (not recommended)."

The pagination docstring is long and warns that unpaginated calls will be
deprecated. The naming is fine; the API behaviour is the issue.

**Pass on naming.**

---

### 33. `ListTableSummaries.schemaNamePattern` / `tableNamePattern` vs. `ListTables.schemaName` field-name inconsistency — category 17 (Inconsistent action verbs)

**Symbols:** `ListTableSummaries.schemaNamePattern` (model.ts:535) and
`ListTableSummaries.tableNamePattern` (model.ts:540) vs. `ListTables.schemaName`
(model.ts:570).

**Issue:** Two sibling list endpoints accept the schema name as different
shapes:
- `ListTables.schemaName` — an exact string match.
- `ListTableSummaries.schemaNamePattern` — a SQL LIKE pattern.

JSDoc explains the difference. But the *callers* must remember which
endpoint uses which form. There is no naming hint that one is a pattern.

**Suggested:** rename `ListTables.schemaName` to `schemaNameExact` or
`schemaNameEquals` to surface the contrast — or rename
`ListTableSummaries.schemaNamePattern` to `schemaName` with JSDoc clarifying
the pattern syntax. The former is the cleaner pick (less ambiguous on the
input side).

**Flag at port time.**

---

### 34. `ListTableSummaries_Response.tables` returns `TableSummary[]` not `TableInfo[]` — category 6 (Misleading names) and category 15 (Generic field names losing meaning)

**Symbol:** `ListTableSummaries_Response.tables?: TableSummary[] | undefined`
(model.ts:558).

**Issue:** A field named `tables` returns *summaries*, not full table info.
The companion `ListTables_Response.tables` returns `TableInfo[]`. So
`tables` on one response type vs. another means a different shape.

**Suggested:** rename `ListTableSummaries_Response.tables` to `summaries`
(matches the response type name). Or rename to `tableSummaries`. Both
expose the shape difference at the field name.

**Flag at port time.**

---

### 35. `Dependency` / `DependencyList` / `TableDependency` / `FunctionDependency` / `ConnectionDependency` / `CredentialDependency` / `VolumeDependency` / `SecretDependency` defined in three packages — category 12 (Duplicate concepts)

**Symbols:**
- This file: `Dependency` (model.ts:453), `DependencyList` (model.ts:473),
  and the six leaf-types (model.ts:317, 406, 512, 704, 756, 940).
- `functions/v1/model.ts:74–407` — full duplicate.
- `registeredmodels/v1/model.ts:16–423` — full duplicate.

**Issue:** Three packages export the same eight types. Each defines its own
`Dependency` discriminated union with the same six cases. The field shapes
are identical (e.g. `TableDependency.tableFullName` is `tableFullName` in
all three). A consumer who uses `tables.TableDependency` and
`functions.TableDependency` will get two different (but structurally
identical) types from the type checker.

**Suggested:** hoist to `@databricks/sdk-core/dependency` and re-export
from each service package. **Strong SDK-wide cleanup.**

---

### 36. `Dependency.value` field name is generic — category 1 (Vague/generic) and category 15 (Generic field names losing meaning)

**Symbol:** `Dependency.value` (model.ts:454). Type is the discriminated
union.

**Issue:** `value` is the maximally generic field name. The proto source
likely models `Dependency` as `oneof`; the generator wraps each case in a
`value` discriminator. In TS, the consumer writes:

```ts
if (dep.value?.$case === 'table') {
  console.log(dep.value.table.tableFullName);
}
```

`value` adds noise without distinguishing the shape. Compare to
`EncryptionDetails.encryptionDetailsType` (model.ts:489) — same pattern,
non-generic name. Compare to `TableConstraint.constraint` (model.ts:739) —
same pattern, more descriptive name. Within this file, **three different
naming conventions for the same generator pattern.**

**Suggested:** `Dependency.dependency` (matches the type name) or
`Dependency.kind` (consistent with discriminated-union nomenclature).
**Flag at port time.**

---

### 37. `EncryptionDetails.encryptionDetailsType` repeats the type name as the field name — category 8 (Redundant suffixes) and category 20 (Type-suffix tautology)

**Symbol:** `EncryptionDetails.encryptionDetailsType` (model.ts:489).

**Issue:** Inside the type `EncryptionDetails`, the field name
`encryptionDetailsType` repeats two of the three tokens of the type name.
A consumer writes:
```ts
encDetails.encryptionDetailsType?.$case
```
when `encDetails.kind?.$case` or `encDetails.details?.$case` would
suffice.

Compare to `Dependency.value` (finding 36) — same pattern, generic name.
Compare to `TableConstraint.constraint` — same pattern, name is the type
*concept* without `Type` suffix.

**Suggested:** `EncryptionDetails.kind`.

---

### 38. `ColumnInfo.position` underspecified field — category 1 (Vague/generic)

**Symbol:** `ColumnInfo.position?: number | undefined` (model.ts:261).
JSDoc: "Ordinal position of column (starting at position 0)."

**Issue:** Bare `position` (number) — a consumer cannot tell from the
field name that it's 0-indexed. The JSDoc clarifies.

**Suggested:** `ColumnInfo.ordinal` (matches the JSDoc "Ordinal position")
or `columnIndex`. **Pass with note** — the field is short and conventional.

---

### 39. `ColumnInfo.typeText` / `typeName` / `typePrecision` / `typeScale` / `typeIntervalType` / `typeJson` — six `type*` fields — category 12 (Duplicate concepts)

**Symbols:** `ColumnInfo.typeText` (model.ts:258), `typeName` (model.ts:259),
`typePrecision` (model.ts:262), `typeScale` (model.ts:263),
`typeIntervalType` (model.ts:267), `typeJson` (model.ts:269).

**Issue:** Six fields all describing the column's data type, prefixed
`type…`. The JSDoc says:
- `typeText` — full SQL catalogString text.
- `typeName` — the enum.
- `typePrecision` — required for `DECIMAL`.
- `typeScale` — required for `DECIMAL`.
- `typeIntervalType` — for `INTERVAL`.
- `typeJson` — full JSON serialisation of the type.

The shape mirrors Spark's `StructField.dataType` (which is a tree). The
six-field flat form is a wire encoding; in TS, a single `type` field of an
algebraic type would be clearer.

**Suggested:** group into a sub-object:
```ts
export interface ColumnInfo {
  type?: {
    name?: ColumnTypeName;
    text?: string;
    precision?: number;
    scale?: number;
    intervalType?: string;
    json?: string;
  };
  // ...
}
```

**Flag at port time.** Wire-level decision.

---

### 40. `RowFilter.functionName` vs `RowFilter.inputColumnNames` vs `RowFilter.inputArguments` plural mismatch — category 9 (Singular/plural mismatch) and category 17 (Inconsistent action verbs)

**Symbols:** `RowFilter.functionName?: string` (model.ts:689),
`RowFilter.inputColumnNames?: string[]` (model.ts:694),
`RowFilter.inputArguments?: PolicyFunctionArgument[]` (model.ts:700).

**Issue:** Naming is consistent for arrays (`columnNames`, `arguments` —
both plural). But:
- `inputColumnNames` is **deprecated** per JSDoc ("This is the replacement
  of the deprecated input_column_names field" — model.ts:697); the
  replacement is `inputArguments`.
- The deprecated field name still exists in the TS surface and is
  generated/marshalled.

**Suggested:** mark `inputColumnNames` with `@deprecated`. Cross-reference
`ColumnMask.usingColumnNames` (model.ts:287) which has the same
deprecation note.

---

### 41. `ColumnMask.usingArguments` vs `RowFilter.inputArguments` action-verb difference — category 17 (Inconsistent action verbs)

**Symbols:** `ColumnMask.usingArguments?: PolicyFunctionArgument[]`
(model.ts:293), `RowFilter.inputArguments?: PolicyFunctionArgument[]`
(model.ts:700).

**Issue:** Both fields have the same purpose (positional arguments to a
SQL UDF), the same type (`PolicyFunctionArgument[]`), and the same JSDoc
shape ("This is the replacement of the deprecated …_column_names field").
But the verb prefix differs: `using…` for masks, `input…` for filters.

**Suggested:** unify on one verb. `inputArguments` is more conventional
(matches "input parameters" common in DB systems). **Flag at port time.**

---

### 42. `PolicyFunctionArgument.arg` field name is too short — category 1 (Vague/generic)

**Symbol:** `PolicyFunctionArgument.arg` (model.ts:662). Discriminated
union of `column` / `constant`.

**Issue:** `arg` is three letters — too short for a public field. The
proto source likely uses `oneof arg`; the generator preserves the field
name. Consumer writes:
```ts
if (positionalArg.arg?.$case === 'column') { ... }
```

Compare to `Dependency.value` (finding 36) and
`EncryptionDetails.encryptionDetailsType` (finding 37) — same pattern,
three different naming conventions. The `arg` here is the most cryptic.

**Suggested:** `argument` (full word) or `kind`.

---

### 43. `PrimaryKeyConstraint.childColumns` vs `ForeignKeyConstraint.childColumns` semantic mismatch — category 6 (Misleading names) and category 12 (Duplicate concepts)

**Symbols:** `PrimaryKeyConstraint.childColumns?: string[]`
(model.ts:680), `ForeignKeyConstraint.childColumns?: string[]`
(model.ts:502).

**Issue:** Both types use `childColumns` for "the columns of this table
participating in the constraint." But:
- For a primary key, "child" is wrong vocabulary — there's no parent. A
  primary key has no parent table.
- For a foreign key, "child" matches the FK domain (child references
  parent). `ForeignKeyConstraint` has both `childColumns` and
  `parentColumns` (model.ts:506) — natural pair.

The `PrimaryKeyConstraint.childColumns` field name is misleading — in PK
context, the columns are simply *the* columns. Cross-reference the wire
form `child_columns` (model.ts:1102, 1214) which inherits the same issue
from upstream.

**Suggested:** rename `PrimaryKeyConstraint.childColumns` to
`PrimaryKeyConstraint.columns`. **Coordinate with protocol team.**

---

### 44. `PrimaryKeyConstraint.timeseriesColumns` vs `ColumnMask.usingColumnNames` plural-vs-singular inconsistency — category 9 (Singular/plural mismatch)

**Symbols:** `PrimaryKeyConstraint.timeseriesColumns?: string[]`
(model.ts:682), `ColumnMask.usingColumnNames?: string[]` (model.ts:287),
`ColumnMask.functionName?: string` (model.ts:281).

**Issue:** Within the same file:
- `columns` (plural): `PrimaryKeyConstraint.childColumns`,
  `PrimaryKeyConstraint.timeseriesColumns`, `ForeignKeyConstraint.childColumns`,
  `ForeignKeyConstraint.parentColumns`.
- `columnNames` (plural with `Names`): `ColumnMask.usingColumnNames`,
  `RowFilter.inputColumnNames`.

Both refer to lists of column-name strings (`string[]`). The shape is
identical; the names differ in whether the `Names` suffix is included.

**Suggested:** unify on one form. `columns` is shorter and matches the
constraint vocabulary; `columnNames` is more explicit but verbose. Pick
one. **Flag at port time.**

---

### 45. `ForeignKeyConstraint.rely` boolean is cryptic — category 5 (Cryptic abbreviations)

**Symbol:** `ForeignKeyConstraint.rely?: boolean | undefined` (model.ts:508).
JSDoc: "True if the constraint is RELY, false or unset if NORELY."

**Issue:** "RELY" / "NORELY" are SQL keywords (Spark's `ALTER TABLE ... RELY`
hint). The JSDoc explains them; the field name alone is opaque. Same
critique applies to `PrimaryKeyConstraint.rely` (model.ts:684).

**Suggested:** rename to `relyEnabled` or `enableRely` — the boolean form
needs an `is…` / `enable…` prefix to match SDK convention. **Coordinate
with protocol team.**

---

### 46. `OptionSpec.isCopiable` typo or unusual spelling — category 5 (Cryptic abbreviations) and category 6 (Misleading names)

**Symbol:** `OptionSpec.isCopiable?: boolean | undefined` (model.ts:649).
JSDoc: "Indicates whether an option should be displayed with copy button
on the UI."

**Issue:** "Copiable" is an unusual spelling — the standard English forms
are "copyable" or "copy-able". The generator picked the less-common form
(likely from the upstream `.proto`).

**Suggested:** `isCopyable`. Wire form `is_copiable` stays for back-compat.
**Coordinate with protocol team.**

---

### 47. `OptionSpec` has 9 `is…` boolean fields — category 17 (Inconsistent action verbs) — *pass with note*

**Symbols:** `OptionSpec.isRequired` (model.ts:635),
`OptionSpec.isSecret` (model.ts:637), `OptionSpec.isHidden` (model.ts:639),
`OptionSpec.isUpdatable` (model.ts:641), `OptionSpec.isLoggable`
(model.ts:645), `OptionSpec.isCreatable` (model.ts:647),
`OptionSpec.isCopiable` (model.ts:649).

The boolean fields all use the `is…` prefix, which is the right convention
for booleans. **Pass on naming.**

(The number of booleans on `OptionSpec` (7+) is itself a code smell — the
type packs configuration for a UI form, with each boolean controlling a
different aspect of display. A consumer struggling to set all of these
correctly may want a richer type. **Note for upstream.**)

---

### 48. `ConditionalDisplay.dependsOnOption` vs `hiddenWhenValues` field naming asymmetry — category 17 (Inconsistent action verbs)

**Symbols:** `ConditionalDisplay.dependsOnOption?: string` (model.ts:307),
`ConditionalDisplay.hiddenWhenValues?: string[]` (model.ts:313).

**Issue:** Two fields modelling the same relation (option-A's value
determines option-B's visibility):
- `dependsOnOption` — singular, identifies the "watched" option.
- `hiddenWhenValues` — plural, the values that trigger hiding.

The verb forms differ: "depends on…" vs. "hidden when…". A reader skimming
the type sees them as unrelated. The pair would be cleaner as e.g.
`{watchOption, hideOnValues}` or `{trigger: {option, hideOnValues}}`.

**Suggested:** rename `dependsOnOption` to `watchOption` or
`triggerOption`. **Flag at port time.**

---

### 49. `EffectivePredictiveOptimizationFlag.value` is a generic field on a specific type — category 1 (Vague/generic) and category 15 (Generic field names losing meaning)

**Symbol:** `EffectivePredictiveOptimizationFlag.value?: string`
(model.ts:480). JSDoc: "Whether predictive optimization should be enabled
for this object and objects under it."

**Issue:** The type's *purpose* is to indicate whether PO is enabled. The
field name `value` says nothing about that. The type is also a `string`
(not a `boolean`) — same problem as finding 26.

**Suggested:** rename `value` → `enabled` (boolean) or `state` (matching
the JSDoc's "enabled" sense). **Coordinate with protocol team.**

---

### 50. `EffectivePredictiveOptimizationFlag.inheritedFromType` / `inheritedFromName` — category 17 (Inconsistent action verbs)

**Symbols:** `EffectivePredictiveOptimizationFlag.inheritedFromType?: string`
(model.ts:482), `EffectivePredictiveOptimizationFlag.inheritedFromName?: string`
(model.ts:484).

**Issue:** Two fields describing the source of inheritance — the object
type ("CATALOG"|"SCHEMA"|…) and the object's name. Naming is OK, but the
suffix pair `…Type` / `…Name` repeats inside one struct that has only
three fields. Could be folded:
```ts
inheritedFrom?: { type?: string; name?: string };
```

**Suggested:** flatten to a sub-object. **Pass with note** — the current
flat form is wire-faithful.

---

### 51. `TableConstraint.constraint` and `TableConstraint` discriminated-union shape — category 8 (Redundant suffixes) and category 20 (Type-suffix tautology)

**Symbol:** `TableConstraint.constraint` (model.ts:739).

**Issue:** Same problem as finding 37 (`EncryptionDetails.encryptionDetailsType`).
Field repeats the type name's primary token. The discriminated union of
three constraint shapes is wrapped in a field literally named `constraint`.

**Suggested:** rename to a non-repeating field (`kind`, `variant`).

---

### 52. `Client` class name — category 1 (Vague/generic) — *pass*

Package convention. **Pass.**

---

### 53. `Client.createTable` / `deleteTable` / `getTable` / `updateTable` / `listTables` / `tableExists` — *pass*

Standard `{verb}{Resource}` shape. Convention. **Pass.**

(Note: `Client.tableExists` (client.ts:472) breaks the verb-first pattern —
it reads `noun-verb` instead of `verb-noun`. The corresponding shape in
other SDKs is `existsTable` or `checkTableExists`. The current form mirrors
the request type name `TableExists` which is itself unusual — see finding
21. **Flag at SDK-wide level.**)

---

### 54. `Client.createTableConstraint` / `deleteTableConstraint` — *pass*

Same `{verb}{Resource}` pattern. **Pass.**

---

### 55. `Client` private fields `host`, `httpClient`, `logger`, `userAgent` — *pass*

Standard. **Pass.**

---

### 56. `PACKAGE_SEGMENT` SCREAMING_SNAKE — category 4 (Underscores in TS identifiers)

**Symbol:** `PACKAGE_SEGMENT` (client.ts:55).

**Issue:** Google TS Style Guide § 5.1 reserves `UPPER_SNAKE_CASE` for true
primitive constants (`MAX_LEN = 10`). `PACKAGE_SEGMENT` is a runtime
object literal `{ key, value }` constructed from a JSON import. The same
identifier is used in every package's `client.ts`.

**Suggested:** `packageSegment` or `clientPackageSegment`. **Flag for
SDK-wide cleanup.**

---

### 57. `HttpCallOptions` interface — category 1 (Vague/generic) and category 20 (Type-suffix tautology)

**Symbol:** `HttpCallOptions` (utils.ts:15).

**Issue:** "HttpCall" is not a concept that exists elsewhere in the SDK;
the file also imports `CallOptions` from `@databricks/sdk-options/call`
(utils.ts:12). Two `…CallOptions` types side by side, with one being the
HTTP-layer context and the other the public retry/rate-limit options.

**Suggested:** `HttpRequestContext` or `ExecuteHttpArgs`. **Flag for
SDK-wide cleanup** — generated boilerplate.

---

### 58. `executeCall` vs `executeHttpCall` verb collision — category 17 (Inconsistent action verbs)

**Symbols:** `executeCall` (utils.ts:26), `executeHttpCall` (utils.ts:65).

**Issue:** Two functions named `execute…Call` that operate at different
layers. The names imply a hierarchical relationship that does not exist.

**Suggested:** rename `executeHttpCall` to `sendAndDecode` or
`doHttpRequest`. **Flag for SDK-wide cleanup.**

---

### 59. `buildHttpRequest`, `readAll`, `flattenQueryParams` — *pass*

Verb-prefixed. Naming is fine. `flattenQueryParams` is used by the
multi-query-param list methods (client.ts:357, 444).

(Cross-check: this package *does* use `flattenQueryParams` indirectly via
the manual `URLSearchParams` construction in `listTables`/`listTableSummaries`
client.ts:311/393. Hmm, actually it doesn't import the helper. Manual
construction with `params.append(...)` is duplicated 14 times across the
file.)

---

### 60. `index.ts` re-exports underscored type names — category 4 (Underscores in TS identifiers)

**Symbols:** index.ts re-exports include `CreateTable_PropertiesEntry`,
`DeleteTable_Response`, `DeleteTableConstraint_Response`,
`DeltaRuntimePropertiesKvPairs_DeltaRuntimePropertiesEntry`,
`ListTableSummaries_Response`, `ListTables_Response`, `TableExists_Response`,
`TableInfo_PropertiesEntry`, `UpdateTable_PropertiesEntry`,
`UpdateTable_Response`, `OptionSpec_OauthStage`, `OptionSpec_OptionType`.

**Issue:** Twelve public-API exports carry an `_` in their name. Consumers
see the underscored names in auto-imports, in violation of the Google TS
Style Guide § 5.3 and the project's lint rule on identifiers.

**Suggested:** rename to the underscore-free `UpperCamelCase` form (e.g.
`CreateTablePropertiesEntry`, `DeleteTableResponse`, `OptionSpecOauthStage`).
**Flag for generator cleanup.**

---

### 61. Singular/plural — package name `tables` vs type names singular — category 9 (Singular/plural mismatch) — *pass*

Package: `@databricks/sdk-tables` (plural — collection). Types: `TableInfo`,
`TableSummary`, `TableConstraint`, etc. (singular — one item). SDK-wide
pattern. **Pass.**

---

### 62. `Dependency.value` $case literals (`'table'`, `'function'`, `'connection'`, `'credential'`, `'volume'`, `'secret'`) all lowercase, no prefix — category 17 (Inconsistent action verbs) — *pass with note*

**Symbols:** `Dependency.value.$case` literals (model.ts:455–467).

**Issue:** The six `$case` literals are plain nouns. Within the file:
- `TableConstraint.constraint.$case` literals (model.ts:741, 745, 749) are
  `'primaryKeyConstraint'` / `'foreignKeyConstraint'` / `'namedTableConstraint'` —
  i.e. *suffixed* with `Constraint`.
- `EncryptionDetails.encryptionDetailsType.$case` literal (model.ts:491) is
  `'sseEncryptionDetails'` — suffixed with `Details`.
- `PolicyFunctionArgument.arg.$case` literals (model.ts:664, 669) are
  `'column'` / `'constant'` — plain nouns, like `Dependency.value`.

So **four discriminated unions, two different naming conventions** for
their $case literals.

**Suggested:** unify on one form. `Dependency`'s short-form literals
(plain nouns) are the cleanest — apply elsewhere. **Flag at port time.**

---

### 63. `parseResponse` ignores `Content-Type` — category 6 (Misleading names) — *pass with note*

**Symbol:** `parseResponse` (utils.ts:113) does `JSON.parse(text)`
unconditionally. The name implies it can handle any response shape; in
practice it only handles JSON.

**Suggested:** rename `parseJsonResponse` to set caller expectations.
**Pass — generated boilerplate.**

---

## Cross-package alignment recommendations

### A. `Dependency` family duplicated in three packages

`tables`, `functions`, and `registeredmodels` each export the same eight
types: `Dependency`, `DependencyList`, `TableDependency`, `FunctionDependency`,
`ConnectionDependency`, `CredentialDependency`, `VolumeDependency`,
`SecretDependency`. Same shape, same fields, three copies. Strong P0
candidate for hoisting to `@databricks/sdk-core/dependency`.

---

### B. `EncryptionDetails` / `SseEncryptionAlgorithm` / `SseEncryptionDetails` duplicated in three packages

`tables`, `volumes`, and `externallocations` each define the same encryption
types with the same fields and the same enum values. Three copies.

**Suggested:** hoist to `@databricks/sdk-core/encryption` or
`@databricks/sdk-core/storage`.

---

### C. `SecurableType` defined in 5+ packages

`tables`, `catalogs`, `connections`, plus the unaudited
`grants`/`abacpolicies`/etc. Same 17 values, same names.

**Suggested:** hoist to `@databricks/sdk-core/securable`.

---

### D. `EffectivePredictiveOptimizationFlag` defined in `tables` and `catalogs`

`catalogs/v1/model.ts:240` defines the same type as
`tables/v1/model.ts:478`. Three fields (`value`, `inheritedFromType`,
`inheritedFromName`).

**Suggested:** hoist or pick a canonical home.

---

### E. `ColumnTypeName` defined in `tables` and `functions`

`functions/v1/model.ts:5` defines the same enum. 27 SQL/Spark data-type
values shared.

**Suggested:** hoist to `@databricks/sdk-core/sql-types`.

---

### F. `RowFilter` / `ColumnMask` vs. `abacpolicies.RowFilterOptions` / `abacpolicies.ColumnMaskOptions` shape divergence

`tables/v1/model.ts:687` defines `RowFilter` and `tables/v1/model.ts:279`
defines `ColumnMask`. `abacpolicies/v1/model.ts:38, 295` defines
`ColumnMaskOptions` / `RowFilterOptions`. Same domain, different shapes
and naming.

**Suggested:** harmonise.

---

### G. `fullNameArg` Go-style argument suffix used across many packages

`tables`, `schemas`, `functions`, `registeredmodels` all use the `Arg`
suffix on URL-path arguments. Drop SDK-wide.

---

### H. Three-tier table-type confusion

This package, `onlinetables`, `database`, `postgres`, and `featurestore`
all model "table" concepts at different layers:
- `tables.TableType` (model.ts:209) — 9 values for UC table classifications.
- `tables.SecurableKind` (model.ts:81) — 70+ values, mostly `TABLE_*`
  prefixes for finer-grained UC kinds.
- `onlinetables.OnlineTableState` — the lifecycle/sync state of an
  online table (overlaps with `TableType.MATERIALIZED_VIEW`,
  `STREAMING_TABLE`).
- `database.SyncedTableState`, `postgres.SyncedTableState` — same as
  `OnlineTableState`, renamed.

The relationships between `TableType.MATERIALIZED_VIEW`,
`SecurableKind.TABLE_MATERIALIZED_VIEW`, `OnlineTableState.ONLINE`, etc.,
are non-obvious without reading the JSDoc on each enum. **SDK-wide
documentation pass needed.**

---

## Counts by severity

| Severity | Count | Findings |
| -------- | ----- | -------- |
| **High** (style guide violations, dead/empty types, cross-package collisions, misleading semantics) | 16 | #1, #2, #3, #10, #11, #20, #23, #24, #26, #28, #35, #36, #43, #49, #56, #60 |
| **Medium** (naming clarity, verbose, redundant suffixes, JSDoc drift) | 26 | #4, #5, #6, #7, #9, #13, #14, #15, #16, #18, #19, #21, #22, #25, #27, #30, #31, #33, #34, #37, #39, #40, #41, #45, #48, #51 |
| **Low / SDK-wide note** (generator boilerplate, not local fix) | 11 | #8, #12, #29, #42, #44, #46, #50, #57, #58, #62, #63 |
| **Pass / acceptable** | 10 | #17, #32, #38, #47, #52, #53, #54, #55, #59, #61 |

---

## Top fixes (highest local return)

1. **#2 / #60** — drop the underscored `*_PropertiesEntry` / `*_Response`
   type names from the public surface. Removes lint suppressions and
   eliminates the proto-style naming.
2. **#3** — fix `DeltaRuntimePropertiesKvpairs` (field) /
   `DeltaRuntimePropertiesKvPairs` (type) casing mismatch. Local, mechanical
   rename.
3. **#20** — drop the `Arg` suffix from `fullNameArg` SDK-wide. Higher
   impact (changes wire field name) but eliminates a Go-style convention.
4. **#26** — type `enablePredictiveOptimization` as a real enum instead of
   a free-form string. Improves type safety.
5. **#36 / #37 / #42 / #51** — unify discriminated-union container field
   names (`value` vs `encryptionDetailsType` vs `arg` vs `constraint`).
   Within-file consistency fix.
6. **#34** — rename `ListTableSummaries_Response.tables` to `summaries`
   (or `tableSummaries`). Easy local fix.
7. **#11 / #12** — `SecurableKind` SCREAMING_SNAKE → UpperCamelCase on TS
   side. Local mechanical change (does not affect wire compatibility if
   string values are kept).
