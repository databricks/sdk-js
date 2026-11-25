// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface CreateRepoRequest {
  /** HTTPS URL of the Git repository to be linked. SSH URLs are not supported. */
  url?: string | undefined;
  /**
   * Git provider. This field is case-insensitive. The available Git providers are `gitHub`,
   * `bitbucketCloud`, `gitLab`, `azureDevOpsServices` (Azure DevOps Services, including
   * Microsoft Entra ID authentication), `gitHubEnterprise`, `bitbucketServer` (Bitbucket
   * Data Center), `gitLabEnterpriseEdition` (GitLab Self-Managed), and `awsCodeCommit`.
   */
  provider?: string | undefined;
  /**
   * Desired path for the repo in the workspace. Almost any path in the workspace can be chosen.
   * If repo is created in `/Repos`, path must be in the format `/Repos/{folder}/{repo-name}`.
   * If omitted, the repo is created in the calling user's home folder (`/Users/{user}`, or
   * `/Repos/{user}` in workspaces without workspace files). The repo name is the last path
   * segment of `url`, for example `cli.git`.
   */
  path?: string | undefined;
  /**
   * If specified, the repo will be created with sparse checkout enabled. You cannot enable/disable
   * sparse checkout after the repo is created.
   */
  sparseCheckout?: SparseCheckout | undefined;
  /**
   * Git credential ID to use when cloning the repository. The Git credential must be
   * configured for the current user.
   */
  gitCredentialId?: bigint | undefined;
}

export interface CreateRepoResponse {
  /** ID of the Git folder (repo) object in the workspace. */
  id?: bigint | undefined;
  /** Path of the Git folder (repo) in the workspace. */
  path?: string | undefined;
  /** URL of the linked Git repository. */
  url?: string | undefined;
  /**
   * Git provider of the linked Git repository. Supported providers are `gitHub`,
   * `bitbucketCloud`, `gitLab`, `azureDevOpsServices`, `gitHubEnterprise`, `bitbucketServer`
   * (Bitbucket Data Center), `gitLabEnterpriseEdition` (GitLab Self-Managed), and
   * `awsCodeCommit`.
   */
  provider?: string | undefined;
  /** Branch that the Git folder (repo) is checked out to. */
  branch?: string | undefined;
  /** SHA-1 hash representing the commit ID of the current HEAD of the Git folder (repo). */
  headCommitId?: string | undefined;
  /**
   * Sparse checkout settings for the Git folder (repo). Only present when sparse checkout is
   * enabled for the Git folder.
   */
  sparseCheckout?: SparseCheckout | undefined;
}

export interface DeleteRepoRequest {
  /** ID of the Git folder (repo) to delete. */
  id?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteRepoResponse {}

export interface GetRepoRequest {
  /** ID of the Git folder (repo) object in the workspace. */
  id?: bigint | undefined;
}

export interface GetRepoResponse {
  /** ID of the Git folder (repo) object in the workspace. */
  id?: bigint | undefined;
  /** Path of the Git folder (repo) in the workspace. */
  path?: string | undefined;
  /** URL of the linked Git repository. */
  url?: string | undefined;
  /**
   * Git provider of the linked Git repository. Supported providers are `gitHub`,
   * `bitbucketCloud`, `gitLab`, `azureDevOpsServices`, `gitHubEnterprise`, `bitbucketServer`
   * (Bitbucket Data Center), `gitLabEnterpriseEdition` (GitLab Self-Managed), and
   * `awsCodeCommit`.
   */
  provider?: string | undefined;
  /**
   * Branch that the local version of the repo is checked out to. Omitted when the Git folder
   * (repo) is in a detached HEAD state, for example after checking out a tag.
   */
  branch?: string | undefined;
  /** SHA-1 hash representing the commit ID of the current HEAD of the repo. */
  headCommitId?: string | undefined;
  /**
   * Sparse checkout settings for the Git folder (repo). Only present when sparse checkout is
   * enabled for the Git folder.
   */
  sparseCheckout?: SparseCheckout | undefined;
  /**
   * Whether the Git CLI is enabled for this Git folder (repo). When true, Git commands
   * can be run directly against this Git folder using the Git CLI.
   */
  gitCliEnabled?: boolean | undefined;
}

export interface ListReposRequest {
  /**
   * Filters repos that have paths starting with the given path prefix.
   * If not provided or when provided an effectively empty prefix (`/` or `/Workspace`)
   * Git folders (repos) from `/Workspace/Repos` will be served.
   */
  pathPrefix?: string | undefined;
  /**
   * Token used to get the next page of results. If not specified, returns the first page of
   * results as well as a next page token if there are more results.
   */
  nextPageToken?: string | undefined;
}

export interface ListReposResponse {
  /** List of Git folders (repos). */
  repos?: RepoInfo[] | undefined;
  /**
   * Token that can be specified as a query parameter to the `GET /repos` endpoint to retrieve
   * the next page of results.
   */
  nextPageToken?: string | undefined;
}

/**
 * Git folder (repo) information. A Git folder is a workspace folder that is linked to a remote
 * Git repository and tracks the branch or commit that is checked out.
 */
export interface RepoInfo {
  /** ID of the Git folder (repo) object in the workspace. */
  id?: bigint | undefined;
  /** Root path of the git folder (repo) in the Workspace. */
  path?: string | undefined;
  /** HTTPS URL of the remote Git repository. */
  url?: string | undefined;
  /**
   * Git provider of the remote Git repository. Supported providers are `gitHub`,
   * `bitbucketCloud`, `gitLab`, `azureDevOpsServices`, `gitHubEnterprise`, `bitbucketServer`
   * (Bitbucket Data Center), `gitLabEnterpriseEdition` (GitLab Self-Managed), and
   * `awsCodeCommit`.
   */
  provider?: string | undefined;
  /**
   * Name of the branch that the Git folder (repo) is checked out to. Omitted when the Git folder
   * is in a detached HEAD state, for example after checking out a tag.
   */
  branch?: string | undefined;
  /** SHA-1 hash of the commit that the Git folder (repo) is currently checked out to. */
  headCommitId?: string | undefined;
  /**
   * Sparse checkout configuration of the Git folder (repo). Only present when sparse checkout is
   * enabled for the Git folder.
   */
  sparseCheckout?: SparseCheckout | undefined;
}

/** Sparse checkout configuration, it contains options like cone patterns. */
export interface SparseCheckout {
  /**
   * List of sparse checkout cone patterns, see
   * [cone mode handling](https://git-scm.com/docs/git-sparse-checkout#_internalscone_mode_handling)
   * for details.
   */
  patterns?: string[] | undefined;
}

/** Sparse checkout configuration, it contains options like cone patterns. */
export interface SparseCheckoutUpdate {
  /**
   * List of sparse checkout cone patterns, see
   * [cone mode handling](https://git-scm.com/docs/git-sparse-checkout#_internalscone_mode_handling)
   * for details.
   */
  patterns?: string[] | undefined;
}

export interface UpdateRepoRequest {
  /** ID of the Git folder (repo) object in the workspace. */
  id?: bigint | undefined;
  /**
   * Branch to check out. The Git folder (repo) is then updated to the latest commit of the
   * branch. Mutually exclusive with `tag`.
   */
  branch?: string | undefined;
  /**
   * Tag that the local version of the repo is checked out to. Updating the repo to a tag puts
   * the repo in a detached HEAD state. Before committing new changes, you must update the repo to
   * a branch instead of the detached HEAD. Mutually exclusive with `branch`.
   */
  tag?: string | undefined;
  /**
   * If specified, update the sparse checkout settings. The update will fail if sparse checkout is
   * not enabled for the repo. Must be sent together with `branch` or `tag`.
   */
  sparseCheckout?: SparseCheckoutUpdate | undefined;
  /**
   * WARNING: DESTRUCTIVE AND IRREVERSIBLE. If true, permanently deletes ALL uncommitted
   * changes in the Git folder — staged, unstaged, and untracked files — before updating.
   * Lost data CANNOT be recovered.
   *
   * NEVER use this on Git folders where users author or edit files. This flag is intended
   * ONLY for automated jobs that treat the Git folder as a read-only mirror of a remote
   * branch and need to force-sync it. If any user has uncommitted work in the Git folder,
   * that work will be permanently destroyed without warning.
   *
   * Local commits that have been made but not yet pushed to the remote are preserved.
   */
  dangerouslyForceDiscardAll?: boolean | undefined;
  /**
   * Git credential ID to use for this update operation. The Git credential must be
   * configured for the current user.
   */
  gitCredentialId?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateRepoResponse {}

export const unmarshalCreateRepoResponseSchema: z.ZodType<CreateRepoResponse> =
  z
    .object({
      id: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      path: z.string().optional(),
      url: z.string().optional(),
      provider: z.string().optional(),
      branch: z.string().optional(),
      head_commit_id: z.string().optional(),
      sparse_checkout: z
        .lazy(() => unmarshalSparseCheckoutSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      id: d.id,
      path: d.path,
      url: d.url,
      provider: d.provider,
      branch: d.branch,
      headCommitId: d.head_commit_id,
      sparseCheckout: d.sparse_checkout,
    }));

export const unmarshalDeleteRepoResponseSchema: z.ZodType<DeleteRepoResponse> =
  z.object({});

export const unmarshalGetRepoResponseSchema: z.ZodType<GetRepoResponse> = z
  .object({
    id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    path: z.string().optional(),
    url: z.string().optional(),
    provider: z.string().optional(),
    branch: z.string().optional(),
    head_commit_id: z.string().optional(),
    sparse_checkout: z
      .lazy(() => unmarshalSparseCheckoutSchema)
      .nullish()
      .transform(v => v ?? undefined),
    git_cli_enabled: z.boolean().optional(),
  })
  .transform(d => ({
    id: d.id,
    path: d.path,
    url: d.url,
    provider: d.provider,
    branch: d.branch,
    headCommitId: d.head_commit_id,
    sparseCheckout: d.sparse_checkout,
    gitCliEnabled: d.git_cli_enabled,
  }));

export const unmarshalListReposResponseSchema: z.ZodType<ListReposResponse> = z
  .object({
    repos: z.array(z.lazy(() => unmarshalRepoInfoSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    repos: d.repos,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalRepoInfoSchema: z.ZodType<RepoInfo> = z
  .object({
    id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    path: z.string().optional(),
    url: z.string().optional(),
    provider: z.string().optional(),
    branch: z.string().optional(),
    head_commit_id: z.string().optional(),
    sparse_checkout: z
      .lazy(() => unmarshalSparseCheckoutSchema)
      .nullish()
      .transform(v => v ?? undefined),
  })
  .transform(d => ({
    id: d.id,
    path: d.path,
    url: d.url,
    provider: d.provider,
    branch: d.branch,
    headCommitId: d.head_commit_id,
    sparseCheckout: d.sparse_checkout,
  }));

export const unmarshalSparseCheckoutSchema: z.ZodType<SparseCheckout> = z
  .object({
    patterns: z.array(z.string()).optional(),
  })
  .transform(d => ({
    patterns: d.patterns,
  }));

export const unmarshalUpdateRepoResponseSchema: z.ZodType<UpdateRepoResponse> =
  z.object({});

export const marshalCreateRepoRequestSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    provider: z.string().optional(),
    path: z.string().optional(),
    sparseCheckout: z.lazy(() => marshalSparseCheckoutSchema).optional(),
    gitCredentialId: z.bigint().optional(),
  })
  .transform(d => ({
    url: d.url,
    provider: d.provider,
    path: d.path,
    sparse_checkout: d.sparseCheckout,
    git_credential_id: d.gitCredentialId,
  }));

export const marshalCreateRepoResponseSchema: z.ZodType = z
  .object({
    id: z.bigint().optional(),
    path: z.string().optional(),
    url: z.string().optional(),
    provider: z.string().optional(),
    branch: z.string().optional(),
    headCommitId: z.string().optional(),
    sparseCheckout: z.lazy(() => marshalSparseCheckoutSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    path: d.path,
    url: d.url,
    provider: d.provider,
    branch: d.branch,
    head_commit_id: d.headCommitId,
    sparse_checkout: d.sparseCheckout,
  }));

export const marshalDeleteRepoRequestSchema: z.ZodType = z
  .object({
    id: z.bigint().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const marshalDeleteRepoResponseSchema: z.ZodType = z.object({});

export const marshalGetRepoRequestSchema: z.ZodType = z
  .object({
    id: z.bigint().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const marshalGetRepoResponseSchema: z.ZodType = z
  .object({
    id: z.bigint().optional(),
    path: z.string().optional(),
    url: z.string().optional(),
    provider: z.string().optional(),
    branch: z.string().optional(),
    headCommitId: z.string().optional(),
    sparseCheckout: z.lazy(() => marshalSparseCheckoutSchema).optional(),
    gitCliEnabled: z.boolean().optional(),
  })
  .transform(d => ({
    id: d.id,
    path: d.path,
    url: d.url,
    provider: d.provider,
    branch: d.branch,
    head_commit_id: d.headCommitId,
    sparse_checkout: d.sparseCheckout,
    git_cli_enabled: d.gitCliEnabled,
  }));

export const marshalListReposRequestSchema: z.ZodType = z
  .object({
    pathPrefix: z.string().optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    path_prefix: d.pathPrefix,
    next_page_token: d.nextPageToken,
  }));

export const marshalListReposResponseSchema: z.ZodType = z
  .object({
    repos: z.array(z.lazy(() => marshalRepoInfoSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    repos: d.repos,
    next_page_token: d.nextPageToken,
  }));

export const marshalRepoInfoSchema: z.ZodType = z
  .object({
    id: z.bigint().optional(),
    path: z.string().optional(),
    url: z.string().optional(),
    provider: z.string().optional(),
    branch: z.string().optional(),
    headCommitId: z.string().optional(),
    sparseCheckout: z.lazy(() => marshalSparseCheckoutSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    path: d.path,
    url: d.url,
    provider: d.provider,
    branch: d.branch,
    head_commit_id: d.headCommitId,
    sparse_checkout: d.sparseCheckout,
  }));

export const marshalSparseCheckoutSchema: z.ZodType = z
  .object({
    patterns: z.array(z.string()).optional(),
  })
  .transform(d => ({
    patterns: d.patterns,
  }));

export const marshalSparseCheckoutUpdateSchema: z.ZodType = z
  .object({
    patterns: z.array(z.string()).optional(),
  })
  .transform(d => ({
    patterns: d.patterns,
  }));

export const marshalUpdateRepoRequestSchema: z.ZodType = z
  .object({
    id: z.bigint().optional(),
    branch: z.string().optional(),
    tag: z.string().optional(),
    sparseCheckout: z.lazy(() => marshalSparseCheckoutUpdateSchema).optional(),
    dangerouslyForceDiscardAll: z.boolean().optional(),
    gitCredentialId: z.bigint().optional(),
  })
  .transform(d => ({
    id: d.id,
    branch: d.branch,
    tag: d.tag,
    sparse_checkout: d.sparseCheckout,
    dangerously_force_discard_all: d.dangerouslyForceDiscardAll,
    git_credential_id: d.gitCredentialId,
  }));

export const marshalUpdateRepoResponseSchema: z.ZodType = z.object({});
