# Naming Audit: `clusterlibraries` (v2)

Path: `/home/parth.bansal/sdk-js/packages/clusterlibraries/`
Files audited: `src/v2/model.ts`, `src/v2/client.ts`, `src/v2/utils.ts`, `src/v2/index.ts`
Scope: every type, field, enum value, method, and exported identifier.

Findings are grouped by category. Severity reflects the impact on TS consumers
of the SDK; "high" means a name will mislead, surprise, or conflict; "medium"
means it is awkward or inconsistent; "low" means a minor blemish.

---

## 1. Vague / generic names

### 1.1 `Library.lib` — `model.ts:159`
- `Library` already names the concept; the inner discriminated-union field
  `lib` is a shortened duplicate of the parent type name.
- The wire schema spreads the variants flat at the top level (`jar`, `egg`,
  `pypi`, etc.). The `lib` wrapper is a TS-only artifact for the tagged-union
  encoding. A more descriptive name would be `source`, `spec`, `package`, or
  `variant` (since it discriminates which package source/format applies).
- Severity: medium. Consumers must write `library.lib.jar` which reads as
  redundant.

### 1.2 `DefaultBaseEnvironment.message` — `model.ts:92`
- `message` is generic and could mean log message, error message, info text,
  user-facing description, etc. Coupled with `status`, this is almost
  certainly a status/error message. Name like `statusMessage` would be more
  precise.
- Same issue on `DefaultBaseEnvironmentCache.message` (`model.ts:103`).
- Severity: low.

### 1.3 `Environment.client` — `model.ts:116`
- Field is itself documented as deprecated ("Use `environment_version`
  instead.") and the name `client` is opaque in this context (a client of
  what?). The successor field `environmentVersion` is clearer. Cannot rename
  without breaking the wire contract, but worth flagging that the name is
  intrinsically misleading.
- Severity: medium (deprecated, but still visible in the type surface).

### 1.4 `RCranLibrary.package`, `PythonPyPiLibrary.package` — `model.ts:289, 299`
- `package` is a reserved word in JavaScript (future-reserved, strict mode)
  and conveys little semantic content beyond "package". Consider
  `coordinate`, `name`, or `packageName`. See also §10.
- Severity: medium.

### 1.5 `MavenLibrary.repo`, `PythonPyPiLibrary.repo`, `RCranLibrary.repo`
      — `model.ts:274, 294, 301`
- `repo` is an abbreviation. The companion `repo` documentation says
  "repository". `repository` (or `repositoryUrl`) would be more explicit. See
  also §5.
- Severity: low.

---

## 2. Redundant enum prefixes

### 2.1 `BaseEnvironmentType.BASE_ENVIRONMENT_TYPE_UNSPECIFIED` — `model.ts:7`
- Enum value embeds the enum name as a prefix. In TS, the canonical access
  is `BaseEnvironmentType.BASE_ENVIRONMENT_TYPE_UNSPECIFIED`, which is
  triply redundant ("BaseEnvironmentType" repeated). Value `UNSPECIFIED`
  would suffice idiomatically; the prefix is a proto-enum convention that
  does not survive the port intact.
- Severity: medium.

### 2.2 `DefaultBaseEnvironmentCache_Status.STATUS_UNSPECIFIED` — `model.ts:47`
- Same pattern: enum value `STATUS_UNSPECIFIED` inside an enum already
  carrying `Status` in its (compound) name. Bare `UNSPECIFIED` would be
  unambiguous.
- Severity: medium.

---

## 3. Acronym casing inconsistencies

### 3.1 `PythonPyPiLibrary` — `model.ts:284, 512, 686`
- Mixed casing for the PyPI acronym. The canonical brand name is **PyPI**
  (Python Package Index, https://pypi.org). The TS identifier uses `PyPi`
  which is neither pure brand casing nor TS acronym convention. Should be
  either `PythonPyPiLibrary` -> `PythonPyPILibrary` (brand) or — and this
  is the larger issue — the type itself is double-prefixed: it already
  belongs to a category of Python ecosystem things, so the prefix `Python`
  is also a tautology since "PyPI" is exclusively Python. `PypiLibrary` or
  `PyPILibrary` would be cleaner.
- The `$case: 'pypi'` literal further uses lowercase `pypi`, which is fine
  for a wire tag but inconsistent with the type name regardless of which
  casing wins.
- Severity: high (a brand-name spelling error visible in every consumer
  using PyPI packages).

### 3.2 `RCranLibrary` — `model.ts:297, 522, 696`
- "CRAN" (Comprehensive R Archive Network) is an all-caps acronym. The TS
  identifier renders it `Cran`. By TS/Google style guidance acronyms longer
  than two letters are typically PascalCased ("Cran"), but the resulting
  `RCranLibrary` mixes a one-letter prefix `R` (uppercase) with the lowercase
  acronym, which reads oddly (is it "R-Cran" or "RC-Ran"?). `CranLibrary`
  alone would be unambiguous (CRAN is R-specific); the `R` prefix is the
  same tautology as `Python` on `PythonPyPiLibrary`.
- The discriminator `$case: 'cran'` is consistent with the type tag.
- Severity: medium.

### 3.3 `Library.whl` — `model.ts:198, 206`
- "Whl" is the file-extension shorthand for Python wheels. The wire format
  uses `whl`, but the TS type otherwise uses long-form names (`jar`,
  `requirements`, `egg`). `wheel` would be more readable in TS but is a
  wire-contract concern (cannot rename without breaking compatibility).
- Severity: low (flagged for completeness — abbreviation, not strictly a
  casing issue).

### 3.4 `traceId` vs `trace_id` query param — `client.ts:222-224`
- Field is camelCase TS but serializes to snake_case on the wire. Consistent
  with all other fields; flagged only because the JSDoc on `traceId`
  (`model.ts:144`) hints at the deprecated nature of the param but uses
  identifier `ctx.requestId` — no `ctx` exists in this package. The hint
  refers to Go context which does not exist in the TS port; left over from
  Go SDK documentation.
- Severity: low (doc bug, not a name bug).

---

## 4. Underscores in TS identifiers

### 4.1 `DefaultBaseEnvironmentCache_Status` — `model.ts:46`
- Underscore is non-idiomatic in TS PascalCase identifiers. This is a
  proto-style nested name (`DefaultBaseEnvironmentCache.Status`) flattened
  by underscore. The file already has an explicit eslint-disable comment
  acknowledging this. A namespace or nested type would be more TS-native:
  `namespace DefaultBaseEnvironmentCache { enum Status {...} }` or
  rename to `DefaultBaseEnvironmentCacheStatus` (drop the underscore).
- Severity: high (every consumer importing this enum sees the underscore).

### 4.2 `InstallLibraries_Response` — `model.ts:156, 417`
- Same pattern: proto-style nested name flattened by underscore. The eslint
  comment acknowledges it. See also §20 (suffix redundancy).
- Severity: high.

### 4.3 `UninstallLibraries_Response` — `model.ts:319, 536`
- Same. Severity: high.

### 4.4 `ListAllClusterLibraryStatuses_Response` — `model.ts:235, 467`
- Same. Severity: high.

### 4.5 Marshal/unmarshal schema constants — `model.ts:417, 467, 536`
- `unmarshalInstallLibraries_ResponseSchema` and similar embed the
  underscore. These follow the type names so they propagate the issue.
- Severity: medium (internal helpers, but still exported).

---

## 5. Cryptic abbreviations

### 5.1 `Library.jar`, `Library.egg`, `Library.whl` — `model.ts:158-217`
- Single-extension abbreviations as field names. Wire-locked, but the type
  surface would be more discoverable with `jarUri`, `wheelUri`, etc. The
  `requirements` field at the same level uses the long form, so the variants
  are inconsistent within one type.
- Severity: low (wire compatibility constraint).

### 5.2 `repo` — multiple types
- See §1.5. Short form of `repository`. Severity: low.

### 5.3 `Library.pypi`, `Library.cran` — `model.ts:177-196`
- Lower-cased acronyms as field tags. Acceptable for wire compatibility,
  but the inconsistency with the (camelCased) type names (`PythonPyPiLibrary`,
  `RCranLibrary`) is jarring. See §3.
- Severity: low.

### 5.4 `filepath` — `model.ts:90`
- Single-word concatenation. TS convention prefers compound words like
  `filePath`. The wire uses `filepath` (one word) so the camelCase form
  mirrors it; arguably the wire spelling is also non-standard (most APIs
  use `file_path` or `path`).
- Severity: low.

---

## 6. Misleading names

### 6.1 `updateDefaultDefaultBaseEnvironment` — `client.ts:429`
- Method name contains "Default" twice ("the Default Default Base
  Environment"). The intent is clearer from the JSDoc: this method sets
  *which* DefaultBaseEnvironment (DBE) is the workspace's default. So the
  method is really `setWorkspaceDefaultBaseEnvironment` (or `setDefaultDbe`
  /` setWorkspaceDefault`). The doubled "Default" is a literal artifact of
  combining the `UpdateDefault___` HTTP verb with the `___DefaultBaseEnvironment`
  resource name.
- Severity: high. This method name is the most surprising in the package.

### 6.2 `UpdateDefaultDefaultBaseEnvironmentRequest` — `model.ts:326`
- Same problem on the request type. Severity: high.

### 6.3 `marshalUpdateDefaultDefaultBaseEnvironmentRequestSchema` — `model.ts:736`
- Same. Severity: high.

### 6.4 `ClusterStatus` — `model.ts:63`
- The type holds only a `clusterId` and is used as the request body for
  `clusterStatus()`. Naming it `ClusterStatus` suggests it *is* the status,
  but it is a request that fetches status. Better: `ClusterStatusRequest`
  or `GetClusterStatusRequest`. The accompanying response type is named
  `ClusterLibraryStatuses` (correct).
- Severity: high (the type name lies about its role).

### 6.5 `LibraryFullStatus` — `model.ts:220`
- "Full" implies there is a "Partial" or "Short" counterpart, but there is
  none in this package. The type is "the status of a library on a cluster"
  per the JSDoc — `LibraryStatus` would suffice. `Full` is meaningless.
- Severity: medium.

### 6.6 `LibraryInstallStatus` value `RESTORED` — `model.ts:42`
- The docstring says "Library installation is restored and can be used."
  But `RESTORED` overlaps semantically with `INSTALLED`. Without further
  context (cache restore vs. fresh install), consumers cannot distinguish.
  Name is technically accurate but underspecified.
- Severity: low.

### 6.7 `LibraryInstallStatus` value `UNINSTALL_ON_RESTART` — `model.ts:35`
- This is the only value that is an action+condition (rather than a state
  noun). Surrounding values are `PENDING`, `INSTALLED`, `FAILED`. A noun
  form like `PENDING_UNINSTALL` would line up.
- Severity: medium.

### 6.8 `allClusterStatuses()` — `client.ts:91`
- Method is the GET for `all-cluster-statuses`. The TS method name reads
  like an adjective ("all-cluster statuses") and is not verb-prefixed.
  Sibling method is `clusterStatus()` (also verb-less). Compare with the
  rest of the client: `installLibraries`, `uninstallLibraries`,
  `createDefaultBaseEnvironment`, etc. (all verb-prefixed). The two GET
  methods alone are exempt. Should be `listAllClusterStatuses` or
  `getAllClusterStatuses`, and `getClusterStatus` respectively.
- Severity: medium. See also §16.

### 6.9 `Environment` — `model.ts:114`
- Type name is generic but the comment makes clear it is the "environment
  spec" used in serverless side-panel / job-task / pipeline contexts. A
  more specific name like `EnvironmentSpec` or `WorkspaceEnvironment` would
  avoid collisions with the JS global `process.env` mental model.
- Severity: low.

### 6.10 `MaterializedEnvironment.lastUpdatedTimestamp` — `model.ts:264`
- The JSDoc says "when the materialized env is updated" — sufficient but
  the type itself does not carry the materialized payload (e.g., a hash,
  ID, or contents). The name overpromises relative to the contents;
  `EnvironmentCacheEntry` would be more honest.
- Severity: medium.

### 6.11 `DefaultBaseEnvironmentCache.indefiniteMaterializedEnvironment` — `model.ts:101`
- "Indefinite" is unexplained anywhere in the file. It pairs with
  `materializedEnvironment` but the semantic distinction is opaque. The
  name needs a doc or rename.
- Severity: medium.

### 6.12 `Environment.baseEnvironment` — `model.ts:131`
- A field inside `Environment` is also named `baseEnvironment` (same root
  word), which makes the relationship between the type and the field
  recursive-looking even though the field is just a path/ID string.
  Better: `baseEnvironmentRef` or `baseEnvironmentPath`.
- Severity: low.

---

## 7. Overly verbose names

### 7.1 `marshalUpdateDefaultDefaultBaseEnvironmentRequestSchema` — `model.ts:736`
- 50 characters of identifier, of which much is redundant ("Default" twice).
  See §6.1. Severity: medium.

### 7.2 `unmarshalListAllClusterLibraryStatuses_ResponseSchema` — `model.ts:467`
- 53 characters and includes both an underscore (§4) and "All" (which is
  also encoded in the URL `/api/2.0/libraries/all-cluster-statuses`). The
  type name `ListAllClusterLibraryStatuses` is itself verbose — `ListLibraryStatuses` or
  `ListClusterStatuses` would suffice.
- Severity: medium.

### 7.3 `UninstallLibraries_Response`, `InstallLibraries_Response` — `model.ts:156, 319`
- Verbose, underscored names. See §4.
- Severity: medium.

---

## 8. Redundant suffixes

### 8.1 Marshal/unmarshal schemas — `model.ts:331-746`
- All schemas end with `Schema`, but they are typed `z.ZodType<...>` which
  already conveys their schema nature. Inside the file the suffix may aid
  reading, but on a wide API surface `unmarshalLibrarySchema` reads as
  "Schema schema". Common enough in zod codebases that this is borderline
  acceptable; flagged for completeness.
- Severity: low.

### 8.2 `LibraryFullStatus` — `model.ts:220`
- "Full" is a vestigial qualifier with no counterpart. See §6.5.
- Severity: medium.

### 8.3 `ClusterLibraryStatuses.libraryStatuses` — `model.ts:60`
- Field name repeats the parent's middle word (Library). Could simply be
  `statuses`. Borderline acceptable for clarity.
- Severity: low.

### 8.4 `ListAllClusterLibraryStatuses_Response.statuses` — `model.ts:237`
- Field is just `statuses` while the type bakes in `LibraryStatuses`
  plurality and `ClusterLibrary` qualifier. Inconsistent with §8.3 which
  uses `libraryStatuses`.
- Severity: low.

---

## 9. Singular/plural mismatches

### 9.1 `MavenLibrary.exclusions` — `model.ts:281`
- Plural; field is a list. Doc says "List of dependences to exclude" —
  consistent. No issue (note: "dependences" is a typo for "dependencies",
  inherited from the API doc string).
- Severity (typo): low.

### 9.2 `ListAllClusterLibraryStatuses` (request) vs `_Response.statuses`
       — `model.ts:232, 237`
- Singular method name `allClusterStatuses` (`client.ts:91`) for what is
  semantically a list operation. Compare `listDefaultBaseEnvironments`
  (`client.ts:276`). The action verb should be `list` for both. See §16.
- Severity: medium.

### 9.3 `DefaultBaseEnvironment.baseEnvironmentCache` — `model.ts:93`
- Singular name but typed `DefaultBaseEnvironmentCache[]` (array). Should
  be `baseEnvironmentCaches` (or, if it really represents one cache lineage,
  the type definition is wrong). The Go SDK convention would surface this
  via Go's "[]" — in TS the plural-ness must be in the name.
- Severity: high.

---

## 10. Reserved-word collisions

### 10.1 `PythonPyPiLibrary.package`, `RCranLibrary.package` — `model.ts:289, 299`
- `package` is a future-reserved word in ECMAScript (strict mode reserved).
  It is legal as an object property name and a parameter, but it is awkward
  to destructure: `const {package: pkg} = ...`. The wire field is `package`,
  so renaming requires marshal/unmarshal indirection (the file already does
  that for snake_case translation). Alternative: `packageName` or
  `coordinate` (the same concept Maven uses).
- Severity: high (forces renaming on destructure).

### 10.2 No other reserved-word issues observed.

---

## 11. Duplicate concepts

### 11.1 `LibraryInstallStatus` vs `DefaultBaseEnvironmentCache_Status` — `model.ts:13, 46`
- Two `Status` enums in the same file, each with `PENDING` / `FAILED`
  members but different domains. Acceptable since they live in different
  contexts, but consider naming differently to avoid import-site confusion
  (e.g., `LibraryStatus` vs `DbeCacheStatus`).
- Severity: low.

### 11.2 `InstallLibraries` (request) vs `installLibraries()` (method)
       — `model.ts:148, client.ts:250`
- Method and request type share a name, distinguished only by case. TS
  convention works here because the type lives in the type namespace and
  the method in the value namespace. Fine.

### 11.3 `Environment` vs `MaterializedEnvironment` vs `DefaultBaseEnvironment`
       — `model.ts:78, 114, 262`
- Three closely related types with overlapping names. The relationship
  (DBE contains an Environment; cache holds MaterializedEnvironment) is
  not obvious from names alone. Documentation compensates, but new
  consumers face a name-soup. No surface fix; flagged for awareness.
- Severity: low.

### 11.4 `marshalRequest` vs implicit `JSON.stringify` — `utils.ts:119`
- Helper validates with zod then stringifies. Name suggests it could be
  used for any "request", but it is generic enough to marshal any value.
  Misleading-by-narrowing. `marshalToJson` would be clearer. (Utility scope.)
- Severity: low.

---

## 12. Verb-tense inconsistency

### 12.1 Method verbs across the client — `client.ts:91-456`
- `allClusterStatuses` and `clusterStatus` are verb-less (noun-only).
- `installLibraries`, `uninstallLibraries`, `createDefaultBaseEnvironment`,
  `deleteDefaultBaseEnvironment`, `getDefaultBaseEnvironment`,
  `listDefaultBaseEnvironments`, `refreshDefaultBaseEnvironments`,
  `updateDefaultBaseEnvironment`, `updateDefaultDefaultBaseEnvironment`
  use verb-prefixed forms.
- Two stragglers (`allClusterStatuses`, `clusterStatus`) should be aligned:
  `listAllClusterStatuses` (or `getAllClusterStatuses`) and
  `getClusterStatus`. See §6.8 and §16.
- Severity: high (consistency of the verb-prefix is a Java/TS SDK convention
  that consumers rely on).

### 12.2 `LibraryInstallStatus` action vs state values — `model.ts:13`
- Values mostly nouns (`PENDING`, `INSTALLED`, `FAILED`) but one verb
  imperative `UNINSTALL_ON_RESTART` and one passive `SKIPPED`. See §6.7.
- Severity: medium.

---

## 13. Go/Java-style names

### 13.1 `_Response` suffix on types — `model.ts:156, 235, 319`
- The `Operation_Response` underscore pattern mirrors Go's nested message
  generation (proto messages emit `Op.Response`). In TS, namespace nesting
  or direct naming (`InstallLibrariesResponse`) is more idiomatic. The
  generator's choice to use underscore loses the readability of the original
  proto nesting without buying anything.
- Severity: high.

### 13.2 `DefaultBaseEnvironmentCache_Status` — `model.ts:46`
- Same. Severity: high.

### 13.3 `marshalRequest` / `parseResponse` / `executeHttpCall` — `utils.ts`
- Function names follow Go/Java SDK convention (verbs). Fine for TS too.

### 13.4 Schema variable casing — `model.ts:331+`
- `marshalXxxSchema` / `unmarshalXxxSchema` constants follow Go SDK casing
  conventions. Idiomatic enough in TS but the lengths get long (§7.2).

### 13.5 `Library.lib` discriminator field — `model.ts:159`
- `$case` literal on the discriminator is a ts-proto / nanopb-style emission
  (e.g., the same pattern as ts-proto's discriminated union output). Not
  unidiomatic for TS, but `kind`, `type`, or `tag` would be more readable
  to a consumer with no Go/proto background.
- Severity: low.

---

## 14. Generic field names losing meaning

### 14.1 `DefaultBaseEnvironment.environment` — `model.ts:89`
- A field named `environment` inside a type already named
  `DefaultBaseEnvironment` is recursive-looking. The doc clarifies it is
  the embedded `Environment` spec — but `environmentSpec` or
  `inlineEnvironment` would convey "this is the actual environment
  description, distinct from the wrapping metadata".
- Severity: medium.

### 14.2 `DefaultBaseEnvironment.name`, `.id`, `.message` — `model.ts:79, 80, 92`
- Bare `id`, `name`, `message` are extremely generic. In context they are
  unambiguous, but a programmer using auto-complete on a result list of
  many resources may not be able to tell them apart. Cluster-level naming
  would benefit from `dbeId`, `dbeName`. The Go SDK uses bare `Id` because
  Go scopes them under the package; TS does too via the type, so the
  generic forms are fine.
- Severity: low.

### 14.3 `CreateDefaultBaseEnvironmentRequest.workspaceBaseEnvironmentId`
       — `model.ts:75`
- An ID field named `workspaceBaseEnvironmentId` inside a "create DBE"
  request. The `workspace` prefix implies a different resource (workspace
  base environment) than the request's payload (`defaultBaseEnvironment`).
  Documentation does not explain the relationship. The name is precise
  but the role is unclear without docs.
- Severity: medium.

---

## 15. Field contradicting type domain

### 15.1 `Environment.client` — `model.ts:116`
- "Client" inside an Environment spec is unexpected; the doc clarifies it
  is a deprecated stand-in for `environment_version`. The name belongs to
  a different semantic domain (clients connect to environments, they are
  not part of them).
- Severity: medium (deprecated, but exposed).

### 15.2 `LibraryFullStatus.isLibraryForAllClusters` — `model.ts:228`
- Inside `LibraryFullStatus` (per-cluster status), a field that describes
  whether the library is configured cluster-wide. The name reads like a
  global property but the type belongs to a single cluster's view. Better:
  `installedOnAllClusters` or `isClusterWideLibrary`.
- Severity: medium.

### 15.3 `MaterializedEnvironment.lastUpdatedTimestamp` — `model.ts:264`
- Type is "materialized environment metadata"; the only field is a
  timestamp. The materialization payload is missing — see §6.10. The
  timestamp belongs in a cache-entry type, not a materialization type.
- Severity: medium.

---

## 16. Inconsistent action verbs

### 16.1 GET vs `list` vs `all` — `client.ts:91, 276`
- `allClusterStatuses()` (verb `all`) is structurally identical to
  `listDefaultBaseEnvironments()` (verb `list`). Pick one. The Go SDK uses
  the same naming, but the TS port has the opportunity to normalize.
- Severity: medium (see §12.1).

### 16.2 `refreshDefaultBaseEnvironments` — `client.ts:333`
- `refresh` is a TS-idiomatic verb meaning re-fetch / re-compute. The
  operation here regenerates a cache asynchronously. Borderline OK, but
  consumers may expect `refresh()` to return updated data; this returns
  an empty response. `regenerateCache(s)` or `invalidateCache(s)` would
  reflect the side-effect more honestly.
- Severity: low.

### 16.3 `updateDefaultDefaultBaseEnvironment` vs `setDefault` URL — `client.ts:433`
- The URL says `:setDefault` but the method says `updateDefaultDefault`.
  `setDefaultBaseEnvironment` or `setWorkspaceDefault` would mirror the
  URL semantics. See §6.1.
- Severity: high.

### 16.4 `installLibraries` / `uninstallLibraries` — `client.ts:250, 368`
- Symmetric pair, good. Mirror request types `InstallLibraries` /
  `UninstallLibraries` (named after the operation, not the resource).
  Consistent.

---

## 17. Long enum values

### 17.1 `LibraryInstallStatus.UNINSTALL_ON_RESTART` — `model.ts:35`
- 20 characters; the only multi-word value. Acceptable since it conveys
  semantics, but combined with the prefix `LibraryInstallStatus.` the
  full reference is 41 characters. See also §6.7.
- Severity: low.

### 17.2 `BaseEnvironmentType.BASE_ENVIRONMENT_TYPE_UNSPECIFIED` — `model.ts:7`
- Total reference: `BaseEnvironmentType.BASE_ENVIRONMENT_TYPE_UNSPECIFIED`
  = 51 chars. See §2.1.
- Severity: medium.

---

## 18. Underspecified IDs

### 18.1 `CreateDefaultBaseEnvironmentRequest.requestId` — `model.ts:74`
- Idempotency UUID. Name is OK but generic; `idempotencyKey` would be more
  precise.
- Severity: low.

### 18.2 `GetDefaultBaseEnvironmentRequest.traceId` — `model.ts:145`
- Deprecated field. Name is OK; the comment hints at a missing replacement.
  Could be `traceId?: string` with a `@deprecated` JSDoc tag.
- Severity: low.

### 18.3 `DefaultBaseEnvironment.creatorUserId`, `.lastUpdatedUserId`
       — `model.ts:81, 83`
- Both are typed `number`. Databricks user IDs may exceed 2^53; bare
  `number` risks precision loss for very large IDs. (Naming-adjacent
  issue: the name `creatorUserId` is fine, but the *type* is undersized.)
  Compare with the Go SDK where these are `int64`.
- Severity: medium (type, not name) — flagged because it bears on
  consumer expectations about ID identifiers.

### 18.4 `DefaultBaseEnvironment.principalIds` — `model.ts:94`
- `number[]` with no domain (workspace principals, account principals?).
  `Principal` is ambiguous in Databricks (user, SP, group). `principalIds`
  needs scope, like `workspacePrincipalIds`.
- Severity: medium.

### 18.5 `CreateDefaultBaseEnvironmentRequest.workspaceBaseEnvironmentId`
       — `model.ts:75`
- See §14.3. Underspecified relationship with the rest of the request.
- Severity: medium.

### 18.6 `ClusterLibraryStatuses.clusterId`, `ClusterStatus.clusterId`,
       `InstallLibraries.clusterId`, `UninstallLibraries.clusterId`
       — `model.ts:58, 65, 150, 313`
- Bare `clusterId` everywhere. Good consistency. No issue.

### 18.7 `DefaultBaseEnvironment.id` — `model.ts:79`
- Bare `id`. With sibling `creatorUserId` etc., a name like `dbeId`
  would be more grep-able. The Go SDK uses bare `Id` due to package
  scoping; TS scopes via the type so this is OK.
- Severity: low.

### 18.8 `RefreshDefaultBaseEnvironmentsRequest.ids` — `model.ts:305`
- Untyped collection of IDs of what? Doc-less. `dbeIds` or
  `defaultBaseEnvironmentIds` would be unambiguous.
- Severity: medium.

---

## 19. Type-suffix tautology

### 19.1 `LibraryFullStatus` — `model.ts:220`
- "Status" appears in the type name and the field `status: LibraryInstallStatus`
  contains the noun again. Not a tautology per se, but the parent
  `LibraryFullStatus` could be `LibraryReport` or just `LibraryStatus` (with
  the inner field becoming `state` to avoid the duplicate).
- Severity: low.

### 19.2 `ClusterLibraryStatuses.libraryStatuses` — `model.ts:60`
- Already noted in §8.3.
- Severity: low.

### 19.3 `ListAllClusterLibraryStatuses_Response.statuses` — `model.ts:237`
- Type name carries the suffix; field name is bare. Inconsistent with
  §19.2 but otherwise fine.
- Severity: low.

### 19.4 `ListDefaultBaseEnvironmentsResponse.defaultBaseEnvironments`
       — `model.ts:246`
- Field name repeats the resource noun. Standard list-response pattern
  used across the SDK; no fix.
- Severity: low.

---

## Cross-cutting summary

### High-severity (consumer-facing surprises)

- `updateDefaultDefaultBaseEnvironment` / `UpdateDefaultDefaultBaseEnvironmentRequest`
  / `marshalUpdateDefaultDefaultBaseEnvironmentRequestSchema` (§6.1, §6.2,
  §6.3): the "Default Default" doubling is the most jarring naming in the
  package. Best resolved by renaming the public API to
  `setWorkspaceDefaultBaseEnvironment`.
- All `_Response` and `_Status` underscore types (§4, §13.1): non-idiomatic
  in TS, repeatedly exported, every importer sees them.
- `PythonPyPiLibrary` brand-casing inconsistency (§3.1): "PyPi" misspells
  the PyPI brand.
- `ClusterStatus` request type misleading-as-response (§6.4).
- `baseEnvironmentCache: DefaultBaseEnvironmentCache[]` singular-on-array
  (§9.3).
- `package` reserved-word collision on PyPI and CRAN libraries (§10.1).
- Verb-tense gap: `allClusterStatuses()` and `clusterStatus()` break the
  client's prevailing verb-prefix convention (§12.1, §16.1).

### Medium-severity

- Enum values embedding the enum name (§2.1, §2.2).
- `LibraryFullStatus` with no "non-full" counterpart (§6.5).
- `LibraryInstallStatus.UNINSTALL_ON_RESTART` mixes action and state
  (§6.7, §12.2).
- `MaterializedEnvironment` containing only a timestamp (§6.10).
- `DefaultBaseEnvironmentCache.indefiniteMaterializedEnvironment`
  unexplained (§6.11).
- `isLibraryForAllClusters` field name awkwardly straddles per-cluster
  and global domains (§15.2).

### Low-severity / stylistic

- `repo` vs `repository` short form (§1.5).
- `whl`, `jar`, `egg` extension-as-field-name (§5.1).
- `filepath` one-word concatenation (§5.4).
- Schema constants' `Schema` suffix (§8.1).
- `LibraryInstallStatus.RESTORED` underspecified vs `INSTALLED` (§6.6).
- "dependences" typo in `MavenLibrary.exclusions` doc (§9.1).

---

## Inventory (for completeness)

Enums audited:
- `BaseEnvironmentType` (model.ts:6).
- `LibraryInstallStatus` (model.ts:13).
- `DefaultBaseEnvironmentCache_Status` (model.ts:46).

Interfaces audited:
- `ClusterLibraryStatuses` (56).
- `ClusterStatus` (63).
- `CreateDefaultBaseEnvironmentRequest` (68).
- `DefaultBaseEnvironment` (78).
- `DefaultBaseEnvironmentCache` (99).
- `DeleteDefaultBaseEnvironmentRequest` (106).
- `Environment` (114).
- `GetDefaultBaseEnvironmentRequest` (142).
- `InstallLibraries` (148).
- `InstallLibraries_Response` (156).
- `Library` (158).
- `LibraryFullStatus` (220).
- `ListAllClusterLibraryStatuses` (232).
- `ListAllClusterLibraryStatuses_Response` (235).
- `ListDefaultBaseEnvironmentsRequest` (240).
- `ListDefaultBaseEnvironmentsResponse` (245).
- `MaterializedEnvironment` (262).
- `MavenLibrary` (267).
- `PythonPyPiLibrary` (284).
- `RCranLibrary` (297).
- `RefreshDefaultBaseEnvironmentsRequest` (304).
- `RefreshDefaultBaseEnvironmentsResponse` (309).
- `UninstallLibraries` (311).
- `UninstallLibraries_Response` (319).
- `UpdateDefaultBaseEnvironmentRequest` (321).
- `UpdateDefaultDefaultBaseEnvironmentRequest` (326).

Methods audited (`client.ts`):
- `allClusterStatuses` (91).
- `clusterStatus` (127).
- `createDefaultBaseEnvironment` (162).
- `deleteDefaultBaseEnvironment` (194).
- `getDefaultBaseEnvironment` (213).
- `installLibraries` (250).
- `listDefaultBaseEnvironments` (276).
- `listDefaultBaseEnvironmentsIter` (312).
- `refreshDefaultBaseEnvironments` (333).
- `uninstallLibraries` (368).
- `updateDefaultBaseEnvironment` (400).
- `updateDefaultDefaultBaseEnvironment` (429).

Utilities audited (`utils.ts`):
- `HttpCallOptions` (15).
- `executeCall` (26).
- `readAll` (40).
- `executeHttpCall` (65).
- `buildHttpRequest` (96).
- `parseResponse` (113).
- `marshalRequest` (119).
- `flattenQueryParams` (123).
