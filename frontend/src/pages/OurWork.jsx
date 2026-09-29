import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, BookOpen, Trophy, Network, Rocket, 
  Users, ArrowRight, CheckCircle2 
} from 'lucide-react';

export default function OurWork() {
  const initiatives = [
    {
      id: 'events',
      title: 'Flagship Summits & Speaker Series',
      category: 'Events',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
      description: 'Annual entrepreneurship summits bringing together 500+ students, venture capitalists, unicorn founders, and mentors across northern India.',
      points: ['Annual DAV E-Summit', 'Fireside Founder Series', 'Keynotes on Emerging Tech']
    },
    {
      id: 'workshops',
      title: 'Practical Masterclasses & Bootcamps',
      category: 'Workshops',
      icon: BookOpen,
      color: 'bg-purple-50 text-purple-600',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
      description: 'Hands-on learning sessions focusing on modern execution: from zero-to-one business modeling, no-code MVP development, to legal roadmaps.',
      points: ['Zero-to-One Founder Bootcamp', 'No-Code Prototype Building', 'Financial Modeling Essentials']
    },
    {
      id: 'competitions',
      title: 'Pitching Challenges & Ideathons',
      category: 'Competitions',
      icon: Trophy,
      color: 'bg-amber-50 text-amber-600',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
      description: 'Shark-tank style pitch competitions offering seed grants, prototyping lab credits, and direct venture capitalist feedback.',
      points: ['Tech Ideathon 2026', 'Innovate-X Pitch Challenge', 'Regional Ideathon Qualifiers']
    },
    {
      id: 'collaborations',
      title: 'Incubation & Industry Linkages',
      category: 'Collaborations',
      icon: Network,
      color: 'bg-emerald-50 text-emerald-600',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      description: 'Active partnerships with regional angel networks, tech hubs, and corporate mentorship channels providing students with real-world exposure.',
      points: ['Angel Investor Connects', 'Co-Working & Lab Access', 'Founder Mentorship Panels']
    },
    {
      id: 'initiatives',
      title: 'Student-Led Ventures & Projects',
      category: 'Student Initiatives',
      icon: Rocket,
      color: 'bg-indigo-50 text-indigo-600',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80',
      description: 'Supporting ambitious DAVian students building micro-SaaS, sustainable agritech, consumer brands, and campus utility apps.',
      points: ['Pre-Seed Prototyping Support', 'Beta Testing on Campus', 'Founder Peer Accountability Groups']
    },
    {
      id: 'community',
      title: 'Community & Peer Ecosystem',
      category: 'Community',
      icon: Users,
      color: 'bg-rose-50 text-rose-600',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
      description: 'An open, inclusive space where any student curious about entrepreneurship can brainstorm, find co-founders, and develop leadership skills.',
      points: ['Weekly Brainstorm Circles', 'Freshman Orientation Bootcamps', 'Alumni Mentorship Network']
    }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 block">
            Our Work & Initiatives
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            WHAT WE BUILD
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            A comprehensive look at the learning programs, summits, competitions, and venture-building initiatives led by E-Cell DAV Jalandhar.
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="ui-card p-0 rounded-2xl overflow-hidden bg-white border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-slate-800 shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-base text-slate-900 leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-3 border-t border-slate-100 space-y-1.5">
                      {item.points.map((pt, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to="/events"
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Events & Workshops</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action Card */}
        <div className="ui-card p-8 sm:p-10 bg-slate-900 text-white border-0 text-center max-w-3xl mx-auto space-y-4 shadow-xl">
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            Have a Project or Collaboration in Mind?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            We actively support student founders and partner with industry networks across northern India.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs uppercase tracking-wider transition-all"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
