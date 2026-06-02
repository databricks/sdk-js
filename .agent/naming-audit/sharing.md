# Naming Audit: sharing

**Path:** `packages/sharing/src/v1/`
**Versions audited:** v1
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `transport.ts`, `index.ts`
**Total weird names flagged:** 3

**Last rescanned:** 2026-06-02. All findings re-verified against the
current source; none addressed upstream. The regeneration shifted most
line numbers and renamed the proto-nested `GetActivationUrlInfoRequest_Response`
to the clean `GetActivationUrlInfoResponse`; every citation was corrected
in place, and finding L1 was rewritten to reference the new response name.

## Summary

| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 1 |
| Low | 1 |
| **Total** | **3** |

---

## High severity (must fix)

### 1. `*Info` suffix repeated across the core entity surface — `model.ts:733, 768, 839, 895, 331, 358`
- **Why:** Five entity types use the proto-style `*Info` "metadata
  message" suffix: `ProviderInfo` (model.ts:733), `RecipientInfo`
  (model.ts:768), `RecipientTokenInfo` (model.ts:839), `ShareInfo`
  (model.ts:895), and `FunctionParameterInfo` (model.ts:331) plus the
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
  `RecipientTokenInfo` → `RecipientToken`, `ShareInfo` → `Share`,
  `FunctionParameterInfo` → `FunctionParameter`, `FunctionParameterInfos`
  → `FunctionParameters` (or drop the wrapper and inline the array; see
  finding M1).
- **Rationale:** Sibling packages in this SDK already follow the
  unsuffixed convention for the entity (`catalogs.Catalog`,
  `schemas.Schema`, `volumes.Volume`, `connections.Connection`,
  etc.). The repeated `Info` suffix here breaks that convention and
  forces every caller reading the type to wonder whether
  `RecipientInfo` is the recipient itself, a sidecar metadata object,
  or a server-side projection. It is just the recipient.

---

## Medium severity (worth pushing back on)

### 1. `FunctionParameterInfos` single-field array wrapper — `model.ts:358`
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

### 1. `GetActivationUrlInfoRequest` injects `Info` into a method/type name with no payload — `model.ts:363, 369, client.ts:386`
- **Why:** The method `getActivationUrlInfo` (client.ts:386) returns
  `GetActivationUrlInfoResponse`, an empty interface (model.ts:369).
  The mid-position `Info` in the method and the `GetActivationUrlInfoRequest`
  type (model.ts:363) adds nothing semantic: the method just gets the
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
