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
| High        | 4     |
| Medium      | 12    |
| Low         | 9     |
| Observation | 5     |
| **Total**   | **30** |

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
3. **`scope: string | undefined` everywhere — but required in practice.**
   Eleven of twelve operation request types have `scope?: string | undefined`
   as their primary identifier. Every server endpoint will reject an absent
   scope. The "optional" marker is a generator artifact (all proto fields
   are optional), not a real contract. Same pattern for `key` and
   `principal`.

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

### H4. Scope name field `scope` is severely overloaded across types

- **Files / lines:** `src/v1/model.ts:53` (`CreateScopeRequest.scope`), `:67`
  (`DeleteAclRequest.scope`), `:77` (`DeleteScopeRequest.scope`), `:85`
  (`DeleteSecretRequest.scope`), `:95` (`GetAclRequest.scope`), `:102`
  (`GetSecretRequest.scope`), `:117` (`ListAclsRequest.scope`), `:137`
  (`ListSecretsRequest.scope`), `:148` (`PutAclRequest.scope`), `:160`
  (`PutSecretRequest.scope`). Then `SecretScope.name` (`:198`) names the
  same value, and the *type* `SecretScope` describes what `scope` actually
  contains. Then `ScopeBackendType` describes the scope's backend.
- **Category:** #1 vague/generic, #15 generic field names losing meaning,
  #6 misleading names.
- **Issue:** `scope` is the *string name* of a `SecretScope`. The naming
  is ambiguous in three ways:
  - The type `SecretScope` calls its own identifier `name` (not `scope`).
  - Every request type calls the same identifier `scope` (not `scopeName`
    or `secretScopeName`).
  - The word "scope" in TS frequently refers to lexical scope or
    permission scope (OAuth). A casual reader sees `req.scope = '...'` and
    has to read the JSDoc to learn it is a *secret scope name*.
- **Suggestion:** rename the field on request types to `scopeName` and on
  `SecretScope` keep `name`. This matches the disambiguation pattern the
  sibling `serviceprincipalsecrets` uses (`ServicePrincipalSecret.secretId`
  vs request `id`). The Go SDK uses the same `Scope` field name, but TS
  conventions favour explicitness over brevity.

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

### M2. `AzureKeyVaultSecretScopeMetadata.resourceId` is underspecified

- **File / line:** `src/v1/model.ts:46`.
- **Category:** #19 underspecified IDs.
- **Current:** `resourceId?: string | undefined`.
- **JSDoc:** "The resource id of the azure KeyVault that user wants to
  associate the scope with."
- **Suggestion:** `azureResourceId` or `keyVaultResourceId`. As-is, a
  reader sees `metadata.resourceId` and has no idea it's an Azure ARM
  Resource ID — it could be a Databricks resource ID, a UC resource ID,
  etc.

### M3. `AzureKeyVaultSecretScopeMetadata.dnsName` is underspecified

- **File / line:** `src/v1/model.ts:48`.
- **Category:** #1 vague/generic, #15 generic field name.
- **Current:** `dnsName?: string | undefined`.
- **JSDoc:** "The DNS of the KeyVault" — incidentally grammatically wrong
  ("the DNS" should be "the DNS name" or "the URL").
- **Suggestion:** `vaultUri` or `keyVaultUri`. The Azure SDK names this
  field `vaultUri` and the value is a full URI
  (`https://xxxx.vault.azure.net/`) not just a DNS name.
- **Rationale:** `dnsName` suggests a hostname like `xxxx.vault.azure.net`,
  but the example value in `client.ts:113` is the full URI
  `https://xxxx.vault.azure.net/`. The field name lies about its content.

### M4. `AclItem` is generic-suffix tautology

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

### M5. `SecretMetadata` describes a list-item, not metadata

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

### M6. `SecretMetadata.lastUpdatedTimestamp` carries unit in name but not type

- **File / line:** `src/v1/model.ts:188`.
- **Category:** #6 misleading names, #15 generic field names.
- **Current:** `lastUpdatedTimestamp?: number | undefined` — JSDoc says
  "The last updated timestamp (in milliseconds) for the secret."
- **Suggestion:** `lastUpdatedAt` (epoch-ms) or `lastUpdatedMs` (carries
  the unit). Compare to other audits in the repo: `expirationTime` was
  flagged for the same defect in `credentials.md` #50.
- **Rationale:** `Timestamp` doesn't say whether it's ms or s, ISO string,
  or `Date`. The codebase elsewhere uses `*At` (`createdAt`, `updatedAt`)
  for epoch-ms ints; this field breaks the pattern.

### M7. `SecretScope.backendType` vs `CreateScopeRequest.scopeBackendType`

- **Files / lines:** `src/v1/model.ts:200` (`SecretScope.backendType`),
  `:57` (`CreateScopeRequest.scopeBackendType`).
- **Category:** #1 vague/generic, #13 verb-tense inconsistency (form).
- **Current:** the very same enum-typed field appears as `backendType` on
  the response shape and `scopeBackendType` on the request shape.
- **Suggestion:** pick one. `backendType` is sufficient since both types
  are scope-related and the prefix `scope` is redundant.
- **Rationale:** Inconsistent naming for the same conceptual field is
  pure noise; a consumer mapping a `SecretScope` back to a
  `CreateScopeRequest` re-creation will trip on the field-name mismatch.

### M8. `Backend` mid-position is an architectural leak

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
  - `backendType` → `storageType` or `provider`.
  - `scopeBackendType` → `storageType`.
  - `backendAzureKeyvault` → `azureKeyVault` (drop the `backend` prefix;
    M9 already wants this field renamed to `keyVaultBackend` for
    round-trip parity — pick whichever direction prefers domain language).
- **Rationale:** every other field in the package uses domain nouns
  (`scope`, `key`, `principal`, `permission`). `Backend` is the one
  outlier that smuggles in implementation jargon. Same defect appears in
  several other audits where "backend" describes an integration/provider
  layer (e.g., `connections.md` flags `ConnectionType` analogues).

### M9. `CreateScopeRequest.backendAzureKeyvault` vs `SecretScope.keyvaultMetadata`

- **Files / lines:** `src/v1/model.ts:59`, `:202`.
- **Category:** #12 duplicate concepts, #1 vague/generic.
- **Current:** the same conceptual field (`AzureKeyVaultSecretScopeMetadata`
  payload, the backend configuration for an Azure KeyVault scope) is named
  `backendAzureKeyvault` on `CreateScopeRequest` and `keyvaultMetadata` on
  `SecretScope`. Both names describe the same payload at the same role
  (the KeyVault backend config) but use different framings.
- **Suggestion:** rename both to the same — `keyVaultBackend` (preferred,
  short, describes role) or `azureKeyVaultBackend`. Then `CreateScopeRequest`
  and `SecretScope` round-trip naturally.

### M10. `CreateScopeRequest.initialManagePrincipal` is verbose

- **File / line:** `src/v1/model.ts:55`.
- **Category:** #7 overly verbose.
- **Current:** `initialManagePrincipal` (22 chars).
- **JSDoc:** "The principal that is initially granted ``MANAGE`` permission
  to the created scope."
- **Suggestion:** `manageOwner` (10) or `initialOwner` (12); rests on the
  fact that MANAGE permission is owner-equivalent. As-is, the name reads
  as "initial manage principal" which is grammatically odd — `initial`
  modifies `principal`, but the reader first sees "initial manage" as a
  unit. Acceptable as-is if alternates feel too clever; flagging only the
  verbosity.

### M11. `GetSecretRequest_Response` returned by `getSecret` carries `key` redundantly

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

### M12. `ListAclsRequest_Response.items` should be `ListAclsRequest_Response.acls`

- **File / line:** `src/v1/model.ts:123`.
- **Category:** #15 generic field name losing meaning.
- **Current:** `items?: AclItem[] | undefined`.
- **Suggestion:** `acls: Acl[]` (combined with M4).
- **Rationale:** Compare to `ListScopesRequest_Response.scopes` (`:132`)
  and `ListSecretsRequest_Response.secrets` (`:143`) which both use the
  domain-typed plural. `items` is the odd-one-out; the field name should
  match the pattern.

---

## Low Severity

### L1. `unmarshalAclItemSchema` parses `permission: z.enum(AclPermission)` without strictness

- **File / line:** `src/v1/model.ts:208`.
- **Category:** observation; not a naming defect strictly, but worth noting.
- **Issue:** `z.enum(AclPermission)` accepts the *string values* of the
  enum (`'READ' | 'WRITE' | 'MANAGE'`). If the server adds a new permission
  level, zod will throw at decode. Not a name issue, just notable.

### L2. `PutSecretRequest.value` discriminator names duplicate property names

- **File / line:** `src/v1/model.ts:163-174`.
- **Category:** #15 generic field names, #20 type-suffix tautology.
- **Current:** `{ $case: 'stringValue', stringValue: string }`. The
  discriminator value is the same string as the property name.
- **Issue:** `value.stringValue` is the access path; `value.$case` is the
  guard, also `'stringValue'`. The redundancy bloats every read site.
- **Suggestion:** `{ $case: 'string', value: string } | { $case: 'bytes',
  value: Uint8Array }`. The discriminator becomes a clean enum-of-strings,
  the value field has a uniform name.

### L3. `PutSecretRequest.value` `stringValue` JSDoc references "UTF-8 (MB4)"

- **File / line:** `src/v1/model.ts:166`.
- **Category:** #5 cryptic abbreviations.
- **Current JSDoc:** "If specified, note that the value will be stored in
  UTF-8 (MB4) form."
- **Issue:** "MB4" likely means "MySQL utf8mb4" (4-byte UTF-8); an opaque
  abbreviation outside the MySQL ecosystem. A TS API consumer has no
  reason to know MySQL trivia.
- **Suggestion:** clarify or drop. "UTF-8 with full BMP support" or just
  "UTF-8". This is a doc issue, not a name issue per se, but a naming
  audit notices it.

### L4. `principal` is a single field used for both users and groups

- **Files / lines:** `model.ts:38, 69, 97, 150`.
- **Category:** #1 vague/generic.
- **Current:** `principal?: string | undefined` — JSDoc says "The principal
  in which the permission is applied." `client.ts:562-594` clarifies:
  "user or group name".
- **Suggestion:** acceptable as-is, as "principal" is the Databricks
  platform-wide term for user-or-group; consistent with other packages.
  Flagging only because a casual reader sees `principal` and may not
  realize they should pass either a username or group name. JSDoc on the
  request types could explicitly say "(user or group name)".

### L5. `req.scope` is documented inconsistently across types

- **Files / lines:** `model.ts:52, 67, 77, 85, 95, 102, 117, 137, 148, 160`.
- **Category:** observation; documentation only.
- **Current:** various JSDoc:
  - `CreateScopeRequest.scope`: "Scope name requested by the user. Scope
    names are unique."
  - `DeleteAclRequest.scope`: "The name of the scope to remove permissions
    from."
  - `DeleteScopeRequest.scope`: "Name of the scope to delete." (no "the")
  - `DeleteSecretRequest.scope`: "The name of the scope that contains the
    secret to delete."
- **Suggestion:** the JSDocs are written by hand per-operation, with minor
  grammar variation. Not a naming defect; flagging because it makes
  cross-reference annoying.

### L6. `ScopeBackendType` values include only two cases despite the JSDoc

- **File / line:** `src/v1/model.ts:16-30`.
- **Category:** observation.
- **JSDoc:** "Azure KeyVault backed secret scopes will be supported in a
  later release." The release shipped; the doc string is stale. Not a
  naming issue but indicates the file is not maintained tightly.

### L7. `flattenQueryParams` is dead code in this package

- **File / line:** `src/v1/utils.ts:123`.
- **Category:** #21 dead code.
- **Issue:** function defined but not imported in `client.ts`. The client
  builds query strings inline (`client.ts:316-323, :379-386, :434-438,
  :534-538`). Same defect noted in `credentials.md` #57 — appears
  generator-wide.
- **Suggestion:** drop dead code, or move it to a shared utils package.

### L8. `executeCall` vs `executeHttpCall` name collision

- **Files / lines:** `src/v1/utils.ts:26, 65`.
- **Category:** #17 inconsistent action verbs.
- **Current:** two `execute*` functions with overlapping vocabulary:
  `executeCall` (sets options + dispatches retries) and `executeHttpCall`
  (one HTTP roundtrip). Same defect cataloged in other audits.

### L9. `PACKAGE_SEGMENT` constant is vague

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

- **Files / lines:** see H4.
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
3. `scope: string` field on every request type → `scopeName: string` (H4).
4. `AclItem` → `Acl` or `AclEntry`; `ListAclsRequest_Response.items` →
   `ListAclsRequest_Response.acls` (M4, M12).
5. `SecretMetadata` → `SecretSummary` or `SecretInfo` (M5).
6. `SecretMetadata.lastUpdatedTimestamp` → `lastUpdatedAt` (M6).
7. Casing standardization: `KeyVault` everywhere (`keyVaultMetadata`,
   `backendAzureKeyVault`) (M1).
8. `AzureKeyVaultSecretScopeMetadata.dnsName` → `vaultUri` (M3).
9. `AzureKeyVaultSecretScopeMetadata.resourceId` → `azureResourceId` or
   `keyVaultResourceId` (M2).
10. `SecretScope.backendType` ↔ `CreateScopeRequest.scopeBackendType` →
    pick one (`backendType`) (M7).
11. `ScopeBackendType` → `ScopeStorageType`; drop `Backend` mid-position
    in `backendType` / `scopeBackendType` fields (M8).
12. `CreateScopeRequest.backendAzureKeyvault` ↔ `SecretScope.keyvaultMetadata`
    → pick one (`keyVaultBackend`) (M9).

---

## Fixed

- #H3 (original) Six request types are verb phrases (action collision with client methods) (originally cited at `src/v1/model.ts:51, 65, 75, 83, 93, 100, 115, 127, 135, 146, 158`): Fixed in regeneration on 2026-05-20 — all request DTOs now carry the `Request` suffix (`CreateScopeRequest`, `DeleteAclRequest`, `DeleteScopeRequest`, `DeleteSecretRequest`, `GetAclRequest`, `GetSecretRequest`, `ListAclsRequest`, `ListScopesRequest`, `ListSecretsRequest`, `PutAclRequest`, `PutSecretRequest`).
