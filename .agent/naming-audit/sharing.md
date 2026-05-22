# Naming Audit: sharing

**Path:** `packages/sharing/src/v1/`
**Versions audited:** v1
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `transport.ts`, `index.ts`
**Inferred domain:** Delta Sharing — providers, recipients, shares, share
permissions, federation policies, and provider-share asset listing. Models
the cross-metastore Delta Sharing flow: a Databricks data provider exposes
shares (collections of tables/views/volumes/notebooks/functions/models)
to one or more recipients (other Databricks metastores or external OIDC /
token-authenticated clients).
**Total weird names flagged:** 5

## Summary

| Severity | Count |
| --- | --- |
| High | 2 |
| Medium | 2 |
| Low | 1 |
| Observation | 0 |
| **Total** | **5** |

The audit is narrowly scoped to proto/architectural leaks. The package's
main pattern is a `*Info` "metadata-message" suffix that proto uses to
distinguish a slim identifier message from the populated entity message;
in TS it collapses to redundant type-naming for what is just *the entity*.
The remaining flag is on `PartitionSpecification`, an empty top-level
interface that exists only to namespace its nested proto types.
`DeltaSharing*` (a real product name) and standard `*Request` / `*Response`
end suffixes are not flagged.

---

## High severity (must fix)

### 1. `*Info` suffix repeated across the core entity surface — `model.ts:739, 774, 845, 902, 331, 358`
- **Why:** Five entity types use the proto-style `*Info` "metadata
  message" suffix: `ProviderInfo` (model.ts:739), `RecipientInfo`
  (model.ts:774), `RecipientTokenInfo` (model.ts:845), `ShareInfo`
  (model.ts:902), and `FunctionParameterInfo` (model.ts:331) plus the
  pluralised wrapper `FunctionParameterInfos` (model.ts:358). In every
  case the type IS the entity, not metadata *about* the entity — there
  is no `Provider` / `Recipient` / `RecipientToken` / `FunctionParameter`
  counterpart that `*Info` would document the metadata of. The `Info`
  suffix originates from the proto-message convention where the slim
  identifier message (`Provider { name }`) and the fat populated
  message (`ProviderInfo { name, owner, comment, ... }`) coexist; in
  the TS surface only the fat form survives, so the suffix has nothing
  to distinguish.
- **Category:** Proto-architecture leak (repeated `Info` suffix across
  sibling entity types)
- **Suggested:** Drop the `Info` suffix on the entity types:
  `ProviderInfo` → `Provider`, `RecipientInfo` → `Recipient`,
  `RecipientTokenInfo` → `RecipientToken`, `ShareInfo` → `Share` (see
  finding H2 — collides with the existing slim `Share` type, which is
  the actual rename target), `FunctionParameterInfo` →
  `FunctionParameter`, `FunctionParameterInfos` → `FunctionParameters`
  (or drop the wrapper and inline the array; see finding M2).
- **Rationale:** Sibling packages in this SDK already follow the
  unsuffixed convention for the entity (`catalogs.Catalog`,
  `schemas.Schema`, `volumes.Volume`, `connections.Connection`,
  etc.). The repeated `Info` suffix here breaks that convention and
  forces every caller reading the type to wonder whether
  `RecipientInfo` is the recipient itself, a sidecar metadata object,
  or a server-side projection. It is just the recipient.

### 2. `Share` (slim stub) coexists with `ShareInfo` (full record) — `model.ts:897` vs `model.ts:902`
- **Why:** Two parallel "the share" types live in the same file:
  `Share { name?, id? }` (model.ts:897) is a 2-field identifier stub
  used as the `share` slot on `ListProviderShareAssetsResponse`
  (model.ts:495), while `ShareInfo` (model.ts:902) is the full record
  used by `createShare`, `getShare`, and `listShares`. This is the
  proto pattern of having both a slim `Share` "reference" message and
  a fat `ShareInfo` "metadata" message for the same logical entity;
  in the TS surface a consumer cannot tell from the names which one
  to expect at which call site.
- **Category:** Proto-architecture leak (slim-vs-fat duplicate-message
  pair for the same entity)
- **Suggested:** Collapse the pair: rename `ShareInfo` → `Share` and
  rename the existing 2-field `Share` to `ShareReference` (or drop the
  stub entirely and use `{name?: string; id?: string}` inline on
  `ListProviderShareAssetsResponse`). After the collapse, the full
  record is the canonical `Share` and the surface matches the
  `Provider` / `Recipient` rename in finding H1.
- **Rationale:** Two types named after the same noun, sharing two
  fields (`name`, `id`), is the most direct form of proto-message
  leak. The slim form exists in the wire schema for size optimisation;
  in TS the optional fields handle that, and a caller has no use for
  a stand-alone two-field stub when the populated form is already a
  superset.

---

## Medium severity (worth pushing back on)

### 1. `PartitionSpecification` empty top-level + nested-only payload — `model.ts:677, 680, 686`
- **Why:** `PartitionSpecification` (model.ts:677) is declared as an
  empty interface (`{}` with an eslint-disable for the empty-object
  type) whose only role is to host the nested `PartitionSpecification_Partition`
  (model.ts:680) and `PartitionSpecification_Partition_PartitionValue`
  (model.ts:686) types. The actual array of partitions lives on
  `SharedDataObject.partitions: PartitionSpecification_Partition[]`
  (model.ts:1023), never on a `PartitionSpecification` value. The
  empty top-level + nested-tree shape is a verbatim transcription of
  the proto message tree (`PartitionSpecification { repeated Partition
  partitions; }`) where the outer message is the namespacing container.
- **Category:** Proto-architecture leak (`Specification`/`Spec` infix
  on a namespacing-only type whose root has no payload)
- **Suggested:** Either drop the empty top-level `PartitionSpecification`
  and surface `Partition` / `PartitionValue` as flat siblings (with
  the `partitions` field on `SharedDataObject` typed as
  `Partition[]`), or, if a top-level container is desired, give it
  the missing `partitions: Partition[]` field so the name carries
  some payload.
- **Rationale:** An empty interface that exists only to namespace its
  nested types is a TS-hostile pattern (TS has no nested-namespace
  semantics for interfaces — the underscore-flattened names live at
  the top level anyway). Removing the empty container exposes the
  partition tree at the level it is actually used.

### 2. `FunctionParameterInfos` single-field array wrapper — `model.ts:358`
- **Why:** `FunctionParameterInfos { parameters?: FunctionParameterInfo[] }`
  is a wrapper interface whose only field is the array. It is consumed
  exactly once, as the `inputParams: FunctionParameterInfos | undefined`
  field on `Function` (model.ts:317). The wrapper exists to give the
  proto schema a message type to hang the repeated field on; in TS
  it forces every caller to dereference `function.inputParams?.parameters`
  instead of `function.inputParams`. Same shape as `DependencyList`
  (model.ts:261), which wraps `Dependency[]` as `dependencies`.
- **Category:** Proto-architecture leak (single-field repeated-only
  wrapper message — also a duplicated `*Infos` suffix in line with H1)
- **Suggested:** Inline the array: change `Function.inputParams` to
  `inputParams?: FunctionParameter[]` (and `Function.dependencyList`
  to `dependencies?: Dependency[]`), then delete the wrapper
  interfaces. The wire format can keep the nested object via the
  marshal/unmarshal transform.
- **Rationale:** The wrapper carries no semantic content — every
  consumer must double-dereference. Eliminating the wrapper aligns
  the field shape with the way sibling packages model repeated
  fields (e.g. `catalogs.Catalog.options: Catalog_Options[]` with no
  wrapping `Catalog_OptionsList` type).

---

## Low severity (nits)

### 1. `GetActivationUrlInfoRequest` injects `Info` into a method/type name with no payload — `model.ts:363, 369, client.ts:369`
- **Why:** The method `getActivationUrlInfo` (client.ts:369) returns
  `GetActivationUrlInfoRequest_Response`, an empty interface
  (model.ts:369). The mid-position `Info` in both the method and the
  request type adds nothing semantic: the method just gets the
  activation URL data (and currently returns nothing). The naming
  inherits the proto RPC name (`GetActivationUrlInfo`) where `Info`
  was the message-type variant suffix.
- **Category:** Proto-architecture leak (`Info` mid-position with no
  matching payload, repeated-`Info` pattern from H1)
- **Suggested:** Rename to `getActivationUrl` /
  `GetActivationUrlRequest` (and drop the `Info` infix). If the
  response stays empty, also drop the type per the
  `Promise<void>`-vs-empty-interface decision used elsewhere in the
  SDK.
- **Rationale:** The mid-`Info` repeats the H1 pattern in a place
  where it is provably defunct (no response fields). Removing it
  matches the bare `getActivationUrl` shape a reader would write
  from first principles.

---

## Observations (not flags)

_None._

---

## File coverage

| File | Lines read | Coverage |
| ---- | ---------- | -------- |
| `src/v1/index.ts` | 93 / 93 | 100% |
| `src/v1/transport.ts` | 75 / 75 | 100% |
| `src/v1/utils.ts` | 150 / 150 | 100% |
| `src/v1/model.ts` | 2354 / 2354 | 100% |
| `src/v1/client.ts` | 1133 / 1133 | 100% |

All types, fields, enums, methods, and locals reviewed for the
proto/architectural-leak patterns: `Public`/`Internal`/`External`
mid-position, `Proto` suffix/infix, `Service`/`Server`/`Backend`/
`Frontend`, `Rpc`/`Grpc`, `Manager`/`Handler`/`Controller`/
`Processor`/`Daemon`/`Worker`, `Impl`, non-real `Proxy`,
mid-position `Action`/`Op` duplicating verbs, `Wrapper`/`Adapter`,
`Old`/`New`/`Legacy`/`Modern`, mid-position `V1`/`V2`, mid-position
`Api`/`Sdk`/`Client`, and repeated `Spec`/`Config`/`Details`/`Info`
suffixes. No `Proxy`, `Impl`, `Manager`, `Handler`, `Controller`,
`Service`, `Server`, `Backend`, `Frontend`, `Rpc`, `Grpc`,
`Processor`, `Daemon`, `Worker`, `Wrapper`, `Adapter`, `Old`, `New`,
`Legacy`, `Modern`, mid-position `V1`/`V2`, mid-position `Api`/`Sdk`/
`Client`, `Public`/`Internal`/`External` mid-position, or
`Foo_PublicRequest` visibility-infix patterns observed. The
`DeltaSharing*` lexicon (real product name), domain `External*` (in
context-appropriate places), `OAuth*`, `Webhook*`, and standard
`*Request`/`*Response`/`*Schema` end suffixes are not flagged.
