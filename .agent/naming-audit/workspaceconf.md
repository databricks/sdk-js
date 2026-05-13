# Naming Audit: workspaceconf

**Path:** `/home/parth.bansal/sdk-js/packages/workspaceconf/`
**Versions audited:** v1
**Inferred domain:** Reads and writes a workspace's "known configuration" key/value entries — a generic `map[string]string` bag of advanced workspace toggles served from `/api/2.0/workspace-conf`. The legacy Go SDK calls this surface `WorkspaceConf` with methods `GetStatus`/`SetStatus`.
**Total weird names flagged:** 23

---

## Top themes (read this first)

1. **The package name `workspaceconf` is the single biggest offense in this audit.**
   - `conf` is an undocumented, cryptic abbreviation of `configuration`. Spelling it out costs four characters and removes ambiguity (cf. *config* vs *conference* vs *confidence*).
   - The package's *entire surface area* is two types and two methods — yet "conf" is repeated in: package name, every type name, every method name, and the JSDoc on every public symbol. The cost of fixing it is low; the benefit is high.
   - Naming-rule literature (Google TS style guide §5.4 "Abbreviations") and Databricks' own JS SDK convention (see `packages/clusters`, `packages/jobs`, `packages/cleanrooms` — all spelled out) say the right name is **`workspaceconfig`** or **`workspaceconfiguration`**.

2. **`workspaceconf` semantically overlaps with `workspacesettings`, `settings`, and `accountsettings` — and the overlap is hidden by the cryptic name.**
   - `workspacesettings` (the sibling package) exposes ~80 typed setting toggles (CSP, ESM, default warehouse, auto-restart, …) — i.e. the *typed* workspace configuration API.
   - `workspaceconf` exposes the *legacy untyped* workspace configuration API, where everything is `string`/`string` and toggles are referenced by string key (e.g. `"enableIpAccessLists"`).
   - In the legacy Go SDK both APIs live in *the same package* (`service/settings`) and share documentation; in the JS SDK they are split into two packages whose names do not telegraph the typed-vs-untyped distinction. The cryptic abbreviation `conf` makes the relationship invisible.
   - A reader landing on `@databricks/sdk-workspaceconf` cannot tell from the name whether to use it or `workspacesettings`. The right answer ("legacy untyped string-bag for advanced toggles") should be in the package name and/or the module JSDoc — currently it is in neither.

3. **The TS port silently changed `WorkspaceConf` from a `map<string,string>` to a single `{key, value}` pair.** This is the most consequential single-name finding in the audit. See §6 below — it is not just a naming bug, it is a wire-shape bug that makes the call useless for the standard multi-toggle pattern.

---

## Summary table

| # | Severity | Category | Identifier | File:line |
|---|----------|----------|------------|-----------|
| 1 | High | Cryptic abbreviation (package-wide) | package name `workspaceconf` / `@databricks/sdk-workspaceconf` | `package.json:2` |
| 2 | High | Cryptic abbreviation, Type-suffix tautology | `WorkspaceConf` (interface) | `model.ts:9-12` |
| 3 | High | Cryptic abbreviation, Overly verbose | `GetWorkspaceConfRequest` | `model.ts:5-7` |
| 4 | High | Misleading / inconsistent action verb | `updateWorkspaceConf` method (PATCH that actually replaces / `SetStatus` upstream) | `client.ts:89` |
| 5 | High | Misleading / generic field name | `keys?: string` (single CSV string, not an array) | `model.ts:6` |
| 6 | High | Misleading / wire-shape regression vs Go SDK | `WorkspaceConf = {key, value}` (Go is `map[string]string`) | `model.ts:9-12` |
| 7 | High | Duplicate concept | `workspaceconf` vs `workspacesettings` | package level |
| 8 | High | Generic field name losing meaning | `key?` / `value?` fields | `model.ts:10-11` |
| 9 | Medium | Method name redundancy | `Client.getWorkspaceConf` / `Client.updateWorkspaceConf` | `client.ts:58, 89` |
| 10 | Medium | Verb-tense inconsistency cross-package | TS `getWorkspaceConf`/`updateWorkspaceConf` vs Go `GetStatus`/`SetStatus` | `client.ts` vs Go SDK |
| 11 | Medium | Singular/plural mismatch | `keys` (plural query arg) on a request that returns *one* `{key, value}` | `model.ts:6` vs `model.ts:9-12` |
| 12 | Medium | Singular/plural mismatch | `WorkspaceConf` (singular type) but the endpoint accepts/returns a *map* | `model.ts:9-12` |
| 13 | Medium | Overly verbose / module JSDoc missing | no `index.ts` module-level JSDoc explaining the package's scope | `index.ts:1-8` |
| 14 | Medium | Reserved-word adjacency | `key` (TS-friendly but shadows builtin `Map.prototype.keys`) | `model.ts:10` |
| 15 | Medium | Misleading | TS `WorkspaceConf` is also the *request* body of `updateWorkspaceConf` *and* the *response* of `getWorkspaceConf` — single name, two roles | `client.ts:58-86, 89-106` |
| 16 | Medium | Misleading PATCH semantics | "Sets the configuration status … including enabling or disabling it." | `client.ts:88` |
| 17 | Low | Acronym casing inconsistency | `Conf` vs spelled-out `Config` across SDK packages | cross-package |
| 18 | Low | Verbose JSDoc | "Gets the configuration status for a workspace." / "Sets the configuration status …" | `client.ts:57, 88` |
| 19 | Low | Underspecified ID | `keys` accepts comma-separated string of unspecified vocabulary | `model.ts:6` |
| 20 | Low | Type-suffix tautology | `WorkspaceConf` inside package `workspaceconf` → triple stutter | `model.ts:9` |
| 21 | Low | Module-doc location | no top-of-file JSDoc on `index.ts` (per CLAUDE.md §10.6) | `index.ts` |
| 22 | Low | Field contradicting type domain | `WorkspaceConf.value` typed `string`, but actual values are stringified booleans/numbers | `model.ts:11` |
| 23 | Low | Inconsistent action verb | `updateWorkspaceConf` (TS) corresponds to HTTP `PATCH` with **full-bag-replace** server semantics | `client.ts:98` |

---

## High severity

### 1. Package name `workspaceconf` — cryptic abbreviation
- **File:line:** `package.json:2` (`"name": "@databricks/sdk-workspaceconf"`); directory path; every import site.
- **Category:** Cryptic abbreviation.
- **Suggestion:** **`workspaceconfig`** (or `workspaceconfiguration` if the SDK is verbose-friendly). Equivalently, scoped name `@databricks/sdk-workspaceconfig`.
- **Rationale:** "conf" is not a standard abbreviation of "configuration" in any major TS/JS style guide. The Google TS style guide explicitly forbids non-conventional abbreviations (§5.4 *Abbreviations*: "Treat abbreviations like acronyms in names as whole words … Don't use abbreviations that are not widely accepted within the team or community"). The TS SDK already uses fully spelled-out forms in sibling packages (`workspacesettings`, `workspaceassignment`, `workspacebindings`) so "workspaceconf" stands out as the lone abbreviated package. The legacy Go SDK is *also* fully spelled-out — `WorkspaceConf` is the legacy type name in `service/settings`, but the *package* there is `settings`, not `workspaceconf`. This package name is a JS-SDK invention and could be fixed at the generator level with no Go-SDK churn.

### 2. `WorkspaceConf` (interface) — cryptic + tautological
- **File:line:** `model.ts:9-12`
- **Category:** Cryptic abbreviation, type-suffix tautology, duplicate-concept.
- **Suggestion:** Rename the interface to `WorkspaceConfigEntry` (because it represents *one* key/value pair — see §6) and rename the package to `workspaceconfig` (§1). Then the type read by the consumer becomes `workspaceconfig.Entry` — semantically clear, no abbreviation.
- **Rationale:** Three problems at once. (a) "Conf" is cryptic (§1). (b) Inside a package literally named `workspaceconf`, the type `WorkspaceConf` triple-stutters when consumed (`workspaceconf.WorkspaceConf`). (c) The name does not describe the shape: in the TS port it is a single key/value pair, *not* the workspace configuration as a whole (see §6 for why this is also wrong).

### 3. `GetWorkspaceConfRequest` — cryptic + verbose
- **File:line:** `model.ts:5-7`
- **Category:** Cryptic abbreviation, overly verbose.
- **Suggestion:** Rename to `GetWorkspaceConfigRequest` once the package is spelled out (§1). If the SDK ever moves to short package-scoped names, `GetRequest` within the package context is unambiguous.
- **Rationale:** The full name `GetWorkspaceConfRequest` is 24 characters of which 12 ("WorkspaceConf") are package-redundant and 7 ("Request") are convention noise. The legacy Go SDK calls the same shape `GetStatusRequest` (16 chars, single field `Keys`). The cryptic `Conf` abbreviation (§1) compounds the verbosity — the type appears in every consumer's import list and method signature, so a 4-character savings is real.

### 4. `updateWorkspaceConf` method name — misleading
- **File:line:** `client.ts:89-106`
- **Category:** Misleading / inconsistent action verb.
- **Suggestion:** Either `setConfig` (matches the upstream `SetStatus` semantics — the body is a full replacement, not a partial update), or `patchConfig` (matches the HTTP verb). The current name lies about both.
- **Rationale:** The JSDoc reads "Sets the configuration status for a workspace, including enabling or disabling it." — i.e. the canonical action is **set**, not **update**. The HTTP verb is PATCH (which conventionally implies partial update) but the body shape is the entire WorkspaceConf payload; the doc and the upstream Go method name (`SetStatus`) confirm full-replace semantics. The TS verb `update` is overloaded in the rest of the SDK to mean "partial mutation by field-mask," so users will reasonably assume this method merges into the existing config — and it does not.

### 5. `keys?: string` — misleading / generic / singular-plural confusion
- **File:line:** `model.ts:6`
- **Category:** Misleading + generic field name + singular/plural mismatch.
- **Suggestion:** Rename to `configKeys?: readonly string[]` (true array, not a CSV string) and let `flattenQueryParams` / `URLSearchParams` handle list-style query encoding. If the backend genuinely takes a CSV string, document that in a JSDoc on the field; do not make the SDK type lie.
- **Rationale:** Three problems. (a) Generic: "keys" on a request type without context means nothing — *which* keys, of *what*? Compare `configKeys` which immediately answers. (b) Plural form `keys` is a TS-array idiom that the type contradicts (`string`, not `string[]`). (c) The upstream API accepts a comma-separated string, but a strongly-typed SDK should accept `string[]` and serialize the comma-join itself; the current `keys?: string` punts string-encoding to the caller. The Go SDK has the same shape (`Keys string`) — that's a Go-SDK limitation worth fixing in the JS port, not faithfully reproducing.

### 6. `WorkspaceConf = {key, value}` — wire-shape regression vs Go SDK (CRITICAL)
- **File:line:** `model.ts:9-12`
- **Category:** Misleading / Generic field names losing meaning / wire-shape divergence.
- **Suggestion:** Change the type to match upstream semantics: `WorkspaceConfig = Readonly<Record<string, string>>` (or `Map<string, string>`). The endpoint `/api/2.0/workspace-conf` accepts and returns a map of multiple key/value pairs; the current `{key?: string; value?: string}` cannot represent that.
- **Rationale (the single most important finding in this audit):**
  - In the legacy Go SDK (`databricks/databricks-sdk-go @ service/settings/model.go`):
    ```go
    type WorkspaceConf map[string]string
    ```
    and the methods are:
    ```go
    GetStatus(ctx, GetStatusRequest) (*map[string]string, error)
    SetStatus(ctx, WorkspaceConf) error
    ```
    i.e. the request and response are *both* a map of arbitrary keys to string values.
  - The TS port has:
    ```ts
    export interface WorkspaceConf {
      key?: string | undefined;
      value?: string | undefined;
    }
    ```
    i.e. a single optional key/value *pair*. This:
    1. Cannot represent the multi-entry response that the API actually returns (e.g. fetching multiple keys via `keys=k1,k2` returns `{"k1":"v1","k2":"v2"}`, not `{key:"k1",value:"v1"}`).
    2. Cannot update more than one toggle at a time, while the legacy semantics permit a single PATCH to flip many.
    3. Will round-trip through zod and either fail validation or silently drop fields on every realistic payload.
  - The bug is *naming-shaped* — the wire format is a string→string map; the type and its fields name a single pair — so it qualifies as a naming audit finding (the type name `WorkspaceConf` promises the whole config and delivers one pair). It is also a correctness bug that should be filed against the generator. This is the *single most important* finding in this audit.

### 7. `workspaceconf` vs `workspacesettings` — duplicate concept, undisclosed
- **File:line:** package level
- **Category:** Duplicate concept (vs workspacesettings, settings, accountsettings).
- **Suggestion:** Either:
  (a) merge `workspaceconf` into `workspacesettings` as a sub-module (`workspacesettings/legacy` or `workspacesettings/raw`), since they target the same physical workspace-configuration surface, or
  (b) add an unmissable `index.ts` JSDoc that says: "This package wraps the legacy untyped workspace configuration API (`/api/2.0/workspace-conf`). For typed setting toggles (CSP, ESM, default warehouse, auto-restart, etc.) use `@databricks/sdk-workspacesettings`."
- **Rationale:** A user reading the package list cannot tell what differentiates `workspaceconf` from `workspacesettings` — and the legacy Go SDK confirms they are the same logical domain (both live in `service/settings/`). The cryptic name `conf` actively hides the relationship. The package's `README` / `index.ts` says nothing to disambiguate. In a multi-package SDK this is a usability hazard: a user searching for "set workspace setting" might pick the wrong package and never realize the right typed API exists.

### 8. `key` / `value` — generic field names losing meaning
- **File:line:** `model.ts:10-11`
- **Category:** Generic field name losing meaning.
- **Suggestion:** Once §6 is fixed (`WorkspaceConfig = Record<string, string>`), the generic names go away: a map has named keys at runtime. If the wire-shape is genuinely a singleton pair (it is not, per §6), rename to `configKey` / `configValue` to add domain context.
- **Rationale:** Within a single package, every public type/method ends up reading `WorkspaceConf.key` / `WorkspaceConf.value` — but there is no signal of *what* the key is keyed by or *what* the value represents. Domain-bearing field names (e.g. `configKey: string`, `configValue: string`) make IDE hover meaningful.

---

## Medium severity

### 9. `Client.getWorkspaceConf` / `Client.updateWorkspaceConf` — method-name redundancy
- **File:line:** `client.ts:58, 89`
- **Category:** Method name redundancy / duplicate concept.
- **Suggestion:** `Client.get` / `Client.set` (matches Go `GetStatus`/`SetStatus` shorn of the redundant `Status` suffix), since the `Client` is already package-scoped. So `workspaceconfig.Client.get()` and `workspaceconfig.Client.set()`.
- **Rationale:** `workspaceconf.Client.getWorkspaceConf()` triple-stutters "workspace conf." Compare other SDK packages where the client carries the namespace (`clusters.Client.list()`, not `clusters.Client.listClusters()`).

### 10. `getWorkspaceConf` / `updateWorkspaceConf` (TS) vs `GetStatus` / `SetStatus` (Go) — cross-package verb inconsistency
- **File:line:** TS `client.ts:58, 89`; Go `service/settings/api.go`.
- **Category:** Verb-tense / cross-SDK inconsistency.
- **Suggestion:** Standardize on one pair across SDKs. The cleanest is `get` / `set` (paired verbs), which matches the Go SDK and accurately describes the PATCH-as-replace semantics (§4).
- **Rationale:** A user reading both SDKs will notice the verb mismatch. "update" in particular is a foreign verb here (no other Get/Update verb pair in the Go SDK for this endpoint).

### 11. `keys` (plural query arg) → returns *one* `{key, value}` — singular/plural mismatch
- **File:line:** `model.ts:6` vs `model.ts:9-12`
- **Category:** Singular/plural mismatch (intertwined with §6).
- **Suggestion:** Once §6 is fixed (return-type becomes a map), the plural request shape matches the plural response shape and this finding dissolves.
- **Rationale:** This is the surface symptom of §6. The request says "give me values for these keys (plural)" but the response can only carry one key. This is internally contradictory.

### 12. `WorkspaceConf` (singular type) used for a map endpoint — singular/plural mismatch
- **File:line:** `model.ts:9-12`
- **Category:** Singular/plural mismatch.
- **Suggestion:** See §6. If the type stays a single entry, rename it `WorkspaceConfigEntry` (singular noun matching singular shape).
- **Rationale:** "WorkspaceConf" (or "WorkspaceConfig") names the whole bag; "WorkspaceConfigEntry" names a single pair. The current name promises the bag, delivers the entry.

### 13. Missing module-level JSDoc on `index.ts`
- **File:line:** `index.ts:1-8`
- **Category:** Documentation absence (relates to "module doc in index" memory rule).
- **Suggestion:** Add a top-of-file JSDoc explaining what this package wraps (legacy untyped workspace configuration), how it relates to `workspacesettings`, and giving an example invocation.
- **Rationale:** Per project rule (typescript.mdc §10.6, also in user memory), module-level JSDoc belongs in `index.ts`. The package's role is unique and easily confused with `workspacesettings`; the lack of a module-level doc maximises that confusion.

### 14. Field name `key` — adjacent to reserved patterns
- **File:line:** `model.ts:10`
- **Category:** Reserved-word adjacency.
- **Suggestion:** Rename to `configKey` (clearer, no collision risk).
- **Rationale:** `key` is not strictly reserved, but it collides with `Map.prototype.keys`, `Object.keys`, React's `key` prop, etc., so type-narrowing in user code can become ambiguous. A package-specific prefix removes the collision.

### 15. `WorkspaceConf` overloaded as request *and* response type — misleading
- **File:line:** `client.ts:61, 90` (used as both `Promise<WorkspaceConf>` return and `req: WorkspaceConf` argument).
- **Category:** Misleading / duplicate concept.
- **Suggestion:** Split into `WorkspaceConfig` (response — the full map) and `UpdateWorkspaceConfigRequest` (request — a `Partial<WorkspaceConfig>` or `Record<string, string>` of just the keys to set). The Go SDK gets away with the overload because the type *is* the map, but the TS port's `{key, value}` shape (§6) makes this overload doubly confusing.
- **Rationale:** Using the same type for the request and the response works only when the wire shape is symmetric *and* the type name is shape-accurate. Here it's neither.

### 16. PATCH but full-replace — misleading HTTP semantics
- **File:line:** `client.ts:88` (JSDoc: "Sets the configuration status …"), `client.ts:98` (HTTP `PATCH`).
- **Category:** Misleading.
- **Suggestion:** Document that PATCH is *full-bag-replace* for unspecified keys (or that absent keys retain their value — whichever is actually true). Currently the user has to inspect the upstream Go SDK to know.
- **Rationale:** HTTP PATCH conventionally merges; this endpoint's verb is `Set`. The semantic difference matters for any caller writing safe code.

---

## Low severity

### 17. `Conf` vs `Config` — acronym/abbreviation casing inconsistency cross-SDK
- **File:line:** cross-package
- **Category:** Acronym/abbreviation casing inconsistency.
- **Suggestion:** Pick `Config` everywhere (§1).
- **Rationale:** Other SDK packages spell it out; only `workspaceconf` abbreviates.

### 18. JSDoc redundancy on the two methods
- **File:line:** `client.ts:57` ("Gets the configuration status for a workspace."), `client.ts:88` ("Sets the configuration status for a workspace, including enabling or disabling it.").
- **Category:** Overly verbose / repetitive.
- **Suggestion:** Move "the configuration status for a workspace" into the module-level JSDoc (§13); per-method docs can be one-liners ("Returns the current config." / "Replaces the config.").
- **Rationale:** Both method docs lead with the same phrase; the body of the method already implies it.

### 19. `keys` parameter accepts an unspecified vocabulary
- **File:line:** `model.ts:6`
- **Category:** Underspecified ID / generic field.
- **Suggestion:** Either link to the Databricks docs that enumerate the valid keys ("enableIpAccessLists", "maxTokenLifetimeDays", "enableProjectTypeInWorkspace", …) or accept a typed union of known string-literal keys.
- **Rationale:** A user can't construct a valid request without finding the key vocabulary somewhere external. Documenting the legal set is a 10-minute fix and dramatically improves usability.

### 20. Type-suffix tautology `workspaceconf.WorkspaceConf`
- **File:line:** `model.ts:9` (and every consumer importing `workspaceconf.WorkspaceConf`).
- **Category:** Type-suffix tautology.
- **Suggestion:** Drop the package prefix from the type name (per §2 — once §1 is done, `WorkspaceConfig` -> `Entry` or `Config`).
- **Rationale:** Same pattern as `accountsettings.PersonalComputeSetting` flagged in the `accountsettings` audit (severity #12-15 there). TS users access via package; the package prefix on the type name is gratuitous.

### 21. No module-level JSDoc per project rule
- **File:line:** `index.ts:1-8`
- **Category:** Convention violation.
- **Suggestion:** Add `@module` / file-leading JSDoc summary.
- **Rationale:** Project memory references `feedback_module_doc_in_index.md` and `typescript.mdc` §10.6 — module-level JSDoc must live in `index.ts`. The current `index.ts` is comment-free.

### 22. `value: string` typing — field contradicts domain
- **File:line:** `model.ts:11`
- **Category:** Field contradicting type domain / underspecified.
- **Suggestion:** Document (in a JSDoc on `value`) that the value is always a *stringified* primitive — even toggles are `"true"`/`"false"` strings, not booleans. Or, in the wrapper layer, deserialize known boolean/integer keys into their TS-native types.
- **Rationale:** The legacy Go SDK preserves the wire-shape `map[string]string`. In TypeScript, presenting a `value: string` field where the value is actually a JSON-encoded bool or number leaks the wire format to the user. Either document or transform.

### 23. `updateWorkspaceConf` method body uses HTTP `PATCH` — verb mismatch with name
- **File:line:** `client.ts:98`
- **Category:** Inconsistent action verb (relates to §4).
- **Suggestion:** Either rename the method to `patchConfig` (verb matches HTTP) or change the underlying call to `PUT` (semantics match). Since the upstream Go calls this `SetStatus` (i.e. canonically a SET, not a partial update), `setConfig` is closest to truth.
- **Rationale:** Three different names ("update" / "PATCH" / "Set") describe the same operation across the three layers — TS method, HTTP layer, Go SDK. Pick one verb for the user-visible name.

---

## Cross-package observations (informational)

- The new Go SDK (`databricks/sdk-go`) does **not** have a top-level `workspaceconf` package — the workspace configuration surface in the new SDK lives under `settings/v2`. So the `workspaceconf` JS package's name is a JS-port choice and is *not* directly inherited from the new Go SDK; renaming costs the JS port nothing on the Go-port-correspondence axis.
- The legacy Go SDK (`databricks/databricks-sdk-go @ service/settings/`) is the source for the type names `WorkspaceConf`, `GetStatusRequest`, `SetStatus`, etc. The legacy Go shape `WorkspaceConf = map[string]string` is the **canonical wire shape** — the TS port diverged from it (§6).
- `workspacesettings`, `accountsettings`, `settings`, and `workspaceconf` are four packages with overlapping responsibilities. A single-page comparison doc (in the JS SDK's README) would dramatically reduce confusion. This is out of scope for a naming audit but recommended.

---

## Recommendations (priority order)

1. **Fix §6** (wire-shape regression). This is a correctness bug, not just a naming bug; file it against the generator.
2. **Rename the package** `workspaceconf` → `workspaceconfig` (§1). Update `package.json`, directory name, every import site, the index doc.
3. **Add module-level JSDoc** to `index.ts` (§7, §13, §21) explaining the package's role and its relationship to `workspacesettings`.
4. **Rename the method pair** to `get` / `set` (or `getConfig` / `setConfig`) for cross-SDK and HTTP-semantic accuracy (§4, §9, §10, §23).
5. **Type `keys` as `string[]`** (§5) and have the client serialize the CSV.
