# Naming Audit: `clusterlibraries` (v2)

Path: `/home/parth.bansal/sdk-js/packages/clusterlibraries/`
Files audited: `src/v2/model.ts`, `src/v2/client.ts`, `src/v2/utils.ts`, `src/v2/index.ts`
Scope: every type, field, enum value, method, and exported identifier.

Findings are grouped by category. Severity reflects the impact on TS consumers
of the SDK; "high" means a name will mislead, surprise, or conflict; "medium"
means it is awkward or inconsistent; "low" means a minor blemish.

---

## 1. Vague / generic names

### 1.1 `Library.lib` — `model.ts:61`
- `Library` already names the concept; the inner discriminated-union field
  `lib` is a shortened duplicate of the parent type name.
- The wire schema spreads the variants flat at the top level (`jar`, `egg`,
  `pypi`, etc.). The `lib` wrapper is a TS-only artifact for the tagged-union
  encoding. A more descriptive name would be `source`, `spec`, `package`, or
  `variant` (since it discriminates which package source/format applies).
- Severity: medium. Consumers must write `library.lib.jar` which reads as
  redundant.

### 1.2 `RCranLibrary.package`, `PythonPyPiLibrary.package` — `model.ts:174, 164`
- `package` is a reserved word in JavaScript (future-reserved, strict mode)
  and conveys little semantic content beyond "package". Consider
  `coordinate`, `name`, or `packageName`. See also §8.
- Severity: medium.

### 1.3 `MavenLibrary.repo`, `PythonPyPiLibrary.repo`, `RCranLibrary.repo`
      — `model.ts:149, 169, 176`
- `repo` is an abbreviation. The companion `repo` documentation says
  "repository". `repository` (or `repositoryUrl`) would be more explicit. See
  also §4.
- Severity: low.

---

## 2. Acronym casing inconsistencies

### 2.1 `PythonPyPiLibrary` — `model.ts:159`
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

### 2.2 `RCranLibrary` — `model.ts:172`
- "CRAN" (Comprehensive R Archive Network) is an all-caps acronym. The TS
  identifier renders it `Cran`. By TS/Google style guidance acronyms longer
  than two letters are typically PascalCased ("Cran"), but the resulting
  `RCranLibrary` mixes a one-letter prefix `R` (uppercase) with the lowercase
  acronym, which reads oddly (is it "R-Cran" or "RC-Ran"?). `CranLibrary`
  alone would be unambiguous (CRAN is R-specific); the `R` prefix is the
  same tautology as `Python` on `PythonPyPiLibrary`.
- The discriminator `$case: 'cran'` is consistent with the type tag.
- Severity: medium.

### 2.3 `Library.whl` — `model.ts:100, 108`
- "Whl" is the file-extension shorthand for Python wheels. The wire format
  uses `whl`, but the TS type otherwise uses long-form names (`jar`,
  `requirements`, `egg`). `wheel` would be more readable in TS but is a
  wire-contract concern (cannot rename without breaking compatibility).
- Severity: low (flagged for completeness — abbreviation, not strictly a
  casing issue).

---

## 3. Cryptic abbreviations

### 3.1 `Library.jar`, `Library.egg`, `Library.whl` — `model.ts:60-119`
- Single-extension abbreviations as field names. Wire-locked, but the type
  surface would be more discoverable with `jarUri`, `wheelUri`, etc. The
  `requirements` field at the same level uses the long form, so the variants
  are inconsistent within one type.
- Severity: low (wire compatibility constraint).

### 3.2 `repo` — multiple types
- See §1.3. Short form of `repository`. Severity: low.

### 3.3 `Library.pypi`, `Library.cran` — `model.ts:79, 95`
- Lower-cased acronyms as field tags. Acceptable for wire compatibility,
  but the inconsistency with the (camelCased) type names (`PythonPyPiLibrary`,
  `RCranLibrary`) is jarring. See §2.
- Severity: low.

---

## 4. Misleading names

### 4.1 `LibraryFullStatus` — `model.ts:122`
- "Full" implies there is a "Partial" or "Short" counterpart, but there is
  none in this package. The type is "the status of a library on a cluster"
  per the JSDoc — `LibraryStatus` would suffice. `Full` is meaningless.
- Severity: medium.

### 4.2 `LibraryInstallStatus` value `RESTORED` — `model.ts:35`
- The docstring says "Library installation is restored and can be used."
  But `RESTORED` overlaps semantically with `INSTALLED`. Without further
  context (cache restore vs. fresh install), consumers cannot distinguish.
  Name is technically accurate but underspecified.
- Severity: low.

### 4.3 `LibraryInstallStatus` value `UNINSTALL_ON_RESTART` — `model.ts:28`
- This is the only value that is an action+condition (rather than a state
  noun). Surrounding values are `PENDING`, `INSTALLED`, `FAILED`. A noun
  form like `PENDING_UNINSTALL` would line up. See also §10.2.
- Severity: medium.

### 4.4 `allClusterStatuses()` — `client.ts:74`
- Method is the GET for `all-cluster-statuses`. The TS method name reads
  like an adjective ("all-cluster statuses") and is not verb-prefixed.
  Sibling method is `clusterStatus()` (also verb-less). Compare with the
  rest of the client: `installLibraries`, `uninstallLibraries` (all
  verb-prefixed). The two GET methods alone are exempt. Should be
  `listAllClusterStatuses` or `getAllClusterStatuses`, and `getClusterStatus`
  respectively.
- Severity: medium. See also §11.

---

## 5. Overly verbose names

### 5.1 `ListAllClusterLibraryStatusesRequest` — `model.ts:134`
- The type name embeds "All" (which is also encoded in the URL
  `/api/2.0/libraries/all-cluster-statuses`). The type name
  `ListAllClusterLibraryStatusesRequest` is itself verbose — `ListLibraryStatusesRequest`
  or `ListClusterStatusesRequest` would suffice.
- Severity: medium.

---

## 6. Redundant suffixes

### 6.1 `LibraryFullStatus` — `model.ts:122`
- "Full" is a vestigial qualifier with no counterpart. See §4.1.
- Severity: medium.

### 6.2 `ClusterLibraryStatuses.libraryStatuses` — `model.ts:42`
- Field name repeats the parent's middle word (Library). Could simply be
  `statuses`. Borderline acceptable for clarity.
- Severity: low.

---

## 7. Singular/plural mismatches

### 7.1 `MavenLibrary.exclusions` — `model.ts:156`
- Plural; field is a list. Doc says "List of dependences to exclude" —
  consistent. No issue (note: "dependences" is a typo for "dependencies",
  inherited from the API doc string).
- Severity (typo): low.

### 7.2 `ListAllClusterLibraryStatusesRequest` (request) — `model.ts:134`
- Singular method name `allClusterStatuses` (`client.ts:74`) for what is
  semantically a list operation. The action verb should be `list`. See §11.
- Severity: medium.

---

## 8. Reserved-word collisions

### 8.1 `PythonPyPiLibrary.package`, `RCranLibrary.package` — `model.ts:164, 174`
- `package` is a future-reserved word in ECMAScript (strict mode reserved).
  It is legal as an object property name and a parameter, but it is awkward
  to destructure: `const {package: pkg} = ...`. The wire field is `package`,
  so renaming requires marshal/unmarshal indirection (the file already does
  that for snake_case translation). Alternative: `packageName` or
  `coordinate` (the same concept Maven uses).
- Severity: high (forces renaming on destructure).

### 8.2 No other reserved-word issues observed.

---

## 9. Duplicate concepts

_None._

---

## 10. Verb-tense inconsistency

### 10.1 Method verbs across the client — `client.ts:74, 110, 144, 176`
- `allClusterStatuses` and `clusterStatus` are verb-less (noun-only).
- `installLibraries`, `uninstallLibraries` use verb-prefixed forms.
- Two stragglers (`allClusterStatuses`, `clusterStatus`) should be aligned:
  `listAllClusterStatuses` (or `getAllClusterStatuses`) and
  `getClusterStatus`. See §4.4 and §11.
- Severity: high (consistency of the verb-prefix is a Java/TS SDK convention
  that consumers rely on).

### 10.2 `LibraryInstallStatus` action vs state values — `model.ts:6`
- Values mostly nouns (`PENDING`, `INSTALLED`, `FAILED`) but one verb
  imperative `UNINSTALL_ON_RESTART` and one passive `SKIPPED`. See §4.3.
- Severity: medium.

---

## 11. Inconsistent action verbs

### 11.1 GET vs `list` vs `all` — `client.ts:74`
- `allClusterStatuses()` (verb `all`) reads as a noun-phrase, not a verb.
  The Go SDK uses the same naming, but the TS port has the opportunity to
  normalize to `list` (or `get`).
- Severity: medium (see §10.1).

### 11.2 `installLibraries` / `uninstallLibraries` — `client.ts:144, 176`
- Symmetric pair, good. Mirror request types `InstallLibrariesRequest` /
  `UninstallLibrariesRequest` (named after the operation, not the resource).
  Consistent.

---

## 12. Field contradicting type domain

### 12.1 `LibraryFullStatus.isLibraryForAllClusters` — `model.ts:130`
- Inside `LibraryFullStatus` (per-cluster status), a field that describes
  whether the library is configured cluster-wide. The name reads like a
  global property but the type belongs to a single cluster's view. Better:
  `installedOnAllClusters` or `isClusterWideLibrary`.
- Severity: medium.

---

## 13. Long enum values

_None._

---

## 14. Underspecified IDs

### 14.1 `ClusterLibraryStatuses.clusterId`, `ClusterStatusRequest.clusterId`,
       `InstallLibrariesRequest.clusterId`, `UninstallLibrariesRequest.clusterId`
       — `model.ts:40, 47, 52, 181`
- Bare `clusterId` everywhere. Good consistency. No issue.

---

## 15. Type-suffix tautology

### 15.1 `LibraryFullStatus` — `model.ts:122`
- "Status" appears in the type name and the field `status: LibraryInstallStatus`
  contains the noun again. Not a tautology per se, but the parent
  `LibraryFullStatus` could be `LibraryReport` or just `LibraryStatus` (with
  the inner field becoming `state` to avoid the duplicate).
- Severity: low.

### 15.2 `ClusterLibraryStatuses.libraryStatuses` — `model.ts:42`
- Already noted in §6.2.
- Severity: low.

---

## Cross-cutting summary

### High-severity (consumer-facing surprises)

- `PythonPyPiLibrary` brand-casing inconsistency (§2.1): "PyPi" misspells
  the PyPI brand.
- `package` reserved-word collision on PyPI and CRAN libraries (§8.1).
- Verb-tense gap: `allClusterStatuses()` and `clusterStatus()` break the
  client's prevailing verb-prefix convention (§10.1, §11.1).

### Medium-severity

- `LibraryFullStatus` with no "non-full" counterpart (§4.1).
- `LibraryInstallStatus.UNINSTALL_ON_RESTART` mixes action and state
  (§4.3, §10.2).
- `isLibraryForAllClusters` field name awkwardly straddles per-cluster
  and global domains (§12.1).

### Low-severity / stylistic

- `repo` vs `repository` short form (§1.3).
- `whl`, `jar`, `egg` extension-as-field-name (§3.1).
- `LibraryInstallStatus.RESTORED` underspecified vs `INSTALLED` (§4.2).
- "dependences" typo in `MavenLibrary.exclusions` doc (§7.1).

---

## Inventory (for completeness)

Enums audited:
- `LibraryInstallStatus` (model.ts:6).

Interfaces audited:
- `ClusterLibraryStatuses` (38).
- `ClusterStatusRequest` (45).
- `InstallLibrariesRequest` (50).
- `InstallLibrariesRequest_Response` (58).
- `Library` (60).
- `LibraryFullStatus` (122).
- `ListAllClusterLibraryStatusesRequest` (134).
- `ListAllClusterLibraryStatusesRequest_Response` (137).
- `MavenLibrary` (142).
- `PythonPyPiLibrary` (159).
- `RCranLibrary` (172).
- `UninstallLibrariesRequest` (179).
- `UninstallLibrariesRequest_Response` (187).

Methods audited (`client.ts`):
- `allClusterStatuses` (74).
- `clusterStatus` (110).
- `installLibraries` (144).
- `uninstallLibraries` (176).

Utilities audited (`utils.ts`):
- `HttpCallOptions` (15).
- `executeCall` (26).
- `readAll` (40).
- `executeHttpCall` (65).
- `buildHttpRequest` (96).
- `parseResponse` (113).
- `marshalRequest` (119).
- `flattenQueryParams` (123).

---

## Fixed

- #1.2 `DefaultBaseEnvironment.message` (originally cited at model.ts:92): Fixed in regeneration on 2026-05-20 — `DefaultBaseEnvironment` type removed from package.
- #1.3 `Environment.client` (originally cited at model.ts:116): Fixed in regeneration on 2026-05-20 — `Environment` type removed from package.
- #2.4 `traceId` vs `trace_id` query param (originally cited at client.ts:222-224): Fixed in regeneration on 2026-05-20 — `traceId` and surrounding DBE getter removed.
- #3.4 `filepath` (originally cited at model.ts:90): Fixed in regeneration on 2026-05-20 — `DefaultBaseEnvironment` type removed.
- #4.1 `updateDefaultDefaultBaseEnvironment` (originally cited at client.ts:429): Fixed in regeneration on 2026-05-20 — method removed from client.
- #4.2 `UpdateDefaultDefaultBaseEnvironmentRequest` (originally cited at model.ts:326): Fixed in regeneration on 2026-05-20 — type removed from package.
- #4.3 `ClusterStatus` (originally cited at model.ts:63): Fixed in regeneration on 2026-05-20 — renamed to `ClusterStatusRequest` as the audit suggested.
- #4.8 `Environment` (originally cited at model.ts:114): Fixed in regeneration on 2026-05-20 — type removed from package.
- #4.9 `MaterializedEnvironment.lastUpdatedTimestamp` (originally cited at model.ts:264): Fixed in regeneration on 2026-05-20 — `MaterializedEnvironment` type removed.
- #4.10 `DefaultBaseEnvironmentCache.indefiniteMaterializedEnvironment` (originally cited at model.ts:101): Fixed in regeneration on 2026-05-20 — `DefaultBaseEnvironmentCache` type removed.
- #4.11 `Environment.baseEnvironment` (originally cited at model.ts:131): Fixed in regeneration on 2026-05-20 — `Environment` type removed.
- #7.3 `DefaultBaseEnvironment.baseEnvironmentCache` (originally cited at model.ts:93): Fixed in regeneration on 2026-05-20 — `DefaultBaseEnvironment` type removed.
- #9.1 `InstallLibraries` (request) vs `installLibraries()` (method) (originally cited at model.ts:148, client.ts:250): Fixed in regeneration on 2026-05-20 — request type renamed to `InstallLibrariesRequest`, eliminating the case-only collision.
- #9.2 `Environment` vs `MaterializedEnvironment` vs `DefaultBaseEnvironment` (originally cited at model.ts:78, 114, 262): Fixed in regeneration on 2026-05-20 — all three types removed from package.
- #11.2 `refreshDefaultBaseEnvironments` (originally cited at client.ts:333): Fixed in regeneration on 2026-05-20 — method removed from client.
- #11.3 `updateDefaultDefaultBaseEnvironment` vs `setDefault` URL (originally cited at client.ts:433): Fixed in regeneration on 2026-05-20 — method removed from client.
- #12.1 `Environment.client` (originally cited at model.ts:116): Fixed in regeneration on 2026-05-20 — `Environment` type removed.
- #12.3 `MaterializedEnvironment.lastUpdatedTimestamp` (originally cited at model.ts:264): Fixed in regeneration on 2026-05-20 — `MaterializedEnvironment` type removed.
- #14.1 `CreateDefaultBaseEnvironmentRequest.requestId` (originally cited at model.ts:74): Fixed in regeneration on 2026-05-20 — type removed from package.
- #14.2 `GetDefaultBaseEnvironmentRequest.traceId` (originally cited at model.ts:145): Fixed in regeneration on 2026-05-20 — type removed from package.
- #14.3 `DefaultBaseEnvironment.creatorUserId`, `.lastUpdatedUserId` (originally cited at model.ts:81, 83): Fixed in regeneration on 2026-05-20 — `DefaultBaseEnvironment` type removed.
- #14.4 `DefaultBaseEnvironment.principalIds` (originally cited at model.ts:94): Fixed in regeneration on 2026-05-20 — `DefaultBaseEnvironment` type removed.
- #14.5 `CreateDefaultBaseEnvironmentRequest.workspaceBaseEnvironmentId` (originally cited at model.ts:75): Fixed in regeneration on 2026-05-20 — type removed from package.
- #14.7 `DefaultBaseEnvironment.id` (originally cited at model.ts:79): Fixed in regeneration on 2026-05-20 — `DefaultBaseEnvironment` type removed.
- #14.8 `RefreshDefaultBaseEnvironmentsRequest.ids` (originally cited at model.ts:305): Fixed in regeneration on 2026-05-20 — type removed from package.
- #15.3 `ListDefaultBaseEnvironmentsResponse.defaultBaseEnvironments` (originally cited at model.ts:246): Fixed in regeneration on 2026-05-20 — type removed from package.
