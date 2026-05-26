# Naming Audit: `secrets` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/secrets/`
**Module name:** `@databricks/sdk-secrets`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`
**Inferred domain:** Workspace-level "Secret Manager" (Databricks Secrets API,
`/api/2.0/secrets/...`). Provides three resources: secret scopes (containers,
either Databricks-managed or Azure KeyVault-backed), secrets (key/value
entries inside a scope, value stored as bytes), and ACLs (per-principal
read/write/manage permissions on a scope).

Notation: file paths are relative to the package root. Findings reference
`file:line`.

---

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 3     |
| Medium      | 5     |
| Low         | 4     |
| Observation | 4     |
| **Total**   | **16** |

Headline themes:

1. **Cross-package namespace collision with three sibling "secret" packages.**
   The repo ships four `*secret*` packages — `secrets` (this one, workspace
   Secret Manager), `secretsuc` (Unity Catalog secrets, three-level
   namespace), `serviceprincipalsecrets` (account-level OAuth client secrets),
   and `serviceprincipalsecretsproxy` (workspace-level proxy for the same).
   All four export a class literally named `Client` and types with the noun
   `Secret`. Cross-package usage is opaque without aliasing.
2. **Inconsistent action verb across mutating operations.** `Put` for
   creating/updating ACLs and secrets, `Create` for scopes, `Delete` for
   all three. There is no `Update`. Go's REST SDK adopts the same shape, but
   `Put` reads as Go/HTTP-method jargon rather than a TS-side action verb.

---

## High Severity

### H1. Package collision: four "secret" packages, opaque imports

- **Affected:** `package.json:2` (`@databricks/sdk-secrets`); compare
  `@databricks/sdk-secretsuc`, `@databricks/sdk-serviceprincipalsecrets`,
  `@databricks/sdk-serviceprincipalsecretsproxy`.
- **Category:** #1 vague/generic, #12 duplicate concepts.
- **Issue:** All four packages legitimately deal with "secrets" but at very
  different layers:
  - `secrets` (this package) — workspace-level Secret Manager. Key/value
    secrets inside named scopes, with per-scope ACLs.
    Endpoint: `/api/2.0/secrets/...`. Domain noun: `SecretScope`.
  - `secretsuc` — Unity Catalog secrets. Three-level namespace
    (catalog.schema.secret). Domain noun: `Secret` (UC-style).
  - `serviceprincipalsecrets` — account-level OAuth M2M client secrets for
    service principals.
  - `serviceprincipalsecretsproxy` — the same API exposed at the workspace
    level via a proxy endpoint.
- The literal symbol `Client` is exported by all four (`index.ts:3`). An
  importer writing `import {Client} from '@databricks/sdk-secrets'` cannot
  visually distinguish from the other three without aliasing
  (`import {Client as SecretsClient}`). Compare to the sibling
  `serviceprincipalsecrets` vs `serviceprincipalsecretsproxy` collision
  flagged in the `credentials` audit H1.
- **Suggestion:** rename the exported class to `SecretsClient` (and the
  three siblings to `SecretsUCClient`, `ServicePrincipalSecretsClient`,
  `ServicePrincipalSecretsProxyClient`), so the `Client` symbol does not
  appear bare in any of them. Document the four-package matrix in each
  package's README.

### H2. `Client` is unqualified; overlaps with `Secret*` types in the same package

- **File / line:** `src/v1/client.ts:70` (`export class Client`); re-exported
  from `src/v1/index.ts:3`.
- **Category:** #1 vague/generic.
- **Current:** `export class Client`.
- **Suggestion:** `export class SecretsClient`.
- **Rationale:** The package exports `SecretScope`, `SecretMetadata`, and
  numerous `Secret*` operation types alongside the bare `Client`. A consumer
  importing several symbols from this package gets a mix of self-identifying
  `Secret*` names plus an undifferentiated `Client`. Self-identifying the
  class name (`SecretsClient`) aligns it with the rest of the package's
  exports and also eliminates the cross-package alias dance flagged in H1.

### H3. Inconsistent action verb: `Put*` mixed with `Create*` and `Delete*`

- **Files / lines:** `src/v1/client.ts:596` (`putAcl`), `:653` (`putSecret`);
  contrast `:137` (`createScope`), `:268` (`deleteSecret`), `:223`
  (`deleteScope`), `:183` (`deleteAcl`).
- **Category:** #17 inconsistent action verbs.
- **Current:** `Put` for ACLs and secrets, `Create` for scopes, `Delete`
  for all three. No `Update`.
- **Issue:** A consumer who learned `createScope` will not guess that the
  way to create or update a secret is `putSecret`, not `createSecret` or
  `setSecret`. The JSDoc itself says "Inserts a secret" (client.ts:622) and
  "Creates or overwrites the ACL" (client.ts:563) — three different verbs
  for the same upsert semantic.
- **Suggestion:** unify on one verb pair: either
  (a) `Create*` for new + `Update*` for existing, or
  (b) `Put*` (upsert) consistently, also renaming `createScope` → `putScope`.
  Picking either gets rid of the asymmetry. Note that the underlying REST
  endpoints are `/secrets/scopes/create`, `/secrets/acls/put`,
  `/secrets/put` — so the wire format is *also* inconsistent and the
  generator is faithfully reproducing it.

---

## Medium Severity

### M1. `KeyVault` / `KeyvaultMetadata` / `keyvault` casing inconsistency

- **Files / lines:**
  - `model.ts:29` `AZURE_KEYVAULT` (one word, upper).
  - `model.ts:44` `AzureKeyVaultSecretScopeMetadata` (two words, "Vault").
  - `model.ts:59` `backendAzureKeyvault` (one word, lower-camel).
  - `model.ts:202` `keyvaultMetadata` (one word, lower-camel).
  - `model.ts:215` `unmarshalAzureKeyVaultSecretScopeMetadataSchema` (two
    words, "Vault").
  - `model.ts:309` `keyvault_metadata` (the *wire* form).
  - `model.ts:319` `marshalAzureKeyVaultSecretScopeMetadataSchema`.
- **Category:** #3 acronym casing inconsistency, #4 underscores (in wire
  names — acceptable, but interacts).
- **Current:** simultaneously `KeyVault`, `Keyvault`, `keyvault`,
  `KEYVAULT`.
- **Suggestion:** pick one. Microsoft's official product name is
  "Azure Key Vault" (two words; see
  `https://azure.microsoft.com/en-us/products/key-vault`). Standardize on
  `KeyVault` in types and `keyVault` in fields:
  - Type: `AzureKeyVaultSecretScopeMetadata` (already correct).
  - Field: `keyVaultMetadata` (currently `keyvaultMetadata`),
    `backendAzureKeyVault` (currently `backendAzureKeyvault`).
- **Rationale:** the type name is already two-word and follows the
  Microsoft-canonical spelling. The fields just need to match the type
  names they describe.

### M2. `AclItem` is generic-suffix tautology

- **File / line:** `src/v1/model.ts:36`.
- **Category:** #20 type-suffix tautology, #15 generic field names.
- **Current:** `AclItem` describes "an ACL rule". The `Item` suffix is
  meaningless.
- **Suggestion:** rename to `Acl` or `AclEntry` or `AclRule`. The
  enclosing `ListAclsRequest_Response.items: AclItem[]` is then
  `ListAclsRequest_Response.acls: Acl[]`. The Go SDK uses `AclItem`, but in
  TS the suffix doesn't carry weight: `AclItem` and `AclRule` carry exactly
  the same information.
- **Rationale:** Look at the surrounding code:
  - `ListAclsRequest_Response.items` (`model.ts:123`) — the field is
    `items`, not `acls`. Generic name lost the domain.
  - JSDoc on `:122` says "The associated ACLs rule applied to principals"
    — so the type is conceptually "an ACL rule", but it's spelled
    "AclItem". The doc disagrees with the name.

### M3. `SecretMetadata` describes a list-item, not metadata

- **File / line:** `src/v1/model.ts:184`.
- **Category:** #1 vague/generic, #20 type-suffix tautology.
- **Current:** `SecretMetadata { key, lastUpdatedTimestamp }`. The JSDoc
  says "The metadata about a secret. Returned when listing secrets. Does
  not contain the actual secret value."
- **Suggestion:** `SecretSummary`, `SecretListItem`, or `SecretInfo` (to
  match the codebase-wide `*Info` pattern from `credentials`, `catalogs`,
  etc.). `SecretMetadata` is misleading: the type carries the secret's
  *name* (`key`) and *timestamp*, which is the secret itself sans value,
  not "metadata about" it.
- **Rationale:** `Metadata` typically denotes auxiliary descriptive data
  (tags, schema, labels). Here the type *is* the secret as exposed by
  list — it lacks only the value. `SecretSummary` reads correctly.

### M4. `Backend` mid-position is an architectural leak

- **Files / lines:** `src/v1/model.ts:19` (`ScopeBackendType` enum),
  `:57` (`CreateScopeRequest.scopeBackendType`), `:59`
  (`CreateScopeRequest.backendAzureKeyvault`), `:200`
  (`SecretScope.backendType`), `:308, :315, :333, :341` (marshal/unmarshal
  schema field names).
- **Category:** proto-architectural-leak (`Backend` mid-position, not a
  domain noun).
- **Issue:** the public surface uses `Backend` to mean "where the secret
  data is stored" — either Databricks-managed storage or Azure KeyVault.
  `Backend` is an implementation/architecture term (frontend/backend
  layering), not a user-facing domain concept. A consumer sees
  `ScopeBackendType` and reads it as a deployment/architecture flag,
  rather than what the field actually denotes: the *storage provider* or
  *vault provider* of the scope.
- **Suggestion:** rename to a domain term. Options:
  - `ScopeBackendType` → `ScopeStorageType` or `SecretStorageProvider`.
- **Rationale:** every other field in the package uses domain nouns
  (`scope`, `key`, `principal`, `permission`). `Backend` is the one
  outlier that smuggles in implementation jargon. Same defect appears in
  several other audits where "backend" describes an integration/provider
  layer (e.g., `connections.md` flags `ConnectionType` analogues).

### M5. `GetSecretRequest_Response` returned by `getSecret` carries `key` redundantly

- **File / line:** `src/v1/model.ts:108-113`.
- **Category:** #12 duplicate concepts (request → response).
- **Current:** `GetSecretRequest_Response { key?: string; value?: Uint8Array }`.
  The caller has just passed `key` in via `GetSecretRequest.key`, so they
  have it.
- **Issue:** the response echoes the key. Two interpretations:
  - The server is *confirming* which key was returned, useful for any
    callers using multi-stage pipelines.
  - The server's response may rewrite the key in some way (e.g.
    normalization), but the JSDoc gives no such hint.
- **Suggestion:** consider whether `key` is load-bearing on the response.
  If not, drop it; if so, document why. As a TS shape, `Promise<Uint8Array>`
  for `getSecret` would be simpler than a `{key, value}` envelope. As-is,
  callers writing `(await client.getSecret({scope, key: 'foo'})).value`
  spell `foo` twice.

---

## Low Severity

### L1. `unmarshalAclItemSchema` parses `permission: z.enum(AclPermission)` without strictness

- **File / line:** `src/v1/model.ts:208`.
- **Category:** observation; not a naming defect strictly, but worth noting.
- **Issue:** `z.enum(AclPermission)` accepts the *string values* of the
  enum (`'READ' | 'WRITE' | 'MANAGE'`). If the server adds a new permission
  level, zod will throw at decode. Not a name issue, just notable.

### L2. `flattenQueryParams` is dead code in this package

- **File / line:** `src/v1/utils.ts:123`.
- **Category:** #21 dead code.
- **Issue:** function defined but not imported in `client.ts`. The client
  builds query strings inline (`client.ts:316-323, :379-386, :434-438,
  :534-538`). Same defect noted in `credentials.md` #57 — appears
  generator-wide.
- **Suggestion:** drop dead code, or move it to a shared utils package.

### L3. `executeCall` vs `executeHttpCall` name collision

- **Files / lines:** `src/v1/utils.ts:26, 65`.
- **Category:** #17 inconsistent action verbs.
- **Current:** two `execute*` functions with overlapping vocabulary:
  `executeCall` (sets options + dispatches retries) and `executeHttpCall`
  (one HTTP roundtrip). Same defect cataloged in other audits.

### L4. `PACKAGE_SEGMENT` constant is vague

- **File / line:** `src/v1/client.ts:65`.
- **Category:** #1 vague/generic.
- **Current:** `const PACKAGE_SEGMENT = {key, value}` — used to compose
  the User-Agent header.
- **Suggestion:** `USER_AGENT_PACKAGE_SEGMENT`. The JSDoc on the line
  above already says "Package identity segment for this client to be used
  in the User-Agent header" — fold the comment into the name.

---

## Observations

### O1. `scope` is optional on every request type, but required at the server

- **Files / lines:** see model.ts request types.
- The generator marks every proto field optional. The runtime contract
  requires `scope` for ten of eleven operations. Not a naming defect but
  worth noting: the type is wider than the API allows.

### O2. `CreateScopeRequest` fields are out of order vs. domain intuition

- **File / line:** `src/v1/model.ts:51-60`.
- The order is `scope`, `initialManagePrincipal`, `scopeBackendType`,
  `backendAzureKeyvault`. The example in `client.ts:104-115` orders them
  differently (`scope`, `initial_manage_principal`, `scope_backend_type`,
  `backend_azure_keyvault` — same order, but the JSON example also has
  `tenant_id` which the type doesn't have).
- The JSDoc example references `tenant_id` (`client.ts:112`) but the
  type `AzureKeyVaultSecretScopeMetadata` has no `tenantId` field. The
  example is out of sync with the type.

### O3. `AclPermission.MANAGE` is owner-equivalent but not named that way

- **File / line:** `src/v1/model.ts:11-12`.
- The JSDoc says "Allowed to read/write ACLs, and read/write secrets to
  this secret scope" — i.e., MANAGE is full control. In the rest of the
  Databricks platform, this level is often called OWNER. Naming
  inconsistency with the wider platform; the wire format is fixed.

### O4. `marshalPutSecretRequestSchema` does a `btoa` on the bytes value

- **File / line:** `src/v1/model.ts:393-397`.
- The `bytesValue` field is encoded via `btoa(Array.from(d, b =>
  String.fromCharCode(b)).join(''))`. This is the legacy Web base64 path
  (not name-related). Modern code would use `Buffer.from(d).toString(
  'base64')` (Node) or a polyfill. Not a naming defect.

### O5. The `Secret` noun is absent from this package's exports

- **Files / lines:** `src/v1/index.ts`, `model.ts`.
- The package is called `secrets` but exports `SecretScope`,
  `SecretMetadata`, and various `Secret*` operations. There is no bare
  `Secret` type. The closest is `GetSecretRequest_Response { key, value }`
  — the actual full secret. Compare to the sibling `secretsuc` package
  which exports a top-level `Secret` type (`secretsuc/model.ts:89`).
- Naming the type would help: e.g., `Secret { key, value }`. As-is, the
  package's primary domain entity has no named type.

---

## Recommended renames (high-confidence, in priority order)

1. `Client` → `SecretsClient` (H1, H2).
2. Verb harmonization: pick `Create`/`Update` *or* `Put` and apply
   consistently across all mutating methods (H3).
3. `AclItem` → `Acl` or `AclEntry` (M2).
4. `SecretMetadata` → `SecretSummary` or `SecretInfo` (M3).
5. Casing standardization: `KeyVault` everywhere (`keyVaultMetadata`,
   `backendAzureKeyVault`) (M1).
6. `ScopeBackendType` → `ScopeStorageType`; drop `Backend` mid-position
   (M4).

---
