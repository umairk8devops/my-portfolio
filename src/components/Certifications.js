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
        </div>
      </div>
    </section>
  );
};

export default Certifications;