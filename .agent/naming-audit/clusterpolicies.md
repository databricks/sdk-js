# Naming Audit: `clusterpolicies` (v2)

**Package:** `@databricks/sdk-clusterpolicies`
**Path:** `/home/parth.bansal/sdk-js/packages/clusterpolicies/`
**Version audited:** `v2`
**Files audited:**

- `src/v2/model.ts`
- `src/v2/client.ts`
- `src/v2/utils.ts`
- `src/v2/index.ts`

This audit catalogues every identifier (type, field, enum value, method,
constant) in the package and flags naming concerns against the 20-category
rubric. Issues are graded:

- **High** — actively misleading, ambiguous, or violates a TS rule.
- **Medium** — friction; verbose, redundant, or stylistically off.
- **Low** — nit / consistency observation; safe to ignore.

---

## 1. Inventory

### 1.1 Enums (`model.ts`)

| Name              | Members                                          |
| ----------------- | ------------------------------------------------ |
| `ListOrder`       | `DESC`, `ASC`                                    |
| `PolicySortColumn`| `POLICY_CREATION_TIME`, `POLICY_NAME`            |

### 1.2 Interfaces (`model.ts`)

| Name                       | Purpose                                       |
| -------------------------- | --------------------------------------------- |
| `CreatePolicy`             | Request body for create.                      |
| `CreatePolicy_Response`    | Response from create (proto-style suffix).    |
| `DeletePolicy`             | Request body for delete.                      |
| `DeletePolicy_Response`    | Empty response from delete.                   |
| `EditPolicy`               | Request body for update/edit.                 |
| `EditPolicy_Response`      | Empty response from edit.                     |
| `GetPolicy`                | Request body for get.                         |
| `Library`                  | Discriminated-union wrapper around `lib`.     |
| `ListPolicies`             | Request body for list.                        |
| `ListPolicies_Response`    | Response from list.                           |
| `MavenLibrary`             | Maven coordinates payload.                    |
| `Policy`                   | The cluster-policy entity.                    |
| `PythonPyPiLibrary`        | PyPI package payload.                         |
| `RCranLibrary`             | CRAN R package payload.                       |

### 1.3 Fields (entity / request / response — combined catalog)

| Type                       | Field                              | Type / Notes                  |
| -------------------------- | ---------------------------------- | ----------------------------- |
| `CreatePolicy`             | `name`                             | `string?`                     |
| `CreatePolicy`             | `definition`                       | `string?`                     |
| `CreatePolicy`             | `description`                      | `string?`                     |
| `CreatePolicy`             | `policyFamilyId`                   | `string?`                     |
| `CreatePolicy`             | `policyFamilyDefinitionOverrides`  | `string?`                     |
| `CreatePolicy`             | `maxClustersPerUser`               | `number?`                     |
| `CreatePolicy`             | `libraries`                        | `Library[]?`                  |
| `CreatePolicy_Response`    | `policyId`                         | `string?`                     |
| `DeletePolicy`             | `policyId`                         | `string?`                     |
| `EditPolicy`               | `policyId`                         | `string?`                     |
| `EditPolicy`               | `name` … `libraries`               | (same shape as `CreatePolicy`)|
| `GetPolicy`                | `policyId`                         | `string?`                     |
| `Library`                  | `lib`                              | discriminated union           |
| `Library.lib.$case`        | `jar`/`egg`/`pypi`/`maven`/`cran`/`whl`/`requirements` | union tag |
| `ListPolicies`             | `sortOrder`                        | `ListOrder?`                  |
| `ListPolicies`             | `sortColumn`                       | `PolicySortColumn?`           |
| `ListPolicies_Response`    | `policies`                         | `Policy[]?`                   |
| `MavenLibrary`             | `coordinates`                      | `string?`                     |
| `MavenLibrary`             | `repo`                             | `string?`                     |
| `MavenLibrary`             | `exclusions`                       | `string[]?`                   |
| `Policy`                   | `policyId`                         | `string?`                     |
| `Policy`                   | `creatorUserName`                  | `string?`                     |
| `Policy`                   | `createdAtTimestamp`               | `number?`                     |
| `Policy`                   | `isDefault`                        | `boolean?`                    |
| `Policy`                   | `name`                             | `string?`                     |
| `Policy`                   | `definition`                       | `string?`                     |
| `Policy`                   | `description`                      | `string?`                     |
| `Policy`                   | `policyFamilyId`                   | `string?`                     |
| `Policy`                   | `policyFamilyDefinitionOverrides`  | `string?`                     |
| `Policy`                   | `maxClustersPerUser`               | `number?`                     |
| `Policy`                   | `libraries`                        | `Library[]?`                  |
| `PythonPyPiLibrary`        | `package`                          | `string?` (reserved word)     |
| `PythonPyPiLibrary`        | `repo`                             | `string?`                     |
| `RCranLibrary`             | `package`                          | `string?` (reserved word)     |
| `RCranLibrary`             | `repo`                             | `string?`                     |

### 1.4 Methods (`client.ts`)

| Method          | Verb | Returns                  |
| --------------- | ---- | ------------------------ |
| `createPolicy`  | POST | `CreatePolicy_Response`  |
| `deletePolicy`  | POST | `DeletePolicy_Response`  |
| `editPolicy`    | POST | `EditPolicy_Response`    |
| `getPolicy`     | GET  | `Policy`                 |
| `listPolicies`  | GET  | `ListPolicies_Response`  |

### 1.5 Other identifiers

- `client.ts`: `PACKAGE_SEGMENT` constant; `Client` class with private fields
  `host`, `httpClient`, `logger`, `userAgent`.
- `utils.ts`: `HttpCallOptions` interface; functions `executeCall`,
  `readAll`, `executeHttpCall`, `buildHttpRequest`, `parseResponse`,
  `marshalRequest`, `flattenQueryParams`.
- Marshal / unmarshal schemas: `unmarshalCreatePolicy_ResponseSchema`,
  `unmarshalDeletePolicy_ResponseSchema`, `unmarshalEditPolicy_ResponseSchema`,
  `unmarshalLibrarySchema`, `unmarshalListPolicies_ResponseSchema`,
  `unmarshalMavenLibrarySchema`, `unmarshalPolicySchema`,
  `unmarshalPythonPyPiLibrarySchema`, `unmarshalRCranLibrarySchema`,
  `marshalCreatePolicySchema`, `marshalDeletePolicySchema`,
  `marshalEditPolicySchema`, `marshalLibrarySchema`, `marshalMavenLibrarySchema`,
  `marshalPythonPyPiLibrarySchema`, `marshalRCranLibrarySchema`.

---

## 2. Findings by Category

### 2.1 Vague / generic names — High & Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| V-01  | `Library.lib` (field)               | High     | The field name `lib` is a meaningless abbreviation that conveys nothing the surrounding type doesn't already say. The wrapper interface is `Library`, so the discriminator field could be named `kind`, `variant`, `source`, or `spec`. As `lib`, callers must write `library.lib.$case === 'jar'`, which reads as "library library case". |
| V-02  | `MavenLibrary.repo`, `RCranLibrary.repo`, `PythonPyPiLibrary.repo` | Medium | `repo` is generic and overloaded across types. For Maven it is a Maven repository URL; for CRAN it is a CRAN mirror; for PyPI it is a pip index. Renaming to `repositoryUrl` (or even `mavenRepoUrl` / `cranMirrorUrl` / `pipIndexUrl`) would be more self-describing. |
| V-03  | `Policy.definition`, `CreatePolicy.definition`, `EditPolicy.definition` | Medium | `definition` is generic in a multi-domain SDK. Without the JSDoc it's unclear it's a JSON document. `policyDefinition` (matches `policyFamilyDefinitionOverrides`) would be self-consistent. |
| V-04  | `Policy.description`, `CreatePolicy.description`, `EditPolicy.description` | Low | Generic but standard across the SDK; acceptable. |
| V-05  | `parseResponse` (utils)             | Low      | Generic, but it's local to the package. Acceptable. |
| V-06  | `flattenQueryParams` (utils)        | Low      | Reasonable. |

### 2.2 Redundant enum prefixes — High

| ID    | Symbol                                | Severity | Issue |
| ----- | ------------------------------------- | -------- | ----- |
| E-01  | `PolicySortColumn.POLICY_CREATION_TIME` | High   | The enum is already named `PolicySortColumn`. Members `POLICY_CREATION_TIME` and `POLICY_NAME` re-state `POLICY`. Inside the enum's scope `CREATION_TIME` and `NAME` are unambiguous (`PolicySortColumn.CREATION_TIME`). |
| E-02  | `PolicySortColumn.POLICY_NAME`        | High     | Same as above. |

Note: `ListOrder.DESC` / `ListOrder.ASC` are fine — they're standard SQL
abbreviations and don't repeat the enum prefix.

### 2.3 Acronym casing inconsistencies — High

| ID    | Symbol                | Severity | Issue |
| ----- | --------------------- | -------- | ----- |
| A-01  | `PythonPyPiLibrary`   | High     | "PyPI" is a proper acronym (Python Package Index). The chosen casing `PyPi` is non-standard — official sources write **PyPI** (see https://pypi.org/ and PEP 541). Should be `PythonPyPILibrary`. Also affects the schema names `unmarshalPythonPyPiLibrarySchema` / `marshalPythonPyPiLibrarySchema`. |
| A-02  | `RCranLibrary`        | Medium   | "CRAN" is an acronym ("Comprehensive R Archive Network"). The type uses `Cran` (PascalCase) which is acceptable under Google TS style (acronyms ≥3 chars → only first letter capitalised). However, the JSDoc and surrounding usage refers to "CRAN library". Consistent with the rule but worth noting — peer types like `PolicySortColumn` keep full uppercase in member names. Leave as-is for Google style compliance. |
| A-03  | `RCranLibrary` — prefix `R` | Low | The leading lone `R` (the language) is awkward; the Go SDK uses the same name so this is a porting constraint. |
| A-04  | `pypi` discriminator case (`Library.lib.$case === 'pypi'`) | Low | Lowercased, matching API wire format; consistent with `jar`, `egg`, `cran`, `maven`. Acceptable. |

### 2.4 Underscores in TS identifiers — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| U-01  | `CreatePolicy_Response`             | High     | Underscores in TS type names violate Google TypeScript style (`UpperCamelCase` only — see https://google.github.io/styleguide/tsguide.html#naming-style). Every occurrence requires an `eslint-disable @typescript-eslint/naming-convention` annotation. Should be `CreatePolicyResponse`. |
| U-02  | `DeletePolicy_Response`             | High     | Same as U-01. |
| U-03  | `EditPolicy_Response`               | High     | Same as U-01. |
| U-04  | `ListPolicies_Response`             | High     | Same as U-01. |
| U-05  | `unmarshalCreatePolicy_ResponseSchema` (and 3 siblings) | High | Same naming-convention violation cascades through the schema constants. |
| U-06  | Enum member identifiers (`POLICY_CREATION_TIME`, `POLICY_NAME`) | Low | `SCREAMING_SNAKE_CASE` is acceptable for enum members under Google style (matches API wire values). Not a violation, just noted. |

### 2.5 Cryptic abbreviations — Medium

| ID    | Symbol                  | Severity | Issue |
| ----- | ----------------------- | -------- | ----- |
| C-01  | `Library.lib`           | High (also covered V-01) | `lib` is a cryptic abbreviation of "library" inside a type already called `Library`. |
| C-02  | `Library.lib.$case === 'whl'` | Medium | `whl` (wheel) is a Python packaging file extension; readers unfamiliar with Python will not know it. Documented in JSDoc but the discriminator value itself is opaque. |
| C-03  | `Library.lib.$case === 'egg'` | Medium | Same as C-02 for Python "egg" files. The JSDoc even notes it is "Deprecated". |
| C-04  | `MavenLibrary.exclusions` | Low | Maven term, OK in context. |
| C-05  | `req`, `resp`, `httpReq`, `respBody` (`client.ts`) | Low | Inside method scope; OK for short-lived locals but `request` / `response` would be clearer at no cost. |
| C-06  | `opts` (`utils.ts` parameter, `executeHttpCall`) | Low | Inside fn scope; minor. |

### 2.6 Misleading names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| M-01  | `EditPolicy` / `editPolicy()`       | High     | Standard CRUD verbs in TS/REST are **create / read / update / delete**. The Databricks "Cluster Policies 2.0" API uses `/edit` as the wire path, but the SDK could still expose `updatePolicy` (with `UpdatePolicy` request type) which is the conventional REST verb. Compare with the newer `policies` API surface and most other Databricks SDK resources that expose `update*`. As-is, the SDK exposes `editPolicy` while peer packages (e.g. `clusters`) often expose `editCluster` too — there is precedent — but it remains inconsistent with the broader CRUD vocabulary. Tracked here as a discrepancy worth raising upstream. |
| M-02  | `MavenLibrary.exclusions` (JSDoc says "List of dependences to exclude") | Low | Typo in the JSDoc ("dependences"); not a name issue per se. |
| M-03  | `parseResponse` (utils)             | Low      | Parses **JSON** specifically — `parseJsonResponse` would be more accurate. |

### 2.7 Overly verbose / Redundant suffixes — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| O-01  | `policyFamilyDefinitionOverrides`   | Medium   | Five-word camel-case identifier. Inherited from the API; very long but no shorter form is unambiguous. Accept as upstream constraint. |
| O-02  | `createdAtTimestamp`                | High     | "Timestamp" is redundant — `createdAt` is the universal convention for epoch-millisecond fields (and the JSDoc says "in millisecond"). `createdAtTimestamp` is a tautology (`*-At` already implies a time value). |
| O-03  | `creatorUserName`                   | Medium   | Three words for "creator". `creator` alone would suffice if the value is a username; `createdBy` is the convention used elsewhere in the Databricks SDK. |
| O-04  | `unmarshalCreatePolicy_ResponseSchema` | Medium | The pattern `unmarshal<Type>Schema` triple-states intent ("schema for unmarshalling X"). The repo-wide convention probably can't change here, but each constant runs ~38 chars. |
| O-05  | `PACKAGE_SEGMENT` (`client.ts`)     | Low      | OK in context. |
| O-06  | `Policy.maxClustersPerUser`         | Low      | Long but precise. |

### 2.8 Singular / plural mismatches — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| P-01  | `ListPolicies` (request) vs `listPolicies()` (method) | Low | The request type is plural to match the API verb; the method matches. Consistent. |
| P-02  | `ListPolicies_Response.policies`    | Low      | Plural field for an array — correct. |
| P-03  | `MavenLibrary.exclusions`           | Low      | Plural for array — correct. |

### 2.9 Reserved-word collisions — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| R-01  | `PythonPyPiLibrary.package`         | Medium   | `package` is a [reserved word in strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#future_reserved_words) for ES5+. It is legal as a property name but can't be used as a variable or import identifier without quoting. Consider `packageName` for forward compatibility. |
| R-02  | `RCranLibrary.package`              | Medium   | Same as R-01. |
| R-03  | None of the type names collide.     | —        | OK. |

### 2.10 Empty / trivial wrapper types — Medium

_None._

### 2.11 Duplicate concepts — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| D-01  | `CreatePolicy` vs `EditPolicy`      | Medium   | The two request types are byte-identical except `EditPolicy` adds `policyId`. Could share a base type. Codegen constraint, but readers see two near-duplicate 7-field interfaces. |
| D-02  | `Policy` vs `CreatePolicy` vs `EditPolicy` | Medium | Same body fields duplicated three times (with the entity adding `creatorUserName`, `createdAtTimestamp`, `isDefault`). Tooling could share a base. |
| D-03  | `definition` and `policyFamilyDefinitionOverrides` | Low | Distinct concepts (full definition vs. override deltas), but the names alone don't communicate "two mutually exclusive ways of supplying a definition". The JSDoc explains the relationship; OK. |

### 2.12 Verb-tense inconsistency — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| T-01  | `createPolicy`, `deletePolicy`, `editPolicy`, `getPolicy`, `listPolicies` | Low | All imperative present-tense — consistent. |
| T-02  | `createdAtTimestamp` (past participle) | Low | Correct for a timestamp field. |
| T-03  | `isDefault` (boolean) | Low | Standard `is*` boolean prefix. Consistent with the rest of the SDK. |

### 2.13 Go / Java-style names — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| G-01  | `CreatePolicy_Response` (proto nested-message style) | High | This is a direct port of Go's `pb.CreatePolicyResponse` / protobuf naming. TypeScript ecosystems do not use `_` separators between message and nested-message names; the codebase even disables ESLint for each occurrence. Should adopt the TS-idiomatic `CreatePolicyResponse`. |
| G-02  | `unmarshalXxxSchema` / `marshalXxxSchema` | Medium | "Marshal/unmarshal" is the Go (and gRPC) verb pair. JS/TS code overwhelmingly uses **serialize / deserialize** (or **parse / stringify**). New TS readers will look up "marshal" before they recognise it. Repo-wide convention; flagged once per package. |
| G-03  | `MavenLibrary`, `PythonPyPiLibrary`, `RCranLibrary` (suffix `Library` repeated) | Low | Java-style "TypeNameTypeSuffix" pattern. See § 2.20 for the type-suffix tautology angle. |
| G-04  | `httpClient`, `HttpClient` (vs `HTTPClient`) | Low | Google TS style uses `Http` (lowercased acronym) — consistent. |

### 2.14 Generic field names losing meaning — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| F-01  | `Library.lib`                       | High     | Loses all meaning once destructured outside the `Library` type. See V-01. |
| F-02  | `MavenLibrary.repo` / `RCranLibrary.repo` / `PythonPyPiLibrary.repo` | Medium | Same field name across three sibling types but each refers to a different concept (Maven repo URL, CRAN mirror, PyPI index URL). Consistent for the API, but ambiguous when displayed without parent type context. |
| F-03  | `Policy.name`, `Policy.description` | Low      | Standard entity fields; meaning preserved in context. |
| F-04  | `MavenLibrary.coordinates`          | Low      | Maven-specific; precise. |
| F-05  | `httpReq`, `respBody`, `params` (locals in `client.ts`) | Low | Locals only. |

### 2.15 Field contradicting type domain — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| C-01  | None observed.                      | —        | All fields are domain-appropriate for the cluster-policy context. |

### 2.16 Inconsistent action verbs — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| AV-01 | `editPolicy()` vs ecosystem-standard `update` | Medium | Most modern Databricks APIs (and broader REST APIs) use **update**. This package uses **edit** to match the API path `/api/2.0/policies/clusters/edit`. The verb mismatch within the Databricks SDK as a whole (e.g. `Clusters.editCluster` exists, but newer surfaces use `update*`) is upstream. Flagged for awareness. |
| AV-02 | `getPolicy()` (singular) vs `listPolicies()` (plural)  | Low | Correct convention (singular get, plural list). Consistent. |

### 2.17 Long enum values — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| L-01  | `PolicySortColumn.POLICY_CREATION_TIME` | Medium | 21-char identifier. Combined with the enum-prefix redundancy (E-01), `PolicySortColumn.CREATION_TIME` would be 14 chars and lose nothing. |
| L-02  | `PolicySortColumn.POLICY_NAME`      | Low      | Only redundancy, not length per se. |

### 2.18 Underspecified IDs — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| I-01  | `policyId`                          | Low      | Well-specified: scope = policy. No collision with workspace / account / cluster IDs in this package. Good. |
| I-02  | `policyFamilyId`                    | Low      | Scoped correctly. Good. |

(Section retained for parity with the rubric; no high findings in this package.)

### 2.19 Type-suffix tautology — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| TS-01 | `MavenLibrary`                      | Medium   | The type already lives in a `Library` discriminated union; the `Library` suffix is redundant when accessed as `library.lib.$case === 'maven' ? library.lib.maven : ...` — the value's *position* in the union already identifies it as a library variant. `MavenSpec` or just `Maven` would suffice. |
| TS-02 | `PythonPyPiLibrary`                 | Medium   | Same as TS-01. Could be `PyPISpec`. |
| TS-03 | `RCranLibrary`                      | Medium   | Same as TS-01. Could be `CRANSpec`. |
| TS-04 | `Library` (interface itself)        | Low      | The interface name `Library` and its sole field `lib` share a stem, so call sites read as `library.lib` (a stem repetition). Field rename is covered by V-01 / F-01. |

### 2.20 Other observations

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| X-01  | `Policy.createdAtTimestamp` (epoch ms, `number`) | Medium | Beyond redundancy (O-02), JS `Date` has a 53-bit safe-integer range that covers epoch-ms until year 285,000+, but a TS SDK conventionally exposes either `Date`, `string` (ISO-8601), or `bigint`. `number` is acceptable for ms timestamps; flagged. |
| X-02  | `Library.lib.$case` literal `'requirements'` | Low | The discriminator value `'requirements'` is the longest in the union (12 chars) and contrasts with three-letter peers (`jar`, `egg`, `whl`). Consistent with wire format, OK. |
| X-03  | `HttpCallOptions` (utils)           | Low      | Local interface; precise. |
| X-04  | `executeHttpCall`, `executeCall`    | Low      | Both exist, one wraps the other. The naming difference (`HttpCall` vs `Call`) communicates layering: HTTP-aware vs. transport-agnostic. OK. |
| X-05  | `marshalRequest` (utils)            | Low      | Generic for "marshal arbitrary request body". OK in context. |
| X-06  | `readAll` (utils, private)          | Low      | Reads a `ReadableStream` to a `Uint8Array`. Standard name. |
| X-07  | `flattenQueryParams` (utils, exported but unused in this package?) | Low | Exported but `client.ts` builds query strings manually with `URLSearchParams.append`. Either remove or use it. Not strictly a naming issue. |

---

## 3. Summary

### 3.1 Findings by severity

| Severity | Count |
| -------- | ----- |
| High     | 11    |
| Medium   | 21    |
| Low      | 25    |
| **Total**| **57**|

### 3.2 Top themes

1. **Proto-style `_Response` suffix pollutes every CRUD response type.**
   Five interfaces (`CreatePolicy_Response`, `DeletePolicy_Response`,
   `EditPolicy_Response`, `ListPolicies_Response`, plus the schema constants)
   each require an `eslint-disable` for the naming-convention rule. Renaming
   to TS-idiomatic `CreatePolicyResponse` etc. would eliminate ~9
   disable-comments and a Google-style violation in one sweep.

2. **`Library.lib` repeats the type stem in its discriminator field.**
   Callers write `library.lib?.$case` — `lib` adds no information the type
   name doesn't. A concrete name like `source` / `kind` / `spec` reads
   better at call sites.

3. **`PolicySortColumn.POLICY_*` repeats the enum prefix**; trimming to
   `CREATION_TIME` / `NAME` shortens call sites and matches enum-design
   guidance.

4. **`PyPi` casing should be `PyPI`** (acronym), and `package` fields collide
   with a JS strict-mode reserved word in `PythonPyPiLibrary` / `RCranLibrary`.

5. **`createdAtTimestamp` is a tautology**; `createdAt` is the SDK-wide and
   ecosystem-wide convention for epoch-millisecond fields.

### 3.3 Suggested quick wins (non-breaking renames are not possible — this
section is advisory for the codegen owners)

- Drop `_Response` suffix in all four response interfaces.
- Rename `Library.lib` -> `Library.source` (concrete discriminator name).
- Trim `PolicySortColumn` members.
- `PythonPyPiLibrary` -> `PythonPyPILibrary`.
- `Policy.createdAtTimestamp` -> `Policy.createdAt`.
- `Policy.creatorUserName` -> `Policy.createdBy`.

### 3.4 Cross-package consistency notes

- The `marshal*` / `unmarshal*` schema-naming convention is consistent with
  peer packages (e.g. `clusters`, `clusterlibraries`) and is therefore a
  repo-wide concern, not a per-package fix.
- The `Proto-style nested message name` `_Response` suffix is consistent
  with peers and should be addressed at the codegen level.
- `editPolicy` (vs `updatePolicy`) is a per-API decision driven by the
  upstream REST verb; flag for upstream alignment but no per-package fix.
