#!/bin/bash
# Deploy the React build to S3 and invalidate CloudFront

set -e

# Optional: set VARS here or rely on Terraform outputs
# export TF_VAR_enable_static_site=true

# Ensure built React app exists
if [ ! -d "../build" ]; then
  echo "Build folder not found. Run 'npm run build' first." >&2
  exit 1
fi

# Pick bucket name from terraform output
BUCKET=$(terraform output -raw static_site_bucket_name)
DISTRO_ID=$(terraform output -raw cloudfront_distribution_id)

if [ -z "$BUCKET" ] || [ "$BUCKET" == "disabled" ]; then
  echo "Static site bucket not found in terraform outputs. Make sure enable_static_site=true and terraform apply was successful." >&2
  exit 1
fi

if [ -z "$DISTRO_ID" ] || [ "$DISTRO_ID" == "disabled" ]; then
  echo "CloudFront distribution not found in terraform outputs. Make sure enable_static_site=true and terraform apply was successful." >&2
  exit 1
fi

echo "Syncing build/ to s3://$BUCKET"
aws s3 sync ../build/ s3://$BUCKET --delete --acl private

echo "Invalidating CloudFront distribution $DISTRO_ID"
aws cloudfront create-invalidation --distribution-id "$DISTRO_ID" --paths "/*"

echo "Deploy complete: https://$(terraform output -raw cloudfront_domain_name)"