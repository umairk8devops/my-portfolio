output "state_bucket_name" {
  description = "Name of the new Terraform state bucket — this is what backend.tf points at."
  value       = aws_s3_bucket.tfstate.id
}

output "state_bucket_arn" {
  description = "ARN of the new Terraform state bucket."
  value       = aws_s3_bucket.tfstate.arn
}
