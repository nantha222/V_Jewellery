import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';

const LoginPage = () => {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { role, email, password };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login successful');
        navigate(role === 'user' ? '/user' : '/home');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="flex">
          {/* Left Panel */}
          <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-cyan-500 w-1/3 p-8">
            <div className="text-center space-y-4">
              <Lock className="h-16 w-16 text-white mx-auto" />
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-gray-200 text-sm">
                Secure access to your account
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-2/3 p-8">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
              Account Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`p-3 rounded-lg transition-colors ${
                    role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-3 rounded-lg transition-colors ${
                    role === 'admin'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  Admin
                </button>
              </div>

              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                icon={Lock}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold
                         rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none
                         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                type="submit"
              >
                Sign In
              </motion.button>

              <div className="mt-6 border-t border-gray-700 pt-4">
                <p className="text-gray-400 text-center text-sm">
                  Don't have an account?{' '}
                  <Link
                    to="/"
                    className="text-blue-400 hover:text-blue-300 font-medium underline transition-colors"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;