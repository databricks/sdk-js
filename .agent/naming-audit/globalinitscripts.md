# Naming Audit: `globalinitscripts` (v2)

**Package:** `@databricks/sdk-globalinitscripts`
**Path:** `/home/parth.bansal/sdk-js/packages/globalinitscripts/`
**Version audited:** `v2`
**Files audited:**

- `src/v2/model.ts`
- `src/v2/client.ts`
- `src/v2/utils.ts`
- `src/v2/index.ts`

---

## 1. Summary

| Severity | Count |
| -------- | ----- |
| High     | 1     |
| Medium   | 3     |
| Low      | 0     |
| **Total**| **4** |

---

## 2. Findings by Category

### 2.1 Overly verbose / Redundant suffixes

| ID    | Symbol                                          | Severity | Issue |
| ----- | ----------------------------------------------- | -------- | ----- |
| O-01  | `CreateGlobalInitScriptRequest` / `DeleteGlobalInitScriptRequest` / `GetGlobalInitScriptRequest` / `UpdateGlobalInitScriptRequest` / `ListGlobalInitScriptsRequest` (`model.ts:5`, `27`, `35`, `66`, `60`) | High | These are method-aligned request types but every type spells out `GlobalInitScript` in full plus the `Request` suffix, producing ~28-32-char identifiers for one-off request bodies. Since the surrounding namespace is already `globalinitscripts`, peers in other packages use shorter forms like `CreateRequest`, `CreatePolicy`, `CreateCluster`. The Databricks SDK convention is `Create<Entity>Request`, but here `Entity = GlobalInitScript` so each verb-typename pair runs long. Inherited from the API; flagged as an upstream/codegen-level concern. |
| O-02  | `GlobalInitScriptDetails` (entity name, `model.ts:40`) | Medium | The entity is named `*Details` whereas peer packages (e.g. `Policy`, `Cluster`) name the entity after the resource. `GlobalInitScript` would be the consistent name; the `Details` suffix adds 7 chars without disambiguation (there is no plain `GlobalInitScript` type to disambiguate from). The Go SDK mirrors this name, so this is a 1:1 port concern. |

### 2.2 Go / Java-style names

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| G-01  | `GlobalInitScriptDetails` (Java-style "Details" suffix, `model.ts:40`) | Medium | Suffix `Details` is reminiscent of Java DTO conventions (`UserDetails`, `OrderDetails`). TS/JS naming tends to use the bare entity noun. See O-02. |

### 2.3 Type-suffix tautology

| ID    | Symbol                              | Severity | Issue |
| ----- | ----------------------------------- | -------- | ----- |
| TS-01 | `GlobalInitScriptDetails` (`model.ts:40`) | Medium   | The entity name encodes both the resource (`GlobalInitScript`) and a descriptive suffix (`Details`). With no peer `GlobalInitScript` type to distinguish from, the suffix is purely redundant. See O-02 / G-01. |
