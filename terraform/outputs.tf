# Terraform outputs for static site deployment

output "static_site_bucket_name" {
  description = "S3 bucket name for the static site"
  value       = var.enable_static_site ? aws_s3_bucket.static_site[0].bucket : "disabled"
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID for the static site"
  value       = var.enable_static_site ? aws_cloudfront_distribution.static_site[0].id : "disabled"
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name for the static site"
  value       = var.enable_static_site ? aws_cloudfront_distribution.static_site[0].domain_name : "disabled"
}

output "static_site_url" {
  description = "Static site URL"
  value       = var.enable_static_site ? "https://${aws_cloudfront_distribution.static_site[0].domain_name}" : "disabled"
}
