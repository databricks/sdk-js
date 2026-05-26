# Naming Audit: repos

**Path:** `packages/repos/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-repos` (the `repos` directory + module name
use the abbreviation, while the JSDoc throughout the file consistently spells
the resource as "Git folder (repo)").
**Inferred domain:** Databricks "Repos" API — a workspace-level CRUD surface
for "Git folders" (formerly "Repos"): linkable workspace mount points that
track a remote Git repository at a given branch/tag/commit, optionally with
sparse-checkout configuration. Five operations:
`create/get/list/update/delete`. The API endpoint stays `POST /api/2.0/repos`
even though the product was rebranded to "Git folders". One resource type
(`RepoInfo`), two sparse-checkout config types (`SparseCheckout`,
`SparseCheckoutUpdate`), and no enums anywhere despite eight closed-set
`provider` values appearing in JSDoc on five fields.
**Total weird names flagged:** 21 (21 still applicable, 0 newly fixed in regeneration on 2026-05-26)

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | package `repos` / module `@databricks/sdk-repos` | (package) | package | High | 1 Vague/generic, 5 Cryptic abbreviations, 6 Misleading names | "Repos" is a casual abbreviation for "Repositories", and Databricks rebranded the product to "Git folders". Every JSDoc string in the package uses the form "Git folder (repo)". The package, type, method, and field names all keep the legacy term — readers familiar with the rebranded UI ("Git folders") will not search for `@databricks/sdk-repos`. Compare to the sibling `@databricks/sdk-gitcredentials` package, which already uses the spelled-out form. |
| 2 | `Repo` as the resource noun | model.ts (throughout) | concept | High | 1 Vague/generic, 5 Cryptic abbreviations | The TS resource type is `RepoInfo`. The JSDoc clarifies: "Git folder (repo) information". The product UI calls it "Git folder". The Go SDK source uses `Repo`. JS-side could use the rebranded name (`GitFolder`/`GitFolderInfo`) or at least spell out the abbreviation (`Repository`). The wire URL still says `repos` so URL renaming is not possible, but the TS types are free. |
| 3 | `RepoInfo` interface | model.ts:111 | interface | Medium | 20 Type-suffix tautology, 1 Vague/generic | The `Info` suffix is a Java/proto idiom that does not match TS norms. The interface *is* the repo — there is no `Repo` type that `RepoInfo` is "info about". `Repo` (or `GitFolder` per H1) without `Info` would be cleaner. (See also `CredentialInfo` in the `credentials` audit, M-pattern.) |
| 4 | `RepoInfo` ≡ `CreateRepoRequest_Response` ≡ `GetRepoRequest_Response` (three identical shapes) | model.ts:111, 29, 64 | interface trio | High | 12 Duplicate concepts | All three have the same seven fields (`id`, `path`, `url`, `provider`, `branch`, `headCommitId`, `sparseCheckout`) with the same types and the same optionality. The three zod transforms are three copies of the same body (model.ts:174-193, 200-218, 233-251 — sixty lines of duplicated logic). The two response shapes should be type aliases of `RepoInfo`. |
| 5 | `DeleteProjectRequest` (request type) | model.ts:50 | interface | High | 6 Misleading names, 12 Duplicate concepts | The type is named `DeleteProjectRequest` but the field, JSDoc, endpoint, and method all say "repo". The doc says: "The ID for the corresponding **repo** to delete." The endpoint is `/api/2.0/repos/{id}`. The client method is `deleteProject` but JSDoc above it says "Deletes the specified **repo**". This is the only `*Project*` name in the entire package — every other operation uses `*Repo*`. The wire-side path name (`/api/2.0/repos`) was likely once `/api/2.0/projects` (legacy/internal name) but the TS-side carries the legacy operation name only for this one method. |
| 6 | `Client.deleteProject` (method name on a `repos` client) | client.ts:105 | method | High | 6 Misleading names, 17 Inconsistent action verbs | The client method is `deleteProject` even though the package is `repos`, the URL is `/repos/{id}`, the JSDoc says "Deletes the specified repo", and the four sibling methods are `createRepo`, `getRepo`, `listRepos`, `updateRepo`. Should be `deleteRepo`. Reads as: `client.createRepo(...)`, `client.getRepo(...)`, `client.deleteProject(...)`, `client.updateRepo(...)` — the inconsistency is loud. |
| 7 | `provider` field typed as `string` (should be enum) | model.ts:15, 41, 76, 123 | field | High | 6 Misleading names, 15 Generic field names | JSDoc enumerates eight discrete provider values: `gitHub`, `bitbucketCloud`, `gitLab`, `azureDevOpsServices`, `gitHubEnterprise`, `bitbucketServer`, `gitLabEnterpriseEdition`, `awsCodeCommit`. There is no enum in the model — the field is `string`. Callers cannot get autocomplete and cannot type-check against the closed set. The JSDoc also says "case-insensitive" — but TS string comparison is case-sensitive. Should be a string-literal union or enum. Mirrors `gitProvider` in the `gitcredentials` audit (H6, #12). |
| 8 | `gitHub`, `bitbucketCloud`, `gitLab`, `gitHubEnterprise`, `gitLabEnterpriseEdition` wire values (in JSDoc) | model.ts:9-13, 37-39, 72-75, 119-121 | enum-like wire values | High | 3 Acronym casing inconsistencies, 5 Cryptic abbreviations | Same as `gitcredentials` audit #13. Casing is inconsistent across the same enumeration:<br>- "GitHub" → `gitHub` (lower-case G at the boundary)<br>- "GitLab" → `gitLab`<br>- "Bitbucket Cloud" → `bitbucketCloud`<br>- "Bitbucket Server" → `bitbucketServer`<br>- "Azure DevOps" → `azureDevOpsServices`<br>- "AWS CodeCommit" → `awsCodeCommit`<br>The "Hub"/"Lab"/"Cloud"/"Commit" portions are capitalized; the leading provider name uses lowercase initial. This breaks both the "Title Case" convention these brands actually use ("GitHub", "GitLab", "Bitbucket") and the "lower camel" TS field-name convention. Values dictated by the API server. |
| 9 | `gitLabEnterpriseEdition` wire value | model.ts:12, 39, 74, 121 | enum-like wire value | Medium | 7 Overly verbose, 6 Misleading names | 25-char value. JSDoc clarifies that `gitLabEnterpriseEdition` is "GitLab Self-Managed". The product name was renamed from "GitLab Enterprise Edition" to "GitLab Self-Managed" — the wire value preserves the legacy name. Same as `gitcredentials` audit #14. |
| 10 | `bitbucketServer` wire value | model.ts:11, 39, 74, 121 | enum-like wire value | Medium | 6 Misleading names | JSDoc clarifies "Bitbucket Data Center". Atlassian renamed "Bitbucket Server" to "Bitbucket Data Center" in 2024. Wire value is the legacy name. Same as `gitcredentials` audit #15. |
| 11 | `awsCodeCommit` wire value (deprecated, untagged) | model.ts:13, 40, 76, 122 | enum-like wire value | Low | 6 Misleading names | JSDoc says "deprecated by AWS, not accepting new customers" — but the value is still exported and accepted by the API. No `@deprecated` JSDoc tag on the values or the model. Same as `gitcredentials` audit #16. |
| 12 | `branch` field on `UpdateRepoRequest` (singular, but related to `tag`) | model.ts:156, 162 | field pair | Medium | 6 Misleading names | The `UpdateRepoRequest` request lets the caller specify *either* a branch *or* a tag — they are mutually exclusive (the JSDoc on `tag` says "Updating the repo to a tag puts the repo in a detached HEAD state. Before committing new changes, you must update the repo to a branch instead of the detached HEAD"). But the TS type allows both fields to be set at once (`branch?: string; tag?: string`), with no discriminated-union or validation. Either should be a discriminated union (`{kind: 'branch'; name: string} | {kind: 'tag'; name: string}`) or at least the doc should say "set exactly one of {branch, tag}". |
| 13 | `SparseCheckout` vs `SparseCheckoutUpdate` | model.ts:133, 143 | interface pair | High | 12 Duplicate concepts | Field-for-field identical:<br>```<br>interface SparseCheckout       { patterns?: string[] }<br>interface SparseCheckoutUpdate { patterns?: string[] }<br>```<br>Same doc string ("Sparse checkout configuration, it contains options like cone patterns."). Same zod transform body (model.ts:253-259 vs 287-293 — duplicated marshal logic). One is used in `CreateRepoRequest`/responses; the other only in `UpdateRepoRequest`. The shapes have no semantic difference. Should be one type. |
| 14 | `SparseCheckout.patterns` doc verbiage | model.ts:132, 142 | comment | Low | (none) | "Sparse checkout configuration, it contains options like cone patterns." reads awkwardly (comma splice; "it contains options like cone patterns" reads as natural-language but the `patterns` field is *the only* field — there are no "options like cone patterns", there is *exactly* the cone patterns). Should be "Sparse checkout configuration." or "Sparse checkout configuration. The `patterns` array specifies cone-mode patterns." |
| 15 | `Client` (unqualified class name) | client.ts:49 | class | Medium | 1 Vague/generic | `export class Client` — once imported it shadows every other package's `Client` (every package in this SDK exports its own `Client`). Should be `ReposClient` or, per H1, `GitFoldersClient`. Same flag as every prior audit. |
| 16 | `Client.createRepo` / `getRepo` / `listRepos` / `updateRepo` (singular) vs `deleteProject` | client.ts:79, 133, 161, 215, 105 | method set | High | 17 Inconsistent action verbs, 12 Duplicate concepts, 6 Misleading names | Four methods carry the `Repo` suffix; one carries `Project`. Per #5/#6, the `Project` form is a legacy name that leaked into this one operation only. Method naming should be uniform: `createRepo`, `getRepo`, `listRepos`, `updateRepo`, `deleteRepo` (or — per H1 — `createGitFolder`/`getGitFolder`/etc.). |
| 17 | `executeCall` vs `executeHttpCall` | utils.ts:26, 65 | function pair | Medium | 17 Inconsistent action verbs, 1 Vague/generic | Two `execute*` functions with overlapping vocabulary. `executeCall` translates options and dispatches via the retry/rate-limit executor; `executeHttpCall` does one HTTP round-trip. Same complaint as the `credentials`, `gitcredentials`, and `accountaccesscontrolproxy` audits — repeated boilerplate. |
| 18 | `buildHttpRequest` action verb mixed with `executeHttpCall` | utils.ts:96, 65 | function pair | Low | 17 Inconsistent action verbs | The `*HttpRequest`/`*HttpCall` vocabulary is mixed: `buildHttpRequest` builds a *request* object; `executeHttpCall` makes the *call*. "Call" and "Request" are used interchangeably. |
| 19 | `req.id ?? ''` String coercion in URL builders | client.ts:109, 137, 219 | (logic, not name) | Medium | 6 Misleading names | The `id` field is typed `number | undefined`. The URL builders do `String(req.id ?? '')` — falling back to the empty string when `id` is undefined. That produces URLs like `/api/2.0/repos/` (trailing slash, no ID) which the server will reject. Either the field should be required (no `| undefined`) or the call should throw. The bug-shaped coalesce is hidden behind the name `id` (which suggests the caller knows what an ID is). Same problem appears in every audited package; flagging once per audit. |
| 20 | `RepoInfo.path` doc says "Root path" but `CreateRepoRequest.path` and other `path` docs say "Path" | model.ts:115 vs 20, 33, 68 | field | Low | 6 Misleading names | `RepoInfo.path` doc: "Root path of the git folder (repo) in the Workspace." The same field on `CreateRepoRequest` / `GetRepoRequest` says just "Path of the Git folder (repo) in the workspace." Different qualifiers ("root path" vs "path"), different casing ("Workspace" vs "workspace"). Inconsistency within the same model file. |
| 21 | `RepoInfo` doc casing inconsistency: "git folder" vs "Git folder" | model.ts:110, 112, 114, 116, 118, 124, 126, 128 | doc | Low | (none) | Within `RepoInfo` alone, the JSDoc uses both "Git folder" (sentence-start, capitalized) and "git folder" (mid-sentence, lowercase). Same for "Workspace" vs "workspace". The other types consistently say "Git folder (repo)" with capital G. Generator-introduced text inconsistency. |

---

## High severity (must fix)

### H1. "Repos" is the legacy term; the product is "Git folders"

The package name (`repos`), the resource type (`RepoInfo`), the five client
methods (`createRepo`, `getRepo`, `listRepos`, `updateRepo`,
`deleteProject` (!)), and the response field (`repos`) all use the legacy
term "Repos". The Databricks product UI, marketing, and docs have rebranded
this resource to "Git folders".

The JSDoc *throughout the file* uses the form "Git folder (repo)" — i.e.,
the generator already knows the rebrand happened. Twenty-three doc strings
use "Git folder (repo)". Zero doc strings use only "Repo".

Two possible fixes:

1. **Rename the TS surface to `GitFolder`** — preserve the wire URL
   (`/api/2.0/repos`) but expose `GitFolder`, `GitFoldersClient`,
   `createGitFolder`, etc. on the TS side. The zod transform layer can map
   `gitFolder` ↔ JSON keys. This costs one breaking SDK change for one
   product alignment that reads honestly.
2. **Keep `Repo` but at least make it consistent** — stop using the legacy
   word "Project" (see H2), and decide on `Repo` (not "Repository")
   everywhere.

The package can also adopt the gitcredentials-style hyphenation: rename to
`@databricks/sdk-git-folders` (or just `@databricks/sdk-gitfolders`).

### H2. `DeleteProjectRequest` — leftover "Project" name on one operation

```ts
export interface DeleteProjectRequest {
  /** The ID for the corresponding repo to delete. */
  id?: number | undefined;
}
```

```ts
async deleteProject(req: DeleteProjectRequest, options?: CallOptions): Promise<DeleteProjectRequest_Response>
```

The Databricks API endpoint is `DELETE /api/2.0/repos/{id}`. The doc says
"Deletes the specified **repo**". Every sibling type/method uses `Repo`:
`CreateRepoRequest` / `GetRepoRequest` / `ListReposRequest` /
`UpdateRepoRequest`. Only `DeleteProjectRequest` uses the legacy word
"Project".

The likely history: `Repos` was internally called "Workspace Projects" at
one point, and the `Delete` operation's request envelope was never renamed
on the Go SDK side. The JS SDK is a 1:1 port, so the legacy name leaks
through.

Reads to a consumer as:

```ts
// Surreal because deleteProject deletes a repo, not a project.
const client = new ReposClient(opts);
await client.createRepo({...});      // OK
await client.deleteProject({id: 1}); // Wait, what?
```

Recommendation: rename `DeleteProjectRequest` → `DeleteRepoRequest`, method
`deleteProject` → `deleteRepo`. The wire URL doesn't change. This is a
pure TS-side rename that fixes a readability footgun. If the Go SDK keeps
the legacy name (likely it does), file an upstream cleanup request.

### H3. Three field-for-field-identical "Repo" shapes

`RepoInfo`, `CreateRepoRequest_Response`, and `GetRepoRequest_Response`
all have the same seven fields with the same types, the same optionality,
the same JSDoc text, and three copies of the same zod transform body
(model.ts:174-193 vs 200-218 vs 233-251). Two of the three are redundant.

Recommendation:

```ts
// Before
export interface CreateRepoRequest_Response { /* 7 fields */ }
export interface GetRepoRequest_Response    { /* same 7 fields */ }
export interface RepoInfo                    { /* same 7 fields */ }

// After
export interface Repo { /* 7 fields */ }
// Return Repo directly from create() and get().
```

### H4. `provider` is typed `string` but is closed-set

```ts
provider?: string | undefined;
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
(#8) gets handled there. This is identical to the `gitcredentials` audit
H6 — the same field appears in both packages, neither has an enum, both
duplicate the eight-value enumeration inline.

### H5. `Client.deleteProject` mid-CRUD-set

The package's `Client` class exposes:

```ts
client.createRepo(req)       // ✓
client.getRepo(req)          // ✓
client.listRepos(req)        // ✓
client.deleteProject(req)    // 🚨 different noun
client.updateRepo(req)       // ✓
```

Four methods read uniformly; one does not. Renaming `deleteProject` →
`deleteRepo` is a one-line fix on the TS side that materially improves
readability. See H2 for the full discussion.

### H6. `SparseCheckout` vs `SparseCheckoutUpdate` (identical shapes)

```ts
interface SparseCheckout       { patterns?: string[] | undefined }
interface SparseCheckoutUpdate { patterns?: string[] | undefined }
```

Both have the same doc string ("Sparse checkout configuration, it contains
options like cone patterns."), both zod transforms are identical
(model.ts:253-259 vs 287-293). The only difference is which top-level
request type holds them — `CreateRepoRequest` holds `SparseCheckout`;
`UpdateRepoRequest` holds `SparseCheckoutUpdate`.

Recommendation: one type, used by both. The Go-SDK likely keeps the two
separate because the proto generator emits them; the TS-side is free to
collapse.

### H7. `Client` is unqualified

`export class Client` (client.ts:49). Every package in this SDK exports
its own `Client`. Once imported in user code:

```ts
import {Client as ReposClient} from '@databricks/sdk-repos/v1';
```

— the consumer has to do the renaming. The generator should produce
`ReposClient` directly (or `GitFoldersClient` per H1, matching the package
noun). This is a pattern-wide issue and was flagged in every audit so far.

---

## Medium severity (worth pushing back on)

### M1. `RepoInfo` suffix is a Java/proto idiom

The type is called `RepoInfo` — but there is no `Repo` type that
`RepoInfo` is "info about". The `Info` suffix is residue from the
proto/Go-SDK ancestry; TS canonical naming would just be `Repo` (or
`GitFolder` per H1). The same critique was made in the `credentials` audit
(`CredentialInfo` vs `Credential`).

### M2. `branch` and `tag` should be discriminated

```ts
interface UpdateRepoRequest {
  id?: number;
  branch?: string;
  tag?: string;
  sparseCheckout?: SparseCheckoutUpdate;
}
```

JSDoc on `tag`: "Updating the repo to a tag puts the repo in a detached
HEAD state. Before committing new changes, you must update the repo to a
branch instead of the detached HEAD." So the caller must specify *either*
a branch *or* a tag — but the TS type allows neither, either, or both.

Idiomatic TS would be:

```ts
type GitRef =
  | {kind: 'branch'; name: string}
  | {kind: 'tag'; name: string}
  | {kind: 'commit'; sha: string};

interface UpdateRepoRequest {
  id?: number;
  ref?: GitRef;
  sparseCheckout?: SparseCheckoutUpdate;
}
```

This is a wire-compatible rename; the zod transform can flatten back to
`{branch, tag}` on the way out.

### M3. `executeCall` / `executeHttpCall` (overlapping vocabulary)

`utils.ts` exposes:

- `executeCall(call, options)`
- `executeHttpCall(opts)`
- `buildHttpRequest(method, url, headers, signal?, body?)`

The `execute*` pair (`executeCall` wraps the retry/rate-limit executor;
`executeHttpCall` is a single HTTP round-trip) has been flagged in every
audit so far. The `*HttpRequest`/`*HttpCall` vocabulary is also mixed —
"Call" and "Request" used interchangeably across `buildHttpRequest` and
`executeHttpCall`.

### M4. `req.id ?? ''` URL-builder bug-shape

```ts
const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
```

When `req.id` is `undefined` (the type allows it — `id?: number`), this
produces `/api/2.0/repos/` (trailing slash, no ID). The server responds
404. Idiomatic TS would mark `id` as required for paths that need it, or
throw before issuing the call. The pattern repeats in
`client.ts:109, 137, 219`.

---

## Low severity (style polish)

### L1. `awsCodeCommit` is documented as deprecated but not tagged

The JSDoc on `provider` says "`awsCodeCommit` (deprecated by AWS, not
accepting new customers)". But the model has no `@deprecated` tag on
either the field's documentation or on a typed enum value (which doesn't
exist — see H4). Callers cannot programmatically detect deprecated values.
See #11.

### L2. `SparseCheckout` doc has a comma splice

```ts
/** Sparse checkout configuration, it contains options like cone patterns. */
```

"Sparse checkout configuration, it contains options like cone patterns."
— "configuration, it contains" is a comma splice (independent clauses
joined by a comma). Should be "Sparse checkout configuration." or
"Sparse checkout configuration. The `patterns` array specifies cone-mode
patterns." See #14.

### L3. `RepoInfo` doc text inconsistencies

"Git folder" vs "git folder" within `RepoInfo` (model.ts:110, 112, 114,
116, 118, 124, 126, 128). "Workspace" vs "workspace". Generator-introduced
text inconsistency. See #21.

### L4. `RepoInfo.path` doc says "Root path"; the other `path` docs say "Path"

The `RepoInfo` interface describes `path` as "Root path of the git folder
(repo) in the Workspace." The same field on `CreateRepoRequest` /
`GetRepoRequest` says "Path of the Git folder (repo) in the workspace."
Different qualifier ("root path" vs "path"), different casing
("Workspace" vs "workspace"). Generator-introduced. See #20.

---

## Notes

### Wire-protocol values that the audit cannot fix

The `provider` wire values (`gitHub`, `bitbucketCloud`, etc.) are dictated
by the API server. The casing inconsistencies (#8) and legacy renames
(#9, #10) are baked in. The TS-side cannot change them without breaking
the wire. The audit flags them for awareness — fixing requires an
API-server change.

The `DELETE /api/2.0/repos/{id}` URL also cannot change. But the *TS-side*
method name (`deleteProject`) and the *TS-side* request type
(`DeleteProjectRequest`) can both rename freely (see H2).

### Identifier zoo summary

| Identifier kind | Count |
|---|---|
| Total exported interfaces | 10 |
| Identical-shape interface trios | 1 (`RepoInfo` ≡ `CreateRepoRequest_Response` ≡ `GetRepoRequest_Response`) |
| Identical-shape interface pairs | 1 (`SparseCheckout` ≡ `SparseCheckoutUpdate`) |
| Enums | 0 (despite an 8-value closed set on `provider`) |
| Legacy-name leaks | 1 (`DeleteProjectRequest*` on a "repos" client) |
| Rebranding leaks | All identifiers (the resource is now "Git folder" everywhere in JSDoc and product UI, but the type/method names still say "Repo") |

### Comparison to other audits

| Issue | This package | `gitcredentials` audit | `credentials` audit |
|---|---|---|---|
| Bare `Client` class | Yes (H7) | Yes (H7) | Yes (#10) |
| Three identical resource/response shapes | Yes (H3: `RepoInfo` ≡ `CreateRepoRequest_Response` ≡ `GetRepoRequest_Response`) | Yes (H4: `Credential` ≡ `CreateCredentials_Response` ≡ `GetCredentials_Response`) | Yes (#2, #3, #5) |
| `string`-typed enum-domain field (`provider`) | Yes (H4) | Yes (H6 — same field!) | No (uses real enums) |
| `executeCall` / `executeHttpCall` vocabulary clash | Yes (M3) | Yes (#31) | Yes (#55) |
| `host` field stores a URL | Removed | Yes (#36) | Common |
| Plural/singular mismatch | Removed | Severe (H2 — plural request type for singular op) | Mixed |
| Legacy-name leak | **Yes (H2 — `DeleteProjectRequest*` on a "repos" client)** | No | No |
| Product-rebrand leak | **Yes (H1 — TS surface says "Repo", product/doc says "Git folder")** | Partial (Bitbucket Data Center rename, GitLab Self-Managed rename — wire values only) | No |

The `DeleteProjectRequest` legacy leak (H2) is unique to this package — no
other audited package has a single mismatched-noun operation in an
otherwise-uniform CRUD client. The product-rebrand-vs-API-name divergence
(H1) is also pronounced: every JSDoc string in the file uses "Git folder
(repo)", while every type and method name uses only "Repo". The generator
already has the new terminology in the doc strings; only the names have
not followed.

---
