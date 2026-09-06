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

### 1.2 Misleading names — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| M-01  | `AddInstanceProfileRequest` / `addInstanceProfile()` (`model.ts:5`, `client.ts:78`) | High | "Add" is ambiguous between "create a new resource" and "register an existing resource". The JSDoc clarifies this method **registers** an existing AWS instance profile (it does **not** create one in AWS). `registerInstanceProfile` would be more accurate and would pair semantically with `removeInstanceProfile` (where "remove" actually means "unregister"). The current naming implies CRUD-create semantics that aren't true — the AWS resource exists independent of this call. |
| M-02  | `RemoveInstanceProfileRequest` / `removeInstanceProfile()` (`model.ts:94`, `client.ts:195`) | High | Same domain mismatch as M-01: the method **unregisters** the instance profile from Databricks (the AWS resource is untouched). The JSDoc even notes "Existing clusters with this instance profile will continue to function." `unregisterInstanceProfile` would be more accurate. |

### 1.3 Inconsistent action verbs — High

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| AV-01 | `addInstanceProfile` (vs `createInstanceProfile`) | High | "Add" suggests adding to an existing collection (e.g. registering); "create" suggests minting a new AWS resource. The method **registers an existing AWS instance profile with Databricks** — neither verb is perfectly accurate, but `register*` would be most precise. See M-01. |
| AV-02 | `removeInstanceProfile` (vs `deleteInstanceProfile` / `unregisterInstanceProfile`) | High | Same observation as AV-01. The method un-registers, not deletes. `unregisterInstanceProfile` would be most precise. See M-02. |

---

## 2. Summary

### 2.1 Findings by severity

| Severity | Count |
| -------- | ----- |
| High     | 5     |
| Medium   | 0     |
| Low      | 0     |
| Observation | 0  |
| **Total**| **5** |
