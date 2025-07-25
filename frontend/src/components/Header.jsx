import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="flex flex-col items-center space-y-4">
        {/* Brand Name */}
        <h1 className="text-5xl font-bold tracking-wide">SHORTIFY</h1>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#features" className="text-gray-300 hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#documentation" className="text-gray-300 hover:text-white">
                Documentation
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-300 hover:text-white">
                About
              </a>
            </li>
            <li>
              <Link to="/analytics" className="text-gray-300 hover:text-white">
                Analytics
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
