# Naming Audit: modelregistry

**Path:** `packages/modelregistry/src/v1/`
**Versions audited:** v1
**Inferred domain:** MLflow Model Registry (workspace-scoped, "classic"
MLflow). Registers ML models, model versions, stage transitions (None /
Staging / Production / Archived), transition-approval workflow, comments,
tags, latest-version lookups, registry webhooks, and Databricks-specific
permission/ACL extensions. Distinct from `registeredmodels` package which
is the Unity-Catalog-scoped successor.
**Total weird names flagged:** 31

## Summary
| Severity | Count |
| --- | --- |
| High | 20 |
| Medium | 6 |
| Low | 2 |
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

### 4. `RegistryEmailSubscriptionType` enum — `model.ts:106-111`
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

### 5. `RegistryWebhookEvent` enum — `model.ts:113-126`
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

### 6. `Activity` vs `CommentObject` vs `TransitionRequest` — `model.ts:150, 227, 1015`
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

### 7. `CommentObject` — `model.ts:227`
- **Why weird:** `Object` is the most generic suffix possible in TS
  (everything is an object). Combined with the duplicate-shape problem
  (#6), this is a textbook bad name.
- **Category:** 1 (vague `Object` suffix), 20 (type-suffix tautology).
- **Suggested name:** `Comment` — or fold into `Activity` per #6.
- **Rationale:** `Object` adds nothing; the type is already a TS object.

### 8. `GetRegisteredModelDatabricksRequest`, `RegisteredModelDatabricks`,
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

### 9. `TransitionModelVersionStageDatabricksRequest` — `model.ts:981`
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

### 10. `GetRegisteredModelDatabricksRequest` request DTO — `model.ts:542`
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

### 11. `client.listTransitionsRequest` method vs `ListTransitionRequest`
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

### 12. `RegistryWebhook` vs `Webhook` — `model.ts:787`
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

### 13. `HttpUrlSpec` / `JobSpec` — `model.ts:552, 563`
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

### 14. `LinkedFeature` — `model.ts:573`
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

### 15. `stage: string` field on `ApproveTransitionRequest`,
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

### 16. `currentStage: string` field on `ModelVersion`,
   `ModelVersionDatabricks` — `model.ts:670, 701`
- **Why weird:** Same as #15 — typed as `string`, valid values
  enumerated only in docs. Also called `currentStage` here but `stage`
  on request DTOs (no prefix). Inconsistent.
- **Category:** 6 (misleading), 16 (type contradicts domain), 17
  (inconsistent prefix).
- **Suggested name:** `stage: Stage` (enum) for both.
- **Rationale:** "Current" is implicit (it's the *current* stage of
  this version).

### 17. `fromStage`, `toStage` fields — `model.ts:171, 183, 248, 260, 1036, 1048`
- **Why weird:** Three different `Activity`-shaped types each duplicate
  `fromStage: string | undefined`, `toStage: string | undefined`,
  again stringly typed. Identical doc-comments paste the same four-value
  list six times.
- **Category:** 16 (type contradicts domain), 12 (duplicate concept), 7
  (overly verbose docs).
- **Suggested name:** `fromStage: Stage`, `toStage: Stage`.
- **Rationale:** Same as #15.

### 18. `Databricks` as a suffix is overused
- **Why weird:** Distinct type names still end in `Databricks` (see #8):
  `RegisteredModelDatabricks`, `ModelVersionDatabricks`. Two more retain
  `Databricks` as an infix inside the new `Request` suffix
  (`GetRegisteredModelDatabricksRequest`,
  `TransitionModelVersionStageDatabricksRequest`). Each one is a
  workspace-specific extension. The `Databricks` token appearing inside
  the *Databricks SDK* is tautological.
- **Category:** 8 (redundant suffix), 20 (type-suffix tautology).
- **Suggested name:** See #8.
- **Rationale:** See #8.

### 19. `getRegisteredModelDatabricks` client method — `client.ts:416`
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

### 20. `transitionModelVersionStageDatabricks` client method —
   `client.ts:615`
- **Why weird:** Same `Databricks` mid-position leak as #19. The token
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
  overlap (see #9).
- **Rationale:** Same as #19 — the infix encodes a generator-side
  distinction that callers do not need.

## Medium severity

### 21. `tags?: ModelVersionTag[] | undefined` and
   `tags?: RegisteredModelTag[] | undefined` — `model.ts:296, 316, 685,
   719, 755, 776`
- **Why weird:** Two parallel `*Tag` types (`ModelVersionTag`,
  `RegisteredModelTag`) that both have `{ key: string; value: string }`.
  Identical shape, two names. (Compare with Unity Catalog tags in
  `entitytagassignments` which use one type.)
- **Category:** 12 (duplicate concepts).
- **Suggested name:** Single `Tag` type with `{ key, value }`.
- **Rationale:** Identical structure should have identical type.

### 22. `openRequests: Activity[]` on `ModelVersionDatabricks` — `model.ts:716`
- **Why weird:** Typed as `Activity[]` but the field is documented as
  "Open requests for this `model_versions`" — they are transition
  *requests* (not arbitrary activities). The reason is the
  identical-shape problem (#6).
- **Category:** 6 (misleading type), 16 (type contradicts domain).
- **Suggested name:** `openTransitionRequests: TransitionRequest[]`
  (post-rename per #6).
- **Rationale:** Restores the intent.

### 23. `requests: Activity[]` on list-transition-requests response —
   `model.ts:655`
- **Why weird:** Stored as `Activity[]` but the response is documented
  as "Array of open transition requests."
- **Category:** 6 (misleading type), 15 (generic field name).
- **Suggested name:** `transitionRequests: TransitionRequest[]`.
- **Rationale:** Same as #22 — type contradicts domain because of the
  identical-shape problem (#6).

### 24. `registeredModelDatabricks: RegisteredModelDatabricks` —
   `model.ts:549`
- **Why weird:** Field name *is* the type name verbatim. The `Databricks`
  suffix problem (#8) cascades into the field name.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** After dropping the `Databricks` suffix from the
  type: `registeredModel: RegisteredModel`. Or just return the type
  directly without a wrapper.
- **Rationale:** Reduces verbosity by removing the wrapper.

### 25. `modelVersionDatabricks: ModelVersionDatabricks` — `model.ts:1007`
- **Why weird:** Same as #24 for `ModelVersionDatabricks`.
- **Category:** 20.
- **Suggested name:** `modelVersion: ModelVersion`.
- **Rationale:** Same.

### 26. `getLatestVersions` / `GetLatestVersionsRequest` — `client.ts:917`,
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

## Low severity

### 27. `pageToken`, `nextPageToken`, `maxResults` — `model.ts:584, 586,
   593, 633, 634, 642, 877, 886, 894, 905, 913, 921`
- **Why weird:** Consistent across the package — good. Noted for
  completeness.
- **Category:** N/A (consistent).
- **Suggested name:** No change.
- **Rationale:** Observation.

### 28. `newName: string` on `RenameRegisteredModelRequest` — `model.ts:862`
- **Why weird:** Field doc says "If provided, updates the name for this
  `registered_model`." Slightly confusing because
  `RenameRegisteredModelRequest` is *the* rename operation — "if
  provided" implies optional, but rename without a new name is
  meaningless.
- **Category:** 6 (misleading semantics).
- **Suggested name:** Make it required (drop `?`), or document that
  omission is a no-op.
- **Rationale:** Optional-but-required-in-practice fields confuse users.

## Observations

### 29. Both `modelregistry` and `registeredmodels` exist as packages
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

### 30. Action-verb conventions in `Client`
The client mixes `Approve` / `Reject` (active verbs for transition-
request lifecycle) with `Set` / `Delete` (CRUD) and `Test` (verb for
webhook health) and `Transition` (verb-as-method-name for state
machine). Consistency-wise the surface is jagged but each verb is
reasonably motivated by the underlying state model. Not a defect, but
worth noting.
- **Category:** 17 (mixed but justified).

### 31. Acronym casing inside doc-comments
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
