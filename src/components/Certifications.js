import React from 'react';

const Certifications = () => {
  return (
    <section className="certifications">
      <div className="container">
        <h2>AWS Certifications</h2>
        <div className="certs-grid">
          <div className="cert-item">
            <a 
              href="https://www.credly.com/badges/6d9793f6-2143-49b7-9329-1187fdb3f8ca/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="cert-link"
            >
              <img 
                src="/aws-certified-devops-engineer-professional.png" 
                alt="AWS Certified DevOps Engineer Professional"
                className="cert-badge"
              />
              <p className="cert-title">DevOps Engineer Professional</p>
            </a>
          </div>
          <div className="cert-item">
            <a 
              href="https://www.credly.com/badges/41a13039-9607-429f-948f-378784793836/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="cert-link"
            >
              <img 
                src="/aws-certified-solutions-architect-associate.png" 
                alt="AWS Certified Solutions Architect Associate"
                className="cert-badge"
              />
              <p className="cert-title">Solutions Architect Associate</p>
            </a>
          </div>
          <div className="cert-item">
            <a 
              href="https://www.credly.com/badges/62162ec7-5b48-43d7-aa35-0e22d5d5379f/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="cert-link"
            >
              <img 
                src="/aws-cloud-quest-cloud-practitioner.png" 
                alt="AWS Cloud Quest: Cloud Practitioner - Training Badge"
                className="cert-badge"
              />
              <p className="cert-title">Cloud Quest Cloud Practitioner</p>
            </a>
          </div>
          <div className="cert-item">
            <a 
              href="https://www.credly.com/badges/f7cbbba4-5177-452f-b916-dc5b5a03f8ff/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="cert-link"
            >
              <img 
                src="/aws-simulearn-ai-practitioner.png" 
                alt="AWS SimuLearn - AI Practitioner - Training Badge"
                className="cert-badge"
              />
              <p className="cert-title">SimuLearn AI Practitioner</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;