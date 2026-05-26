# Naming Audit: `featurestore` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/featurestore/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/index.ts`
**Cross-package references:** `features/v1` (`OnlineStoreConfig`,
`onlineStoreName`), `materializedfeatures/v1`, `onlinetables/v1`
(`DeleteOnlineTableRequest`, `OnlineTable`, `OnlineTableState`,
`OnlineTableSpec`).
**Go reference:** `databricks/sdk-go` `databricks/api/` (the 1:1 port source).

---

## Inventory

### Enums

1. `OnlineStore_State` (model.ts:9)
   - Values: `STATE_UNSPECIFIED`, `STARTING`, `AVAILABLE`, `DELETING`,
     `STOPPED`, `UPDATING`, `FAILING_OVER`.
2. `PublishSpec_PublishMode` (model.ts:27)
   - Values: `PUBLISH_MODE_UNSPECIFIED`, `CONTINUOUS`, `TRIGGERED`, `SNAPSHOT`.

### Interfaces / Types

1. `CreateOnlineStoreRequest` (model.ts:47) — fields: `onlineStore`.
2. `DeleteOnlineStoreRequest` (model.ts:52) — fields: `name`.
3. `DeleteOnlineTableRequest` (model.ts:57) — fields: `onlineTableName`.
4. `GetOnlineStoreRequest` (model.ts:62) — fields: `name`.
5. `ListOnlineStoresRequest` (model.ts:67) — fields: `pageToken`, `pageSize`.
6. `ListOnlineStoresResponse` (model.ts:74) — fields: `onlineStores`,
   `nextPageToken`.
7. `OnlineStore` (model.ts:82) — fields: `name`, `creator`, `creationTime`,
   `state`, `capacity`, `readReplicaCount`, `usagePolicyId`.
8. `PublishSpec` (model.ts:99) — fields: `onlineStore`, `onlineTableName`,
   `publishMode`.
9. `PublishTableRequest` (model.ts:108) — fields: `sourceTableName`,
   `publishSpec`.
10. `PublishTableResponse` (model.ts:115) — fields: `onlineTableName`,
    `pipelineId`.
11. `UpdateOnlineStoreRequest` (model.ts:122) — fields: `onlineStore`,
    `updateMask`.

### Zod schemas

- `unmarshalListOnlineStoresResponseSchema` (model.ts:129)
- `unmarshalOnlineStoreSchema` (model.ts:142)
- `unmarshalPublishTableResponseSchema` (model.ts:165)
- `marshalOnlineStoreSchema` (model.ts:176)
- `marshalPublishSpecSchema` (model.ts:199)
- `marshalPublishTableRequestSchema` (model.ts:211)

### Field-mask helpers

- `onlineStoreFieldMaskSchema` (model.ts:221, module-internal)
- `onlineStoreFieldMask()` (model.ts:231, public)

### Client class

- `Client` (client.ts:46)
  - Methods: `createOnlineStore`, `deleteOnlineStore`, `deleteOnlineTable`,
    `getOnlineStore`, `listOnlineStores`, `listOnlineStoresIter`,
    `publishTable`, `updateOnlineStore`.

---

## Findings

### 1. SCREAMING_SNAKE_CASE enum values — category 4 (Underscores in TS identifiers) — *Still*

**Symbols:** Every value in both enums (model.ts:11–23, 28–44).

**Issue:** The project's `.agent/skills/google-ts-styleguide` (and the Google
TS Style Guide § 5.3) mandates `UpperCamelCase` for enum members, not
`SCREAMING_SNAKE_CASE`. The project's own `typescript.mdc` enforces no
underscores in TS identifiers. Enum members like `FAILING_OVER` contain
underscores and are SCREAMING-cased.

Note: enum string *values* double as the on-the-wire representation here (the
Zod schemas parse raw API strings into these identifiers, e.g. `z.enum(
OnlineStore_State)` at model.ts:150). The TS-side identifier can be split
from the wire literal — e.g. `FailingOver = 'FAILING_OVER'` — which is the
canonical TS fix while preserving wire compatibility.

**Suggested (TS side only, no wire change):**

```ts
export enum OnlineStoreState {
  Unspecified = 'STATE_UNSPECIFIED',
  Starting = 'STARTING',
  Available = 'AVAILABLE',
  Deleting = 'DELETING',
  Stopped = 'STOPPED',
  Updating = 'UPDATING',
  FailingOver = 'FAILING_OVER',
}

export enum PublishMode {
  Unspecified = 'PUBLISH_MODE_UNSPECIFIED',
  Continuous = 'CONTINUOUS',
  Triggered = 'TRIGGERED',
  Snapshot = 'SNAPSHOT',
}
```

This is consistent with how the project's `typescript.mdc` treats other enums
and matches the project skill's mandate. **Flag as SDK-wide cleanup** —
unilateral change here would diverge from sibling packages.

---

### 2. `FAILING_OVER` present-tense vs. `STOPPED`/`UPDATING` mixed — category 13 (Verb-tense inconsistency) — *Still*

**Symbols:** `OnlineStore_State.FAILING_OVER` (model.ts:23), `STARTING`,
`DELETING`, `UPDATING` (model.ts:13, 17, 21) vs. `STOPPED`, `AVAILABLE`
(model.ts:19, 15).

**Issue:** Six of the seven values are either progressive (`-ING`) or
adjectival/perfect (`STOPPED`, `AVAILABLE`, `UNSPECIFIED`). `FAILING_OVER`
mixes a participle with a particle preposition; the canonical
network/database term is `FAILOVER` (noun) or `FAILING_OVER` (verb-phrase).
Compare: AWS RDS uses `failing-over` as a state, Postgres uses
`failover`. Mark as a wire-level concern — TS identifier `FailingOver` is
fine under finding 1. **Pass at the TS level**, flag at the wire level.

---

### 3. `DeleteOnlineTableRequest.onlineTableName` diverges from sibling package — category 12 (Duplicate concepts) and category 19 (Underspecified IDs) — *Still*

**Symbol:** `DeleteOnlineTableRequest.onlineTableName` (model.ts:59), wire
field `online_table_name` (the field appears in the URL path, not JSON).

**Issue:** The neighbouring `onlinetables/v1` package defines an *identical*
operation with a *different* field name:

```ts
// onlinetables/v1/model.ts:93
export interface DeleteOnlineTableRequest {
  name?: string | undefined;  // Full three-part name of the table.
}
```

Both packages name the type `DeleteOnlineTableRequest` (identical type names
in two packages — namespace-distinguished, but confusing). The field is
called `name` in `onlinetables`, `onlineTableName` in `featurestore`. A
caller switching packages would have to translate the field. The URL paths
also differ: `/api/2.0/online-tables/{name}` in `onlinetables` vs.
`/api/2.0/feature-store/online-tables/{onlineTableName}` here.

`featurestore`'s field name is *more* descriptive (since the context is
"feature-store deletes an online table that wraps a 3-part Unity name"),
which is defensible — but the divergence is jarring. **Cross-package
alignment recommendation:** harmonise on `name` (shorter, idiomatic for
URL-path resource identifiers; matches HTTP REST conventions and the Go SDK's
`name` field for resources).

This finding *also* hits category 19: the field is documented as "The full
three-part (catalog, schema, table) name of the online table." which is a
**very specific format** — neither the name nor the JSDoc enforces it. A
typed wrapper (e.g. `ThreePartName`) is an option, but cross-SDK convention
keeps it as a string. **Pass on the wrapper**, flag the field-name
divergence.

---

### 4. `OnlineStore.capacity: string` with comment specifying valid values — category 1 (Vague/generic) and category 6 (Misleading names) — *Still*

**Symbol:** `OnlineStore.capacity?: string` (model.ts:92). JSDoc: "The
capacity of the online store. Valid values are "CU_1", "CU_2", "CU_4",
"CU_8"."

**Issue:** A field with four valid enum-like string values is typed as
`string`. This is a **missing enum** — the appropriate shape is a string
literal union or a TS enum:

```ts
// Either:
capacity?: 'CU_1' | 'CU_2' | 'CU_4' | 'CU_8' | undefined;
// or:
export enum OnlineStoreCapacity { CU1 = 'CU_1', CU2 = 'CU_2', ... }
```

The Go SDK uses a string for forward-compatibility (open enum), but TS can
model an *open* enum with `'CU_1' | 'CU_2' | (string & {})` if needed. The
current shape — bare `string` with a JSDoc note — provides no compile-time
help. **Flag for SDK-wide policy on open enums** (categories 1 + 6).

---

### 5. `PublishSpec` is vague — category 1 (Vague/generic) — *Still*

**Symbol:** `PublishSpec` (model.ts:99).

**Issue:** `…Spec` is acceptable when paired with a clear noun
(`OnlineTableSpec`, `JobSpec`). "Publish" alone reads as a verb; the
combination "Publish + Spec" is ambiguous (publish *what* specification?
publishing *of* what?). Compare neighbours: `onlinetables` uses
`OnlineTableSpec` — the resource is named.

**Suggested:** `PublishTableSpec` (the same noun as the parent
`PublishTableRequest`) — makes the link explicit and disambiguates from any
other "publish" concept the SDK might grow. The Go SDK uses `PublishSpec`
which has more room because it lives in the `featurestore` Go package.
**Coordinate with upstream.**

---

### 6. `PublishTableResponse.pipelineId` — *pass* — *Still*

Format is documented as a pipeline ID; aligns with `pipelines/v2` naming.
No issue.

---

### 7. `UpdateOnlineStoreRequest.updateMask` — category 7 (Overly verbose) — *pass* — *Still*

**Symbol:** `UpdateOnlineStoreRequest.updateMask: FieldMask<OnlineStore>`
(model.ts:126).

`updateMask` is the canonical Google AIP-134 name for partial-update masks;
the type `FieldMask<OnlineStore>` is from `@databricks/sdk-core/wkt`. The
naming is SDK-wide and idiomatic. **Pass.**

---

### 8. `Client.deleteOnlineTable` is in `featurestore` but `onlinetables` has its own — category 12 (Duplicate concepts) — *Still*

**Symbols:** `Client.deleteOnlineTable` (client.ts:117, featurestore) vs.
`Client.deleteOnlineTable` (client.ts:108, onlinetables).

**Issue:** Two SDK packages expose a method with the same name that hits
*different* HTTP endpoints:

- `featurestore.deleteOnlineTable` → `/api/2.0/feature-store/online-tables/{onlineTableName}`
- `onlinetables.deleteOnlineTable` → `/api/2.0/online-tables/{name}`

The semantic is "delete an online table" in both cases, but the endpoints
are separate. This is a *backend* concern, but at the SDK level a TS user
will import both `@databricks/sdk-featurestore/v1.Client` and
`@databricks/sdk-onlinetables/v1.Client` and find two identically-named
methods that do related but distinct things. Compounded by finding 3 where
the *request types* are also identically named but field-incompatible.

**Suggested at the SDK level:** in `featurestore`, rename the method to
`deletePublishedOnlineTable` (since the table only exists because of
`publishTable`). This is a soft fix; the bigger issue is the duplicated
*surface* across packages. **Flag for the SDK platform team.**

---

### 9. `onlineStoreFieldMaskSchema` private but exported via `onlineStoreFieldMask()` — *pass* — *Still*

**Symbols:** `onlineStoreFieldMaskSchema` (model.ts:221, internal) and
`onlineStoreFieldMask()` (model.ts:231, public). Clean separation: the
schema is private, the helper is exported, and the helper name matches the
Google AIP-134 update-mask vocabulary. **Pass.**

---

### 10. `Client` class name — category 1 (Vague/generic) — *pass* — *Still*

Package convention. Every TS package exports a single `Client` class scoped
to its import path (e.g. `@databricks/sdk-featurestore/v1`). **Pass.**

---

### 11. `ListOnlineStoresRequest`/`Response` — category 7 (Overly verbose) — *pass with note* — *Still*

**Symbols:** `ListOnlineStoresRequest` (model.ts:67),
`ListOnlineStoresResponse` (model.ts:74).

Names are long (24/25 chars) but match the SDK-wide pattern for paginated
list endpoints. Within the package scope `ListRequest` / `ListResponse`
would suffice — only `online-store` listing exists — but every other TS
package qualifies. **Pass on package consistency.**

---

### 12. Singular `OnlineStore` ⇔ plural `onlineStores` consistency — category 9 (Singular/plural mismatch) — *pass* — *Still*

`ListOnlineStoresResponse.onlineStores: OnlineStore[]` (model.ts:76) is the
canonical pattern. **Pass.**

---

### 13. `creator` vs `pipelineId` casing — category 3 (Acronym/compound-word casing) — *pass* — *Still*

`pipelineId` correctly camelCases the two-letter "ID"; `creator` is a
plain word. **Pass.**

---

### 14. `OnlineStore_State` — model.ts:9 — *Still*

**Why:** `Parent_Nested` underscore-joined identifier is a literal
translation of a proto nested-type path into the TS symbol name. The
source file even concedes this with `// eslint-disable-next-line ... --
Proto-style nested enum name.` The proto file structure leaks directly
into the public TS surface.

**Category:** Proto-architectural-leak (Proto-nested-type infix).

**Suggested:** `OnlineStoreState`.

**Rationale:** The enum is conceptually "the state of an online store" —
the standalone TS identifier `OnlineStoreState` is unambiguous, follows
Google TS Style Guide § 5.3 (`UpperCamelCase` types, no underscores), and
does not require an eslint-disable. The wire values are unaffected. The
`Foo_Bar` shape exists purely because protoc emits nested message names
that way; downstream TS callers should not have to model the proto
namespace.

---

### 15. `PublishSpec_PublishMode` — model.ts:27 — *Still*

**Why:** Same `Parent_Nested` proto-namespace leak as finding 14. The
identifier reads as "PublishSpec's PublishMode" — the enclosing-type
prefix is a verbatim port of the proto nested-type name, and the file
acknowledges this with the same eslint-disable comment.

**Category:** Proto-architectural-leak (Proto-nested-type infix).

**Suggested:** `PublishMode`.

**Rationale:** The enum is conceptually a publish mode; the `PublishSpec_`
prefix duplicates the enclosing type and adds no information (the only
field that uses it is `PublishSpec.publishMode`). Dropping the proto
nesting yields a clean `PublishMode` symbol that matches how the field
already reads (`publishMode: PublishMode`). No wire change.

---

## Cross-package notes (per audit instructions)

### `DeleteOnlineTableRequest` name collision with `onlinetables/v1`

Already covered in finding 3. Two distinct request types share the same
type name across packages, with different field names. A consumer who
imports both packages (likely — they are complementary) writes:

```ts
import {DeleteOnlineTableRequest as FsDeleteOnlineTableRequest}
  from '@databricks/sdk-featurestore/v1';
import {DeleteOnlineTableRequest as OtDeleteOnlineTableRequest}
  from '@databricks/sdk-onlinetables/v1';
```

Friction-heavy. **Strong recommendation:** rename
`featurestore.DeleteOnlineTableRequest` to e.g.
`DeletePublishedOnlineTableRequest` (it deletes a table created by
`publishTable`) — or rename `featurestore.deleteOnlineTable` method to
`deletePublishedOnlineTable` and follow with the request type. Aligns with
finding 8.

---

### `publishMode` cross-package overlap

`PublishSpec_PublishMode` (this package, model.ts:27) has values
`CONTINUOUS`, `TRIGGERED`, `SNAPSHOT`. The `onlinetables` package has
`OnlineTableSpec.schedulingPolicy` with discriminated `runContinuously` /
`runTriggered` cases (onlinetables/v1/model.ts:145–153). Same underlying
concept (continuous vs. triggered pipeline), two different modelling
approaches (string enum vs. discriminated union). Plus there is no
`SNAPSHOT` case in `onlinetables`. **Flag for upstream protocol alignment.**

---
