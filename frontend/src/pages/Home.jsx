import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, Lightbulb, Users, Trophy, ArrowRight, Sparkles, 
  Calendar, MapPin, ChevronRight, CheckCircle2, ArrowUpRight 
} from 'lucide-react';
import { api } from '../services/api';
import EventCard from '../components/EventCard';
import GalleryModal from '../components/GalleryModal';

export default function Home() {
  const [stats, setStats] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function loadHomeData() {
      const [statsData, eventsData, galleryData] = await Promise.all([
        api.getStats(),
        api.getEvents({ status: 'upcoming' }),
        api.getGallery({ featured: true })
      ]);
      setStats(statsData);
      setEvents(eventsData.slice(0, 3));
      setGallery(galleryData.slice(0, 6));
    }
    loadHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      {/* ==================================================== */}
      {/* 1. HERO SECTION */}
      {/* ==================================================== */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600">
                  Entrepreneurship Cell • DAV College Jalandhar
                </span>
              </div>

              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900 leading-[1.08]">
                IDEAS <br />
                <span className="text-blue-600">INTO IMPACT.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed">
                Building a culture of entrepreneurship, innovation and action — one idea at a time.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/events"
                  className="px-7 py-3 rounded-full text-xs font-black text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2 uppercase tracking-wider"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/join"
                  className="px-7 py-3 rounded-full text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all shadow-sm uppercase tracking-wider"
                >
                  <span>Join E-Cell</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Student Collage with Floating Badges */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg">
                
                {/* Main Collage Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                    alt="Students collaborating at E-Cell"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                </div>

                {/* Floating Stat Badge 1: 20+ Events */}
                <div className="absolute -top-4 -left-4 sm:top-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-slate-100 flex flex-col items-center">
                  <span className="font-display font-black text-xl sm:text-2xl text-blue-600 leading-none">20+</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Events</span>
                </div>

                {/* Floating Stat Badge 2: 500+ Students */}
                <div className="absolute top-1/2 -left-6 sm:-left-8 -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-slate-100 flex flex-col items-center">
                  <span className="font-display font-black text-xl sm:text-2xl text-blue-600 leading-none">500+</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Students</span>
                </div>

                {/* Floating Stat Badge 3: 15+ Achievements */}
                <div className="absolute -bottom-4 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-slate-100 flex flex-col items-center">
                  <span className="font-display font-black text-xl sm:text-2xl text-blue-600 leading-none">15+</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Achievements</span>
                </div>

                {/* Floating Pill: Turning ideas into action */}
                <div className="absolute -top-3 right-4 sm:-top-4 sm:right-6 bg-blue-600 text-white rounded-full px-4 py-1.5 shadow-lg flex items-center gap-1.5 text-xs font-extrabold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Turning ideas into action</span>
                </div>

                {/* Secondary Thumbnail */}
                <div className="hidden sm:block absolute -bottom-6 -right-6 w-36 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80"
                    alt="E-Summit Audience"
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. STATS BAR SECTION */}
      {/* ==================================================== */}
      <section className="py-8 border-y border-slate-200 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="pt-2 md:pt-0">
              <div className="font-display font-black text-3xl sm:text-4xl text-slate-900">20+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">Events</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="font-display font-black text-3xl sm:text-4xl text-slate-900">500+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">Students Engaged</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="font-display font-black text-3xl sm:text-4xl text-slate-900">15+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">Achievements</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="font-display font-black text-3xl sm:text-4xl text-slate-900">30+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">Team Members</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="font-display font-black text-3xl sm:text-4xl text-slate-900">10+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">Collaborations</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 3. UPCOMING EVENTS / WHAT'S HAPPENING */}
      {/* ==================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block">
                Upcoming Events
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mt-1">
                WHAT'S HAPPENING
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Find your next opportunity to participate, compete and build.
              </p>
            </div>

            <Link
              to="/events"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 4. FEATURED EVENT BANNER (TECH IDEATHON 2026) */}
      {/* ==================================================== */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80"
              alt="Tech Ideathon Banner"
              className="absolute inset-0 w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

            <div className="relative z-10 p-8 sm:p-12 max-w-xl space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700/50">
                Featured Event
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white">
                TECH IDEATHON 2026
              </h3>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>29 April 2026</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>DAV College Jalandhar</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/events/innovate-x-pitch-2026"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white text-xs uppercase tracking-wider transition-all"
                >
                  <span>Explore Event</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 5. WE BUILD MORE THAN EVENTS (4 CARDS) */}
      {/* ==================================================== */}
      <section className="py-20 bg-slate-50/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
              WE <span className="text-blue-600">BUILD MORE</span> THAN EVENTS.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              We create opportunities for students to experiment, compete, collaborate and build.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="ui-card p-6 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-2xl text-slate-900">01</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 uppercase">Ideation</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Turning raw ideas into possibilities.
                </p>
              </div>
            </div>

            <div className="ui-card p-6 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-2xl text-slate-900">02</span>
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Rocket className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 uppercase">Entrepreneurship</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Developing entrepreneurial thinking.
                </p>
              </div>
            </div>

            <div className="ui-card p-6 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-2xl text-slate-900">03</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 uppercase">Collaboration</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Connecting students, mentors and ecosystems.
                </p>
              </div>
            </div>

            <div className="ui-card p-6 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-2xl text-slate-900">04</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 uppercase">Competitions</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Creating platforms where ideas can compete.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 6. THE JOURNEY SO FAR (TIMELINE) */}
      {/* ==================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block">Milestones</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-0.5">
                THE JOURNEY SO FAR
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">From small steps to bigger dreams.</p>
            </div>

            <Link to="/achievements" className="text-xs font-bold text-blue-600 hover:underline">
              View Achievements →
            </Link>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            <div className="ui-card p-6 bg-slate-50/60 border border-slate-200 relative space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
                <span className="font-display font-black text-xl text-slate-900">2024</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>E-Cell Rebound</li>
                <li>Campus Entrepreneurship Drive</li>
                <li>Workshops & Speaker Sessions</li>
              </ul>
            </div>

            <div className="ui-card p-6 bg-slate-50/60 border border-slate-200 relative space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
                <span className="font-display font-black text-xl text-slate-900">2025</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>National Entrepreneurship Challenge</li>
                <li>AIR 118</li>
                <li>Run-Neeti 2.0</li>
              </ul>
            </div>

            <div className="ui-card p-6 bg-blue-50/40 border border-blue-200 relative space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
                <span className="font-display font-black text-xl text-blue-600">2026</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside font-medium">
                <li>Run-Neeti 3.0</li>
                <li>Tech Ideathon</li>
                <li>Business Plan Competition</li>
              </ul>
            </div>

          </div>

          {/* Featured Achievement Card */}
          <div className="ui-card p-6 sm:p-8 bg-white border border-slate-200 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Featured Achievement</span>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 rounded-2xl overflow-hidden shadow">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80"
                  alt="National Award"
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600">
                    AIR 118
                  </span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900">
                  NATIONAL ENTREPRENEURSHIP CHALLENGE 2025
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  An entrepreneurial journey that took our team from campus ideas to a prestigious national platform.
                </p>
                <Link
                  to="/achievements"
                  className="inline-block text-xs font-bold text-blue-600 hover:underline pt-1"
                >
                  Read the story →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 7. MOMENTS THAT MATTER (GALLERY PREVIEW) */}
      {/* ==================================================== */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block">Gallery</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-0.5">
                MOMENTS THAT MATTER
              </h2>
            </div>
            <Link to="/gallery" className="text-xs font-bold text-blue-600 hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="group relative h-48 sm:h-60 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                  <span className="text-xs font-bold line-clamp-1">{img.title}</span>
                  <span className="text-[10px] text-blue-300 font-semibold">{img.category}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 8. HAVE AN IDEA? LET'S BUILD IT. (BOTTOM CTA) */}
      {/* ==================================================== */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-5">
          <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900">
            HAVE AN IDEA? <span className="text-blue-600">LET'S BUILD IT.</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Join a community of students who believe ideas deserve a place to grow.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              to="/join"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white uppercase tracking-wider shadow-sm"
            >
              Join E-Cell
            </Link>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <GalleryModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}
