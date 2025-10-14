# Example configuration for ECS deployment
# Copy this to terraform.tfvars and update with your actual VPC details

# AWS Configuration
aws_region  = "us-east-1"
environment = "prod"

# ECS Cluster Configuration
cluster_name = "portfolio-cluster"

# ECR Configuration
ecr_repository_name = "portfolio-app"

# GitHub Configuration
github_repo = "umairk8devops/my-portfolio"

# ECS Container Instance Configuration
# Using t3a.nano for maximum cost efficiency - perfect for low-traffic portfolio
node_instance_type    = "t3a.nano"   # ~$3.07/month - 0.5GB RAM, 2 vCPU (burstable)

# Alternative options (commented out):
# node_instance_type    = "t3a.micro"  # ~$6.13/month - 1GB RAM, 2 vCPU
# node_instance_type    = "t4g.nano"   # ~$3.07/month - 0.5GB RAM, 2 vCPU (ARM-based)

node_desired_capacity = 1            # Start with 1 instance for cost efficiency
node_max_capacity     = 2            # Scale up to 2 if needed  
node_min_capacity     = 1            # Always keep at least 1 running

# Existing VPC Configuration
# Update these with your actual VPC and subnet IDs
vpc_id = "vpc-0c016749cb0288a97"

# Public subnets connected directly to Internet Gateway
public_subnet_ids = [
  "subnet-03600d25d9465c32a",
  "subnet-06cc9a1fb6ea901eb"
]

# Private subnets where ECS nodes will be deployed (you don't have any yet)
#private_subnet_ids = [
#  "subnet-private1",
#  "subnet-private2"
#]