import React from "react";
import { NavLink } from "react-router-dom";

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
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/documentation"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white"
                }
              >
                Documentation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stats"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white"
                }
              >
                Stats
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white"
                }
              >
                Analytics
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
