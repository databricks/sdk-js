// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CleanRoomAutoApprovalRule_AuthorScope {
  AUTHOR_SCOPE_UNSPECIFIED = 'AUTHOR_SCOPE_UNSPECIFIED',
  ANY_AUTHOR = 'ANY_AUTHOR',
}

export interface CleanRoomAutoApprovalRule {
  /** The name of the clean room this auto-approval rule belongs to. */
  cleanRoomName?: string | undefined;
  /** A generated UUID identifying the rule. */
  ruleId?: string | undefined;
  /** The owner of the rule to whom the rule applies. */
  ruleOwnerCollaboratorAlias?: string | undefined;
  /** The auto-approved notebook authors. For 2P, this can only be the other collaborator. */
  authors?:
    | {
        $case: 'authorCollaboratorAlias';
        /**
         * Collaborator alias of the author covered by the rule.
         * Only one of `author_collaborator_alias` and `author_scope` can be set.
         */
        authorCollaboratorAlias: string;
      }
    | {
        $case: 'authorScope';
        /**
         * Scope of authors covered by the rule.
         * Only one of `author_collaborator_alias` and `author_scope` can be set.
         */
        authorScope: CleanRoomAutoApprovalRule_AuthorScope;
      }
    | undefined;
  /** The auto-approved notebook runners. Initially, this can only be one specific runner. */
  runners?:
    | {
        $case: 'runnerCollaboratorAlias';
        /** Collaborator alias of the runner covered by the rule. */
        runnerCollaboratorAlias: string;
      }
    | undefined;
  /** Timestamp of when the rule was created, in epoch milliseconds. */
  createdAt?: number | undefined;
}

export interface CreateCleanRoomAutoApprovalRuleRequest {
  autoApprovalRule?: CleanRoomAutoApprovalRule | undefined;
}

export interface DeleteCleanRoomAutoApprovalRuleRequest {
  cleanRoomName?: string | undefined;
  ruleId?: string | undefined;
}

export interface GetCleanRoomAutoApprovalRuleRequest {
  cleanRoomName?: string | undefined;
  ruleId?: string | undefined;
}

export interface ListCleanRoomAutoApprovalRulesRequest {
  cleanRoomName?: string | undefined;
  /** Maximum number of auto-approval rules to return. Defaults to 100. */
  pageSize?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListCleanRoomAutoApprovalRulesResponse {
  rules?: CleanRoomAutoApprovalRule[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * page_token should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface UpdateCleanRoomAutoApprovalRuleRequest {
  /** The auto-approval rule to update. The rule_id field is used to identify the rule to update. */
  autoApprovalRule?: CleanRoomAutoApprovalRule | undefined;
}

export const unmarshalCleanRoomAutoApprovalRuleSchema: z.ZodType<CleanRoomAutoApprovalRule> =
  z
    .object({
      clean_room_name: z.string().optional(),
      rule_id: z.string().optional(),
      rule_owner_collaborator_alias: z.string().optional(),
      author_collaborator_alias: z.string().optional(),
      author_scope: z.enum(CleanRoomAutoApprovalRule_AuthorScope).optional(),
      runner_collaborator_alias: z.string().optional(),
      created_at: z.number().optional(),
    })
    .transform(d => ({
      cleanRoomName: d.clean_room_name,
      ruleId: d.rule_id,
      ruleOwnerCollaboratorAlias: d.rule_owner_collaborator_alias,
      authors:
        d.author_collaborator_alias !== undefined
          ? {
              $case: 'authorCollaboratorAlias' as const,
              authorCollaboratorAlias: d.author_collaborator_alias,
            }
          : d.author_scope !== undefined
            ? {$case: 'authorScope' as const, authorScope: d.author_scope}
            : undefined,
      runners:
        d.runner_collaborator_alias !== undefined
          ? {
              $case: 'runnerCollaboratorAlias' as const,
              runnerCollaboratorAlias: d.runner_collaborator_alias,
            }
          : undefined,
      createdAt: d.created_at,
    }));

export const unmarshalListCleanRoomAutoApprovalRulesResponseSchema: z.ZodType<ListCleanRoomAutoApprovalRulesResponse> =
  z
    .object({
      rules: z
        .array(z.lazy(() => unmarshalCleanRoomAutoApprovalRuleSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      rules: d.rules,
      nextPageToken: d.next_page_token,
    }));

export const marshalCleanRoomAutoApprovalRuleSchema: z.ZodType = z
  .object({
    cleanRoomName: z.string().optional(),
    ruleId: z.string().optional(),
    ruleOwnerCollaboratorAlias: z.string().optional(),
    authors: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('authorCollaboratorAlias'),
          authorCollaboratorAlias: z.string(),
        }),
        z.object({
          $case: z.literal('authorScope'),
          authorScope: z.enum(CleanRoomAutoApprovalRule_AuthorScope),
        }),
      ])
      .optional(),
    runners: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('runnerCollaboratorAlias'),
          runnerCollaboratorAlias: z.string(),
        }),
      ])
      .optional(),
    createdAt: z.number().optional(),
  })
  .transform(d => ({
    clean_room_name: d.cleanRoomName,
    rule_id: d.ruleId,
    rule_owner_collaborator_alias: d.ruleOwnerCollaboratorAlias,
    ...(d.authors?.$case === 'authorCollaboratorAlias' && {
      author_collaborator_alias: d.authors.authorCollaboratorAlias,
    }),
    ...(d.authors?.$case === 'authorScope' && {
      author_scope: d.authors.authorScope,
    }),
    ...(d.runners?.$case === 'runnerCollaboratorAlias' && {
      runner_collaborator_alias: d.runners.runnerCollaboratorAlias,
    }),
    created_at: d.createdAt,
  }));

export const marshalCreateCleanRoomAutoApprovalRuleRequestSchema: z.ZodType = z
  .object({
    autoApprovalRule: z
      .lazy(() => marshalCleanRoomAutoApprovalRuleSchema)
      .optional(),
  })
  .transform(d => ({
    auto_approval_rule: d.autoApprovalRule,
  }));
