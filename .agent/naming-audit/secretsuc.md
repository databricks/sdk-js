# Naming Audit: secretsuc

**Path:** `packages/secretsuc/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog (UC) secrets — three-level namespaced (`catalog.schema.secret`) credential objects that store passwords/tokens/keys. Distinct from the workspace-level `secrets` package (scopes + key/value pairs). REST root is `/api/2.1/unity-catalog/secrets`.
**Total weird names flagged:** 14

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 5 |
| Low | 1 |
| Observation | 4 |

## High severity

### 1. Package name `secretsuc` — `packages/secretsuc/`, `package.json:2`
- **Why weird:** Two words mashed together with no separator: `secrets` + `uc`. The result reads as "secret-suc" or a single nonsense word. `uc` is a two-letter cryptic abbreviation that is never expanded anywhere in the public TypeScript surface — neither the `Client` class, the `Secret` interface, nor any field or constant mentions "UnityCatalog" or "Uc". The only places "Unity Catalog" appears at all are (a) JSDoc prose, (b) the URL path `/api/2.1/unity-catalog/secrets`, and (c) the `Secret` interface JSDoc. The package directory is the only carrier of the disambiguator, and it's silent in code.
- **Category:** 5 (cryptic abbreviation), 12 (duplicate concept against `packages/secrets/`), 6 (misleading — `secretsuc` looks like a typo or a verb suffix).
- **Suggested name:** `secrets-unity-catalog`, `unitycatalogsecrets`, or `ucsecrets` (all worse than expanding fully). Best: rename package to `unitycatalogsecrets` (matching pattern of `unitycatalogvolumes` etc. used elsewhere) or move the secrets type into a sub-namespace of a unified `unitycatalog` package. At a minimum, separate the words: `secrets-uc` or `secretsUc` is still wrong; the actual readable form is **`secrets-unitycatalog`** or **`unitycatalog-secrets`**.
- **Rationale:** A package name is the most user-facing identifier in any SDK — it appears in every `import` line and every `package.json` dependency entry. `secretsuc` fails three tests at once: (a) it is unreadable on first sight (where does the word boundary fall?); (b) it hides the disambiguator that separates it from `secrets`; (c) it embeds an undefined two-letter token. Compare with workspace-level peer `secrets`: a user installing both gets `@databricks/sdk-secrets` and `@databricks/sdk-secretsuc`, with no hint from the names which one targets workspaces and which targets Unity Catalog. The `uc` suffix is the entire semantic load and it's mute.

### 2. `Client` class collides with `secrets` package at the import level — `src/v1/client.ts:41`
- **Why weird:** Bare `Client` for the secret-management API. After `import {Client} from '@databricks/sdk-secretsuc/v1'` the caller has a symbol named `Client` with no domain hint. If the caller also imports from `@databricks/sdk-secrets/v1`, they get two identifiers both called `Client` — they must alias both at import. The collision is sharpest for `secrets` vs `secretsuc`: both export `Client` from the same overall scope, so a user with both deps has to write `import {Client as UcSecretsClient} from '@databricks/sdk-secretsuc/v1'`.
- **Category:** 1 (vague), 12 (duplicate concept — every package exports `Client`), 6 (misleading — no hint of which domain it serves).
- **Suggested name:** `SecretsClient`, or better, `UnityCatalogSecretsClient`.
- **Rationale:** Every generated package in this SDK exports `Client`; auditing one package can't fix the convention. But the pain is sharpest for `secrets` vs `secretsuc`, which is why this finding is scoped to that import-level collision.

### 3. `Secret` interface is overloaded as create-input, update-input, and read-output — `src/v1/model.ts:89`
- **Why weird:** Same word used by the sibling `@databricks/sdk-secrets` package's `SecretMetadata`/`PutSecret` types. A consumer with both packages cannot import `Secret` from either without aliasing. The type also doubles as the entity returned from `getSecret`, the input shape embedded in `CreateSecretRequest.secret`, and the update payload embedded in `UpdateSecretRequest.secret`. Its fields mix read-only (`createTime`, `metastoreId`, `effectiveOwner`) with write-only (`value`) with read-write (`comment`, `owner`).
- **Category:** 12 (duplicate concept — different `Secret` exists at workspace level), 6 (misleading — single type for create-input + read-output + update-input means many fields are conditionally valid).
- **Suggested name:** `UnityCatalogSecret` for the type. Splitting into `CreateSecretInput` / `Secret` / `UpdateSecretInput` is the structural fix that would surface the read/write asymmetry in the type system.
- **Rationale:** Even if the package rename happens, the type name `Secret` carries no UC-specific signal. Users wiring up both APIs will collide. Beyond the collision, one type for three lifecycle stages means callers cannot tell from the type which fields are writable on input and which are server-populated on output.

### 4. `fullName` is the routing key but marked optional — `src/v1/model.ts:23,32,115,152`
- **Why weird:** `fullName` is the only routing identifier for `DeleteSecret`, `GetSecret`, and `UpdateSecret` (the URL path is `/api/2.1/unity-catalog/secrets/${req.fullName ?? ''}` — `client.ts:109,136,244`). When unset, the client substitutes the empty string, producing a `DELETE /api/2.1/unity-catalog/secrets/` request that quietly hits the wrong endpoint. The TS type marks it `string | undefined`. Same field on `Secret` is also optional, which is correct for a returned object but wrong for the request DTO.
- **Category:** 6 (misleading — looks optional, isn't), 16 (field type contradicts domain — required key marked optional).
- **Suggested name:** Keep the name, drop `| undefined` on the three request DTOs (or split: `Secret.fullName?` for responses, `SecretRef.fullName` required for requests).
- **Rationale:** This is a routing identifier; the TS type system can prevent a whole class of "I forgot the name" bugs and the SDK can stop substituting empty strings.

## Medium severity

### 5. `Secret` mixes effective (server-resolved) and direct (caller-set) fields — `src/v1/model.ts:126`
- **Why weird:** The single `Secret` type carries write-only `value` alongside read-only `effectiveValue`, `effectiveOwner`, `createTime`, `createdBy`, `updateTime`, `updatedBy`, `metastoreId`, `browseOnly`. The shared type is used on both create (`client.ts:80`) and update (`client.ts:251`) paths. Callers cannot tell from the type which fields are writable on input and which are server-populated on output, and the `effective*` pairs (owner/effectiveOwner, value/effectiveValue) put the resolved and directly-set values next to each other without a structural distinction.
- **Category:** 11 (single type wearing two hats), 6 (misleading).
- **Suggested name:** Split into `WritableSecret` / `Secret`, or `SecretCreateInput` / `SecretUpdateInput` / `Secret`.
- **Rationale:** The single-type approach forces every consumer to know which fields are write-permitted. The field-mask on update (`updateMask` — `model.ts:162`) partially mitigates but doesn't substitute for type-level intent.

### 6. `UpdateSecretRequest.secret` is the *update payload* with `fullName` as routing key — `src/v1/model.ts:147-163`
- **Why weird:** `UpdateSecretRequest` has both `fullName` (routing) and `secret` (payload). The nested `secret.fullName` is meaningless — what if it differs from the outer `fullName`? The whole `secret`, including its own optional `fullName`, is serialised into the PATCH body even though the path is keyed by the outer `req.fullName`.
- **Category:** 6 (misleading — two `fullName`s can disagree), 17 (inconsistency — same field appearing twice in one logical operation).
- **Suggested name:** Either define `SecretUpdate` (omits `fullName`, `createTime`, etc.) or rely on the field-mask to ignore non-listed fields. Naming-wise: rename the outer to `name`/`secretFullName` to emphasise it's the routing key, not part of the payload.
- **Rationale:** This is a real bug surface: callers will write `{fullName: 'a.b.c', secret: {fullName: 'x.y.z', ...}}` and wonder why renames don't work.

### 7. `ListSecretsRequest.catalogName` + `schemaName` as filters but documented as required-when-paired — `src/v1/model.ts:46,51`
- **Why weird:** JSDoc says "Both **catalog_name** and **schema_name** must be specified together". TS type marks both optional. The "must be specified together" constraint is enforced at the server, not in the type. A more honest shape would be `{ scope?: {catalogName: string; schemaName: string} | undefined }` so the pair must be set atomically.
- **Category:** 16 (field type contradicts domain — "must be together" not expressible).
- **Suggested name:** Keep names, group into a `scope` sub-object so paired-ness is type-enforced.
- **Rationale:** Internal grouping fix; not strictly a naming finding. Listed because the field names alone don't communicate the constraint, and the type system isn't carrying the weight.

### 8. `pageToken` / `nextPageToken` asymmetry — `src/v1/model.ts:61,81`
- **Why weird:** Request uses `pageToken`, response uses `nextPageToken`. Internally consistent with conventions across the SDK, but the asymmetry between "what I send" and "what I receive next time" is something the type system can't help with. The pagination iterator (`client.ts:227`) bridges them via `pageReq.pageToken = resp.nextPageToken`.
- **Category:** 17 (action-verb / qualifier asymmetry between request and response).
- **Suggested name:** Accept the convention (`nextPageToken` is the next page; you copy it to `pageToken` on the next request). Listed for completeness.
- **Rationale:** Generator convention; this isn't really a naming defect — flagged because rules 14 and 17 both ask about cross-DTO consistency.

### 9. `pageSize` semantic overloading: 0/negative/positive have distinct meanings — `src/v1/model.ts:62-70`
- **Why weird:** JSDoc enumerates four meanings of `pageSize`: unset = 10000, positive = min(value, 10000), zero = 10000, negative = error. The field type is `number | undefined` which expresses none of those. A reader of the type signature alone would believe any number works.
- **Category:** 16 (type contradicts domain — should be `positive integer | undefined`), 6 (misleading — zero has special meaning).
- **Suggested name:** Keep the name; consider a Zod refinement (`z.number().int().nonnegative()`) and document the zero-means-default specially.
- **Rationale:** API-level concern (the upstream API conflates "use default" and "0"); flagging at the SDK level because the type system is silent.

## Low severity

### 10. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:36`
- **Why weird:** Same constant repeated in every generated package. `Segment` is generic; reader needs the comment to learn it's the User-Agent identity segment.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `USER_AGENT_PACKAGE_ID` or `PACKAGE_USER_AGENT_SEGMENT`.
- **Rationale:** Same flag as in other generated packages; flagged for consistency.

## Observations

### 11. Action-verb convention in `Client`
`createSecret` / `deleteSecret` / `getSecret` / `listSecrets` / `updateSecret` — fully consistent CRUDL verbs. No mixed `fetch`/`retrieve`. (Good.)

### 12. Acronym casing for `Http` / `Url`
Same as other audited packages: `Http` (PascalCase capital-then-lower) coexists with `URLSearchParams` (ALLCAPS from Web standard). Convention inherited from broader JS ecosystem; not worth changing.
- **Category:** 3.

### 13. `Uc` abbreviation never expanded in code
Tracked thoroughly. The string "Uc" (in any case) does not appear in any identifier, type name, field name, constant, or enum value. "Unity Catalog" appears only in (a) JSDoc on `Secret` (`model.ts:85`), (b) JSDoc on `createSecret` / `listSecrets` / `updateSecret` (`client.ts:67,163,232`), and (c) the URL path string `/api/2.1/unity-catalog/secrets` (`client.ts:79,109,136,176,244`). The package name `secretsuc` is the **only** carrier of the disambiguator at the import level, and it's silent everywhere else. A consumer importing `Client` and `Secret` from this package, then opening their editor's symbol view, will see no hint that this is Unity-Catalog-scoped. See finding #1.
- **Category:** 5.

### 14. No enums in this package
No enum types are defined. (`secrets` workspace package has `AclPermission` and `ScopeBackendType`; `secretsuc` exposes none.) This avoids the enum-prefix and enum-value-length problems that other audited packages have. Worth noting because the audit checklist asks about enum issues.

## Domain glossary
- `uc` — Unity Catalog. Used in the **package name only**. Never expanded in any TS identifier. Spelled out in JSDoc prose ("Unity Catalog") and the URL path (`unity-catalog`).
- `BROWSE` / `MANAGE` / `READ_SECRET` / `CREATE_SECRET` / `USE SCHEMA` / `USE CATALOG` — Unity Catalog privilege names, referenced in JSDoc only (`client.ts:69,127,165`).
- `metastore` — Unity Catalog metastore (top of the catalog hierarchy). Referenced via `metastoreId` field.
- `securable` — Not used in this package, despite being core to UC. The hierarchy here (`catalog.schema.secret`) does not surface the term.
- `wkt` — Well-Known Types (`@databricks/sdk-core/wkt`), used for `FieldMask`.
- `oss`, `m2m`, `u2m`, `pat`, `iam`, `abac` — not encountered.

## File coverage
- `src/v1/model.ts` (296 lines): read fully.
- `src/v1/client.ts` (276 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (15 lines): read fully.
- `package.json`: spot-checked for package metadata.

## Cross-package notes
- `packages/secrets/` (workspace-level Secrets API): exports `AclPermission`, `AclItem`, `CreateScope`, `DeleteAcl`, `DeleteSecret`, `GetSecret`, `ListAcls`, `ListScopes`, `ListSecrets`, `PutAcl`, `PutSecret`, `SecretMetadata`, `SecretScope`, `ScopeBackendType`. **Same concept noun (`Secret`) exists in both packages with incompatible shapes.** A consumer with both deps faces name collisions on `Client`, `DeleteSecret`/`DeleteSecretRequest`, `GetSecret`/`GetSecretRequest`, `ListSecrets`/`ListSecretsRequest`, and the workspace-side `PutSecret` vs UC-side `Secret`.
- The workspace-level `secrets` package has its own naming problems (`PutSecret`, the `key` / `value` flat shape vs UC's three-level `Secret` shape). Out of scope for this audit; flagged because the SDK design choice to have two separate packages multiplies the surface area.
