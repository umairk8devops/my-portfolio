# S3 bucket that holds the portfolio Terraform state file.
# Created once in the NEW AWS account; the main config's backend.tf points at it.

resource "aws_s3_bucket" "tfstate" {
  bucket = var.state_bucket_name

  # Never auto-delete a state bucket.
  force_destroy = false

  tags = {
    Name = var.state_bucket_name
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Cross-account access for the GitHub Actions deploy role, which lives in the
# old account. Both this bucket policy AND the role's own IAM policy must
# allow the S3 actions (see README.md for the role-policy JSON).
resource "aws_s3_bucket_policy" "tfstate" {
  count  = var.deploy_role_arn != "" ? 1 : 0
  bucket = aws_s3_bucket.tfstate.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowDeployRoleStateAccess"
        Effect = "Allow"
        Principal = {
          AWS = var.deploy_role_arn
        }
        Action = [
          "s3:ListBucket",
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = [
          aws_s3_bucket.tfstate.arn,
          "${aws_s3_bucket.tfstate.arn}/*"
        ]
      }
    ]
  })
}
