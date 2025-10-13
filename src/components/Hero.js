import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Cloud Systems & DevOps Engineer</h1>
        <p className="hero-subtitle">
          Architecting scalable cloud infrastructure with Docker, ECS, Terraform, and AWS cost optimization
        </p>
        <p className="hero-description">
          Passionate about automating deployments, optimizing cloud costs, and building robust infrastructure 
          using Infrastructure as Code, CI/CD pipelines, and monitoring solutions.
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