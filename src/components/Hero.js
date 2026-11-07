import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Senior DevOps Engineer</h1>
        <p className="hero-subtitle">
          Owning production AWS estates end to end — EKS, Terraform, GitHub Actions CI/CD, and Bedrock-powered incident automation
        </p>
        <p className="hero-description">
          Senior DevOps Engineer at Hightower Advisors with 7+ years building self-healing cloud infrastructure:
          Terraform-managed AWS accounts, high-availability EKS, automated SSL rotation at scale, and AI agents
          that investigate and fix incidents on their own.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">View My Projects</a>
          <a href="#contact" className="btn btn-secondary">Let's Connect</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
