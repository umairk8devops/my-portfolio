import React from 'react';

const Hosting = () => {
  const options = [
    {
      title: "AWS ECS / Fargate",
      description: "The container path: a multi-stage Docker build served by nginx, ready to run on ECS or Fargate.",
      technologies: ["Docker", "nginx", "ECS", "Fargate"],
      links: [
        { label: "Dockerfile", url: "https://github.com/umairk8devops/my-portfolio/blob/main/Dockerfile" },
        { label: "nginx.conf", url: "https://github.com/umairk8devops/my-portfolio/blob/main/nginx.conf" }
      ]
    },
    {
      title: "AWS S3 + CloudFront",
      description: "The serverless path: Terraform provisions the S3 bucket and CloudFront distribution, and GitHub Actions ships every push. Cheap, global, and no servers to patch.",
      technologies: ["Terraform", "S3", "CloudFront", "GitHub Actions"],
      links: [
        { label: "Terraform", url: "https://github.com/umairk8devops/my-portfolio/tree/main/terraform" },
        { label: "Deploy workflow", url: "https://github.com/umairk8devops/my-portfolio/blob/main/.github/workflows/Deploy-Portfolio-to-S3.yml" }
      ]
    },
    {
      title: "GitHub Pages — live now",
      description: "How the site actually runs today: free on GitHub Pages. A static site doesn't need servers, so I don't pay for any — the same code, deployed by a GitHub Actions workflow on every push to main.",
      technologies: ["GitHub Pages", "GitHub Actions", "Free hosting"],
      links: [
        { label: "Deploy workflow", url: "https://github.com/umairk8devops/my-portfolio/blob/main/.github/workflows/deploy-pages.yml" },
        { label: "View the repo", url: "https://github.com/umairk8devops/my-portfolio" }
      ]
    }
  ];

  return (
    <section id="hosting" className="projects">
      <div className="container">
        <h2>How This Site Is Hosted</h2>
        <p>
          This site runs free on GitHub Pages — a static site doesn't need servers. The same site
          deploys to AWS two ways, and the code for all three is below.
        </p>
        <div className="projects-grid">
          {options.map((option, index) => (
            <div key={index} className="project-card">
              <h3>{option.title}</h3>
              <p className="project-description">{option.description}</p>
              <div className="project-technologies">
                {option.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {option.links.map((link, linkIndex) => (
                  <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className="project-link">{link.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hosting;
