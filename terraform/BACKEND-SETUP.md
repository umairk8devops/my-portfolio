# Terraform S3 Backend Setup

This Terraform configuration uses S3 for remote state storage with the following setup:

## Backend Configuration (backend.tf)
- **S3 Bucket**: `umair-backend`
- **State Key**: `portfolio/terraform.tfstate`
- **Region**: `us-east-1`
- **Encryption**: Enabled
- **DynamoDB Lock Table**: `terraform-locks` (optional)

The backend is configured in `backend.tf` file following standard Terraform practices.

## Required IAM Permissions

Your IAM user needs the following permissions for the S3 backend:

### S3 Permissions
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket",
                "s3:GetBucketVersioning"
            ],
            "Resource": [
                "arn:aws:s3:::umair-backend",
                "arn:aws:s3:::umair-backend/*"
            ]
        }
    ]
}
```

### DynamoDB Permissions (if using locking)
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:DeleteItem"
            ],
            "Resource": "arn:aws:dynamodb:us-east-1:*:table/terraform-locks"
        }
    ]
}
```

## First Time Setup

### 1. Create DynamoDB Table (Optional - for state locking)
```bash
aws dynamodb create-table \
    --table-name terraform-locks \
    --attribute-definitions AttributeName=LockID,AttributeType=S \
    --key-schema AttributeName=LockID,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --region us-east-1
```

### 2. Initialize Terraform with Backend
```bash
# Navigate to terraform directory
cd terraform

# Initialize with backend (backend.tf is automatically loaded)
terraform init
```

### 3. If migrating from local state
```bash
# Terraform will prompt to migrate existing state
terraform init
# Answer 'yes' when prompted to copy existing state to S3
```

## State Management Commands

```bash
# View current state
terraform state list

# Show state file location
terraform state pull

# Force unlock (if lock gets stuck)
terraform force-unlock LOCK_ID

# Refresh state from real infrastructure
terraform refresh
```

## Troubleshooting

### Access Denied Error
- Verify IAM user has S3 permissions for `umair-backend` bucket
- Check AWS credentials are properly configured
- Ensure bucket exists and is in the correct region

### Lock Table Error
- Create DynamoDB table `terraform-locks` or remove `dynamodb_table` from backend config
- Verify DynamoDB permissions if using locking

### State File Not Found
- This is normal for first-time setup
- Terraform will create the state file during first `terraform apply`