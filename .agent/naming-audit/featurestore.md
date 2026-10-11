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

### 1. `PublishSpec` is vague — category 1 (Vague/generic)

**Symbol:** `PublishSpec` (model.ts:107).

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

### 2. `OnlineStore_State` — model.ts:9

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

### 3. `PublishSpec_PublishMode` — model.ts:31

**Why:** Same `Parent_Nested` proto-namespace leak as finding 2. The
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
