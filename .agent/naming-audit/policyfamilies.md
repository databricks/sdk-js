# Naming Audit: `policyfamilies` (v2)

**Package:** `@databricks/sdk-policyfamilies`
**Path:** `/home/parth.bansal/sdk-js/packages/policyfamilies/`
**Version audited:** `v2`
**Files audited:**

- `src/v2/model.ts`
- `src/v2/client.ts`
- `src/v2/utils.ts`
- `src/v2/index.ts`

---

## 1. Findings by Category

### 1.1 Singular / plural mismatches — Low

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| P-01  | `getPolicyFamily()` (singular)                       | Low      | Singular for a single-resource GET. Correct. |
| P-02  | `listPolicyFamilies()` (plural method)               | Low      | Plural for a collection endpoint. Correct. |
| P-03  | `ListPolicyFamiliesRequest` request type vs `listPolicyFamilies` method | Low | Both plural and matched. Correct. |
| P-04  | Package directory `policyfamilies` (lowercase)       | Low      | The npm package is `@databricks/sdk-policyfamilies` (lowercase, no separator). Compare with `clusterpolicies`, `clusterlibraries`, `instancepools`. Convention is consistent across this codebase — squashed lowercase. The directory and package name use plural ("families") which matches the dominant resource the package exposes. Acceptable but visually awkward (`policyfamilies` is hard to parse versus `policy-families`); a hyphenated path / scoped suffix would be more readable. (Pattern is repo-wide; flagged once.) |
| P-05  | `PolicyFamily` (entity, singular) vs `policyfamilies` (package directory, plural) | Low | Standard pattern — the package is plural, the entity it contains is singular. OK. |

### 1.2 Verb-tense inconsistency — Low

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| T-01  | `getPolicyFamily`, `listPolicyFamilies`              | Low      | Both imperative present-tense — consistent. |

### 1.3 Inconsistent action verbs — Low

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| AV-01 | `getPolicyFamily()` (singular get) vs `listPolicyFamilies()` (plural list) | Low | Correct convention: singular `get` for one-resource, plural `list` for many. Consistent. |
| AV-02 | The package exposes only **read** verbs — `get`, `list`. There are no `create` / `update` / `delete` methods (the API is read-only). The verb set is consistent with the API's read-only nature. | Low | OK. |

### 1.4 Type-suffix tautology — Low

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| TS-01 | `PolicyFamily` — does the `Family` suffix double up with `Policy`? | Low | `PolicyFamily` is the domain term used in the Databricks docs (cf. https://docs.databricks.com/en/admin/clusters/policy-families.html). The "Family" here means *grouping/template*, not a `*Family` type-suffix tautology. OK. |
| TS-02 | `GetPolicyFamilyRequest`, `ListPolicyFamiliesRequest` — all carry the resource noun | Low | Standard request/response naming; the resource noun is essential for disambiguation across the SDK. OK. |

### 1.5 Other observations

| ID    | Symbol                                               | Severity | Issue |
| ----- | ---------------------------------------------------- | -------- | ----- |
| X-01  | The package directory `policyfamilies/` is squashed lowercase | Low | Cross-codebase pattern; cf. P-04. The package name choice influences method placement (a future `databricks.policyFamilies.get(...)` aggregator should keep the same casing). |

---

## 2. Summary

### 2.1 Findings by severity

| Severity | Count |
| -------- | ----- |
| High     | 0     |
| Medium   | 0     |
| Low      | 11    |
| **Total**| **11**|

### 2.2 Top themes

1. **Read-only API ⇒ minimal naming surface.** With only two endpoints
   (`getPolicyFamily`, `listPolicyFamilies`) and one entity (`PolicyFamily`),
   the package introduces almost no domain-specific naming. After the
   regeneration flattened the response type, only Low-severity nits remain.

### 2.3 Suggested quick wins

_None. All remaining findings are Low-severity observations._
