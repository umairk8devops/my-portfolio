import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Cloud Platforms & Cost Management",
      skills: ["AWS", "EC2", "EKS", "Fargate", "S3", "RDS", "DynamoDB", "Lambda", "CloudFront", "CloudWatch", "AWS Budgeting", "Cost Optimization"]
    },
    {
      title: "Infrastructure as Code",
      skills: ["Terraform", "OpenTofu", "AWS CDK", "CloudFormation", "Helm", "Monitoring as Code"]
    },
    {
      title: "Containerization & Orchestration",
      skills: ["Docker", "ECS", "EKS", "Kubernetes", "Helm", "ECR", "Container Security", "Multi-container Apps"]
    },
    {
      title: "CI/CD & DevOps",
      skills: ["GitHub Actions", "AWS CodePipeline", "Pipeline Automation", "DevOps CI/CD", "Deployment Strategies"]
    },
    {
      title: "AI & Automation",
      skills: ["AWS Bedrock", "AgentCore", "Autonomous RCA", "Self-Healing Agents", "Lambda", "Step Functions"]
    },
    {
      title: "Messaging & Caching",
      skills: ["SQS", "SNS", "SES", "ElastiCache"]
    },
    {
      title: "Monitoring & Observability",
      skills: ["Dynatrace", "Datadog", "Monitoring as Code", "CloudWatch", "Opsgenie", "Infrastructure Monitoring"]
    },
    {
      title: "Security & Identity Management",
      skills: ["Okta Management", "IAM", "Security Groups", "Infra Security", "Vulnerability Protection"]
    },
    {
      title: "Database Management",
      skills: ["AWS RDS", "DynamoDB", "Snowflake", "On-Premise SQL", "MySQL", "Database Migration", "Database Security"]
    },
    {
      title: "System Administration",
      skills: ["Linux Proficiency", "Syxsense", "SSM", "Cross-Account Management", "Automated Patching"]
    },
    {
      title: "Development & Scripting",
      skills: ["TypeScript", "Python", "Bash", "PowerShell", "YAML", "Terraform HCL", "Automation Scripts"]
    },
    {
      title: "Documentation & Design",
      skills: ["Lucid Diagrams", "Infrastructure Documentation", "System Architecture", "Technical Drawings"]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>Technical Expertise</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.title}</h3>
              <ul className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="skill-item">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
