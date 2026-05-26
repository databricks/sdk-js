# Naming Audit: notificationdestinations

**Path:** `packages/notificationdestinations/src/v1/`
**Versions audited:** v1
**Inferred domain:** Workspace-level CRUD over "notification destinations" — named, persisted records that pair a `displayName` with one config out of five wire-format channels (Slack, Email, GenericWebhook, PagerDuty, MicrosoftTeams). The REST surface is `/api/2.0/notification-destinations`, with the usual `create` / `get` / `list` / `update` / `delete` plus a paged async iterator. Every channel-config carries the same `*Set: boolean` companion shape: secret fields are write-only on input and the server echoes only a "is it set?" mirror on output. There are zero typed timestamps, zero enum sub-types beyond `DestinationType`, and the only oneof is the discriminated `Config` union.
**Total weird names flagged:** 13

## Summary

| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 1 |
| Low | 5 |
| Observation | 3 |

## Summary table

| # | Severity | Location | Name | Category |
|---|----------|----------|------|----------|
| 1 | High | `model.ts:5-11` | `DestinationType` | 1 (vague) |
| 2 | High | `model.ts:8` | `DestinationType.WEBHOOK` (vs `GenericWebhookConfig`) | 6 (misleading), 12 (duplicate concept name mismatch) |
| 3 | High | `model.ts:13-21` | `Config` (type) and `Config.config` (field) | 1 (vague), 9 (self-referential) |
| 4 | High | `model.ts:42-55` | `GenericWebhookConfig` | 1 (vague — "generic" carries no info) |
| 5 | Medium | `client.ts:45` | `Client` (unprefixed class) | 1 (vague), 12 (duplicate across SDK) |
| 6 | Low | `model.ts:8` | `WEBHOOK` enum singular while wire-config implies "generic" | 9 (singular/plural / qualifier mismatch with `GenericWebhookConfig`) |
| 7 | Low | `client.ts:40-43` | `PACKAGE_SEGMENT` | 1 (vague), 15 (generic) |
| 8 | Low | `utils.ts:15-19` | `HttpCallOptions` | 1 (vague), 12 (duplicate `Options`) |
| 9 | Low | `utils.ts:26` / `:65` | `executeCall` / `executeHttpCall` near-duplicate | 1 (vague), 17 (inconsistent layer naming) |
| 10 | Low | `client.ts:80`, `:105`, etc. | `req` / `resp` / `opts` / `httpReq` abbreviations | 5 (cryptic abbreviation) |
| 11 | Obs | `model.ts:43-54` | `[Input-Only]` / `[Output-Only]` doc convention is not encoded in types | 6 (type-level dishonesty) |
| 12 | Obs | — | `NEXT_CHANGELOG.md` and pre-existing build/lint workflows | — |
| 13 | Obs | `model.ts:47`, `:51` | `[Input-Only][Optional]` doc marker inconsistency | — |

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
- **Category:** 1 (vague/generic).
- **Suggested name:** `NotificationChannel` or, less invasive, `NotificationDestinationType`.
- **Rationale:** Domain-anchored enum names protect users from cross-package collisions and read better in IDE autocomplete (`NotificationChannel.SLACK` vs `DestinationType.SLACK`).

### 2. `DestinationType.WEBHOOK` corresponds to `GenericWebhookConfig` — misleading enum vs config asymmetry — `src/v1/model.ts:8`, `:42-55`, `:17`
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

### 3. `Config` (interface) and its `config` field — vague top-level name + self-referential field — `src/v1/model.ts:13-21`
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
- **Suggested name:** Rename the type to `NotificationDestinationConfig` (matches the package's domain prefix).
- **Rationale:** A domain-anchored type name eliminates the cross-package collision risk and the `config.config` repetition along the property path.

### 4. `GenericWebhookConfig` — "generic" is doing too much work — `src/v1/model.ts:42-55`
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
- **Why weird:** The qualifier "generic" tells the user nothing concrete. It means "this is the webhook config that is *not* the Microsoft Teams webhook config" — a knowledge that requires reading the whole file. A user looking at IDE autocomplete sees `GenericWebhookConfig` and `MicrosoftTeamsConfig` side-by-side and has to guess that MS-Teams is also a webhook channel that just has more fields.
- **Category:** 1 (vague — "generic" carries no positive information).
- **Suggested name:** `WebhookConfig` (and rename the enum value to `GENERIC_WEBHOOK` per #2 if you want to preserve the disambiguation from the MS-Teams-webhook). Or be honest and call it `IncomingWebhookConfig` (the actual term-of-art used by Slack/Teams/Discord for this shape).
- **Rationale:** "Generic" is a code smell whenever it appears in a public type name. It usually means "this is the default, but there might be variants" — and TypeScript already has `extends`, intersections, and unions for variants. If the shape is the default, drop the qualifier; if there are real variants, name them after what makes them different (`AuthenticatedWebhookConfig`, etc.).

## Medium severity

### 5. `Client` — unprefixed class — `src/v1/client.ts:45`
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

## Low severity

### 6. `WEBHOOK` enum value drops the qualifier "generic" — `src/v1/model.ts:8`
- See #2 (high). Listed separately as a low-severity naming-only issue: even if the enum name stays, the value `WEBHOOK` is **singular** while the config name `GenericWebhookConfig` is **qualifier-prefixed**. The qualifier is lost in transit between enum and config.
- **Category:** 9 (qualifier mismatch).
- **Suggested name:** `GENERIC_WEBHOOK = 'GENERIC_WEBHOOK'`. See #2 for the rationale.

### 7. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:40-43`
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

### 8. `HttpCallOptions` — `src/v1/utils.ts:15-19`
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

### 9. `executeCall` vs `executeHttpCall` — near-duplicate function names — `src/v1/utils.ts:26`, `:65`
- **Code:** lines 26-38 and 65-94.
- **Why weird:** Two functions named almost identically, doing very different things: `executeCall` wraps in retry/rate-limit/timeout semantics, `executeHttpCall` does the raw HTTP send + decode + ApiError check.
- **Category:** 1 (vague), 17 (inconsistent layer naming).
- **Suggested name:** `runWithCallOptions` (the wrapper) and `sendHttpRequest` (the executor).

### 10. `req` / `resp` / `opts` / `httpReq` abbreviations — `src/v1/client.ts:72, 80, 84, 101, 105, 126, 130, 151, 164, 187, 192, 205, 213`
- **Code:** parameter and local-variable names throughout the client.
- **Why weird:** Three-to-five-letter abbreviations everywhere. Project rules (typescript.mdc) discourage cryptic abbreviations.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** `request`, `response`, `options`, `httpRequest`. Cost is trivial.

## Observations

### 11. `[Input-Only]` / `[Output-Only]` doc markers — convention not encoded in types — `src/v1/model.ts:43-99`, `:117-136`
JSDoc bracket prefixes mark every secret-bearing field as either input-only or output-only. The TS type system makes both fields `... | undefined` simultaneously, so callers can construct an object that sets both a secret and its `*Set` mirror; the latter is silently ignored on the wire. A cleaner design splits the input and output types or uses TS template literal types / branded types to enforce the modality.
- **Category:** 6 (type-level dishonesty).
- **Suggested:** Split `SlackConfigInput` / `SlackConfigOutput`, etc. Or accept that secrets cannot round-trip and document at type level (`type Secret<T> = T | { isSet: boolean }`).
- **Rationale:** Improvement opportunity. Not strictly a naming issue, hence observation.

### 12. `NEXT_CHANGELOG.md` and pre-existing build/lint workflows
Out of scope for naming but worth noting: the package has both a `CHANGELOG.md` and `NEXT_CHANGELOG.md` — the duplicate-file convention is a project-wide pattern, not a naming bug.

### 13. JSDoc inconsistency in `[Input-Only][Optional]` markers
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
- `src/v1/model.ts` (447 lines): read fully.
- `src/v1/client.ts` (231 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (23 lines): read fully.
