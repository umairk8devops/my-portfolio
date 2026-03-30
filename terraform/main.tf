# Portfolio Infrastructure
# This Terraform configuration creates all AWS resources needed for the portfolio deployment

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "Portfolio"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "Umair"
    }
  }
}

# Data sources
data "aws_caller_identity" "current" {}