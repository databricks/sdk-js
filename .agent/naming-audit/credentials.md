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
**Total weird names flagged:** 53

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | package `credentials` / module `@databricks/sdk-credentials` | (package) | package | High | 1 Vague/generic, 12 Duplicate concepts | Cross-package naming collision with `@databricks/sdk-auth`'s hand-written `credentials/` sub-module. Importers will routinely ask "which `credentials` did I want?" — one is SDK authentication (PAT, U2M, M2M); this is Unity Catalog cloud-storage credentials. |
| 2 | `CredentialInfo` vs `CreateCredential` vs `UpdateCredential` vs `StorageCredentialInfo` | model.ts:301, 148, 780, 676 | interface set | High | 12 Duplicate concepts | Four near-identical record shapes (~20 fields each) differ only in two flag fields (`skipValidation`, `force`, `newName`, `nameArg`). The "Info" suffix vs no suffix is meaningless. Real shape is one resource + a small action delta. |
| 3 | `CreateCredential` vs `CreateStorageCredential` | model.ts:148, 226 | interface pair | High | 12 Duplicate concepts | Field-for-field identical. The wire endpoints differ (`/credentials` vs `/storage-credentials`) but the request bodies are the same. One should be a re-export of the other or both should share a common base. |
| 4 | `UpdateCredential` vs `UpdateStorageCredential` | model.ts:780, 865 | interface pair | High | 12 Duplicate concepts | Same as #3 — body fields identical. |
| 5 | `CredentialInfo` vs `StorageCredentialInfo` | model.ts:301, 676 | interface pair | High | 12 Duplicate concepts | Same fields, same types, same optionality. The only thing distinguishing them is which list endpoint emits which. Generator-produced. |
| 6 | `DeleteCredential` vs `DeleteStorageCredential` | model.ts:387, 401 | interface pair | High | 12 Duplicate concepts | Both expose `{nameArg, force}`; identical shape. |
| 7 | `GetCredential` vs `GetStorageCredential` | model.ts:575, 585 | interface pair | High | 12 Duplicate concepts | Both expose `{nameArg}`. Same shape. |
| 8 | `ListCredentials` vs `ListStorageCredentials` | model.ts:598, 631 | interface pair | High | 12 Duplicate concepts | Both expose `{includeUnbound, maxResults, pageToken}`. Same shape, different doc string. |
| 9 | `ValidateCredential` vs `ValidateStorageCredential` | model.ts:950, 1008 | interface pair | High | 12 Duplicate concepts | The `credential` discriminator differs (`credentialName` vs `storageCredentialName`; storage variant adds `azureServicePrincipal` and `cloudflareApiToken`). Otherwise overlapping. |
| 10 | `Client` | client.ts:80 | class | Medium | 1 Vague/generic, 12 Duplicate concepts | Unqualified `Client` — once imported it shadows every other package's `Client`. `CredentialsClient` would self-identify. |
| 11 | `Client.createCredential` vs `Client.createStorageCredential` (plus delete/get/list/update/validate pairs) | client.ts:112, 142, 168, 199, 242, 277, 311, 348, 383, 411, 445, 509, 571, 602, 641, 680 | method set | High | 12 Duplicate concepts | The class exposes parallel `*Credential` and `*StorageCredential` operations (16 methods, 8 pairs). Per the in-tree TODO note (model.ts:581-583) the storage-credentials API is being deprecated, but both are surfaced equally — no `@deprecated` JSDoc, no log warning. |
| 12 | `nameArg` | model.ts:389, 403, 577, 587, 782, 867 | field | High | 5 Cryptic abbreviations, 14 Go/Java-style names | `nameArg` appears in six request types as the path parameter for the credential being acted on. "Arg" is meaningless to a TS caller (it's a generator-introduced disambiguator that exists because some envelopes also have a `name` body field). TS-side it should be `credentialName` or `nameInPath`. |
| 13 | `UpdateCredential.nameArg` and `UpdateCredential.name` coexist | model.ts:782, 797 | field pair | High | 12 Duplicate concepts, 15 Generic field names | Same envelope carries both `nameArg` (path) and `name` (body). The JSDoc doesn't say what to do when they differ; the JSDoc on `name` repeats `CreateCredential.name`'s text. Caller will pick wrong. |
| 14 | `UpdateStorageCredential.nameArg` and `UpdateStorageCredential.name` coexist | model.ts:867, 881 | field pair | High | 12 Duplicate concepts, 15 Generic field names | Same as #13 for the storage variant. |
| 15 | `CredentialInfo` discriminator field `credential` | model.ts:308 | field | Medium | 1 Vague/generic, 15 Generic field names | The outer interface is `CredentialInfo`; the field that holds the credential payload is also `credential`. `Credential.credential.awsIamRole` reads as a stutter. Should be `cloudCredential` or `provider`. |
| 16 | `_Response` / `_Result` / `_ValidationResult` / `_FileOperation` / `_AzureOptions` / `_GcpOptions` (proto-style underscore names) | model.ts:30, 41, 51, 399, 413, 450, 489, 499, 519, 553, 620, 652, 990, 1001, 1053, 1061 | type/enum | High | 4 Underscores in TS identifiers | TS does not use underscores in PascalCase identifiers. The 16 `Parent_Child` names (proto-message-nested-message-encoded-as-underscore) all require `// eslint-disable-next-line @typescript-eslint/naming-convention` comments. The hint is the surrounding ESLint disables — the generator already knows these violate the rule. |
| 17 | `ValidateCredential_Result` enum | model.ts:30 | enum | Medium | 4 Underscores in TS identifiers, 2 Redundant enum prefixes | The enum name says "Result", the values are `PASS`/`FAIL`/`SKIP`. Could be `ValidationResult` (no underscore) or `Outcome`. |
| 18 | `ValidateStorageCredential_Result` enum | model.ts:51 | enum | Medium | 4 Underscores in TS identifiers, 12 Duplicate concepts | Same shape as `ValidateCredential_Result` — `PASS`/`FAIL`/`SKIP`. Two enums with identical members differing only by name. Should be a shared type. |
| 19 | `ValidateStorageCredential_FileOperation` enum | model.ts:41 | enum | Medium | 4 Underscores in TS identifiers, 18 Long enum values | `LIST`/`READ`/`WRITE`/`DELETE`/`PATH_EXISTS`. The values are fine; the enum *name* is 39 chars. `FileOp` or merging with the validator's outer type would shorten. |
| 20 | `IsolationMode.ISOLATION_MODE_UNSPECIFIED` etc. | model.ts:5-10 | enum values | High | 2 Redundant enum prefixes, 18 Long enum values | All four values stutter the enum name (`ISOLATION_MODE_OPEN`, `ISOLATION_MODE_ISOLATED`, ...). TS idiom would be `IsolationMode.Unspecified`/`.Open`/`.Isolated`. The generator emits SCREAMING_SNAKE for both the keys and the string values. |
| 21 | `IsolationMode.ISOLATION_MODE_UNSPECIFIED` | model.ts:6 | enum value | Medium | 6 Misleading names, 18 Long enum values | "Unspecified" is the proto-style placeholder for "missing value". In TS the natural way to express this is `undefined`, not a sentinel string. The field type already is `IsolationMode \| undefined`. |
| 22 | `IsolationMode.ISOLATION_MODE_OPEN_IN_ACCOUNT` | model.ts:9 | enum value | Low | 18 Long enum values, 6 Misleading names | 30-char enum value; "OpenInAccount" is the contraction. The domain meaning ("open within a single account scope") is not obvious from either form. |
| 23 | `PathOperation` enum values | model.ts:13-15 | enum values | Medium | 2 Redundant enum prefixes, 18 Long enum values | `PATH_READ`, `PATH_READ_WRITE`, `PATH_CREATE_TABLE` — `PATH_` prefix duplicates the enum name. The third value (`PATH_CREATE_TABLE`) is a different category from the first two ("Path"-as-resource vs "create a table at this path"); the prefix obscures that. |
| 24 | `TableOperation` vs `VolumeOperation` enums | model.ts:18, 23 | enum pair | Low | 12 Duplicate concepts | `TableOperation = READ \| READ_WRITE`, `VolumeOperation = READ_VOLUME \| WRITE_VOLUME`. Same semantic (read-or-write) expressed two different ways. The volume one uses prefixed values (#20 pattern), the table one does not — inconsistent within the same file. |
| 25 | `VolumeOperation.READ_VOLUME`/`WRITE_VOLUME` | model.ts:24-25 | enum value | Medium | 2 Redundant enum prefixes, 18 Long enum values | `_VOLUME` suffix stutters the enum name. Should be `READ`/`WRITE` (consistent with `TableOperation`). |
| 26 | `unityCatalogIamArn` | model.ts:83 | field | Medium | 7 Overly verbose, 6 Misleading names | 18-char field name embedded in `AwsIamRole`. The JSDoc says "AWS IAM user managed by Databricks". Caller has no way to know that "unityCatalog" here means "the Databricks-managed identity that assumes the customer role". Either `databricksManagedIamArn` or rename to clarify role. |
| 27 | `AwsIamRole`, `AzureServicePrincipal`, `AzureManagedIdentity`, `GcpServiceAccountKey`, `DatabricksGcpServiceAccount`, `CloudflareApiToken` | model.ts:76, 117, 99, 427, 378, 139 | interface set | Low | 3 Acronym casing | Acronym handling differs: `Aws`, `Azure`, `Gcp`, `Iam` are all PascalCase-first-letter-only. Field names use the same (`awsIamRole`, `gcpServiceAccountKey`). Internally consistent, but `IAM`, `GCP`, `AWS` are all-caps acronyms; per the Google TS Style Guide (which the repo references) initialisms-as-words is the right choice — flag only because the JSDoc text uses ALL-CAPS forms ("AWS IAM role", "GCP", "AAD"). Pick one. |
| 28 | `aadToken` field, `AzureActiveDirectoryToken` type, `azureAad` discriminator case | model.ts:95, 93, 459 | name set | Low | 3 Acronym casing | The type is spelled out (`AzureActiveDirectoryToken`); the wire/discriminator/field name uses the acronym `Aad`. Inconsistent within the same chain (long name in type, short name in field/case). |
| 29 | `awsTempCredentials` discriminator case | model.ts:453 | field | Low | 5 Cryptic abbreviations | "Temp" abbreviation for "Temporary". Other discriminator cases use full words (`azureUserDelegationSas`, `gcpOauthToken`). Inconsistent. |
| 30 | `r2TempCredentials` discriminator case | model.ts:460 | field | Low | 5 Cryptic abbreviations | Same as #29. |
| 31 | `ucEncryptedToken` discriminator case | model.ts:461 | field | Medium | 5 Cryptic abbreviations | "Uc" is the Databricks-internal abbreviation for "Unity Catalog". Outside Databricks the abbreviation is opaque. Compare to `unityCatalogIamArn` (#26) which spells it out. Inconsistent within the same model file. |
| 32 | `UcEncryptedToken` type | model.ts:775 | interface | Medium | 5 Cryptic abbreviations, 1 Vague/generic | Same "Uc" abbreviation problem at the type name. Spell out or contextualize. |
| 33 | `GcpOauthToken` type, `gcpOauthToken` field | model.ts:419, 420 | type/field | Low | 3 Acronym casing | "OAuth" is conventionally `OAuth` (RFC 6749 title casing). The code spells it `Oauth`. Sibling spec types in the auth package use `Oauth` too — internally consistent, but not RFC-conventional. |
| 34 | `R2Credentials` type | model.ts:667 | interface | Medium | 1 Vague/generic, 5 Cryptic abbreviations | "R2" is Cloudflare's object-storage service name. A reader who doesn't know Cloudflare's product line will be lost. Consider `CloudflareR2Credentials`. |
| 35 | `CloudflareApiToken.accountId` | model.ts:145 | field | Low | 19 Underspecified IDs | This `accountId` is a *Cloudflare* account ID, not a Databricks account ID. The field name doesn't say. Compare `unityCatalogIamArn` (#26) which is annotated. |
| 36 | `AwsCredentials.accessPoint` | model.ts:72 | field | Low | 5 Cryptic abbreviations, 1 Vague/generic | A string containing an S3 Access Point ARN. `accessPointArn` would type itself. |
| 37 | `usedForManagedStorage` flag | model.ts:216 | field | Low | 6 Misleading names | Boolean named in past tense ("usedFor") suggests a historical record. The doc says it is the *current* state. `isManagedStorageRoot` or `isRootForManagedStorage` reads as state. |
| 38 | `isolationMode` vs `IsolationMode` (type alias collision risk) | model.ts:223 | field | Low | (none) | Standard generator pattern (field name lower-cased version of enum type). Already idiomatic; no issue. (Listing for completeness.) |
| 39 | `GenerateTemporaryPathCredential` / `GenerateTemporaryTableCredential` / `GenerateTemporaryVolumeCredential` / `GenerateTemporaryServiceCredential` | model.ts:436, 508, 542, 472 | interface set | Medium | 7 Overly verbose, 12 Duplicate concepts | Four request types whose names are 31-34 characters long. They differ in the *operand* (path/table/volume/service). A `TemporaryPathRequest` / etc. shape, parameterized by operand, would shorten. |
| 40 | `GenerateTemporaryPathCredential_Response` / `..._TableCredential_Response` / `..._VolumeCredential_Response` | model.ts:450, 519, 553 | interface set | Medium | 4 Underscores, 7 Overly verbose, 12 Duplicate concepts | Three response shapes (39-42 char names) with **identical** fields: `credentials` union + `expirationTime` + `url`. They are also identical to `TemporaryCredentials` (model.ts:749). Four parallel definitions of the same shape. |
| 41 | `TemporaryCredentials` | model.ts:749 | interface | Medium | 12 Duplicate concepts | This and the three `Generate*_Response` types (#40) are the same shape. Only one should exist; the other three should re-export it. |
| 42 | `GenerateTemporaryServiceCredential_AzureOptions` | model.ts:489 | interface | High | 4 Underscores in TS identifiers, 7 Overly verbose | 47 chars. The `_AzureOptions` proto-style suffix is the third underscore-segment in the name. |
| 43 | `GenerateTemporaryServiceCredential_GcpOptions` | model.ts:499 | interface | High | 4 Underscores in TS identifiers, 7 Overly verbose | Same as #42 — 45 chars. |
| 44 | `GenerateTemporaryServiceCredential.options.$case` discriminator values | model.ts:477, 481 | field | Low | 1 Vague/generic | The discriminator is `azureOptions` / `gcpOptions`. "Options" gives no domain hint — could be query options, retry options, etc. Within the type they are token-generation parameters. |
| 45 | `ValidateCredential.credential` outer field with `credential.$case === 'credentialName'` | model.ts:951, 953 | field | High | 12 Duplicate concepts, 15 Generic field names | The discriminated-union *case* is `credentialName: string`, sitting under a field called `credential`. So `req.credential.credentialName` is the read path — `credential.credential...` stuttering. |
| 46 | `ValidateStorageCredential.credential.$case === 'storageCredentialName'` | model.ts:1011 | field | High | 12 Duplicate concepts, 15 Generic field names | Same as #45 — `req.credential.storageCredentialName`. The naming repeats the parent type. |
| 47 | `dryRun` on `GenerateTemporaryPathCredential` | model.ts:446 | field | Low | (none) | Camel-cased boolean, conventional. (Listing for completeness.) |
| 48 | `expirationTime` (epoch milliseconds) | model.ts:467 | field | Medium | 6 Misleading names | "Time" is too generic; the value is an epoch-ms integer. Other timestamp-y fields in this file are `createdAt`/`updatedAt` (also epoch-ms). Inconsistent: should be `expiresAt` to match the `*At` pattern. |
| 49 | `createdAt`, `updatedAt`, `createdBy`, `updatedBy` | model.ts:205, 209, 207, 211 | field set | Low | (none) | Standard, consistent across the file. (Listing for completeness.) |
| 50 | `purpose` field (referenced in JSDoc but absent from interface) | model.ts:107-110 (etc.) | (missing) | High | 6 Misleading names | The JSDoc text on `readOnly` and `usedForManagedStorage` (and elsewhere) says "Only applicable when purpose is **STORAGE**" / "**SERVICE**". But there is no `purpose` field on `CreateCredential`/`CredentialInfo`/`UpdateCredential`. Either the field is missing from the generated TS, or the doc is stale. Either way the contract is broken. |
| 51 | `marshalXxxSchema` / `unmarshalXxxSchema` const naming | model.ts:1070-2293 | const set | Low | 14 Go/Java-style names, 20 Type-suffix tautology | `marshal`/`unmarshal` are Go-idioms; `Schema` is tautological with `z.ZodType<T>`. TS idiom is `encode`/`decode`. Generator-wide pattern. |
| 52 | `executeCall` vs `executeHttpCall` | utils.ts:26, 65 | function pair | Medium | 17 Inconsistent action verbs | Two `execute*` functions with overlapping vocabulary. One translates options + dispatches retries, the other does one HTTP roundtrip. Cf. accountaccesscontrolproxy audit M5. |
| 53 | `parseResponse` vs `marshalRequest` | utils.ts:113, 119 | function pair | Low | 17 Inconsistent action verbs | Mixing `parse`/`marshal`. Either `parse`/`format` or `marshal`/`unmarshal`. |

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
(model.ts:581-583) confirms the storage variant is being deprecated. But:

- No `@deprecated` JSDoc tag on any of the `*StorageCredential` types or
  methods.
- No log warning when a caller invokes them.
- They are equally promoted in `index.ts`.

Recommendation: mark every `*StorageCredential` type and method `@deprecated`,
or hide them behind a `/legacy` sub-export, until they are removed.

### H3. Identical request envelopes (`Credential` and `StorageCredential` pairs)

`CreateCredential` and `CreateStorageCredential` (model.ts:148, 226) have
identical fields. Same for the Update, Delete, Get, List pairs (#3, #4, #6, #7,
#8). The discriminated unions on the `credential` field are subsets/supersets
of each other:

- `CreateStorageCredential` accepts: awsIamRole, azureServicePrincipal,
  gcpServiceAccountKey, azureManagedIdentity, databricksGcpServiceAccount,
  cloudflareApiToken (6 cases).
- `CreateCredential` accepts: the same 6 cases.

There is no behavioral difference. One should be a type alias.

### H4. `nameArg` field convention

Six request types (`DeleteCredential`, `DeleteStorageCredential`,
`GetCredential`, `GetStorageCredential`, `UpdateCredential`,
`UpdateStorageCredential`) expose a field called `nameArg`. The "Arg" suffix
is meaningless on the TS side; it exists only because the generator needs to
disambiguate from a sibling `name` field that lives in the same envelope on
Update operations. TS callers will read `req.nameArg = 'my-credential'` and
have no idea why it isn't just `name`.

Combined with H5 below, the Update envelopes are particularly broken:

```ts
interface UpdateCredential {
  nameArg?: string;        // URL path parameter — which credential to update
  newName?: string;        // new credential name
  name?: string;           // body-level "credential name" — what does this even do?
  // ...
}
```

Three name-related fields on one envelope, no clear precedence. Recommend:
keep only `name` (path) + `newName` (rename) and drop the body-level `name`.

### H5. Body-level `name` collides with path-level `nameArg`

`UpdateCredential` and `UpdateStorageCredential` carry both `nameArg` (path
parameter) and `name` (body field). The JSDoc on `name` says "The credential
name. The name must be unique among storage and service credentials within the
metastore." — i.e., the *new* canonical name. But there is *also* a `newName`
field. So `nameArg`, `name`, and `newName` all reference the same conceptual
"credential name" with no clear precedence. See #13, #14.

### H6. `purpose` field is referenced in JSDoc but does not exist on the type

The JSDoc on `readOnly` (model.ts:194-196, 268-272, etc.) and
`usedForManagedStorage` (model.ts:212-216) and `force` (model.ts:391-394) says
"Only applicable when purpose is **STORAGE**" or "**SERVICE**". But there is
no `purpose` field anywhere on `CreateCredential`/`UpdateCredential`/
`CredentialInfo`/`StorageCredentialInfo`. Either:

- The generator dropped the field, or
- The doc is stale (the API uses a different mechanism to decide purpose, e.g.
  inferring from which discriminator case is set, or routing by endpoint), or
- The field is intentionally on the `Credential` side only and missing from
  the model.

In all cases the contract documented in JSDoc cannot be honored by a TS
caller. See #50.

### H7. Eighteen `_`-bearing TS identifiers

Sixteen types and two enums use proto-style underscore-encoded nested
identifiers. Each requires an inline `// eslint-disable-next-line
@typescript-eslint/naming-convention` because the project's linter forbids
underscores. The presence of those disables is the loudest possible signal
that the names violate the codebase's own conventions:

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DeleteCredential_Response {}
```

Names affected: `ValidateCredential_Result`, `ValidateStorageCredential_FileOperation`,
`ValidateStorageCredential_Result`, `DeleteCredential_Response`,
`DeleteStorageCredential_Response`, `GenerateTemporaryPathCredential_Response`,
`GenerateTemporaryTableCredential_Response`,
`GenerateTemporaryVolumeCredential_Response`,
`GenerateTemporaryServiceCredential_AzureOptions`,
`GenerateTemporaryServiceCredential_GcpOptions`, `ListCredentials_Response`,
`ListStorageCredentials_Response`, `ValidateCredential_Response`,
`ValidateCredential_ValidationResult`, `ValidateStorageCredential_Response`,
`ValidateStorageCredential_ValidationResult`, and the corresponding
`marshal*Schema`/`unmarshal*Schema` constants.

Standard TS idiom would nest these inside namespaces (`ValidateCredential.Result`)
or give them top-level domain names (`ValidationOutcome`,
`PathCredentialResponse`).

### H8. Stuttering `ValidateCredential.credential.credentialName`

`req.credential` is the discriminated-union outer field. One of its cases is
`{$case: 'credentialName', credentialName: string}` — so accessing the value
is `req.credential.credentialName` and the outer field is also named after
the same word. Same for `ValidateStorageCredential.credential.storageCredentialName`.

```ts
const req: ValidateCredential = {
  credential: {$case: 'credentialName', credentialName: 'my-cred'},
};
```

Reads twice as "credential.credentialName". The inner discriminator key should
be `name` (giving `req.credential.name`) — concise and unambiguous because the
case is `'credentialName'`.

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

`export class Client` (client.ts:80). Importing `{Client}` from `@databricks/sdk-credentials/v1`
and from any sibling package collides. Either:

- Export as `CredentialsClient`, or
- Rely on namespace imports.

### M3. Eight `client.ts` method pairs duplicate work

Sixteen methods, eight pairs. Each pair differs only in the URL it hits.
Cf. #11. The class is 707 lines, the marshaling/unmarshaling roundtrips
inside each method add ~30 lines of boilerplate per method. Half of that is
generated for the legacy storage-credentials path.

### M4. `IsolationMode` enum values stutter the enum name

```ts
enum IsolationMode {
  ISOLATION_MODE_UNSPECIFIED,
  ISOLATION_MODE_OPEN,
  ISOLATION_MODE_ISOLATED,
  ISOLATION_MODE_OPEN_IN_ACCOUNT,
}
```

TS idiom (Google TS Style Guide §5.6) is PascalCase for enum members and no
prefix duplication:

```ts
enum IsolationMode {
  Unspecified,
  Open,
  Isolated,
  OpenInAccount,
}
```

The wire format is dictated by the API server (the string values must remain
`ISOLATION_MODE_*`); but the TS keys can be renamed via the zod `transform`
without breaking the wire.

### M5. `*Operation` enums are inconsistent with each other

```ts
enum PathOperation   { PATH_READ, PATH_READ_WRITE, PATH_CREATE_TABLE }
enum TableOperation  { READ, READ_WRITE }
enum VolumeOperation { READ_VOLUME, WRITE_VOLUME }
```

Three enums for the same domain (read/write a cloud-storage thing) with three
different prefixing conventions. Pick one. (See #23, #25.)

### M6. `TemporaryCredentials` shape duplicated four times

`TemporaryCredentials`, `GenerateTemporaryPathCredential_Response`,
`GenerateTemporaryTableCredential_Response`,
`GenerateTemporaryVolumeCredential_Response` — four interfaces, identical
fields. The wire endpoints might differ (so each method returns its own
named type), but at the TS level there is no need to create four
declarations.

### M7. `UcEncryptedToken` and `Uc*` discriminator case use unspelled-out abbreviation

`Uc` = "Unity Catalog". A TS-side consumer outside Databricks won't recognize
the abbreviation. The same model file uses `unityCatalog` spelled out on
`AwsIamRole.unityCatalogIamArn` (#26) — inconsistent within the file. Pick
either `UnityCatalogEncryptedToken` everywhere or `Uc*` everywhere.

### M8. `R2Credentials` requires Cloudflare product knowledge

A type named `R2` is identifiable only to readers who know Cloudflare's
product line. The JSDoc gives no expansion. Use `CloudflareR2Credentials` or
add a JSDoc anchor.

### M9. `unityCatalogIamArn` field reads misleadingly

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

### M10. `expirationTime` field naming

The field is an epoch-ms integer ("Server time when the credential will
expire"). The repo's convention elsewhere is `createdAt`/`updatedAt` (which
are also epoch-ms). Rename to `expiresAt` for consistency.

### M11. `IsolationMode.ISOLATION_MODE_UNSPECIFIED` sentinel value

Proto-style "Unspecified" sentinel. In TS, the field is already
`isolationMode?: IsolationMode | undefined`, so omitting the field communicates
"unspecified" naturally. The enum value is dead code. Either remove it or
document that callers should *not* set it.

---

## Low severity (nits)

### L1. `AwsCredentials.accessPoint` should carry the ARN suffix

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

### L7. `marshal`/`unmarshal` are Go-idioms

JS/TS ecosystem uses `encode`/`decode`, `parse`/`stringify`, or
`serialize`/`deserialize`. Generator-wide.

### L8. `parseResponse` vs `marshalRequest` mix

`utils.ts` has both verbs. Either `parse`/`format` or `marshal`/`unmarshal`.

### L9. `PACKAGE_SEGMENT` is undescriptive

Used only for the User-Agent header. `USER_AGENT_PACKAGE_SEGMENT` is
self-documenting.

### L10. `HttpCallOptions`

Generic name, internal-only. Same pattern as in sibling packages. Fine inside
the file; would warrant a better name if it leaked out.

### L11. `req` parameter naming in client methods

Standard across the SDK. Go-idiomatic, but consistent.

### L12. `Generate*Credential` method names are 30+ chars

`generateTemporaryServiceCredential` is 35 chars. Combined with `await
client.generateTemporaryServiceCredential(req)` the call site is 60+ chars
before the args. Cannot shorten without breaking the resource hierarchy.

### L13. Acronym casing review

- `Aws` (PascalCase first letter) — `AwsCredentials`, `AwsIamRole`,
  `awsIamRole`. Internally consistent.
- `Azure` (not an acronym) — fine.
- `Gcp` (PascalCase first letter) — `GcpOauthToken`, `gcpServiceAccountKey`.
  Internally consistent.
- `Aad` (mixed) — `aadToken` (field, short), `AzureActiveDirectoryToken`
  (type, long). Inconsistent. See #28.
- `Iam` — consistent with `Aws`/`Gcp` style.
- `R2` — special-cased product name. See M8/#34.
- `Sas` (PascalCase first letter) — `AzureUserDelegationSas`, `sasToken`.
  Consistent.
- `Uc` — see M7/#31/#32.
- `Oauth` — see L5/#33.

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
| **Isolation mode** | Workspace-binding policy for the credential securable. One of `Unspecified`, `Open`, `Isolated`, `OpenInAccount`. |
| **Unbound credential** | A credential not bound to any workspace. Listable via `includeUnbound=true`. |
| **`nameArg`** | URL-path positional argument for the credential's name. Exists because the request envelope also carries body-level `name` and `newName` — see H4, H5. |
| **Access connector ID** (Azure) | The Azure resource ID of the Databricks Access Connector. |
| **AAD token** | Azure Active Directory access token (Oauth bearer for Azure cloud services). |
| **UC encrypted token** | Encrypted ScopedCloudToken fallback when the cloud provider's token cannot be downscoped. Base64 string. |
| **R2** | Cloudflare's S3-compatible object storage product (named after the SF-Bay-Area meme). |
| **External ID** | AWS confused-deputy mitigation token in role assumption. |

---

## File coverage

| File | Lines | Exports counted | Audited |
|------|-------|-----------------|---------|
| `src/v1/model.ts` | 2293 | 7 enums, 32 interfaces, 33 zod consts (15 unmarshal + 18 marshal) | yes |
| `src/v1/client.ts` | 707 | 1 class, 18 public methods (16 RPC + 2 async generators) | yes |
| `src/v1/utils.ts` | 151 | 1 interface, 5 functions | yes |
| `src/v1/index.ts` | 60 | 1 class re-export, 6 enum re-exports, 39 type re-exports | yes |

Every type, field, enum value, and method enumerated above is accounted for.
