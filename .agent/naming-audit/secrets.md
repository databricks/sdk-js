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
| High        | 8     |
| Medium      | 15    |
| Low         | 11    |
| Observation | 5     |
| **Total**   | **39** |

Headline themes:

1. **Cross-package namespace collision with three sibling "secret" packages.**
   The repo ships four `*secret*` packages — `secrets` (this one, workspace
   Secret Manager), `secretsuc` (Unity Catalog secrets, three-level
   namespace), `serviceprincipalsecrets` (account-level OAuth client secrets),
   and `serviceprincipalsecretsproxy` (workspace-level proxy for the same).
   All four export a class literally named `Client` and types with the noun
   `Secret`. Cross-package usage is opaque without aliasing.
2. **Pervasive proto-style `Parent_Response` underscore identifiers.** Every
   non-`Get` operation produces an empty `_Response` envelope
   (`CreateScope_Response`, `DeleteAcl_Response`, ...). Eleven of the
   thirteen public types in `model.ts` carry an underscore, and every one of
   them sits behind an `eslint-disable @typescript-eslint/naming-convention`
   comment.
3. **Action-verb request types collide with same-named client methods.**
   `interface CreateScope` describes the request body; `client.createScope`
   performs the action. The reader has to mentally distinguish the noun-from-
   verb each time. Six pairs in this file (`CreateScope`, `DeleteAcl`,
   `DeleteScope`, `DeleteSecret`, `GetAcl`, `GetSecret`, `ListAcls`,
   `ListScopes`, `ListSecrets`, `PutAcl`, `PutSecret`).
4. **Inconsistent action verb across mutating operations.** `Put` for
   creating/updating ACLs and secrets, `Create` for scopes, `Delete` for
   all three. There is no `Update`. Go's REST SDK adopts the same shape, but
   `Put` reads as Go/HTTP-method jargon rather than a TS-side action verb.
5. **`scope: string | undefined` everywhere — but required in practice.**
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

### H2. `Client` is unqualified; collides on import with every other package

- **File / line:** `src/v1/client.ts:70` (`export class Client`); re-exported
  from `src/v1/index.ts:3`.
- **Category:** #1 vague/generic.
- **Current:** `export class Client`.
- **Suggestion:** `export class SecretsClient`.
- **Rationale:** Per repo-wide pattern, every package exports `Client`. Once
  two such packages are imported into the same file the user must alias one
  of them. Same defect flagged in `credentials.md` #10, `resourcequotas.md`
  (implicit), and others. Self-identifying class names eliminate the alias
  dance entirely.

### H3. Eleven proto-style `Parent_Response` types violate TS identifier convention

- **Files / lines:** `src/v1/model.ts:63, 73, 81, 91, 108, 121, 130, 141,
  156, 178`. Schema constants mirror them: `model.ts:227, 231, 235, 239,
  243, 258, 267, 277, 287, 291`. All eleven sit behind
  `// eslint-disable-next-line @typescript-eslint/naming-convention` comments.
- **Category:** #4 underscore in TS identifier, #14 Go/Java-style name.
- **Current:** `CreateScope_Response`, `DeleteAcl_Response`,
  `DeleteScope_Response`, `DeleteSecret_Response`, `GetSecret_Response`,
  `ListAcls_Response`, `ListScopes_Response`, `ListSecrets_Response`,
  `PutAcl_Response`, `PutSecret_Response`. Schemas
  `unmarshalCreateScope_ResponseSchema`, etc.
- **Suggestion:** `CreateScopeResponse`, ..., `unmarshalCreateScopeResponseSchema`,
  etc. (collapse the underscore).
- **Rationale:** Same defect class as `resourcequotas.md` H2 and
  `credentials.md` #18. The codebase itself rejects this convention — every
  declaration carries an ESLint disable annotation. Eleven disables in one
  file is a strong signal that the generator is producing wrong identifiers.

### H4. Six request types are verb phrases (action collision with client methods)

- **Files / lines:** `src/v1/model.ts:51` (`CreateScope`), `:65` (`DeleteAcl`),
  `:75` (`DeleteScope`), `:83` (`DeleteSecret`), `:93` (`GetAcl`), `:100`
  (`GetSecret`), `:115` (`ListAcls`), `:127` (`ListScopes`), `:135`
  (`ListSecrets`), `:146` (`PutAcl`), `:158` (`PutSecret`).
- **Category:** #14 Go/Java-style name (action used as data type).
- **Current example:** `client.createScope(req: CreateScope)`.
- **Suggestion:** `CreateScopeRequest`, `DeleteAclRequest`,
  `DeleteScopeRequest`, `DeleteSecretRequest`, `GetAclRequest`,
  `GetSecretRequest`, `ListAclsRequest`, `ListScopesRequest`,
  `ListSecretsRequest`, `PutAclRequest`, `PutSecretRequest`. (See sibling
  package `secretsuc` which already uses the `…Request` suffix —
  `CreateSecretRequest`, `DeleteSecretRequest`, etc.)
- **Rationale:** Reading `client.createScope(req: CreateScope)` requires
  the reader to distinguish noun-from-verb each time. `secretsuc/model.ts`
  is the live counter-example for the correct convention within this very
  repo: `CreateSecretRequest`, `GetSecretRequest`, `ListSecretsRequest`,
  etc. Two sibling packages, two conventions. Pick one.

### H5. Inconsistent action verb: `Put*` mixed with `Create*` and `Delete*`

- **Files / lines:** `src/v1/client.ts:584` (`putAcl`), `:638` (`putSecret`);
  contrast `:137` (`createScope`), `:262` (`deleteSecret`), `:220`
  (`deleteScope`), `:180` (`deleteAcl`).
- **Category:** #17 inconsistent action verbs.
- **Current:** `Put` for ACLs and secrets, `Create` for scopes, `Delete`
  for all three. No `Update`.
- **Issue:** A consumer who learned `createScope` will not guess that the
  way to create or update a secret is `putSecret`, not `createSecret` or
  `setSecret`. The JSDoc itself says "Inserts a secret" (client.ts:607) and
  "Creates or overwrites the ACL" (client.ts:551) — three different verbs
  for the same upsert semantic.
- **Suggestion:** unify on one verb pair: either
  (a) `Create*` for new + `Update*` for existing, or
  (b) `Put*` (upsert) consistently, also renaming `createScope` → `putScope`.
  Picking either gets rid of the asymmetry. Note that the underlying REST
  endpoints are `/secrets/scopes/create`, `/secrets/acls/put`,
  `/secrets/put` — so the wire format is *also* inconsistent and the
  generator is faithfully reproducing it.

### H6. Scope name field `scope` is severely overloaded across types

- **Files / lines:** `src/v1/model.ts:53` (`CreateScope.scope`), `:67`
  (`DeleteAcl.scope`), `:77` (`DeleteScope.scope`), `:85`
  (`DeleteSecret.scope`), `:95` (`GetAcl.scope`), `:102` (`GetSecret.scope`),
  `:117` (`ListAcls.scope`), `:137` (`ListSecrets.scope`), `:148`
  (`PutAcl.scope`), `:160` (`PutSecret.scope`). Then `SecretScope.name`
  (`:198`) names the same value, and the *type* `SecretScope` describes
  what `scope` actually contains. Then `ScopeBackendType` describes the
  scope's backend.
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

### H7. `PutSecret.value` discriminated union has cryptic `$case` discriminator field

- **File / line:** `src/v1/model.ts:163-174`.
- **Category:** #14 Go/Java-style name, #15 generic field names.
- **Current:**
  ```ts
  value?:
    | { $case: 'stringValue'; stringValue: string }
    | { $case: 'bytesValue'; bytesValue: Uint8Array }
    | undefined;
  ```
- **Issue:** `$case` is the ts-proto-style discriminator marker, not a TS
  convention. Idiomatic TS uses a domain-specific tag (`type`, `kind`,
  `format`). Worse, the *case names* (`stringValue`, `bytesValue`) duplicate
  the *property names* (`stringValue`, `bytesValue`) — so
  `value.stringValue` is the read path, `value.$case === 'stringValue'` is
  the guard. The redundancy makes the union three things in one (`$case`,
  the value, the type) where one would suffice.
- **Suggestion:** either a plain union
  `value: { format: 'string'; data: string } | { format: 'bytes'; data: Uint8Array }`
  or, since at the wire level the server expects one of two top-level
  fields `string_value` / `bytes_value`, model it as two optional fields
  with an exactly-one-of constraint enforced at runtime.
- **See also:** Repo-wide pattern; the `credentials` audit catalogues the
  same `$case` discriminator in many places.

### H8. `value` field on `PutSecret` and `GetSecret_Response` carries no domain hint

- **Files / lines:** `src/v1/model.ts:112` (`GetSecret_Response.value:
  Uint8Array`); `:163-174` (`PutSecret.value`).
- **Category:** #1 vague/generic, #15 generic field names.
- **Issue:** A field literally named `value` on a `Uint8Array` is the
  flattest possible name. With nothing to disambiguate, the reader has to
  read the JSDoc to know it is *the secret payload* (not a metadata value,
  a hash, etc.). Compare with `SecretMetadata.lastUpdatedTimestamp` (#L10
  below) which is fully qualified.
- **Suggestion:** `secretValue` or `secretBytes`. The JSDoc itself says
  "The value of the secret" — fold that into the identifier.

---

## Medium Severity

### M1. `AclPermission` enum values are bare verbs

- **File / line:** `src/v1/model.ts:6-13`.
- **Category:** #2 redundant enum prefixes (inverse: no prefix at all).
- **Current:** `READ = 'READ'`, `WRITE = 'WRITE'`, `MANAGE = 'MANAGE'`.
- **Suggestion:** as-is is acceptable since the enum name (`AclPermission`)
  contributes the noun; `AclPermission.READ` reads as
  "ACL-permission-read". Flagging only because three other places in
  `model.ts` (the JSDoc) refer to the values as `"READ"`, `"WRITE"`,
  `"MANAGE"` — string-literal style. The TS enum auto-stringifies, so
  the wire-level value matches. Acceptable as-is.

### M2. `ScopeBackendType` enum values stutter `_KEYVAULT`

- **File / line:** `src/v1/model.ts:19-30`.
- **Category:** #2 redundant enum prefixes, #18 long enum values.
- **Current:** `DATABRICKS = 'DATABRICKS'`, `AZURE_KEYVAULT = 'AZURE_KEYVAULT'`.
- **Suggestion:** values are externally-mandated wire strings; cannot
  change. The enum *member identifier* could be `AzureKeyvault` (PascalCase)
  while keeping the wire value `'AZURE_KEYVAULT'`. Flagging because:
  - The string casing of `KEYVAULT` (one word) clashes with surrounding
    code (`AzureKeyVault` — two-word casing in type names like
    `AzureKeyVaultSecretScopeMetadata`).
  - Three different spellings of "key vault" in one file: `KEYVAULT` (enum
    value), `KeyVault` (type names), and `keyvault` (field names like
    `keyvaultMetadata`, `backendAzureKeyvault`).
- **See also:** M3 below.

### M3. `KeyVault` / `KeyvaultMetadata` / `keyvault` casing inconsistency

- **Files / lines:**
  - `model.ts:29` `AZURE_KEYVAULT` (one word, upper).
  - `model.ts:44` `AzureKeyVaultSecretScopeMetadata` (two words, "Vault").
  - `model.ts:59` `backendAzureKeyvault` (one word, lower-camel).
  - `model.ts:202` `keyvaultMetadata` (one word, lower-camel).
  - `model.ts:215` `unmarshalAzureKeyVaultSecretScopeMetadataSchema` (two
    words, "Vault").
  - `model.ts:308` `keyvault_metadata` (the *wire* form).
  - `model.ts:333` `marshalAzureKeyVaultSecretScopeMetadataSchema`.
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

### M4. `AzureKeyVaultSecretScopeMetadata` is 33 characters long

- **File / line:** `src/v1/model.ts:44`.
- **Category:** #7 overly verbose.
- **Current:** `AzureKeyVaultSecretScopeMetadata`.
- **Suggestion:** since the type only appears in the context of
  `SecretScope.keyvaultMetadata` and `CreateScope.backendAzureKeyvault`,
  it could be `KeyVaultBackend` or `AzureKeyVaultBackend` — both shorter
  and clearer that it's the backend configuration, not arbitrary metadata.
- **Rationale:** "Metadata" is the most generic possible suffix and tells
  the reader nothing the surrounding name doesn't. The field `resourceId`
  and `dnsName` are the two real pieces of information — they're
  *configuration*, not metadata about anything.

### M5. `AzureKeyVaultSecretScopeMetadata.resourceId` is underspecified

- **File / line:** `src/v1/model.ts:46`.
- **Category:** #19 underspecified IDs.
- **Current:** `resourceId?: string | undefined`.
- **JSDoc:** "The resource id of the azure KeyVault that user wants to
  associate the scope with."
- **Suggestion:** `azureResourceId` or `keyVaultResourceId`. As-is, a
  reader sees `metadata.resourceId` and has no idea it's an Azure ARM
  Resource ID — it could be a Databricks resource ID, a UC resource ID,
  etc.

### M6. `AzureKeyVaultSecretScopeMetadata.dnsName` is underspecified

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

### M7. `AclItem` is generic-suffix tautology

- **File / line:** `src/v1/model.ts:36`.
- **Category:** #20 type-suffix tautology, #15 generic field names.
- **Current:** `AclItem` describes "an ACL rule". The `Item` suffix is
  meaningless.
- **Suggestion:** rename to `Acl` or `AclEntry` or `AclRule`. The
  enclosing `ListAcls_Response.items: AclItem[]` is then
  `ListAcls_Response.acls: Acl[]`. The Go SDK uses `AclItem`, but in TS
  the suffix doesn't carry weight: `AclItem` and `AclRule` carry exactly
  the same information.
- **Rationale:** Look at the surrounding code:
  - `ListAcls_Response.items` (`model.ts:123`) — the field is `items`, not
    `acls`. Generic name lost the domain.
  - JSDoc on `:122` says "The associated ACLs rule applied to principals"
    — so the type is conceptually "an ACL rule", but it's spelled
    "AclItem". The doc disagrees with the name.

### M8. `SecretMetadata` describes a list-item, not metadata

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

### M9. `SecretMetadata.lastUpdatedTimestamp` carries unit in name but not type

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

### M10. `SecretScope.backendType` vs `CreateScope.scopeBackendType`

- **Files / lines:** `src/v1/model.ts:200` (`SecretScope.backendType`),
  `:57` (`CreateScope.scopeBackendType`).
- **Category:** #1 vague/generic, #13 verb-tense inconsistency (form).
- **Current:** the very same enum-typed field appears as `backendType` on
  the response shape and `scopeBackendType` on the request shape.
- **Suggestion:** pick one. `backendType` is sufficient since both types
  are scope-related and the prefix `scope` is redundant.
- **Rationale:** Inconsistent naming for the same conceptual field is
  pure noise; a consumer mapping a `SecretScope` back to a `CreateScope`
  re-creation will trip on the field-name mismatch.

### M11. `CreateScope.backendAzureKeyvault` vs `SecretScope.keyvaultMetadata`

- **Files / lines:** `src/v1/model.ts:59`, `:202`.
- **Category:** #12 duplicate concepts, #1 vague/generic.
- **Current:** the same conceptual field (`AzureKeyVaultSecretScopeMetadata`
  payload, the backend configuration for an Azure KeyVault scope) is named
  `backendAzureKeyvault` on `CreateScope` and `keyvaultMetadata` on
  `SecretScope`. Both names describe the same payload at the same role
  (the KeyVault backend config) but use different framings.
- **Suggestion:** rename both to the same — `keyVaultBackend` (preferred,
  short, describes role) or `azureKeyVaultBackend`. Then `CreateScope` and
  `SecretScope` round-trip naturally.

### M12. `CreateScope.initialManagePrincipal` is verbose

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

### M13. `GetSecret_Response` returned by `getSecret` carries `key` redundantly

- **File / line:** `src/v1/model.ts:108-113`.
- **Category:** #12 duplicate concepts (request → response).
- **Current:** `GetSecret_Response { key?: string; value?: Uint8Array }`.
  The caller has just passed `key` in via `GetSecret.key`, so they have it.
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

### M14. `ListAcls_Response.items` should be `ListAcls_Response.acls`

- **File / line:** `src/v1/model.ts:123`.
- **Category:** #15 generic field name losing meaning.
- **Current:** `items?: AclItem[] | undefined`.
- **Suggestion:** `acls: Acl[]` (combined with M7).
- **Rationale:** Compare to `ListScopes_Response.scopes` (`:132`) and
  `ListSecrets_Response.secrets` (`:143`) which both use the domain-typed
  plural. `items` is the odd-one-out; the field name should match the
  pattern.

### M15. `marshalXxxSchema` / `unmarshalXxxSchema` const naming is Go-style

- **File / line:** `src/v1/model.ts:205, 215, 227, 231, 235, 239, 243,
  258, 267, 277, 287, 291, 294, 304, 318, 328, 344, 354, 362, 372, 384`.
- **Category:** #14 Go/Java-style names, #20 type-suffix tautology.
- **Current:** `marshalCreateScopeSchema: z.ZodType`,
  `unmarshalAclItemSchema: z.ZodType<AclItem>`, etc.
- **Suggestion:** TS idiom is `encode`/`decode` or `serialize`/`deserialize`.
  `Schema` is also tautological since the value is a `z.ZodType` —
  `aclItemDecoder`, `createScopeEncoder` would be type-self-describing.
- **Rationale:** Generator-wide convention (same defect cited in many
  audits, e.g. `credentials.md` #53). Cannot be fixed in isolation.

---

## Low Severity

### L1. `unmarshalAclItemSchema` parses `permission: z.enum(AclPermission)` without strictness

- **File / line:** `src/v1/model.ts:208`.
- **Category:** observation; not a naming defect strictly, but worth noting.
- **Issue:** `z.enum(AclPermission)` accepts the *string values* of the
  enum (`'READ' | 'WRITE' | 'MANAGE'`). If the server adds a new permission
  level, zod will throw at decode. Not a name issue, just notable.

### L2. `PutSecret.value` discriminator names duplicate property names

- **File / line:** `src/v1/model.ts:165-174`.
- **Category:** #15 generic field names, #20 type-suffix tautology.
- **Current:** `{ $case: 'stringValue', stringValue: string }`. The
  discriminator value is the same string as the property name.
- **Issue:** `value.stringValue` is the access path; `value.$case` is the
  guard, also `'stringValue'`. The redundancy bloats every read site.
- **Suggestion:** `{ $case: 'string', value: string } | { $case: 'bytes',
  value: Uint8Array }`. The discriminator becomes a clean enum-of-strings,
  the value field has a uniform name.

### L3. `PutSecret.value` `stringValue` JSDoc references "UTF-8 (MB4)"

- **File / line:** `src/v1/model.ts:167`.
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
  in which the permission is applied." `client.ts:550-583` clarifies:
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
  - `CreateScope.scope`: "Scope name requested by the user. Scope names
    are unique."
  - `DeleteAcl.scope`: "The name of the scope to remove permissions from."
  - `DeleteScope.scope`: "Name of the scope to delete." (no "the")
  - `DeleteSecret.scope`: "The name of the scope that contains the secret
    to delete."
- **Suggestion:** the JSDocs are written by hand per-operation, with minor
  grammar variation. Not a naming defect; flagging because it makes
  cross-reference annoying.

### L6. `ScopeBackendType` values include only two cases despite the JSDoc

- **File / line:** `src/v1/model.ts:16-30`.
- **Category:** observation.
- **JSDoc:** "Azure KeyVault backed secret scopes will be supported in a
  later release." The release shipped; the doc string is stale. Not a
  naming issue but indicates the file is not maintained tightly.

### L7. `marshal*Schema` types use bare `z.ZodType` (no type argument)

- **Files / lines:** `model.ts:318, 328, 344, 354, 362, 372, 384`.
- **Category:** asymmetry; #20 type-suffix tautology.
- **Current:** `marshalCreateScopeSchema: z.ZodType = ...` — no type
  parameter. Compare with `unmarshalAclItemSchema: z.ZodType<AclItem>`.
- **Suggestion:** mirror the input shape on the marshal side
  (`marshalCreateScopeSchema: z.ZodType<CreateScope>`). As-is, the
  marshal path has no type guarantee — `marshalCreateScopeSchema.parse({
  scope: 123 })` would not type-check the input.

### L8. `flattenQueryParams` is dead code in this package

- **File / line:** `src/v1/utils.ts:123`.
- **Category:** #21 dead code.
- **Issue:** function defined but not imported in `client.ts`. The client
  builds query strings inline (`client.ts:307-315, :370-377, :425-429,
  :525-528`). Same defect noted in `credentials.md` #57 — appears
  generator-wide.
- **Suggestion:** drop dead code, or move it to a shared utils package.

### L9. `executeCall` vs `executeHttpCall` name collision

- **Files / lines:** `src/v1/utils.ts:26, 65`.
- **Category:** #17 inconsistent action verbs.
- **Current:** two `execute*` functions with overlapping vocabulary:
  `executeCall` (sets options + dispatches retries) and `executeHttpCall`
  (one HTTP roundtrip). Same defect cataloged in other audits.

### L10. `parseResponse` vs `marshalRequest` mix verbs

- **Files / lines:** `src/v1/utils.ts:113, 119`.
- **Category:** #17 inconsistent action verbs.
- **Current:** mixing `parse`/`marshal` for symmetric encode/decode
  responsibilities. Should be `parseResponse` + `formatRequest`, or
  `unmarshalResponse` + `marshalRequest`.

### L11. `PACKAGE_SEGMENT` constant is vague

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

- **Files / lines:** see H6.
- The generator marks every proto field optional. The runtime contract
  requires `scope` for ten of eleven operations. Not a naming defect but
  worth noting: the type is wider than the API allows.

### O2. `CreateScope` request fields are out of order vs. domain intuition

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

### O4. `marshalPutSecretSchema` does a `btoa` on the bytes value

- **File / line:** `src/v1/model.ts:393-397`.
- The `bytesValue` field is encoded via `btoa(Array.from(d, b =>
  String.fromCharCode(b)).join(''))`. This is the legacy Web base64 path
  (not name-related). Modern code would use `Buffer.from(d).toString(
  'base64')` (Node) or a polyfill. Not a naming defect.

### O5. The `Secret` noun is absent from this package's exports

- **Files / lines:** `src/v1/index.ts`, `model.ts`.
- The package is called `secrets` but exports `SecretScope`,
  `SecretMetadata`, and various `Secret*` operations. There is no bare
  `Secret` type. The closest is `GetSecret_Response { key, value }` —
  the actual full secret. Compare to the sibling `secretsuc` package
  which exports a top-level `Secret` type (`secretsuc/model.ts:89`).
- Naming the type would help: e.g., `Secret { key, value }`. As-is, the
  package's primary domain entity has no named type.

---

## Recommended renames (high-confidence, in priority order)

1. `Client` → `SecretsClient` (H2).
2. `CreateScope_Response`, `DeleteAcl_Response`, `DeleteScope_Response`,
   `DeleteSecret_Response`, `GetSecret_Response`, `ListAcls_Response`,
   `ListScopes_Response`, `ListSecrets_Response`, `PutAcl_Response`,
   `PutSecret_Response` → strip underscore (H3).
3. `CreateScope`, `DeleteAcl`, `DeleteScope`, `DeleteSecret`, `GetAcl`,
   `GetSecret`, `ListAcls`, `ListScopes`, `ListSecrets`, `PutAcl`,
   `PutSecret` → suffix with `Request` to match sibling
   `secretsuc` (H4).
4. Verb harmonization: pick `Create`/`Update` *or* `Put` and apply
   consistently across all mutating methods (H5).
5. `scope: string` field on every request type → `scopeName: string` (H6).
6. `AclItem` → `Acl` or `AclEntry`; `ListAcls_Response.items` →
   `ListAclsResponse.acls` (M7, M14).
7. `SecretMetadata` → `SecretSummary` or `SecretInfo` (M8).
8. `SecretMetadata.lastUpdatedTimestamp` → `lastUpdatedAt` (M9).
9. Casing standardization: `KeyVault` everywhere (`keyVaultMetadata`,
   `backendAzureKeyVault`) (M3).
10. `AzureKeyVaultSecretScopeMetadata.dnsName` → `vaultUri` (M6).
11. `AzureKeyVaultSecretScopeMetadata.resourceId` → `azureResourceId` or
    `keyVaultResourceId` (M5).
12. `SecretScope.backendType` ↔ `CreateScope.scopeBackendType` → pick one
    (`backendType`) (M10).
13. `CreateScope.backendAzureKeyvault` ↔ `SecretScope.keyvaultMetadata`
    → pick one (`keyVaultBackend`) (M11).
14. `marshalXxxSchema` / `unmarshalXxxSchema` → `encodeXxx` / `decodeXxx`
    (M15, repo-wide; not isolated to this package).
