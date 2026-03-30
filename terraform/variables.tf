# Variables for the portfolio infrastructure

variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "enable_static_site" {
  description = "Enable static site resources (S3 + CloudFront)"
  type        = bool
  default     = true
}

variable "static_site_bucket_name" {
  description = "Optional fixed S3 bucket name for the static site. Leave empty to auto-generate."
  type        = string
  default     = ""
}

variable "static_site_custom_domain" {
  description = "Optional custom domain for CloudFront (e.g. www.example.com). Leave empty for default CloudFront domain."
  type        = string
  default     = ""
}
