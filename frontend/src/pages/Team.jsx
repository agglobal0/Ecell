import React, { useState, useEffect } from 'react';
import { Mail, Shield, Award, Users } from 'lucide-react';
import { InstagramIcon, LinkedInIcon } from '../components/SocialIcons';
import { api } from '../services/api';
import { defaultTeam } from '../data/defaultData';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');

  const filterTabs = [
    { label: 'ALL', cat: 'All' },
    { label: 'LEADERSHIP', cat: 'Core Team' },
    { label: 'FACULTY & MENTORS', cat: 'Faculty / Mentors' },
    { label: 'EVENTS', cat: 'Event Team' },
    { label: 'MARKETING & PR', cat: 'Marketing & PR' },
    { label: 'TECHNICAL', cat: 'Technical Team' },
    { label: 'CREATIVE', cat: 'Creative Team' },
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  async function fetchTeam() {
    setLoading(true);
    const data = await api.getTeam();
    if (Array.isArray(data) && data.length > 0) {
      setTeam(data);
    } else {
      setTeam(defaultTeam);
    }
    setLoading(false);
  }

  // Filter members based on active tab
  const currentTabObj = filterTabs.find(t => t.label === activeTab);
  const filteredTeam = activeTab === 'ALL' 
    ? team 
    : team.filter(m => m.category === currentTabObj?.cat);

  // Find leader / president
  const leader = team.find(m => m.designation?.toLowerCase().includes('president') && !m.designation?.toLowerCase().includes('vice')) || team[0];
  const otherMembers = activeTab === 'ALL' 
    ? team.filter(m => m.id !== leader?.id)
    : filteredTeam;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 block">
            Executive Leadership & Committee
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            THE PEOPLE BEHIND E-CELL
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Behind every summit, competition, and workshop is a dedicated team of student innovators and faculty mentors.
          </p>
        </div>

        {/* Filter Pills with Solid High Contrast */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => {
            const isSelected = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white font-extrabold shadow-sm ring-2 ring-blue-600 ring-offset-2'
                    : 'bg-slate-100 text-slate-700 font-bold hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Team Layout (Leader Spotlight on Left + Grid on Right for ALL, or Full Grid for specific tabs) */}
        {activeTab === 'ALL' && leader ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* President / Leader Big Card (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-2xl overflow-hidden h-72 bg-slate-100">
                <img
                  src={leader.photo_url || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80`}
                  alt={leader.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase">
                  Featured Leadership
                </span>
                <h3 className="font-display font-black text-xl text-slate-900 mt-1">{leader.name}</h3>
                <p className="text-xs font-bold text-blue-600 uppercase">{leader.designation}</p>
                <p className="text-xs text-slate-500">{leader.department}</p>
                {leader.bio && (
                  <p className="text-xs text-slate-600 pt-2 border-t border-slate-100 leading-relaxed">
                    {leader.bio}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <a
                  href={leader.linkedin_url || 'https://linkedin.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href={leader.instagram_url || 'https://instagram.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Other Members Grid (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherMembers.map((m) => (
                <div key={m.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="rounded-xl overflow-hidden h-44 bg-slate-100">
                    <img
                      src={m.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}`}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-display font-bold text-sm text-slate-900 line-clamp-1">{m.name}</h4>
                    <p className="text-[11px] font-bold text-blue-600 uppercase line-clamp-1">{m.designation}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{m.department}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    {m.linkedin_url && (
                      <a
                        href={m.linkedin_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {m.instagram_url && (
                      <a
                        href={m.instagram_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          /* Filtered Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTeam.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
                <div className="rounded-xl overflow-hidden h-48 bg-slate-100">
                  <img
                    src={m.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}`}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-display font-bold text-sm text-slate-900 line-clamp-1">{m.name}</h4>
                  <p className="text-[11px] font-bold text-blue-600 uppercase line-clamp-1">{m.designation}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{m.department}</p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  {m.linkedin_url && (
                    <a
                      href={m.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <LinkedInIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {m.instagram_url && (
                    <a
                      href={m.instagram_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

