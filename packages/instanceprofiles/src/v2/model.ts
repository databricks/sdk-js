// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';


export interface AddInstanceProfileRequest {
  /**
   * By default, <Databricks> validates that it has sufficient permissions to launch
   * instances with the instance profile. This validation uses AWS dry-run mode for
   * the RunInstances API. If validation fails with an error message that does not
   * indicate an IAM related permission issue,
   * (e.g. “Your requested instance type is not supported in your requested availability zone”),
   * you can pass this flag to skip the validation and forcibly add the instance profile.
   */
  skipValidation?: boolean | undefined;
  /** The AWS ARN of the instance profile to register with <Databricks>. This field is required. */
  instanceProfileArn?: string | undefined;
  /**
   * Boolean flag indicating whether the instance profile should only be used in credential
   * passthrough scenarios. If true, it means the instance profile contains an meta IAM role
   * which could assume a wide range of roles. Therefore it should always be used with
   * authorization.
   * This field is optional, the default value is `false`.
   */
  isMetaInstanceProfile?: boolean | undefined;
  /**
   * The AWS IAM role ARN of the role associated with the instance profile.
   * This field is required if your role name and instance profile name do
   * not match and you want to use the instance profile with
   * [Databricks SQL Serverless](/sql/admin/serverless.html).
   * 
   * Otherwise, this field is optional.
   */
  iamRoleArn?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface AddInstanceProfileRequest_Response {}

export interface EditInstanceProfileRequest {
  /** The AWS ARN of the instance profile to register with <Databricks>. This field is required. */
  instanceProfileArn?: string | undefined;
  /**
   * Boolean flag indicating whether the instance profile should only be used in credential
   * passthrough scenarios. If true, it means the instance profile contains an meta IAM role
   * which could assume a wide range of roles. Therefore it should always be used with
   * authorization.
   * This field is optional, the default value is `false`.
   */
  isMetaInstanceProfile?: boolean | undefined;
  /**
   * The AWS IAM role ARN of the role associated with the instance profile.
   * This field is required if your role name and instance profile name do
   * not match and you want to use the instance profile with
   * [Databricks SQL Serverless](/sql/admin/serverless.html).
   * 
   * Otherwise, this field is optional.
   */
  iamRoleArn?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface EditInstanceProfileRequest_Response {}

export interface InstanceProfile {
  /** The AWS ARN of the instance profile to register with <Databricks>. This field is required. */
  instanceProfileArn?: string | undefined;
  /**
   * Boolean flag indicating whether the instance profile should only be used in credential
   * passthrough scenarios. If true, it means the instance profile contains an meta IAM role
   * which could assume a wide range of roles. Therefore it should always be used with
   * authorization.
   * This field is optional, the default value is `false`.
   */
  isMetaInstanceProfile?: boolean | undefined;
  /**
   * The AWS IAM role ARN of the role associated with the instance profile.
   * This field is required if your role name and instance profile name do
   * not match and you want to use the instance profile with
   * [Databricks SQL Serverless](/sql/admin/serverless.html).
   * 
   * Otherwise, this field is optional.
   */
  iamRoleArn?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListInstanceProfilesRequest {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListInstanceProfilesRequest_Response {
  /** A list of instance profiles that the user can access. */
  instanceProfiles?: InstanceProfile[] | undefined;
}

export interface RemoveInstanceProfileRequest {
  /** The ARN of the instance profile to remove. This field is required. */
  instanceProfileArn?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface RemoveInstanceProfileRequest_Response {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAddInstanceProfileRequest_ResponseSchema: z.ZodType<AddInstanceProfileRequest_Response> = z
  .object({
  });

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEditInstanceProfileRequest_ResponseSchema: z.ZodType<EditInstanceProfileRequest_Response> = z
  .object({
  });

export const unmarshalInstanceProfileSchema: z.ZodType<InstanceProfile> = z
  .object({
    instance_profile_arn: z.string().optional(),
    is_meta_instance_profile: z.boolean().optional(),
    iam_role_arn: z.string().optional(),
  })
  .transform(d => ({
    instanceProfileArn: d.instance_profile_arn,
    isMetaInstanceProfile: d.is_meta_instance_profile,
    iamRoleArn: d.iam_role_arn,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListInstanceProfilesRequest_ResponseSchema: z.ZodType<ListInstanceProfilesRequest_Response> = z
  .object({
    instance_profiles: z.array(z.lazy(() => unmarshalInstanceProfileSchema)).optional(),
  })
  .transform(d => ({
    instanceProfiles: d.instance_profiles,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRemoveInstanceProfileRequest_ResponseSchema: z.ZodType<RemoveInstanceProfileRequest_Response> = z
  .object({
  });

export const marshalAddInstanceProfileRequestSchema: z.ZodType = z
  .object({
    skipValidation: z.boolean().optional(),
    instanceProfileArn: z.string().optional(),
    isMetaInstanceProfile: z.boolean().optional(),
    iamRoleArn: z.string().optional(),
  })
  .transform(d => ({
    skip_validation: d.skipValidation,
    instance_profile_arn: d.instanceProfileArn,
    is_meta_instance_profile: d.isMetaInstanceProfile,
    iam_role_arn: d.iamRoleArn,
  }));

export const marshalEditInstanceProfileRequestSchema: z.ZodType = z
  .object({
    instanceProfileArn: z.string().optional(),
    isMetaInstanceProfile: z.boolean().optional(),
    iamRoleArn: z.string().optional(),
  })
  .transform(d => ({
    instance_profile_arn: d.instanceProfileArn,
    is_meta_instance_profile: d.isMetaInstanceProfile,
    iam_role_arn: d.iamRoleArn,
  }));

export const marshalRemoveInstanceProfileRequestSchema: z.ZodType = z
  .object({
    instanceProfileArn: z.string().optional(),
  })
  .transform(d => ({
    instance_profile_arn: d.instanceProfileArn,
  }));
