// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface CreateRepo {
  /** URL of the Git repository to be linked. */
  url?: string | undefined;
  /**
   * Git provider. This field is case-insensitive. The available Git providers are `gitHub`,
   * `bitbucketCloud`, `gitLab`, `azureDevOpsServices`, `gitHubEnterprise`, `bitbucketServer`,
   * `gitLabEnterpriseEdition` and `awsCodeCommit`.
   */
  provider?: string | undefined;
  /**
   * Desired path for the repo in the workspace. Almost any path in the workspace can be chosen.
   * If repo is created in `/Repos`, path must be in the format `/Repos/{folder}/{repo-name}`.
   */
  path?: string | undefined;
  /**
   * If specified, the repo will be created with sparse checkout enabled. You cannot enable/disable
   * sparse checkout after the repo is created.
   */
  sparseCheckout?: SparseCheckout | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateRepo_Response {
  /** ID of the Git folder (repo) object in the workspace. */
  id?: number | undefined;
  /** Path of the Git folder (repo) in the workspace. */
  path?: string | undefined;
  /** URL of the linked Git repository. */
  url?: string | undefined;
  /** Git provider of the linked Git repository. */
  provider?: string | undefined;
  /** Branch that the Git folder (repo) is checked out to. */
  branch?: string | undefined;
  /** SHA-1 hash representing the commit ID of the current HEAD of the Git folder (repo). */
  headCommitId?: string | undefined;
  /** Sparse checkout settings for the Git folder (repo). */
  sparseCheckout?: SparseCheckout | undefined;
}

export interface DeleteProject {
  /** The ID for the corresponding repo to delete. */
  id?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteProject_Response {}

export interface GetRepo {
  /** ID of the Git folder (repo) object in the workspace. */
  id?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetRepo_Response {
  /** ID of the Git folder (repo) object in the workspace. */
  id?: number | undefined;
  /** Path of the Git folder (repo) in the workspace. */
  path?: string | undefined;
  /** URL of the linked Git repository. */
  url?: string | undefined;
  /** Git provider of the linked Git repository. */
  provider?: string | undefined;
  /** Branch that the local version of the repo is checked out to. */
  branch?: string | undefined;
  /** SHA-1 hash representing the commit ID of the current HEAD of the repo. */
  headCommitId?: string | undefined;
  /** Sparse checkout settings for the Git folder (repo). */
  sparseCheckout?: SparseCheckout | undefined;
}

export interface ListRepos {
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListRepos_Response {
  /** List of Git folders (repos). */
  repos?: RepoInfo[] | undefined;
  /**
   * Token that can be specified as a query parameter to the `GET /repos` endpoint to retrieve
   * the next page of results.
   */
  nextPageToken?: string | undefined;
}

/** Git folder (repo) information. */
export interface RepoInfo {
  /** Id of the git folder (repo) in the Workspace. */
  id?: number | undefined;
  /** Root path of the git folder (repo) in the Workspace. */
  path?: string | undefined;
  /** URL of the remote git repository. */
  url?: string | undefined;
  /** Git provider of the remote git repository, e.g. `gitHub`. */
  provider?: string | undefined;
  /** Name of the current git branch of the git folder (repo). */
  branch?: string | undefined;
  /** Current git commit id of the git folder (repo). */
  headCommitId?: string | undefined;
  /** Sparse checkout config for the git folder (repo). */
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

export interface UpdateRepo {
  /** ID of the Git folder (repo) object in the workspace. */
  id?: number | undefined;
  /** Branch that the local version of the repo is checked out to. */
  branch?: string | undefined;
  /**
   * Tag that the local version of the repo is checked out to. Updating the repo to a tag puts
   * the repo in a detached HEAD state. Before committing new changes, you must update the repo to
   * a branch instead of the detached HEAD.
   */
  tag?: string | undefined;
  /**
   * If specified, update the sparse checkout settings. The update will fail if sparse checkout is
   * not enabled for the repo.
   */
  sparseCheckout?: SparseCheckoutUpdate | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface UpdateRepo_Response {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateRepo_ResponseSchema: z.ZodType<CreateRepo_Response> =
  z
    .object({
      id: z.number().optional(),
      path: z.string().optional(),
      url: z.string().optional(),
      provider: z.string().optional(),
      branch: z.string().optional(),
      head_commit_id: z.string().optional(),
      sparse_checkout: z.lazy(() => unmarshalSparseCheckoutSchema).optional(),
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteProject_ResponseSchema: z.ZodType<DeleteProject_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetRepo_ResponseSchema: z.ZodType<GetRepo_Response> = z
  .object({
    id: z.number().optional(),
    path: z.string().optional(),
    url: z.string().optional(),
    provider: z.string().optional(),
    branch: z.string().optional(),
    head_commit_id: z.string().optional(),
    sparse_checkout: z.lazy(() => unmarshalSparseCheckoutSchema).optional(),
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListRepos_ResponseSchema: z.ZodType<ListRepos_Response> =
  z
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
    id: z.number().optional(),
    path: z.string().optional(),
    url: z.string().optional(),
    provider: z.string().optional(),
    branch: z.string().optional(),
    head_commit_id: z.string().optional(),
    sparse_checkout: z.lazy(() => unmarshalSparseCheckoutSchema).optional(),
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateRepo_ResponseSchema: z.ZodType<UpdateRepo_Response> =
  z.object({});

export const marshalCreateRepoSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    provider: z.string().optional(),
    path: z.string().optional(),
    sparseCheckout: z.lazy(() => marshalSparseCheckoutSchema).optional(),
  })
  .transform(d => ({
    url: d.url,
    provider: d.provider,
    path: d.path,
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

export const marshalUpdateRepoSchema: z.ZodType = z
  .object({
    id: z.number().optional(),
    branch: z.string().optional(),
    tag: z.string().optional(),
    sparseCheckout: z.lazy(() => marshalSparseCheckoutUpdateSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    branch: d.branch,
    tag: d.tag,
    sparse_checkout: d.sparseCheckout,
  }));
