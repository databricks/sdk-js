// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface CreateCredentialsRequest {
  /**
   * Git provider. This field is case-insensitive. The available Git providers are `gitHub`,
   * `bitbucketCloud`, `gitLab`, `azureDevOpsServices` (Azure DevOps Services, including
   * Microsoft Entra ID authentication), `gitHubEnterprise`, `bitbucketServer` (Bitbucket
   * Data Center), `gitLabEnterpriseEdition` (GitLab Self-Managed), and `awsCodeCommit`
   * (deprecated by AWS, not accepting new customers).
   */
  gitProvider?: string | undefined;
  /**
   * The username provided with your Git provider account and associated with the
   * credential. For most Git providers it is only used to set the Git committer & author names for commits,
   * however it may be required for authentication depending on your Git provider / token requirements.
   * Required for AWS CodeCommit.
   */
  gitUsername?: string | undefined;
  /**
   * The personal access token used to authenticate to the corresponding Git provider.
   * For certain providers, support may exist for other types of scoped access tokens.
   * [Learn more](https://docs.databricks.com/repos/get-access-tokens-from-git-provider.html).
   */
  personalAccessToken?: string | undefined;
  /** The ID of the service principal whose credentials will be modified. Only service principal managers can perform this action. */
  principalId?: bigint | undefined;
  /** the name of the git credential, used for identification and ease of lookup */
  name?: string | undefined;
  /** if the credential is the default for the given provider */
  isDefaultForProvider?: boolean | undefined;
  /**
   * The authenticating email associated with your Git provider user account.
   * Used for authentication with the remote repository and also sets the author & committer identity for commits.
   * Required for most Git providers except AWS CodeCommit.
   * Learn more at https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
   */
  gitEmail?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateCredentialsRequest_Response {
  /** ID of the credential object in the workspace. */
  credentialId?: bigint | undefined;
  /** The Git provider associated with the credential. */
  gitProvider?: string | undefined;
  /**
   * The username provided with your Git provider account and associated with the
   * credential. For most Git providers it is only used to set the Git committer & author names for commits,
   * however it may be required for authentication depending on your Git provider / token requirements.
   * Required for AWS CodeCommit.
   */
  gitUsername?: string | undefined;
  /** the name of the git credential, used for identification and ease of lookup */
  name?: string | undefined;
  /** if the credential is the default for the given provider */
  isDefaultForProvider?: boolean | undefined;
  /**
   * The authenticating email associated with your Git provider user account.
   * Used for authentication with the remote repository and also sets the author & committer identity for commits.
   * Required for most Git providers except AWS CodeCommit.
   * Learn more at https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
   */
  gitEmail?: string | undefined;
}

export interface Credential {
  /** ID of the credential object in the workspace. */
  credentialId?: bigint | undefined;
  /**
   * The Git provider associated with the credential. One of `gitHub`, `bitbucketCloud`,
   * `gitLab`, `azureDevOpsServices` (Azure DevOps Services, including Microsoft Entra ID
   * authentication), `gitHubEnterprise`, `bitbucketServer` (Bitbucket Data Center),
   * `gitLabEnterpriseEdition` (GitLab Self-Managed), or `awsCodeCommit` (deprecated).
   */
  gitProvider?: string | undefined;
  /**
   * The username provided with your Git provider account and associated with the
   * credential. For most Git providers it is only used to set the Git committer & author names for commits,
   * however it may be required for authentication depending on your Git provider / token requirements.
   * Required for AWS CodeCommit.
   */
  gitUsername?: string | undefined;
  /** the name of the git credential, used for identification and ease of lookup */
  name?: string | undefined;
  /** if the credential is the default for the given provider */
  isDefaultForProvider?: boolean | undefined;
  /**
   * The authenticating email associated with your Git provider user account.
   * Used for authentication with the remote repository and also sets the author & committer identity for commits.
   * Required for most Git providers except AWS CodeCommit.
   * Learn more at https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
   */
  gitEmail?: string | undefined;
}

export interface DeleteCredentialsRequest {
  /** The ID for the corresponding credential to access. */
  id?: bigint | undefined;
  /** The ID of the service principal whose credentials will be modified. Only service principal managers can perform this action. */
  principalId?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteCredentialsRequest_Response {}

export interface GetCredentialsRequest {
  /** The ID for the corresponding credential to access. */
  id?: bigint | undefined;
  /** The ID of the service principal whose credentials will be modified. Only service principal managers can perform this action. */
  principalId?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetCredentialsRequest_Response {
  /** ID of the credential object in the workspace. */
  credentialId?: bigint | undefined;
  /** The Git provider associated with the credential. */
  gitProvider?: string | undefined;
  /**
   * The username provided with your Git provider account and associated with the
   * credential. For most Git providers it is only used to set the Git committer & author names for commits,
   * however it may be required for authentication depending on your Git provider / token requirements.
   * Required for AWS CodeCommit.
   */
  gitUsername?: string | undefined;
  /** the name of the git credential, used for identification and ease of lookup */
  name?: string | undefined;
  /** if the credential is the default for the given provider */
  isDefaultForProvider?: boolean | undefined;
  /**
   * The authenticating email associated with your Git provider user account.
   * Used for authentication with the remote repository and also sets the author & committer identity for commits.
   * Required for most Git providers except AWS CodeCommit.
   * Learn more at https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
   */
  gitEmail?: string | undefined;
}

export interface ListCredentialsRequest {
  /** The ID of the service principal whose credentials will be listed. Only service principal managers can perform this action. */
  principalId?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListCredentialsRequest_Response {
  /** List of credentials. */
  credentials?: Credential[] | undefined;
}

export interface UpdateCredentialsRequest {
  /** The ID for the corresponding credential to access. */
  id?: bigint | undefined;
  /**
   * The personal access token used to authenticate to the corresponding Git provider.
   * For certain providers, support may exist for other types of scoped access tokens.
   * [Learn more](https://docs.databricks.com/repos/get-access-tokens-from-git-provider.html).
   */
  personalAccessToken?: string | undefined;
  /**
   * Git provider. This field is case-insensitive. The available Git providers are `gitHub`,
   * `bitbucketCloud`, `gitLab`, `azureDevOpsServices` (Azure DevOps Services, including
   * Microsoft Entra ID authentication), `gitHubEnterprise`, `bitbucketServer` (Bitbucket
   * Data Center), `gitLabEnterpriseEdition` (GitLab Self-Managed), and `awsCodeCommit`
   * (deprecated by AWS, not accepting new customers).
   */
  gitProvider?: string | undefined;
  /**
   * The username provided with your Git provider account and associated with the
   * credential. For most Git providers it is only used to set the Git committer & author names for commits,
   * however it may be required for authentication depending on your Git provider / token requirements.
   * Required for AWS CodeCommit.
   */
  gitUsername?: string | undefined;
  /** The ID of the service principal whose credentials will be modified. Only service principal managers can perform this action. */
  principalId?: bigint | undefined;
  /** the name of the git credential, used for identification and ease of lookup */
  name?: string | undefined;
  /** if the credential is the default for the given provider */
  isDefaultForProvider?: boolean | undefined;
  /**
   * The authenticating email associated with your Git provider user account.
   * Used for authentication with the remote repository and also sets the author & committer identity for commits.
   * Required for most Git providers except AWS CodeCommit.
   * Learn more at https://docs.databricks.com/aws/en/repos/get-access-tokens-from-git-provider
   */
  gitEmail?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface UpdateCredentialsRequest_Response {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateCredentialsRequest_ResponseSchema: z.ZodType<CreateCredentialsRequest_Response> =
  z
    .object({
      credential_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      git_provider: z.string().optional(),
      git_username: z.string().optional(),
      name: z.string().optional(),
      is_default_for_provider: z.boolean().optional(),
      git_email: z.string().optional(),
    })
    .transform(d => ({
      credentialId: d.credential_id,
      gitProvider: d.git_provider,
      gitUsername: d.git_username,
      name: d.name,
      isDefaultForProvider: d.is_default_for_provider,
      gitEmail: d.git_email,
    }));

export const unmarshalCredentialSchema: z.ZodType<Credential> = z
  .object({
    credential_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    git_provider: z.string().optional(),
    git_username: z.string().optional(),
    name: z.string().optional(),
    is_default_for_provider: z.boolean().optional(),
    git_email: z.string().optional(),
  })
  .transform(d => ({
    credentialId: d.credential_id,
    gitProvider: d.git_provider,
    gitUsername: d.git_username,
    name: d.name,
    isDefaultForProvider: d.is_default_for_provider,
    gitEmail: d.git_email,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteCredentialsRequest_ResponseSchema: z.ZodType<DeleteCredentialsRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetCredentialsRequest_ResponseSchema: z.ZodType<GetCredentialsRequest_Response> =
  z
    .object({
      credential_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      git_provider: z.string().optional(),
      git_username: z.string().optional(),
      name: z.string().optional(),
      is_default_for_provider: z.boolean().optional(),
      git_email: z.string().optional(),
    })
    .transform(d => ({
      credentialId: d.credential_id,
      gitProvider: d.git_provider,
      gitUsername: d.git_username,
      name: d.name,
      isDefaultForProvider: d.is_default_for_provider,
      gitEmail: d.git_email,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListCredentialsRequest_ResponseSchema: z.ZodType<ListCredentialsRequest_Response> =
  z
    .object({
      credentials: z.array(z.lazy(() => unmarshalCredentialSchema)).optional(),
    })
    .transform(d => ({
      credentials: d.credentials,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateCredentialsRequest_ResponseSchema: z.ZodType<UpdateCredentialsRequest_Response> =
  z.object({});

export const marshalCreateCredentialsRequestSchema: z.ZodType = z
  .object({
    gitProvider: z.string().optional(),
    gitUsername: z.string().optional(),
    personalAccessToken: z.string().optional(),
    principalId: z.bigint().optional(),
    name: z.string().optional(),
    isDefaultForProvider: z.boolean().optional(),
    gitEmail: z.string().optional(),
  })
  .transform(d => ({
    git_provider: d.gitProvider,
    git_username: d.gitUsername,
    personal_access_token: d.personalAccessToken,
    principal_id: d.principalId,
    name: d.name,
    is_default_for_provider: d.isDefaultForProvider,
    git_email: d.gitEmail,
  }));

export const marshalUpdateCredentialsRequestSchema: z.ZodType = z
  .object({
    id: z.bigint().optional(),
    personalAccessToken: z.string().optional(),
    gitProvider: z.string().optional(),
    gitUsername: z.string().optional(),
    principalId: z.bigint().optional(),
    name: z.string().optional(),
    isDefaultForProvider: z.boolean().optional(),
    gitEmail: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    personal_access_token: d.personalAccessToken,
    git_provider: d.gitProvider,
    git_username: d.gitUsername,
    principal_id: d.principalId,
    name: d.name,
    is_default_for_provider: d.isDefaultForProvider,
    git_email: d.gitEmail,
  }));
