# Terraform ECS Infrastructure Setup Guide

## 🏗️ **Infrastructure Overview**

This Terraform configuration creates all the AWS resources needed for your portfolio deployment using **Amazon ECS** (Elastic Container Service):

### **Resources Created:**
- **ECS Cluster** with EC2 container instances (uses existing VPC)
- **Application Load Balancer** for high availability
- **Auto Scaling Group** with t3a.micro instances
- **ECR Repository** for Docker images
- **IAM Roles** for GitHub Actions OIDC
- **Security Groups** and networking
- **CloudWatch Logs** for monitoring

## 💰 **Cost Benefits**

**ECS vs EKS Cost Comparison:**
- **EKS Total**: ~$84.26/month (includes $72 control plane fee)
- **ECS Total**: ~$22.13/month (no control plane fee!)
- **💸 Monthly Savings**: $62.13 (73% cheaper!)**

## 🚀 **Deployment Steps**

### **1. Prerequisites**
```bash
# Install required tools
brew install terraform
brew install awscli
brew install kubectl

# Configure AWS credentials
aws configure

# Ensure GitHub OIDC provider exists in AWS
# If not already configured, create it manually:
# AWS Console → IAM → Identity providers → Add provider
# Provider type: OpenID Connect
# Provider URL: https://token.actions.githubusercontent.com
# Audience: sts.amazonaws.com
```

### **2. Configure Existing VPC**
```bash
# Copy example configuration
cp terraform.tfvars.example terraform.tfvars

# Update terraform.tfvars with your existing VPC details:
# - vpc_id: Your existing VPC ID
# - private_subnet_ids: Private subnets for EKS nodes
# - public_subnet_ids: Public subnets for load balancers (optional)

# Find your VPC information:
aws ec2 describe-vpcs --query 'Vpcs[*].[VpcId,CidrBlock,Tags[?Key==`Name`].Value|[0]]' --output table

# Find your subnets:
aws ec2 describe-subnets --filters "Name=vpc-id,Values=vpc-YOUR_VPC_ID" --query 'Subnets[*].[SubnetId,CidrBlock,AvailabilityZone,Tags[?Key==`Name`].Value|[0]]' --output table
```

### **3. Initialize and Plan**
```bash
cd terraform

# Initialize Terraform
terraform init

# Review what will be created
terraform plan

# Apply the configuration
terraform apply
```

### **4. Verify Deployment**
```bash
# Check ECS cluster status
aws ecs describe-clusters --clusters portfolio-cluster

# Check running services
aws ecs describe-services --cluster portfolio-cluster --services portfolio-service

# Get your application URL
aws elbv2 describe-load-balancers --names portfolio-cluster-alb --query 'LoadBalancers[0].DNSName' --output text
```

### **5. Deploy Application**
Your application will be automatically deployed via GitHub Actions, or you can deploy manually:
```bash
# Build and push image manually
docker build -t portfolio-app .
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
docker tag portfolio-app:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/portfolio-app:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/portfolio-app:latest

# Update ECS service
aws ecs update-service --cluster portfolio-cluster --service portfolio-service --force-new-deployment
```

### **6. Configure GitHub Actions**
After Terraform completes, you'll get an output with the GitHub Actions role ARN:

```bash
# Add this to your GitHub repository secrets:
# Settings → Secrets and variables → Actions → New repository secret
# Name: AWS_ROLE_ARN
# Value: (the ARN from terraform output)
```

### **7. Enable the Pipeline**
Uncomment the trigger in `.github/workflows/deploy-oidc.yml`:
```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  # workflow_dispatch:  # Remove this line
```

## 💰 **Cost Estimation**

### **ECS Monthly Costs (approximate):**
- **EC2 Instance**: ~$3.07/month (1 x t3a.nano)
- **Application Load Balancer**: ~$16/month
- **ECR**: ~$1/month (minimal usage)
- **Total**: ~$20.07/month

### **Comparison with EKS:**
- **EKS Total**: ~$84.26/month
- **ECS Total**: ~$20.07/month
- **💰 Monthly Savings**: $64.19 (76% cheaper!)

### **Cost Optimization Tips:**
- **Single Instance**: Start with 1 t3a.micro instance (~$6/month)
- **Stop when not needed**: ECS instances can be stopped to save costs
- **Spot Instances**: Use spot instances for even lower costs
- **CloudWatch Logs**: Set log retention to reduce storage costs

## 🛠️ **Customization Options**

### **Variables you can modify:**
```bash
# Create terraform.tfvars file
cat > terraform.tfvars << EOF
aws_region = "us-west-2"
environment = "prod"
node_instance_type = "t3.small"
node_desired_capacity = 1
EOF
```

### **Development Setup (Lower Cost):**
```bash
# Use smaller instances for development
node_instance_type = "t3.small"
node_desired_capacity = 1
node_max_capacity = 2
```

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **IAM Permissions**
   - Ensure your AWS user has sufficient permissions
   - Need EKS, EC2, VPC, IAM policy creation rights

2. **Resource Limits**
   - Check AWS service quotas in your region
   - EKS clusters have regional limits

3. **Network Configuration**
   - Ensure you have available IP ranges
   - Check for VPC conflicts with existing resources

### **Verification Commands:**
```bash
# Check cluster status
kubectl get nodes

# Verify ECR repository
aws ecr describe-repositories --repository-names portfolio-app

# Test GitHub Actions role
aws sts assume-role-with-web-identity \
  --role-arn $(terraform output -raw github_actions_role_arn) \
  --role-session-name test \
  --web-identity-token $GITHUB_TOKEN
```

## 🔄 **Pipeline Integration**

After infrastructure is created:

1. **GitHub Actions** will automatically use the ECR repository
2. **OIDC authentication** eliminates need for AWS keys
3. **EKS cluster** is ready for deployments
4. **Load balancer** provides external access

## 🗑️ **Cleanup**

When you're done with the demo:
```bash
# Delete Kubernetes resources first
kubectl delete -f k8s/

# Destroy Terraform resources
terraform destroy
```

**⚠️ Warning**: This will delete all resources and cannot be undone!

## 🎯 **Interview Talking Points**

- **"I automated the entire infrastructure provisioning with Terraform"**
- **"Implemented OIDC for secure, keyless CI/CD authentication"**
- **"Used AWS VPC best practices with multi-AZ deployment"**
- **"Configured auto-scaling and cost optimization policies"**
- **"Following infrastructure as code principles for repeatability"**