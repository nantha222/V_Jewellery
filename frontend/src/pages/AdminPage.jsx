import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Upload from "./Upload";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-blue-600 text-white shadow-md">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                ` font-medium hover:underline ${
                  isActive ? "underline font-bold" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                ` font-medium hover:underline ${
                  isActive ? "underline font-bold" : ""
                }`
              }
            >
              Upload
            </NavLink>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPage;
