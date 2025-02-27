// AdminPage.js
import React, { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { FiHome, FiUpload, FiMenu, FiX } from "react-icons/fi";
import HomePage from "./HomePage";
import Upload from "./Upload";

const AdminPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 to-green-50 relative">
      {/* Mobile Navigation Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-6 right-6 z-50 p-3 bg-white rounded-xl shadow-lg text-gray-600 hover:text-emerald-600 transition-all"
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Navigation Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40`}
      >
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            JewelAdmin
          </h1>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink
            to="/home"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-600 hover:bg-blue-100"
              }`
            }
          >
            <FiHome className="w-5 h-5" />
            Dashboard
          </NavLink>
          <NavLink
            to="/upload"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-600 hover:bg-blue-100"
              }`
            }
          >
            <FiUpload className="w-5 h-5" />
            Upload
          </NavLink>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </div>
      </main>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/30 z-30 backdrop-blur-sm"
        />
      )}
    </div>
  );
};

export default AdminPage;