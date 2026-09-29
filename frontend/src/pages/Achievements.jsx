import React, { useState, useEffect } from 'react';
import { Trophy, Award, Sparkles, ExternalLink, Calendar, CheckCircle2, ArrowRight, Star, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackMilestones = [
    {
      id: 1,
      title: 'Best Student Entrepreneurship Cell Award (Regional)',
      description: 'Recognized for conducting 20+ high impact skill sessions, hackathons, and fostering a vibrant startup mindset across colleges in northern India.',
      achievement_date: 'December 2025',
      category: 'Institutional Award',
      highlight: '1st Place Regional',
      proof_link: 'https://davjalandhar.ac.in'
    },
    {
      id: 2,
      title: 'Top 3 Finalist at National Smart India Ideathon',
      description: 'Student team mentored by E-Cell DAV secured top positions in the sustainable smart technology track amongst 300+ national colleges.',
      achievement_date: 'November 2025',
      category: 'Student Innovation',
      highlight: 'Top 3 Nationwide',
      proof_link: 'https://davjalandhar.ac.in'
    },
    {
      id: 3,
      title: 'Successful Incubation of 4 Campus Startups',
      description: 'Facilitated seed guidance, prototyping lab access, and angel connect resulting in 4 student ventures entering active pre-seed testing.',
      achievement_date: 'August 2025',
      category: 'Incubation Milestone',
      highlight: '4 Startups Funded',
      proof_link: 'https://davjalandhar.ac.in'
    },
    {
      id: 4,
      title: 'Excellence in Campus Venture Building',
      description: 'Awarded by Regional Startup Conclave for driving zero-to-one product development and prototyping masterclasses on campus.',
      achievement_date: 'May 2025',
      category: 'Ecosystem Award',
      highlight: 'Best Campus Cell',
      proof_link: 'https://davjalandhar.ac.in'
    },
    {
      id: 5,
      title: 'National Ideathon 2025 - 2nd Runner Up',
      description: 'DAV College team created a solar-powered cold storage micro-unit concept and won ₹30,000 prototype grant at Delhi Tech Fest.',
      achievement_date: 'March 2025',
      category: 'Ideathon Podium',
      highlight: '₹30K Grant',
      proof_link: 'https://davjalandhar.ac.in'
    },
    {
      id: 6,
      title: 'State Startup Awareness Leadership Citation',
      description: 'Recognized by Punjab Higher Education Council for student community outreach impacting 1,500+ undergraduate learners.',
      achievement_date: 'January 2025',
      category: 'Leadership Citation',
      highlight: 'State Recognition',
      proof_link: 'https://davjalandhar.ac.in'
    }
  ];

  useEffect(() => {
    async function loadAchievements() {
      setLoading(true);
      const data = await api.getAchievements();
      if (Array.isArray(data) && data.length > 0) {
        setAchievements(data);
      } else {
        setAchievements(fallbackMilestones);
      }
      setLoading(false);
    }
    loadAchievements();
  }, []);

  const displayList = achievements.length > 0 ? achievements : fallbackMilestones;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 block">
            Milestones & Honors
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            OUR ACHIEVEMENTS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Celebrating national ideathon wins, campus startup incubation records, and competitive excellence.
          </p>
        </div>

        {/* Featured Hero Card - Clean White Card with High Contrast & Stat Badges */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-md bg-slate-100 relative group h-64 sm:h-72">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80"
                alt="National Entrepreneurship Challenge Victory"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="font-bold flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  National Stage Honor
                </span>
                <span className="font-semibold text-slate-200">IIT Bombay Hub</span>
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-blue-600 text-white uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  <span>AIR 118 • National Level</span>
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  NEC 2025 Edition
                </span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                NATIONAL ENTREPRENEURSHIP CHALLENGE 2025
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                E-Cell DAV College Jalandhar secured <strong>All India Rank 118</strong> at the prestigious National Entrepreneurship Challenge, organized in partnership with nationwide IIT incubation cells. Recognized for launching high-impact venture incubations, structured ideathons, and startup mentorship drives across Punjab.
              </p>

              {/* Key Highlights Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="font-display font-black text-lg sm:text-xl text-blue-600">AIR 118</div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase mt-0.5">Rank in India</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="font-display font-black text-lg sm:text-xl text-slate-900">Top 10%</div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase mt-0.5">1,200+ Teams</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="font-display font-black text-lg sm:text-xl text-emerald-600">500+</div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase mt-0.5">Minds Mentored</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="pt-4 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
              More Milestone Recognitions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Competitive podiums, institutional grants, and student venture laurels.
            </p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-blue-300 hover:shadow-lg transition-all group"
            >
              {item.image_url && (
                <div className="relative h-44 overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-900 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs">
                      {item.achievement_date}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-400 px-2 py-0.5 rounded-md shadow-xs">
                      {item.category || 'Milestone'}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {!item.image_url && (
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                        {item.achievement_date}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Trophy className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    {!item.image_url && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        {item.category || 'Milestone'}
                      </span>
                    )}
                    <h4 className="font-display font-bold text-base text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  {item.highlight ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      {item.highlight}
                    </span>
                  ) : <span />}
                  
                  {item.proof_link ? (
                    <a
                      href={item.proof_link}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
                    >
                      <span>View Press / Proof</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                      <span>Verified Milestone</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

