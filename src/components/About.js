import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <p>
            I'm a passionate Cloud Systems Engineer and DevOps Engineer specializing in building 
            and maintaining scalable, cost-effective cloud infrastructure. I excel at automating 
            complex deployment processes and optimizing cloud spending across AWS environments.
          </p>
          <p>
            With 5 years of experience and expertise in Infrastructure as Code (Terraform, CloudFormation, AWS CDK), containerization 
            with Docker and ECS, and comprehensive monitoring solutions with Dynatrace and monitoring 
            as code, I help organizations migrate from on-premises to cloud while maintaining high 
            availability and performance standards.
          </p>
          <p>
            I've successfully led cloud migration projects, moving entire server infrastructures and 
            applications to AWS with AWS budgeting optimization, migrating databases to RDS, and 
            implementing automated patching workflows using Sysxense. Recently managed migration of 
            300+ WordPress websites to containerized solutions on EC2 with GitHub Actions CI/CD 
            pipelines, significantly improving deployment efficiency and reducing costs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;