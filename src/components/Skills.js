import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Cloud Platforms & Cost Management",
      skills: ["AWS", "EC2", "S3", "RDS", "Lambda", "CloudWatch", "AWS Budgeting", "Cost Optimization"]
    },
    {
      title: "Infrastructure as Code",
      skills: ["Terraform", "OpenTofu", "AWS CDK", "CloudFormation", "Monitoring as Code"]
    },
    {
      title: "Containerization & Orchestration",
      skills: ["Docker", "ECS", "ECR", "Container Security", "Multi-container Apps"]
    },
    {
      title: "CI/CD & DevOps",
      skills: ["GitHub Actions", "Pipeline Automation", "DevOps CI/CD", "Deployment Strategies"]
    },
    {
      title: "Monitoring & Observability",
      skills: ["Dynatrace", "Monitoring as Code", "CloudWatch", "Infrastructure Monitoring"]
    },
    {
      title: "Security & Identity Management",
      skills: ["Okta Management", "IAM", "Security Groups", "Infra Security", "Vulnerability Protection"]
    },
    {
      title: "Database Management",
      skills: ["AWS RDS", "On-Premise SQL", "MySQL", "Database Migration", "Database Security"]
    },
    {
      title: "System Administration",
      skills: ["Linux Proficiency", "Sysxense", "SSM", "Cross-Account Management", "Automated Patching"]
    },
    {
      title: "Development & Scripting",
      skills: ["TypeScript", "Python", "Bash", "YAML", "Terraform HCL", "Automation Scripts"]
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