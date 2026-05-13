# Naming Audit: `featurestore` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/featurestore/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`
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
  - Private fields: `host`, `httpClient`, `logger`, `userAgent`.
  - Module constant: `PACKAGE_SEGMENT`.

### Utils (`src/v1/utils.ts`)

- Type: `HttpCallOptions`.
- Functions: `executeCall`, `readAll`, `executeHttpCall`, `buildHttpRequest`,
  `parseResponse`, `marshalRequest`, `flattenQueryParams`.

---

## Findings

### 1. `OnlineStore_State` proto-style underscored type name — category 4 (Underscores in TS identifiers) and category 14 (Go/Java-style names)

**Symbol:** `OnlineStore_State` (model.ts:9), and identically
`PublishSpec_PublishMode` (model.ts:27).

**Issue:** TS identifiers should not contain underscores
(`.agent/rules/typescript.mdc` § *Identifiers*; Google TS Style Guide § 5.3,
which mandates `UpperCamelCase` for types). The `Parent_Child` form is a
proto-buf code-generator artefact for nested messages/enums. The file even
suppresses the lint rule explicitly:

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum OnlineStore_State {
```

That comment is the audit signal: the project's lint rule disagrees with the
chosen name, and every other package in the SDK with the same pattern carries
the same suppression. The proto namespace is not preserved in TS modules — the
enum lives in the same module as `OnlineStore`, so the qualification is
redundant.

**Suggested:** `OnlineStoreState` and `PublishMode`. The neighbouring
`onlinetables` package solves this exactly: `OnlineTableState` (no underscore,
no nested namespace prefix). See `onlinetables/v1/model.ts:7`. This is also
how `ProvisioningInfo_State` is solved one line below (it is the *only*
`X_Y` enum in `onlinetables`, and it lives next to flat `OnlineTableState` —
mixed conventions in the same file).

This is a generator-level fix coordinated SDK-wide, not a unilateral change.

---

### 2. `PublishSpec_PublishMode` doubled noun — category 8 (Redundant suffixes)

**Symbol:** `PublishSpec_PublishMode` (model.ts:27).

**Issue:** Combine with finding 1: when the underscore namespace is stripped,
the name becomes `PublishSpecPublishMode`, which contains "Publish" twice. The
natural collapse is `PublishMode`, which is what the field `publishMode`
already uses (model.ts:105). No information is lost — the enum is in the same
module as `PublishSpec` and is the only `*Mode` enum in the package.

**Suggested:** `PublishMode`.

---

### 3. Enum-value prefixes repeat the enum name — category 2 (Redundant enum prefixes) and category 18 (Long enum values)

**Symbols:** `OnlineStore_State.STATE_UNSPECIFIED` (model.ts:11),
`PublishSpec_PublishMode.PUBLISH_MODE_UNSPECIFIED` (model.ts:28).

**Issue:** Members are already namespaced under the enum type. The leading
`STATE_` / `PUBLISH_MODE_` segment duplicates the enum's own concept. Reads
poorly at use site:

```ts
if (store.state === OnlineStore_State.STATE_UNSPECIFIED) { ... }
//                              ^^^^^   ^^^^^
//                              repeats "state"
```

Compare to `onlinetables/v1` which uses
`OnlineTableState.ONLINE_TABLE_STATE_UNSPECIFIED` — same problem there.
However, the values here double as on-the-wire JSON strings (the same Zod
schema parses raw API strings into these identifiers, model.ts:150, 184), so
renaming requires server acceptance and is a behavioural change. **Flag for
the API team / generator.** TS-side identifier can be split from wire string
(see finding 5) as a safe local fix.

**Suggested wire-level (coordinated with API):** plain `UNSPECIFIED`.
**Suggested TS-level only (safe, see finding 5):**
`Unspecified = 'STATE_UNSPECIFIED'`.

---

### 4. SCREAMING_SNAKE_CASE enum values — category 4 (Underscores in TS identifiers)

**Symbols:** Every value in both enums (model.ts:11–23, 28–44).

**Issue:** The project's `.agent/skills/google-ts-styleguide` (and the Google
TS Style Guide § 5.3) mandates `UpperCamelCase` for enum members, not
`SCREAMING_SNAKE_CASE`. The project's own `typescript.mdc` enforces no
underscores in TS identifiers. The enum members `STATE_UNSPECIFIED`,
`FAILING_OVER`, `PUBLISH_MODE_UNSPECIFIED` all contain underscores and are
SCREAMING-cased.

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

### 5. `FAILING_OVER` present-tense vs. `STOPPED`/`UPDATING` mixed — category 13 (Verb-tense inconsistency)

**Symbols:** `OnlineStore_State.FAILING_OVER` (model.ts:23), `STARTING`,
`DELETING`, `UPDATING` (model.ts:13, 17, 21) vs. `STOPPED`, `AVAILABLE`
(model.ts:19, 15).

**Issue:** Six of the seven values are either progressive (`-ING`) or
adjectival/perfect (`STOPPED`, `AVAILABLE`, `UNSPECIFIED`). `FAILING_OVER`
mixes a participle with a particle preposition; the canonical
network/database term is `FAILOVER` (noun) or `FAILING_OVER` (verb-phrase).
Compare: AWS RDS uses `failing-over` as a state, Postgres uses
`failover`. Mark as a wire-level concern — TS identifier `FailingOver` is
fine under finding 4. **Pass at the TS level**, flag at the wire level.

---

### 6. `DeleteOnlineTableRequest.onlineTableName` diverges from sibling package — category 12 (Duplicate concepts) and category 19 (Underspecified IDs)

**Symbol:** `DeleteOnlineTableRequest.onlineTableName` (model.ts:59), wire
field `online_table_name` (per `marshalPublishSpecSchema:207` style; here the
field appears in the URL path, not JSON).

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

### 7. `OnlineStore.name` is the *unique identifier*, not a display name — category 19 (Underspecified IDs)

**Symbol:** `OnlineStore.name` (model.ts:84). JSDoc: "The name of the online
store. This is the unique identifier for the online store."

**Issue:** Two distinct concepts are conflated in a field called `name`:

- "Name" (human-readable label).
- "Unique identifier" (what URL paths key on).

The Go SDK and the wire format choose `name` to mean *identifier*, but
neighbouring SDK fields (`OnlineStore.creator` — email; `OnlineTable.name` —
three-part identifier; `Feature.name` — composite "table.column") all use
`name` for *different* shapes. A reader cannot tell from the type whether
`name` is a UC three-part name, a single token, or a free-text label.

This package: `OnlineStore.name` is a **single token** (the URL embeds it as
`/online-stores/{name}` per client.ts:102, 140, 242). That is fine — but
documenting "this is also the unique identifier" inside the JSDoc is a
naming smell: if the doc has to say "this is the ID", the field name should
be `id` or the JSDoc should at minimum link to the URL grammar. **Suggest**
strengthening JSDoc to specify the lexical grammar
(`/^[a-zA-Z][a-zA-Z0-9_-]*$/` or similar) so consumers don't pass
arbitrary strings.

---

### 8. `OnlineStore.creator` is an email, not a name — category 1 (Vague/generic) and category 17 (Inconsistent action verbs)

**Symbol:** `OnlineStore.creator` (model.ts:86). JSDoc: "The email of the
creator of the online store."

**Issue:** A field called `creator` typically holds a principal name or ID
(Go's `creator string` carries ambiguity by convention). Other packages in
this SDK use `createdBy` for principal IDs and `creatorEmail` when they want
to explicitly note the email shape. Concrete examples to align with:

- `catalogs/v1` (CatalogInfo) uses `owner` and `metastoreId` — different
  conventions.
- `database/v1` uses `creator` for an email too, in identical shape.

The audit category 17 hits this because `Create*Request` operations elsewhere
return a creator-id field as `createdBy` (`apps/v1`, `pipelines`) — the
mismatch is *cross-package* not within-this-package.

**Suggested:** rename to `creatorEmail` (descriptive) or `createdByEmail`
(matches the broader SDK passive form). Flag for SDK-wide cleanup; do not
fix in isolation. **Pass with a recommendation.**

---

### 9. `OnlineStore.creationTime` vs. `…At` pattern — category 17 (Inconsistent action verbs) and category 7 (Overly verbose)

**Symbol:** `OnlineStore.creationTime` (model.ts:88). Type: `Temporal.Instant`.

**Issue:** The SDK has *three* conventions for "moment of creation":
`creationTime`, `createTime`, and `createdAt`. Within the wider SDK:

- `OnlineStore.creationTime` (featurestore) — this file.
- `OnlineTable` (onlinetables) — no creation-time field, but `pipelines/v2`
  uses `creationTime`.
- Many newer services use `createdAt` (`apps`, `customllms`).

Picking one is out of scope; the **`Time` suffix on a `Temporal.Instant` is
mildly tautological** (the type encodes "moment"). The `At` form
(`createdAt`) is more idiomatic for JS/TS (JS-Joda, dayjs, Date-fns all use
`At` patterns; React/Node ecosystems converge here).

**Suggested:** `createdAt` for cross-SDK consistency. **Flag for generator,
not a unilateral fix.**

---

### 10. `OnlineStore.state` field name vs `OnlineStore_State` type — category 20 (Type-suffix tautology) — *pass*

**Symbol:** `OnlineStore.state: OnlineStore_State` (model.ts:90).

The field name `state` and the type `OnlineStore_State` are appropriately
named — the field is *the* state, and the type qualifies it with its owner.
No issue. (Under finding 1's recommended rename to `OnlineStoreState` this
remains fine.)

---

### 11. `OnlineStore.capacity: string` with comment specifying valid values — category 1 (Vague/generic) and category 6 (Misleading names)

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

Also: "CU" is unexplained (probably "Compute Unit"). Audit category 5
(cryptic abbreviation) — see finding 12.

---

### 12. `"CU_1"` is a cryptic literal — category 5 (Cryptic abbreviations)

**Symbol:** `OnlineStore.capacity` valid values `"CU_1"`–`"CU_8"`
(model.ts:91).

**Issue:** `CU` is unexpanded in the file. Industry-wide it can mean
"Compute Unit", "Capacity Unit", or "Container Unit". The JSDoc should
either spell out the acronym or link to the public docs page that defines
it. Naming-side fix is at the wire level (rename to e.g. `compute-units-1`)
which is impractical; the practical fix is to expand the JSDoc.

**Suggested JSDoc:** "The capacity of the online store (CU = Compute Unit).
Valid values: …".

---

### 13. `OnlineStore.readReplicaCount` defaults documented in JSDoc only — category 6 (Misleading names) — *partial pass*

**Symbol:** `OnlineStore.readReplicaCount?: number` (model.ts:94). JSDoc:
"The number of read replicas for the online store. Defaults to 0."

**Issue:** The field is optional with a documented server-side default of 0.
Optionality alone leaves the default unclear at the call site. This is not a
naming bug per se — flag JSDoc.

---

### 14. `OnlineStore.usagePolicyId` underspecified — category 19 (Underspecified IDs)

**Symbol:** `OnlineStore.usagePolicyId?: string` (model.ts:96).

**Issue:** `*Id` fields in the SDK refer to several different ID schemes
(UUID, ULID, account-scoped numeric, opaque tokens). The JSDoc says "The
usage policy applied to the online store to track billing." — it does not
specify the format. Cross-reference `budgetpolicy/v1` which defines such IDs
as UUIDs. **Suggest** JSDoc enrichment to say "Account-scoped UUID
referring to a usage policy defined in the budget-policy service."

---

### 15. `PublishSpec.onlineStore` is a *name* (string), not an `OnlineStore` — category 15 (Generic field names losing meaning) and category 16 (Field contradicting type domain)

**Symbol:** `PublishSpec.onlineStore?: string` (model.ts:101). JSDoc: "The
name of the target online store."

**Issue:** The field is a *string identifier* of an online store, but the
field name is `onlineStore` — which to a reader implies the *whole struct*.
This is exactly the kind of misleading name flagged by category 16. Compare
to `PublishTableRequest.sourceTableName` (model.ts:110) — explicit `…Name`
suffix.

**Suggested:** rename to `onlineStoreName` to match `sourceTableName`,
`onlineTableName`, and the wire field `online_store` (or
`online_store_name` — see finding 24). This is a *symbol-level*
inconsistency *within the same file* and is the single highest-confidence
fix in this audit. The Go SDK uses `OnlineStore` (capitalised, but a
string), so this is a port-time correctness opportunity, not a coordination
issue with upstream Go fields.

**P1 fix candidate.**

---

### 16. `PublishSpec` is vague — category 1 (Vague/generic)

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

### 17. `PublishSpec.publishMode` repeats `Publish` — category 8 (Redundant suffixes)

**Symbol:** `PublishSpec.publishMode` (model.ts:105).

**Issue:** Within `PublishSpec`, the `publish` prefix is implicit. `mode`
alone would suffice — but is too short and reads as generic. The enum it
refers to is `PublishSpec_PublishMode` which compounds the redundancy.

**Suggested:** keep as `mode` *only if* the enum is renamed to `PublishMode`
(finding 2). Otherwise the field name reasonably mirrors the enum name. This
is a coupled fix; do not change in isolation.

---

### 18. `PublishTableRequest`/`Response.onlineTableName` underspecified — category 19 (Underspecified IDs)

**Symbol:** `PublishTableRequest.publishSpec.onlineTableName`,
`PublishTableResponse.onlineTableName` (model.ts:103, 117).

**Issue:** The JSDoc on both reads "The full three-part (catalog, schema,
table) name of the online table." — same finding as #6: the field is a
specific structured string. Currently typed `string`. No compile-time
safety. Cross-SDK pattern is to leave as `string` with JSDoc — accept that
trade-off, but the JSDoc spelling should be canonical and consistent. The
field appears in *three* places (model.ts:59, 103, 117) with three slightly
different doc strings:

- model.ts:58: "The full three-part (catalog, schema, table) name of the
  online table."
- model.ts:102: "The full three-part (catalog, schema, table) name of the
  online table."
- model.ts:116: "The full three-part (catalog, schema, table) name of the
  online table."

(Actually identical here — pass on consistency.) **Pass with note.**

---

### 19. `PublishTableResponse.pipelineId` — *pass*

Format is documented as a pipeline ID; aligns with `pipelines/v2` naming.
No issue.

---

### 20. `UpdateOnlineStoreRequest.updateMask` — category 7 (Overly verbose) — *pass*

**Symbol:** `UpdateOnlineStoreRequest.updateMask: FieldMask<OnlineStore>`
(model.ts:126).

`updateMask` is the canonical Google AIP-134 name for partial-update masks;
the type `FieldMask<OnlineStore>` is from `@databricks/sdk-core/wkt`. The
naming is SDK-wide and idiomatic. **Pass.**

---

### 21. `Client.publishTable` semantically publishes *features*, not a table — category 6 (Misleading names) and category 17 (Inconsistent action verbs)

**Symbol:** `Client.publishTable` (client.ts:212). JSDoc: "Publish features."

**Issue:** The method name claims to publish a *table*, but the JSDoc says
"Publish features." The request body's content (`sourceTableName`,
`publishSpec.onlineTableName`) is *about* tables, but the API operation —
per the JSDoc — is "publish features." Naming-wise the method matches the
URL grammar (`/feature-store/tables/{sourceTableName}/publish`) and the Go
SDK method name, but the JSDoc is misleading.

Actually re-reading: the operation **publishes a source table's data to an
online store as an online table**. So "publishTable" is roughly correct
("publish a table"), the JSDoc "Publish features." is a stale one-liner.
**Fix the JSDoc**, not the method name.

**Suggested JSDoc:** "Publish a feature table to an online store, creating
an online table that syncs from the source." Alternative method name
candidate: `publishFeatureTable` — more descriptive, ports `publish` from
the URL — but diverges from Go. **Pass on the name, flag the JSDoc.**

---

### 22. `Client.deleteOnlineTable` is in `featurestore` but `onlinetables` has its own — category 12 (Duplicate concepts)

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
methods that do related but distinct things. Compounded by finding 6 where
the *request types* are also identically named but field-incompatible.

**Suggested at the SDK level:** in `featurestore`, rename the method to
`deletePublishedOnlineTable` (since the table only exists because of
`publishTable`). This is a soft fix; the bigger issue is the duplicated
*surface* across packages. **Flag for the SDK platform team.**

---

### 23. `Client.listOnlineStoresIter` async-iterator naming — *pass*

`Iter` suffix is the project's canonical name for paginator generators
(`cleanrooms`, `cleanroomassets`, etc., per audit history). Consistent.
**Pass.**

---

### 24. Wire field `online_store` vs. field name `onlineStore` referring to a string — category 5 (Cryptic abbreviations) and category 15 (Generic field names losing meaning)

**Symbol:** `marshalPublishSpecSchema` (model.ts:206) maps
`onlineStore → online_store`. The wire field is `online_store` (a string
name), not `online_store_name`. This is a wire-level decision — the Go SDK
also uses `online_store` for this string field — but it amplifies finding 15:
even at the wire level, the field name suggests a *struct*, not a string.

**Pass at the SDK level, flag upstream.**

---

### 25. `unmarshal*Schema` / `marshal*Schema` Go vocabulary — category 14 (Go/Java-style names)

**Symbols:** `unmarshalListOnlineStoresResponseSchema`,
`unmarshalOnlineStoreSchema`, `unmarshalPublishTableResponseSchema`,
`marshalOnlineStoreSchema`, `marshalPublishSpecSchema`,
`marshalPublishTableRequestSchema` (model.ts:129, 142, 165, 176, 199, 211).

**Issue:** "Marshal" / "Unmarshal" is Go-ism vocabulary. TS ecosystem uses
"serialize" / "deserialize" or, when working with Zod, "parse" / "stringify"
/ "schema". The full SDK uses this convention; **flag for SDK-wide cleanup,
not this package alone.**

The `*Schema` suffix is also somewhat redundant — `unmarshalOnlineStore`
without `Schema` would suffice since the value's type is
`z.ZodType<OnlineStore>` and there are no non-schema cousins. But this is a
naming-pattern decision applied SDK-wide. **Pass with note.**

---

### 26. `onlineStoreFieldMaskSchema` private but exported via `onlineStoreFieldMask()` — *pass*

**Symbols:** `onlineStoreFieldMaskSchema` (model.ts:221, internal) and
`onlineStoreFieldMask()` (model.ts:231, public). Clean separation: the
schema is private, the helper is exported, and the helper name matches the
Google AIP-134 update-mask vocabulary. **Pass.**

---

### 27. `Client` class name — category 1 (Vague/generic) — *pass*

Package convention. Every TS package exports a single `Client` class scoped
to its import path (e.g. `@databricks/sdk-featurestore/v1`). **Pass.**

---

### 28. `PACKAGE_SEGMENT` constant — category 4 (Underscores in TS identifiers)

**Symbol:** `PACKAGE_SEGMENT` (client.ts:41).

**Issue:** Google TS Style Guide § 5.1 reserves `UPPER_SNAKE_CASE` for true
constants (primitive literal values like `MAX_LEN = 10`). `PACKAGE_SEGMENT`
is a runtime object literal (`{ key, value }`) constructed from a JSON
import. The value *is* constant per-process, but the identifier shape
violates the project rule. The same name is used in every package's
`client.ts` — it is a project-wide convention. **Flag for SDK-wide cleanup,
do not fix in isolation.**

**Suggested:** `packageSegment` or `clientPackageSegment`.

---

### 29. `userAgent` / `httpClient` / `host` / `logger` — *pass*

Standard private field names. Acronym handling matches the project rule
(`HttpClient`, `Url` would be flagged, but `HttpClient` matches the imported
type `HttpClient`). **Pass.**

---

### 30. `HttpCallOptions` (utils.ts:15) — category 1 (Vague/generic) and category 20 (Type-suffix tautology)

**Symbol:** `HttpCallOptions` interface.

**Issue:** "HttpCall" is not a concept that exists elsewhere in the SDK; the
neighbouring `CallOptions` exists in `@databricks/sdk-options/call`. Naming
both *in the same file* (`HttpCallOptions` here, `CallOptions` imported on
line 12) confuses readers — which "Call" do they mean? Suggest
`HttpRequestContext` or `ExecuteHttpArgs`. **Flag for SDK-wide cleanup**
(this utils.ts is generated boilerplate copied across every package, so any
fix must apply everywhere).

---

### 31. `executeCall` vs `executeHttpCall` — category 17 (Inconsistent action verbs)

**Symbols:** `executeCall` (utils.ts:26) and `executeHttpCall` (utils.ts:65).

**Issue:** Two functions named `execute…Call`. `executeCall` is the public
API wrapper that calls `execute()` from `@databricks/sdk-core/api`.
`executeHttpCall` performs an HTTP request and decodes the body. They do
*different* things at *different* layers — but the names imply a
hierarchical relationship that does not exist. The HTTP one is roughly
`sendAndDecode` or `doHttpRequest`. **Flag for SDK-wide naming cleanup;**
this file is generated boilerplate copied across every package.

---

### 32. `readAll` — *pass*

Helper does what its name says (reads a `ReadableStream<Uint8Array>` to
completion). Conventional in the Node `stream/promises` ecosystem. **Pass.**

---

### 33. `parseResponse` / `marshalRequest` verb inconsistency — category 17 (Inconsistent action verbs)

**Symbols:** `parseResponse` (utils.ts:113), `marshalRequest` (utils.ts:119).

**Issue:** Two symmetric operations: response→object (parse) and
object→body-string (marshal). The verbs come from two different vocabularies
("parse" is generic TS/JS, "marshal" is Go). Internally consistent verb-pair
would be `parseResponse` / `serializeRequest` or `unmarshalResponse` /
`marshalRequest`. The current pair is awkward.

**Suggested:** `serializeRequest` and `parseResponse` (TS-native vocabulary)
or commit fully to the Go terms: `unmarshalResponse` and `marshalRequest`.
**Flag for SDK-wide consistency.**

---

### 34. `buildHttpRequest` — category 17 (Inconsistent action verbs) — *pass*

Verb-prefix matches the function's role (constructs an `HttpRequest`
object). Naming is fine. Note however the *file* mixes `build…`,
`execute…`, `marshal…`, `parse…`, `readAll`, `flatten…` — six verbs for
seven functions. Not unique to this package. **Pass.**

---

### 35. `flattenQueryParams` (utils.ts:123) — *dead code*

**Symbol:** `flattenQueryParams` (utils.ts:123).

**Issue:** Imported nowhere within this package's client (the `list` method
builds its query string inline at client.ts:166–173, and `update` does
similar at client.ts:243–247). The helper is dead code in this package, and
`marshalRequest` is also declared and unused in some methods that emit raw
bodies. Naming itself is fine. **Suggest** deleting from this package, or
extracting all utils into a shared helper module
(`@databricks/sdk-core/http`). **Flag generator behaviour.**

---

### 36. `ListOnlineStoresRequest`/`Response` — category 7 (Overly verbose) — *pass with note*

**Symbols:** `ListOnlineStoresRequest` (model.ts:67),
`ListOnlineStoresResponse` (model.ts:74).

Names are long (24/25 chars) but match the SDK-wide pattern for paginated
list endpoints. Within the package scope `ListRequest` / `ListResponse`
would suffice — only `online-store` listing exists — but every other TS
package qualifies. **Pass on package consistency.**

---

### 37. `Client.listOnlineStores` doc says "List Online Feature Stores" — category 6 (Misleading names)

**Symbol:** `Client.listOnlineStores` (client.ts:160).

**Issue:** Method JSDoc reads "List Online Feature Stores." — the result
type is `ListOnlineStoresResponse` of `OnlineStore[]`, *not*
`OnlineFeatureStore[]`. The type is called `OnlineStore`, the method is
`listOnlineStores`, and only the JSDoc says "Feature Stores". Two
spellings of the same concept. The wire path is `/feature-store/online-stores`.
**Fix the JSDoc** to align with the type names.

**Suggested JSDoc:** "List online stores." (matches type and method).

Similar inconsistency at `createOnlineStore` ("Create an Online Feature
Store.", client.ts:71), `deleteOnlineStore` ("Delete an Online Feature
Store.", client.ts:97), `getOnlineStore` ("Get an Online Feature Store.",
client.ts:135), `updateOnlineStore` ("Update an Online Feature Store.",
client.ts:237). All five method docstrings call them "Online Feature
Stores" while every type and field calls them "Online Stores."

This is a **package-wide doc-text drift**, not a code-naming bug, but
worth flagging: pick one — "online store" or "online feature store" — and
make it consistent. Recommended: keep the type as `OnlineStore` (concise)
and update JSDocs to drop "Feature" (already redundant since the package is
`@databricks/sdk-featurestore`).

---

### 38. Singular `OnlineStore` ⇔ plural `onlineStores` consistency — category 9 (Singular/plural mismatch) — *pass*

`ListOnlineStoresResponse.onlineStores: OnlineStore[]` (model.ts:76) is the
canonical pattern. **Pass.**

---

### 39. `creator` vs `pipelineId` casing — category 3 (Acronym/compound-word casing) — *pass*

`pipelineId` correctly camelCases the two-letter "ID"; `creator` is a
plain word. **Pass.**

---

## Cross-package notes (per audit instructions)

### `OnlineStore` concept vs. `features.OnlineStoreConfig`

The `features/v1` package defines `OnlineStoreConfig` (features/v1/model.ts:617)
which holds `catalogName`, `schemaName`, `tableNamePrefix`, `onlineStoreName`
— a *configuration* for an online store. This `featurestore.OnlineStore`
holds the *actual store* (with name, state, capacity, etc.). Two related
but distinct types live in two packages:

- `features.OnlineStoreConfig.onlineStoreName: string` — references a store
  by name.
- `featurestore.OnlineStore.name: string` — is the store's identifier.
- `featurestore.PublishSpec.onlineStore: string` — also references a store
  by name (but with no `…Name` suffix — see finding 15).

**Recommendation:** harmonise. Either:
1. All references to an online-store identifier use `onlineStoreName`
   (so rename `PublishSpec.onlineStore` to `onlineStoreName` — matches
   finding 15).
2. Or all references use `onlineStore` and the type is `string` with a
   marker (e.g. `type OnlineStoreName = string`).

Option 1 is cheaper. **P1 cross-package alignment fix.**

---

### `DeleteOnlineTableRequest` name collision with `onlinetables/v1`

Already covered in finding 6. Two distinct request types share the same
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
finding 22.

---

### Enum-naming convention divergence: `OnlineStore_State` vs `OnlineTableState`

| Pkg              | Enum name           | TS validity         |
|------------------|---------------------|---------------------|
| `featurestore`   | `OnlineStore_State` | Underscore — needs lint suppression. |
| `onlinetables`   | `OnlineTableState`  | Clean.              |
| `onlinetables`   | `ProvisioningInfo_State` | Underscore — needs lint suppression. |

The generator emits both flat and underscored forms for nested-vs-flat
proto enums. The right SDK-wide policy is to always emit flat names in TS
(strip the proto namespace). **Flag for generator.**

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

## Summary (counts)

- **Critical / cross-package consistency:** 2 findings (#15
  `PublishSpec.onlineStore` should be `onlineStoreName`; #6
  `DeleteOnlineTableRequest` shape collision with `onlinetables`).
- **High (style guide violations):** 4 findings (#1 `OnlineStore_State`
  underscore; #2 `PublishSpec_PublishMode` doubled noun; #4 enum SCREAMING
  casing; #28 `PACKAGE_SEGMENT` casing).
- **Medium (naming clarity, JSDoc drift):** 10 findings (#3, #7, #8, #11,
  #12, #14, #16, #21, #22, #37).
- **Low / project-wide convention notes (generator-level):** 10 findings
  (#9, #13, #17, #18, #24, #25, #30, #31, #33, #35).
- **Pass / acceptable as-is:** 13 findings (#5, #10, #19, #20, #23, #26,
  #27, #29, #32, #34, #36, #38, #39 — partial pass with notes).

**Total flagged findings: 39** distinct items across 20 audit categories
(several findings touch multiple categories). Many issues are
generator-emitted boilerplate inherited from the Go SDK; the cleanest local
fixes are findings 15, 21 (JSDoc), 22, 37 (JSDoc), and the cross-package
alignments noted above.
