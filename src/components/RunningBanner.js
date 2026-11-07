import React from 'react';

const RunningBanner = () => {
  const bannerText = "🚀 Static Site • Zero Servers • Infrastructure as Code with Terraform • Automated CI/CD with GitHub Actions •";
  const gap = "        "; // Creates visual gap between repeating text
  
  return (
    <div className="running-banner">
      <div className="banner-content">
        <span className="banner-text">
          {bannerText}{gap}{bannerText}{gap}
        </span>
      </div>
    </div>
  );
};

export default RunningBanner;
