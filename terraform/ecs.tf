# Outputs for use by GitHub Actions and other resources

output "cluster_name" {
  description = "Name of the ECS cluster"
  value       = aws_ecs_cluster.portfolio.name
}

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.portfolio.dns_name
}

output "alb_zone_id" {
  description = "Zone ID of the Application Load Balancer"
  value       = aws_lb.portfolio.zone_id
}

output "alb_https_url" {
  description = "HTTPS URL of the load balancer"
  value       = "https://${aws_lb.portfolio.dns_name}"
}

output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = aws_ecr_repository.portfolio.repository_url
}

output "ecr_repository_arn" {
  description = "ARN of the ECR repository"
  value       = aws_ecr_repository.portfolio.arn
}

# GitHub Actions role output - COMMENTED OUT (Using AWS Access Keys)
# output "github_actions_role_arn" {
#   description = "ARN of the GitHub Actions IAM role"
#   value       = aws_iam_role.github_actions.arn
# }

output "vpc_id" {
  description = "ID of the VPC where the cluster resides"
  value       = data.aws_vpc.existing.id
}

output "private_subnets" {
  description = "List of IDs of private subnets"
  value       = var.private_subnet_ids
}

output "public_subnets" {
  description = "List of IDs of public subnets"
  value       = var.public_subnet_ids
}

# Instructions for next steps
output "next_steps" {
  description = "Instructions for completing the setup"
  value = <<-EOT
    
    🎉 ECS Infrastructure Created Successfully!
    
    Next Steps:
    1. Create an IAM user with programmatic access and attach these policies:
       - AmazonEC2ContainerRegistryPowerUser
       - ECS deployment permissions (custom policy needed)
    
    2. Add these to your GitHub repository secrets:
       AWS_ACCESS_KEY_ID = (your IAM user access key)
       AWS_SECRET_ACCESS_KEY = (your IAM user secret key)
       
       Optional - For Terraform plan validation in CI/CD:
       VPC_ID = ${data.aws_vpc.existing.id}
       PRIVATE_SUBNET_IDS = ${join(",", var.private_subnet_ids)}
       PUBLIC_SUBNET_IDS = ${join(",", var.public_subnet_ids)}
    
    3. Your application will be available at:
       HTTP:  http://${aws_lb.portfolio.dns_name}
       HTTPS: https://${aws_lb.portfolio.dns_name}
    
    4. Your ECR repository URL:
       ${aws_ecr_repository.portfolio.repository_url}
    
    5. Enable GitHub Actions workflow:
       .github/workflows/deploy-aws-keys.yml
    
    6. Test deployment by pushing to main branch!
    
    💰 Cost Savings: ~$62/month compared to EKS!
    
  EOT
}
