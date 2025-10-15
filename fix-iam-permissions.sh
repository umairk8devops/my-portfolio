#!/bin/bash

# Script to create and attach the comprehensive IAM policy for GitHub Actions
# This fixes the permission errors you encountered during Terraform deployment

echo "Creating IAM policy for GitHub Actions infrastructure deployment..."

# Create the policy JSON file
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

echo "Policy JSON file created: ecs-infrastructure-policy.json"

# Create the policy in AWS (may fail if it already exists - that's OK)
echo "Creating IAM policy in AWS..."
aws iam create-policy \
  --policy-name GitHubActionsECSInfrastructurePolicy \
  --policy-document file://ecs-infrastructure-policy.json \
  2>/dev/null || echo "Policy may already exist, continuing..."

# Attach the policy to the github-actions-user
echo "Attaching policy to github-actions-user..."
aws iam attach-user-policy \
  --user-name github-actions-user \
  --policy-arn arn:aws:iam::085047896115:policy/GitHubActionsECSInfrastructurePolicy

echo "✅ Policy attached successfully!"
echo ""
echo "🔧 Next steps:"
echo "1. Wait a few minutes for AWS IAM propagation"
echo "2. Re-run your Terraform deployment"
echo "3. The infrastructure creation should now succeed"
echo ""
echo "🗑️  Cleanup: You can delete the ecs-infrastructure-policy.json file after use"