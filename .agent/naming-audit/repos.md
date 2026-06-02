# Naming Audit: repos

**Path:** `packages/repos/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-repos`
**Total weird names flagged:** 6

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | package `repos` / module `@databricks/sdk-repos` | (package) | package | High | 1 Vague/generic, 5 Cryptic abbreviations, 6 Misleading names | "Repos" is a casual abbreviation for "Repositories", and Databricks rebranded the product to "Git folders". Every JSDoc string in the package uses the form "Git folder (repo)". The package, type, and method names all keep the legacy term — readers familiar with the rebranded UI ("Git folders") will not search for `@databricks/sdk-repos`. Compare to the sibling `@databricks/sdk-gitcredentials` package, which already uses the spelled-out form. |
| 2 | `Repo` as the resource noun | model.ts (throughout) | concept | High | 1 Vague/generic, 5 Cryptic abbreviations | The TS resource type is `RepoInfo`. The JSDoc clarifies: "Git folder (repo) information". The product UI calls it "Git folder". The Go SDK source uses `Repo`. JS-side could use the rebranded name (`GitFolder`/`GitFolderInfo`) or at least spell out the abbreviation (`Repository`). The wire URL still says `repos` so URL renaming is not possible, but the TS types are free. |
| 3 | `RepoInfo` interface | model.ts:108 | interface | Medium | 20 Type-suffix tautology, 1 Vague/generic | The `Info` suffix is a Java/proto idiom that does not match TS norms. The interface *is* the repo — there is no `Repo` type that `RepoInfo` is "info about". `Repo` (or `GitFolder` per H1) without `Info` would be cleaner. (See also `CredentialInfo` in the `credentials` audit, M-pattern.) |
| 4 | `DeleteProjectRequest` (request type) | model.ts:49 | interface | High | 6 Misleading names | The type is named `DeleteProjectRequest` but the field, JSDoc, endpoint, and method all say "repo". The doc says: "The ID for the corresponding **repo** to delete." The endpoint is `/api/2.0/repos/{id}`. The client method is `deleteProject` but JSDoc above it says "Deletes the specified **repo**". This is the only `*Project*` name in the entire package — every other operation uses `*Repo*`. The wire-side path name (`/api/2.0/repos`) was likely once `/api/2.0/projects` (legacy/internal name) but the TS-side carries the legacy operation name only for this one method. |
| 5 | `branch` field on `UpdateRepoRequest` (singular, but related to `tag`) | model.ts:153, 159 | field pair | Medium | 6 Misleading names | The `UpdateRepoRequest` request lets the caller specify *either* a branch *or* a tag — they are mutually exclusive (the JSDoc on `tag` says "Updating the repo to a tag puts the repo in a detached HEAD state. Before committing new changes, you must update the repo to a branch instead of the detached HEAD"). But the TS type allows both fields to be set at once (`branch?: string; tag?: string`), with no discriminated-union or validation. Either should be a discriminated union (`{kind: 'branch'; name: string} | {kind: 'tag'; name: string}`) or at least the doc should say "set exactly one of {branch, tag}". |
| 6 | `req.id ?? ''` String coercion in URL builders | client.ts:114, 142, 230 | (logic, not name) | Medium | 6 Misleading names | The `id` field is typed `bigint | undefined`. The URL builders do `String(req.id ?? '')` — falling back to the empty string when `id` is undefined. That produces URLs like `/api/2.0/repos/` (trailing slash, no ID) which the server will reject. Either the field should be required (no `| undefined`) or the call should throw. The bug-shaped coalesce is hidden behind the name `id` (which suggests the caller knows what an ID is). Same problem appears in every audited package; flagging once per audit. |

---

## High severity (must fix)

### H1. "Repos" is the legacy term; the product is "Git folders"

The package name (`repos`), the resource type (`RepoInfo`), and the five
client methods (`createRepo`, `getRepo`, `listRepos`, `updateRepo`,
`deleteProject` (!)) all use the legacy term "Repos". The Databricks
product UI, marketing, and docs have rebranded this resource to
"Git folders".

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
  id?: bigint | undefined;
}
```

```ts
async deleteProject(req: DeleteProjectRequest, options?: CallOptions): Promise<DeleteProjectResponse>
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
  id?: bigint;
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
  id?: bigint;
  ref?: GitRef;
  sparseCheckout?: SparseCheckoutUpdate;
}
```

This is a wire-compatible rename; the zod transform can flatten back to
`{branch, tag}` on the way out.

### M3. `req.id ?? ''` URL-builder bug-shape

```ts
const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
```

When `req.id` is `undefined` (the type allows it — `id?: bigint`), this
produces `/api/2.0/repos/` (trailing slash, no ID). The server responds
404. Idiomatic TS would mark `id` as required for paths that need it, or
throw before issuing the call. The pattern repeats in
`client.ts:114, 142, 230`.
