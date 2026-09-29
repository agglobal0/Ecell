import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, ShieldCheck } from 'lucide-react';
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from './SocialIcons';

export default function Footer() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#0A1128] text-white pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Brand Left */}
          <div className="space-y-2 text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/logo.png"
                alt="E-Cell DAV Jalandhar Logo"
                className="w-10 h-10 object-contain bg-white/10 rounded-xl p-1"
              />
              <div className="flex flex-col text-left">
                <span className="font-display font-black text-lg tracking-tight text-white leading-tight">
                  E-CELL
                </span>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">
                  DAV College Jalandhar
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm">
              Building the campus entrepreneurial ecosystem. One idea at a time.
            </p>
          </div>

          {/* Quick Links Middle */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-300">
            <Link to="/events" className="hover:text-blue-400 transition-colors">Events</Link>
            <Link to="/achievements" className="hover:text-blue-400 transition-colors">Achievements</Link>
            <Link to="/team" className="hover:text-blue-400 transition-colors">Team</Link>
            <Link to="/gallery" className="hover:text-blue-400 transition-colors">Gallery</Link>
            <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          </div>

          {/* Social Right */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Connect</span>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/ecell_dav_jalandhar"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/ecell-dav-jalandhar"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@ecelldavjalandhar"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:ecell@davjalandhar.ac.in"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {currentYear} Entrepreneurship Cell, DAV College Jalandhar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="hover:text-slate-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
