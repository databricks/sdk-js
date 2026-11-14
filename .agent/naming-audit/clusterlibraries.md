# Naming Audit: `clusterlibraries` (v2)

Path: `/home/parth.bansal/sdk-js/packages/clusterlibraries/`
Files audited: `src/v2/model.ts`, `src/v2/client.ts`, `src/v2/index.ts`

---

## 1. Misleading names

### 1.1 `LibraryFullStatus` — `model.ts:126`
- "Full" implies there is a "Partial" or "Short" counterpart, but there is
  none in this package. The type is "the status of a library on a cluster"
  per the JSDoc — `LibraryStatus` would suffice. `Full` is meaningless.
- Severity: medium.

### 1.2 `allClusterStatuses()` — `client.ts:75`
- Method is the GET for `all-cluster-statuses`. The TS method name reads
  like an adjective ("all-cluster statuses") and is not verb-prefixed.
  Sibling method is `clusterStatus()` (also verb-less). Compare with the
  rest of the client: `installLibraries`, `uninstallLibraries` (all
  verb-prefixed). The two GET methods alone are exempt. Should be
  `listAllClusterStatuses` or `getAllClusterStatuses`, and `getClusterStatus`
  respectively.
- Severity: medium. See also §5.

---

## 2. Overly verbose names

### 2.1 `ListAllClusterLibraryStatusesRequest` — `model.ts:138`
- The type name embeds "All" (which is also encoded in the URL
  `/api/2.0/libraries/all-cluster-statuses`). The type name
  `ListAllClusterLibraryStatusesRequest` is itself verbose — `ListLibraryStatusesRequest`
  or `ListClusterStatusesRequest` would suffice.
- Severity: medium.

---

## 3. Redundant suffixes

### 3.1 `LibraryFullStatus` — `model.ts:126`
- "Full" is a vestigial qualifier with no counterpart. See §1.1.
- Severity: medium.

---

## 4. Singular/plural mismatches

### 4.1 `ListAllClusterLibraryStatusesRequest` (request) — `model.ts:138`
- Singular method name `allClusterStatuses` (`client.ts:75`) for what is
  semantically a list operation. The action verb should be `list`. See §6.
- Severity: medium.

---

## 5. Verb-tense inconsistency

### 5.1 Method verbs across the client — `client.ts:75, 115, 153, 186`
- `allClusterStatuses` and `clusterStatus` are verb-less (noun-only).
- `installLibraries`, `uninstallLibraries` use verb-prefixed forms.
- Two stragglers (`allClusterStatuses`, `clusterStatus`) should be aligned:
  `listAllClusterStatuses` (or `getAllClusterStatuses`) and
  `getClusterStatus`. See §1.2 and §6.
- Severity: high (consistency of the verb-prefix is a Java/TS SDK convention
  that consumers rely on).

---

## 6. Inconsistent action verbs

### 6.1 GET vs `list` vs `all` — `client.ts:75`
- `allClusterStatuses()` (verb `all`) reads as a noun-phrase, not a verb.
  The Go SDK uses the same naming, but the TS port has the opportunity to
  normalize to `list` (or `get`).
- Severity: medium (see §5.1).

---

## 7. Type-suffix tautology

### 7.1 `LibraryFullStatus` — `model.ts:126`
- "Status" appears in the type name and the field `status: LibraryInstallStatus`
  contains the noun again. Not a tautology per se, but the parent
  `LibraryFullStatus` could be `LibraryReport` or just `LibraryStatus`.
- Severity: low.
