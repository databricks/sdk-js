# Naming Audit: externallocations

**Path:** `packages/externallocations/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-externallocations` (workspace package; the
folder is one word `externallocations`, no hyphen, no underscore).
**Inferred domain:** Unity Catalog External Locations — manages a single
resource type "external location" (a named pointer at cloud-storage URI plus
storage credential) with five operations (create / get / list / list-iter /
update / delete) at `/api/2.1/unity-catalog/external-locations`. The interesting
sub-structure is `FileEventQueue` — an oneof-of-oneofs across three cloud
providers (Azure AQS, AWS SQS, GCP Pub/Sub) with a parallel "provided" vs
"managed" axis (6 cases total).
**Total weird names flagged:** 12

---

## Summary table

| #   | Name                                                                          | File              | Kind               | Severity | Category                                            | Issue (one-liner)                                                                                                                                                                                                                                                          |
| --- | ----------------------------------------------------------------------------- | ----------------- | ------------------ | -------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | package folder `externallocations`                                            | (package)         | package            | Low      | 7 Overly verbose                                    | Compound noun jammed together with no separator. Sibling packages with the same pattern: `accountaccesscontrol`, `cleanroomtaskruns`. The `npm` package is `@databricks/sdk-externallocations`. `external-locations` would be more readable but the rest of the SDK uses the same one-word convention. |
| 2   | `Client`                                                                      | client.ts:44      | class              | Medium   | 1 Vague/generic, 12 Duplicate concepts              | Unqualified `Client`. Every package in the SDK exports a class literally named `Client`; importers must alias on collision. `ExternalLocationsClient` would self-identify.                                                                                                  |
| 3   | `SseEncryptionAlgorithm.AWS_SSE_S3` / `AWS_SSE_KMS`                           | model.ts:13-14    | enum values        | Medium   | 3 Acronym casing                                    | The two non-sentinel members redundantly carry an `AWS_` prefix (the enclosing type name already says SSE which is AWS terminology). The wrapping `Sse*` already implies S3-server-side, so the leading `AWS_` is duplicative.                                              |
| 4   | `AwsSqsQueue` type vs `AzureQueueStorage` type vs `GcpPubsub` type            | model.ts:17, 27, 183 | type set         | Medium   | (none individually, taken as set: inconsistent)    | The three queue-config types use three different naming conventions: `AwsSqsQueue` (cloud + service + Queue), `AzureQueueStorage` (cloud + AzureProduct, no Queue suffix), `GcpPubsub` (cloud + product, no Queue suffix). Pick one. E.g., `AwsSqsConfig`/`AzureAqsConfig`/`GcpPubsubConfig`. |
| 5   | `GcpPubsub` (lowercase "ubsub")                                               | model.ts:183      | type               | Low      | 3 Acronym casing                                    | Pub/Sub is conventionally written with a slash and two capitals. The code uses `Pubsub` (one capital). Sibling discriminators use `providedPubsub`/`managedPubsub`. Consistent internally, but non-canonical.                                                               |
| 6   | `AzureQueueStorage`                                                           | model.ts:27       | type               | Medium   | 6 Misleading names                                  | The Azure product is "Azure Queue Storage", which the wire/`provided_aqs`/`managed_aqs` shortens to AQS. So `AzureQueueStorage` is the long name, but two of its callers (`providedAqs`/`managedAqs` fields and case literals) use the AQS abbreviation. Pick one canonical form. |
| 7   | `nameArg` field                                                                | model.ts:102, 195, 244 | field             | High     | 5 Cryptic abbreviations, 14 Go/Java-style names    | Three request types (`DeleteExternalLocationRequest`, `GetExternalLocationRequest`, `UpdateExternalLocationRequest`) carry a field named `nameArg`. The `Arg` suffix is a generator artifact (it exists because some envelopes also carry a body-level `name`). TS callers reading `req.nameArg = 'my-loc'` get no hint of why it isn't `name`. |
| 8   | `DeleteExternalLocationRequest_Response`                                       | model.ts:108      | type               | High     | 16 Proto-architectural-leak names                   | Underscore-delimited proto-nested message name leaked through to the TS public surface. The `_Response` suffix is a Go/Protobuf RPC convention; idiomatic TS would name this `DeleteExternalLocationResponse` (or omit it entirely when the body is empty). |
| 9   | `ListExternalLocationsRequest_Response`                                        | model.ts:221      | type               | High     | 16 Proto-architectural-leak names                   | Same proto-nested underscore pattern. Should be `ListExternalLocationsResponse`. The leading `Request_` infix is meaningless to a TS caller — the response is not "the response of a request type", it is the list response. |
| 10  | `unmarshalDeleteExternalLocationRequest_ResponseSchema`                        | model.ts:324      | const              | High     | 16 Proto-architectural-leak names                   | Schema constant inherits the proto-nested `Request_Response` identifier. Should track whatever the renamed type becomes (e.g., `unmarshalDeleteExternalLocationResponseSchema`). |
| 11  | `unmarshalListExternalLocationsRequest_ResponseSchema`                         | model.ts:436      | const              | High     | 16 Proto-architectural-leak names                   | Same proto-nested underscore pattern carried into schema constant naming. |
| 12  | `ExternalLocationInfo`                                                         | model.ts:121      | type               | Medium   | 16 Proto-architectural-leak names, 7 Overly verbose | The `Info` suffix is a Go/proto convention for the resource-representation message; in idiomatic TS the type for "an external location" is just `ExternalLocation`. The suffix carries no semantic value (there is no `ExternalLocation` vs `ExternalLocationInfo` distinction) and adds noise to every reference (`Promise<ExternalLocationInfo>`, `ExternalLocationInfo[]`). |

---

## High severity (must fix)

### H1. `nameArg` is a generator artifact

Three request types carry a field called `nameArg`:

- `DeleteExternalLocationRequest.nameArg` (model.ts:102)
- `GetExternalLocationRequest.nameArg` (model.ts:195)
- `UpdateExternalLocationRequest.nameArg` (model.ts:244)

The `Arg` suffix is meaningless to a TS caller. It exists only because the
generator needs to disambiguate the path-parameter `name` from the body-field
`name` on `UpdateExternalLocationRequest`. Renaming it to `externalLocationName`
or just `name` (and dropping the body-level `name` on Update) would clarify.

```ts
// Today:
await client.deleteExternalLocation({nameArg: 'my-loc', force: true});

// Cleaner:
await client.deleteExternalLocation({name: 'my-loc', force: true});
```

This finding mirrors `credentials.md` H4 and applies generator-wide.

### H2. `DeleteExternalLocationRequest_Response` — proto-nested underscore in public type

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteExternalLocationRequest_Response {}
```

The `Request_Response` underscore identifier is a Protobuf nested-message
convention leaked verbatim into the TS public API. The escape-hatch ESLint
disable comment is itself a tell. Idiomatic TS would either:

- name the response `DeleteExternalLocationResponse` (drop the `Request_`
  infix; the response is a sibling of the request, not nested under it), or
- collapse the empty-body response into `Promise<void>` since the wire
  envelope carries no fields.

The schema constant `unmarshalDeleteExternalLocationRequest_ResponseSchema`
(model.ts:324) and the client return type at client.ts:105 inherit the same
name and need to move together.

### H3. `ListExternalLocationsRequest_Response` — same proto-nested pattern

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListExternalLocationsRequest_Response {
  /** An array of external locations. */
  externalLocations?: ExternalLocationInfo[] | undefined;
  // ...
}
```

Same shape as H2: an underscore-delimited proto-nested identifier in the
public surface. Should be `ListExternalLocationsResponse`. The schema constant
`unmarshalListExternalLocationsRequest_ResponseSchema` (model.ts:436) and the
client return type at client.ts:182 share the rename.

This is the only paginated response shape in the package, so the type is
materially load-bearing — callers iterating manually have to read
`resp.nextPageToken` against this type.

---

## Medium severity (worth pushing back on)

### M1. `SseEncryptionAlgorithm` members carry redundant `AWS_` prefix

```ts
enum SseEncryptionAlgorithm {
  SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED = 'SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED',
  AWS_SSE_S3 = 'AWS_SSE_S3',
  AWS_SSE_KMS = 'AWS_SSE_KMS',
}
```

The two non-sentinel members duplicate the AWS context that is already
implicit in the enclosing `SseEncryptionAlgorithm` type — SSE-S3 and SSE-KMS
are AWS-only concepts. Within the proto-style identifier convention these
could read as plain `SSE_S3` / `SSE_KMS`, or even `S3` / `KMS` since the
wrapping type already says SSE.

### M2. The three cloud-provider queue types use three different naming conventions

```ts
interface AwsSqsQueue          { ... }  // cloud + service + Queue
interface AzureQueueStorage    { ... }  // cloud + product, no suffix
interface GcpPubsub            { ... }  // cloud + product, no suffix
```

Three naming patterns for three parallel types. Pick one:

- All with `Queue` suffix: `AwsSqsQueue`, `AzureAqsQueue`, `GcpPubsubQueue`.
- All without: `AwsSqs`, `AzureQueueStorage`, `GcpPubsub`.
- All as `Config`: `AwsSqsConfig`, `AzureAqsConfig`, `GcpPubsubConfig`.

### M3. `AzureQueueStorage` vs `Aqs` abbreviation

The interface name is `AzureQueueStorage`, but two of its consumers (the
discriminator case keys `providedAqs`/`managedAqs` and the wire-format string
`provided_aqs`/`managed_aqs`) use the abbreviation `AQS`. The abbreviation is
not standard Microsoft terminology — Microsoft's docs call this "Azure Queue
Storage" or "Azure Storage Queues". `AQS` is Databricks-internal shorthand.

### M4. `Pubsub` casing

GCP's product is "Pub/Sub" (with slash and two capitals). The TS type is
`GcpPubsub` (one capital). Internally consistent (the discriminator cases
`providedPubsub`/`managedPubsub` match), but not the canonical GCP spelling.

### M5. `ExternalLocationInfo` — `Info` suffix carries no semantic value

```ts
export interface ExternalLocationInfo { ... }
```

`ExternalLocationInfo` is the resource representation type for an external
location. The `Info` suffix is a Go/Protobuf convention (cf. `ClusterInfo`,
`JobInfo` across the rest of the SDK) — there is no companion
`ExternalLocation` type without the suffix to disambiguate against. In
idiomatic TS this would just be `ExternalLocation`.

The suffix shows up in every signature touching the resource:

- `Promise<ExternalLocationInfo>` (4 client method return types).
- `ExternalLocationInfo[]` in `ListExternalLocationsRequest_Response`.
- `AsyncGenerator<ExternalLocationInfo>` in the iter method.
- The schema constant `unmarshalExternalLocationInfoSchema`.

Renaming to `ExternalLocation` removes ~6 occurrences of dead-weight suffix
across the public surface.

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
| S3       | `S3` (in `AWS_SSE_S3`); `s3` (JSDoc on line 230) | Mixed.       |
| SQS      | `Sqs`            | Initialism-as-word.                                          |
| SSE      | `Sse`            | Initialism-as-word.                                          |
| KMS      | `Kms`            | Initialism-as-word.                                          |
| ARN      | `Arn`            | Initialism-as-word.                                          |
| IAM      | not in this pkg  | Used in sibling packages with `Iam` initialism-as-word.      |
| Azure    | `Azure`          | Not an acronym.                                              |
| AQS      | `Aqs`            | Databricks-internal abbreviation, not Microsoft canonical.   |
| GCP      | `Gcp`            | Initialism-as-word.                                          |
| Pub/Sub  | `Pubsub`         | Non-canonical (Google spells `Pub/Sub`).                     |
| URL      | `url` (lower; field name); `Url` (in `queueUrl`)  | Standard. |
| ID       | `Id` (in `metastoreId`, `credentialId`, `managedResourceId`, `subscriptionId`) | Initialism-as-word. |

---

## Summary

12 findings:

- **5 High severity** — `nameArg` artifact, two `Request_Response`
  proto-nested type names, two matching schema-constant names.
- **6 Medium severity** — `Client` collision, redundant `AWS_` prefix on
  `SseEncryptionAlgorithm` members, queue-type naming-pattern inconsistency,
  `AzureQueueStorage`/`Aqs` long-vs-short inconsistency, `Pubsub` casing,
  `ExternalLocationInfo` redundant `Info` suffix.
- **1 Low severity** — `externallocations` package folder verbosity.

Primary themes:

1. **Proto-architectural-leak names**: the `Request_Response` underscore
   identifiers, the `Info` suffix on the resource type, and the `nameArg`
   path-vs-body disambiguation are all Go-/Protobuf-shaped idioms that
   idiomatic TS would express differently. The ESLint disable comments on
   model.ts:107 / 220 / 323 / 435 are themselves the giveaway.
2. **Cloud-provider naming is internally inconsistent**: three queue-config
   types with three different naming conventions, AQS abbreviation that isn't
   Microsoft canonical.

---
