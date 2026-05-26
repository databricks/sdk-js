# Naming Audit: `clusterpolicies` (v2)

**Package:** `@databricks/sdk-clusterpolicies`
**Path:** `/home/parth.bansal/sdk-js/packages/clusterpolicies/`
**Version audited:** `v2`
**Files audited:**

- `src/v2/model.ts`
- `src/v2/client.ts`
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

| Name                            | Purpose                                       |
| ------------------------------- | --------------------------------------------- |
| `CreatePolicyRequest`           | Request body for create.                      |
| `CreatePolicyRequest_Response`  | Response from create (proto-style suffix).    |
| `DeletePolicyRequest`           | Request body for delete.                      |
| `DeletePolicyRequest_Response`  | Empty response from delete.                   |
| `EditPolicyRequest`             | Request body for update/edit.                 |
| `EditPolicyRequest_Response`    | Empty response from edit.                     |
| `GetPolicyRequest`              | Request body for get.                         |
| `Library`                       | Discriminated-union wrapper around `lib`.     |
| `ListPoliciesRequest`           | Request body for list.                        |
| `ListPoliciesRequest_Response`  | Response from list.                           |
| `MavenLibrary`                  | Maven coordinates payload.                    |
| `Policy`                        | The cluster-policy entity.                    |
| `PythonPyPiLibrary`             | PyPI package payload.                         |
| `RCranLibrary`                  | CRAN R package payload.                       |

### 1.3 Fields (entity / request / response — combined catalog)

| Type                              | Field                              | Type / Notes                  |
| --------------------------------- | ---------------------------------- | ----------------------------- |
| `CreatePolicyRequest`             | `name`                             | `string?`                     |
| `CreatePolicyRequest`             | `definition`                       | `string?`                     |
| `CreatePolicyRequest`             | `description`                      | `string?`                     |
| `CreatePolicyRequest`             | `policyFamilyId`                   | `string?`                     |
| `CreatePolicyRequest`             | `policyFamilyDefinitionOverrides`  | `string?`                     |
| `CreatePolicyRequest`             | `maxClustersPerUser`               | `number?`                     |
| `CreatePolicyRequest`             | `libraries`                        | `Library[]?`                  |
| `CreatePolicyRequest_Response`    | `policyId`                         | `string?`                     |
| `DeletePolicyRequest`             | `policyId`                         | `string?`                     |
| `EditPolicyRequest`               | `policyId`                         | `string?`                     |
| `EditPolicyRequest`               | `name` … `libraries`               | (same shape as `CreatePolicyRequest`) |
| `GetPolicyRequest`                | `policyId`                         | `string?`                     |
| `Library`                         | `lib`                              | discriminated union           |
| `Library.lib.$case`               | `jar`/`egg`/`pypi`/`maven`/`cran`/`whl`/`requirements` | union tag |
| `ListPoliciesRequest`             | `sortOrder`                        | `ListOrder?`                  |
| `ListPoliciesRequest`             | `sortColumn`                       | `PolicySortColumn?`           |
| `ListPoliciesRequest_Response`    | `policies`                         | `Policy[]?`                   |
| `MavenLibrary`                    | `coordinates`                      | `string?`                     |
| `MavenLibrary`                    | `repo`                             | `string?`                     |
| `MavenLibrary`                    | `exclusions`                       | `string[]?`                   |
| `Policy`                          | `policyId`                         | `string?`                     |
| `Policy`                          | `creatorUserName`                  | `string?`                     |
| `Policy`                          | `createdAtTimestamp`               | `number?`                     |
| `Policy`                          | `isDefault`                        | `boolean?`                    |
| `Policy`                          | `name`                             | `string?`                     |
| `Policy`                          | `definition`                       | `string?`                     |
| `Policy`                          | `description`                      | `string?`                     |
| `Policy`                          | `policyFamilyId`                   | `string?`                     |
| `Policy`                          | `policyFamilyDefinitionOverrides`  | `string?`                     |
| `Policy`                          | `maxClustersPerUser`               | `number?`                     |
| `Policy`                          | `libraries`                        | `Library[]?`                  |
| `PythonPyPiLibrary`               | `package`                          | `string?` (reserved word)     |
| `PythonPyPiLibrary`               | `repo`                             | `string?`                     |
| `RCranLibrary`                    | `package`                          | `string?` (reserved word)     |
| `RCranLibrary`                    | `repo`                             | `string?`                     |

### 1.4 Methods (`client.ts`)

| Method          | Verb | Returns                         |
| --------------- | ---- | ------------------------------- |
| `createPolicy`  | POST | `CreatePolicyRequest_Response`  |
| `deletePolicy`  | POST | `DeletePolicyRequest_Response`  |
| `editPolicy`    | POST | `EditPolicyRequest_Response`    |
| `getPolicy`     | GET  | `Policy`                        |
| `listPolicies`  | GET  | `ListPoliciesRequest_Response`  |

### 1.5 Other identifiers

- `client.ts`: `Client` class (public, top-level export).

---

## 2. Findings by Category

### 2.1 Vague / generic names — High & Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| V-01  | `Policy.description` (`model.ts:228`), `CreatePolicyRequest.description` (`model.ts:26`), `EditPolicyRequest.description` (`model.ts:74`) | Low | Generic but standard across the SDK; acceptable. |

### 2.2 Redundant enum prefixes

_None._

### 2.3 Acronym casing inconsistencies — High

| ID    | Symbol                | Severity | Issue |
| ----- | --------------------- | -------- | ----- |
| A-01  | `PythonPyPiLibrary` (`model.ts:251`) | High | "PyPI" is a proper acronym (Python Package Index). The chosen casing `PyPi` is non-standard — official sources write **PyPI** (see https://pypi.org/ and PEP 541). Should be `PythonPyPILibrary`. |
| A-02  | `RCranLibrary` (`model.ts:264`) | Medium | "CRAN" is an acronym ("Comprehensive R Archive Network"). The type uses `Cran` (PascalCase) which is acceptable under Google TS style (acronyms ≥3 chars → only first letter capitalised). However, the JSDoc and surrounding usage refers to "CRAN library". Consistent with the rule but worth noting — peer types like `PolicySortColumn` keep full uppercase in member names. Leave as-is for Google style compliance. |

### 2.4 Underscores in TS identifiers

_None._

### 2.5 Cryptic abbreviations — Medium

| ID    | Symbol                  | Severity | Issue |
| ----- | ----------------------- | -------- | ----- |
| C-01  | `MavenLibrary.exclusions` (`model.ts:201`) | Low | Maven term, OK in context. |

### 2.6 Misleading names — High

_None._

### 2.7 Overly verbose / Redundant suffixes — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| O-01  | `Policy.maxClustersPerUser` (`model.ts:246`) | Low | Long but precise. |

### 2.8 Singular / plural mismatches — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| P-01  | `ListPoliciesRequest` (`model.ts:166`) vs `listPolicies()` (`client.ts:190`) | Low | The request type is plural to match the API verb; the method matches. Consistent. |
| P-02  | `ListPoliciesRequest_Response.policies` (`model.ts:183`) | Low | Plural field for an array — correct. |
| P-03  | `MavenLibrary.exclusions` (`model.ts:201`) | Low | Plural for array — correct. |

### 2.9 Reserved-word collisions — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| R-01  | None of the type names collide.     | —        | OK. |

### 2.10 Empty / trivial wrapper types — Medium

_None._

### 2.11 Duplicate concepts — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| D-01  | `CreatePolicyRequest` (`model.ts:17`) vs `EditPolicyRequest` (`model.ts:63`) | Medium | The two request types are byte-identical except `EditPolicyRequest` adds `policyId`. Could share a base type. Codegen constraint, but readers see two near-duplicate 7-field interfaces. |
| D-02  | `Policy` (`model.ts:205`) vs `CreatePolicyRequest` (`model.ts:17`) vs `EditPolicyRequest` (`model.ts:63`) | Medium | Same body fields duplicated three times (with the entity adding `creatorUserName`, `createdAtTimestamp`, `isDefault`). Tooling could share a base. |
| D-03  | `definition` and `policyFamilyDefinitionOverrides` (`model.ts:24, 42`, `model.ts:72, 90`, `model.ts:226, 244`) | Low | Distinct concepts (full definition vs. override deltas), but the names alone don't communicate "two mutually exclusive ways of supplying a definition". The JSDoc explains the relationship; OK. |

### 2.12 Verb-tense inconsistency — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| T-01  | `createPolicy`, `deletePolicy`, `editPolicy`, `getPolicy`, `listPolicies` (`client.ts`) | Low | All imperative present-tense — consistent. |
| T-02  | `createdAtTimestamp` (`model.ts:214`) | Low | Past participle, correct for a timestamp field. |
| T-03  | `isDefault` (`model.ts:219`) | Low | Standard `is*` boolean prefix. Consistent with the rest of the SDK. |

### 2.13 Go / Java-style names — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| G-01  | `MavenLibrary` (`model.ts:187`), `PythonPyPiLibrary` (`model.ts:251`), `RCranLibrary` (`model.ts:264`) (suffix `Library` repeated) | Low | Java-style "TypeNameTypeSuffix" pattern. See § 2.19 for the type-suffix tautology angle. |

### 2.14 Generic field names losing meaning — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| F-01  | `Policy.name` (`model.ts:224`), `Policy.description` (`model.ts:228`) | Low | Standard entity fields; meaning preserved in context. |
| F-02  | `MavenLibrary.coordinates` (`model.ts:189`) | Low | Maven-specific; precise. |

### 2.15 Field contradicting type domain — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| C-01  | None observed.                      | —        | All fields are domain-appropriate for the cluster-policy context. |

### 2.16 Inconsistent action verbs — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| AV-01 | `getPolicy()` (`client.ts:159`, singular) vs `listPolicies()` (`client.ts:190`, plural) | Low | Correct convention (singular get, plural list). Consistent. |

### 2.17 Long enum values

_None._

### 2.18 Underspecified IDs — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| I-01  | `policyId` (`model.ts:52, 57, 65, 102, 207`) | Low | Well-specified: scope = policy. No collision with workspace / account / cluster IDs in this package. Good. |
| I-02  | `policyFamilyId` (`model.ts:34, 82, 236`) | Low | Scoped correctly. Good. |

(Section retained for parity with the rubric; no high findings in this package.)

### 2.19 Type-suffix tautology — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| TS-01 | `MavenLibrary` (`model.ts:187`) | Medium | The type already lives in a `Library` discriminated union; the `Library` suffix is redundant when accessed as `library.lib.$case === 'maven' ? library.lib.maven : ...` — the value's *position* in the union already identifies it as a library variant. `MavenSpec` or just `Maven` would suffice. |
| TS-02 | `PythonPyPiLibrary` (`model.ts:251`) | Medium | Same as TS-01. Could be `PyPISpec`. |
| TS-03 | `RCranLibrary` (`model.ts:264`) | Medium | Same as TS-01. Could be `CRANSpec`. |

### 2.20 Other observations

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| X-01  | `Policy.createdAtTimestamp` (`model.ts:214`, epoch ms, `number`) | Medium | JS `Date` has a 53-bit safe-integer range that covers epoch-ms until year 285,000+, but a TS SDK conventionally exposes either `Date`, `string` (ISO-8601), or `bigint`. `number` is acceptable for ms timestamps; flagged. |

### 2.21 Proto / architectural-leak naming

_None._ Scanned all identifiers in `model.ts`, `client.ts`, and
`index.ts` for mid-position `Public`/`Internal`/`External` (non-domain),
`Proto` suffix/infix, `Service`/`Server`/`Backend`/`Frontend`, `Rpc`/`Grpc`,
`Manager`/`Handler`/`Controller`/`Processor`/`Daemon`/`Worker` (non-domain),
`Impl`, `Proxy` (non-real), `Action`/`Op` mid duplicating a verb,
`Wrapper`/`Adapter`, `Old`/`New`/`Legacy`/`Modern`, `V1`/`V2` mid,
`Api`/`Sdk`/`Client` mid, repeated `Spec`/`Config`/`Details`/`Info`, and
`Foo_PublicRequest` shapes. No matches: the only `Client` is the top-level
exported class (terminal position, standard SDK convention), and there are no
architectural-layer words leaking into domain identifiers.

---

## 3. Summary

### 3.1 Findings by severity

| Severity | Count |
| -------- | ----- |
| High     | 1     |
| Medium   | 7     |
| Low      | 16    |
| **Total**| **24**|

### 3.2 Top themes

1. **`PyPi` casing should be `PyPI`** (acronym); the type name
   `PythonPyPiLibrary` should be `PythonPyPILibrary`.

2. **Type-suffix tautology in the `Library` union**: `MavenLibrary`,
   `PythonPyPiLibrary`, `RCranLibrary` all repeat the `Library` suffix even
   though their *position* in the discriminated union already identifies
   them as library variants.

### 3.3 Suggested quick wins (non-breaking renames are not possible — this
section is advisory for the codegen owners)

- `PythonPyPiLibrary` -> `PythonPyPILibrary`.

### 3.4 Cross-package consistency notes

_None._
