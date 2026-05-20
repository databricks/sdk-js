# Naming Audit: externallocations

**Path:** `packages/externallocations/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-externallocations` (workspace package; the
folder is one word `externallocations`, no hyphen, no underscore).
**Inferred domain:** Unity Catalog External Locations — manages a single
resource type "external location" (a named pointer at cloud-storage URI plus
storage credential) with five operations (create / get / list / list-iter /
update / delete) at `/api/2.1/unity-catalog/external-locations`. The interesting
sub-structure is `FileEventQueue` — an oneof-of-oneofs across four cloud
providers (Azure AQS, AWS SQS, GCP Pub/Sub, OneLake Fabric Eventstream) with a
parallel "provided" vs "managed" axis (8 cases total).
**Total weird names flagged:** 15

---

## Summary table

| #   | Name                                                                          | File              | Kind               | Severity | Category                                            | Issue (one-liner)                                                                                                                                                                                                                                                          |
| --- | ----------------------------------------------------------------------------- | ----------------- | ------------------ | -------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | package folder `externallocations`                                            | (package)         | package            | Low      | 7 Overly verbose                                    | Compound noun jammed together with no separator. Sibling packages with the same pattern: `accountaccesscontrol`, `cleanroomtaskruns`. The `npm` package is `@databricks/sdk-externallocations`. `external-locations` would be more readable but the rest of the SDK uses the same one-word convention. |
| 2   | `Client`                                                                      | client.ts:44      | class              | Medium   | 1 Vague/generic, 12 Duplicate concepts              | Unqualified `Client`. Every package in the SDK exports a class literally named `Client`; importers must alias on collision. `ExternalLocationsClient` would self-identify.                                                                                                  |
| 3   | `IsolationMode` enum values                                                   | model.ts:5-10     | enum values        | High     | 2 Redundant enum prefixes, 18 Long enum values      | All four members stutter the enum name (`ISOLATION_MODE_UNSPECIFIED`, `ISOLATION_MODE_OPEN`, `ISOLATION_MODE_ISOLATED`, `ISOLATION_MODE_OPEN_IN_ACCOUNT`). TS idiom is `IsolationMode.Open`/`.Isolated`/`.OpenInAccount`. Same finding appears in `credentials.md`/`catalogs.md` — generator-wide. |
| 4   | `IsolationMode.ISOLATION_MODE_UNSPECIFIED`                                    | model.ts:6        | enum value         | Medium   | 6 Misleading names, 18 Long enum values             | Proto-style "Unspecified" sentinel value. The field type is `isolationMode?: IsolationMode \| undefined` — TS already expresses "unspecified" by omitting the field. The sentinel is dead.                                                                                 |
| 5   | `IsolationMode.ISOLATION_MODE_OPEN_IN_ACCOUNT`                                | model.ts:9        | enum value         | Low      | 18 Long enum values, 6 Misleading names             | 30-char enum value; contracts to `OpenInAccount`. The domain meaning ("open scope within a single account") is opaque even after contracting.                                                                                                                              |
| 6   | `SseEncryptionAlgorithm` enum values                                          | model.ts:12-16    | enum values        | High     | 2 Redundant enum prefixes, 18 Long enum values, 3 Acronym casing | Three members `SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED`, `AWS_SSE_S3`, `AWS_SSE_KMS`. The first stutters the enum name (40 chars). The other two redundantly carry an `AWS_` prefix (the type name already says SSE which is AWS terminology). Should be `Unspecified`/`SseS3`/`SseKms`, or just `S3`/`Kms` since the wrapping `Sse*` already says S3-server-side. |
| 7   | `SseEncryptionAlgorithm.SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED`                 | model.ts:13       | enum value         | Medium   | 6 Misleading names, 18 Long enum values             | Same proto-Unspecified pattern. The field `algorithm?: SseEncryptionAlgorithm \| undefined` already encodes "unset".                                                                                                                                                       |
| 8   | `AwsSqsQueue` type vs `AzureQueueStorage` type vs `GcpPubsub` type vs `OneLakeEventQueue` type | model.ts:18, 28, 186, 240 | type set         | Medium   | (none individually, taken as set: inconsistent)    | The four queue-config types use four different naming conventions: `AwsSqsQueue` (cloud + service + Queue), `AzureQueueStorage` (cloud + AzureProduct, no Queue suffix), `GcpPubsub` (cloud + product, no Queue suffix), `OneLakeEventQueue` (product + EventQueue suffix, no "Microsoft"/"Azure" prefix). Pick one. E.g., `AwsSqsConfig`/`AzureAqsConfig`/`GcpPubsubConfig`/`OneLakeConfig`. |
| 9   | `AwsSqsQueue.queueUrl` JSDoc says "AQS queue url"                             | model.ts:20       | doc                | Medium   | 6 Misleading names                                  | The type is **AWS SQS**, but the JSDoc says "The AQS queue url" — AQS is *Azure* Queue Storage (the next type over). Copy-paste error from `AzureQueueStorage.queueUrl`. Misleading for any AWS user reading docs.                                                          |
| 10  | `GcpPubsub` (lowercase "ubsub")                                               | model.ts:186      | type               | Low      | 3 Acronym casing                                    | Pub/Sub is conventionally written with a slash and two capitals. The code uses `Pubsub` (one capital). Sibling discriminators use `providedPubsub`/`managedPubsub`. Consistent internally, but non-canonical.                                                               |
| 11  | `AzureQueueStorage`                                                           | model.ts:28       | type               | Medium   | 6 Misleading names                                  | The Azure product is "Azure Queue Storage", which the wire/`provided_aqs`/`managed_aqs` shortens to AQS. So `AzureQueueStorage` is the long name, but two of its callers (`providedAqs`/`managedAqs` fields and case literals) use the AQS abbreviation. Pick one canonical form. |
| 12  | `OneLakeEventQueue` vs `OneLake` (no Azure/Fabric prefix)                     | model.ts:240      | type               | Low      | 3 Acronym casing, 1 Vague/generic                   | OneLake is a Microsoft Fabric product. Other Azure-side types in the file lead with `Azure`. `OneLake` requires Fabric product knowledge to recognize.                                                                                                                       |
| 13  | `Pubsub` casing inside `GcpPubsub`                                            | model.ts:186      | type               | Low      | 3 Acronym casing                                    | GCP's product brand is "Pub/Sub". The TS type uses `Pubsub`. Consistent with field names but not with marketing. Same applies to `providedPubsub`/`managedPubsub`.                                                                                                          |
| 14  | `nameArg` field                                                                | model.ts:103, 198, 263 | field             | High     | 5 Cryptic abbreviations, 14 Go/Java-style names    | Three request types (`DeleteExternalLocation`, `GetExternalLocation`, `UpdateExternalLocation`) carry a field named `nameArg`. The `Arg` suffix is a generator artifact (it exists because some envelopes also carry a body-level `name`). TS callers reading `req.nameArg = 'my-loc'` get no hint of why it isn't `name`. |
| 15  | `providedOnelake` / `managedOnelake` (case key spelling)                       | model.ts:176, 182 | field              | Medium   | 3 Acronym casing                                    | OneLake is officially "OneLake" (camelCase capitalized "L"). The case key spells it `Onelake` (one capital). The interface name uses `OneLake` (two capitals). Inconsistent within the same file.                                                                            |

---

## High severity (must fix)

### H1. Two `IsolationMode` and `SseEncryptionAlgorithm` enums stutter their enum name

```ts
enum IsolationMode {
  ISOLATION_MODE_UNSPECIFIED = 'ISOLATION_MODE_UNSPECIFIED',
  ISOLATION_MODE_OPEN = 'ISOLATION_MODE_OPEN',
  ISOLATION_MODE_ISOLATED = 'ISOLATION_MODE_ISOLATED',
  ISOLATION_MODE_OPEN_IN_ACCOUNT = 'ISOLATION_MODE_OPEN_IN_ACCOUNT',
}

enum SseEncryptionAlgorithm {
  SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED = 'SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED',
  AWS_SSE_S3 = 'AWS_SSE_S3',
  AWS_SSE_KMS = 'AWS_SSE_KMS',
}
```

Per the Google TypeScript Style Guide §5.6, enum members should be PascalCase
and should not redundantly carry the enum name:

```ts
enum IsolationMode {
  Unspecified,
  Open,
  Isolated,
  OpenInAccount,
}

enum SseEncryptionAlgorithm {
  Unspecified,
  S3,    // or SseS3 if we want to keep the SSE marker
  Kms,
}
```

The wire-format strings must keep their SCREAMING_SNAKE form (the API server
demands them), but the TS-side keys can be remapped via the zod `transform`
without breaking the wire. Same finding appears in `credentials.md` (M4) and
`catalogs.md` (20.3).

### H2. `nameArg` is a generator artifact

Three request types carry a field called `nameArg`:

- `DeleteExternalLocation.nameArg` (model.ts:103)
- `GetExternalLocation.nameArg` (model.ts:198)
- `UpdateExternalLocation.nameArg` (model.ts:263)

The `Arg` suffix is meaningless to a TS caller. It exists only because the
generator needs to disambiguate the path-parameter `name` from the body-field
`name` on `UpdateExternalLocation`. Renaming it to `externalLocationName` or
just `name` (and dropping the body-level `name` on Update) would clarify.

```ts
// Today:
await client.deleteExternalLocation({nameArg: 'my-loc', force: true});

// Cleaner:
await client.deleteExternalLocation({name: 'my-loc', force: true});
```

This finding mirrors `credentials.md` H4 and applies generator-wide.

---

## Medium severity (worth pushing back on)

### M1. `AwsSqsQueue.queueUrl` JSDoc says "AQS"

```ts
export interface AwsSqsQueue {
  /**
   * The AQS queue url in the format https://sqs.{region}.amazonaws.com/{account id}/{queue name}.
   * Only required for provided_sqs.
   */
  queueUrl?: string | undefined;
  // ...
}
```

The type is **AWS SQS**, but the doc string starts "The AQS queue url" — AQS
is Azure Queue Storage. Copy-paste error from the sibling `AzureQueueStorage.queueUrl`
JSDoc (lines 29-32). Wire-format example string is correct (AWS SQS); only the
prose is wrong. Confusing for any AWS user.

### M2. The four cloud-provider queue types use four different naming conventions

```ts
interface AwsSqsQueue          { ... }  // cloud + service + Queue
interface AzureQueueStorage    { ... }  // cloud + product, no suffix
interface GcpPubsub            { ... }  // cloud + product, no suffix
interface OneLakeEventQueue    { ... }  // product + EventQueue suffix, no Microsoft/Azure prefix
```

Four naming patterns for four parallel types. Pick one:

- All with `Queue` suffix: `AwsSqsQueue`, `AzureAqsQueue`, `GcpPubsubQueue`,
  `OneLakeQueue`.
- All without: `AwsSqs`, `AzureQueueStorage`, `GcpPubsub`, `OneLakeEventStream`.
- All as `Config`: `AwsSqsConfig`, `AzureAqsConfig`, etc.

### M3. `OneLake` casing inconsistency

The type name is `OneLakeEventQueue` (two capitals). The discriminator case
keys are `providedOnelake` / `managedOnelake` (one capital `L`, lowercased).
The wire format is `provided_onelake` / `managed_onelake` (all lowercase).
Within one file the brand name is rendered three different ways. Microsoft's
spelling is "OneLake".

### M4. `AzureQueueStorage` vs `Aqs` abbreviation

The interface name is `AzureQueueStorage`, but two of its consumers (the
discriminator case keys `providedAqs`/`managedAqs` and the wire-format string
`provided_aqs`/`managed_aqs`) use the abbreviation `AQS`. The abbreviation is
not standard Microsoft terminology — Microsoft's docs call this "Azure Queue
Storage" or "Azure Storage Queues". `AQS` is Databricks-internal shorthand.

### M5. `Pubsub` casing

GCP's product is "Pub/Sub" (with slash and two capitals). The TS type is
`GcpPubsub` (one capital). Internally consistent (the discriminator cases
`providedPubsub`/`managedPubsub` match), but not the canonical GCP spelling.

---

## Low severity (nits)

_None._

---

## Cross-cutting observations (not flags)

### Generator marker

Every file is prefixed with `// Code generated from API definition by
Databricks SDK Generator. DO NOT EDIT.` All naming issues here must be fixed
upstream in the generator/spec.

### Optionality model

Every field is `T | undefined`. Matches the repo's `exactOptionalPropertyTypes`
setting. Consistent across the SDK.

### Acronym inventory

The following acronyms appear:

| Acronym  | Casing in code   | Notes                                                       |
| -------- | ---------------- | ----------------------------------------------------------- |
| AWS      | `Aws`            | Initialism-as-word per Google TS Style Guide.               |
| S3       | `S3` (in `AWS_SSE_S3`); `s3` (JSDoc on line 250) | Mixed.       |
| SQS      | `Sqs`            | Initialism-as-word.                                          |
| SSE      | `Sse`            | Initialism-as-word.                                          |
| KMS      | `Kms`            | Initialism-as-word.                                          |
| ARN      | `Arn`            | Initialism-as-word.                                          |
| IAM      | not in this pkg  | Used in sibling packages with `Iam` initialism-as-word.      |
| Azure    | `Azure`          | Not an acronym.                                              |
| AQS      | `Aqs`            | Databricks-internal abbreviation, not Microsoft canonical.   |
| GCP      | `Gcp`            | Initialism-as-word.                                          |
| Pub/Sub  | `Pubsub`         | Non-canonical (Google spells `Pub/Sub`).                     |
| OneLake  | `OneLake` (type), `Onelake` (case keys) | Inconsistent. Microsoft spells `OneLake`. |
| URL      | `url` (lower; field name); `Url` (in `queueUrl`, `eventHubUrl`) | Standard. |
| ID       | `Id` (in `metastoreId`, `credentialId`, `managedResourceId`, `subscriptionId`) | Initialism-as-word. |

---

## Summary

15 findings:

- **2 High severity** — enum stutter, `nameArg` artifact.
- **5 Medium severity** — `AQS` JSDoc copy-paste error in AWS type,
  naming-pattern inconsistency across the four queue types, OneLake casing
  inconsistency, AQS abbreviation, Pubsub casing.
- **0 Low severity (nits)**.

Primary themes:

1. **Generator-encoded proto patterns**: SCREAMING_SNAKE enum members and the
   `nameArg` path-vs-body disambiguation are proto/Go-SDK artifacts that
   idiomatic TS would express differently.
2. **Cloud-provider naming is internally inconsistent**: four queue-config
   types with four different naming conventions, OneLake spelled three ways,
   AQS abbreviation that isn't Microsoft canonical, copy-paste error mixing
   AWS SQS and Azure AQS in one JSDoc.
