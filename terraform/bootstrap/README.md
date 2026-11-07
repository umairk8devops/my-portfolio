# Terraform State Bucket — Bootstrap

Creates the S3 bucket that holds the portfolio Terraform state, in the **new
AWS account**. Run this **before** the `backend.tf` change that points the
main config at this bucket — Terraform cannot create the bucket its own
backend uses, which is why this lives in a separate config with local state.

## Run order

### 1. Create the state bucket (new account, once)

Run with credentials for the **new** AWS account (e.g. `AWS_PROFILE` or env
vars for that account):

```bash
cd terraform/bootstrap
terraform init
terraform apply
```

The default bucket name is `umair-portfolio-tfstate`. If apply fails with
`BucketAlreadyExists`, re-run with another name:

```bash
terraform apply -var="state_bucket_name=umair-portfolio-tfstate-2"
```

To also grant the GitHub Actions deploy role (which lives in the **old**
account) access to the bucket, pass its ARN — it is the value of the repo's
GitHub secret `AWS_ROLE_ARN`:

```bash
terraform apply -var="deploy_role_arn=arn:aws:iam::<old-account-id>:role/<role-name>"
```

### 2. Allow the deploy role to use the new bucket (old account)

Cross-account access needs both sides: the bucket policy above **and** the
deploy role's own IAM policy in the old account. Attach this to the role
(replace the bucket name if you changed it):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::umair-portfolio-tfstate",
                "arn:aws:s3:::umair-portfolio-tfstate/*"
            ]
        }
    ]
}
```

### 3. Point the main config at the new bucket

`terraform/backend.tf` already points at `umair-portfolio-tfstate`. If you
picked a different bucket name in step 1, update the `bucket` line there to
match. (Backend blocks cannot read variables or tfvars, so the name is a
literal in `backend.tf`.)

### 4. Migrate the existing state

The current state file lives in the old `umair-backend` bucket. From
`terraform/`, with credentials that can read the old bucket and write the
new one:

```bash
cd ../terraform
terraform init -migrate-state
```

Answer `yes` when asked to copy the state. After that, `terraform plan`
should show no changes, and the GitHub workflow's `terraform init` will use
the new bucket.

## Notes

- The bucket has versioning and encryption on, public access blocked, and
  `prevent_destroy` set — deleting state by accident is the one thing this
  setup refuses to do.
- No DynamoDB lock table: the main config runs single-user without locking,
  same as before.
- Do not merge the `backend.tf` change before step 1 is done — until the
  bucket exists, `terraform init` in the main config (including the GitHub
  workflow) will fail.
