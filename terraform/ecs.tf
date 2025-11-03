# ECS Infrastructure (Alternative to EKS)
# This configuration creates a cost-effective ECS deployment (~$22/month vs ~$84/month for EKS)

# ECS Cluster
resource "aws_ecs_cluster" "portfolio" {
  name = "${var.cluster_name}-ecs"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Environment = var.environment
  }
}

# ECS Capacity Provider (EC2)
resource "aws_ecs_capacity_provider" "portfolio" {
  name = "${var.cluster_name}-capacity-provider"

  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.ecs.arn
    managed_termination_protection = "DISABLED"

    managed_scaling {
      status          = "ENABLED"
      target_capacity = 100
    }
  }

  tags = {
    Environment = var.environment
  }
}

resource "aws_ecs_cluster_capacity_providers" "portfolio" {
  cluster_name = aws_ecs_cluster.portfolio.name

  capacity_providers = [aws_ecs_capacity_provider.portfolio.name]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 100
    capacity_provider = aws_ecs_capacity_provider.portfolio.name
  }
}

# Launch Template for ECS instances
resource "aws_launch_template" "ecs" {
  name_prefix   = "${var.cluster_name}-ecs-"
  image_id      = data.aws_ami.ecs_optimized.id
  instance_type = var.node_instance_type

  vpc_security_group_ids = [aws_security_group.ecs_nodes.id]

  iam_instance_profile {
    name = aws_iam_instance_profile.ecs_instance.name
  }

  user_data = base64encode(<<-EOF
    #!/bin/bash
    echo ECS_CLUSTER=${aws_ecs_cluster.portfolio.name} >> /etc/ecs/ecs.config
    echo ECS_ENABLE_CONTAINER_METADATA=true >> /etc/ecs/ecs.config
  EOF
  )

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name        = "${var.cluster_name}-ecs-instance"
      Environment = var.environment
    }
  }

  lifecycle {
    create_before_destroy = true
  }
}

# Auto Scaling Group
resource "aws_autoscaling_group" "ecs" {
  name                = "${var.cluster_name}-ecs-asg"
  vpc_zone_identifier = length(var.private_subnet_ids) > 0 ? var.private_subnet_ids : var.public_subnet_ids
  # target_group_arns   = [aws_lb_target_group.portfolio.arn]  # REMOVED - ECS manages this
  health_check_type   = "EC2"  # Changed from ELB to EC2
  health_check_grace_period = 300

  min_size         = 1
  max_size         = 1
  desired_capacity = 1

  launch_template {
    id      = aws_launch_template.ecs.id
    version = "$Latest"
  }

  tag {
    key                 = "AmazonECSManaged"
    value               = true
    propagate_at_launch = false
  }

  tag {
    key                 = "Environment"
    value               = var.environment
    propagate_at_launch = true
  }
}

# ECS Task Definition
resource "aws_ecs_task_definition" "portfolio" {
  family                   = "portfolio-task"
  network_mode             = "bridge"
  requires_compatibilities = ["EC2"]
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn

  container_definitions = jsonencode([
    {
      name  = "portfolio"
      image = "${aws_ecr_repository.portfolio.repository_url}:latest"
      
      portMappings = [
        {
          containerPort = 80
          hostPort      = 0
          protocol      = "tcp"
        }
      ]

      memory = 256
      
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.ecs.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "ecs"
        }
      }

      essential = true
    }
  ])

  tags = {
    Environment = var.environment
  }
}

# ECS Service
resource "aws_ecs_service" "portfolio" {
  name            = "portfolio-service"
  cluster         = aws_ecs_cluster.portfolio.id
  task_definition = aws_ecs_task_definition.portfolio.arn
  desired_count   = 1

  load_balancer {
    target_group_arn = aws_lb_target_group.portfolio.arn
    container_name   = "portfolio"
    container_port   = 80
  }

  capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.portfolio.name
    weight            = 100
  }

  depends_on = [aws_lb_listener.portfolio, aws_lb_listener.portfolio_https]

  tags = {
    Environment = var.environment
  }
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "ecs" {
  name              = "/ecs/${var.cluster_name}"
  retention_in_days = 7

  tags = {
    Environment = var.environment
  }
}

# Data source for ECS optimized AMI
data "aws_ami" "ecs_optimized" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-ecs-hvm-*-x86_64-ebs"]
  }
}

# Security Group for ECS instances
resource "aws_security_group" "ecs_nodes" {
  name_prefix = "${var.cluster_name}-ecs-nodes"
  vpc_id      = data.aws_vpc.existing.id

  ingress {
    description = "Dynamic ports from ALB"
    from_port   = 32768
    to_port     = 65535
    protocol    = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.cluster_name}-ecs-nodes"
    Environment = var.environment
  }
}

# Application Load Balancer
resource "aws_lb" "portfolio" {
  name               = "${var.cluster_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = length(var.public_subnet_ids) > 0 ? var.public_subnet_ids : var.private_subnet_ids

  enable_deletion_protection = false

  tags = {
    Environment = var.environment
  }
}

resource "aws_lb_target_group" "portfolio" {
  name        = "${var.cluster_name}-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.existing.id
  target_type = "instance"

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"  # Uses the actual port ECS registers
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  tags = {
    Environment = var.environment
  }
}

resource "aws_lb_listener" "portfolio" {
  load_balancer_arn = aws_lb.portfolio.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# HTTPS Listener with SSL Certificate
resource "aws_lb_listener" "portfolio_https" {
  load_balancer_arn = aws_lb.portfolio.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = "arn:aws:acm:us-east-1:085047896115:certificate/b2a36396-678e-4178-a163-bbd6f8c915d9"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.portfolio.arn
  }
}

# Security Group for ALB
resource "aws_security_group" "alb" {
  name_prefix = "${var.cluster_name}-alb"
  vpc_id      = data.aws_vpc.existing.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.cluster_name}-alb"
    Environment = var.environment
  }
}

# IAM Role for ECS Instance
resource "aws_iam_role" "ecs_instance" {
  name = "${var.cluster_name}-ecs-instance-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Environment = var.environment
  }
}

resource "aws_iam_role_policy_attachment" "ecs_instance" {
  role       = aws_iam_role.ecs_instance.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "ecs_instance" {
  name = "${var.cluster_name}-ecs-instance-profile"
  role = aws_iam_role.ecs_instance.name
}

# IAM Role for ECS Task Execution
resource "aws_iam_role" "ecs_task_execution" {
  name = "${var.cluster_name}-ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Environment = var.environment
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Outputs are defined in outputs.tf to avoid duplication

# GitHub OIDC Configuration for CI/CD - COMMENTED OUT (Using AWS Access Keys)
# Uncomment if switching back to OIDC authentication
#
# data "aws_iam_openid_connect_provider" "github" {
#   url = "https://token.actions.githubusercontent.com"
# }
#
# # IAM Role for GitHub Actions
# resource "aws_iam_role" "github_actions" {
#   name = "${var.cluster_name}-github-actions-role"
#
#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Effect = "Allow"
#         Principal = {
#           Federated = data.aws_iam_openid_connect_provider.github.arn
#         }
#         Action = "sts:AssumeRoleWithWebIdentity"
#         Condition = {
#           StringEquals = {
#             "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
#           }
#           StringLike = {
#             "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo}:*"
#           }
#         }
#       }
#     ]
#   })
#
#   tags = {
#     Environment = var.environment
#   }
# }
#
# # Policy for GitHub Actions to access ECS and ECR
# resource "aws_iam_role_policy" "github_actions" {
#   name = "${var.cluster_name}-github-actions-policy"
#   role = aws_iam_role.github_actions.id
#
#   policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Effect = "Allow"
#         Action = [
#           "ecr:GetAuthorizationToken",
#           "ecr:BatchCheckLayerAvailability",
#           "ecr:GetDownloadUrlForLayer",
#           "ecr:BatchGetImage",
#           "ecr:InitiateLayerUpload",
#           "ecr:UploadLayerPart",
#           "ecr:CompleteLayerUpload",
#           "ecr:PutImage"
#         ]
#         Resource = "*"
#       },
#       {
#         Effect = "Allow"
#         Action = [
#           "ecs:DescribeTaskDefinition",
#           "ecs:RegisterTaskDefinition",
#           "ecs:DescribeServices",
#           "ecs:UpdateService",
#           "ecs:DescribeClusters"
#         ]
#         Resource = "*"
#       },
#       {
#         Effect = "Allow"
#         Action = [
#           "elbv2:DescribeLoadBalancers"
#         ]
#         Resource = "*"
#       },
#       {
#         Effect = "Allow"
#         Action = [
#           "iam:PassRole"
#         ]
#         Resource = aws_iam_role.ecs_task_execution.arn
#       }
#     ]
#   })
# }
