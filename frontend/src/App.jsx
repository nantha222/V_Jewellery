import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import UserPage from "./pages/UserPage"
import AdminPage from "./pages/AdminPage"
import { Home } from 'lucide-react';
import HomePage from './pages/HomePage';
import Upload from './pages/Upload';
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/*" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
