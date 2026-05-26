# Naming Audit: gitcredentials

**Path:** `packages/gitcredentials/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-gitcredentials` (lowercased compound — the
camel-case domain term is "Git credentials", so the package directory and
module name both drop the obvious word boundary).
**Inferred domain:** A small CRUD surface over a workspace-level Git provider
credential store. Each credential is a record holding `(gitProvider,
gitUsername, gitEmail, name, isDefaultForProvider)` plus a write-only
`personalAccessToken`. The API mints an opaque numeric `credentialId` on
creation and returns it everywhere else. Five operations:
`create/get/list/update/delete`. No enums, no discriminated unions, no
pagination, no list filtering beyond an optional `principalId` query
parameter, no version negotiation.
**Total weird names flagged:** 15 (0 fixed, 15 still open)
**Last rescan:** 2026-05-26 (post regen #156)

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | package `gitcredentials` / module `@databricks/sdk-gitcredentials` | (package) | package | High | 1 Vague/generic, 5 Cryptic abbreviations, 12 Duplicate concepts | Lowercased compound noun runs `git` and `credentials` together with no separator. The npm registry has packages literally called `git-credentials`/`@gitcredentials` (different ecosystem). Also collides conceptually with `@databricks/sdk-credentials` (Unity Catalog cloud-storage credentials) and `@databricks/sdk-auth/credentials` (SDK auth credentials). Three packages with "Credentials" in the name, three different meanings. |
| 2 | `Credential` (interface) | model.ts:68 | interface | High | 1 Vague/generic, 12 Duplicate concepts | Bare `Credential` clashes with `@databricks/sdk-credentials`'s `Credential` (UC credentials) and with the auth package's `Credentials` interface. None of them say "Git" or "auth" or "UC" on the type name. Should be `GitCredential`. |
| 3 | `Credential` vs `CreateCredentialsRequest_Response` vs `GetCredentialsRequest_Response` (3 identical shapes) | model.ts:68, 43, 116 | interface set | High | 12 Duplicate concepts | The three types have field-for-field identical structure: `{credentialId, gitProvider, gitUsername, name, isDefaultForProvider, gitEmail}`. The two response types should be type aliases of `Credential`, or `Credential` should be the response type directly. |
| 4 | `CreateCredentialsRequest` vs `UpdateCredentialsRequest` (request envelopes) | model.ts:5, 152 | interface pair | High | 12 Duplicate concepts | The two request envelopes differ by exactly one field: `UpdateCredentialsRequest` adds `id` (path parameter). Otherwise field-for-field identical: `gitProvider`, `gitUsername`, `personalAccessToken`, `principalId`, `name`, `isDefaultForProvider`, `gitEmail`. The JSDoc text on every shared field is duplicated verbatim across both. Should share a base type (`GitCredentialMutation`) and only differ on the path key. |
| 5 | `CreateCredentialsRequest` named with plural noun | model.ts:5 | interface | High | 9 Singular/plural mismatches | The request creates *a single* credential. The name uses the plural "Credentials". The wire endpoint `POST /api/2.0/git-credentials` is plural because that's the collection URL, but the request type is singular. Should be `CreateCredentialRequest`. (Compare `Credential` itself — the resource singular is already chosen.) |
| 6 | `UpdateCredentialsRequest`, `DeleteCredentialsRequest`, `GetCredentialsRequest` named with plural | model.ts:152, 98, 108 | interface set | High | 9 Singular/plural mismatches | Same as #5 — three more cases. `UpdateCredentialsRequest` updates one credential (the JSDoc on the client method confirms: "Updates the specified Git credential"). `DeleteCredentialsRequest` deletes one. `GetCredentialsRequest` gets one. All three should be singular. |
| 7 | `ListCredentialsRequest_Response.credentials` field | model.ts:149 | field | Low | (none) | Generic but correct — the response is the array, the field naming it `credentials` (plural) matches what is inside. (Listing for completeness.) |
| 8 | `gitProvider` field typed as `string` (should be enum) | model.ts:13, 47, 77, 120, 168 | field | High | 6 Misleading names, 15 Generic field names | The JSDoc enumerates eight discrete provider values: `gitHub`, `bitbucketCloud`, `gitLab`, `azureDevOpsServices`, `gitHubEnterprise`, `bitbucketServer`, `gitLabEnterpriseEdition`, `awsCodeCommit`. There is no enum in the model — the field is `string`. Callers cannot get autocomplete and cannot type-check against the closed set. The JSDoc also says "case-insensitive" — but TS string comparison is case-sensitive. Should be a string-literal union or enum. |
| 9 | `gitHub`, `bitbucketCloud`, `gitLab`, `gitHubEnterprise`, `gitLabEnterpriseEdition` (wire values inside JSDoc) | model.ts:8-11, 73-75, 163-165 | enum-like wire values | High | 3 Acronym casing inconsistencies, 5 Cryptic abbreviations | Casing is inconsistent across the same enumeration:<br>- "GitHub" → `gitHub` (small-G at boundary)<br>- "GitLab" → `gitLab`<br>- "Bitbucket Cloud" → `bitbucketCloud`<br>- "Bitbucket Server" → `bitbucketServer`<br>- "Azure DevOps" → `azureDevOpsServices`<br>- "AWS CodeCommit" → `awsCodeCommit`<br>The "Hub"/"Lab"/"Cloud"/"Commit" portions are capitalized; the leading provider name uses lowercase initial. This breaks both the "Title Case" convention these brands actually use ("GitHub", "GitLab", "Bitbucket") and the "lower camel" convention TS field names use. The values are dictated by the API server, but they will confuse readers ("is it `GitHub` or `gitHub`?"). |
| 10 | `gitLabEnterpriseEdition` wire value | model.ts:10, 75, 165 | enum-like wire value | Medium | 7 Overly verbose, 6 Misleading names | 25-char value. JSDoc clarifies that `gitLabEnterpriseEdition` is "GitLab Self-Managed". The product name was renamed from "GitLab Enterprise Edition" to "GitLab Self-Managed" — the wire value preserves the legacy name. The TS-side will outlive the rename. |
| 11 | `bitbucketServer` wire value | model.ts:10, 75, 165 | enum-like wire value | Medium | 6 Misleading names | JSDoc clarifies "Bitbucket Data Center". Atlassian renamed "Bitbucket Server" to "Bitbucket Data Center" in 2024. Same problem as #10 — wire value is the legacy name. |
| 12 | `awsCodeCommit` wire value | model.ts:10-11, 75-76, 165-166 | enum-like wire value | Low | 6 Misleading names | JSDoc says "deprecated by AWS, not accepting new customers" — but the value is still exported and accepted by the API. No `@deprecated` JSDoc tag on the values or the model. Caller has no programmatic way to detect deprecation. |
| 13 | `Client` (unqualified class name) | client.ts:48 | class | Medium | 1 Vague/generic | `export class Client` — once imported it shadows every other package's `Client` (every package in this SDK exports its own `Client`). Should be `GitCredentialsClient` (matching the package name). |
| 14 | `Client.createCredentials` / `getCredentials` / `listCredentials` / `updateCredentials` / `deleteCredentials` (plural method names) | client.ts:78, 141, 175, 209, 107 | method set | High | 9 Singular/plural mismatches | Five methods all named with the plural "Credentials" even though four of them act on a single credential at a time:<br>- `createCredentials(req)` creates **one** credential.<br>- `getCredentials(req)` gets **one** (selected by `id`).<br>- `updateCredentials(req)` updates **one**.<br>- `deleteCredentials(req)` deletes **one**.<br>- `listCredentials(req)` is the only legitimately plural one.<br>TS idiom for CRUD methods is singular for one-record operations (`createX`/`getX`/`updateX`/`deleteX`) and plural for collection ones (`listXs`/`searchXs`). The five-method API mixes the two and reads as "createCredentials" — i.e., a bulk create. |
| 15 | `*Request_Response` underscore-nested response types (5 of them) | model.ts:43, 106, 116, 147, 192 | interface set | High | Proto-architectural-leak | All five response types use the proto-style `ParentRequest_Response` underscore-nested form: `CreateCredentialsRequest_Response`, `DeleteCredentialsRequest_Response`, `GetCredentialsRequest_Response`, `ListCredentialsRequest_Response`, `UpdateCredentialsRequest_Response`. The underscore is a protobuf-nested-message encoding bleeding into the public TS API — the generator even acknowledges it with `// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.` above every one. The matching zod schema constants (`unmarshalCreateCredentialsRequest_ResponseSchema`, etc.) inherit the same underscore. |

---

## High severity (must fix)

### H1. Three "Credentials" packages, three meanings

The repository now has three packages with "Credentials" in the name, each
meaning something different:

| Package | What it really is |
|---|---|
| `@databricks/sdk-auth/credentials/` (hand-written sub-module) | SDK *user* authentication credentials (PAT, OAuth U2M, OAuth M2M). |
| `@databricks/sdk-credentials` | Unity Catalog cloud-storage / service credentials (AWS IAM roles, Azure SPs, GCP service accounts). |
| `@databricks/sdk-gitcredentials` (this package) | Per-workspace Git provider credentials (PATs for GitHub, GitLab, etc.). |

A consumer reading `import {Credential} from '@databricks/sdk-...'` cannot
tell which one is meant. The three packages even use the same `Credential`
type name. Recommend:

- Either keep the domain prefix in the type names (`GitCredential` here,
  `StorageCredential`/`ServiceCredential` in the UC package), or
- Disambiguate the package names (`@databricks/sdk-git-credentials` —
  spelled with the hyphen — would at least visually separate it).

Also flagged: directory and module name use `gitcredentials`, not
`git-credentials` or `git_credentials`. The npm registry already has
unrelated packages with the literal name `git-credentials` and
`git-credentials-node`. Pick a hyphenated form to disambiguate from those.

### H2. Plural request-type names

Four request envelopes act on a single resource but use the plural noun:
`CreateCredentialsRequest`, `GetCredentialsRequest`, `UpdateCredentialsRequest`,
`DeleteCredentialsRequest`. Plus five client methods of the same name (`createCredentials`,
etc.). The result is that the API reads like a bulk-create surface ("call
`createCredentials` with five credentials") when it is actually a one-at-a-time
API.

```ts
// reads as a bulk create
await client.createCredentials({gitProvider: 'gitHub', ...});

// what the API actually does
await client.createCredential({gitProvider: 'gitHub', ...});
```

Recommendation: keep `listCredentials` (plural — list returns many) but
rename the four single-resource methods and their request types to
singular. See #5, #6, #14.

### H3. Three field-for-field-identical "Credential" shapes

`Credential`, `CreateCredentialsRequest_Response`, and `GetCredentialsRequest_Response`
all have the same six fields with the same types, the same optionality, and
the same JSDoc text. Two of the three are redundant.

Recommendation:

```ts
// Before
export interface CreateCredentialsRequest_Response { /* 6 fields */ }
export interface GetCredentialsRequest_Response    { /* same 6 fields */ }
export interface Credential                         { /* same 6 fields */ }

// After
export interface GitCredential { /* 6 fields */ }
// Return GitCredential directly from create() and get().
```

### H4. `gitProvider` is typed `string` but is closed-set

```ts
gitProvider?: string | undefined;
```

JSDoc enumerates eight values: `gitHub`, `bitbucketCloud`, `gitLab`,
`azureDevOpsServices`, `gitHubEnterprise`, `bitbucketServer`,
`gitLabEnterpriseEdition`, `awsCodeCommit`. The set is closed; the API
server rejects other values. But the TS-side surfaces it as `string`, so:

- No autocomplete on the value list.
- No compile-time check for typos (`gitub` will type-check).
- The JSDoc casing inconsistencies (`gitHub` vs `gitLabEnterpriseEdition`)
  cannot be fixed at the call site, only by the API server.

Recommendation: emit a string-literal union or enum. The casing problem
(#9) gets handled there.

### H5. `Client` is unqualified

`export class Client` (client.ts:48). Every package in this SDK exports its
own `Client`. Once imported in user code:

```ts
import {Client as GitCredentialsClient} from '@databricks/sdk-gitcredentials/v1';
```

— the consumer has to do the renaming. The generator should produce
`GitCredentialsClient` directly (matching the package noun). This is a
pattern-wide issue and was flagged in every audit so far.

### H6. `*Request_Response` underscore-nested response types — `model.ts:43, 106, 116, 147, 192`

- **Why:** All five response types are emitted as proto-style nested
  messages joined by a literal underscore — `CreateCredentialsRequest_Response`,
  `DeleteCredentialsRequest_Response`, `GetCredentialsRequest_Response`,
  `ListCredentialsRequest_Response`, `UpdateCredentialsRequest_Response`.
  The underscore-joined `ParentRequest_Response` form is the
  protobuf/Go-SDK convention for flattening a nested-message namespace
  (`message CreateCredentialsRequest { message Response { ... } }`) into a
  single identifier. TS has native namespaces and modules, so the
  underscore is a wire-protocol artifact bleeding into the public TS
  surface. The generator already labels every one of them
  "Proto-style nested message name" via an `eslint-disable-next-line`
  comment, which is an explicit confession that the form is non-idiomatic.
  The matching zod schemas (`unmarshalCreateCredentialsRequest_ResponseSchema`,
  etc.) inherit the same underscore at `model.ts:195, 233, 237, 257, 267`,
  and every import site in `client.ts:22-30, 35-39, 81, 84, 96, 110, 118,
  130, 144, 152, 164, 178, 186, 198, 212, 215, 227` carries it forward.
- **Category:** Proto-architectural leak (proto-style nested-message
  encoding leaking into TS identifiers).
- **Suggested name:** Drop the underscore and the `Request_` prefix.
  `CreateCredentialResponse`, `DeleteCredentialResponse`,
  `GetCredentialResponse`, `ListCredentialsResponse`,
  `UpdateCredentialResponse`. Even better, collapse all three
  identical-shape response types into `GitCredential` directly (see H3) so
  three of the five disappear entirely.
- **Rationale:** TS consumers should never have to learn that a response
  type is "nested inside" its request message — that nesting is a proto
  detail the wire never sees (the JSON body has no `Request_Response`
  envelope; it just has the response fields directly). The underscore is
  the single clearest piece of evidence that the generator is emitting Go
  shapes verbatim rather than rendering an idiomatic TS surface.

---

## Medium severity (worth pushing back on)

### M1. Plural `*Credentials` envelopes for single-resource operations

See H2. Repeating because the request-type and method names compound the
plural problem.

### M2. `Credential` (singular) and `*Credentials` (plural) coexist as the same domain term

The model has one *singular* type — `Credential` (the resource) — and
five *plural* request/response types around it. Within one file the same
concept toggles plural/singular at almost every boundary:

| Where | Spelling |
|---|---|
| Resource type | `Credential` |
| Create-request type | `CreateCredentialsRequest` |
| Get-request type | `GetCredentialsRequest` (gets one) |
| Update-request type | `UpdateCredentialsRequest` (updates one) |
| Delete-request type | `DeleteCredentialsRequest` (deletes one) |
| List-request type | `ListCredentialsRequest` (lists many) |
| Wire endpoint | `/api/2.0/git-credentials` (plural collection) |

Pick a rule. Conventional CRUD: plural for collection ops (`listCredentials`,
URL `/credentials`), singular for resource ops (`getCredential`,
`createCredential`, URL `/credentials/{id}`).

---

## Low severity (style polish)

### L1. `awsCodeCommit` is documented as deprecated but not tagged

The JSDoc on `gitProvider` says "`awsCodeCommit` (deprecated by AWS, not
accepting new customers)". But the model has no `@deprecated` tag on
either the field's documentation or on a typed enum value (which doesn't
exist — see H4). Callers cannot programmatically detect deprecated values.
See #12.

---

## Notes

### Wire-protocol values that the audit cannot fix

The `gitProvider` wire values (`gitHub`, `bitbucketCloud`, etc.) are
dictated by the API server. The casing inconsistencies (#9) are baked in.
The TS-side cannot change them without breaking the wire. The audit flags
them for awareness — fixing requires an API-server change.

### Identifier zoo summary

| Identifier kind | Count |
|---|---|
| Total exported interfaces | 10 |
| Plural request envelopes for single-resource ops | 4 |
| Identical-shape interface trios | 1 (`Credential` ≡ `CreateCredentialsRequest_Response` ≡ `GetCredentialsRequest_Response`) |
| Enums | 0 (despite an 8-value closed set on `gitProvider`) |

### Comparison to other audits

| Issue | This package | `credentials` audit | `oauthcustomappintegration` (typical) |
|---|---|---|---|
| Bare `Client` class | Yes (#13) | Yes (#10) | Yes |
| Plural request envelopes on single-resource ops | Yes (#5, #6, #14) | No (uses `nameArg`/singular shapes) | Mixed |
| `string`-typed enum-domain field | Yes (#8) | No (uses real enums) | Rare |

The `string`-typed `gitProvider` despite a documented closed set (#8, H4)
is the standout finding unique to this package. The plural request-type
naming (#5, #6, H2) is also pronounced here — the `credentials` audit
gets it right (`CreateCredential`, `UpdateCredential`).
