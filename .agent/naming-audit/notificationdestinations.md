# Naming Audit: notificationdestinations

**Path:** `packages/notificationdestinations/src/v1/`
**Versions audited:** v1
**Inferred domain:** Workspace-level CRUD over "notification destinations" — named, persisted records that pair a `displayName` with one config out of five wire-format channels (Slack, Email, GenericWebhook, PagerDuty, MicrosoftTeams). The REST surface is `/api/2.0/notification-destinations`, with the usual `create` / `get` / `list` / `update` / `delete` plus a paged async iterator. Every channel-config carries the same `*Set: boolean` companion shape: secret fields are write-only on input and the server echoes only a "is it set?" mirror on output. There are zero typed timestamps, zero enum sub-types beyond `DestinationType`, and the only oneof is the discriminated `Config` union.
**Total weird names flagged:** 5

## Summary

| Severity | Count |
| --- | --- |
| High | 3 |
| Low | 1 |
| Observation | 1 |

## Summary table

| # | Severity | Location | Name | Category |
|---|----------|----------|------|----------|
| 1 | High | `model.ts:6-15` | `DestinationType` | 1 (vague) |
| 2 | High | `model.ts:17-25` | `Config` (type) | 1 (vague) |
| 3 | High | `model.ts:46-59` | `GenericWebhookConfig` | 1 (vague — "generic" carries no info) |
| 4 | Low | `client.ts:73`, `:82`, etc. | `req` / `resp` / `httpReq` abbreviations | 5 (cryptic abbreviation) |
| 5 | Obs | `model.ts:47-58` | `[Input-Only]` / `[Output-Only]` doc convention is not encoded in types | 6 (type-level dishonesty) |

## High severity

### 1. `DestinationType` — vague enum name lacks domain anchor — `src/v1/model.ts:6-15`
- **Code:**
  ```ts
  export const DestinationType = {
    SLACK: 'SLACK',
    EMAIL: 'EMAIL',
    WEBHOOK: 'WEBHOOK',
    PAGERDUTY: 'PAGERDUTY',
    MICROSOFT_TEAMS: 'MICROSOFT_TEAMS',
  } as const;
  export type DestinationType =
    | (typeof DestinationType)[keyof typeof DestinationType]
    | (string & {});
  ```
- **Why weird:** Exported at package root as just `DestinationType`. The word "destination" is overloaded across the SDK — there is a `destination` concept in jobs (`webhook destination`), workflows (`sink destination`), and infra (`DBFS destination`). A user `import { DestinationType } from '@databricks/sdk-notificationdestinations/v1'` and then mixing it with `import { DestinationType } from '@databricks/sdk-pipelines/v1'` (if it existed) will get a name collision. Also, the values are not "destination types" but "notification channels"; the enum mixes the term-of-art ("destination" = the addressable target) with the type-of-target. Compare with `notification-destinations` REST path: the enum could be `NotificationChannel` or `NotificationDestinationKind`.
- **Category:** 1 (vague/generic).
- **Suggested name:** `NotificationChannel` or, less invasive, `NotificationDestinationType`.
- **Rationale:** Domain-anchored enum names protect users from cross-package collisions and read better in IDE autocomplete (`NotificationChannel.SLACK` vs `DestinationType.SLACK`).

### 2. `Config` (interface) — vague top-level type name — `src/v1/model.ts:17-25`
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
- **Why weird:** The type name `Config` is one of the most generic identifiers in software. A package-root `Config` export means an app barrel re-exporting `@databricks/sdk-notificationdestinations/v1` collides instantly with any other `Config` (web framework configs, app configs, build configs, …). The user must alias it.
- **Category:** 1 (vague/generic top-level name).
- **Suggested name:** Rename the type to `NotificationDestinationConfig` (matches the package's domain prefix).
- **Rationale:** A domain-anchored type name eliminates the cross-package collision risk.

### 3. `GenericWebhookConfig` — "generic" is doing too much work — `src/v1/model.ts:46-59`
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
- **Suggested name:** `WebhookConfig`. Or be honest and call it `IncomingWebhookConfig` (the actual term-of-art used by Slack/Teams/Discord for this shape).
- **Rationale:** "Generic" is a code smell whenever it appears in a public type name. It usually means "this is the default, but there might be variants" — and TypeScript already has `extends`, intersections, and unions for variants. If the shape is the default, drop the qualifier; if there are real variants, name them after what makes them different (`AuthenticatedWebhookConfig`, etc.).

## Low severity

### 4. `req` / `resp` / `httpReq` abbreviations — `src/v1/client.ts:73, 82, 89, 106, 111, 135, 140, 164, 178, 204, 222, 231`
- **Code:** parameter and local-variable names throughout the client.
- **Why weird:** Three-to-five-letter abbreviations everywhere. Project rules (typescript.mdc) discourage cryptic abbreviations.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** `request`, `response`, `httpRequest`. Cost is trivial.

## Observations

### 5. `[Input-Only]` / `[Output-Only]` doc markers — convention not encoded in types — `src/v1/model.ts:47-107`, `:122-140`
JSDoc bracket prefixes mark every secret-bearing field as either input-only or output-only. The TS type system makes both fields `... | undefined` simultaneously, so callers can construct an object that sets both a secret and its `*Set` mirror; the latter is silently ignored on the wire. A cleaner design splits the input and output types or uses TS template literal types / branded types to enforce the modality.
- **Category:** 6 (type-level dishonesty).
- **Suggested:** Split `SlackConfigInput` / `SlackConfigOutput`, etc. Or accept that secrets cannot round-trip and document at type level (`type Secret<T> = T | { isSet: boolean }`).
- **Rationale:** Improvement opportunity. Not strictly a naming issue, hence observation.
