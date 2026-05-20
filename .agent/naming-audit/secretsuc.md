# Naming Audit: secretsuc

**Path:** `packages/secretsuc/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog (UC) secrets — three-level namespaced (`catalog.schema.secret`) credential objects that store passwords/tokens/keys. Distinct from the workspace-level `secrets` package (scopes + key/value pairs). REST root is `/api/2.1/unity-catalog/secrets`.
**Total weird names flagged:** 24

## Summary
| Severity | Count |
| --- | --- |
| High | 8 |
| Medium | 8 |
| Low | 4 |
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

### 4. `externalSecretId` — `src/v1/model.ts:143`
- **Why weird:** Completely undocumented field (no JSDoc comment, unlike every other field on `Secret`). The wire field exists in the field-mask but is not in the field-mask's documented "Supported fields" list (`value, comment, owner, expire_time` — `client.ts:238`). The field's existence and semantics are entirely opaque to a reader of the model file.
- **Category:** 1 (vague — what is "external"?), 6 (misleading — undocumented field that is presumably real), 19 (underspecified id — alongside `metastoreId` and `fullName`).
- **Suggested name:** Keep the name but ship JSDoc; or `externalSecretReference` / `externalProviderSecretId` if the field points at an external secret manager (AWS Secrets Manager, etc.).
- **Rationale:** A bare `externalSecretId` next to `metastoreId` and `fullName` invites the reader to guess. JSDoc is the cheapest fix; renaming to disclose the "external store" intent is the better one. This may be a generator gap (missing API description), worth flagging upstream so the description is included.

### 5. `value` field on `Secret` doubles as both input and output — `src/v1/model.ts:126`
- **Why weird:** Doc says "This field is input-only and is not returned in responses". Same struct has `effectiveValue` (`model.ts:131`) for the output. Two near-identical fields, one input-only, one output-only, both meaning "the secret value". Generic name `value` is also category-1 vague — without the doc, "value" could mean any value in any struct.
- **Category:** 1 (vague), 6 (misleading — same name covers both write-only-input and a sibling read-only-output), 11 (input-only field on a shared input/output type forces the reader to know the direction).
- **Suggested name:** `secretValue` (for symmetry with `effectiveValue`), or split into `CreateSecretInput.value` / `Secret.effectiveValue` so the asymmetry surfaces in the type system. Alternatively rename `effectiveValue` -> `value` and have a separate write-only `newValue` on update.
- **Rationale:** The current shape relies entirely on the JSDoc to inform the reader which field to set on input and which to read on output. A buggy caller can set `effectiveValue` on a create call and the SDK will serialise it to the wire (where the server presumably ignores it). The TS type system should keep the asymmetry visible.

### 6. `effectiveValue` / `effectiveOwner` "effective" prefix — `src/v1/model.ts:101,131`
- **Why weird:** Two unrelated `effective*` fields used with two different meanings. `effectiveOwner` is documented as "the effective owner of the secret, which may differ from the directly-set **owner** due to inheritance" — so "effective" = "after inheritance resolution". `effectiveValue` is documented as "the secret value. Only populated in responses when you have the **READ_SECRET** privilege" — so "effective" = "the actual readable value, not what was sent in". Two distinct semantics under one prefix.
- **Category:** 6 (misleading — "effective" implies inheritance everywhere but here doubles as "actually readable").
- **Suggested name:** Rename `effectiveValue` -> `currentValue` or `readValue` to free `effective*` for the inheritance sense; or rename `effectiveOwner` -> `inheritedOwner` / `resolvedOwner`.
- **Rationale:** Same prefix, two meanings, within five lines of each other. A reader scanning the struct picks up the first definition and applies it to the second, leading to a wrong mental model. The fact that `effectiveValue` is documented to be populated based on a privilege (not inheritance) makes the prefix actively misleading.

### 7. `fullName` is the routing key but marked optional — `src/v1/model.ts:23,32,115,152`
- **Why weird:** `fullName` is the only routing identifier for `DeleteSecret`, `GetSecret`, and `UpdateSecret` (the URL path is `/api/2.1/unity-catalog/secrets/${req.fullName ?? ''}` — `client.ts:109,136,244`). When unset, the client substitutes the empty string, producing a `DELETE /api/2.1/unity-catalog/secrets/` request that quietly hits the wrong endpoint. The TS type marks it `string | undefined`. Same field on `Secret` is also optional, which is correct for a returned object but wrong for the request DTO.
- **Category:** 6 (misleading — looks optional, isn't), 16 (field type contradicts domain — required key marked optional).
- **Suggested name:** Keep the name, drop `| undefined` on the three request DTOs (or split: `Secret.fullName?` for responses, `SecretRef.fullName` required for requests).
- **Rationale:** This is a routing identifier; the TS type system can prevent a whole class of "I forgot the name" bugs and the SDK can stop substituting empty strings.

### 8. `includeBrowse` parameter — `src/v1/model.ts:37,56`
- **Why weird:** Boolean flag named `includeBrowse` reads as "include browse" with no clarification of what "browse" means. JSDoc clarifies it gates returning secrets the caller only has BROWSE privilege on. Without the doc, the field name is opaque. Same pattern (`browseOnly` on `Secret`, `model.ts:136`) reuses the bare verb. `BROWSE` here is a permission name, not an action.
- **Category:** 1 (vague — "browse" is undefined without ACL context), 5 (cryptic without docs).
- **Suggested name:** `includeBrowseOnlySecrets` / `includeMetadataOnly` for the request flag; `metadataOnly` for the response field (`browseOnly` reads as a constraint, but is actually a "you only got metadata back" marker).
- **Rationale:** "Browse" is jargon from the Unity Catalog access-control vocabulary. Cross-package consistency matters more than internal cleverness — but the name is the first thing a consumer sees, before the JSDoc. Expanding to "browse-only" or "metadata-only" makes the field self-documenting.

## Medium severity

### 9. `Secret` mixes effective (server-resolved) and direct (caller-set) fields — `src/v1/model.ts:126`
- **Why weird:** The single `Secret` type carries write-only `value` alongside read-only `effectiveValue`, `effectiveOwner`, `createTime`, `createdBy`, `updateTime`, `updatedBy`, `metastoreId`, `browseOnly`. The shared type is used on both create (`client.ts:80`) and update (`client.ts:251`) paths. Callers cannot tell from the type which fields are writable on input and which are server-populated on output, and the `effective*` pairs (owner/effectiveOwner, value/effectiveValue) put the resolved and directly-set values next to each other without a structural distinction.
- **Category:** 11 (single type wearing two hats), 6 (misleading).
- **Suggested name:** Split into `WritableSecret` / `Secret`, or `SecretCreateInput` / `SecretUpdateInput` / `Secret`.
- **Rationale:** The single-type approach forces every consumer to know which fields are write-permitted. The field-mask on update (`updateMask` — `model.ts:162`) partially mitigates but doesn't substitute for type-level intent.

### 10. `UpdateSecretRequest.secret` is the *update payload* with `fullName` as routing key — `src/v1/model.ts:147-163`
- **Why weird:** `UpdateSecretRequest` has both `fullName` (routing) and `secret` (payload). The nested `secret.fullName` is meaningless — what if it differs from the outer `fullName`? The whole `secret`, including its own optional `fullName`, is serialised into the PATCH body even though the path is keyed by the outer `req.fullName`.
- **Category:** 6 (misleading — two `fullName`s can disagree), 17 (inconsistency — same field appearing twice in one logical operation).
- **Suggested name:** Either define `SecretUpdate` (omits `fullName`, `createTime`, etc.) or rely on the field-mask to ignore non-listed fields. Naming-wise: rename the outer to `name`/`secretFullName` to emphasise it's the routing key, not part of the payload.
- **Rationale:** This is a real bug surface: callers will write `{fullName: 'a.b.c', secret: {fullName: 'x.y.z', ...}}` and wonder why renames don't work.

### 11. `ListSecretsRequest.catalogName` + `schemaName` as filters but documented as required-when-paired — `src/v1/model.ts:46,51`
- **Why weird:** JSDoc says "Both **catalog_name** and **schema_name** must be specified together". TS type marks both optional. The "must be specified together" constraint is enforced at the server, not in the type. A more honest shape would be `{ scope?: {catalogName: string; schemaName: string} | undefined }` so the pair must be set atomically.
- **Category:** 16 (field type contradicts domain — "must be together" not expressible).
- **Suggested name:** Keep names, group into a `scope` sub-object so paired-ness is type-enforced.
- **Rationale:** Internal grouping fix; not strictly a naming finding. Listed because the field names alone don't communicate the constraint, and the type system isn't carrying the weight.

### 12. `createTime` / `updateTime` / `expireTime` vs `createdBy` / `updatedBy` verb tense — `src/v1/model.ts:105,107,109,111,142`
- **Why weird:** Past-tense participle on the principal fields (`createdBy`, `updatedBy`) but plain noun on the timestamps (`createTime`, `updateTime`). A consistent convention would be either `createdAt` + `createdBy` (both past-tense, both anchored to event) or `createTime` + `creator` (both noun forms). Mixed forms read as inconsistent. `expireTime` is future tense ("will expire") so isn't symmetrical with `created`/`updated`.
- **Category:** 13 (verb-tense inconsistency).
- **Suggested name:** `createdAt` / `updatedAt` / `expiresAt` (or `expireAt`) for timestamps; keep `createdBy` / `updatedBy` for principals.
- **Rationale:** Common JS convention is `*At` for instant fields. The mixed `createTime` + `createdBy` pairing forces the reader to reconcile two tenses for one logical event.

### 13. `pageToken` / `nextPageToken` asymmetry — `src/v1/model.ts:61,81`
- **Why weird:** Request uses `pageToken`, response uses `nextPageToken`. Internally consistent with conventions across the SDK, but the asymmetry between "what I send" and "what I receive next time" is something the type system can't help with. The pagination iterator (`client.ts:227`) bridges them via `pageReq.pageToken = resp.nextPageToken`.
- **Category:** 17 (action-verb / qualifier asymmetry between request and response).
- **Suggested name:** Accept the convention (`nextPageToken` is the next page; you copy it to `pageToken` on the next request). Listed for completeness.
- **Rationale:** Generator convention; this isn't really a naming defect — flagged because rules 14 and 17 both ask about cross-DTO consistency.

### 14. `pageSize` semantic overloading: 0/negative/positive have distinct meanings — `src/v1/model.ts:62-70`
- **Why weird:** JSDoc enumerates four meanings of `pageSize`: unset = 10000, positive = min(value, 10000), zero = 10000, negative = error. The field type is `number | undefined` which expresses none of those. A reader of the type signature alone would believe any number works.
- **Category:** 16 (type contradicts domain — should be `positive integer | undefined`), 6 (misleading — zero has special meaning).
- **Suggested name:** Keep the name; consider a Zod refinement (`z.number().int().nonnegative()`) and document the zero-means-default specially.
- **Rationale:** API-level concern (the upstream API conflates "use default" and "0"); flagging at the SDK level because the type system is silent.

### 15. `metastoreId` field naming — `src/v1/model.ts:103`
- **Why weird:** `metastoreId` alongside `fullName`, `name`, `catalogName`, `schemaName`, `externalSecretId`, and (implied via comments) the policy id. Multiple identifier-like fields in one struct; bare `id` would be ambiguous, but `metastoreId` is fine in isolation. Flagged because the unqualified `externalSecretId` next to it gets less context.
- **Category:** 19 (underspecified id when multiple ids exist — applies to its neighbour, not this field).
- **Suggested name:** Keep `metastoreId`. Pair with renaming `externalSecretId` -> `externalSecretRef` or fully documenting it.
- **Rationale:** Borderline; raised because the struct already has too many distinct identifiers and clarity matters.

### 16. `name` (relative name) vs `fullName` (qualified name) on `Secret` — `src/v1/model.ts:91,115`
- **Why weird:** `name` is "The name of the secret, relative to its parent schema" and `fullName` is "The three-level (fully qualified) name". Two name fields, one short and one long; the bare `name` doesn't say "relative". An incoming consumer who sees `name` and `fullName` may write the relative name where the fully qualified one is expected and the request silently hits the wrong endpoint (see finding #7).
- **Category:** 1 (vague — `name` doesn't disclose its relative scope), 19 (multiple identifier-like fields).
- **Suggested name:** `relativeName` for `name`, or `schemaRelativeName`. Wire stays `name`.
- **Rationale:** When `fullName` is the routing key, `name` should disclose that it's the inferior, scope-relative one. Failing that, JSDoc must always be read.

## Low severity

### 17. `comment` vs documented "description" mismatch — `src/v1/model.ts:113`
- **Why weird:** Field named `comment` with JSDoc "User-provided free-form text description of the secret." The doc calls it a description; the field is called a comment. Same mismatch pattern as `abacpolicies.PolicyInfo.comment` (audit #28).
- **Category:** 6 (misleading — doc says description, name says comment), 17 (cross-package inconsistency).
- **Suggested name:** `description`.
- **Rationale:** SQL DDL leak; TS should adopt the noun the human-readable doc uses.

### 18. `owner` vs `effectiveOwner` shadowing — `src/v1/model.ts:96,101`
- **Why weird:** Both fields present on `Secret`. `owner` is what was set; `effectiveOwner` is what resolves through inheritance. Caller updating `owner` later reads back `effectiveOwner` and is surprised it didn't change (if a higher-scope owner is inherited). A reader without the doc cannot tell them apart by the name alone.
- **Category:** 17 (inconsistent — same logical concept exposed twice).
- **Suggested name:** Rename `owner` -> `explicitOwner` or `directOwner` to mirror `effectiveOwner`'s "resolved" framing.
- **Rationale:** Sibling pair should be obviously a pair. Reading `owner` and `effectiveOwner` side-by-side, the user has to consult the JSDoc to discover one is the raw input and one is the resolved output. Wire stays `owner`.

### 19. `Client.createSecret` / `deleteSecret` / `getSecret` / `listSecrets` / `updateSecret` — `src/v1/client.ts:75,105,132,172,240`
- **Why weird:** Method names redundantly include `Secret` even though the class is already secret-scoped. `client.createSecret(req)` reads okay, but inside a UC-secrets-only file `client.create(req)` would be cleaner. Compare with `pkgJson.scripts` ("build", "test") — context-scoped commands omit the noun.
- **Category:** 8 (redundant suffix — name repeats the class scope).
- **Suggested name:** Within the class, `create` / `delete` / `get` / `list` / `update` would be tighter. (But it would break a cross-package convention — every generated client uses `<verb><Noun>`.)
- **Rationale:** Cross-package convention wins here; flagging because rule 8 asks for redundant suffixes. TS scopes method calls by receiver (`client.create`) without needing to repeat the noun. Worth raising at the SDK-design level.

### 20. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:36`
- **Why weird:** Same constant repeated in every generated package. `Segment` is generic; reader needs the comment to learn it's the User-Agent identity segment.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `USER_AGENT_PACKAGE_ID` or `PACKAGE_USER_AGENT_SEGMENT`.
- **Rationale:** Same flag as in other generated packages; flagged for consistency.

## Observations

### 21. Action-verb convention in `Client`
`createSecret` / `deleteSecret` / `getSecret` / `listSecrets` / `updateSecret` — fully consistent CRUDL verbs. No mixed `fetch`/`retrieve`. (Good.)

### 22. Acronym casing for `Http` / `Url`
Same as other audited packages: `Http` (PascalCase capital-then-lower) coexists with `URLSearchParams` (ALLCAPS from Web standard). Convention inherited from broader JS ecosystem; not worth changing.
- **Category:** 3.

### 23. `Uc` abbreviation never expanded in code
Tracked thoroughly. The string "Uc" (in any case) does not appear in any identifier, type name, field name, constant, or enum value. "Unity Catalog" appears only in (a) JSDoc on `Secret` (`model.ts:85`), (b) JSDoc on `createSecret` / `listSecrets` / `updateSecret` (`client.ts:67,163,232`), and (c) the URL path string `/api/2.1/unity-catalog/secrets` (`client.ts:79,109,136,176,244`). The package name `secretsuc` is the **only** carrier of the disambiguator at the import level, and it's silent everywhere else. A consumer importing `Client` and `Secret` from this package, then opening their editor's symbol view, will see no hint that this is Unity-Catalog-scoped. See finding #1.
- **Category:** 5.

### 24. No enums in this package
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
