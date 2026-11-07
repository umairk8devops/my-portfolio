import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <p>
            I'm a Senior DevOps Engineer at Hightower Advisors, owning production, QA, and shared-services
            AWS accounts end to end — architecture, cost, performance, and resilience. I specialize in
            stabilizing inherited platforms and automating away the manual work: deployments, patching,
            certificates, and incident response.
          </p>
          <p>
            With 7+ years of experience in Infrastructure as Code (Terraform, CloudFormation, AWS CDK with
            TypeScript), containerization with Docker, ECS, and EKS, and observability with Dynatrace
            Monitoring as Code, I run high-availability EKS clusters and GitHub Actions CI/CD pipelines that
            keep deployments consistent and reproducible across environments.
          </p>
          <p>
            I've led zero-downtime migrations of acquired teams' applications and multi-terabyte data stores
            into our AWS platform, containerized 300+ legacy WordPress sites onto Fargate with automated
            GitHub Actions pipelines, and run patching, security, and threat scanning across AWS and Azure
            servers through the same AWS SSM workflows. I also automated all SSL certificate handling into
            rotation across ~200 static sites, 10 server applications, and ~20 Okta TLS certificates —
            eliminating expiry-driven outages.
          </p>
          <p>
            Most recently I've built AI agents on AWS Bedrock: one that investigates alerts autonomously —
            digging through logs, finding the root cause, and handing engineers remediation steps — and
            OpsHub, an AgentCore investigator that diagnoses and resolves infrastructure incidents with
            approval-gated deploys, used by IAM, network, security, Snowflake, and DevOps teams.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
