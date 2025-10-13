import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm always interested in new opportunities and interesting projects. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            <div className="contact-links">
              <a href="mailto:waqu235@gmail.com" className="contact-link">
                📧 waqu235@gmail.com
              </a>
              <a href="https://linkedin.com/in/umairwaqar" className="contact-link">
                💼 LinkedIn
              </a>
              <a href="https://github.com/waqu235" className="contact-link">
                🐙 GitHub
              </a>
            </div>
          </div>
          <div className="linkedin-message-box">
            <div className="message-prompt">
              <h3>💬 Ready to Connect?</h3>
              <p>
                I prefer to keep conversations professional and organized. 
                Please reach out to me directly on LinkedIn for the fastest response.
              </p>
              <a 
                href="https://linkedin.com/in/umairwaqar" 
                className="btn btn-primary linkedin-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                📩 Message Me on LinkedIn
              </a>
              <p className="message-note">
                I typically respond within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;