# Naming Audit: `instanceprofiles` (v2)

**Package:** `@databricks/sdk-instanceprofiles`
**Path:** `/home/parth.bansal/sdk-js/packages/instanceprofiles/`
**Version audited:** `v2`
**Files audited:**

- `src/v2/model.ts`
- `src/v2/client.ts`
- `src/v2/utils.ts`
- `src/v2/index.ts`

---

## 1. Findings by Category

### 1.1 Vague / generic names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| V-01  | `InstanceProfile` (interface, `model.ts:64`) | High     | The unqualified name reads as a general "instance profile" concept, but the type is **AWS-specific** (an AWS IAM Instance Profile, see https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html). The Databricks SDK supports multiple clouds (AWS, Azure, GCP) — peers in this SDK (e.g. `AzureServicePrincipal`, `GcpAttributes`) lead with the cloud prefix. `AwsInstanceProfile` would prevent collision with future Azure/GCP "instance" abstractions and align with the cloud-prefixed naming in `compute`, `clusters`, etc. Inherited from the API; flagged for visibility. |

### 1.2 Underscores in TS identifiers — Low

| ID    | Symbol                                          | Severity | Issue |
| ----- | ----------------------------------------------- | -------- | ----- |
| U-01  | Wire-format snake-case in zod schemas (`instance_profile_arn`, `is_meta_instance_profile`, `iam_role_arn`, `instance_profiles`, `skip_validation`) | Low | Underscores in *string literals* are correct — they match the JSON wire format. Not a violation. Noted for completeness. |

### 1.3 Cryptic abbreviations — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| C-01  | `arn` (within `instanceProfileArn`, `iamRoleArn`) | Low | "ARN" is a well-known AWS acronym; not cryptic in the AWS context. Acceptable. |
| C-02  | `iam` (within `iamRoleArn`)         | Low      | "IAM" = AWS Identity & Access Management. Well-known AWS acronym. Acceptable. |

### 1.4 Misleading names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| M-01  | `AddInstanceProfileRequest` / `addInstanceProfile()` (`model.ts:5`, `client.ts:79`) | High | "Add" is ambiguous between "create a new resource" and "register an existing resource". The JSDoc clarifies this method **registers** an existing AWS instance profile (it does **not** create one in AWS). `registerInstanceProfile` would be more accurate and would pair semantically with `removeInstanceProfile` (where "remove" actually means "unregister"). The current naming implies CRUD-create semantics that aren't true — the AWS resource exists independent of this call. |
| M-02  | `RemoveInstanceProfileRequest` / `removeInstanceProfile()` (`model.ts:94`, `client.ts:193`) | High | Same domain mismatch as M-01: the method **unregisters** the instance profile from Databricks (the AWS resource is untouched). The JSDoc even notes "Existing clusters with this instance profile will continue to function." `unregisterInstanceProfile` would be more accurate. |
| M-03  | `EditInstanceProfileRequest` / `editInstanceProfile()` (`model.ts:39`, `client.ts:121`) | Medium | "Edit" is a non-standard CRUD verb (the standard is "update"). Other Databricks SDK surfaces use `update*` for the same operation. Matches the wire path `/edit`, so this is a per-API upstream decision. |

### 1.5 Singular / plural mismatches — Low

| ID    | Symbol                                              | Severity | Issue |
| ----- | --------------------------------------------------- | -------- | ----- |
| P-01  | `ListInstanceProfilesRequest` (plural) vs `listInstanceProfiles()` (plural) | Low | Consistent. |
| P-02  | `ListInstanceProfilesResponse.instanceProfiles` | Low      | Plural field for an array — correct. |
| P-03  | `InstanceProfile` (singular entity) vs `instanceProfiles` (plural array) | Low | Correct pluralisation throughout. |
| P-04  | `AddInstanceProfileRequest` / `EditInstanceProfileRequest` / `RemoveInstanceProfileRequest` (all singular) | Low | Correct — single-entity operations. |

### 1.6 Verb-tense inconsistency — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| T-01  | `addInstanceProfile`, `editInstanceProfile`, `listInstanceProfiles`, `removeInstanceProfile` | Low | All imperative present-tense — consistent. |
| T-02  | `isMetaInstanceProfile` (boolean) | Low | Standard `is*` boolean prefix. |
| T-03  | `skipValidation` (boolean)        | Low | Imperative — consistent boolean style. |

### 1.7 Go / Java-style names — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| G-01  | `RemoveInstanceProfileRequest`     | Low | Pairs with `addInstanceProfile`. The "add/remove" pair is idiomatic in many languages; OK. |

### 1.8 Generic field names losing meaning — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| F-01  | `instanceProfileArn`, `iamRoleArn`  | Low      | Well-qualified; meaning preserved out of context. Good. |
| F-02  | `instanceProfiles` (in `ListInstanceProfilesResponse`) | Low | Self-describing. Good. |

### 1.9 Field contradicting type domain — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| FD-01 | `InstanceProfile.iamRoleArn` (`model.ts:83`) | Medium   | "IAM role" is a related-but-distinct AWS concept from "instance profile". An instance profile *contains* a role, but the role itself is a separate AWS resource. The field is conditionally required (JSDoc says "required if your role name and instance profile name do not match and you want to use the instance profile with Databricks SQL Serverless"). Mixing two AWS resource ARNs in one entity is the API design; flagged. |
| FD-02 | `AddInstanceProfileRequest.skipValidation` | Low      | A request-only behaviour flag in a "domain entity"-shaped request. Acceptable for an "add"/"create" request type. |
| FD-03 | `RemoveInstanceProfileRequest.instanceProfileArn` | Low | Identifier-only payload for delete — appropriate. |

### 1.10 Inconsistent action verbs — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| AV-01 | `addInstanceProfile` + `removeInstanceProfile` (pair) | Medium | The verbs `add` + `remove` form a natural pair and match the API wire paths (`/add`, `/remove`). Acceptable. |
| AV-02 | `editInstanceProfile` (verb mismatch with `add` / `remove`) | High | The CRUD verbs in this package are `add`, `edit`, `remove` — three different verb families (`add`/`remove` ↔ pair; `edit` ↔ standalone, no `add`/`edit`/`delete` triplet, no `create`/`update`/`delete` triplet). Inconsistent. Most modern Databricks APIs (and broader REST APIs) use **update**. Matches the wire path `/edit`, so this is a per-API upstream decision. |
| AV-03 | `addInstanceProfile` (vs `createInstanceProfile`) | High | "Add" suggests adding to an existing collection (e.g. registering); "create" suggests minting a new AWS resource. The method **registers an existing AWS instance profile with Databricks** — neither verb is perfectly accurate, but `register*` would be most precise. See M-01. |
| AV-04 | `removeInstanceProfile` (vs `deleteInstanceProfile` / `unregisterInstanceProfile`) | High | Same observation as AV-03. The method un-registers, not deletes. `unregisterInstanceProfile` would be most precise. See M-02. |
| AV-05 | `listInstanceProfiles` (vs `getInstanceProfiles`) | Low | Correct: `list*` for plural retrieval, `get*` for singular. Consistent. |

### 1.11 Underspecified IDs — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| I-01  | `instanceProfileArn`                | Low      | Well-specified: identifier scope (instance profile), identifier type (AWS ARN). Good — far clearer than a bare `id` or `name` would be. |
| I-02  | `iamRoleArn`                        | Low      | Well-specified: scope (IAM role), type (ARN). Good. |
| I-03  | Absence of `instanceProfileId`      | Low      | The package uses ARN as the sole identifier — there is no separate "ID" concept. Good (no ambiguity between `id` and `arn`). |

---

## 2. Summary

### 2.1 Findings by severity

| Severity | Count |
| -------- | ----- |
| High     | 6     |
| Medium   | 3     |
| Low      | 19    |
| Observation | 0  |
| **Total**| **28**|
