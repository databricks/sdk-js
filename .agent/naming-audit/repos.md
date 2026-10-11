# Naming Audit: repos

**Path:** `packages/repos/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-repos`
**Total weird names flagged:** 5

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | package `repos` / module `@databricks/sdk-repos` | (package) | package | High | 1 Vague/generic, 5 Cryptic abbreviations, 6 Misleading names | "Repos" is a casual abbreviation for "Repositories", and Databricks rebranded the product to "Git folders". The JSDoc throughout the package glosses the resource as "Git folder (repo)". The package, type, and method names all keep the legacy term — readers familiar with the rebranded UI ("Git folders") will not search for `@databricks/sdk-repos`. Compare to the sibling `@databricks/sdk-gitcredentials` package, which already uses the spelled-out form. |
| 2 | `Repo` as the resource noun | model.ts (throughout) | concept | High | 1 Vague/generic, 5 Cryptic abbreviations | The TS resource type is `RepoInfo`. The JSDoc clarifies: "Git folder (repo) information". The product UI calls it "Git folder". The Go SDK source uses `Repo`. JS-side could use the rebranded name (`GitFolder`/`GitFolderInfo`) or at least spell out the abbreviation (`Repository`). The wire URL still says `repos` so URL renaming is not possible, but the TS types are free. |
| 3 | `RepoInfo` interface | model.ts:108 | interface | Medium | 20 Type-suffix tautology, 1 Vague/generic | The `Info` suffix is a Java/proto idiom that does not match TS norms. The interface *is* the repo — there is no `Repo` type that `RepoInfo` is "info about". `Repo` (or `GitFolder` per H1) without `Info` would be cleaner. (See also `CredentialInfo` in the `credentials` audit, M-pattern.) |
| 4 | `branch` field on `UpdateRepoRequest` (singular, but related to `tag`) | model.ts:153, 159 | field pair | Medium | 6 Misleading names | The `UpdateRepoRequest` request lets the caller specify *either* a branch *or* a tag — they are mutually exclusive (the JSDoc on `tag` says "Updating the repo to a tag puts the repo in a detached HEAD state. Before committing new changes, you must update the repo to a branch instead of the detached HEAD"). But the TS type allows both fields to be set at once (`branch?: string; tag?: string`), with no discriminated-union or validation. Either should be a discriminated union (`{kind: 'branch'; name: string} | {kind: 'tag'; name: string}`) or at least the doc should say "set exactly one of {branch, tag}". |
| 5 | `req.id ?? ''` String coercion in URL builders | client.ts:115, 144, 234 | (logic, not name) | Medium | 6 Misleading names | The `id` field is typed `bigint | undefined`. The URL builders do `String(req.id ?? '')` — falling back to the empty string when `id` is undefined. That produces URLs like `/api/2.0/repos/` (trailing slash, no ID) which the server will reject. Either the field should be required (no `| undefined`) or the call should throw. The bug-shaped coalesce is hidden behind the name `id` (which suggests the caller knows what an ID is). Same problem appears in every audited package; flagging once per audit. |

---

## High severity (must fix)

### H1. "Repos" is the legacy term; the product is "Git folders"

The package name (`repos`), the resource type (`RepoInfo`), and the five
client methods (`createRepo`, `deleteRepo`, `getRepo`, `listRepos`,
`updateRepo`) all use the legacy term "Repos". The Databricks product UI,
marketing, and docs have rebranded this resource to "Git folders".

The JSDoc *throughout the file* glosses the resource as "Git folder (repo)"
— i.e., the generator already knows the rebrand happened. Eighteen doc
strings use the "Git folder (repo)" (or "Git folders (repos)") form.

Two possible fixes:

1. **Rename the TS surface to `GitFolder`** — preserve the wire URL
   (`/api/2.0/repos`) but expose `GitFolder`, `GitFoldersClient`,
   `createGitFolder`, etc. on the TS side. The zod transform layer can map
   `gitFolder` ↔ JSON keys. This costs one breaking SDK change for one
   product alignment that reads honestly.
2. **Keep `Repo` as the stable API term** — the TS surface is internally
   consistent (`Repo` everywhere), so accept the legacy term and rely on
   the JSDoc gloss to bridge to the rebranded product name.

The package can also adopt the gitcredentials-style hyphenation: rename to
`@databricks/sdk-git-folders` (or just `@databricks/sdk-gitfolders`).

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
  dangerouslyForceDiscardAll?: boolean;
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
const url = `${host}/api/2.0/repos/${String(req.id ?? '')}`;
```

When `req.id` is `undefined` (the type allows it — `id?: bigint`), this
produces `/api/2.0/repos/` (trailing slash, no ID). The server responds
404. Idiomatic TS would mark `id` as required for paths that need it, or
throw before issuing the call. The pattern repeats in
`client.ts:115, 144, 234`.
