import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Loader2, Compass } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { authAPI } from '../services/api';
import { BrandLogo } from '../components/Logo';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090B] text-white flex items-center justify-center px-6 overflow-hidden">
      
      {/* Cinematic Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none animate-pulse-slower" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        
        {/* Branding & Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3"
        >
          <div className="flex justify-center">
            <BrandLogo animate />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h1>
            <p className="text-gray-400 text-xs font-light">Sign in to unlock destination profiles and secrets</p>
          </div>
        </motion.div>

        {/* Login Form Container Card */}
        <Card glass className="bg-[#111214]/85 border-white/10 p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-2xl text-xs font-medium">
                {error}
              </div>
            )}

            <Input
              type="email"
              label="Email Address"
              placeholder="name@domain.com"
              icon={Mail}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>Sign In</span>
                </>
              )}
            </Button>

            <div className="text-center text-xs text-gray-400 font-light pt-2">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#6EE7F9] hover:underline font-semibold tracking-wide">
                Sign Up
              </Link>
            </div>
          </form>
        </Card>

      </div>
    </div>
  );
}

