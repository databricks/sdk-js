# Naming Audit: credentials

**Path:** `packages/credentials/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-credentials` (top-level module name
collides semantically with the hand-written `@databricks/sdk-auth/credentials`
sub-module).
**Inferred domain:** Unity Catalog "Credentials" API — manages two parallel
shapes (the newer consolidated `Credential` and the older `StorageCredential`)
plus four `GenerateTemporary*Credential` token-vending endpoints (path, table,
volume, service). Each credential is a discriminated union over six
cloud-provider configurations (AWS IAM role, Azure Service Principal, Azure
Managed Identity, GCP Service Account Key, Databricks-managed GCP Service
Account, Cloudflare API token) and yields one of six temporary-credential
shapes (AWS, Azure SAS, GCP OAuth, Azure AAD, R2, UC encrypted token).
**Total weird names flagged:** 35

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | package `credentials` / module `@databricks/sdk-credentials` | (package) | package | High | 1 Vague/generic, 12 Duplicate concepts | Cross-package naming collision with `@databricks/sdk-auth`'s hand-written `credentials/` sub-module. Importers will routinely ask "which `credentials` did I want?" — one is SDK authentication (PAT, U2M, M2M); this is Unity Catalog cloud-storage credentials. |
| 2 | `CredentialInfo` vs `CreateCredentialRequest` vs `UpdateCredentialRequest` vs `StorageCredentialInfo` | model.ts:463, 300, 1055, 870 | interface set | High | 12 Duplicate concepts | Four near-identical record shapes (~20 fields each) differ only in two flag fields (`skipValidation`, `force`, `newName`, `nameArg`). The "Info" suffix vs "Request" suffix is meaningless. Real shape is one resource + a small action delta. |
| 3 | `CreateCredentialRequest` vs `CreateStorageCredentialRequest` | model.ts:300, 388 | interface pair | High | 12 Duplicate concepts | Field-for-field identical. The wire endpoints differ (`/credentials` vs `/storage-credentials`) but the request bodies are the same. One should be a re-export of the other or both should share a common base. |
| 4 | `UpdateCredentialRequest` vs `UpdateStorageCredentialRequest` | model.ts:1055, 1140 | interface pair | High | 12 Duplicate concepts | Same as #3 — body fields identical. |
| 5 | `CredentialInfo` vs `StorageCredentialInfo` | model.ts:463, 870 | interface pair | High | 12 Duplicate concepts | Same fields, same types, same optionality. The only thing distinguishing them is which list endpoint emits which. Generator-produced. |
| 6 | `DeleteCredentialRequest` vs `DeleteStorageCredentialRequest` | model.ts:564, 584 | interface pair | High | 12 Duplicate concepts | Both expose `{nameArg, force}`; identical shape. |
| 7 | `GetCredentialRequest` vs `GetStorageCredentialRequest` | model.ts:755, 771 | interface pair | High | 12 Duplicate concepts | Both expose `{nameArg}`. Same shape. |
| 8 | `ListCredentialsRequest` vs `ListStorageCredentialsRequest` | model.ts:788, 825 | interface pair | High | 12 Duplicate concepts | Both expose `{includeUnbound, maxResults, pageToken}`. Same shape, different doc string. |
| 9 | `ValidateCredentialRequest` vs `ValidateStorageCredentialRequest` | model.ts:1225, 1283 | interface pair | High | 12 Duplicate concepts | The `credential` discriminator differs (`credentialName` vs `storageCredentialName`; storage variant adds `azureServicePrincipal` and `cloudflareApiToken`). Otherwise overlapping. |
| 10 | `Client` | client.ts:106 | class | Medium | 1 Vague/generic, 12 Duplicate concepts | Unqualified `Client` — once imported it shadows every other package's `Client`. `CredentialsClient` would self-identify. |
| 11 | `Client.createCredential` vs `Client.createStorageCredential` (plus delete/get/list/update/validate pairs) | client.ts:309, 339, 368, 402, 445, 480, 514, 551, 586, 614, 648, 715, 777, 808, 850, 889 | method set | High | 12 Duplicate concepts | The class exposes parallel `*Credential` and `*StorageCredential` operations (16 methods, 8 pairs). Per the in-tree TODO note (model.ts:766-770) the storage-credentials API is being deprecated, but both are surfaced equally — no `@deprecated` JSDoc, no log warning. |
| 12 | `nameArg` | model.ts:566, 586, 757, 773, 1057, 1142 | field | High | 5 Cryptic abbreviations, 14 Go/Java-style names | `nameArg` appears in six request types as the path parameter for the credential being acted on. "Arg" is meaningless to a TS caller (it's a generator-introduced disambiguator that exists because some envelopes also have a `name` body field). TS-side it should be `credentialName` or `nameInPath`. |
| 13 | `UpdateCredentialRequest.nameArg` and `UpdateCredentialRequest.name` coexist | model.ts:1057, 1072 | field pair | High | 12 Duplicate concepts, 15 Generic field names | Same envelope carries both `nameArg` (path) and `name` (body). The JSDoc doesn't say what to do when they differ; the JSDoc on `name` repeats `CreateCredentialRequest.name`'s text. Caller will pick wrong. |
| 14 | `UpdateStorageCredentialRequest.nameArg` and `UpdateStorageCredentialRequest.name` coexist | model.ts:1142, 1156 | field pair | High | 12 Duplicate concepts, 15 Generic field names | Same as #13 for the storage variant. |
| 15 | `CredentialInfo` discriminator field `credential` | model.ts:470 | field | Medium | 1 Vague/generic, 15 Generic field names | The outer interface is `CredentialInfo`; the field that holds the credential payload is also `credential`. `Credential.credential.awsIamRole` reads as a stutter. Should be `cloudCredential` or `provider`. |
| 16 | `TableOperation` vs `VolumeOperation` enums | model.ts:17, 22 | enum pair | Low | 12 Duplicate concepts | `TableOperation = READ \| READ_WRITE`, `VolumeOperation = READ_VOLUME \| WRITE_VOLUME`. Same semantic (read-or-write a cloud-storage thing) expressed two different ways across sibling enums in the same file. |
| 17 | `unityCatalogIamArn` | model.ts:158 | field | Medium | 7 Overly verbose, 6 Misleading names | 18-char field name embedded in `AwsIamRole`. The JSDoc says "AWS IAM user managed by Databricks". Caller has no way to know that "unityCatalog" here means "the Databricks-managed identity that assumes the customer role". Either `databricksManagedIamArn` or rename to clarify role. |
| 18 | `AwsIamRole`, `AzureServicePrincipal`, `AzureManagedIdentity`, `GcpServiceAccountKey`, `DatabricksGcpServiceAccount`, `CloudflareApiToken` | model.ts:151, 192, 174, 610, 555, 214 | interface set | Low | 3 Acronym casing | Acronym handling differs: `Aws`, `Azure`, `Gcp`, `Iam` are all PascalCase-first-letter-only. Field names use the same (`awsIamRole`, `gcpServiceAccountKey`). Internally consistent, but `IAM`, `GCP`, `AWS` are all-caps acronyms; per the Google TS Style Guide (which the repo references) initialisms-as-words is the right choice — flag only because the JSDoc text uses ALL-CAPS forms ("AWS IAM role", "GCP", "AAD"). Pick one. |
| 19 | `aadToken` field, `AzureActiveDirectoryToken` type, `azureAad` discriminator case | model.ts:170, 168, 642 | name set | Low | 3 Acronym casing | The type is spelled out (`AzureActiveDirectoryToken`); the wire/discriminator/field name uses the acronym `Aad`. Inconsistent within the same chain (long name in type, short name in field/case). |
| 20 | `awsTempCredentials` discriminator case | model.ts:636 | field | Low | 5 Cryptic abbreviations | "Temp" abbreviation for "Temporary". Other discriminator cases use full words (`azureUserDelegationSas`, `gcpOauthToken`). Inconsistent. |
| 21 | `r2TempCredentials` discriminator case | model.ts:643 | field | Low | 5 Cryptic abbreviations | Same as #20. |
| 22 | `GcpOauthToken` type, `gcpOauthToken` field | model.ts:602, 603 | type/field | Low | 3 Acronym casing | "OAuth" is conventionally `OAuth` (RFC 6749 title casing). The code spells it `Oauth`. Sibling spec types in the auth package use `Oauth` too — internally consistent, but not RFC-conventional. |
| 23 | `R2Credentials` type | model.ts:861 | interface | Medium | 1 Vague/generic, 5 Cryptic abbreviations | "R2" is Cloudflare's object-storage service name. A reader who doesn't know Cloudflare's product line will be lost. Consider `CloudflareR2Credentials`. |
| 24 | `CloudflareApiToken.accountId` | model.ts:220 | field | Low | 19 Underspecified IDs | This `accountId` is a *Cloudflare* account ID, not a Databricks account ID. The field name doesn't say. Compare `unityCatalogIamArn` (#17) which is annotated. |
| 25 | `TemporaryAwsCredentials.accessPoint` | model.ts:958 | field | Low | 5 Cryptic abbreviations, 1 Vague/generic | A string containing an S3 Access Point ARN. `accessPointArn` would type itself. |
| 26 | `usedForManagedStorage` flag | model.ts:286 | field | Low | 6 Misleading names | Boolean named in past tense ("usedFor") suggests a historical record. The doc says it is the *current* state. `isManagedStorageRoot` or `isRootForManagedStorage` reads as state. |
| 27 | `GenerateTemporaryPathCredentialRequest` / `GenerateTemporaryTableCredentialRequest` / `GenerateTemporaryVolumeCredentialRequest` / `GenerateTemporaryServiceCredentialRequest` | model.ts:619, 690, 723, 654 | interface set | Medium | 7 Overly verbose, 12 Duplicate concepts | Four request types whose names are 38-41 characters long. They differ in the *operand* (path/table/volume/service). A `TemporaryPathRequest` / etc. shape, parameterized by operand, would shorten. |
| 28 | `TemporaryCredentials` | model.ts:961 | interface | Medium | 12 Duplicate concepts | The three `Generate*` response shapes carry the same field set (`credentials` union + `expirationTime` + `url`) as `TemporaryCredentials`. Only one canonical shape is needed; the others should re-export it. |
| 29 | `ValidateCredentialRequest.credential` outer field with `credential.$case === 'credentialName'` | model.ts:1226, 1228 | field | High | 12 Duplicate concepts, 15 Generic field names | The discriminated-union *case* is `credentialName: string`, sitting under a field called `credential`. So `req.credential.credentialName` is the read path — `credential.credential...` stuttering. |
| 30 | `ValidateStorageCredentialRequest.credential.$case === 'storageCredentialName'` | model.ts:1286 | field | High | 12 Duplicate concepts, 15 Generic field names | Same as #29 — `req.credential.storageCredentialName`. The naming repeats the parent type. |
| 31 | `expirationTime` (epoch milliseconds) | model.ts:649 | field | Medium | 6 Misleading names | "Time" is too generic; the value is an epoch-ms integer. Other timestamp-y fields in this file are `createdAt`/`updatedAt` (also epoch-ms). Inconsistent: should be `expiresAt` to match the `*At` pattern. |
| 32 | `purpose` field (referenced in JSDoc but absent from interface) | model.ts:264-266 (etc.) | (missing) | High | 6 Misleading names | The JSDoc text on `readOnly` and `usedForManagedStorage` (and elsewhere) says "Only applicable when purpose is **STORAGE**" / "**SERVICE**". But there is no `purpose` field on `CreateCredentialRequest`/`CredentialInfo`/`UpdateCredentialRequest`. Either the field is missing from the generated TS, or the doc is stale. Either way the contract is broken. |
| 33 | `executeCall` vs `executeHttpCall` | utils.ts:26, 65 | function pair | Medium | 17 Inconsistent action verbs | Two `execute*` functions with overlapping vocabulary. One translates options + dispatches retries, the other does one HTTP roundtrip. Cf. accountaccesscontrolproxy audit M5. |
| 34 | `ListCredentialsPublicRequest` | model.ts:776 | interface | High | 20 Proto-architectural leak | `Public` mid-position is an internal Databricks service-layout artifact (proto/RPC public-vs-internal route distinction). No TS caller cares; the package itself is the public surface. Sibling consolidated UC endpoints have no such infix — confirms `Public` is a wire/service-layer disambiguator that should not leak into the TS surface. |
| 35 | `Client.createCredentialsPublic` / `Client.deleteCredentialsPublic` / `Client.getCredentialsPublic` / `Client.listCredentialsPublic` | client.ts:927, 953, 978, 1003 | method set | High | 20 Proto-architectural leak | Four public methods on the SDK `Client` whose names carry the `Public` suffix. Reads as "the method on the public class that calls the public endpoint" — the suffix is meaningless to a TS caller and only exists because the underlying proto/spec uses `Public` to distinguish account-API routes. |

---

## High severity (must fix)

### H1. Cross-package collision: `credentials` vs `auth/credentials`

The repository has **two** "credentials" concepts:

- `@databricks/sdk-credentials` (this package) — Unity Catalog cloud storage
  credentials (AWS IAM roles, Azure SPs, GCP service accounts).
- `@databricks/sdk-auth/credentials/` (hand-written sub-module) — SDK *user*
  authentication credentials (PAT, OAuth U2M, OAuth M2M); see
  `packages/auth/src/credentials/{m2m,pat,u2m}.ts`. Their public surface uses
  the literal name `Credentials` (`M2mCredentials`, `U2mCredentials`,
  `PatCredentials`).

A consumer writing `import {Credentials} from '@databricks/sdk-...'` cannot
tell which package they want. Both legitimately call their primary concept
"credentials". Possible fixes (pick one):

- Rename this package to `@databricks/sdk-unity-catalog-credentials`,
  `@databricks/sdk-uc-credentials`, or `@databricks/sdk-storage-credentials`.
- Rename the auth-side to `@databricks/sdk-auth/identity` or `/providers`
  (followed by `IdentityProvider`, not `Credentials`).
- At minimum, document the disambiguation in both packages' README/JSDoc.

### H2. Whole-package internal duplication: `Credential` vs `StorageCredential`

Eight method pairs and eight interface pairs are field-for-field identical
between the "Credential" (new consolidated) surface and the "StorageCredential"
(legacy) surface. See findings #2-#9. The in-tree TODO note
(model.ts:766-770) confirms the storage variant is being deprecated. But:

- No `@deprecated` JSDoc tag on any of the `*StorageCredential*` types or
  methods.
- No log warning when a caller invokes them.
- They are equally promoted in `index.ts`.

Recommendation: mark every `*StorageCredential*` type and method `@deprecated`,
or hide them behind a `/legacy` sub-export, until they are removed.

### H3. Identical request envelopes (`Credential` and `StorageCredential` pairs)

`CreateCredentialRequest` and `CreateStorageCredentialRequest` (model.ts:300, 388)
have identical fields. Same for the Update, Delete, Get, List pairs (#3, #4, #6,
#7, #8). The discriminated unions on the `credential` field are subsets/supersets
of each other:

- `CreateStorageCredentialRequest` accepts: awsIamRole, azureServicePrincipal,
  gcpServiceAccountKey, azureManagedIdentity, databricksGcpServiceAccount,
  cloudflareApiToken (6 cases).
- `CreateCredentialRequest` accepts: the same 6 cases.

There is no behavioral difference. One should be a type alias.

### H4. Three-way name collision (`nameArg` + `name` + `newName`)

Six request types (`DeleteCredentialRequest`, `DeleteStorageCredentialRequest`,
`GetCredentialRequest`, `GetStorageCredentialRequest`, `UpdateCredentialRequest`,
`UpdateStorageCredentialRequest`) expose a field called `nameArg`. The "Arg"
suffix is meaningless on the TS side; it exists only because the generator
needs to disambiguate from a sibling `name` field that lives in the same
envelope on Update operations. TS callers will read `req.nameArg = 'my-credential'`
and have no idea why it isn't just `name`.

Combined with H5 below, the Update envelopes are particularly broken:

```ts
interface UpdateCredentialRequest {
  nameArg?: string;        // URL path parameter — which credential to update
  newName?: string;        // new credential name
  name?: string;           // body-level "credential name" — what does this even do?
  // ...
}
```

Three name-related fields on one envelope, no clear precedence. Recommend:
keep only `name` (path) + `newName` (rename) and drop the body-level `name`.

### H5. Body-level `name` collides with path-level `nameArg`

`UpdateCredentialRequest` and `UpdateStorageCredentialRequest` carry both
`nameArg` (path parameter) and `name` (body field). The JSDoc on `name` says
"The credential name. The name must be unique among storage and service
credentials within the metastore." — i.e., the *new* canonical name. But there
is *also* a `newName` field. So `nameArg`, `name`, and `newName` all reference
the same conceptual "credential name" with no clear precedence. See #13, #14.

### H6. `purpose` field is referenced in JSDoc but does not exist on the type

The JSDoc on `readOnly` (model.ts:264-266, etc.) and `usedForManagedStorage`
(model.ts:282-285) and `force` (model.ts:567-571) says "Only applicable when
purpose is **STORAGE**" or "**SERVICE**". But there is no `purpose` field
anywhere on `CreateCredentialRequest`/`UpdateCredentialRequest`/
`CredentialInfo`/`StorageCredentialInfo`. Either:

- The generator dropped the field, or
- The doc is stale (the API uses a different mechanism to decide purpose, e.g.
  inferring from which discriminator case is set, or routing by endpoint), or
- The field is intentionally on the `Credential` side only and missing from
  the model.

In all cases the contract documented in JSDoc cannot be honored by a TS
caller. See #32.

### H7. Stuttering `ValidateCredentialRequest.credential.credentialName`

`req.credential` is the discriminated-union outer field. One of its cases is
`{$case: 'credentialName', credentialName: string}` — so accessing the value
is `req.credential.credentialName` and the outer field is also named after
the same word. Same for `ValidateStorageCredentialRequest.credential.storageCredentialName`.

```ts
const req: ValidateCredentialRequest = {
  credential: {$case: 'credentialName', credentialName: 'my-cred'},
};
```

Reads twice as "credential.credentialName". The inner discriminator key should
be `name` (giving `req.credential.name`) — concise and unambiguous because the
case is `'credentialName'`.

### H8. `Public` infix proto-architectural leak (1 type + 4 methods)

Findings #34-#35. The package exposes **1 generated type** and **4 `Client`
methods** whose identifiers carry `Public` as a mid-position or trailing
word. The infix originates from the internal proto/service definition where
`Public` distinguishes externally-routable account-API endpoints from
internal RPCs; it has no meaning at the TS SDK boundary, where every
exported symbol is by definition public.

Types (model.ts):

- `ListCredentialsPublicRequest` (776).

Methods (client.ts):

- `createCredentialsPublic` (927).
- `deleteCredentialsPublic` (953).
- `getCredentialsPublic` (978).
- `listCredentialsPublic` (1003).

Note also: the sibling consolidated UC endpoints (`CreateCredentialRequest`,
`CreateStorageCredentialRequest`, etc.) do *not* carry `Public` even though
they are equally externally-routable. This inconsistency confirms `Public` is
not a deliberate domain term but a wire-layer artifact whose presence depends
on which generation pass produced the type.

Recommendation: drop the `Public` token from every identifier at the
generator level. Suggested renames:

| Current | Suggested |
|---------|-----------|
| `ListCredentialsPublicRequest` | `AccountsListCredentialsRequest` |
| `Client.createCredentialsPublic` | `Client.createAccountsCredentials` |
| `Client.listCredentialsPublic` | `Client.listAccountsCredentials` |

This is a generator-only fix — there is no way to rename these consistently
without touching the generator/spec.

---

## Medium severity (worth pushing back on)

### M1. `Credential` is a vague, generic noun

The interface `Credential` (and `Credentials`, `CredentialInfo`,
`CredentialName`) does not, in isolation, tell a TS reader anything about the
domain. The Databricks SDK has at least four distinct "credential" concepts:

1. SDK authentication (auth package).
2. Unity Catalog Storage Credentials (legacy this package).
3. Unity Catalog Service Credentials (new this package).
4. Cloud-provider credentials (vended via `TemporaryCredentials`).

A type named just `Credential` could be any of them. Domain-prefixing
(`StorageCredentialInfo`, `ServiceCredentialInfo`) at least narrows it.

### M2. `Client` is unqualified

`export class Client` (client.ts:106). Importing `{Client}` from `@databricks/sdk-credentials/v1`
and from any sibling package collides. Either:

- Export as `CredentialsClient`, or
- Rely on namespace imports.

### M3. Eight `client.ts` method pairs duplicate work

Sixteen methods, eight pairs. Each pair differs only in the URL it hits.
Cf. #11. The class is over 1000 lines, with ~30 lines of boilerplate per
method. Half of that is generated for the legacy storage-credentials path.

### M4. `TemporaryCredentials` shape duplicated across responses

`TemporaryCredentials` and the three `Generate*` response types carry the
same field set. The wire endpoints might differ (so each method returns its
own named type), but at the TS level there is no need to create multiple
declarations.

### M5. `R2Credentials` requires Cloudflare product knowledge

A type named `R2` is identifiable only to readers who know Cloudflare's
product line. The JSDoc gives no expansion. Use `CloudflareR2Credentials` or
add a JSDoc anchor.

### M6. `unityCatalogIamArn` field reads misleadingly

```ts
interface AwsIamRole {
  roleArn?: string;            // the customer's IAM role
  unityCatalogIamArn?: string; // Databricks-managed identity that assumes the customer role
  externalId?: string;
}
```

"unityCatalogIamArn" suggests *Unity Catalog's IAM ARN*. What it actually is:
the ARN of the Databricks-managed IAM user that performs the role assumption
(per the JSDoc). `databricksAssumeIdentityArn` or `assumerArn` would be
clearer.

### M7. `expirationTime` field naming

The field is an epoch-ms integer ("Server time when the credential will
expire"). The repo's convention elsewhere is `createdAt`/`updatedAt` (which
are also epoch-ms). Rename to `expiresAt` for consistency.

---

## Low severity (nits)

### L1. `TemporaryAwsCredentials.accessPoint` should carry the ARN suffix

The JSDoc says "The Amazon Resource Name (ARN) of the S3 access point". The
field is `accessPoint: string`. `accessPointArn` self-documents.

### L2. `CloudflareApiToken.accountId` is ambiguous

The `accountId` field is the Cloudflare account ID, not a Databricks account
ID. JSDoc says "The ID of the account associated with the API token" — also
ambiguous. Rename `cloudflareAccountId` or annotate.

### L3. `awsTempCredentials` / `r2TempCredentials` use "Temp" abbreviation

The peer discriminator cases use full words (`azureUserDelegationSas`,
`gcpOauthToken`). Standardize: either `awsTemporaryCredentials` or
`azureTempUserDelegationSas`.

### L4. `aadToken` field vs `AzureActiveDirectoryToken` type

Short form (`aadToken`) for the field, long form (`AzureActiveDirectoryToken`)
for the type. Acronym handling within one chain should match.

### L5. `GcpOauthToken` casing

RFC 6749 (OAuth 2.0) titles the term as "OAuth". The code uses "Oauth". Minor.

### L6. `usedForManagedStorage` flag past tense

"Used" reads as historical state. The doc says it is current state ("is this
the root storage credential"). `isManagedStorageRoot` reads as state.

### L7. `PACKAGE_SEGMENT` is undescriptive

Used only for the User-Agent header. `USER_AGENT_PACKAGE_SEGMENT` is
self-documenting.

### L8. `HttpCallOptions`

Generic name, internal-only. Same pattern as in sibling packages. Fine inside
the file; would warrant a better name if it leaked out.

### L9. `req` parameter naming in client methods

Standard across the SDK. Go-idiomatic, but consistent.

### L10. `Generate*CredentialRequest` method names are 30+ chars

`generateTemporaryServiceCredential` is 35 chars. Combined with `await
client.generateTemporaryServiceCredential(req)` the call site is 60+ chars
before the args. Cannot shorten without breaking the resource hierarchy.

### L11. Acronym casing review

- `Aws` (PascalCase first letter) — `AwsCredentials`, `AwsIamRole`,
  `awsIamRole`. Internally consistent.
- `Azure` (not an acronym) — fine.
- `Gcp` (PascalCase first letter) — `GcpOauthToken`, `gcpServiceAccountKey`.
  Internally consistent.
- `Aad` (mixed) — `aadToken` (field, short), `AzureActiveDirectoryToken`
  (type, long). Inconsistent. See #19.
- `Iam` — consistent with `Aws`/`Gcp` style.
- `R2` — special-cased product name. See M5/#23.
- `Sas` (PascalCase first letter) — `AzureUserDelegationSas`, `sasToken`.
  Consistent.
- `Oauth` — see L5/#22.

The JSDoc *text* in the same file uses ALL-CAPS forms ("AWS", "GCP", "IAM",
"AAD") because that is how the cloud providers write them. The Google TS
Style Guide prefers initialism-as-word (`Aws`, `Gcp`, `Iam`) for identifiers.
This is fine; just don't claim the spec uses the same casing.

---

## Cross-cutting observations (not flags)

### Confusion with `@databricks/sdk-auth/credentials/`

The hand-written auth/credentials sub-module exports:

- `M2mCredentialsError`, `U2mCredentialsError` (error classes).
- `M2mCredentialsErrorCode`, `U2mCredentialsErrorCode` (type aliases).
- `newM2mCredentials`, `newPatCredentials`, `newU2mCredentials` (factories).
- `M2mCredentialsOptions`, `U2mCredentialsOptions` (option types).

It does *not* export a type literally called `Credentials`; the closest is
the factory return type pattern (`*Credentials` named instances). Still, a
search-and-replace consumer who types "import {Credentials}" will hit both
packages. The simplest fix is package-level renaming (H1). For now, callers
must keep the import paths straight (`@databricks/sdk-credentials/v1` for UC
storage credentials, `@databricks/sdk-auth` for SDK auth credentials).

### Generator marker

Every file is prefixed with `// Code generated from API definition by
Databricks SDK Generator. DO NOT EDIT.` All naming issues here must be fixed
upstream in the generator/spec.

### Optionality model

Every field is `T | undefined`. Matches `exactOptionalPropertyTypes` and the
rest of the SDK.

### No reserved-word collisions

No `delete`, `class`, `new`, `default` (as field names).

### No singular/plural mismatches in interface names

`Credentials` vs `Credential` is used consistently:

- `TemporaryCredentials` (plural) — wraps a single credential value (a
  discriminated union); reads as "this is a temporary credentials *bundle*".
  Marginal.
- `R2Credentials`, `AwsCredentials` (plural) — wraps a single set of
  credential values (key + secret + session); fine as the convention is
  "credentials" for the bundle.
- `CredentialInfo` (singular) — one credential record. Consistent with
  Databricks API "Info" suffix.

### Versioning

Only `v1` exists; nothing to compare across versions.

### Tests

No `tests/` directory for this package.

### `index.ts` re-export style

Class re-exported with `export {Client}`; types and enums re-exported with
`export {IsolationMode, ...}` (for enums, which are runtime values) and
`export type {AwsCredentials, ...}` (for type-only interfaces). Correct for
`verbatimModuleSyntax`.

---

## Domain glossary (as inferred from this code)

| Term | Meaning in this package |
|------|-------------------------|
| **Credential** (new) | The consolidated UC credential record covering both Storage and Service purposes. Reached via `/api/2.1/unity-catalog/credentials`. |
| **Storage Credential** (legacy) | The older Storage-only credential record. Reached via `/api/2.1/unity-catalog/storage-credentials`. Per in-tree TODO, being deprecated. |
| **Service Credential** | A `Credential` whose purpose is **SERVICE** — used by Databricks to access cloud APIs on behalf of the user (e.g., for foundation models, external functions). Note: there is no `purpose` field on the TS model — see H6. |
| **Purpose** | One of `SERVICE` / `STORAGE`. Distinguishes the two flavors of a `Credential`. Referenced in JSDoc but absent from the TS type. |
| **Long-lived credential** | The customer-supplied cloud-provider auth material (IAM role, service principal, etc.) stored in the metastore. Six discriminated cases. |
| **Temporary credential** | Short-lived tokens vended by Databricks for direct cloud access. Six discriminated cases. |
| **External location** | A cloud-storage URL registered in UC and authorized via a Storage Credential. Validated by `validateCredential` / `validateStorageCredential`. |
| **Isolation mode** | Workspace-binding policy for the credential securable. One of `Unspecified`, `Open`, `Isolated`. |
| **Unbound credential** | A credential not bound to any workspace. Listable via `includeUnbound=true`. |
| **`nameArg`** | URL-path positional argument for the credential's name. Exists because the request envelope also carries body-level `name` and `newName` — see H4, H5. |
| **Access connector ID** (Azure) | The Azure resource ID of the Databricks Access Connector. |
| **AAD token** | Azure Active Directory access token (Oauth bearer for Azure cloud services). |
| **R2** | Cloudflare's S3-compatible object storage product (named after the SF-Bay-Area meme). |
| **External ID** | AWS confused-deputy mitigation token in role assumption. |

---

## File coverage

| File | Lines | Exports counted | Audited |
|------|-------|-----------------|---------|
| `src/v1/model.ts` | 2877 | 7 enums, 39 interfaces | yes |
| `src/v1/client.ts` | 1031 | 1 class, 22 public methods (20 RPC + 2 async generators) | yes |
| `src/v1/utils.ts` | 150 | 1 interface, 5 functions | yes |
| `src/v1/index.ts` | 80 | 1 class re-export, 7 enum re-exports, 51 type re-exports | yes |

Every type, field, enum value, and method enumerated above is accounted for.

---

## Fixed

- #18 `IsolationMode.ISOLATION_MODE_OPEN_IN_ACCOUNT` (originally cited at model.ts:9): Fixed in regeneration on 2026-05-20 — enum value removed; `IsolationMode` now contains only `UNSPECIFIED`/`OPEN`/`ISOLATED`.
- #28 `UcEncryptedToken` field/case (`ucEncryptedToken`, `UcEncryptedToken` type) (originally cited at model.ts:461, 775): Fixed in regeneration on 2026-05-20 — the `ucEncryptedToken` discriminator case and `UcEncryptedToken` interface no longer exist in the generated model.
- #34 `AccountsCreateStorageCredentialPublicRequest` (+ `_Response`) (originally cited at model.ts:56, 70): Fixed in regeneration on 2026-05-22 — `Public` infix dropped; symbols are now `AccountsCreateStorageCredentialRequest` / `AccountsCreateStorageCredentialRequest_Response`.
- #35 `AccountsDeleteStorageCredentialPublicRequest` (+ `_Response`) (originally cited at model.ts:75, 88): Fixed in regeneration on 2026-05-22 — `Public` infix dropped; symbols are now `AccountsDeleteStorageCredentialRequest` / `AccountsDeleteStorageCredentialRequest_Response`.
- #36 `AccountsGetStorageCredentialPublicRequest` (+ `_Response`) (originally cited at model.ts:91, 102): Fixed in regeneration on 2026-05-22 — `Public` infix dropped; symbols are now `AccountsGetStorageCredentialRequest` / `AccountsGetStorageCredentialRequest_Response`.
- #37 `AccountsListStorageCredentialsPublicRequest` (+ `_Response`) (originally cited at model.ts:107, 116): Fixed in regeneration on 2026-05-22 — `Public` infix dropped; symbols are now `AccountsListStorageCredentialsRequest` / `AccountsListStorageCredentialsRequest_Response`.
- #38 `AccountsUpdateStorageCredentialPublicRequest` (+ `_Response`) (originally cited at model.ts:122, 136): Fixed in regeneration on 2026-05-22 — `Public` infix dropped; symbols are now `AccountsUpdateStorageCredentialRequest` / `AccountsUpdateStorageCredentialRequest_Response`.
- #39 `CreateCredentialsPublicRequest` (originally cited at model.ts:378): Fixed in regeneration on 2026-05-22 — renamed to `CreateCredentialsRequest`.
- #40 `DeleteCredentialsPublicRequest` (originally cited at model.ts:578): Fixed in regeneration on 2026-05-22 — renamed to `DeleteCredentialsRequest`.
- #41 `GetCredentialsPublicRequest` (originally cited at model.ts:760): Fixed in regeneration on 2026-05-22 — renamed to `GetCredentialsRequest`.
- #43 `ListCredentialsPublicResponse` (originally cited at model.ts:780): Fixed in regeneration on 2026-05-22 — renamed to `ListCredentialsResponse`.
- #45 Eight Zod schema constants with `Public` infix (originally cited at model.ts:2020, 2037, 2294, 1346, 1358, 1362, 1374, 1386): Fixed in regeneration on 2026-05-22 — schemas renamed to drop `Public` (e.g. `marshalAccountsCreateStorageCredentialRequestSchema`, `unmarshalAccountsCreateStorageCredentialRequest_ResponseSchema`).
