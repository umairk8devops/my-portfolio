# Variables for the portfolio infrastructure

variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
  default     = "portfolio-cluster"
}

variable "ecr_repository_name" {
  description = "Name of the ECR repository"
  type        = string
  default     = "portfolio-app"
}

variable "github_repo" {
  description = "GitHub repository in format owner/repo"
  type        = string
  default     = "waqu235/my-portfolio"
}

variable "node_instance_type" {
  description = "EC2 instance type for ECS container instances"
  type        = string
  default     = "t3a.nano"
}

variable "node_desired_capacity" {
  description = "Desired number of ECS container instances"
  type        = number
  default     = 1
}

variable "node_max_capacity" {
  description = "Maximum number of ECS container instances"
  type        = number
  default     = 2
}

variable "node_min_capacity" {
  description = "Minimum number of ECS container instances"
  type        = number
  default     = 1
}

# Existing VPC Configuration
variable "vpc_id" {
  description = "ID of existing VPC to use"
  type        = string
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs for ECS tasks and ALB"
  type        = list(string)
}

variable "public_subnet_ids" {
  description = "List of public subnet IDs for Application Load Balancer"
  type        = list(string)
  default     = []
}