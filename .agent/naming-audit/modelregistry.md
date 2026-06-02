# Naming Audit: modelregistry

**Path:** `packages/modelregistry/src/v1/`
**Versions audited:** v1
**Inferred domain:** MLflow Model Registry (workspace-scoped, "classic"
MLflow). Registers ML models, model versions, stage transitions (None /
Staging / Production / Archived), transition-approval workflow, comments,
tags, latest-version lookups, registry webhooks, and Databricks-specific
permission/ACL extensions. Distinct from `registeredmodels` package which
is the Unity-Catalog-scoped successor.
**Total weird names flagged:** 17

## Summary
| Severity | Count |
| --- | --- |
| High | 13 |
| Medium | 1 |
| Low | 2 |
| Observation | 1 |

## High severity

### 1. `ActivityAction` enum and `availableActions` field — `model.ts:20-31, 187`
- **Why weird:** The field on `Activity` is named
  `availableActions: ActivityAction[]`, so the *type* is "actions". The
  enum mixes two unrelated domains (transition-request lifecycle + comment
  editing) into one type, and the docstring says so explicitly ("For
  activities…For comments…").
- **Category:** 17 (mixed-domain enum).
- **Suggested name:** Split into two enums: `TransitionRequestAction` and
  `CommentAction`.
- **Rationale:** A single enum forced to cover two domains becomes a
  bag-of-strings. Users typing `ActivityAction.` get suggested
  values that may be illegal for their actual context.

### 2. `RegistryEmailSubscriptionType` enum — `model.ts:106-111`
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

### 3. `CommentObject` — `model.ts:226`
- **Why weird:** `Object` is the most generic suffix possible in TS
  (everything is an object). The type is already a TS object, so the
  suffix conveys nothing.
- **Category:** 1 (vague `Object` suffix), 20 (type-suffix tautology).
- **Suggested name:** `Comment`.
- **Rationale:** `Object` adds nothing; the type is already a TS object.

### 4. `GetRegisteredModelDatabricksRequest`, `RegisteredModelDatabricks`,
   `TransitionModelVersionStageDatabricksRequest`, `ModelVersionDatabricks` —
   `model.ts:525, 676, 744, 962`
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

### 5. `TransitionModelVersionStageDatabricksRequest` — `model.ts:962`
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

### 6. `GetRegisteredModelDatabricksRequest` request DTO — `model.ts:525`
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

### 7. `client.listTransitionsRequest` method vs `ListTransitionRequest`
   request type — `client.ts:527, model.ts:632`
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

### 8. `RegistryWebhook` vs `Webhook` — `model.ts:773`
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

### 9. `HttpUrlSpec` / `JobSpec` — `model.ts:534, 545`
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

### 10. `LinkedFeature` — `model.ts:555`
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

### 11. `Databricks` as a suffix is overused
- **Why weird:** Distinct type names still end in `Databricks` (see #4):
  `RegisteredModelDatabricks`, `ModelVersionDatabricks`. Two more retain
  `Databricks` as an infix inside the new `Request` suffix
  (`GetRegisteredModelDatabricksRequest`,
  `TransitionModelVersionStageDatabricksRequest`). Each one is a
  workspace-specific extension. The `Databricks` token appearing inside
  the *Databricks SDK* is tautological.
- **Category:** 8 (redundant suffix), 20 (type-suffix tautology).
- **Suggested name:** See #4.
- **Rationale:** See #4.

### 12. `getRegisteredModelDatabricks` client method — `client.ts:424`
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

### 13. `transitionModelVersionStageDatabricks` client method —
   `client.ts:632`
- **Why weird:** Same `Databricks` mid-position leak as #12. The token
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
  overlap (see #5).
- **Rationale:** Same as #12 — the infix encodes a generator-side
  distinction that callers do not need.

## Medium severity

### 14. `listLatestVersions` / `ListLatestVersionsRequest` — `client.ts:1029`,
   `model.ts:564`
- **Why weird:** The method returns *one* version per stage, not "the
  latest version" globally. The name reads as "list the latest versions"
  (plural overall) but the meaning is "give me the latest one for each
  stage". The docstring on the method (`client.ts:1028`) says "Gets the
  latest version of a registered model" (singular) — that's *wrong*; the
  actual response returns a list keyed by stage.
- **Category:** 6 (misleading), 9 (singular/plural confusion).
- **Suggested name:** `listLatestVersionPerStage` or
  `listLatestVersionsByStage`.
- **Rationale:** Conveys the per-stage semantics.

## Low severity

### 15. `pageToken`, `nextPageToken`, `maxResults` — `model.ts:573, 575,
   581, 621, 622, 629, 861, 870, 877, 888, 896, 903`
- **Why weird:** Consistent across the package — good. Noted for
  completeness.
- **Category:** N/A (consistent).
- **Suggested name:** No change.
- **Rationale:** Observation.

### 16. `newName: string` on `RenameRegisteredModelRequest` — `model.ts:847`
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

### 17. Action-verb conventions in `Client`
The client mixes `Approve` / `Reject` (active verbs for transition-
request lifecycle) with `Set` / `Delete` (CRUD) and `Test` (verb for
webhook health) and `Transition` (verb-as-method-name for state
machine). Consistency-wise the surface is jagged but each verb is
reasonably motivated by the underlying state model. Not a defect, but
worth noting.
- **Category:** 17 (mixed but justified).
