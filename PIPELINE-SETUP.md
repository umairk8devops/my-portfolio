# GitHub Actions CI/CD Pipeline Setup Guide

This guide will help you set up a complete CI/CD pipeline for your React portfolio app to deploy on **Amazon ECS** (Elastic Container Service).

## 🚀 Pipeline Overview

The pipeline consists of 3 main stages:
1. **Test** - Run React tests and build
2. **Build & Push** - Create Docker image and push to ECR  
3. **Deploy** - Update ECS service with new image

## 💰 **Why ECS Over EKS?**
- **Cost Savings**: ~$62/month cheaper (ECS: ~$22/month vs EKS: ~$84/month)
- **Simplicity**: No control plane fees, easier management
- **Perfect for Portfolio**: Demonstrates containerization without Kubernetes overhead

## 📋 Prerequisites

### 1. AWS Infrastructure (Created via Terraform)
- **ECS Cluster** named `portfolio-cluster-ecs`
- **ECR Repository** named `portfolio-app`
- **Application Load Balancer** for external access
- **Auto Scaling Group** with t3a.nano instances
- **IAM Permissions** for GitHub Actions

### 2. GitHub Repository Secrets

**OIDC Authentication (Recommended & Implemented):**
Add this secret to your GitHub repository:
```
AWS_ROLE_ARN=arn:aws:iam::575936835891:role/portfolio-cluster-github-actions-role
```

**Note**: The GitHub Actions role is automatically created by Terraform with proper ECS and ECR permissions.

## 🔧 Setup Steps

### 1. Deploy Infrastructure with Terraform
```bash
# Navigate to terraform directory
cd terraform

# Copy and configure variables
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your VPC details

# Initialize and apply Terraform
terraform init
terraform plan
terraform apply
```

### 2. Configure GitHub Repository Secrets
After Terraform completes, add the GitHub Actions role ARN to your repository:
```bash
# Get the role ARN from Terraform output
terraform output github_actions_role_arn

# Add this to GitHub: Settings → Secrets → Actions
# Name: AWS_ROLE_ARN
# Value: (the ARN from terraform output)
```

### 3. Enable the CI/CD Pipeline
Uncomment the triggers in `.github/workflows/deploy-oidc.yml`:
```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  # Remove workflow_dispatch line for automatic triggers
```

## 🏃‍♂️ Running the Pipeline

### Automatic Triggers:
- **Push to main** - Deploys to ECS
- **Pull Request** - Runs tests only

### Manual Deployment:
```bash
# Push changes to trigger deployment
git add .
git commit -m "Deploy new features"
git push origin main
```

### Verify Deployment:
```bash
# Check ECS service status
aws ecs describe-services --cluster portfolio-cluster-ecs --services portfolio-service

# Get application URL
aws elbv2 describe-load-balancers --names portfolio-cluster-alb --query 'LoadBalancers[0].DNSName' --output text
```

## 📊 Pipeline Features

### ✅ What the Pipeline Does:
- **Runs React tests** with coverage
- **Builds optimized React app**
- **Creates Docker image** with multi-stage build (Node.js → Nginx)
- **Pushes to ECR** with SHA and latest tags
- **Updates ECS service** with new task definition
- **Performs rolling deployment** with zero downtime
- **Verifies deployment** status and health

### 🔒 Security Features:
- **OIDC authentication** (no long-lived keys)
- **Least privilege** IAM permissions via Terraform
- **Secure image tagging** with Git SHA
- **VPC with private subnets** for container instances
- **Application Load Balancer** with security groups

### 🚀 DevOps Best Practices:
- **Infrastructure as Code** with Terraform
- **Rolling deployments** with zero downtime
- **Automated rollback** on failure
- **Health checks** and container monitoring
- **Cost optimization** with t3a.nano instances
- **Parallel job execution** for speed

### 💰 Cost Optimization Features:
- **ECS over EKS**: Saves ~$62/month (no control plane fees)
- **t3a.nano instances**: ~$3.07/month per instance
- **Application Load Balancer**: Only ~$16/month
- **Auto Scaling**: Scale to zero during off-hours
- **ECR lifecycle policies**: Automatic image cleanup

## 🎯 Customization Options

### Environment Variables (in workflow):
```yaml
env:
  AWS_REGION: us-east-1                    # Change if different region
  ECR_REPOSITORY: portfolio-app            # Your ECR repo name  
  ECS_CLUSTER_NAME: portfolio-cluster-ecs  # Your ECS cluster name
  ECS_SERVICE_NAME: portfolio-service      # ECS service name
```

### Terraform Variables (terraform.tfvars):
```hcl
# AWS Configuration
aws_region  = "us-east-1"
environment = "dev"

# ECS Configuration
cluster_name = "portfolio-cluster"
ecr_repository_name = "portfolio-app"

# Instance Configuration (Cost Optimization)
node_instance_type = "t3a.nano"     # ~$3.07/month
node_desired_capacity = 1           # Start with 1 instance
node_max_capacity = 2               # Scale up if needed

# Existing VPC Configuration
vpc_id = "vpc-your-vpc-id"
private_subnet_ids = ["subnet-1", "subnet-2", "subnet-3"]
public_subnet_ids = ["subnet-4", "subnet-5", "subnet-6"]  # For ALB
```

### Adding More Environments:
- Create separate Terraform workspaces for staging/production
- Use different ECR repos and ECS clusters per environment
- Add approval gates for production deployments
- Implement blue-green deployment strategies

## 🏗️ **Architecture Overview**

```
GitHub → GitHub Actions → AWS ECR → ECS Cluster → Application Load Balancer → Internet
   ↓
   ├── React Tests & Build
   ├── Docker Multi-stage Build  
   ├── Container Image Push
   ├── ECS Task Definition Update
   └── Rolling Deployment
```

### **Infrastructure Components:**
- **ECS Cluster**: Container orchestration on EC2 instances
- **Auto Scaling Group**: t3a.nano instances with auto-scaling
- **Application Load Balancer**: External access with health checks  
- **ECR Repository**: Container image storage with lifecycle policies
- **IAM Roles**: OIDC-based authentication for CI/CD
- **CloudWatch Logs**: Container and application logging
- **VPC**: Network isolation with private/public subnets

This pipeline demonstrates production-ready, cost-effective DevOps practices perfect for showcasing in interviews!