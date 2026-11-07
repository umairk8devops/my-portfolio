import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "Enterprise Cloud Migration",
      description: "Led complete migration of on-premises infrastructure to AWS, including all servers, applications, and databases to RDS. Implemented cost optimization strategies resulting in 40% reduction in operational costs.",
      technologies: ["AWS", "RDS", "EC2", "Terraform", "Database Migration", "Cost Optimization"],
      github: "#",
      demo: "#"
    },
    {
      title: "WordPress Multisite Platform (300+ Sites)",
      description: "Containerized 300+ legacy WordPress sites onto AWS Fargate with automated GitHub Actions CI/CD pipelines for updates and deployments across the entire organization. When a dev scanning tool pushed the shared EFS volume past its throughput ceiling and took the fleet down, I traced it, raised throughput, and prevented repeats with rate limiting and a separate cloned EFS volume for dev scanning.",
      technologies: ["Docker", "Fargate", "WordPress Multisite", "EFS", "GitHub Actions", "LAMP Stack"],
      github: "#",
      demo: "#"
    },
    {
      title: "AI Incident Investigation (AWS Bedrock)",
      description: "Built an autonomous alerting and triage system pairing Dynatrace telemetry with AWS Bedrock. The AI digs through logs on its own, determines root cause, attaches log evidence, and generates actionable remediation steps before notifying engineering teams.",
      technologies: ["AWS Bedrock", "Dynatrace", "Lambda", "Opsgenie", "Log Analysis"],
      github: "#",
      demo: "#"
    },
    {
      title: "OpsHub — Agentic Self-Healing Platform",
      description: "Architected an AI agent on AWS AgentCore that diagnoses and resolves infrastructure incidents autonomously, with approval-gated deploys. Used by IAM, network, security, Snowflake, and DevOps teams.",
      technologies: ["AWS Bedrock", "AgentCore", "Python", "GitHub Actions", "Approval Gates"],
      github: "#",
      demo: "#"
    },
    {
      title: "SSL Certificate Automation",
      description: "Automated all manual SSL certificate handling into rotation across ~200 static sites, 10 server applications, and ~20 Okta TLS certificates — eliminating expiry-driven outages, with success/failure alerting on every renewal.",
      technologies: ["AWS ACM", "Lambda", "Okta", "Terraform", "CloudWatch"],
      github: "#",
      demo: "#"
    },
    {
      title: "Automated Patch Management System",
      description: "Implemented organization-wide automated patching workflow using Syxsense and AWS Systems Manager for cross-account server management and maintenance scheduling.",
      technologies: ["Syxsense", "AWS SSM", "Cross-Account Management", "Automation", "Patch Compliance"],
      github: "#",
      demo: "#"
    },
    {
      title: "Database Migration & Optimization",
      description: "Successfully migrated on-premises SQL databases to AWS RDS with performance optimization, automated backups, and disaster recovery implementation.",
      technologies: ["AWS RDS", "Database Migration", "SQL Server", "MySQL", "Backup Automation"],
      github: "#",
      demo: "#"
    },
    {
      title: "Infrastructure as Code Framework",
      description: "Developed comprehensive IaC solutions using Terraform, OpenTofu, and AWS CDK with monitoring as code implementation. Created detailed infrastructure diagrams using Lucid and automated Dynatrace deployment configurations.",
      technologies: ["Terraform", "Cloudformation", "AWS CDK", "Monitoring as Code", "Lucid Diagrams", "Dynatrace"],
      github: "#",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Infrastructure Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} className="project-link">GitHub</a>
                <a href={project.demo} className="project-link">Documentation</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
