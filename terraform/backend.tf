# Terraform Backend Configuration
# Stores Terraform state remotely in S3 with DynamoDB locking
# State bucket is created by terraform/bootstrap/ (run that first — Terraform
# cannot create the bucket its own backend points at).

terraform {
  backend "s3" {
    bucket         = "umair-portfolio-tfstate"
    key            = "portfolio/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    # DynamoDB locking disabled for single-user portfolio project
    
    # Additional security settings
    # kms_key_id     = "alias/terraform-bucket-key"  # Uncomment if using KMS
    # versioning     = true                          # Managed at bucket level
  }
}