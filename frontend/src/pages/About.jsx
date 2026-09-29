import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, Compass, Sparkles, Rocket, Lightbulb, Users, 
  Network, Trophy, BookOpen, HeartHandshake, ArrowRight, CheckCircle2 
} from 'lucide-react';

export default function About() {
  const whatWeDoList = [
    { title: 'Entrepreneurship', icon: Rocket, color: 'bg-blue-50 text-blue-600', desc: 'Fostering venture creation from napkin sketches to scalable, revenue-generating businesses.' },
    { title: 'Innovation', icon: Lightbulb, color: 'bg-amber-50 text-amber-600', desc: 'Encouraging disruptive ideas, patent awareness, and tech-driven problem solving across disciplines.' },
    { title: 'Leadership', icon: Users, color: 'bg-purple-50 text-purple-600', desc: 'Developing executive agency, team communication, and student governance through real initiatives.' },
    { title: 'Networking', icon: Network, color: 'bg-emerald-50 text-emerald-600', desc: 'Connecting young minds with angels, venture capitalists, founders, and industry leaders.' },
    { title: 'Workshops', icon: BookOpen, color: 'bg-indigo-50 text-indigo-600', desc: 'Hands-on masterclasses on no-code, pitching, finance, legal frameworks, and digital marketing.' },
    { title: 'Competitions', icon: Trophy, color: 'bg-rose-50 text-rose-600', desc: 'Organizing shark-tank style pitch days, business plan ideathons, and case study battles.' },
    { title: 'Startup Awareness', icon: Sparkles, color: 'bg-blue-50 text-blue-600', desc: 'Demystifying startup jargon, failure resilience, and venture building for college freshers.' },
    { title: 'Student Development', icon: HeartHandshake, color: 'bg-emerald-50 text-emerald-600', desc: 'Mentoring student projects with prototyping resources, seed guidance, and peer review.' }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 block">
            About E-Cell DAV Jalandhar
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-900 tracking-tight">
            NURTURING IDEAS, <br />
            <span className="text-blue-600">EMPOWERING FOUNDERS.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            The Entrepreneurship Cell of DAV College, Jalandhar is a student-led initiative dedicated to cultivating innovation, entrepreneurial resilience, and practical problem-solving.
          </p>
        </div>

        {/* Purpose, Mission & Vision (3 White Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ui-card p-8 bg-white border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-xl text-slate-900 uppercase">Who We Are</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We are an ecosystem of passionate undergraduate and postgraduate students, supported by experienced faculty mentors. We believe entrepreneurial thinking is a mindset of ownership and creative problem-solving.
            </p>
          </div>

          <div className="ui-card p-8 bg-blue-50/50 border border-blue-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-xl text-blue-900 uppercase">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To bridge the gap between classroom theory and real-world execution. We provide students with practical toolkits, expert masterclasses, founder sessions, and launchpads to convert raw concepts into verifiable impact.
            </p>
          </div>

          <div className="ui-card p-8 bg-white border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-display font-black text-xl text-slate-900 uppercase">Our Vision</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              To establish DAV College Jalandhar as a premier regional hub for student entrepreneurship, producing high-impact innovators and leaders who contribute meaningfully to the national startup narrative.
            </p>
          </div>
        </div>

        {/* What We Do - 8 Cards */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase">
              What We Do at E-Cell
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Structured initiatives crafted to support every phase of a student founder's journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeDoList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="ui-card p-6 bg-white border border-slate-200 space-y-3"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-slate-900 uppercase">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campus Ecosystem Banner */}
        <div className="ui-card p-8 sm:p-12 bg-slate-900 text-white border-0 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-300 text-[10px] font-extrabold uppercase tracking-wider border border-blue-400/30">
                Campus Ecosystem
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                DAV College, Jalandhar
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                With a rich heritage of academic leadership, DAV College provides an empowering campus environment. E-Cell operates as a collaborative bridge between students, departments, and external startup incubators across northern India.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <Link
                to="/team"
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs uppercase tracking-wider text-center shadow-md"
              >
                Meet the Team
              </Link>
              <Link
                to="/events"
                className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 font-bold text-white text-xs uppercase tracking-wider text-center"
              >
                Upcoming Workshops
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
