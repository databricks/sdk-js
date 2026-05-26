# Naming Audit: `clusterlibraries` (v2)

Path: `/home/parth.bansal/sdk-js/packages/clusterlibraries/`
Files audited: `src/v2/model.ts`, `src/v2/client.ts`, `src/v2/utils.ts`, `src/v2/index.ts`
Scope: every type, field, enum value, method, and exported identifier.

Findings are grouped by category. Severity reflects the impact on TS consumers
of the SDK; "high" means a name will mislead, surprise, or conflict; "medium"
means it is awkward or inconsistent; "low" means a minor blemish.

---

## 1. Vague / generic names

_None._

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

---

## 3. Cryptic abbreviations

### 3.1 `Library.pypi`, `Library.cran` — `model.ts:79, 95`
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

### 4.2 `LibraryInstallStatus` value `UNINSTALL_ON_RESTART` — `model.ts:28`
- This is the only value that is an action+condition (rather than a state
  noun). Surrounding values are `PENDING`, `INSTALLED`, `FAILED`. A noun
  form like `PENDING_UNINSTALL` would line up. See also §10.2.
- Severity: medium.

### 4.3 `allClusterStatuses()` — `client.ts:74`
- Method is the GET for `all-cluster-statuses`. The TS method name reads
  like an adjective ("all-cluster statuses") and is not verb-prefixed.
  Sibling method is `clusterStatus()` (also verb-less). Compare with the
  rest of the client: `installLibraries`, `uninstallLibraries` (all
  verb-prefixed). The two GET methods alone are exempt. Should be
  `listAllClusterStatuses` or `getAllClusterStatuses`, and `getClusterStatus`
  respectively.
- Severity: medium. See also §10.

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

---

## 7. Singular/plural mismatches

### 7.1 `ListAllClusterLibraryStatusesRequest` (request) — `model.ts:134`
- Singular method name `allClusterStatuses` (`client.ts:74`) for what is
  semantically a list operation. The action verb should be `list`. See §11.
- Severity: medium.

---

## 8. Reserved-word collisions

_None._

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
  `getClusterStatus`. See §4.3 and §11.
- Severity: high (consistency of the verb-prefix is a Java/TS SDK convention
  that consumers rely on).

### 10.2 `LibraryInstallStatus` action vs state values — `model.ts:6`
- Values mostly nouns (`PENDING`, `INSTALLED`, `FAILED`) but one verb
  imperative `UNINSTALL_ON_RESTART` and one passive `SKIPPED`. See §4.2.
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

_None._

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

---

## Cross-cutting summary

### High-severity (consumer-facing surprises)

- `PythonPyPiLibrary` brand-casing inconsistency (§2.1): "PyPi" misspells
  the PyPI brand.
- Verb-tense gap: `allClusterStatuses()` and `clusterStatus()` break the
  client's prevailing verb-prefix convention (§10.1, §11.1).

### Medium-severity

- `LibraryFullStatus` with no "non-full" counterpart (§4.1).
- `LibraryInstallStatus.UNINSTALL_ON_RESTART` mixes action and state
  (§4.2, §10.2).

### Low-severity / stylistic

_None._

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
