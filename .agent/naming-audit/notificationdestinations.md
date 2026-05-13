# Naming Audit: notificationdestinations

**Path:** `packages/notificationdestinations/src/v1/`
**Versions audited:** v1
**Inferred domain:** Workspace-level CRUD over "notification destinations" — named, persisted records that pair a `displayName` with one config out of five wire-format channels (Slack, Email, GenericWebhook, PagerDuty, MicrosoftTeams). The REST surface is `/api/2.0/notification-destinations`, with the usual `create` / `get` / `list` / `update` / `delete` plus a paged async iterator. Every channel-config carries the same `*Set: boolean` companion shape: secret fields are write-only on input and the server echoes only a "is it set?" mirror on output. There are zero typed timestamps, zero enum sub-types beyond `DestinationType`, and the only oneof is the discriminated `Config` union.
**Total weird names flagged:** 26

## Summary

| Severity | Count |
| --- | --- |
| High | 6 |
| Medium | 9 |
| Low | 7 |
| Observation | 4 |

## Summary table

| # | Severity | Location | Name | Category |
|---|----------|----------|------|----------|
| 1 | High | `model.ts:5-11` | `DestinationType` | 1 (vague), 2 (redundant enum prefix) |
| 2 | High | `model.ts:5-11` | `DestinationType.PAGERDUTY` / `MICROSOFT_TEAMS` | 3 (acronym casing inconsistency) |
| 3 | High | `model.ts:8` | `DestinationType.WEBHOOK` (vs `GenericWebhookConfig`) | 6 (misleading), 12 (duplicate concept name mismatch) |
| 4 | High | `model.ts:13-21` | `Config` (type) and `Config.config` (field) | 1 (vague), 9 (self-referential) |
| 5 | High | `model.ts:117` | `PagerdutyConfig` (type) and `pagerduty` ($case) | 3 (acronym casing inconsistency) |
| 6 | High | `model.ts:42-55` | `GenericWebhookConfig` | 1 (vague — "generic" carries no info) |
| 7 | Medium | `model.ts:46`, `:50`, `:54`, `:87` etc. | `urlSet` / `usernameSet` / `passwordSet` / `appIdSet` / `authSecretSet` / `channelUrlSet` / `tenantIdSet` / `integrationKeySet` / `oauthTokenSet` / `channelIdSet` | 6 (misleading), 15 (generic field naming pattern) |
| 8 | Medium | `model.ts:23-28` / `:139-146` | `CreateNotificationDestinationRequest` / `UpdateNotificationDestinationRequest` | 7 (overly verbose), 8 (redundant `Request` suffix conjoined with full noun phrase) |
| 9 | Medium | `model.ts:66-70` | `ListNotificationDestinationsResponse` | 7 (overly verbose), 8 (redundant `Response` suffix) |
| 10 | Medium | `client.ts:45` | `Client` (unprefixed class) | 1 (vague), 12 (duplicate across SDK) |
| 11 | Medium | `client.ts:186-201` | `listNotificationDestinationsIter` | 5 (cryptic abbreviation `Iter`) |
| 12 | Medium | `model.ts:67` | `ListNotificationDestinationsResponse.results` | 1 (vague), 15 (generic field name) |
| 13 | Medium | `model.ts:73`, `:107` | `id` (UUID) | 19 (underspecified ID) |
| 14 | Medium | `model.ts:118` | `PagerdutyConfig.integrationKey` (vs `*Set` companion) | 6 (misleading optionality semantics, output-only mirror) |
| 15 | Medium | `model.ts:78`, `:112` | `destinationType` field | 20 (type-suffix tautology when combined with the type name) |
| 16 | Low | `model.ts:5-11` | enum values are SCREAMING_SNAKE_CASE in TS | 4 (underscores in TS identifier strings) |
| 17 | Low | `model.ts:8` | `WEBHOOK` enum singular while wire-config implies "generic" | 9 (singular/plural / qualifier mismatch with `GenericWebhookConfig`) |
| 18 | Low | `client.ts:71`, `:100`, `:125`, `:150`, `:204` | `createNotificationDestination` / `deleteNotificationDestination` / `getNotificationDestination` / `listNotificationDestinations` / `updateNotificationDestination` | 7 (overly verbose method names) |
| 19 | Low | `client.ts:40-43` | `PACKAGE_SEGMENT` | 1 (vague), 15 (generic) |
| 20 | Low | `utils.ts:15-19` | `HttpCallOptions` | 1 (vague), 12 (duplicate `Options`) |
| 21 | Low | `utils.ts:26` / `:65` | `executeCall` / `executeHttpCall` near-duplicate | 1 (vague), 17 (inconsistent layer naming) |
| 22 | Low | `utils.ts:113`, `:119` | `parseResponse` / `marshalRequest` verb mismatch | 17 (inconsistent action verbs) |
| 23 | Low | `client.ts:80`, `:105`, etc. | `req` / `resp` / `opts` / `httpReq` abbreviations | 5 (cryptic abbreviation) |
| 24 | Obs | `model.ts:43-54` | `[Input-Only]` / `[Output-Only]` doc convention is not encoded in types | 6 (type-level dishonesty) |
| 25 | Obs | `index.ts:5-23` | Re-exports the verbose names verbatim, no friendlier aliases | — |
| 26 | Obs | — | `NEXT_CHANGELOG.md` and pre-existing build/lint workflows | — |

## High severity

### 1. `DestinationType` — vague enum name lacks domain anchor — `src/v1/model.ts:5-11`
- **Code:**
  ```ts
  export enum DestinationType {
    SLACK = 'SLACK',
    EMAIL = 'EMAIL',
    WEBHOOK = 'WEBHOOK',
    PAGERDUTY = 'PAGERDUTY',
    MICROSOFT_TEAMS = 'MICROSOFT_TEAMS',
  }
  ```
- **Why weird:** Exported at package root as just `DestinationType`. The word "destination" is overloaded across the SDK — there is a `destination` concept in jobs (`webhook destination`), workflows (`sink destination`), and infra (`DBFS destination`). A user `import { DestinationType } from '@databricks/sdk-notificationdestinations/v1'` and then mixing it with `import { DestinationType } from '@databricks/sdk-pipelines/v1'` (if it existed) will get a name collision. Also, the values are not "destination types" but "notification channels"; the enum mixes the term-of-art ("destination" = the addressable target) with the type-of-target. Compare with `notification-destinations` REST path: the enum could be `NotificationChannel` or `NotificationDestinationKind`.
- **Category:** 1 (vague/generic), 2 (the enum prefix `Destination` is redundant with the field name `destinationType` — see also finding 15).
- **Suggested name:** `NotificationChannel` (mirrors how the Go SDK names protobuf enums for kindred resources) or, less invasive, `NotificationDestinationType`.
- **Rationale:** Domain-anchored enum names protect users from cross-package collisions and read better in IDE autocomplete (`NotificationChannel.SLACK` vs `DestinationType.SLACK`).

### 2. `DestinationType.PAGERDUTY` and `.MICROSOFT_TEAMS` — acronym/brand casing inconsistency — `src/v1/model.ts:9-10`
- **Code:**
  ```ts
  PAGERDUTY = 'PAGERDUTY',
  MICROSOFT_TEAMS = 'MICROSOFT_TEAMS',
  ```
- **Why weird:** Inside this package the brand "PagerDuty" appears in **five** different casings:
  - `DestinationType.PAGERDUTY` (all caps, no separator) — enum value (line 9).
  - `{$case: 'pagerduty', pagerduty: ...}` (all lower) — oneof discriminant + field (line 18).
  - `PagerdutyConfig` (TitleCase but **not** `PagerDutyConfig`) — interface name (line 117).
  - `pagerduty` (wire) — JSON key (lines 155, 172, 282).
  - `PagerDuty` (TitleCase with internal D) — JSDoc prose only (line 118 "Integration key for PagerDuty").
  
  The same applies to Microsoft Teams: `MICROSOFT_TEAMS`, `microsoftTeams` ($case), `MicrosoftTeamsConfig`, `microsoft_teams` (wire). Only the wire and JSDoc are externally fixed; the TS identifier choices `Pagerduty` (vs `PagerDuty`) and `MicrosoftTeams` (already correct) are an internal choice — and they are not consistent with the brand. The TS Style Guide is explicit: brand acronyms keep their canonical casing in identifiers (PagerDuty, GitHub, GraphQL). `Pagerduty` reads as a typo.
- **Category:** 3 (acronym casing inconsistency).
- **Suggested name:** `PagerDutyConfig` (interface), `PagerDuty = 'PAGERDUTY'` (enum value can keep wire string but the **identifier** should be `PagerDuty` if mixed-case enum names were used; SCREAMING_SNAKE is wire-faithful, see finding 16). For consistency at minimum rename `PagerdutyConfig` → `PagerDutyConfig` and the `$case: 'pagerduty'` → `$case: 'pagerDuty'`.
- **Rationale:** Brand names are part of the public API surface; users reading IDE autocomplete should see `PagerDutyConfig` matching the company's own capitalisation. The cost is one schema rename across `unmarshalConfigSchema`'s discriminator strings — the wire JSON key stays `pagerduty`.

### 3. `DestinationType.WEBHOOK` corresponds to `GenericWebhookConfig` — misleading enum vs config asymmetry — `src/v1/model.ts:8`, `:42-55`, `:17`
- **Code:**
  ```ts
  // enum value
  WEBHOOK = 'WEBHOOK',
  // config type
  export interface GenericWebhookConfig { ... }
  // discriminator
  | {$case: 'genericWebhook'; genericWebhook: GenericWebhookConfig}
  ```
- **Why weird:** Of the five channels, four have an enum value that matches their config name in lowercase (`SLACK`/`SlackConfig`, `EMAIL`/`EmailConfig`, `PAGERDUTY`/`PagerdutyConfig`, `MICROSOFT_TEAMS`/`MicrosoftTeamsConfig`). Only the webhook case introduces an unexplained qualifier: the enum says `WEBHOOK`, the config type says `GenericWebhookConfig`. A user is left wondering whether "generic" means "the default kind of webhook" or whether there's a future non-generic webhook config coming. The `$case` discriminant uses `'genericWebhook'`, the wire uses `'generic_webhook'`, but the enum value drops the qualifier entirely. Either the enum should be `GENERIC_WEBHOOK` (matching the config name) or the config should be `WebhookConfig` (matching the enum).
- **Category:** 6 (misleading — name asymmetry across the same channel), 12 (the same conceptual channel has two different names in the same file).
- **Suggested name:** Pick one: rename the enum value to `GENERIC_WEBHOOK` (preferred, preserves the qualifier that distinguishes from MS-Teams' webhook URL), or rename `GenericWebhookConfig` → `WebhookConfig`.
- **Rationale:** The `MicrosoftTeamsConfig` and `GenericWebhookConfig` both have a `url` field that is "a webhook URL" (lines 44, 85), so the qualifier "generic" is genuinely meaningful — it distinguishes the channel-agnostic incoming-webhook target from the Teams-branded webhook. Keep the qualifier, but propagate it to the enum.

### 4. `Config` (interface) and its `config` field — vague top-level name + self-referential field — `src/v1/model.ts:13-21`
- **Code:**
  ```ts
  export interface Config {
    config?:
      | {$case: 'slack'; slack: SlackConfig}
      | {$case: 'email'; email: EmailConfig}
      | {$case: 'genericWebhook'; genericWebhook: GenericWebhookConfig}
      | {$case: 'pagerduty'; pagerduty: PagerdutyConfig}
      | {$case: 'microsoftTeams'; microsoftTeams: MicrosoftTeamsConfig}
      | undefined;
  }
  ```
- **Why weird:** The type name `Config` is one of the most generic identifiers in software. A package-root `Config` export means an app barrel re-exporting `@databricks/sdk-notificationdestinations/v1` collides instantly with any other `Config` (web framework configs, app configs, build configs, …). The user must alias it. Compounding the vagueness, the field inside `Config` is also named `config`, so you read `notificationDestination.config.config.email.addresses` — the same identifier appears twice along the path.
- **Category:** 1 (vague/generic top-level name), 9 (self-referential field name).
- **Suggested name:** Rename the type to `NotificationDestinationConfig` (matches the package's domain prefix). The `$case` discriminator is a generator-specific convention (proto-loader's oneof shape) — a hand-written API would use `kind` or `type`. Flagging because it's user-visible.
- **Rationale:** Discriminated unions are first-class in TS; protobuf oneof wrappers are not. The 1:1 port philosophy preserves the wrapper for marshalling fidelity, but the *name* of the wrapper should at least not be `Config`.

### 5. `PagerdutyConfig` and `pagerduty` — see #2, separate finding because the `$case` discriminant is also visible to users — `src/v1/model.ts:18`, `:117`, `:280`
- **Code:** see #2.
- **Why weird:** The `$case: 'pagerduty'` string literal is what users *write* when constructing a `Config`:
  ```ts
  const cfg: Config = { config: { $case: 'pagerduty', pagerduty: { integrationKey: '...' } } };
  ```
  So both the type name `PagerdutyConfig` and the literal `'pagerduty'` are part of the API surface. The lowercase form is fixed (it's the JSON key); the camelCase TS identifier is a choice — and the choice was made to ignore the brand's internal capital.
- **Category:** 3 (acronym casing).
- **Suggested name:** `PagerDutyConfig` (type) and `$case: 'pagerDuty'` (discriminant). Wire JSON stays `pagerduty`.
- **Rationale:** Same as #2 — flagged separately because the discriminant literal is a distinct API element from the interface name.

### 6. `GenericWebhookConfig` — "generic" is doing too much work — `src/v1/model.ts:42-55`
- **Code:**
  ```ts
  export interface GenericWebhookConfig {
    /** [Input-Only] URL for webhook. */
    url?: string | undefined;
    /** [Output-Only] Whether URL is set. */
    urlSet?: boolean | undefined;
    /** [Input-Only][Optional] Username for webhook. */
    username?: string | undefined;
    ...
  }
  ```
- **Why weird:** The qualifier "generic" tells the user nothing concrete. It means "this is the webhook config that is *not* the Microsoft Teams webhook config" — a knowledge that requires reading the whole file. A user looking at IDE autocomplete sees `GenericWebhookConfig` and `MicrosoftTeamsConfig` side-by-side and has to guess that MS-Teams is also a webhook channel that just has more fields. The Go SDK likely also names this type `GenericWebhook` for proto symmetry, but in TS this needs better disambiguation.
- **Category:** 1 (vague — "generic" carries no positive information).
- **Suggested name:** `WebhookConfig` (and rename the enum value to `GENERIC_WEBHOOK` per #3 if you want to preserve the disambiguation from the MS-Teams-webhook). Or be honest and call it `IncomingWebhookConfig` (the actual term-of-art used by Slack/Teams/Discord for this shape).
- **Rationale:** "Generic" is a code smell whenever it appears in a public type name. It usually means "this is the default, but there might be variants" — and TypeScript already has `extends`, intersections, and unions for variants. If the shape is the default, drop the qualifier; if there are real variants, name them after what makes them different (`AuthenticatedWebhookConfig`, etc.).

## Medium severity

### 7. `*Set: boolean` companion fields — pervasive pattern with confusing optionality — `src/v1/model.ts:46, 50, 54, 87, 91, 95, 99, 103, 121, 128, 132, 136`
- **Code (representative):**
  ```ts
  /** [Input-Only] URL for webhook. */
  url?: string | undefined;
  /** [Output-Only] Whether URL is set. */
  urlSet?: boolean | undefined;
  ```
- **Why weird:** Every secret field (URL, username, password, OAuth token, integration key, app ID, auth secret, channel URL, tenant ID, channel ID) has a paired `*Set` boolean. The pattern exists because the server cannot echo secrets back, so it tells the client "the secret is set" without disclosing the value. Three problems with the names:
  1. `urlSet` reads as "URL of a set" or "set of URLs" — not "URL is set." Idiomatic TS would be `isUrlSet` or `hasUrl`.
  2. The `*Set` field is `boolean | undefined` — three-valued logic on a property that should be binary. The undefined case is ambiguous: not set, server didn't return it, or you're not an admin? JSDoc doesn't say.
  3. The paired fields are **modal** — on input you set `url`, on output you read `urlSet`. The type system has no way to express this; both fields are simultaneously optional, so a user could try to set `urlSet: true` on input and the server will silently ignore it.
- **Category:** 6 (misleading — three-valued boolean), 15 (generic field-naming pattern losing meaning).
- **Suggested name:** Rename the pattern to `hasUrl`, `hasUsername`, etc. (English-correct boolean predicates). Better: split the input and output types so input has `url` only and output has `hasUrl` only. Or merge into a union: `url?: { write: string } | { read: { isSet: boolean } }`.
- **Rationale:** This is the dominant naming smell in the file — it occurs ten times. Worth a coordinated rename across all config types, not piecemeal. The `[Input-Only]`/`[Output-Only]` JSDoc markers (finding 24) hint that the type was originally split in the API spec and was flattened for TS.

### 8. `CreateNotificationDestinationRequest` / `UpdateNotificationDestinationRequest` — overly verbose — `src/v1/model.ts:23-28`, `:139-146`
- **Code:**
  ```ts
  export interface CreateNotificationDestinationRequest {
    displayName?: string | undefined;
    config?: Config | undefined;
  }
  export interface UpdateNotificationDestinationRequest {
    id?: string | undefined;
    displayName?: string | undefined;
    config?: Config | undefined;
  }
  ```
- **Why weird:** 39 and 40 character identifiers respectively. Inside the package, the verb is already redundant with the method name (`createNotificationDestination(req: CreateNotificationDestinationRequest)`) — the request type name repeats the verb the method also carries. Compare to leaner conventions: `Create(input: NotificationDestination)` or, in TS, just accepting the partial `NotificationDestination` shape and dropping the `Request` types.
- **Category:** 7 (overly verbose), 8 (redundant `Request` suffix conjoined with full noun phrase that is already specific).
- **Suggested name:** Shorter alternatives: `CreateInput`, `UpdateInput` (scoped to the package; relies on `import * as nd from '@databricks/sdk-notificationdestinations/v1'` for disambiguation). Or merge with the response: `accept Partial<NotificationDestination>`. Or, if keeping verbose names, at least drop the `Request` suffix (already implied by being the input to a request).
- **Rationale:** Even in `alerts` (which is heavier), the create/update request types were criticised for this pattern. Worth normalising at the SDK level.

### 9. `ListNotificationDestinationsResponse` — overly verbose response wrapper — `src/v1/model.ts:66-70`
- **Code:**
  ```ts
  export interface ListNotificationDestinationsResponse {
    results?: ListNotificationDestinationsResult[] | undefined;
    /** Page token for next of results. */
    nextPageToken?: string | undefined;
  }
  ```
- **Why weird:** Two fields, 41-character type name. The JSDoc says "Page token for next of results" — broken English (should be "Page token for next page of results" or "Page token for the next set of results"). And see #12 for `results`.
- **Category:** 7 (verbose), 8 (`Response` suffix added on top of the verb-prefixed noun phrase).
- **Suggested name:** `ListPage<NotificationDestination>` — a generic page wrapper used across the SDK. Or `NotificationDestinationPage`.

### 10. `Client` — unprefixed class — `src/v1/client.ts:45`
- **Code:** `export class Client { ... }`
- **Why weird:** Every package in the SDK exports a class named `Client`. A user wiring up two packages (`notificationdestinations` + `alerts`, say) writes:
  ```ts
  import { Client as NotificationDestinationsClient } from '@databricks/sdk-notificationdestinations/v1';
  import { Client as AlertsClient } from '@databricks/sdk-alerts/v1';
  ```
  every time. The aliasing is universal — every audit raises this finding.
- **Category:** 1 (vague), 12 (cross-package duplication).
- **Suggested name:** `NotificationDestinationsClient`, or expose only the namespace import (`import * as notificationDestinations from '@databricks/sdk-notificationdestinations/v1'`).
- **Rationale:** Cross-SDK consistency, but every consumer pays the rename cost. Worth a generator-level fix.

### 11. `listNotificationDestinationsIter` — cryptic `Iter` suffix — `src/v1/client.ts:186-201`
- **Code:**
  ```ts
  async *listNotificationDestinationsIter(
    req: ListNotificationDestinationsRequest,
    options?: CallOptions
  ): AsyncGenerator<ListNotificationDestinationsResult> { ... }
  ```
- **Why weird:** "Iter" is a Go-ism (`Iterator()` method, `iter.Seq2` etc.). In TS the conventional name for an async iterator method is `*` syntax with no special suffix, or `stream*`, or just the verb in the imperative form. `listIter` reads as a typo or an abbreviation; the canonical TS name would be `listAll` (eagerly), `iterAll`, or simply expose it as `[Symbol.asyncIterator]`.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** `iterateNotificationDestinations` or `listAllNotificationDestinations` (eager) or `streamNotificationDestinations`.
- **Rationale:** Same finding appears in every paginated client across the SDK (`listAlertsIter`, `listClustersIter`, ...). Generator-level rename.

### 12. `ListNotificationDestinationsResponse.results` — vague field name — `src/v1/model.ts:67`
- **Code:**
  ```ts
  results?: ListNotificationDestinationsResult[] | undefined;
  ```
- **Why weird:** "results" is a placeholder name. The field holds notification destinations, so it should be named `destinations` or `notificationDestinations` or `items`. "Results" is what a generator emits when it doesn't know what the list contains; users read it as "search results" or "test results" and have to look at the type to confirm. Compare to the broader SDK convention where list responses use `items` (jobs, runs) or the domain-qualified plural (clusters, alerts).
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `destinations` (drop the `notification` qualifier since the package context supplies it) or `items`.

### 13. `id` as a top-level field — underspecified — `src/v1/model.ts:31, 58, 73, 107, 140`
- **Code:**
  ```ts
  /** UUID identifying notification destination. */
  id?: string | undefined;
  ```
- **Why weird:** A bare `id` field at the top of `NotificationDestination`, `ListNotificationDestinationsResult`, and three request types. The JSDoc clarifies it's a UUID, but the field name does not. In a multi-resource SDK, `destinationId` or `notificationDestinationId` would survive a refactor that combines several resources in one collection. Also the field is `string | undefined` even though every endpoint requires it on output and three of four endpoints require it on input — see finding 5 of the billableusagedownload audit for the same issue.
- **Category:** 19 (underspecified ID).
- **Suggested name:** `destinationId` (within the package context the qualifier "notification" is implicit). Or `id` is acceptable if the type is always accessed as `destination.id`.
- **Rationale:** Bare `id` is conventional and tolerated; the optionality is the real bug. Demoted to medium.

### 14. `PagerdutyConfig.integrationKey` — meaning depends on direction — `src/v1/model.ts:118-122`
- **Code:**
  ```ts
  export interface PagerdutyConfig {
    /** [Input-Only] Integration key for PagerDuty. */
    integrationKey?: string | undefined;
    /** [Output-Only] Whether integration key is set. */
    integrationKeySet?: boolean | undefined;
  }
  ```
- **Why weird:** Same as #7 in the specific case. The field is `string | undefined` on input but always `undefined` on output (the server never echoes it). The companion `integrationKeySet: boolean | undefined` carries the output information. A reader sees two optional fields and has to know the modal convention.
- **Category:** 6 (misleading optionality).
- **Suggested name:** see #7.
- **Rationale:** Listed separately because PagerDuty is the simplest case (one secret field) and best illustrates the pattern.

### 15. `destinationType` field — type-suffix tautology — `src/v1/model.ts:78`, `:112`
- **Code:**
  ```ts
  destinationType?: DestinationType | undefined;
  ```
- **Why weird:** Field name "destinationType" of type "DestinationType". Tautology — the suffix `Type` is doing double duty as both a noun ("kind of destination") and a TS type marker. Inside the package's `NotificationDestination` type, naming the field `type` or `channel` would be self-evident from context (`destination.type === 'slack'`). Compare to `ec2-style` `instanceType: InstanceType` which has the same smell but is conventional in cloud SDKs.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** `type` (with the parent type name supplying the context) or `channel`. If the enum is renamed `NotificationChannel` (per #1), then the field becomes `channel: NotificationChannel` which reads cleanly.

## Low severity

### 16. SCREAMING_SNAKE_CASE enum values — `src/v1/model.ts:5-11`
- **Code:**
  ```ts
  SLACK = 'SLACK',
  EMAIL = 'EMAIL',
  WEBHOOK = 'WEBHOOK',
  PAGERDUTY = 'PAGERDUTY',
  MICROSOFT_TEAMS = 'MICROSOFT_TEAMS',
  ```
- **Why weird:** The TS Style Guide section "Enums" prefers UpperCamelCase identifiers for both name and members; SCREAMING_SNAKE values are a wire-format leak. `MICROSOFT_TEAMS` has an underscore in a TS identifier, which is also discouraged.
- **Category:** 4 (underscores in TS identifiers — strictly speaking, both identifier and value).
- **Suggested name:** `Slack = 'SLACK'`, `Email = 'EMAIL'`, `Webhook = 'WEBHOOK'`, `PagerDuty = 'PAGERDUTY'`, `MicrosoftTeams = 'MICROSOFT_TEAMS'`. The string literals (the wire representation) stay; only the TS identifier changes.
- **Rationale:** Generator-level decision. Hand-written SDKs typically use UpperCamelCase enum members; the SCREAMING_SNAKE form makes it look like the type is C/Java. Demoted to low because it's a global convention and changing it would break every existing user.

### 17. `WEBHOOK` enum value drops the qualifier "generic" — `src/v1/model.ts:8`
- See #3 (high). Listed separately as a low-severity naming-only issue: even if the enum name stays, the value `WEBHOOK` is **singular** while the config name `GenericWebhookConfig` is **qualifier-prefixed**. The qualifier is lost in transit between enum and config.
- **Category:** 9 (qualifier mismatch).
- **Suggested name:** `GENERIC_WEBHOOK = 'GENERIC_WEBHOOK'`. See #3 for the rationale.

### 18. `createNotificationDestination` / etc. — overly verbose method names — `src/v1/client.ts:71, 100, 125, 150, 204`
- **Code:**
  ```ts
  async createNotificationDestination(...)
  async deleteNotificationDestination(...)
  async getNotificationDestination(...)
  async listNotificationDestinations(...)
  async updateNotificationDestination(...)
  ```
- **Why weird:** Method names repeat the package name (`@databricks/sdk-notificationdestinations`) and the request-type name. A user writes `client.createNotificationDestination(...)` — 30 characters before the args. Shorter conventions: `client.create(...)`, `client.list(...)`, `client.get(...)` — relying on the package import to provide context.
- **Category:** 7 (overly verbose).
- **Suggested name:** Drop the suffix: `create`, `delete`, `get`, `list`, `update`. The class name (`Client` or `NotificationDestinationsClient`) supplies the domain context.
- **Rationale:** Conventions differ across SDKs. AWS uses verbose method names; GCP / Azure use shorter. Demoted to low because the existing convention is consistent across the SDK and changing it is disruptive. Flagging for completeness.

### 19. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:40-43`
- **Code:**
  ```ts
  // Package identity segment for this client to be used in the User-Agent header.
  const PACKAGE_SEGMENT = {
    key: pkgJson.name.replace(/^@[^/]+\//, ''),
    value: pkgJson.version,
  };
  ```
- **Why weird:** "Segment" is a generic computer-science term. The comment disambiguates ("for this client to be used in the User-Agent header"), but the constant name does not.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `USER_AGENT_PACKAGE_INFO` or `PACKAGE_USER_AGENT`.
- **Rationale:** Cross-package — same finding appears in every audited file.

### 20. `HttpCallOptions` — `src/v1/utils.ts:15-19`
- **Code:**
  ```ts
  export interface HttpCallOptions {
    readonly request: HttpRequest;
    readonly httpClient: HttpClient;
    readonly logger: Logger;
  }
  ```
- **Why weird:** Word `Options` is reused throughout the SDK for unrelated concepts (`ClientOptions`, `CallOptions`, `Options` imported from `@databricks/sdk-core/api`). Within `utils.ts` this local interface name collides with the imported `Options` symbol on line 3.
- **Category:** 1 (vague suffix), 12 (duplicate `Options` naming).
- **Suggested name:** `HttpCallContext` (it is an internal context bag, not user-tunable options).

### 21. `executeCall` vs `executeHttpCall` — near-duplicate function names — `src/v1/utils.ts:26`, `:65`
- **Code:** lines 26-38 and 65-94.
- **Why weird:** Two functions named almost identically, doing very different things: `executeCall` wraps in retry/rate-limit/timeout semantics, `executeHttpCall` does the raw HTTP send + decode + APIError check.
- **Category:** 1 (vague), 17 (inconsistent layer naming).
- **Suggested name:** `runWithCallOptions` (the wrapper) and `sendHttpRequest` (the executor).

### 22. `parseResponse` vs `marshalRequest` — verb asymmetry — `src/v1/utils.ts:113`, `:119`
- **Code:** lines 113 and 119.
- **Why weird:** Inverse functions named with different verbs (`parse` vs `marshal`). The schema constants use `marshal`/`unmarshal`. Pair-wise consistency would suggest `unmarshalResponse` and `marshalRequest`, or `parseResponse` and `serializeRequest`.
- **Category:** 17 (inconsistent action verbs).
- **Suggested name:** `unmarshalResponse` / `marshalRequest`.

### 23. `req` / `resp` / `opts` / `httpReq` abbreviations — `src/v1/client.ts:72, 80, 88, 105, 130, 165, 187, 190, 209`
- **Code:** parameter and local-variable names throughout the client.
- **Why weird:** Three-to-five-letter abbreviations everywhere. Project rules (typescript.mdc) discourage cryptic abbreviations.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** `request`, `response`, `options`, `httpRequest`. Cost is trivial.

## Observations

### 24. `[Input-Only]` / `[Output-Only]` doc markers — convention not encoded in types — `src/v1/model.ts:43-99`, `:117-136`
JSDoc bracket prefixes mark every secret-bearing field as either input-only or output-only. The TS type system makes both fields `... | undefined` simultaneously, so callers can construct an object that sets both a secret and its `*Set` mirror; the latter is silently ignored on the wire. A cleaner design splits the input and output types or uses TS template literal types / branded types to enforce the modality.
- **Category:** 6 (type-level dishonesty).
- **Suggested:** Split `SlackConfigInput` / `SlackConfigOutput`, etc. Or accept that secrets cannot round-trip and document at type level (`type Secret<T> = T | { isSet: boolean }`).
- **Rationale:** Improvement opportunity. Not strictly a naming issue, hence observation.

### 25. `index.ts` re-exports verbose names verbatim — `src/v1/index.ts:5-23`
The barrel re-exports every type with its long generated name. An opportunity to expose friendlier aliases:
```ts
export type {
  NotificationDestination as Destination,
  CreateNotificationDestinationRequest as CreateRequest,
  ...
} from './model';
```
Not done. So consumers always work with the verbose names. The 1:1 port philosophy probably prohibits this, but flagging as an observation — the barrel could improve ergonomics without removing the underlying names.
- **Category:** 7 (verbose), Observation.

### 26. `NEXT_CHANGELOG.md` and pre-existing build/lint workflows
Out of scope for naming but worth noting: the package has both a `CHANGELOG.md` and `NEXT_CHANGELOG.md` — the duplicate-file convention is a project-wide pattern, not a naming bug.

### 27. JSDoc inconsistency in `[Input-Only][Optional]` markers
The `GenericWebhookConfig.username` (line 47) and `.password` (line 51) use the marker `[Input-Only][Optional]` — concatenating two brackets — while every other field uses single-bracket markers. The `[Optional]` is also redundant because the TS type already shows `?: undefined`. Minor doc inconsistency.

## Domain glossary
- `notification destination` — the persistent record being managed. Always paired with a `displayName` and one `Config`.
- `channel` — implicit term-of-art for the kind of destination (Slack, Email, etc.). Not used in any identifier here; encoded as `DestinationType`.
- `integration key` — PagerDuty term for the API key used to post events.
- `webhook` — incoming HTTPS endpoint that receives a POST when the notification fires.
- `oauth token` — Slack Bot user OAuth token.
- `app id` / `tenant id` / `channel url` / `auth secret` — Microsoft Teams app-registration fields.
- `pageToken` / `pageSize` / `nextPageToken` — standard SDK pagination triplet; not specific to this package.

## File coverage
- `src/v1/model.ts` (448 lines): read fully.
- `src/v1/client.ts` (231 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (24 lines): read fully.
