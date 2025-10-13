# Terraform Backend Configuration
# Stores Terraform state remotely in S3 with DynamoDB locking

terraform {
  backend "s3" {
    bucket         = "umair-backend"
    key            = "portfolio/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"  # Optional: for state locking
    
    # Additional security settings
    # kms_key_id     = "alias/terraform-bucket-key"  # Uncomment if using KMS
    # versioning     = true                          # Managed at bucket level
  }
}