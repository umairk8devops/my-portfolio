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
      description: "Migrated and managed 300+ WordPress websites to containerized Docker solution on Fargate with automated CI/CD pipelines for updates and deployments across the entire organization.",
      technologies: ["Docker", "ECS", "WordPress Multisite", "EC2", "GitHub Actions", "LAMP Stack"],
      github: "#",
      demo: "#"
    },
    {
      title: "Automated Patch Management System",
      description: "Implemented organization-wide automated patching workflow using Sysxense and AWS Systems Manager for cross-account server management and maintenance scheduling.",
      technologies: ["Sysxense", "AWS SSM", "Cross-Account Management", "Automation", "Patch Compliance"],
      github: "#",
      demo: "#"
    },
    {
      title: "Containerized Application Platform",
      description: "Built and deployed containerized applications using Docker and ECS with automated scaling, monitoring, and deployment pipelines for production workloads.",
      technologies: ["Docker", "ECS", "ECR", "CloudWatch", "Auto Scaling", "Load Balancing"],
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