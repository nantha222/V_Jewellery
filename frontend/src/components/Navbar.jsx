import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-6">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-lg font-medium hover:text-gray-300 ${
                isActive ? "text-gray-300 underline font-bold" : ""
              }`
            }
          >
            Admin Page
          </NavLink>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `text-lg font-medium hover:text-gray-300 ${
                isActive ? "text-gray-300 underline font-bold" : ""
              }`
            }
          >
            Upload
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
