# IAM Policy for GitHub Actions CI/CD User

This document provides the IAM policies needed for GitHub Actions to deploy to ECS with Terraform.

## Required IAM Policies for GitHub Actions User

### 1. **Attach AWS Managed Policy**
Attach this managed policy to your IAM user:
- `AmazonEC2ContainerRegistryPowerUser`

### 2. **Create Custom ECS Infrastructure Policy**

Create a custom policy with this JSON and attach it to your IAM user:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ECRFullAccess",
            "Effect": "Allow",
            "Action": [
                "ecr:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "ECSFullAccess",
            "Effect": "Allow",
            "Action": [
                "ecs:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "IAMPermissions",
            "Effect": "Allow",
            "Action": [
                "iam:CreateRole",
                "iam:DeleteRole",
                "iam:GetRole",
                "iam:ListRoles",
                "iam:PassRole",
                "iam:AttachRolePolicy",
                "iam:DetachRolePolicy",
                "iam:ListAttachedRolePolicies",
                "iam:CreateInstanceProfile",
                "iam:DeleteInstanceProfile",
                "iam:GetInstanceProfile",
                "iam:AddRoleToInstanceProfile",
                "iam:RemoveRoleFromInstanceProfile",
                "iam:TagRole",
                "iam:UntagRole",
                "iam:TagInstanceProfile",
                "iam:UntagInstanceProfile"
            ],
            "Resource": "*"
        },
        {
            "Sid": "LoadBalancerPermissions",
            "Effect": "Allow",
            "Action": [
                "elasticloadbalancing:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AutoScalingPermissions",
            "Effect": "Allow",
            "Action": [
                "autoscaling:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "EC2Permissions",
            "Effect": "Allow",
            "Action": [
                "ec2:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "CloudWatchLogsPermissions",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:DeleteLogGroup",
                "logs:DescribeLogGroups",
                "logs:PutRetentionPolicy",
                "logs:TagLogGroup",
                "logs:UntagLogGroup",
                "logs:TagResource",
                "logs:UntagResource"
            ],
            "Resource": "*"
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
aws iam create-user --user-name github-actions-user

# Create access key for the user
aws iam create-access-key --user-name github-actions-user
```

### 2. **Attach Policies**
```bash
# Attach ECR managed policy (OPTIONAL - included in custom policy)
aws iam attach-user-policy \
  --user-name github-actions-user \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser

# Create and attach custom ECS infrastructure policy
# (First create the policy JSON file as shown above, then:)
aws iam create-policy \
  --policy-name GitHubActionsECSInfrastructurePolicy \
  --policy-document file://ecs-infrastructure-policy.json

aws iam attach-user-policy \
  --user-name github-actions-user \
  --policy-arn arn:aws:iam::085047896115:policy/GitHubActionsECSInfrastructurePolicy
```

### 3. **Add Secrets to GitHub**
In your GitHub repository:
- Go to Settings → Secrets and variables → Actions
- Add these repository secrets:
  - `AWS_ACCESS_KEY_ID`: Your IAM user's access key ID
  - `AWS_SECRET_ACCESS_KEY`: Your IAM user's secret access key

## Quick Fix for Current User

If you already have the `github-actions-user` created, you can attach the new policy:

### Option 1: Update via AWS CLI
```bash
# Create the new policy JSON file
cat > ecs-infrastructure-policy.json << 'EOF'
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ECRFullAccess",
            "Effect": "Allow",
            "Action": [
                "ecr:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "ECSFullAccess",
            "Effect": "Allow",
            "Action": [
                "ecs:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "IAMPermissions",
            "Effect": "Allow",
            "Action": [
                "iam:CreateRole",
                "iam:DeleteRole",
                "iam:GetRole",
                "iam:ListRoles",
                "iam:PassRole",
                "iam:AttachRolePolicy",
                "iam:DetachRolePolicy",
                "iam:ListAttachedRolePolicies",
                "iam:CreateInstanceProfile",
                "iam:DeleteInstanceProfile",
                "iam:GetInstanceProfile",
                "iam:AddRoleToInstanceProfile",
                "iam:RemoveRoleFromInstanceProfile",
                "iam:TagRole",
                "iam:UntagRole",
                "iam:TagInstanceProfile",
                "iam:UntagInstanceProfile"
            ],
            "Resource": "*"
        },
        {
            "Sid": "LoadBalancerPermissions",
            "Effect": "Allow",
            "Action": [
                "elasticloadbalancing:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AutoScalingPermissions",
            "Effect": "Allow",
            "Action": [
                "autoscaling:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "EC2Permissions",
            "Effect": "Allow",
            "Action": [
                "ec2:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "CloudWatchLogsPermissions",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:DeleteLogGroup",
                "logs:DescribeLogGroups",
                "logs:PutRetentionPolicy",
                "logs:TagLogGroup",
                "logs:UntagLogGroup",
                "logs:TagResource",
                "logs:UntagResource"
            ],
            "Resource": "*"
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
EOF

# Create the policy (if it doesn't exist)
aws iam create-policy \
  --policy-name GitHubActionsECSInfrastructurePolicy \
  --policy-document file://ecs-infrastructure-policy.json

# Attach it to your existing user
aws iam attach-user-policy \
  --user-name github-actions-user \
  --policy-arn arn:aws:iam::085047896115:policy/GitHubActionsECSInfrastructurePolicy
```

### Option 2: Update via AWS Console
1. Go to AWS IAM Console
2. Navigate to Users → github-actions-user
3. Click "Add permissions" → "Attach policies directly"
4. Click "Create policy" → JSON tab
5. Paste the JSON policy from above
6. Name it: `GitHubActionsECSInfrastructurePolicy`
7. Attach it to the user

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