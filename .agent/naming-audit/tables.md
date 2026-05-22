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
  `ConnectionDependency` / `CredentialDependency` family.
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

1. `ColumnTypeName` (model.ts:5) — 24 values: `BOOLEAN`, `BYTE`, `SHORT`,
   `INT`, `LONG`, `FLOAT`, `DOUBLE`, `DATE`, `TIMESTAMP`, `STRING`, `BINARY`,
   `DECIMAL`, `INTERVAL`, `ARRAY`, `STRUCT`, `MAP`, `CHAR`, `NULL`,
   `USER_DEFINED_TYPE`, `TIMESTAMP_NTZ`, `VARIANT`, `GEOMETRY`, `GEOGRAPHY`,
   `TABLE_TYPE`.
2. `DataSourceFormat` (model.ts:33) — 26 values, most suffixed `_FORMAT`:
   `DELTA`, `CSV`, `JSON`, `AVRO`, `PARQUET`, `ORC`, `TEXT`, `UNITY_CATALOG`,
   `DELTASHARING`, `DATABRICKS_FORMAT`, `MYSQL_FORMAT`, `ORACLE_FORMAT`,
   `POSTGRESQL_FORMAT`, `REDSHIFT_FORMAT`, `SNOWFLAKE_FORMAT`, `SQLDW_FORMAT`,
   `SQLSERVER_FORMAT`, `SALESFORCE_FORMAT`, `SALESFORCE_DATA_CLOUD_FORMAT`,
   `TERADATA_FORMAT`, `BIGQUERY_FORMAT`, `NETSUITE_FORMAT`,
   `WORKDAY_RAAS_FORMAT`, `MONGODB_FORMAT`, `HIVE`, `VECTOR_INDEX_FORMAT`,
   `DATABRICKS_ROW_STORE_FORMAT`, `DELTA_UNIFORM_HUDI`,
   `DELTA_UNIFORM_ICEBERG`, `ICEBERG`.
3. `SecurableKind` (model.ts:78) — 70+ values, all prefixed with one of
   `TABLE_`, `RECIPIENT_`, `CONNECTION_`, `CATALOG_`, `SCHEMA_`.
4. `SecurableType` (model.ts:162) — 17 values: `CATALOG`, `SCHEMA`, `TABLE`,
   `STORAGE_CREDENTIAL`, `EXTERNAL_LOCATION`, `FUNCTION`, `SHARE`, `PROVIDER`,
   `RECIPIENT`, `CLEAN_ROOM`, `METASTORE`, `PIPELINE`, `VOLUME`, `CONNECTION`,
   `CREDENTIAL`, `EXTERNAL_METADATA`, `STAGING_TABLE`.
5. `SseEncryptionAlgorithm` (model.ts:183) — 3 values:
   `SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED`, `AWS_SSE_S3`, `AWS_SSE_KMS`.
6. `TableType` (model.ts:189) — 9 values: `MANAGED`, `EXTERNAL`, `VIEW`,
   `MATERIALIZED_VIEW`, `STREAMING_TABLE`, `MANAGED_SHALLOW_CLONE`, `FOREIGN`,
   `EXTERNAL_SHALLOW_CLONE`, `METRIC_VIEW`.
7. `OptionSpec_OauthStage` (model.ts:209) — 3 values:
   `OAUTH_STAGE_UNSPECIFIED`, `BEFORE_AUTHORIZATION_CODE`,
   `BEFORE_ACCESS_TOKEN`.
8. `OptionSpec_OptionType` (model.ts:222) — 8 values:
   `OPTION_TYPE_UNSPECIFIED`, `OPTION_BOOLEAN`, `OPTION_NUMBER`,
   `OPTION_BIGINT`, `OPTION_STRING`, `OPTION_ENUM`,
   `OPTION_SERVICE_CREDENTIAL`, `OPTION_MULTILINE_STRING`.

### Interfaces (model.ts)

1. `ColumnInfo` (model.ts:233) — 12 fields (`name`, `typeText`, `typeName`,
   `position`, `typePrecision`, `typeScale`, `typeIntervalType`, `typeJson`,
   `comment`, `nullable`, `partitionIndex`, `mask`).
2. `ColumnMask` (model.ts:258) — 3 fields.
3. `ConnectionDependency` (model.ts:276) — 1 field.
4. `CreateTableConstraintRequest` (model.ts:281) — 2 fields.
5. `CreateTableRequest` (model.ts:287) — 38 fields.
6. `CreateTableRequest_PropertiesEntry` (model.ts:359) — 2 fields.
7. `CredentialDependency` (model.ts:365) — 1 field.
8. `DeleteTableConstraintRequest` (model.ts:370) — 3 fields.
9. `DeleteTableConstraintRequest_Response` (model.ts:383) — empty body.
10. `DeleteTableRequest` (model.ts:385) — 1 field.
11. `DeleteTableRequest_Response` (model.ts:391) — empty body.
12. `DeltaRuntimePropertiesKvPairs` (model.ts:397) — 1 field.
13. `DeltaRuntimePropertiesKvPairs_DeltaRuntimePropertiesEntry`
    (model.ts:403) — 2 fields.
14. `Dependency` (model.ts:412) — discriminated union (table / function /
    connection / credential).
15. `DependencyList` (model.ts:422) — 1 field.
16. `EffectivePredictiveOptimizationFlag` (model.ts:427) — 3 fields.
17. `EncryptionDetails` (model.ts:437) — discriminated union (one variant:
    `sseEncryptionDetails`).
18. `ForeignKeyConstraint` (model.ts:447) — 5 fields (`name`, `childColumns`,
    `parentTable`, `parentColumns`, `rely`).
19. `FunctionDependency` (model.ts:461) — 1 field.
20. `GetTableRequest` (model.ts:466) — 4 fields.
21. `ListTableSummariesRequest` (model.ts:477) — 6 fields.
22. `ListTableSummariesRequest_Response` (model.ts:505) — 2 fields.
23. `ListTablesRequest` (model.ts:515) — 9 fields.
24. `ListTablesRequest_Response` (model.ts:543) — 2 fields.
25. `NamedTableConstraint` (model.ts:553) — 1 field.
26. `OptionSpec` (model.ts:563) — 14 fields.
27. `PolicyFunctionArgument` (model.ts:605) — discriminated union (column /
    constant).
28. `PrimaryKeyConstraint` (model.ts:620) — 4 fields.
29. `RowFilter` (model.ts:631) — 3 fields.
30. `SecurableKindManifest` (model.ts:648) — 5 fields.
31. `SseEncryptionDetails` (model.ts:662) — 2 fields.
32. `TableConstraint` (model.ts:676) — discriminated union (primary key /
    foreign key / named).
33. `TableDependency` (model.ts:694) — 1 field.
34. `TableExistsRequest` (model.ts:699) — 1 field.
35. `TableExistsRequest_Response` (model.ts:705) — 1 field (`tableExists`).
36. `TableInfo` (model.ts:710) — 36 fields (duplicates `CreateTableRequest` /
    `UpdateTableRequest` field-by-field).
37. `TableInfo_PropertiesEntry` (model.ts:782) — 2 fields.
38. `TableSummary` (model.ts:787) — 3 fields.
39. `UpdateTableRequest` (model.ts:795) — 37 fields (`fullNameArg` + the same
    set as `CreateTableRequest`).
40. `UpdateTableRequest_PropertiesEntry` (model.ts:869) — 2 fields.
41. `UpdateTableRequest_Response` (model.ts:875) — empty body.

### Zod schemas (model.ts)

- Unmarshal: schemas for the response and structural types.
- Marshal: a near-parallel set of `marshal…Schema` symbols (no
  `marshal…Schema` for path-only requests with no body).

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

- Re-exports `Client`, 8 enums, and 38 interfaces.

---

## Summary (counts)

| Severity              | Count |
| --------------------- | ----- |
| High                  | 18    |
| Medium                | 21    |
| Low / SDK-wide note   | 10    |
| Pass / acceptable     | 9     |
| **Total findings**    | **58** |

(Findings often span multiple audit categories; counts above are unique
findings.)

---

## Findings

### 1. `DeltaRuntimePropertiesKvPairs` type name vs. `deltaRuntimePropertiesKvpairs` field name acronym-casing mismatch — category 3 (Acronym casing inconsistencies)

**Symbols:**
- Type: `DeltaRuntimePropertiesKvPairs` (model.ts:397) — `KvPairs` (capital
  `P`).
- Field: `deltaRuntimePropertiesKvpairs` (model.ts:339, 762, 849) — `Kvpairs`
  (lowercase `p`).

**Issue:** The same word ("KvPairs") is cased differently across type and
field names *within the same generated package*:

```ts
// type name
export interface DeltaRuntimePropertiesKvPairs { ... }       // KvPairs

// field name on TableInfo / CreateTableRequest / UpdateTableRequest
deltaRuntimePropertiesKvpairs?: DeltaRuntimePropertiesKvPairs | undefined;
//                       ^^^^^^^^^^^^^                  ^^^^^^^^^^^^^^
//                       Kvpairs (field)                KvPairs (type)
```

The wire form is `delta_runtime_properties_kvpairs` — snake_case with two
underscores around `kvpairs` (not three). The field-name camelCase
conversion turns `kvpairs` into one camelCase token; the type-name
PascalCase keeps `KvPairs` as two tokens. The mismatch is purely a
generator quirk: it tokenizes the wire string differently for struct names
vs. field names.

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

### 2. `Kv` is a cryptic abbreviation in `DeltaRuntimePropertiesKvPairs` — category 5 (Cryptic abbreviations) and category 8 (Redundant suffixes)

**Symbol:** `DeltaRuntimePropertiesKvPairs` (model.ts:397).

**Issue:** `Kv` (key-value) is borderline cryptic for a TypeScript API; the
"Pairs" suffix is redundant if `Kv` already means key-value. The type holds
a single `Record<string, string>` field — both the prefix `Kv` and the
suffix `Pairs` redundantly state what the field's type already says.

**Suggested:** `DeltaRuntimeProperties` (drop `KvPairs` entirely; the field
content `deltaRuntimeProperties: Record<string, string>` makes it
self-describing).

---

### 3. SSE acronym casing in `SseEncryptionAlgorithm` / `SseEncryptionDetails` — category 3 (Acronym casing inconsistencies)

**Symbols:** `SseEncryptionAlgorithm` (model.ts:183),
`SseEncryptionDetails` (model.ts:662), `sseEncryptionDetails` (field name in
`EncryptionDetails` discriminator at model.ts:440).

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

### 4. `SseEncryptionDetails.awsKmsKeyArn` is the only field that names the cloud — category 3 (Acronym casing inconsistencies) and category 16 (Field contradicting type domain)

**Symbol:** `SseEncryptionDetails.awsKmsKeyArn` (model.ts:669).

**Issue:** `AWS`, `KMS`, and `ARN` are three back-to-back acronyms. The
field is `awsKmsKeyArn`. The JSDoc explains it's "The ARN of the SSE-KMS
key used with the S3 location, when algorithm = 'SSE-KMS'". Under the
Google rule, `AwsKmsKeyArn` would become `awsKmsKeyArn` in camelCase form —
which the code already uses. So far OK.

But this is the *only* AWS-specific field in `tables`. `accessPoint`
(model.ts:346) is also AWS S3-specific (JSDoc: "The AWS access point to
use when accesing s3 for this external location") — but the field name
does not say `awsAccessPoint`. The two AWS-specific fields in `TableInfo`
use different naming conventions for their AWS-ness.

**Suggested:** either rename `accessPoint` → `awsAccessPoint`, or drop the
`aws` prefix on `awsKmsKeyArn` if it's understood to be AWS-only (the
enclosing `SseEncryptionAlgorithm` already says `AWS_SSE_KMS`).

(One JSDoc typo: "accesing" — single `s`, model.ts:345 — likely also in
the upstream `.proto`.)

---

### 5. `SecurableType` is a generic identifier name shared with `catalogs` / `connections` — category 12 (Duplicate concepts) and category 1 (Vague/generic)

**Symbol:** `SecurableType` (model.ts:162).

**Issue:** `SecurableType` is also exported from `catalogs/v1/model.ts:28`,
`connections/v1/model.ts:109`, and at least two other audited packages.
Each definition is the same enum with the same 17 values. Five copies of
the same enum across the SDK. The values overlap with `SecurableKind`
(model.ts:78) but are at a different level of granularity (a `TABLE` of
`SecurableType` maps to ~50 `TABLE_*` `SecurableKind` values).

Within the `tables` package, `SecurableType` only appears on
`SecurableKindManifest.securableType` (model.ts:650) — a single field on a
single type. The enum's *value* to this package is marginal: a consumer
who already has a `TableInfo` knows it's a `TABLE`.

**Suggested:** hoist to `@databricks/sdk-core/securable` or similar.
**SDK-wide cleanup.**

---

### 6. `ColumnTypeName.TABLE_TYPE` collides with the `TableType` enum domain — category 6 (Misleading names) and category 16 (Field contradicting type domain)

**Symbol:** `ColumnTypeName.TABLE_TYPE` (model.ts:29).

**Issue:** A value in `ColumnTypeName` is named the same as the
*type-name* of another enum in this file:

- `ColumnTypeName.TABLE_TYPE` — a column-data-type value of "table".
- `TableType` (model.ts:189) — the *enum* describing kinds of UC tables
  (`MANAGED`, `EXTERNAL`, `VIEW`, …).

A reader scanning the file sees `TABLE_TYPE` as a `ColumnTypeName` value
and `TableType` as a separate enum — but the names overlap, suggesting they
are related. They are not: one is about Spark column SQL types ("the column
holds a table"), the other is about UC table classifications.

**Suggested:**
- Rename `TABLE_TYPE` → `TABLE` (matches the pattern: `ARRAY`, `STRUCT`,
  `MAP` are the same kind of compound type).
- Or document the relationship in JSDoc.

**Coordinate with protocol.**

---

### 7. `ColumnTypeName.TIMESTAMP_NTZ` cryptic abbreviation — category 5 (Cryptic abbreviations)

**Symbol:** `ColumnTypeName.TIMESTAMP_NTZ` (model.ts:25).

**Issue:** "NTZ" is "no time zone" (a Spark/Delta abbreviation). Has no
JSDoc. A reader who has not seen the Spark dialect cannot tell what `NTZ`
means from the symbol alone.

**Suggested:** add JSDoc to `TIMESTAMP_NTZ` clarifying `NTZ = "no time
zone"`.

---

### 8. `DataSourceFormat` enum values split between `_FORMAT` suffix and bare forms — category 17 (Inconsistent action verbs)

**Symbols:** `DataSourceFormat` values (model.ts:33–75).

**Issue:** 18 of the 26 values carry a `_FORMAT` suffix
(`DATABRICKS_FORMAT`, `MYSQL_FORMAT`, etc.), but 8 are bare (`DELTA`, `CSV`,
`JSON`, `AVRO`, `PARQUET`, `ORC`, `TEXT`, `UNITY_CATALOG`, `HIVE`,
`DELTASHARING`, `DELTA_UNIFORM_HUDI`, `DELTA_UNIFORM_ICEBERG`, `ICEBERG`).
The split is along provenance: the bare values are the "native" Databricks
formats; the `_FORMAT` suffix marks query-federation source formats (added
later, per the `BEGIN`/`END` comments at model.ts:44, 63).

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

### 9. `DataSourceFormat.DELTASHARING` (no underscore) vs. `DELTA_UNIFORM_HUDI` (underscore-split) — category 17 (Inconsistent action verbs)

**Symbols:** `DataSourceFormat.DELTASHARING` (model.ts:43),
`DataSourceFormat.DELTA_UNIFORM_HUDI` (model.ts:70).

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

### 10. `SecurableKind` values like `TABLE_DELTASHARING_OPEN_DIR_BASED` — category 5 (Cryptic abbreviations) and category 18 (Long enum values)

**Symbol:** `SecurableKind.TABLE_DELTASHARING_OPEN_DIR_BASED` (model.ts:93).

**Issue:** "OPEN DIR BASED" abbreviates "open-directory-based" — i.e. a
delta-sharing table backed by an open directory listing. The acronym is
unique to delta-sharing internals. No JSDoc.

The value sits among 70+ others, most also opaque without internal
knowledge (e.g. `TABLE_DELTA_UNIFORM_ICEBERG_EXTERNAL_DELTASHARING` has
JSDoc, `TABLE_DELTASHARING_OPEN_DIR_BASED` does not).

**Suggested:** add JSDoc to clarify. **Pass on naming** (wire-string
constraint), **flag for documentation cleanup.**

---

### 11. `SecurableKind` deprecated values mixed with current — category 6 (Misleading names) and category 17 (Inconsistent action verbs)

**Symbols:**
- `SecurableKind.TABLE_FEATURE_STORE` (model.ts:95) and
  `TABLE_FEATURE_STORE_EXTERNAL` (model.ts:96) — both marked "deprecated"
  in JSDoc (model.ts:94).
- `SecurableKind.TABLE_FOREIGN_HIVE_METASTORE` (model.ts:119) — also
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

### 12. `fullNameArg` field name across multiple request types — category 14 (Go/Java-style names) and category 5 (Cryptic abbreviations)

**Symbols:** `fullNameArg` on `DeleteTableRequest` (model.ts:387),
`DeleteTableConstraintRequest` (model.ts:372), `GetTableRequest`
(model.ts:468), `TableExistsRequest` (model.ts:701), `UpdateTableRequest`
(model.ts:797), `CreateTableConstraintRequest` (model.ts:283). 6
occurrences in this file alone; also used in `schemas/v1`, `functions/v1`,
`registeredmodels/v1`.

**Issue:** The `Arg` suffix on a field name is a Go convention (Go SDK uses
`FullNameArg` to mark a URL-path-argument vs. a query/body field). In TS,
the convention is to use the bare field name (`fullName`) since the
distinction between URL-path / query / body is handled by the client code
and JSDoc. The wire form is `full_name_arg` — the suffix even reaches the
wire, which is unusual.

The same package also has a `fullName` field on response/struct types
(`CreateTableRequest.fullName` model.ts:325, `TableInfo.fullName`
model.ts:748, `TableSummary.fullName` model.ts:789, `UpdateTableRequest.fullName`
model.ts:835). So the package has both `fullName` (noun) and `fullNameArg`
(with `Arg` suffix) — distinguishing input from output by suffix, which is
a Go-ism.

**Suggested:** rename `fullNameArg` → `fullName` SDK-wide. The URL-path
argument vs. response field distinction can be inferred from the request
type (e.g. `DeleteTableRequest.fullName` is obviously a path argument
because `DeleteTableRequest` is a delete request). Cross-reference Google
AIP-122 (resource name in REST methods uses `name`, not `nameArg`).

**Flag for SDK-wide cleanup.**

---

### 13. `CreateTableRequest` and `TableInfo` and `UpdateTableRequest` share 36+ identical fields — category 12 (Duplicate concepts) and category 7 (Overly verbose)

**Symbols:** `CreateTableRequest` (model.ts:287, 38 fields), `TableInfo`
(model.ts:710, 36 fields), `UpdateTableRequest` (model.ts:795, 37 fields).

**Issue:** Three types describe essentially the same shape:
- `CreateTableRequest` — fields a caller sets when creating a table.
- `TableInfo` — fields the server returns about a table.
- `UpdateTableRequest` — fields a caller sets when updating a table (the
  only delta is `fullNameArg` added at the top).

Comparing field lists:
- `CreateTableRequest.fullName` vs `UpdateTableRequest.fullName`: both
  fields exist in both types. `UpdateTableRequest` *also* has
  `fullNameArg`. The `fullName` field on `CreateTableRequest` is
  server-output (the server fills it). The same field on
  `UpdateTableRequest` is also server-output.
- `CreateTableRequest.createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
  `tableId`, `deletedAt`, `metastoreId` — all server-populated. They appear
  in `CreateTableRequest` *because* the type is also used as the response
  shape of `createTable()`. The client.ts code confirms — the response is
  parsed as `TableInfo`, but `CreateTableRequest` carries the same fields
  anyway as part of the "fields you *could* set" surface.

So `CreateTableRequest` is *both* an input and an output type, with the
same set of fields. Same for `UpdateTableRequest`. `TableInfo` is the
response shape but shares the field set. Three types that are *almost*
identical.

**Suggested:** collapse to one `Table` type, with optional fields for the
output-only segments (or use `Pick`/`Omit` types if input-only / output-only
need to be distinct). The current shape is generator-driven (proto-source
messages map 1:1).

**Strong flag for generator cleanup.** Cross-reference the same problem in
`featurestore`, `database`, `postgres`.

---

### 14. `CreateTableRequest.fullName` is server-generated — category 6 (Misleading names)

**Symbol:** `CreateTableRequest.fullName?: string | undefined`
(model.ts:325). JSDoc: "Full name of table, in form of
__catalog_name__.__schema_name__.__table_name__".

**Issue:** The field appears in the request *input* type but is server-output
(derived from `catalogName`, `schemaName`, `name`). A caller writing
`createTable({ fullName: 'foo.bar.baz' })` would believe they are setting
the full name; the server ignores it. No JSDoc marks the field as
output-only.

Same applies to `createdAt`, `createdBy`, `updatedAt`, `updatedBy`,
`tableId`, `metastoreId`, `deletedAt`, `pipelineId`, `dataAccessConfigurationId`,
`deltaRuntimePropertiesKvpairs`, `effectivePredictiveOptimizationFlag` —
all server-output but exposed on the input type. Same critique applies to
`UpdateTableRequest`.

**Suggested:** mark with JSDoc `@readonly` and add a sentence "Output only;
ignored on input." Or restructure types (finding 13). **Coordinate with
generator.**

---

### 15. `CreateTableRequest.tableConstraints` not used on input — category 6 (Misleading names) and category 7 (Overly verbose)

**Symbol:** `CreateTableRequest.tableConstraints?: TableConstraint[] | undefined`
(model.ts:317). JSDoc: "List of table constraints. Note: this field is not
set in the output of the __listTables__ API."

**Issue:** The JSDoc note is structured oddly: it explains the field's
*output* behaviour, but the field appears in the *input* type. Combined
with the existence of a separate `createTableConstraint` method
(client.ts:147), the typical workflow is:
1. Call `createTable` (without constraints).
2. Call `createTableConstraint` (one per constraint).

So `CreateTableRequest.tableConstraints` is also an unusual input — the
server might or might not honour it depending on the deployment.

**Suggested:** clarify JSDoc on input behaviour; possibly mark deprecated.

---

### 16. `CreateTableRequest.enablePredictiveOptimization` is a `string`, not a boolean — category 6 (Misleading names) and category 16 (Field contradicting type domain)

**Symbol:** `CreateTableRequest.enablePredictiveOptimization?: string | undefined`
(model.ts:321). Same field on `TableInfo` (model.ts:744) and
`UpdateTableRequest` (model.ts:831). No JSDoc.

**Issue:** The `enable…` prefix strongly suggests a boolean. The type is
`string`. A caller writing
`createTable({ enablePredictiveOptimization: true })` gets a TS error and
must look up the JSDoc to learn the field accepts string enum values
(typically `'ENABLE'`, `'DISABLE'`, `'INHERIT'` per UC). The
companion `effectivePredictiveOptimizationFlag.value` (model.ts:429) is
also a `string` with the same domain.

**Suggested:**
- Type as an enum (e.g. `PredictiveOptimizationFlag = 'ENABLE' | 'DISABLE'
  | 'INHERIT'`) and rename to `predictiveOptimization`.
- Or document the accepted values in JSDoc.

**Coordinate with protocol.** Cross-reference `catalogs/v1` which has the
same field.

---

### 17. `CreateTableRequest.dataAccessConfigurationId` underspecified ID — category 19 (Underspecified IDs) and category 7 (Overly verbose)

**Symbol:** `CreateTableRequest.dataAccessConfigurationId?: string | undefined`
(model.ts:327). 28 chars. Same field on `TableInfo` (model.ts:750) and
`UpdateTableRequest` (model.ts:837).

**Issue:** A `string` field with no type discrimination. The JSDoc says
"Unique ID of the Data Access Configuration to use with the table data."
A consumer cannot know the ID's format (UUID? snowflake? human-readable?).
Same applies to:
- `metastoreId` (model.ts:323) — UC metastore identifier.
- `pipelineId` (model.ts:320) — DLT pipeline identifier.
- `tableId` (model.ts:337) — UC table identifier.

All are bare strings. The TS SDK has no typed IDs; that is an SDK-wide
choice. **Pass with note.**

---

### 18. `CreateTableRequest.accessPoint` (S3-specific) leaks AWS into a generic-looking field — category 6 (Misleading names) and category 16 (Field contradicting type domain)

**Symbol:** `CreateTableRequest.accessPoint?: string | undefined`
(model.ts:346). JSDoc: "The AWS access point to use when accesing s3 for
this external location." (Note also the JSDoc typo "accesing".)

**Issue:** A field named `accessPoint` reads like a generic concept (the
endpoint at which the table is accessed?). In reality it is AWS S3–specific.
The JSDoc clarifies, but the field name does not. A caller targeting Azure
or GCP will not know to skip the field.

**Suggested:** rename to `awsAccessPoint` or `s3AccessPoint` (matches the
JSDoc).

**Cross-reference:** `SseEncryptionDetails.awsKmsKeyArn` (finding 4) takes
the AWS prefix; `accessPoint` does not. Inconsistent within this file.

---

### 19. `CreateTableRequest.browseOnly` is server-output but appears in request — category 6 (Misleading names)

**Symbol:** `CreateTableRequest.browseOnly?: boolean | undefined`
(model.ts:348). JSDoc: "Indicates whether the principal is limited to
retrieving metadata for the associated object through the BROWSE privilege
when include_browse is enabled in the request."

**Issue:** Server-output field on an input type, again. The JSDoc is also
describing the server's behaviour ("when include_browse is enabled in the
request") which is a different request entirely. Confusing because the
field's *meaning* depends on context.

**Suggested:** mark `@readonly` and add a one-line "Output only." Or move
to `TableInfo` only.

---

### 20. `ListTablesRequest.omitColumns` / `omitProperties` / `omitUsername` use negative form — category 13 (Verb-tense inconsistency) and category 17 (Inconsistent action verbs)

**Symbols:** `ListTablesRequest.omitColumns?: boolean` (model.ts:531),
`omitProperties?: boolean` (model.ts:533), `omitUsername?: boolean`
(model.ts:535). Same package also has `includeBrowse?: boolean`
(model.ts:537), `includeManifestCapabilities?: boolean` (model.ts:539).

**Issue:** Five boolean flags on the same request type:
- Two positive `include…` (which add output).
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
Should be `omitUsernames`. See finding 21.)

---

### 21. `ListTablesRequest.omitUsername` singular but covers three fields — category 9 (Singular/plural mismatch)

**Symbol:** `ListTablesRequest.omitUsername?: boolean | undefined`
(model.ts:535). JSDoc: "Whether to omit the username of the table (e.g.
owner, updated_by, created_by) from the response or not."

**Issue:** Singular `Username` but the JSDoc lists three fields. Plural
`omitUsernames` would match the impact ("omit *all* the username fields").

**Suggested:** `omitUsernames`. Wire form (`omit_username`) is the
single-token version; the TS-side identifier can be pluralised without
changing the wire string. **Coordinate with protocol team.**

---

### 22. `ListTablesRequest.maxResults` and `pageToken` paginate negatively-documented semantics — category 6 (Misleading names) — *pass with note*

**Symbol:** `ListTablesRequest.maxResults?: number | undefined`
(model.ts:527), JSDoc: "Maximum number of tables to return. If not set, all
the tables are returned (not recommended)."

The pagination docstring is long and warns that unpaginated calls will be
deprecated. The naming is fine; the API behaviour is the issue.

**Pass on naming.**

---

### 23. `ListTableSummariesRequest.schemaNamePattern` / `tableNamePattern` vs. `ListTablesRequest.schemaName` field-name inconsistency — category 17 (Inconsistent action verbs)

**Symbols:** `ListTableSummariesRequest.schemaNamePattern` (model.ts:484)
and `ListTableSummariesRequest.tableNamePattern` (model.ts:489) vs.
`ListTablesRequest.schemaName` (model.ts:519).

**Issue:** Two sibling list endpoints accept the schema name as different
shapes:
- `ListTablesRequest.schemaName` — an exact string match.
- `ListTableSummariesRequest.schemaNamePattern` — a SQL LIKE pattern.

JSDoc explains the difference. But the *callers* must remember which
endpoint uses which form. There is no naming hint that one is a pattern.

**Suggested:** rename `ListTablesRequest.schemaName` to `schemaNameExact`
or `schemaNameEquals` to surface the contrast — or rename
`ListTableSummariesRequest.schemaNamePattern` to `schemaName` with JSDoc
clarifying the pattern syntax. The former is the cleaner pick (less
ambiguous on the input side).

**Flag at port time.**

---

### 24. `ListTableSummariesRequest_Response.tables` returns `TableSummary[]` not `TableInfo[]` — category 6 (Misleading names) and category 15 (Generic field names losing meaning)

**Symbol:** `ListTableSummariesRequest_Response.tables?: TableSummary[] | undefined`
(model.ts:507).

**Issue:** A field named `tables` returns *summaries*, not full table info.
The companion `ListTablesRequest_Response.tables` returns `TableInfo[]`. So
`tables` on one response type vs. another means a different shape.

**Suggested:** rename `ListTableSummariesRequest_Response.tables` to
`summaries` (matches the response type name). Or rename to `tableSummaries`.
Both expose the shape difference at the field name.

**Flag at port time.**

---

### 25. `Dependency` / `DependencyList` / `TableDependency` / `FunctionDependency` / `ConnectionDependency` / `CredentialDependency` defined in three packages — category 12 (Duplicate concepts)

**Symbols:**
- This file: `Dependency` (model.ts:412), `DependencyList` (model.ts:422),
  and the four leaf-types (model.ts:276, 365, 461, 694).
- `functions/v1/model.ts` — full duplicate.
- `registeredmodels/v1/model.ts` — full duplicate.

**Issue:** Three packages export the same six types. Each defines its own
`Dependency` discriminated union with the same four cases. The field shapes
are identical (e.g. `TableDependency.tableFullName` is `tableFullName` in
all three). A consumer who uses `tables.TableDependency` and
`functions.TableDependency` will get two different (but structurally
identical) types from the type checker.

**Suggested:** hoist to `@databricks/sdk-core/dependency` and re-export
from each service package. **Strong SDK-wide cleanup.**

---

### 26. `Dependency.value` field name is generic — category 1 (Vague/generic) and category 15 (Generic field names losing meaning)

**Symbol:** `Dependency.value` (model.ts:413). Type is the discriminated
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
`EncryptionDetails.encryptionDetailsType` (model.ts:438) — same pattern,
non-generic name (see finding 27). Compare to `TableConstraint.constraint`
(model.ts:677) — same pattern, more descriptive name. Within this file,
**three different naming conventions for the same generator pattern.**

**Suggested:** `Dependency.dependency` (matches the type name) or
`Dependency.kind` (consistent with discriminated-union nomenclature).
**Flag at port time.**

---

### 27. `EncryptionDetails.encryptionDetailsType` repeats the type name as the field name — category 8 (Redundant suffixes) and category 20 (Type-suffix tautology)

**Symbol:** `EncryptionDetails.encryptionDetailsType` (model.ts:438).

**Issue:** Inside the type `EncryptionDetails`, the field name
`encryptionDetailsType` repeats two of the three tokens of the type name.
A consumer writes:
```ts
encDetails.encryptionDetailsType?.$case
```
when `encDetails.kind?.$case` or `encDetails.details?.$case` would
suffice.

Compare to `Dependency.value` (finding 26) — same pattern, generic name.
Compare to `TableConstraint.constraint` — same pattern, name is the type
*concept* without `Type` suffix.

**Suggested:** `EncryptionDetails.kind`.

---

### 28. `ColumnInfo.position` underspecified field — category 1 (Vague/generic)

**Symbol:** `ColumnInfo.position?: number | undefined` (model.ts:240).
JSDoc: "Ordinal position of column (starting at position 0)."

**Issue:** Bare `position` (number) — a consumer cannot tell from the
field name that it's 0-indexed. The JSDoc clarifies.

**Suggested:** `ColumnInfo.ordinal` (matches the JSDoc "Ordinal position")
or `columnIndex`. **Pass with note** — the field is short and conventional.

---

### 29. `ColumnInfo.typeText` / `typeName` / `typePrecision` / `typeScale` / `typeIntervalType` / `typeJson` — six `type*` fields — category 12 (Duplicate concepts)

**Symbols:** `ColumnInfo.typeText` (model.ts:237), `typeName` (model.ts:238),
`typePrecision` (model.ts:242), `typeScale` (model.ts:244),
`typeIntervalType` (model.ts:246), `typeJson` (model.ts:248).

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

### 30. `RowFilter.functionName` vs `RowFilter.inputColumnNames` vs `RowFilter.inputArguments` plural mismatch — category 9 (Singular/plural mismatch) and category 17 (Inconsistent action verbs)

**Symbols:** `RowFilter.functionName?: string` (model.ts:633),
`RowFilter.inputColumnNames?: string[]` (model.ts:638),
`RowFilter.inputArguments?: PolicyFunctionArgument[]` (model.ts:644).

**Issue:** Naming is consistent for arrays (`columnNames`, `arguments` —
both plural). But:
- `inputColumnNames` is **deprecated** per JSDoc ("This is the replacement
  of the deprecated input_column_names field" — model.ts:641); the
  replacement is `inputArguments`.
- The deprecated field name still exists in the TS surface and is
  generated/marshalled.

**Suggested:** mark `inputColumnNames` with `@deprecated`. Cross-reference
`ColumnMask.usingColumnNames` (model.ts:266) which has the same
deprecation note.

---

### 31. `ColumnMask.usingArguments` vs `RowFilter.inputArguments` action-verb difference — category 17 (Inconsistent action verbs)

**Symbols:** `ColumnMask.usingArguments?: PolicyFunctionArgument[]`
(model.ts:272), `RowFilter.inputArguments?: PolicyFunctionArgument[]`
(model.ts:644).

**Issue:** Both fields have the same purpose (positional arguments to a
SQL UDF), the same type (`PolicyFunctionArgument[]`), and the same JSDoc
shape ("This is the replacement of the deprecated …_column_names field").
But the verb prefix differs: `using…` for masks, `input…` for filters.

**Suggested:** unify on one verb. `inputArguments` is more conventional
(matches "input parameters" common in DB systems). **Flag at port time.**

---

### 32. `PolicyFunctionArgument.arg` field name is too short — category 1 (Vague/generic)

**Symbol:** `PolicyFunctionArgument.arg` (model.ts:606). Discriminated
union of `column` / `constant`.

**Issue:** `arg` is three letters — too short for a public field. The
proto source likely uses `oneof arg`; the generator preserves the field
name. Consumer writes:
```ts
if (positionalArg.arg?.$case === 'column') { ... }
```

Compare to `Dependency.value` (finding 26) and
`EncryptionDetails.encryptionDetailsType` (finding 27) — same pattern,
three different naming conventions. The `arg` here is the most cryptic.

**Suggested:** `argument` (full word) or `kind`.

---

### 33. `PrimaryKeyConstraint.childColumns` vs `ForeignKeyConstraint.childColumns` semantic mismatch — category 6 (Misleading names) and category 12 (Duplicate concepts)

**Symbols:** `PrimaryKeyConstraint.childColumns?: string[]`
(model.ts:624), `ForeignKeyConstraint.childColumns?: string[]`
(model.ts:451).

**Issue:** Both types use `childColumns` for "the columns of this table
participating in the constraint." But:
- For a primary key, "child" is wrong vocabulary — there's no parent. A
  primary key has no parent table.
- For a foreign key, "child" matches the FK domain (child references
  parent). `ForeignKeyConstraint` has both `childColumns` and
  `parentColumns` (model.ts:455) — natural pair.

The `PrimaryKeyConstraint.childColumns` field name is misleading — in PK
context, the columns are simply *the* columns. Cross-reference the wire
form `child_columns` (model.ts:1017, 1125) which inherits the same issue
from upstream.

**Suggested:** rename `PrimaryKeyConstraint.childColumns` to
`PrimaryKeyConstraint.columns`. **Coordinate with protocol team.**

---

### 34. `PrimaryKeyConstraint.timeseriesColumns` vs `ColumnMask.usingColumnNames` plural-vs-singular inconsistency — category 9 (Singular/plural mismatch)

**Symbols:** `PrimaryKeyConstraint.timeseriesColumns?: string[]`
(model.ts:626), `ColumnMask.usingColumnNames?: string[]` (model.ts:266),
`ColumnMask.functionName?: string` (model.ts:260).

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

### 35. `ForeignKeyConstraint.rely` boolean is cryptic — category 5 (Cryptic abbreviations)

**Symbol:** `ForeignKeyConstraint.rely?: boolean | undefined` (model.ts:457).
JSDoc: "True if the constraint is RELY, false or unset if NORELY."

**Issue:** "RELY" / "NORELY" are SQL keywords (Spark's `ALTER TABLE ... RELY`
hint). The JSDoc explains them; the field name alone is opaque. Same
critique applies to `PrimaryKeyConstraint.rely` (model.ts:628).

**Suggested:** rename to `relyEnabled` or `enableRely` — the boolean form
needs an `is…` / `enable…` prefix to match SDK convention. **Coordinate
with protocol team.**

---

### 36. `OptionSpec.isCopiable` typo or unusual spelling — category 5 (Cryptic abbreviations) and category 6 (Misleading names)

**Symbol:** `OptionSpec.isCopiable?: boolean | undefined` (model.ts:598).
JSDoc: "Indicates whether an option should be displayed with copy button
on the UI."

**Issue:** "Copiable" is an unusual spelling — the standard English forms
are "copyable" or "copy-able". The generator picked the less-common form
(likely from the upstream `.proto`).

**Suggested:** `isCopyable`. Wire form `is_copiable` stays for back-compat.
**Coordinate with protocol team.**

---

### 37. `OptionSpec` has many `is…` boolean fields — category 17 (Inconsistent action verbs) — *pass with note*

**Symbols:** `OptionSpec.isRequired` (model.ts:584),
`OptionSpec.isSecret` (model.ts:586), `OptionSpec.isHidden` (model.ts:588),
`OptionSpec.isUpdatable` (model.ts:590), `OptionSpec.isLoggable`
(model.ts:594), `OptionSpec.isCreatable` (model.ts:596),
`OptionSpec.isCopiable` (model.ts:598).

The boolean fields all use the `is…` prefix, which is the right convention
for booleans. **Pass on naming.**

(The number of booleans on `OptionSpec` (7+) is itself a code smell — the
type packs configuration for a UI form, with each boolean controlling a
different aspect of display. A consumer struggling to set all of these
correctly may want a richer type. **Note for upstream.**)

---

### 38. `EffectivePredictiveOptimizationFlag.value` is a generic field on a specific type — category 1 (Vague/generic) and category 15 (Generic field names losing meaning)

**Symbol:** `EffectivePredictiveOptimizationFlag.value?: string`
(model.ts:429). JSDoc: "Whether predictive optimization should be enabled
for this object and objects under it."

**Issue:** The type's *purpose* is to indicate whether PO is enabled. The
field name `value` says nothing about that. The type is also a `string`
(not a `boolean`) — same problem as finding 16.

**Suggested:** rename `value` → `enabled` (boolean) or `state` (matching
the JSDoc's "enabled" sense). **Coordinate with protocol team.**

---

### 39. `EffectivePredictiveOptimizationFlag.inheritedFromType` / `inheritedFromName` — category 17 (Inconsistent action verbs)

**Symbols:** `EffectivePredictiveOptimizationFlag.inheritedFromType?: string`
(model.ts:431), `EffectivePredictiveOptimizationFlag.inheritedFromName?: string`
(model.ts:433).

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

### 40. `TableConstraint.constraint` and `TableConstraint` discriminated-union shape — category 8 (Redundant suffixes) and category 20 (Type-suffix tautology)

**Symbol:** `TableConstraint.constraint` (model.ts:677).

**Issue:** Same problem as finding 27 (`EncryptionDetails.encryptionDetailsType`).
Field repeats the type name's primary token. The discriminated union of
three constraint shapes is wrapped in a field literally named `constraint`.

**Suggested:** rename to a non-repeating field (`kind`, `variant`).

---

### 41. `Client` class name — category 1 (Vague/generic) — *pass*

Package convention. **Pass.**

---

### 42. `Client.createTable` / `deleteTable` / `getTable` / `updateTable` / `listTables` / `tableExists` — *pass*

Standard `{verb}{Resource}` shape. Convention. **Pass.**

(Note: `Client.tableExists` (client.ts:478) breaks the verb-first pattern —
it reads `noun-verb` instead of `verb-noun`. The corresponding shape in
other SDKs is `existsTable` or `checkTableExists`. **Flag at SDK-wide
level.**)

---

### 43. `Client.createTableConstraint` / `deleteTableConstraint` — *pass*

Same `{verb}{Resource}` pattern. **Pass.**

---

### 44. `Client` private fields `host`, `httpClient`, `logger`, `userAgent` — *pass*

Standard. **Pass.**

---

### 45. `PACKAGE_SEGMENT` SCREAMING_SNAKE — category 4 (Underscores in TS identifiers)

**Symbol:** `PACKAGE_SEGMENT` (client.ts:55).

**Issue:** Google TS Style Guide § 5.1 reserves `UPPER_SNAKE_CASE` for true
primitive constants (`MAX_LEN = 10`). `PACKAGE_SEGMENT` is a runtime
object literal `{ key, value }` constructed from a JSON import. The same
identifier is used in every package's `client.ts`.

**Suggested:** `packageSegment` or `clientPackageSegment`. **Flag for
SDK-wide cleanup.**

---

### 46. `HttpCallOptions` interface — category 1 (Vague/generic) and category 20 (Type-suffix tautology)

**Symbol:** `HttpCallOptions` (utils.ts:15).

**Issue:** "HttpCall" is not a concept that exists elsewhere in the SDK;
the file also imports `CallOptions` from `@databricks/sdk-options/call`
(utils.ts:12). Two `…CallOptions` types side by side, with one being the
HTTP-layer context and the other the public retry/rate-limit options.

**Suggested:** `HttpRequestContext` or `ExecuteHttpArgs`. **Flag for
SDK-wide cleanup** — generated boilerplate.

---

### 47. `executeCall` vs `executeHttpCall` verb collision — category 17 (Inconsistent action verbs)

**Symbols:** `executeCall` (utils.ts:26), `executeHttpCall` (utils.ts:65).

**Issue:** Two functions named `execute…Call` that operate at different
layers. The names imply a hierarchical relationship that does not exist.

**Suggested:** rename `executeHttpCall` to `sendAndDecode` or
`doHttpRequest`. **Flag for SDK-wide cleanup.**

---

### 48. `buildHttpRequest`, `readAll`, `flattenQueryParams` — *pass*

Verb-prefixed. Naming is fine. `flattenQueryParams` is used by the
multi-query-param list methods (client.ts:357, 444).

(Cross-check: this package *does* use `flattenQueryParams` indirectly via
the manual `URLSearchParams` construction in `listTables`/`listTableSummaries`
client.ts:311/393. Hmm, actually it doesn't import the helper. Manual
construction with `params.append(...)` is duplicated 14 times across the
file.)

---

### 49. Singular/plural — package name `tables` vs type names singular — category 9 (Singular/plural mismatch) — *pass*

Package: `@databricks/sdk-tables` (plural — collection). Types: `TableInfo`,
`TableSummary`, `TableConstraint`, etc. (singular — one item). SDK-wide
pattern. **Pass.**

---

### 50. `Dependency.value` $case literals (`'table'`, `'function'`, `'connection'`, `'credential'`) all lowercase, no prefix — category 17 (Inconsistent action verbs) — *pass with note*

**Symbols:** `Dependency.value.$case` literals (model.ts:414–417).

**Issue:** The four `$case` literals are plain nouns. Within the file:
- `TableConstraint.constraint.$case` literals (model.ts:679, 683, 687) are
  `'primaryKeyConstraint'` / `'foreignKeyConstraint'` / `'namedTableConstraint'` —
  i.e. *suffixed* with `Constraint`.
- `EncryptionDetails.encryptionDetailsType.$case` literal (model.ts:440) is
  `'sseEncryptionDetails'` — suffixed with `Details`.
- `PolicyFunctionArgument.arg.$case` literals (model.ts:608, 613) are
  `'column'` / `'constant'` — plain nouns, like `Dependency.value`.

So **four discriminated unions, two different naming conventions** for
their $case literals.

**Suggested:** unify on one form. `Dependency`'s short-form literals
(plain nouns) are the cleanest — apply elsewhere. **Flag at port time.**

---

### 51. `parseResponse` ignores `Content-Type` — category 6 (Misleading names) — *pass with note*

**Symbol:** `parseResponse` (utils.ts:113) does `JSON.parse(text)`
unconditionally. The name implies it can handle any response shape; in
practice it only handles JSON.

**Suggested:** rename `parseJsonResponse` to set caller expectations.
**Pass — generated boilerplate.**

---

### 52. `_PropertiesEntry` / `_Response` underscore-suffixed proto-nested type names — category 4 (Underscores in TS identifiers) and category 14 (Go/Java-style names)

**Symbols:** `CreateTableRequest_PropertiesEntry` (model.ts:359),
`DeleteTableConstraintRequest_Response` (model.ts:383),
`DeleteTableRequest_Response` (model.ts:391),
`DeltaRuntimePropertiesKvPairs_DeltaRuntimePropertiesEntry` (model.ts:403),
`ListTableSummariesRequest_Response` (model.ts:505),
`ListTablesRequest_Response` (model.ts:543),
`TableExistsRequest_Response` (model.ts:705),
`TableInfo_PropertiesEntry` (model.ts:782),
`UpdateTableRequest_PropertiesEntry` (model.ts:869),
`UpdateTableRequest_Response` (model.ts:875).

**Issue:** Underscores in PascalCase identifiers are not idiomatic TS
(Google style guide § 5.1 disallows them; the generated code carries an
`eslint-disable-next-line @typescript-eslint/naming-convention` comment
above each). The underscores survive from the proto's nested-message
naming. Several `…_Response` types are *empty* bodies kept only to mirror
the proto definition.

**Suggested:**
- For `_Response` empty bodies: drop the type entirely; the method can
  return `void`.
- For `_PropertiesEntry` / `_DeltaRuntimePropertiesEntry` map-entry types:
  drop or inline — `Record<string, string>` is sufficient.
- For non-empty responses (`ListTablesRequest_Response`,
  `TableExistsRequest_Response`): rename to `ListTablesResponse`,
  `TableExistsResponse` (PascalCase, no underscore).

**Flag for SDK-wide generator cleanup.**

---

## Cross-package alignment recommendations

### A. `Dependency` family duplicated in three packages

`tables`, `functions`, and `registeredmodels` each export the same six
types: `Dependency`, `DependencyList`, `TableDependency`, `FunctionDependency`,
`ConnectionDependency`, `CredentialDependency`. Same shape, same fields,
three copies. Strong P0 candidate for hoisting to
`@databricks/sdk-core/dependency`.

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

`catalogs/v1/model.ts` defines the same type as
`tables/v1/model.ts:427`. Three fields (`value`, `inheritedFromType`,
`inheritedFromName`).

**Suggested:** hoist or pick a canonical home.

---

### E. `ColumnTypeName` defined in `tables` and `functions`

`functions/v1/model.ts:5` defines the same enum. The shared SQL/Spark
data-type values overlap heavily.

**Suggested:** hoist to `@databricks/sdk-core/sql-types`.

---

### F. `RowFilter` / `ColumnMask` vs. `abacpolicies.RowFilterOptions` / `abacpolicies.ColumnMaskOptions` shape divergence

`tables/v1/model.ts:631` defines `RowFilter` and `tables/v1/model.ts:258`
defines `ColumnMask`. `abacpolicies/v1/model.ts` defines
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
- `tables.TableType` (model.ts:189) — 9 values for UC table classifications.
- `tables.SecurableKind` (model.ts:78) — 70+ values, mostly `TABLE_*`
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
| **High** (style guide violations, dead/empty types, cross-package collisions, misleading semantics, proto-architectural leaks) | 18 | #1, #5, #12, #13, #14, #16, #18, #25, #26, #33, #38, #45, #53, #54, #55, #56, #57, #58 |
| **Medium** (naming clarity, verbose, redundant suffixes, JSDoc drift) | 21 | #2, #4, #6, #7, #8, #9, #10, #11, #15, #17, #20, #21, #23, #24, #27, #29, #30, #31, #35, #40, #52 |
| **Low / SDK-wide note** (generator boilerplate, not local fix) | 10 | #3, #19, #32, #34, #36, #39, #46, #47, #50, #51 |
| **Pass / acceptable** | 9 | #22, #28, #37, #41, #42, #43, #44, #48, #49 |

---

## Top fixes (highest local return)

1. **#1** — fix `DeltaRuntimePropertiesKvpairs` (field) /
   `DeltaRuntimePropertiesKvPairs` (type) casing mismatch. Local, mechanical
   rename.
2. **#12** — drop the `Arg` suffix from `fullNameArg` SDK-wide. Higher
   impact (changes wire field name) but eliminates a Go-style convention.
3. **#16** — type `enablePredictiveOptimization` as a real enum instead of
   a free-form string. Improves type safety.
4. **#26 / #27 / #32 / #40** — unify discriminated-union container field
   names (`value` vs `encryptionDetailsType` vs `arg` vs `constraint`).
   Within-file consistency fix.
5. **#24** — rename `ListTableSummariesRequest_Response.tables` to
   `summaries` (or `tableSummaries`). Easy local fix.

---

---

### 53. `OptionSpec_OauthStage` / `OptionSpec_OptionType` proto-nested infix — file:line model.ts:209, 222

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
nesting; the eslint-disable comments on lines 208, 221 acknowledge the
non-idiomatic shape.

---

### 54. `OptionSpec` type name carries a `Spec` config-suffix — file:line model.ts:563

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

### 55. `SecurableKindManifest` type name — file:line model.ts:648

**Why:** `Manifest` is a config-style suffix (analogous to `Spec`/`Config`).
It tags the type as a descriptor message rather than a domain concept.

**Category:** proto-architectural-leak (config-suffix style).

**Suggested:** `SecurableKindCapabilities` (matches `capabilities` field
content) or fold into a richer `SecurableKind`-keyed structure.

**Rationale:** the type holds five fields (`securableType`, `securableKind`,
`assignablePrivileges`, `options`, `capabilities`) — the `Manifest` token
adds no information beyond "this is the descriptor".

---

### 56. `ColumnInfo`, `TableInfo`, `TableSummary` — repeated `Info`/`Summary` config-suffix — file:line model.ts:233, 710, 787

**Why:** `Info` and `Summary` are generic descriptor-suffixes used to
distinguish the wire/RPC message from the domain noun (`Column`, `Table`).
Two `…Info` types and a `…Summary` type in the same file flag this as a
repeated config-suffix pattern.

**Category:** proto-architectural-leak (repeated `Info` config-suffix).

**Suggested:** `Column`, `Table`, `TableOverview` (or collapse all three
into `Table` per finding #13).

**Rationale:** in a TS surface the noun *is* the type; the `Info`/`Summary`
tag exists only to disambiguate from the proto request/response messages
and from server-internal representations — a generator/architectural leak.

---

### 57. `EncryptionDetails` / `SseEncryptionDetails` — repeated `Details` config-suffix — file:line model.ts:437, 662

**Why:** Two `…Details` types in the same file. `Details` is a generic
"descriptor" suffix with no domain meaning — same family as `Info`/`Spec`.

**Category:** proto-architectural-leak (repeated `Details` config-suffix).

**Suggested:** `Encryption` and `SseEncryption` (or `SseEncryptionConfig`
if disambiguation is needed). The discriminated-union container field
`encryptionDetailsType` (finding #27) then becomes `encryption.kind` — and
the redundant `Details` token disappears.

**Rationale:** `Details` is generator boilerplate for proto messages
wrapping `oneof`s or option blobs; idiomatic TS uses the bare domain noun.

---

### 58. `dataAccessConfigurationId` field — `Configuration` mid-position config-suffix — file:line model.ts:327, 750, 837

**Why:** `Configuration` mid-token (between `DataAccess` and `Id`) is a
config-suffix occurrence inside a field name. The wire form is
`data_access_configuration_id`; the TS form repeats the noise.

**Category:** proto-architectural-leak (`Config` family mid-position).

**Suggested:** `dataAccessConfigId` (shorter) or `dataAccessId` if the
"configuration" is implicit (the value already identifies a config record).

**Rationale:** five-token field names with a mid `Configuration` token are
a strong signal of proto-style verbose naming surviving the wire→TS port.

---

## Fixed

- #18 `TableExists` (originally cited at model.ts:761): Fixed in regeneration on 2026-05-20 — request type renamed to `TableExistsRequest`, resolving the verb-as-noun reading on the request surface.
- #19 Request type naming pattern is inconsistent (originally cited at model.ts:322, 411, 417, 419, 432, 517, 528, 566, 594, 761, 857, 399): Fixed in regeneration on 2026-05-20 — all request types now carry the `Request` suffix (`CreateTableRequest`, `DeleteTableRequest`, `DeleteTableConstraintRequest`, `GetTableRequest`, `ListTablesRequest`, `ListTableSummariesRequest`, `TableExistsRequest`, `UpdateTableRequest`, `CreateTableConstraintRequest`).
- #45 `ConditionalDisplay.dependsOnOption` vs `hiddenWhenValues` field naming asymmetry (originally cited at model.ts:307, 313): Fixed in regeneration on 2026-05-20 — the `ConditionalDisplay` interface is no longer generated for this package.
- #32 (partial) — `VolumeDependency` and `SecretDependency` (originally cited at model.ts:704, 940 with the rest of the Dependency family): Fixed in regeneration on 2026-05-20 — those two leaf types and the `volume` / `secret` discriminated-union cases were removed from `Dependency`; the cross-package duplication concern (now finding #25) still applies to the four remaining leaf types.
