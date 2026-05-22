# Naming Audit: `instanceprofiles` (v2)

**Package:** `@databricks/sdk-instanceprofiles`
**Path:** `/home/parth.bansal/sdk-js/packages/instanceprofiles/`
**Version audited:** `v2`
**Files audited:**

- `src/v2/model.ts`
- `src/v2/client.ts`
- `src/v2/utils.ts`
- `src/v2/index.ts`

`InstanceProfile` is a specific AWS concept (an AWS IAM Instance Profile
encapsulates an IAM role that an EC2 instance can assume). This audit
catalogues every identifier (type, field, enum value, method, constant) in
the package and flags naming concerns against the 20-category rubric. Issues
are graded:

- **High** — actively misleading, ambiguous, or violates a TS rule.
- **Medium** — friction; verbose, redundant, or stylistically off.
- **Low** — nit / consistency observation; safe to ignore.

---

## 1. Inventory

### 1.1 Enums (`model.ts`)

| Name | Members |
| ---- | ------- |
| _(none)_ | _(no enums declared in this package)_ |

### 1.2 Interfaces (`model.ts`)

| Name                                       | Purpose                                                  |
| ------------------------------------------ | -------------------------------------------------------- |
| `AddInstanceProfileRequest`                | Request body for register/add.                           |
| `AddInstanceProfileRequest_Response`       | Empty response from add.                                 |
| `EditInstanceProfileRequest`               | Request body for edit/update.                            |
| `EditInstanceProfileRequest_Response`      | Empty response from edit.                                |
| `InstanceProfile`                          | The instance-profile entity (AWS-scoped).                |
| `ListInstanceProfilesRequest`              | Empty request body for list.                             |
| `ListInstanceProfilesRequest_Response`     | Response from list.                                      |
| `RemoveInstanceProfileRequest`             | Request body for unregister/remove.                      |
| `RemoveInstanceProfileRequest_Response`    | Empty response from remove.                              |

### 1.3 Fields (entity / request / response — combined catalog)

| Type                                       | Field                    | Type / Notes                          |
| ------------------------------------------ | ------------------------ | ------------------------------------- |
| `AddInstanceProfileRequest`                | `skipValidation`         | `boolean?`                            |
| `AddInstanceProfileRequest`                | `instanceProfileArn`     | `string?` (AWS ARN, marked required)  |
| `AddInstanceProfileRequest`                | `isMetaInstanceProfile`  | `boolean?`                            |
| `AddInstanceProfileRequest`                | `iamRoleArn`             | `string?` (AWS IAM role ARN)          |
| `AddInstanceProfileRequest_Response`       | _(no fields)_            | _(empty body)_                        |
| `EditInstanceProfileRequest`               | `instanceProfileArn`     | `string?` (AWS ARN, marked required)  |
| `EditInstanceProfileRequest`               | `isMetaInstanceProfile`  | `boolean?`                            |
| `EditInstanceProfileRequest`               | `iamRoleArn`             | `string?`                             |
| `EditInstanceProfileRequest_Response`      | _(no fields)_            | _(empty body)_                        |
| `InstanceProfile`                          | `instanceProfileArn`     | `string?` (AWS ARN, marked required)  |
| `InstanceProfile`                          | `isMetaInstanceProfile`  | `boolean?`                            |
| `InstanceProfile`                          | `iamRoleArn`             | `string?`                             |
| `ListInstanceProfilesRequest`              | _(no fields)_            | _(empty request)_                     |
| `ListInstanceProfilesRequest_Response`     | `instanceProfiles`       | `InstanceProfile[]?`                  |
| `RemoveInstanceProfileRequest`             | `instanceProfileArn`     | `string?` (ARN, marked required)      |
| `RemoveInstanceProfileRequest_Response`    | _(no fields)_            | _(empty body)_                        |

### 1.4 Methods (`client.ts`)

| Method                  | Verb | URL path                          | Returns                                       |
| ----------------------- | ---- | --------------------------------- | --------------------------------------------- |
| `addInstanceProfile`    | POST | `/api/2.0/instance-profiles/add`    | `AddInstanceProfileRequest_Response`        |
| `editInstanceProfile`   | POST | `/api/2.0/instance-profiles/edit`   | `EditInstanceProfileRequest_Response`       |
| `listInstanceProfiles`  | GET  | `/api/2.0/instance-profiles/list`   | `ListInstanceProfilesRequest_Response`      |
| `removeInstanceProfile` | POST | `/api/2.0/instance-profiles/remove` | `RemoveInstanceProfileRequest_Response`     |

### 1.5 Other identifiers

- `client.ts`: `PACKAGE_SEGMENT` constant; `Client` class with private fields
  `host`, `httpClient`, `logger`, `userAgent`.
- `utils.ts`: `HttpCallOptions` interface; functions `executeCall`,
  `readAll`, `executeHttpCall`, `buildHttpRequest`, `parseResponse`,
  `marshalRequest`, `flattenQueryParams`.

---

## 2. Findings by Category

### 2.1 Vague / generic names — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| V-01  | `InstanceProfile` (interface, `model.ts:64`) | High     | The unqualified name reads as a general "instance profile" concept, but the type is **AWS-specific** (an AWS IAM Instance Profile, see https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html). The Databricks SDK supports multiple clouds (AWS, Azure, GCP) — peers in this SDK (e.g. `AzureServicePrincipal`, `GcpAttributes`) lead with the cloud prefix. `AwsInstanceProfile` would prevent collision with future Azure/GCP "instance" abstractions and align with the cloud-prefixed naming in `compute`, `clusters`, etc. Inherited from the API; flagged for visibility. |
| V-02  | `AddInstanceProfileRequest.skipValidation` (`model.ts:14`) | Medium   | `skipValidation` is generic — *which* validation? Reading the JSDoc reveals it specifically skips the AWS `RunInstances` dry-run permission check. `skipIamValidation` or `skipPermissionDryRun` would self-document. |
| V-03  | `flattenQueryParams` (`utils.ts:123`) | Low      | Reasonable. |
| V-04  | `readAll` (`utils.ts:40`, private)  | Low      | Standard name for "read all bytes from a stream". OK. |

### 2.2 Redundant enum prefixes — N/A

| ID    | Symbol                  | Severity | Issue |
| ----- | ----------------------- | -------- | ----- |
| E-01  | _(no enums in package)_ | —        | Nothing to flag. |

### 2.3 Acronym casing inconsistencies — High

| ID    | Symbol                            | Severity | Issue |
| ----- | --------------------------------- | -------- | ----- |
| A-01  | `instanceProfileArn` (field)      | High     | "ARN" is the AWS acronym for Amazon Resource Name (https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html). Google TypeScript style says acronyms ≥3 chars take only the first letter capitalised (https://google.github.io/styleguide/tsguide.html#naming-style). `Arn` (capital A, lowercase r/n) is correct under Google style. Flagged only because the field uses the Google convention rather than uppercase `ARN`; both are defensible — keep as-is for Google style compliance. |
| A-02  | `iamRoleArn` (field)              | High     | Same as A-01. "IAM" (AWS Identity & Access Management) and "ARN" are acronyms; Google TS style lowercases all but the first letter. Currently `iamRoleArn` lowercases the entire `iam` prefix because it is the *first* word in the camel-cased identifier; that is consistent with the rule (the first letter would be lowercase even if the rule said full uppercase, since camelCase always starts lowercased). Defensible. |
| A-03  | `isMetaInstanceProfile`           | Low      | No acronym issues. |
| A-04  | `Aws` / `Iam` / `Arn` not appearing as type prefixes | Low | The package doesn't have a type-name acronym to test (e.g. no `AWSInstanceProfile`). If the type were renamed per V-01, the chosen casing should be `AwsInstanceProfile` to match Google TS style. |

### 2.4 Underscores in TS identifiers — Low

| ID    | Symbol                                          | Severity | Issue |
| ----- | ----------------------------------------------- | -------- | ----- |
| U-01  | Wire-format snake-case in zod schemas (`instance_profile_arn`, `is_meta_instance_profile`, `iam_role_arn`, `instance_profiles`, `skip_validation`) | Low | Underscores in *string literals* are correct — they match the JSON wire format. Not a violation. Noted for completeness. |

### 2.5 Cryptic abbreviations — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| C-01  | `arn` (within `instanceProfileArn`, `iamRoleArn`) | Low | "ARN" is a well-known AWS acronym; not cryptic in the AWS context. Acceptable. |
| C-02  | `iam` (within `iamRoleArn`)         | Low      | "IAM" = AWS Identity & Access Management. Well-known AWS acronym. Acceptable. |
| C-03  | `meta` (within `isMetaInstanceProfile`) | Medium | "Meta instance profile" is a Databricks-specific term not defined anywhere except the JSDoc ("contains an meta IAM role which could assume a wide range of roles"). The name doesn't make the concept self-evident. `isCredentialPassthrough` or `isAssumableMetaRole` would convey intent better. |
| C-04  | `req`, `resp`, `httpReq`, `respBody` (`client.ts` locals) | Low | Inside method scope; OK for short-lived locals but `request` / `response` would be clearer at no cost. |
| C-05  | `opts` (`utils.ts` parameter, `executeHttpCall`) | Low | Inside fn scope; minor. |
| C-06  | `pkgJson` (`client.ts:19`)          | Low      | Standard short name for `package.json` import. OK. |

### 2.6 Misleading names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| M-01  | `AddInstanceProfileRequest` / `addInstanceProfile()` (`model.ts:5`, `client.ts:77`) | High | "Add" is ambiguous between "create a new resource" and "register an existing resource". The JSDoc clarifies this method **registers** an existing AWS instance profile (it does **not** create one in AWS). `registerInstanceProfile` would be more accurate and would pair semantically with `removeInstanceProfile` (where "remove" actually means "unregister"). The current naming implies CRUD-create semantics that aren't true — the AWS resource exists independent of this call. |
| M-02  | `RemoveInstanceProfileRequest` / `removeInstanceProfile()` (`model.ts:95`, `client.ts:185`) | High | Same domain mismatch as M-01: the method **unregisters** the instance profile from Databricks (the AWS resource is untouched). The JSDoc even notes "Existing clusters with this instance profile will continue to function." `unregisterInstanceProfile` would be more accurate. |
| M-03  | `EditInstanceProfileRequest` / `editInstanceProfile()` (`model.ts:39`, `client.ts:119`) | Medium | "Edit" is a non-standard CRUD verb (the standard is "update"). Other Databricks SDK surfaces use `update*` for the same operation. Matches the wire path `/edit`, so this is a per-API upstream decision. |
| M-04  | `InstanceProfile.instanceProfileArn` (marked required, but `?: string \| undefined`, `model.ts:66`) | High | The JSDoc says "This field is required" but the TS type is `string \| undefined`. Across the SDK, every field is optional in the generated type; the doc note is informational. Not a name issue per se, but the type contradicts the documented contract. Flagged because the *name* implies it should always be populated, yet the type doesn't enforce it. |
| M-05  | `skipValidation` (`AddInstanceProfileRequest`, `model.ts:14`) | Medium | The name implies skipping *all* validation; the JSDoc clarifies it only skips the AWS dry-run permission check. See V-02. |
| M-06  | `isMetaInstanceProfile`             | Medium | The boolean's semantics ("for credential passthrough scenarios where the instance profile contains a meta-IAM role that can assume a wide range of roles") is much narrower than "is this a meta instance profile". Calling it `isCredentialPassthrough` or `isMetaIamRole` would describe the actual behaviour. |

### 2.7 Overly verbose / Redundant suffixes — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| O-01  | `instanceProfileArn` (in `InstanceProfile`, `model.ts:66`) | Medium | Inside a type already called `InstanceProfile`, prefixing the field with `instanceProfile` is redundant — `arn` alone (or `instanceProfileArn` only on request types, with `arn` on the entity) would suffice. Tautology pattern: `instanceProfile.instanceProfileArn`. |
| O-02  | `isMetaInstanceProfile` (in `InstanceProfile`, `model.ts:74`) | Medium | Same tautology: `instanceProfile.isMetaInstanceProfile`. `isMeta` alone (or `isMetaRole`) would suffice within the entity. |
| O-03  | `PACKAGE_SEGMENT` (`client.ts:41`)  | Low      | OK in context. |
| O-04  | `ListInstanceProfilesRequest_Response.instanceProfiles` (`model.ts:92`) | Medium | Inside `ListInstanceProfilesRequest_Response`, the field `instanceProfiles` re-states the type prefix. `items` or `profiles` would suffice. Per-API codegen output. |

### 2.8 Singular / plural mismatches — Low

| ID    | Symbol                                              | Severity | Issue |
| ----- | --------------------------------------------------- | -------- | ----- |
| P-01  | `ListInstanceProfilesRequest` (plural) vs `listInstanceProfiles()` (plural) | Low | Consistent. |
| P-02  | `ListInstanceProfilesRequest_Response.instanceProfiles` | Low      | Plural field for an array — correct. |
| P-03  | `InstanceProfile` (singular entity) vs `instanceProfiles` (plural array) | Low | Correct pluralisation throughout. |
| P-04  | `AddInstanceProfileRequest` / `EditInstanceProfileRequest` / `RemoveInstanceProfileRequest` (all singular) | Low | Correct — single-entity operations. |

### 2.9 Reserved-word collisions — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| R-01  | _(no collisions observed)_          | —        | No fields use reserved words (e.g. `package`, `class`, `enum`, `delete`). |

### 2.10 Empty / trivial wrapper types — N/A

_None._ Wrapper types (empty response interfaces, empty request structs,
and single-field wrappers) exist for forward compatibility: future API
revisions can add fields without breaking the type signature. Not flagged.

### 2.11 Duplicate concepts — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| D-01  | `InstanceProfile` vs `EditInstanceProfileRequest` vs `AddInstanceProfileRequest` (`model.ts:5`, `model.ts:39`, `model.ts:64`) | Medium | Three types with substantially overlapping field sets (`instanceProfileArn`, `isMetaInstanceProfile`, `iamRoleArn`). `EditInstanceProfileRequest` and `InstanceProfile` are byte-identical; `AddInstanceProfileRequest` adds only `skipValidation`. Could be expressed as a base type with extension. Codegen constraint; flagged for visibility. |
| D-02  | `instanceProfileArn` across all 4 request/entity types | Low | Same field, same semantics — duplication is expected for codegen output. OK. |
| D-03  | `iamRoleArn` across `InstanceProfile`, `AddInstanceProfileRequest`, `EditInstanceProfileRequest` | Low | Same observation as D-02. OK. |

### 2.12 Verb-tense inconsistency — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| T-01  | `addInstanceProfile`, `editInstanceProfile`, `listInstanceProfiles`, `removeInstanceProfile` | Low | All imperative present-tense — consistent. |
| T-02  | `isMetaInstanceProfile` (boolean) | Low | Standard `is*` boolean prefix. |
| T-03  | `skipValidation` (boolean)        | Low | Imperative — consistent boolean style. |

### 2.13 Go / Java-style names — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| G-01  | `RemoveInstanceProfileRequest`     | Low | Pairs with `addInstanceProfile`. The "add/remove" pair is idiomatic in many languages; OK. |

### 2.14 Generic field names losing meaning — Low

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| F-01  | `instanceProfileArn`, `iamRoleArn`  | Low      | Well-qualified; meaning preserved out of context. Good. |
| F-02  | `isMetaInstanceProfile`             | Medium   | Without the JSDoc, "meta instance profile" is a Databricks-internal term and conveys little. See C-03 / M-06. |
| F-03  | `skipValidation`                    | Medium   | Without the JSDoc, unclear which validation. See V-02. |
| F-04  | `instanceProfiles` (in `ListInstanceProfilesRequest_Response`) | Low | Self-describing. Good. |
| F-05  | `httpReq`, `respBody`, `body` (locals in `client.ts`) | Low | Locals only. |

### 2.15 Field contradicting type domain — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| FD-01 | `InstanceProfile.iamRoleArn` (`model.ts:83`) | Medium   | "IAM role" is a related-but-distinct AWS concept from "instance profile". An instance profile *contains* a role, but the role itself is a separate AWS resource. The field is conditionally required (JSDoc says "required if your role name and instance profile name do not match and you want to use the instance profile with Databricks SQL Serverless"). Mixing two AWS resource ARNs in one entity is the API design; flagged. |
| FD-02 | `AddInstanceProfileRequest.skipValidation` | Low      | A request-only behaviour flag in a "domain entity"-shaped request. Acceptable for an "add"/"create" request type. |
| FD-03 | `RemoveInstanceProfileRequest.instanceProfileArn` | Low | Identifier-only payload for delete — appropriate. |

### 2.16 Inconsistent action verbs — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| AV-01 | `addInstanceProfile` + `removeInstanceProfile` (pair) | Medium | The verbs `add` + `remove` form a natural pair and match the API wire paths (`/add`, `/remove`). Acceptable. |
| AV-02 | `editInstanceProfile` (verb mismatch with `add` / `remove`) | High | The CRUD verbs in this package are `add`, `edit`, `remove` — three different verb families (`add`/`remove` ↔ pair; `edit` ↔ standalone, no `add`/`edit`/`delete` triplet, no `create`/`update`/`delete` triplet). Inconsistent. Most modern Databricks APIs (and broader REST APIs) use **update**. Matches the wire path `/edit`, so this is a per-API upstream decision. |
| AV-03 | `addInstanceProfile` (vs `createInstanceProfile`) | High | "Add" suggests adding to an existing collection (e.g. registering); "create" suggests minting a new AWS resource. The method **registers an existing AWS instance profile with Databricks** — neither verb is perfectly accurate, but `register*` would be most precise. See M-01. |
| AV-04 | `removeInstanceProfile` (vs `deleteInstanceProfile` / `unregisterInstanceProfile`) | High | Same observation as AV-03. The method un-registers, not deletes. `unregisterInstanceProfile` would be most precise. See M-02. |
| AV-05 | `listInstanceProfiles` (vs `getInstanceProfiles`) | Low | Correct: `list*` for plural retrieval, `get*` for singular. Consistent. |

### 2.17 Long enum values — N/A

| ID    | Symbol                  | Severity | Issue |
| ----- | ----------------------- | -------- | ----- |
| L-01  | _(no enums in package)_ | —        | Nothing to flag. |

### 2.18 Underspecified IDs — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| I-01  | `instanceProfileArn`                | Low      | Well-specified: identifier scope (instance profile), identifier type (AWS ARN). Good — far clearer than a bare `id` or `name` would be. |
| I-02  | `iamRoleArn`                        | Low      | Well-specified: scope (IAM role), type (ARN). Good. |
| I-03  | Absence of `instanceProfileId`      | Low      | The package uses ARN as the sole identifier — there is no separate "ID" concept. Good (no ambiguity between `id` and `arn`). |

(Section retained for parity with the rubric; no high findings — the
package is exemplary in using ARNs as identifiers.)

### 2.19 Type-suffix tautology — Medium

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| TS-01 | `InstanceProfile.instanceProfileArn` (`model.ts:66`) | Medium  | Inside a type called `InstanceProfile`, the `instanceProfile` prefix on the field is tautological. See O-01. |
| TS-02 | `InstanceProfile.isMetaInstanceProfile` (`model.ts:74`) | Medium | Same tautology: `isMeta` inside `InstanceProfile`. See O-02. |
| TS-03 | `ListInstanceProfilesRequest_Response.instanceProfiles` (`model.ts:92`) | Medium | Field re-states the entity type that fills the array. `items` or `profiles` would suffice. See O-04. |

### 2.20 Other observations

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| X-01  | `HttpCallOptions` (`utils.ts:15`)   | Low      | Local interface; precise. |
| X-02  | `executeHttpCall`, `executeCall`    | Low      | Both exist, one wraps the other. The naming difference (`HttpCall` vs `Call`) communicates layering: HTTP-aware vs. transport-agnostic. OK. |
| X-03  | `flattenQueryParams` (`utils.ts:123`, exported but unused in this package) | Low | The package has no GET endpoints with query params (the list endpoint takes none). Either remove or use it. Not strictly a naming issue. |
| X-04  | `Client` (the class name itself, `client.ts:46`) | Medium   | The class is just `Client`. The package exports it as the top-level symbol, but a reader importing it as `import {Client} from '@databricks/sdk-instanceprofiles/v2'` may collide with other packages' `Client`. Most consumers will alias it (`InstanceProfilesClient`); flagging that the bare name doesn't carry scope. This is a repo-wide pattern (every package exports `Client`); not a per-package fix. |
| X-05  | `pkgJson` (import alias)            | Low      | Standard short alias for `package.json`. OK. |
| X-06  | `PACKAGE_SEGMENT.key` derives from `pkgJson.name.replace(/^@[^/]+\//, '')` (string transform on a constant) | Low | Identifier semantics OK; observation only. |

---

## 3. Summary

### 3.1 Findings by severity

| Severity | Count |
| -------- | ----- |
| High     | 9     |
| Medium   | 17    |
| Low      | 35    |
| **Total**| **61**|

### 3.2 Top themes

1. **`add` / `remove` verbs mislead about scope.** The methods **register** /
   **unregister** an existing AWS instance profile with Databricks — neither
   creates nor deletes the underlying AWS resource. `register*` / `unregister*`
   would be more accurate. Compounded by `edit*` (instead of `update*`) breaking
   the CRUD verb consistency.

2. **`InstanceProfile` is AWS-specific but not cloud-prefixed.** In a
   multi-cloud SDK, an unqualified name implies a cross-cloud concept it
   doesn't represent. `AwsInstanceProfile` (matching `AzureServicePrincipal`,
   `GcpAttributes`) would prevent future ambiguity.

3. **Tautological field naming inside `InstanceProfile`.**
   `instanceProfile.instanceProfileArn` and
   `instanceProfile.isMetaInstanceProfile` repeat the type name. Inside the
   entity, `arn` and `isMeta` (or `isCredentialPassthrough`) would suffice.

4. **`isMetaInstanceProfile` and `skipValidation` need their JSDoc to be
   intelligible.** "Meta instance profile" is a Databricks-specific term;
   "validation" is overloaded. `isCredentialPassthrough` /
   `skipIamValidation` (or similar) would be self-documenting.

### 3.3 Suggested quick wins (non-breaking renames are not possible — this section is advisory for the codegen owners)

- Rename `InstanceProfile` → `AwsInstanceProfile` to scope to the cloud.
- Rename `addInstanceProfile` → `registerInstanceProfile` and
  `removeInstanceProfile` → `unregisterInstanceProfile` to match actual
  semantics.
- Rename `editInstanceProfile` → `updateInstanceProfile` for CRUD consistency.
- Inside `InstanceProfile`, rename `instanceProfileArn` → `arn` (and similarly
  for nested entities); drop redundant prefixes.
- Rename `isMetaInstanceProfile` → `isCredentialPassthrough` (or similar)
  and `skipValidation` → `skipIamValidation`.

### 3.4 Cross-package consistency notes

- `editInstanceProfile` (vs `updateInstanceProfile`) is a per-API decision
  driven by the upstream REST verb; flag for upstream alignment but no
  per-package fix.
- `Client` as the exported class name is repo-wide; aliasing on import is
  the de-facto solution.

---

## Proto-Architectural Leaks

_None._ Scanned every identifier (interfaces, fields, methods, locals,
constants) in `model.ts`, `client.ts`, `utils.ts`, and `index.ts` for the
flagged patterns: `Public`/`Internal`/`External` mid-position, `Proto`
suffix/infix, `Service`/`Server`/`Backend`/`Frontend`, `Rpc`/`Grpc`,
`Manager`/`Handler`/`Controller`/`Processor`/`Daemon`/`Worker`, `Impl`,
non-real `Proxy`, mid-position `Action`/`Op` duplicating a verb,
`Wrapper`/`Adapter`, `Old`/`New`/`Legacy`/`Modern`, mid-position
`V1`/`V2`, mid-position `Api`/`Sdk`/`Client`, repeated
`Spec`/`Config`/`Details`/`Info`, and `Foo_PublicRequest`-style
visibility infixes. No matches. The package is exemplary on this rubric.

---

## Fixed

_None._ The regeneration on 2026-05-20 added `Request` suffixes to all
request DTOs (`AddInstanceProfile` → `AddInstanceProfileRequest`,
`EditInstanceProfile` → `EditInstanceProfileRequest`, `ListInstanceProfiles`
→ `ListInstanceProfilesRequest`, `RemoveInstanceProfile` →
`RemoveInstanceProfileRequest`), but no audit finding was contingent on
the prior names — every concern (misleading verbs, tautological fields,
duplicate concepts, AWS-specific entity name) carries over to the renamed
types. Findings have been updated in-place to reference the new symbol
names and current line numbers.
