import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, CheckCircle2, ArrowRight, 
  Share2, ChevronLeft, Sparkles, Award, Users, BookOpen, Quote 
} from 'lucide-react';
import { api } from '../services/api';

export default function EventDetails() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    async function loadEvent() {
      setLoading(true);
      const data = await api.getEventBySlug(slug);
      setEvent(data);
      setLoading(false);
    }
    loadEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-36 pb-20 min-h-screen text-center">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-36 pb-20 min-h-screen text-center max-w-md mx-auto space-y-4">
        <h2 className="font-display font-bold text-2xl text-slate-900">Event Not Found</h2>
        <Link to="/events" className="inline-block px-6 py-2 rounded-xl bg-primary-600 text-white text-xs font-bold">
          Back to Events
        </Link>
      </div>
    );
  }

  const isPast = event.status === 'past';
  const isClosed = event.registration_mode === 'closed' || isPast;

  const sidebarItems = [
    { id: 'about', label: 'About Event' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'eligibility', label: 'Who Can Participate' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'organizers', label: 'Organizers' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Back Link */}
        <Link
          to="/events"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-primary-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>All Events</span>
        </Link>

        {/* Hero Event Banner (Dark Style from Stitch Reference) */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-xl">
          <img
            src={event.poster_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80'}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent" />

          <div className="relative z-10 p-8 sm:p-12 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
              EVENT
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
              {event.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {event.short_description}
            </p>
          </div>
        </div>

        {/* Metadata & Quick Register Strip */}
        <div className="ui-card p-4 sm:p-6 bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-600" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">DATE</span>
                <span className="font-bold text-slate-900">{new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            {event.event_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-600" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">TIME</span>
                  <span className="font-bold text-slate-900">{event.event_time}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-600" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">VENUE</span>
                <span className="font-bold text-slate-900">{event.venue}</span>
              </div>
            </div>
          </div>

          <div>
            {isClosed ? (
              <span className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-400 font-bold text-xs cursor-not-allowed">
                Closed
              </span>
            ) : (
              <Link
                to={`/register?event=${event.id}`}
                className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Two-Column Body (Sidebar Navigation + Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          
          {/* Left Sidebar Menu (3 cols) */}
          <div className="lg:col-span-3 space-y-1">
            <div className="ui-card p-3 bg-slate-50/50 space-y-1 sticky top-28">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Main Content (9 cols) */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* About The Event */}
            <div className="ui-card p-6 sm:p-8 bg-white border border-slate-200 space-y-4">
              <h2 className="font-display font-black text-xl text-slate-900 uppercase">
                About the Event
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {event.about_details || event.short_description}
              </p>
            </div>

            {/* Event Highlights with Icons & Quote Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Highlights Left (7 cols) */}
              <div className="md:col-span-7 ui-card p-6 bg-white border border-slate-200 space-y-4">
                <h3 className="font-display font-bold text-base text-slate-900 uppercase">
                  Event Highlights
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/50">
                    <Sparkles className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">24-hour innovation challenge with mentorship</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/50">
                    <Users className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">Direct mentorship from prominent industry founders</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50">
                    <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">Exciting cash grants, incubation awards & recognition</span>
                  </div>
                </div>
              </div>

              {/* Quote Card Right (5 cols) */}
              <div className="md:col-span-5 ui-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-100 flex flex-col justify-between">
                <Quote className="w-8 h-8 text-primary-400" />
                <div className="space-y-2 py-4">
                  <p className="font-display font-bold text-base text-slate-900 leading-snug">
                    "Great ideas need the right platform."
                  </p>
                  <p className="text-xs text-primary-700 font-semibold">
                    — E-Cell DAV College
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Official Platform</span>
              </div>

            </div>

            {/* Eligibility & Rules */}
            <div className="ui-card p-6 sm:p-8 bg-white border border-slate-200 space-y-4">
              <h3 className="font-display font-bold text-base text-slate-900 uppercase">
                Who Can Participate & Rules
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {event.eligibility || 'Open to all undergraduate and postgraduate students from any college or department.'}
              </p>
              {event.rules && (
                <div className="pt-3 border-t border-slate-100">
                  <h4 className="font-semibold text-xs text-slate-800 mb-1">Guidelines:</h4>
                  <p className="text-xs text-slate-500 whitespace-pre-line leading-relaxed">{event.rules}</p>
                </div>
              )}
            </div>

            {/* Schedule Timeline */}
            {event.schedule && event.schedule.length > 0 && (
              <div className="ui-card p-6 sm:p-8 bg-white border border-slate-200 space-y-4">
                <h3 className="font-display font-bold text-base text-slate-900 uppercase">
                  Schedule Timeline
                </h3>
                <div className="space-y-3">
                  {event.schedule.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                      <span className="font-mono text-xs font-bold text-primary-600 bg-white px-2 py-1 rounded shadow-sm">
                        {s.time}
                      </span>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{s.title}</h4>
                        {s.speaker && <p className="text-[11px] text-slate-500 mt-0.5">{s.speaker}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
