import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-8">
      {/* Website name*/}
      <div className="text-gray-900 font-semibold text-2xl mb-2">Shortify</div>
      <div className="text-gray-500 text-md mb-4">Your hassle-free URL Shortener</div>

      {/* Social Links */}
      <div className="flex justify-center gap-4 mb-4">
        <a href="https://www.linkedin.com/in/sushree-swain/" target="_blank" rel="noopener noreferrer">
          <img
            alt="LinkedIn"
            height="36"
            width="36"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
          />
        </a>
        <a href="https://github.com/SushreeSwain" target="_blank" rel="noopener noreferrer">
          <img
            alt="GitHub"
            height="36"
            width="36"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          />
        </a>
      </div>

      {/* Additional Info */}
      <div className="text-gray-500 font-semibold text-md">India</div>
      <div className="text-gray-500 font-semibold text-md">
        Check out the documentation for more information on this project.
      </div>
    </footer>
  );
}

export default Footer;
