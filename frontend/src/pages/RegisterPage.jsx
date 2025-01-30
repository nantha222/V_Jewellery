import { motion } from "framer-motion";
import { Lock, User, Mail, Shield } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import Input from "../components/Input";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, email, password }),
      });

      if (response.ok) {
        navigate("/login");
        alert("Registration successful!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-transparent backdrop-blur-md rounded-xl shadow-2xl p-8 border border-blue-700"
      >
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`p-3 rounded-lg transition-colors ${
                role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-800 hover:bg-blue-700 text-gray-300"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`p-3 rounded-lg transition-colors ${
                role === "admin"
                  ? "bg-cyan-600 text-white"
                  : "bg-blue-800 hover:bg-blue-700 text-gray-300"
              }`}
            >
              Admin
            </button>
          </div>

          {/* Name and Email Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password and Confirm Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                icon={Lock}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              {isPasswordFocused && <PasswordStrengthMeter password={password} />}
            </div>
            <Input
              icon={Shield}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold
                     rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            type="submit"
          >
            Create Account
          </motion.button>
        </form>

        {/* Login Redirect */}
        <div className="mt-6 border-t border-blue-700 pt-4">
          <p className="text-gray-300 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-medium underline transition-colors"
            >
              Log-In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
