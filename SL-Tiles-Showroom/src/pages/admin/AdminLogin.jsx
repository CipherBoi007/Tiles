import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-brand-lightBg flex flex-col items-center justify-center font-luxury relative overflow-hidden">
      {/* Background glow effects - keeping them subtle for light theme */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px]"></div>

      <div className="z-10 text-center mb-8 mt-12">
        <div className="w-16 h-16 bg-brand-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-black/10">
          <Layers size={36} className="text-brand-gold" />
        </div>
        <h1 className="text-3xl font-luxury font-bold text-brand-text mb-2">Admin Login</h1>
        <p className="text-brand-textMuted font-medium">Authorized Access Only</p>
      </div>

      <div className="z-10 bg-brand-white p-6 sm:p-8 rounded-3xl w-full max-w-md border border-gray-100 shadow-xl">
        <div className="bg-brand-lightBg border border-gray-200 rounded-xl p-4 mb-8 flex gap-3 items-center">
          <Lock size={16} className="text-brand-gold shrink-0" />
          <p className="text-xs font-medium text-brand-textMuted">This panel is restricted to authorized administrators only.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-brand-textMuted mb-2 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@showroom.com"
              className="w-full bg-brand-white border border-gray-200 rounded-xl px-4 py-3 text-brand-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-textMuted mb-2 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-brand-white border border-gray-200 rounded-xl pl-4 pr-12 py-3 text-brand-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all font-medium"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-text transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-brand-gold hover:bg-yellow-600 text-brand-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-brand-gold/20 mt-6 flex items-center justify-center gap-2"
          >
            Sign In to Admin Panel
          </button>
        </form>
      </div>

      <div className="z-10 mt-12 text-center text-xs text-brand-textMuted font-medium mb-8">
        Tile Showroom Administration System &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default AdminLogin;
