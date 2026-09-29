import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const res = await login(username, password);
    setSubmitting(false);

    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message || 'Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
      <div className="max-w-md w-full space-y-6">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </Link>

        {/* Login Box */}
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl space-y-6">
          
          <div className="text-center space-y-3">
            <img
              src="/logo.png"
              alt="E-Cell Official Logo"
              className="w-16 h-16 object-contain mx-auto drop-shadow-md"
            />
            <div>
              <h1 className="font-display font-black text-2xl text-white">
                E-Cell Admin Portal
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Executive authentication for DAV College E-Cell coordinators
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-text-muted mb-1 block font-medium">Username or Admin Email</label>
              <div className="relative">
                <User className="w-4 h-4 text-text-subtle absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background/90 border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-text-muted mb-1 block font-medium">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-subtle absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background/90 border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-95 font-semibold text-white text-xs shadow-electric-glow transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-text-subtle text-center">
            <span>Default Admin credentials: </span>
            <span className="text-white font-mono font-semibold">admin</span> / <span className="text-white font-mono font-semibold">admin123</span>
          </div>
        </div>

      </div>
    </div>
  );
}
