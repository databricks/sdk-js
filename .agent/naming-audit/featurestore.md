# Naming Audit: `featurestore` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/featurestore/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/index.ts`
**Cross-package references:** `features/v1` (`OnlineStoreConfig`,
`onlineStoreName`), `materializedfeatures/v1`, `onlinetables/v1`
(`DeleteOnlineTableRequest`, `OnlineTable`, `OnlineTableState`,
`OnlineTableSpec`).
**Go reference:** `databricks/sdk-go` `databricks/api/` (the 1:1 port source).

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

### 2. `PublishSpec` is vague — category 1 (Vague/generic) — *Still*

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

### 3. `PublishTableResponse.pipelineId` — *pass* — *Still*

Format is documented as a pipeline ID; aligns with `pipelines/v2` naming.
No issue.

---

### 4. `UpdateOnlineStoreRequest.updateMask` — category 7 (Overly verbose) — *pass* — *Still*

**Symbol:** `UpdateOnlineStoreRequest.updateMask: FieldMask<OnlineStore>`
(model.ts:126).

`updateMask` is the canonical Google AIP-134 name for partial-update masks;
the type `FieldMask<OnlineStore>` is from `@databricks/sdk-core/wkt`. The
naming is SDK-wide and idiomatic. **Pass.**

---

### 5. `onlineStoreFieldMaskSchema` private but exported via `onlineStoreFieldMask()` — *pass* — *Still*

**Symbols:** `onlineStoreFieldMaskSchema` (model.ts:221, internal) and
`onlineStoreFieldMask()` (model.ts:231, public). Clean separation: the
schema is private, the helper is exported, and the helper name matches the
Google AIP-134 update-mask vocabulary. **Pass.**

---

### 6. `ListOnlineStoresRequest`/`Response` — category 7 (Overly verbose) — *pass with note* — *Still*

**Symbols:** `ListOnlineStoresRequest` (model.ts:67),
`ListOnlineStoresResponse` (model.ts:74).

Names are long (24/25 chars) but match the SDK-wide pattern for paginated
list endpoints. Within the package scope `ListRequest` / `ListResponse`
would suffice — only `online-store` listing exists — but every other TS
package qualifies. **Pass on package consistency.**

---

### 7. Singular `OnlineStore` ⇔ plural `onlineStores` consistency — category 9 (Singular/plural mismatch) — *pass* — *Still*

`ListOnlineStoresResponse.onlineStores: OnlineStore[]` (model.ts:76) is the
canonical pattern. **Pass.**

---

### 8. `OnlineStore_State` — model.ts:9 — *Still*

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

### 9. `PublishSpec_PublishMode` — model.ts:27 — *Still*

**Why:** Same `Parent_Nested` proto-namespace leak as finding 8. The
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
