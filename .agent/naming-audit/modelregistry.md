# Naming Audit: modelregistry

**Path:** `packages/modelregistry/src/v1/`
**Versions audited:** v1
**Inferred domain:** MLflow Model Registry (workspace-scoped, "classic"
MLflow). Registers ML models, model versions, stage transitions (None /
Staging / Production / Archived), transition-approval workflow, comments,
tags, latest-version lookups, registry webhooks, and Databricks-specific
permission/ACL extensions. Distinct from `registeredmodels` package which
is the Unity-Catalog-scoped successor.
**Total weird names flagged:** 66

## Summary
| Severity | Count |
| --- | --- |
| High | 22 |
| Medium | 29 |
| Low | 12 |
| Observation | 3 |

## High severity

### 1. Package name `modelregistry` — `package.json`, `src/v1/`
- **Why weird:** The directory/package name collapses "model registry"
  into one word with no separator, while every other multi-word package
  in the SDK keeps the same convention (`registeredmodels`,
  `cleanrooms`). The deeper issue is that two packages now exist for the
  same product area: `modelregistry` (workspace MLflow) and
  `registeredmodels` (Unity Catalog). A user reading the package list
  cannot tell which one is which.
- **Category:** 1 (vague), 6 (misleading vs sibling package), 12
  (duplicate concept).
- **Suggested name:** `mlflowmodels` or `workspacemlflow` for this
  package, leaving `registeredmodels` as the UC equivalent. Even better:
  prefix both with their scope (`mlflowregistry` and `ucmodelregistry`).
- **Rationale:** "modelregistry" reads as the canonical name but is
  actually the legacy workspace-scoped surface; UC's `registeredmodels`
  is the strategic future. Today's name suggests the opposite.

### 2. `ActivityAction` enum and `availableActions` field — `model.ts:20-31, 187`
- **Why weird:** `ActivityAction` enum values are full verbs like
  `APPROVE_TRANSITION_REQUEST`, `CANCEL_TRANSITION_REQUEST`,
  `EDIT_COMMENT`, `DELETE_COMMENT`. The field on `Activity` is named
  `availableActions: ActivityAction[]`. So the *type* is "actions" but
  the values look like RPC method names. Worse, the enum mixes two
  unrelated domains (transition-request lifecycle + comment editing) into
  one type, and the docstring says so explicitly ("For activities…For
  comments…").
- **Category:** 6 (misleading: enum members are RPC verbs not actions),
  17 (mixed-domain enum).
- **Suggested name:** Split into two enums: `TransitionRequestAction` (
  `Approve | Reject | Cancel`) and `CommentAction` (`Edit | Delete`). Or
  shorten to verbs only: `ActivityAction.Approve | Reject | Cancel | Edit
  | Delete`.
- **Rationale:** A single enum forced to cover two domains becomes a
  bag-of-strings. Users typing `ActivityAction.` get suggested
  values that may be illegal for their actual context.

### 3. `ActivityType` enum — `model.ts:47-62`
- **Why weird:** Values use past-tense verbs (`APPLIED_TRANSITION`,
  `REQUESTED_TRANSITION`, `CANCELLED_REQUEST`, `APPROVED_REQUEST`,
  `REJECTED_REQUEST`, `NEW_COMMENT`, `SYSTEM_TRANSITION`). The "_REQUEST"
  suffix is inconsistent with the "_TRANSITION" suffix — `APPROVED_REQUEST`
  is past-tense ("a request was approved"), while
  `APPLIED_TRANSITION` is past-tense ("a transition was applied"). What is
  `NEW_COMMENT`? It is a noun, not a past-tense verb like its peers. And
  `SYSTEM_TRANSITION` is a transition performed by the system, mixing
  actor + action where every other value is just an action.
- **Category:** 13 (verb-tense inconsistency), 17 (inconsistent action
  verbs).
- **Suggested name:** Pick one pattern. Either all past-tense
  (`TransitionApplied`, `TransitionRequested`, `RequestCancelled`,
  `RequestApproved`, `RequestRejected`, `CommentPosted`,
  `SystemTransitionApplied`), or simple nouns (`Apply`, `Request`,
  `Cancel`, `Approve`, `Reject`, `Comment`, `SystemTransition`).
- **Rationale:** Mixed tense and grammatical category in one enum makes
  it hard to remember which value to use without looking it up.

### 4. `PermissionLevel` enum values — `model.ts:82-95`
- **Why weird:** Values include `CAN_MANAGE_STAGING_VERSIONS`,
  `CAN_MANAGE_PRODUCTION_VERSIONS`, `CAN_CREATE_REGISTERED_MODEL`. These
  hard-code two MLflow stages (Staging, Production) into the permission
  enum, but the stage list itself is open-ended (None, Staging,
  Production, Archived). There is no `CAN_MANAGE_ARCHIVED_VERSIONS`.
  Also, the doc-comment for `CAN_EDIT` says it is `reserved 1; //
  IS_OWNER = 1; was DEPRECATED` — that is a Protobuf reservation comment
  leaking into TypeScript public docs.
- **Category:** 6 (misleading: implies parallel constants exist), 14
  (proto-style leakage in JSDoc).
- **Suggested name:** Leave values as-is for wire compatibility, but
  strip the protobuf "reserved 1" comment from the public doc.
- **Rationale:** The proto comment serves no purpose to TS users and
  hints that the enum will break if reused.

### 5. `RegistryEmailSubscriptionType` enum — `model.ts:106-111`
- **Why weird:** Enum name says `Type` but values are *states*
  (`ALL_EVENTS`, `DEFAULT`, `SUBSCRIBED`, `UNSUBSCRIBED`). `DEFAULT` and
  `ALL_EVENTS` overlap in meaning. The class doc-comment marks it
  Experimental. Also `Type` is a vague suffix.
- **Category:** 1 (vague `Type` suffix), 6 (misleading: not a "type",
  is a state).
- **Suggested name:** `RegistryEmailSubscriptionStatus` (matching the
  field name `emailSubscriptionStatus` on `ModelVersionDatabricks`).
- **Rationale:** The field consuming the enum is already called
  `emailSubscriptionStatus`; the enum should match.

### 6. `RegistryWebhookEvent` enum — `model.ts:113-126`
- **Why weird:** Contains both generic
  `MODEL_VERSION_TRANSITIONED_STAGE` *and* three specific
  `MODEL_VERSION_TRANSITIONED_TO_{STAGING,PRODUCTION,ARCHIVED}`. The
  values describe the same event at two levels of granularity, so users
  must pick one and the docs do not say which. Same pattern for
  `TRANSITION_REQUEST_CREATED` vs three
  `TRANSITION_REQUEST_TO_{STAGING,PRODUCTION,ARCHIVED}_CREATED`.
- **Category:** 17 (inconsistent action verbs), 12 (duplicate concepts
  within one enum).
- **Suggested name:** Either keep the granular ones and drop the
  generic, or document the relationship.
- **Rationale:** Overlap creates "two ways to express one intent" — a
  classic source of bugs.

### 7. `Activity` vs `CommentObject` vs `TransitionRequest` — `model.ts:150, 227, 1015`
- **Why weird:** Three interfaces have *identical* shape and *identical*
  doc-comment ("For activities, this contains the activity recorded for
  the action. For comments, this contains the comment details. For
  transition requests, this contains the transition request details.").
  They differ only in name. This is a Java/Go habit (one class per
  context) where TS would use one type or a discriminated union.
- **Category:** 12 (duplicate concepts), 14 (Go/Java-style naming).
- **Suggested name:** Single `Activity` type used in all three slots,
  with the `activityType` enum already discriminating which flavour it
  is. Drop `CommentObject` and `TransitionRequest`.
- **Rationale:** All three already have the same field set including
  the `activityType` discriminator. The "type per usage site" anti-pattern
  forces consumers to choose between identical shapes.

### 8. `CommentObject` — `model.ts:227`
- **Why weird:** `Object` is the most generic suffix possible in TS
  (everything is an object). Combined with the duplicate-shape problem
  (#7), this is a textbook bad name.
- **Category:** 1 (vague `Object` suffix), 20 (type-suffix tautology).
- **Suggested name:** `Comment` — or fold into `Activity` per #7.
- **Rationale:** `Object` adds nothing; the type is already a TS object.

### 9. `GetRegisteredModelDatabricksRequest`, `RegisteredModelDatabricks`,
   `TransitionModelVersionStageDatabricksRequest`, `ModelVersionDatabricks` —
   `model.ts:542, 549, 690, 758, 981, 1005`
- **Why weird:** `Databricks` as a type suffix. The whole SDK is the
  Databricks SDK; everything is "Databricks". The suffix is used to
  distinguish workspace-Databricks extensions from upstream MLflow
  fields, but that distinction is opaque to anyone who hasn't read the
  upstream MLflow spec.
- **Category:** 1 (vague suffix), 6 (misleading: implies non-Databricks
  variants exist in this SDK).
- **Suggested name:** Drop `Databricks` suffix; if a workspace-specific
  variant is needed, prefix with `Workspace`: `WorkspaceRegisteredModel`,
  `WorkspaceModelVersion`. Or fold the extra fields into the base type
  and gate by capability.
- **Rationale:** Either the field is supported (then merge) or it isn't
  (then split by capability). The current "shadow type per extension"
  is a generator artefact, not a user-friendly API.

### 10. `TransitionModelVersionStageDatabricksRequest` — `model.ts:981`
- **Why weird:** Six-word PascalCase identifier with awkward word
  order. Reads as "transition[verb]
  model-version-stage[object]-databricks[suffix]-request[suffix]". For a
  TS type, it should be a noun. Also functions identically to the
  `ApproveTransitionRequest` API (transitions a model version's stage)
  but uses a totally different naming scheme.
- **Category:** 6 (misleading verb-as-noun), 7 (overly verbose), 17
  (inconsistent action verbs).
- **Suggested name:** `WorkspaceTransitionStageRequest` or fold into
  `ApproveTransitionRequest` (the operations are very close).
- **Rationale:** Right now the SDK has `approveTransitionRequest` and
  `transitionModelVersionStageDatabricks` as sibling client methods
  performing similar workspace operations; the asymmetric names obscure
  this.

### 11. `GetRegisteredModelDatabricksRequest` request DTO — `model.ts:542`
- **Why weird:** Verb-phrase request type name (`GetX`) is OK if used
  consistently, but `GetRegisteredModelDatabricksRequest` is the only
  method the SDK exposes to fetch a registered model — there is no plain
  `GetRegisteredModelRequest`. The `Databricks` infix dangles in the
  public API for a feature that has no non-Databricks counterpart
  visible.
- **Category:** 6 (misleading), 8 (redundant suffix).
- **Suggested name:** `GetRegisteredModelRequest` (drop `Databricks`).
- **Rationale:** No need for the disambiguation suffix when there's no
  sibling.

### 12. `client.listTransitionsRequest` method vs `ListTransitionRequest`
   request type — `client.ts:513, model.ts:645`
- **Why weird:** The method is `listTransitionsRequest` (plural
  "Transitions") but the request type is `ListTransitionRequest`
  (singular). The doc comment says "Gets a list of all open stage
  transition requests" so it's listing *requests* (plural). The method
  name should be `listTransitionRequests` (plural "Requests"), and the
  request type should be `ListTransitionRequestsRequest`. Right now
  none of the four name parts agree. Note: many sibling request DTOs in
  this file have been given the `Request` suffix (e.g.
  `CreateCommentRequest`, `DeleteRegistryWebhookRequest`,
  `RenameRegisteredModelRequest`), but `ListTransitionRequest` was left
  as the bare verb-phrase, deepening the inconsistency.
- **Category:** 9 (singular/plural mismatch), 6 (misleading), 20
  (type suffix tautology if renamed to `ListTransitionRequestsRequest`).
- **Suggested name:** Method `listTransitionRequests`; request type
  `ListTransitionRequestsRequest`; response type
  `ListTransitionRequestsResponse`.
- **Rationale:** The method name in JS conventions describes the
  collection being listed; here that's "transition requests", plural.

### 13. `RegistryWebhook` vs `Webhook` — `model.ts:787`
- **Why weird:** Type is `RegistryWebhook` but client methods, paths,
  and request types alternate: `CreateRegistryWebhookRequest`,
  `ListRegistryWebhooksRequest`, `UpdateRegistryWebhookRequest`,
  `DeleteRegistryWebhookRequest`, `TestRegistryWebhookRequest`. Once
  you're inside the modelregistry package, every webhook *is* a registry
  webhook — the prefix is redundant.
- **Category:** 8 (redundant suffix/prefix), 7 (overly verbose).
- **Suggested name:** `Webhook`, `CreateWebhookRequest`,
  `ListWebhooksRequest`, `UpdateWebhookRequest`, `DeleteWebhookRequest`,
  `TestWebhookRequest`.
- **Rationale:** Package name already establishes the registry context.

### 14. `HttpUrlSpec` / `JobSpec` — `model.ts:552, 563`
- **Why weird:** `Spec` is a vague suffix shared by every config-bag
  in the SDK. Two sibling types in the same package, only the `Spec`
  suffix distinguishing them. `HttpUrlSpec` is the *target* of a webhook
  (URL + auth + TLS settings), `JobSpec` is the *target* of a webhook (job
  ID + workspace). They are two implementations of a "webhook
  destination", and the naming hides that.
- **Category:** 1 (vague `Spec` suffix), 6 (misleading).
- **Suggested name:** `HttpUrlTarget` / `JobTarget`, or
  `WebhookHttpTarget` / `WebhookJobTarget`.
- **Rationale:** The two together discriminate the webhook
  destination kind; the naming should make that obvious.

### 15. `LinkedFeature` — `model.ts:573`
- **Why weird:** Doc comment says "Feature for model version. ([ML-57150]
  Renamed from Feature to LinkedFeature)". The ticket number leaks into
  the public docstring. Type name was changed for internal reasons
  (probably to avoid collision); the rename history doesn't belong in
  the public TS surface.
- **Category:** 1 (vague), 6 (misleading: nothing "linked" about a
  feature-table-name + feature-name pair).
- **Suggested name:** `ModelFeatureReference` or just `FeatureRef`.
- **Rationale:** "Linked" doesn't describe anything specific to this
  type; the fields are just identifiers pointing at a feature in the
  feature store.

### 16. `userId: string` field documented as username — `model.ts:154,
   231, 668, 700, 766, 1019`
- **Why weird:** Field is named `userId` but every doc-comment for it
  reads "The username of the user that created the object." So the
  field is a *username* (human-readable string), not a user ID
  (numeric/UUID). On `ModelVersion` (model.ts:668) it's documented as
  "User that created this `model_version`."
- **Category:** 6 (misleading), 16 (field type contradicts name), 19
  (underspecified ID).
- **Suggested name:** `userName` (or `createdBy`).
- **Rationale:** Calling a username `userId` will trip every caller who
  tries to use it as an ID for IAM lookups.

### 17. `stage: string` field on `ApproveTransitionRequest`,
   `CreateTransitionRequest`, `DeleteTransitionRequest`,
   `RejectTransitionRequest`, `TransitionModelVersionStageDatabricksRequest`
   — `model.ts:209, 396, 483, 847, 997`
- **Why weird:** Field is `stage: string` but valid values are
  enumerated in the docstring: `None`, `Staging`, `Production`,
  `Archived`. There is no `Stage` enum exported anywhere in the model,
  so callers have to memorise stringly-typed magic values. Compare to
  `status: ModelVersionStatus` (typed) — inconsistent treatment.
- **Category:** 6 (misleading), 16 (field-type contradicts domain).
- **Suggested name:** Introduce `Stage` enum (`None | Staging |
  Production | Archived`) and type these fields accordingly.
- **Rationale:** The docstring already lists the four values; promote
  to a type. Currently every transition method takes `stage: string`
  with no type-level validation.

### 18. `currentStage: string` field on `ModelVersion`,
   `ModelVersionDatabricks` — `model.ts:670, 701`
- **Why weird:** Same as #17 — typed as `string`, valid values
  enumerated only in docs. Also called `currentStage` here but `stage`
  on request DTOs (no prefix). Inconsistent.
- **Category:** 6 (misleading), 16 (type contradicts domain), 17
  (inconsistent prefix).
- **Suggested name:** `stage: Stage` (enum) for both.
- **Rationale:** "Current" is implicit (it's the *current* stage of
  this version).

### 19. `fromStage`, `toStage` fields — `model.ts:171, 183, 248, 260, 1036, 1048`
- **Why weird:** Three different `Activity`-shaped types each duplicate
  `fromStage: string | undefined`, `toStage: string | undefined`,
  again stringly typed. Identical doc-comments paste the same four-value
  list six times.
- **Category:** 16 (type contradicts domain), 12 (duplicate concept), 7
  (overly verbose docs).
- **Suggested name:** `fromStage: Stage`, `toStage: Stage`.
- **Rationale:** Same as #17.

### 20. `Databricks` as a suffix is overused
- **Why weird:** Distinct type names still end in `Databricks` (see #9):
  `RegisteredModelDatabricks`, `ModelVersionDatabricks`. Two more retain
  `Databricks` as an infix inside the new `Request` suffix
  (`GetRegisteredModelDatabricksRequest`,
  `TransitionModelVersionStageDatabricksRequest`). Each one is a
  workspace-specific extension. The `Databricks` token appearing inside
  the *Databricks SDK* is tautological.
- **Category:** 8 (redundant suffix), 20 (type-suffix tautology).
- **Suggested name:** See #9.
- **Rationale:** See #9.

### 21. `getRegisteredModelDatabricks` client method — `client.ts:416`
- **Why weird:** Method name carries `Databricks` mid-position (between
  the noun `RegisteredModel` and any conceptual suffix). The whole SDK
  is the Databricks SDK; embedding `Databricks` inside a method name is
  a proto/backend-architectural leak (the upstream proto distinguishes
  Databricks-flavoured RPCs from upstream-MLflow ones, but TS callers
  never see the non-Databricks variant). Compare to the sibling
  `getRegisteredModel`-shaped method that does *not* exist here — the
  `Databricks` infix dangles without a partner. Doc comment even reads
  "This is a `<Databricks>` workspace version of the [MLflow endpoint]",
  acknowledging the leak.
- **Category:** proto-architectural-leak (`Databricks` mid-position), 8
  (redundant infix), 14 (proto-style leakage into surface API).
- **Suggested name:** `getWorkspaceRegisteredModel` (scope-prefixed) or
  fold into `getRegisteredModel` and gate Databricks-only fields via
  capability. As a minimal change, drop the `Databricks` token:
  `getRegisteredModel`.
- **Rationale:** The infix encodes a proto-level distinction that has
  no analogue in this TS surface; remove it.

### 22. `transitionModelVersionStageDatabricks` client method —
   `client.ts:615`
- **Why weird:** Same `Databricks` mid-position leak as #21. The token
  sits between `Stage` and the implicit method suffix, marking the
  method as the workspace-extension variant of an upstream MLflow RPC.
  Method-name length (six words, 38 chars) is also a symptom: the verb
  `transition` + object `ModelVersionStage` + scope `Databricks` are
  all glued together. Doc comment repeats the proto leak: "This is a
  `<Databricks>` workspace version of the MLflow endpoint."
- **Category:** proto-architectural-leak (`Databricks` mid-position), 7
  (overly verbose), 14 (proto-style leakage into surface API).
- **Suggested name:** `transitionModelVersionStage` (drop the infix) or
  fold into `approveTransitionRequest`-style verbs since the operations
  overlap (see #10).
- **Rationale:** Same as #21 — the infix encodes a generator-side
  distinction that callers do not need.

## Medium severity

### 23. `comment: string` field overloaded across types — `model.ts:213, 234, 276, 398, 487, 849, 1001, 1022, 1062`
- **Why weird:** Same field name (`comment`) appears with three
  different meanings: (a) on `Activity` it is "user-provided comment
  associated with the activity"; (b) on `CreateCommentRequest` it is
  "user-provided comment on the action" (i.e. the *new* comment being
  created); (c) on `ApproveTransitionRequest`/`CreateTransitionRequest`
  it is the *justification* for the action. Same name, different
  semantics.
- **Category:** 15 (generic field name losing meaning).
- **Suggested name:** Disambiguate per type: `body` for the new comment,
  `justification` for the approval reason, `comment` for the recorded
  activity comment.
- **Rationale:** A grep for `comment` in a calling project will return
  9 unrelated meanings.

### 24. `creator: string` field on `DeleteTransitionRequest` — `model.ts:485`
- **Why weird:** Field doc says "Username of the user who created this
  request." So this is a username, not a user object. Same anti-pattern
  as #16 but with a different field name. The same concept is named
  `userId` elsewhere.
- **Category:** 17 (inconsistent action/identifier prefix).
- **Suggested name:** `creatorUsername` (and align with `userId` ->
  `userName` per #16).
- **Rationale:** Two different field names for the same concept.

### 25. `id: string` field — `model.ts:189, 266, 409, 461, 772, 789, 967, 1054, 1060`
- **Why weird:** Bare `id` appears on `Activity`, `CommentObject`,
  `DeleteCommentRequest`, `DeleteRegistryWebhookRequest`,
  `RegisteredModelDatabricks`, `RegistryWebhook`,
  `TestRegistryWebhookRequest`, `TransitionRequest`,
  `UpdateCommentRequest`. Same name across nine types, but each `id`
  belongs to a different domain (activity ID, comment ID, webhook ID,
  registered model ID). Doc-comments call it variously "Unique identifier
  for the object", "Unique identifier of an activity", "Webhook ID".
- **Category:** 19 (underspecified ID), 15 (generic field name).
- **Suggested name:** `activityId`, `commentId`, `webhookId`,
  `registeredModelId`, or scope by parent type.
- **Rationale:** Bare `id` in a request body forces the caller to
  remember which kind of ID this DTO wants. The wire field can stay
  `id`; the TS field should be specific.

### 26. `name: string` field overloaded — many — `model.ts:195, 272, 287, 314, 382, 417, 427, 439, 447, 469, 503, 519, 531, 543, 583, 600, 647, 660, 691, 740, 759, 832, 859, 925, 946, 982, 1072, 1087, 1100`
- **Why weird:** `name` appears on ~28 request/response types meaning
  "name of the registered model". Doc-comments mostly say "Name of the
  model" or "Registered model unique name identifier." Always the
  same domain entity but unscoped.
- **Category:** 15 (generic), 19 (underspecified ID — name is the
  primary key for registered models).
- **Suggested name:** `modelName` or `registeredModelName` on
  request DTOs. Keep `name` on the entity itself (`RegisteredModel`,
  `ModelVersion`) since that's the primary field.
- **Rationale:** Disambiguates request structures from entity
  structures.

### 27. `version: string` field overloaded — `model.ts:197, 274, 419, 429, 471, 521, 533, 649, 662, 693, 834, 927, 984, 1074`
- **Why weird:** Stored as a string but docs say "Model version number"
  (a number). Field is sometimes called `version`, sometimes
  `currentStage` is the contextual sibling — but never typed as a
  number. There is no separate type alias for it.
- **Category:** 16 (field type contradicts domain), 15 (generic), 19
  (underspecified ID).
- **Suggested name:** `modelVersion: string` (or branded type
  `ModelVersionNumber`).
- **Rationale:** `version` is too generic a noun for a primary key in a
  package.

### 28. `runId: string` field — `model.ts:294, 679, 707`
- **Why weird:** `runId` is the MLflow tracking run that produced the
  model. The package never explains this; without prior MLflow
  knowledge `runId` is opaque.
- **Category:** 19 (underspecified ID), 1 (vague).
- **Suggested name:** `trackingRunId` or `mlflowRunId`.
- **Rationale:** Disambiguates from any other "run" concept in the
  SDK (jobs runs, etc.).

### 29. `jobId: string` on `JobSpec` — `model.ts:565`
- **Why weird:** Doc says "ID of the job that the webhook runs." This is
  a Databricks Jobs job ID. `jobId` is fine but lives in a model that
  duplicates the documentation in the comment for
  `CreateRegistryWebhookRequest.jobSpec` (model.ts:371 says "ID of the
  job that the webhook runs.") even though `jobSpec` is a *struct* not
  an ID.
- **Category:** 6 (misleading docstring).
- **Suggested name:** Field name OK; fix doc-comment on
  `CreateRegistryWebhookRequest.jobSpec`.
- **Rationale:** Doc-comment mismatch is a generator bug.

### 30. `accessToken: string` on `JobSpec` — `model.ts:569`
- **Why weird:** Doc says "The personal access token used to authorize
  webhook's job runs." Shipping a PAT in a webhook config is a security
  red flag; field name should signal that. Compare to `secret` on
  `HttpUrlSpec` (model.ts:558) which is also a credential but has a
  different naming style.
- **Category:** 1 (vague), 17 (inconsistent action verbs/prefix).
- **Suggested name:** `pat` or `personalAccessToken` (matches Databricks
  parlance).
- **Rationale:** Aligns with other Databricks SDK fields named `token`
  / `pat`.

### 31. `enableSslVerification: boolean` — `model.ts:556`
- **Why weird:** Doc-comment is 4 lines describing why you should never
  disable this. The boolean has a default (true) per the docs but the
  field is `boolean | undefined`. So `undefined` and `true` mean the
  same thing — confusing.
- **Category:** 16 (semantics not captured in type).
- **Suggested name:** Field name OK; add `@default true` JSDoc tag.
- **Rationale:** Make default-truthy fields clearer.

### 32. `authorization: string` — `model.ts:560`
- **Why weird:** "Value of the authorization header" — should probably
  be named `authorizationHeader` (since `authorization` looks like an
  abstract noun, not the actual header value).
- **Category:** 1 (vague).
- **Suggested name:** `authorizationHeader`.
- **Rationale:** Clarifies the field stores the wire-format header
  value.

### 33. `event: RegistryWebhookEvent | undefined` (singular) on
   `TestRegistryWebhookRequest` — `model.ts:969`
- **Why weird:** Singular `event` while every other type uses
  `events: RegistryWebhookEvent[]`. Inconsistent.
- **Category:** 9 (singular/plural mismatch), 17 (inconsistent across
  sibling types).
- **Suggested name:** Could keep singular but rename to
  `triggerEvent` for clarity, *or* accept the single-event semantics
  with `event` and document the asymmetry.
- **Rationale:** Asymmetry across sibling types causes refactor errors.

### 34. `modelName: string` field on `CreateRegistryWebhookRequest`,
   `ListRegistryWebhooksRequest`, `RegistryWebhook` — `model.ts:329, 601, 827`
- **Why weird:** This is the *registered model* name. Elsewhere in the
  same model the same concept is called `name` (on requests scoped to a
  registered model). Sometimes `modelName` (on webhook types) and
  sometimes just `name`. Pick one.
- **Category:** 17 (inconsistent across sibling types).
- **Suggested name:** `modelName` everywhere (it's clearer) or `name`
  with package context — but consistent.
- **Rationale:** Same concept, two names.

### 35. `events: RegistryWebhookEvent[]` doc paste — `model.ts:331-355,
   602-630, 791-815, 1102-1127`
- **Why weird:** The 25-line "Events that can trigger a registry
  webhook" doc block is copy-pasted at least 4 times across types
  that all expose `events: RegistryWebhookEvent[]`. Pure generator
  noise polluting the public docs.
- **Category:** 7 (overly verbose), Observation.
- **Suggested name:** Doc generation should DRY this; only the field
  signature plus a one-line description should remain.
- **Rationale:** Quality-of-life for consumers reading JSDoc.

### 36. `tags?: ModelVersionTag[] | undefined` and
   `tags?: RegisteredModelTag[] | undefined` — `model.ts:296, 316, 685,
   719, 755, 776`
- **Why weird:** Two parallel `*Tag` types (`ModelVersionTag`,
  `RegisteredModelTag`) that both have `{ key: string; value: string }`.
  Identical shape, two names. (Compare with Unity Catalog tags in
  `entitytagassignments` which use one type.)
- **Category:** 12 (duplicate concepts).
- **Suggested name:** Single `Tag` type with `{ key, value }`.
- **Rationale:** Identical structure should have identical type.

### 37. `availableActions: ActivityAction[]` doc — `model.ts:187`
- **Why weird:** Field comment "Array of actions on the activity
  allowed for the current viewer." So `availableActions` actually means
  "allowed actions for current viewer", which differs from "available
  in general". The viewer-dependent semantics are not in the field name.
- **Category:** 6 (misleading), 1 (vague).
- **Suggested name:** `allowedActions` or `permittedActions`.
- **Rationale:** Encodes the viewer-permission semantics.

### 38. `systemComment: string | undefined` — `model.ts:185, 262, 1050`
- **Why weird:** The same paragraph-long doc-comment is pasted on three
  identical fields across three identical types. "Comment made by
  system, for example explaining an activity of type
  `SYSTEM_TRANSITION`."
- **Category:** 12 (duplicate concept across types), 7 (verbose).
- **Suggested name:** Field name OK; field is also a candidate for
  consolidation via #7.
- **Rationale:** Same as #7.

### 39. `openRequests: Activity[]` on `ModelVersionDatabricks` — `model.ts:716`
- **Why weird:** Typed as `Activity[]` but the field is documented as
  "Open requests for this `model_versions`" — they are transition
  *requests* (not arbitrary activities). The reason is the
  identical-shape problem (#7).
- **Category:** 6 (misleading type), 16 (type contradicts domain).
- **Suggested name:** `openTransitionRequests: TransitionRequest[]`
  (post-rename per #7).
- **Rationale:** Restores the intent.

### 40. `requests: Activity[]` on list-transition-requests response —
   `model.ts:655`
- **Why weird:** Stored as `Activity[]` but the response is documented
  as "Array of open transition requests."
- **Category:** 6 (misleading type), 15 (generic field name).
- **Suggested name:** `transitionRequests: TransitionRequest[]`.
- **Rationale:** Same as #39 — type contradicts domain because of the
  identical-shape problem (#7).

### 41. `request: TransitionRequest` on create-transition-request response —
   `model.ts:404`
- **Why weird:** Field `request` on a response is contradictory — a
  response holds a "request"? In context, the wrapped object is the
  *created* transition request, but the field name doesn't say
  "created".
- **Category:** 6 (misleading), 15 (generic).
- **Suggested name:** `transitionRequest` or `createdRequest`.
- **Rationale:** Removes the "request inside a response" cognitive
  stumble.

### 42. `registeredModelDatabricks: RegisteredModelDatabricks` —
   `model.ts:549`
- **Why weird:** Field name *is* the type name verbatim. The `Databricks`
  suffix problem (#9) cascades into the field name.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** After dropping the `Databricks` suffix from the
  type: `registeredModel: RegisteredModel`. Or just return the type
  directly without a wrapper.
- **Rationale:** Reduces verbosity by removing the wrapper.

### 43. `modelVersionDatabricks: ModelVersionDatabricks` — `model.ts:1007`
- **Why weird:** Same as #42 for `ModelVersionDatabricks`.
- **Category:** 20.
- **Suggested name:** `modelVersion: ModelVersion`.
- **Rationale:** Same.

### 44. `getLatestVersions` / `GetLatestVersionsRequest` — `client.ts:917`,
   `model.ts:501`
- **Why weird:** The method returns *one* version per stage, not "the
  latest version" globally. The name reads as "give me the latest
  versions" (plural overall) but the meaning is "give me the latest one
  for each stage". The docstring on the method (`client.ts:916`) says
  "Gets the latest version of a registered model" (singular) — that's
  *wrong*; the actual response returns a list keyed by stage.
- **Category:** 6 (misleading), 9 (singular/plural confusion).
- **Suggested name:** `getLatestVersionPerStage` or
  `getLatestVersionsByStage`.
- **Rationale:** Conveys the per-stage semantics.

### 45. `latestVersions: ModelVersion[]` on `RegisteredModel`,
   `RegisteredModelDatabricks` — `model.ts:753, 770`
- **Why weird:** Plural array but the doc says "Collection of latest
  model versions for each stage". Same ambiguity as #44.
- **Category:** 6 (misleading), 15 (generic).
- **Suggested name:** `latestVersionsByStage` (and consider returning a
  map keyed by stage name).
- **Rationale:** Same.

### 46. `featureTableId`, `featureTableName`, `featureName` on
   `LinkedFeature` — `model.ts:575, 577, 579`
- **Why weird:** Both `featureTableId` and `featureTableName` are
  exposed — primary key duplication. Doc-comments are bare ("Feature
  table id" / "Feature table name") and don't explain why both are
  present.
- **Category:** 12 (duplicate concept), 19 (underspecified ID).
- **Suggested name:** Field names OK; add JSDoc explaining the
  relationship.
- **Rationale:** Without docs, callers won't know which to populate.

### 47. `body: string` on test-registry-webhook response — `model.ts:977`
- **Why weird:** Field `body` typed as `string`. Webhook test results
  could return any payload. `body` is too generic; could be
  `responseBody`.
- **Category:** 15 (generic).
- **Suggested name:** `responseBody`.
- **Rationale:** Clearer pair with `statusCode`.

### 48. `statusCode: number` on test-registry-webhook response —
   `model.ts:975`
- **Why weird:** Could be `httpStatusCode` for clarity (it's the HTTP
  status the test got back).
- **Category:** 1 (vague).
- **Suggested name:** `httpStatusCode`.
- **Rationale:** Matches typical Web API vocabulary.

### 49. `archiveExistingVersions: boolean` — `model.ts:211, 999`
- **Why weird:** Field documented "Specifies whether to archive all
  current model versions in the target stage." The word "current"
  appears in the doc but not the field; the boolean reads as "archive
  the existing versions" which is ambiguous (which existing? where?).
- **Category:** 6 (misleading), 1 (vague).
- **Suggested name:** `archiveExistingVersionsInTargetStage`.
- **Rationale:** Captures the location semantics.

### 50. `description: string` overloaded — `model.ts:303, 318, 358, 672,
   703, 748, 768, 822, 1077, 1090, 1130`
- **Why weird:** Same field on 11 types, each meaning slightly different
  things (registered-model description, model-version description,
  webhook description, registered-model-databricks description). Same
  field name everywhere.
- **Category:** 15 (generic field name).
- **Suggested name:** Acceptable as `description` if doc-comments are
  clear; flag for consistency.
- **Rationale:** Common across SDK; low cost to leave alone.

### 51. `secret: string` on `HttpUrlSpec` — `model.ts:558`
- **Why weird:** Bare `secret` is generic; doc says it's the "Shared
  secret required for HMAC encoding payload."
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `hmacSecret` or `sharedSecret`.
- **Rationale:** Clarifies purpose.

## Low severity

### 52. `creationTimestamp: number` — `model.ts:152, 229, 664, 696, 742,
   762, 818, 1017`
- **Why weird:** Field is repeated across types with identical
  `Unix timestamp in milliseconds` doc. Naming OK but could be
  `createdAt` to match modern JS convention.
- **Category:** 14 (Go/Java-style names).
- **Suggested name:** `createdAt`.
- **Rationale:** Aligns with JS conventions; flag as observation only.

### 53. `lastUpdatedTimestamp: number` — `model.ts:159, 236, 666, 698, 744,
   764, 820, 1024`
- **Why weird:** Same as #52; `updatedAt` is more idiomatic.
- **Category:** 14.
- **Suggested name:** `updatedAt`.
- **Rationale:** Same as #52.

### 54. `statusMessage: string` — `model.ts:683, 710`
- **Why weird:** Field name fine but doc says it's only set "if it is
  pending or failed", so the field is conditionally meaningful — not in
  the type signature.
- **Category:** 6 (misleading: optional semantics not in type).
- **Suggested name:** Field name OK; document the conditional.
- **Rationale:** Low priority.

### 55. `source: string` on `ModelVersion`, `ModelVersionDatabricks`,
   `CreateModelVersionRequest` — `model.ts:289, 674, 705`
- **Why weird:** "URI indicating the location of the source model
  artifacts." Just `source` is vague; `sourceUri` or `artifactUri` would
  be clearer.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `sourceUri`.
- **Rationale:** Companion field is `runLink` (already specific).

### 56. `runLink: string` — `model.ts:301, 687, 721`
- **Why weird:** "MLflow run link - this is the exact link of the run".
  `runLink` is OK but `runUrl` would be more idiomatic for a URL.
- **Category:** 14 (Java-style "link" vs JS "url").
- **Suggested name:** `runUrl`.
- **Rationale:** "Link" is HTML/UI vocabulary; URL is what's actually
  stored.

### 57. `key: string` and `value: string` on `ModelVersionTag`,
   `RegisteredModelTag` — `model.ts:733, 735, 782, 784`
- **Why weird:** `key`/`value` are extremely generic and reused across
  many SDK packages. Not really wrong, just observation.
- **Category:** 15 (generic).
- **Suggested name:** `tagKey`, `tagValue` (if a type-named field is
  preferred).
- **Rationale:** Trade-off vs verbosity. Low priority.

### 58. `pageToken`, `nextPageToken`, `maxResults` — `model.ts:584, 586,
   593, 633, 634, 642, 877, 886, 894, 905, 913, 921`
- **Why weird:** Consistent across the package — good. Noted for
  completeness.
- **Category:** N/A (consistent).
- **Suggested name:** No change.
- **Rationale:** Observation.

### 59. `orderBy: string[]` on `SearchModelVersionsRequest`,
   `SearchRegisteredModelsRequest` — `model.ts:884, 911`
- **Why weird:** Stringly-typed sort spec; doc says values are like
  `"name DESC"` or `"version ASC"`. Could be a typed `Sort` struct, but
  string is the standard SQL-like sort spec.
- **Category:** 16 (type contradicts domain).
- **Suggested name:** Field name OK; flag the stringly-typed pattern.
- **Rationale:** Matches REST API conventions; low cost.

### 60. `filter: string` on `SearchModelVersionsRequest`,
   `SearchRegisteredModelsRequest` — `model.ts:875, 903`
- **Why weird:** Stringly-typed search filter (SQL-like). Same as #59.
- **Category:** 16.
- **Suggested name:** No change; could be `filterExpression`.
- **Rationale:** REST convention.

### 61. `newName: string` on `RenameRegisteredModelRequest` — `model.ts:862`
- **Why weird:** Field doc says "If provided, updates the name for this
  `registered_model`." Slightly confusing because
  `RenameRegisteredModelRequest` is *the* rename operation — "if
  provided" implies optional, but rename without a new name is
  meaningless.
- **Category:** 6 (misleading semantics).
- **Suggested name:** Make it required (drop `?`), or document that
  omission is a no-op.
- **Rationale:** Optional-but-required-in-practice fields confuse users.

### 62. `name: string` on `RenameRegisteredModelRequest` — `model.ts:860`
- **Why weird:** Field doc "Registered model unique name identifier." -
  duplicates the type name semantics. Could be `currentName` to pair with
  `newName` for clarity.
- **Category:** 17 (inconsistent paired-field naming).
- **Suggested name:** `currentName` + `newName`.
- **Rationale:** Symmetry improves readability of rename payloads.

### 63. `httpUrlSpec` / `jobSpec` doc on `CreateRegistryWebhookRequest` —
   `model.ts:369-371`
- **Why weird:** Doc-comment on `jobSpec` (line 371) is literally just
  "ID of the job that the webhook runs." — wrong, since `jobSpec` is a
  struct holding multiple fields, not an ID.
- **Category:** 6 (misleading docstring).
- **Suggested name:** Field name OK; fix doc-comment.
- **Rationale:** Generator bug; users will read the doc.

## Observations

### 64. Both `modelregistry` and `registeredmodels` exist as packages
The user instruction calls out this duplication. Cross-package overlap:
- `RegisteredModel` (modelregistry) vs `RegisteredModelInfo`
  (registeredmodels) — same concept, different names.
- `ModelVersion` (modelregistry) vs `ModelVersionInfo`
  (registeredmodels) — same concept.
- `CreateRegisteredModelRequest` exists in both packages, with different
  fields.
- `DeleteRegisteredModelRequest` exists in both.
- `ModelVersionStatus` enum exists in both, with different values
  (modelregistry has `PENDING_REGISTRATION | FAILED_REGISTRATION |
  READY`; verify against registeredmodels).
- Modelregistry uses tags as `RegisteredModelTag` / `ModelVersionTag`;
  registeredmodels uses different tag types (verify).
- The two registries cover overlapping but not identical operations.
  Documentation does not direct users to one or the other.
- **Category:** 12 (duplicate concepts — across packages).

### 65. Action-verb conventions in `Client`
The client mixes `Approve` / `Reject` (active verbs for transition-
request lifecycle) with `Set` / `Delete` (CRUD) and `Test` (verb for
webhook health) and `Transition` (verb-as-method-name for state
machine). Consistency-wise the surface is jagged but each verb is
reasonably motivated by the underlying state model. Not a defect, but
worth noting.
- **Category:** 17 (mixed but justified).

### 66. Acronym casing inside doc-comments
`MLflow` is consistent throughout (good). `HTTP` appears as `HTTPS`
(`HttpUrlSpec` doc, model.ts:553) and `HTTPS` (doc, model.ts:368). Type
names use `Http` (Pascal). Standard JS-ecosystem split between Pascal-Http
and SCREAMING-HTTPS.
- **Category:** 3 (acronym casing — minor).

## Domain glossary
- `MLflow` — Used throughout. Refers to the open-source MLflow tracking
  + registry product that this package wraps. Always written `MLflow`,
  never `mlflow` or `Mlflow` (good consistency).
- `Workspace` — Implicit; the entire package is workspace-scoped (vs
  Unity Catalog).
- `Stage` — The MLflow stage enum: `None`, `Staging`, `Production`,
  `Archived`. Never typed; only documented in field comments.
- `Activity` / `TransitionRequest` / `CommentObject` — Three names for
  one shape.
- `Webhook` / `Registry Webhook` — Used interchangeably.
- `Databricks` (as a suffix) — Marker for workspace-extension types
  carrying Databricks-specific fields (permissions, ACL paths, etc.).
- `Tag` — Two distinct types (`ModelVersionTag`, `RegisteredModelTag`)
  with identical shape.
- `Run` — MLflow tracking run (not Databricks job run).
- `RunLink` — URL pointing back to the MLflow tracking-server run.
- `userId` — Username (not numeric ID) per doc-comments.

## File coverage
- `src/v1/model.ts` (2001 lines): read fully.
- `src/v1/client.ts` (1337 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (94 lines): read fully.

## Fixed
_None._
