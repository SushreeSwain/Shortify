import React from "react";
import { Link } from "react-router-dom";

const Documentation = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-left">
      <Link to="/" className="text-blue-500 underline text-sm mb-4 inline-block">
        ← Go Back
      </Link>

      <h1 className="text-4xl font-bold mb-4 leading-12">Documentation</h1>

      <p className=" text-xl mb-4 leading-10">
        This is a beginner-friendly URL shortener project built using Node.js, Express.js, MongoDB for the backend, and Vite + React with Tailwind CSS for the frontend.
      </p>

      <h2 className="text-3xl font-semibold mt-6 mb-2 leading-12">Features</h2>
      <ul className=" text-xl list-disc list-inside mb-4 leading-10">
        <li>Shorten URLs with random or custom aliases</li>
        <li>Generate QR codes for shortened URLs</li>
        <li>Track number of visits and URLs created</li>
        <li>Expiry support for temporary short links</li>
        <li>404 and Expired page redirection</li>
      </ul>

      <h2 className="text-3xl font-semibold mt-6 mb-2 leading-12">Tech Stack</h2>
      <ul className="text-xl list-disc list-inside mb-4 leading-10">
        <li>Frontend: React + Vite + Tailwind CSS + HTML</li>
        <li>Backend: Node.js + Express</li>
        <li>Database: MongoDB</li>
        <li>Modules Used: qrcode, nanoid</li>
        <li>Tools: MongoDB Compass, Postman</li>
      </ul>

      <h2 className="text-3xl font-semibold mt-6 mb-2 leading-12">Project Structure</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto leading-6">
{`
/.git
README.md
LICENSE
.gitignore
/frontend
    README.md
    /public
    /src
        /components
            Home page files
        App.jsx
        main.jsx
/backend
    README.md
    /public
        /html page for non-existent URL
        /html page for expiry 
    /models
        Url.js
    server.js
    .env
`}
      </pre>

      <h2 className="text-3xl font-semibold mt-6 mb-2 leading-12">📘 Learn More</h2>
      <p className="text-xl mb-4 leading-10">
        This is just a basic overview. To view the complete documentation, including deployment, command breakdowns, and diagrams, visit the full documentation on GitHub:
        <br />
        <a
          href="https://github.com/SushreeSwain/Shortify"
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Full Docs on GitHub →
        </a>
      </p>
    </div>
  );
};

export default Documentation;
