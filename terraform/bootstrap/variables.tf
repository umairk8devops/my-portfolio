variable "aws_region" {
  description = "Region for the state bucket"
  type        = string
  default     = "us-east-1"
}

variable "state_bucket_name" {
  description = "Name of the S3 bucket for Terraform state. Must be globally unique — if apply fails with BucketAlreadyExists, pick another name."
  type        = string
  default     = "umair-portfolio-tfstate"
}

variable "deploy_role_arn" {
  description = "ARN of the GitHub Actions OIDC role (in the account that deploys the site) that needs cross-account access to this state bucket. Find it in the repo's GitHub secret AWS_ROLE_ARN. Leave empty to skip the bucket policy and add access later."
  type        = string
  default     = ""
}
