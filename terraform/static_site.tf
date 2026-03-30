# S3 + CloudFront static site infrastructure
# This is for a serverless portfolio deployment (no ECS workload required for frontend assets)

locals {
  static_site_bucket_name = var.static_site_bucket_name != "" ? var.static_site_bucket_name : lower(format("%s-%s-portfolio-static", var.environment, substr(data.aws_caller_identity.current.account_id, 0, 6)))
}

resource "aws_s3_bucket" "static_site" {
  count  = var.enable_static_site ? 1 : 0

  bucket = local.static_site_bucket_name
  acl    = "private"

  force_destroy = true

  tags = {
    Name        = local.static_site_bucket_name
    Project     = "Portfolio"
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = "Umair"
  }

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  public_access_block {
    block_public_acls       = true
    block_public_policy     = true
    ignore_public_acls      = true
    restrict_public_buckets = true
  }
}

resource "aws_cloudfront_origin_access_control" "static_site" {
  count       = var.enable_static_site ? 1 : 0
  name        = "portfolio-static-site-oac"
  description = "Origin Access Control for portfolio CloudFront to access private S3"

  origin_type        = "s3"
  signing_protocol   = "sigv4"
  signing_behavior   = "always"
  signing_region     = var.aws_region
}

resource "aws_s3_bucket_policy" "static_site" {
  count = var.enable_static_site ? 1 : 0

  bucket = aws_s3_bucket.static_site[0].id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontOACReadOnly"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.static_site[0].arn}/*"
        # Using CloudFront OAC + private bucket; the SourceArn condition is omitted
        # to avoid circular dependency with distribution creation.
      }
    ]
  })
}

resource "aws_cloudfront_distribution" "static_site" {
  count = var.enable_static_site ? 1 : 0

  origin {
    domain_name = aws_s3_bucket.static_site[0].bucket_regional_domain_name
    origin_id   = "s3-static-portfolio"

    origin_access_control_id = aws_cloudfront_origin_access_control.static_site[0].id

    s3_origin_config {}
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Portfolio static site distribution"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-static-portfolio"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = length(var.static_site_custom_domain) == 0 ? true : false

    acm_certificate_arn            = length(var.static_site_custom_domain) > 0 ? aws_acm_certificate.static_site.arn : null
    ssl_support_method             = length(var.static_site_custom_domain) > 0 ? "sni-only" : null
  }

  aliases = length(var.static_site_custom_domain) > 0 ? [var.static_site_custom_domain] : []

  tags = {
    Name        = "portfolio-cloudfront"
    Project     = "Portfolio"
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = "Umair"
  }

  depends_on = [aws_s3_bucket_policy.static_site]
}

resource "aws_acm_certificate" "static_site" {
  count = var.enable_static_site && length(var.static_site_custom_domain) > 0 ? 1 : 0

  domain_name       = var.static_site_custom_domain
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "portfolio-static-site-cert"
  }
}

resource "aws_route53_record" "static_site_validation" {
  count = var.enable_static_site && length(var.static_site_custom_domain) > 0 ? 1 : 0

  name    = aws_acm_certificate.static_site[0].domain_validation_options[0].resource_record_name
  type    = aws_acm_certificate.static_site[0].domain_validation_options[0].resource_record_type
  zone_id = data.aws_route53_zone.static_site.zone_id
  records = [aws_acm_certificate.static_site[0].domain_validation_options[0].resource_record_value]
  ttl     = 60
}

data "aws_route53_zone" "static_site" {
  count = var.enable_static_site && length(var.static_site_custom_domain) > 0 ? 1 : 0
  name  = var.static_site_custom_domain
}
