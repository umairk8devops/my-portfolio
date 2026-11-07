# Bootstrap for Terraform remote state.
#
# Run ONCE with credentials for the NEW AWS account, BEFORE the backend.tf
# change in the main config is applied. This creates the S3 bucket that the
# main portfolio config uses as its Terraform backend.
#
# Terraform cannot create the bucket its own backend points at
# (chicken-and-egg: the backend bucket must exist before `terraform init`),
# so the state bucket lives in this separate config with LOCAL state.
# See README.md in this directory for the run order.

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  # Local state on purpose: this config bootstraps the remote-state bucket.
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project   = "Portfolio"
      ManagedBy = "Terraform"
      Owner     = "Umair"
    }
  }
}
