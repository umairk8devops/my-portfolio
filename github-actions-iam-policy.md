# IAM Policy for GitHub Actions CI/CD User

This document provides the IAM policies needed for GitHub Actions to deploy to ECS.

## Required IAM Policies for GitHub Actions User

### 1. **Attach AWS Managed Policy**
Attach this managed policy to your IAM user:
- `AmazonEC2ContainerRegistryPowerUser`

### 2. **Create Custom ECS Deployment Policy**

Create a custom policy with this JSON and attach it to your IAM user:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ECSDeploymentPermissions",
            "Effect": "Allow",
            "Action": [
                "ecs:DescribeTaskDefinition",
                "ecs:RegisterTaskDefinition",
                "ecs:DescribeServices",
                "ecs:UpdateService",
                "ecs:DescribeClusters",
                "ecs:ListTasks",
                "ecs:DescribeTasks"
            ],
            "Resource": "*"
        },
        {
            "Sid": "LoadBalancerPermissions",
            "Effect": "Allow",
            "Action": [
                "elbv2:DescribeLoadBalancers",
                "elbv2:DescribeTargetGroups",
                "elbv2:DescribeTargetHealth"
            ],
            "Resource": "*"
        },
        {
            "Sid": "IAMPassRolePermissions",
            "Effect": "Allow",
            "Action": [
                "iam:PassRole"
            ],
            "Resource": [
                "arn:aws:iam::*:role/*ecs-task-execution-role*",
                "arn:aws:iam::*:role/portfolio-*-ecs-task-execution-role"
            ]
        },
        {
            "Sid": "STSPermissions",
            "Effect": "Allow",
            "Action": [
                "sts:GetCallerIdentity"
            ],
            "Resource": "*"
        }
    ]
}
```

## Setup Steps

### 1. **Create IAM User**
```bash
# Create IAM user for GitHub Actions
aws iam create-user --user-name github-actions-portfolio

# Create access key for the user
aws iam create-access-key --user-name github-actions-portfolio
```

### 2. **Attach Policies**
```bash
# Attach ECR managed policy
aws iam attach-user-policy \
  --user-name github-actions-portfolio \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser

# Create and attach custom ECS policy
# (First create the policy JSON file as shown above, then:)
aws iam create-policy \
  --policy-name GitHubActionsECSPolicy \
  --policy-document file://ecs-deployment-policy.json

aws iam attach-user-policy \
  --user-name github-actions-portfolio \
  --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/GitHubActionsECSPolicy
```

### 3. **Add Secrets to GitHub**
In your GitHub repository:
- Go to Settings → Secrets and variables → Actions
- Add these repository secrets:
  - `AWS_ACCESS_KEY_ID`: Your IAM user's access key ID
  - `AWS_SECRET_ACCESS_KEY`: Your IAM user's secret access key

### 4. **Test Permissions**
```bash
# Test ECR access
aws ecr get-login-password --region us-east-1

# Test ECS access
aws ecs describe-clusters --clusters portfolio-cluster-ecs

# Test STS access
aws sts get-caller-identity
```

## Security Considerations

- **Least Privilege**: The policy provides minimal permissions needed for deployment
- **Resource Scoping**: Consider adding resource ARN restrictions for production
- **Rotation**: Regularly rotate access keys (every 90 days recommended)
- **Monitoring**: Monitor IAM user activity through CloudTrail

## Alternative: Cross-Account Role (More Secure)

For enhanced security, consider using cross-account IAM roles instead of user access keys. This requires:
1. Creating an IAM role in your AWS account
2. Setting up GitHub OIDC provider
3. Configuring trust relationships

The current setup uses access keys for simplicity, but OIDC roles are recommended for production.