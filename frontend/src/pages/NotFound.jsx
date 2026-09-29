import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16 bg-hero-grid">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 max-w-lg w-full text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center mx-auto shadow-electric-glow">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        <div className="space-y-2">
          <span className="text-5xl sm:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-purple-500">
            404
          </span>
          <h1 className="font-display font-bold text-2xl text-white">Page Not Found</h1>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            The page you are looking for does not exist or has been moved to another location.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-electric-glow"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/events"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-text-muted hover:text-white flex items-center justify-center gap-1.5"
          >
            <span>Browse Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
